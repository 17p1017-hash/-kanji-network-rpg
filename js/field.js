// ==================================================
// field.js
// 共通フィールドシステム
//
// 担当:
// ・マップ登録
// ・通常1枚マップ
// ・大型タイルマップ
// ・px / % 座標
// ・カメラ追従
// ・独立オブジェクト
// ・前景レイヤー
// ・状態オーバーレイ
// ・当たり判定
// ・出口
// ・エンカウント
// ・現在地の自動保存
//
// 王国や森などの固有設定は
// maps/*.js 側に持たせる
// ==================================================
 
window.FieldModule = (() => {
 
  let settings = null;
 
 
  // ==================================================
  // マップ一覧
  // ==================================================
 
  const MAPS = {};
 
 
  // ==================================================
  // 画像追従型 alpha collision
  //
  // map.objects 側で以下のように指定する:
  //
  // collision: {
  //   type: "alpha",
  //   area: {
  //     left: 0,
  //     right: 1,
  //     top: 0.55,
  //     bottom: 0.95
  //   },
  //   alphaThreshold: 16
  // }
  //
  // ・透明部分は通行可能
  // ・不透明部分だけ障害物になる
  // ・area で画像内の判定対象範囲を絞れる
  // ・オブジェクトの移動 / 拡大縮小へ自動追従
  // ==================================================
 
  const alphaCollisionMasks =
    new Map();
 
 
  const alphaCollisionGeneration =
    new Map();
 
 
  const alphaCollisionImageCache =
    new Map();
 
 
  // ==================================================
  // 大型マップ用レイヤー
  // ==================================================
 
  let worldLayer = null;
 
  let backgroundLayer = null;
 
  let overlayLayer = null;
 
  let objectLayer = null;
 
  let foregroundLayer = null;
 
  let renderedMapId = null;
 
 
  // ==================================================
  // 自動保存
  // ==================================================
 
  let saveTimer = null;
 
 
  // ==================================================
  // 主人公・待機フレーム復帰タイマー
  // ==================================================
 
  let playerIdleTimer = null;
 
 
  function scheduleSave() {
 
    if (
      typeof saveGame !== "function"
    ) {
 
      return;
 
    }
 
 
    if (
      saveTimer
    ) {
 
      clearTimeout(
        saveTimer
      );
 
    }
 
 
    saveTimer =
      setTimeout(
        () => {
 
          saveGame();
 
          saveTimer = null;
 
        },
        250
      );
 
  }
 
 
  // ==================================================
  // 初期化
  // ==================================================
 
  function init(options) {
 
    settings = options;
 
 
    // ----------------------------------------------
    // MAP_～ を自動登録
    // ----------------------------------------------
 
    registerGlobalMaps();
 
 
    const {
      field
    } = settings;
 
 
    if (
      field
    ) {
 
      field.style.position =
        "relative";
 
      field.style.overflow =
        "hidden";
 
    }
 
 
    // ----------------------------------------------
    // 画面サイズ変更時
    // ----------------------------------------------
 
    window.addEventListener(
      "resize",
      () => {
 
        updateField();
 
      }
    );
 
  }
 
 
  // ==================================================
  // グローバルマップ自動登録
  //
  // MAP_KINGDOM
  // MAP_READING_FOREST
  // MAP_WORD_HILL
  // など
  // ==================================================
 
  function registerGlobalMaps() {
 
    Object.keys(
      window
    ).forEach(
      key => {
 
        if (
          !key.startsWith(
            "MAP_"
          )
        ) {
 
          return;
 
        }
 
 
        const map =
          window[key];
 
 
        if (
          !map ||
          typeof map !== "object" ||
          !map.id
        ) {
 
          return;
 
        }
 
 
        MAPS[
          map.id
        ] = map;
 
      }
    );
 
  }
 
 
  // ==================================================
  // マップ手動登録
  // ==================================================
 
  function registerMap(map) {
 
    if (
      !map ||
      !map.id
    ) {
 
      return false;
 
    }
 
 
    MAPS[
      map.id
    ] = map;
 
 
    return true;
 
  }
 
 
  // ==================================================
  // 現在のマップ取得
  // ==================================================
 
  function getCurrentMap() {
 
    if (
      !settings
    ) {
 
      return null;
 
    }
 
 
    const {
      game
    } = settings;
 
 
    return MAPS[
      game.area
    ] || null;
 
  }
 
 
  // ==================================================
  // pxマップか
  // ==================================================
 
  function isPixelMap(map) {
 
    return (
      map &&
      map.coordinateUnit ===
        "pixel"
    );
 
  }
 
 
  // ==================================================
  // フィールドメッセージ
  // ==================================================
 
  function setFieldMessage(text) {
 
    if (
      !settings
    ) {
 
      return;
 
    }
 
 
    const {
      fieldMessage
    } = settings;
 
 
    if (
      fieldMessage
    ) {
 
      fieldMessage.textContent =
        text;
 
    }
 
  }
 
 
  // ==================================================
  // 大型マップレイヤー生成
  // ==================================================
 
  function createWorldLayer() {
 
    const {
      field
    } = settings;
 
 
    if (
      worldLayer &&
      worldLayer.parentElement ===
        field
    ) {
 
      return worldLayer;
 
    }
 
 
    // ==================================================
    // ワールド全体
    // ==================================================
 
    worldLayer =
      document.createElement(
        "div"
      );
 
 
    worldLayer.id =
      "field-world-layer";
 
 
    worldLayer.style.position =
      "absolute";
 
    worldLayer.style.left =
      "0";
 
    worldLayer.style.top =
      "0";
 
    worldLayer.style.transformOrigin =
      "top left";
 
    worldLayer.style.willChange =
      "transform";
 
 
    // ==================================================
    // 背景
    // ==================================================
 
    backgroundLayer =
      document.createElement(
        "div"
      );
 
 
    backgroundLayer.className =
      "field-background-layer";
 
 
    backgroundLayer.style.position =
      "absolute";
 
    backgroundLayer.style.left =
      "0";
 
    backgroundLayer.style.top =
      "0";
 
    backgroundLayer.style.zIndex =
      "1";
 
    backgroundLayer.style.pointerEvents =
      "none";
 
 
    // ==================================================
    // 状態オーバーレイ
    //
    // 主人公より下
    // ==================================================
 
    overlayLayer =
      document.createElement(
        "div"
      );
 
 
    overlayLayer.className =
      "field-overlay-layer";
 
 
    overlayLayer.style.position =
      "absolute";
 
    overlayLayer.style.left =
      "0";
 
    overlayLayer.style.top =
      "0";
 
    overlayLayer.style.zIndex =
      "10";
 
    overlayLayer.style.pointerEvents =
      "none";
 
 
    // ==================================================
    // 独立オブジェクト
    //
    // 家・城壁・王城・噴水・木など
    // 主人公より下
    // ==================================================
 
    objectLayer =
      document.createElement(
        "div"
      );
 
 
    objectLayer.className =
      "field-object-layer";
 
 
    objectLayer.style.position =
      "absolute";
 
    objectLayer.style.left =
      "0";
 
    objectLayer.style.top =
      "0";
 
    objectLayer.style.zIndex =
      "15";
 
    objectLayer.style.pointerEvents =
      "none";
 
 
    // ==================================================
    // 前景
    //
    // 主人公より上
    // ==================================================
 
    foregroundLayer =
      document.createElement(
        "div"
      );
 
 
    foregroundLayer.className =
      "field-foreground-layer";
 
 
    foregroundLayer.style.position =
      "absolute";
 
    foregroundLayer.style.left =
      "0";
 
    foregroundLayer.style.top =
      "0";
 
    foregroundLayer.style.zIndex =
      "30";
 
    foregroundLayer.style.pointerEvents =
      "none";
 
 
    worldLayer.appendChild(
      backgroundLayer
    );
 
 
    worldLayer.appendChild(
      overlayLayer
    );
 
 
    worldLayer.appendChild(
      objectLayer
    );
 
 
    worldLayer.appendChild(
      foregroundLayer
    );
 
 
    field.appendChild(
      worldLayer
    );
 
 
    return worldLayer;
 
  }
 
 
  // ==================================================
  // タイルと範囲が重なるか
  // ==================================================
 
  function tileIntersectsRegion(
    map,
    tile,
    region
  ) {
 
    const tileLeft =
      tile.x;
 
    const tileTop =
      tile.y;
 
    const tileRight =
      tile.x +
      map.tileWidth;
 
    const tileBottom =
      tile.y +
      map.tileHeight;
 
 
    const regionLeft =
      region.x;
 
    const regionTop =
      region.y;
 
    const regionRight =
      region.x +
      region.width;
 
    const regionBottom =
      region.y +
      region.height;
 
 
    return !(
      tileRight <= regionLeft ||
      tileLeft >= regionRight ||
      tileBottom <= regionTop ||
      tileTop >= regionBottom
    );
 
  }
 
 
  // ==================================================
  // マップの一部分を複製
  //
  // 前景・オーバーレイで使用
  //
  // 元PNGは変更しない
  // ==================================================
 
  function createClippedMapRegion(
    map,
    region,
    parent
  ) {
 
    const clip =
      document.createElement(
        "div"
      );
 
 
    clip.style.position =
      "absolute";
 
 
    clip.style.left =
      region.x + "px";
 
 
    clip.style.top =
      region.y + "px";
 
 
    clip.style.width =
      region.width + "px";
 
 
    clip.style.height =
      region.height + "px";
 
 
    clip.style.overflow =
      "hidden";
 
 
    clip.style.pointerEvents =
      "none";
 
 
    if (
      region.filter
    ) {
 
      clip.style.filter =
        region.filter;
 
    }
 
 
    // ----------------------------------------------
    // 範囲と重なるタイルだけ使用
    // ----------------------------------------------
 
    map.tiles.forEach(
      tile => {
 
        if (
          !tileIntersectsRegion(
            map,
            tile,
            region
          )
        ) {
 
          return;
 
        }
 
 
        const image =
          document.createElement(
            "img"
          );
 
 
        image.src =
          tile.image;
 
 
        image.alt =
          "";
 
 
        image.draggable =
          false;
 
 
        image.style.position =
          "absolute";
 
 
        image.style.left =
          (
            tile.x -
            region.x
          ) + "px";
 
 
        image.style.top =
          (
            tile.y -
            region.y
          ) + "px";
 
 
        image.style.width =
          map.tileWidth +
          "px";
 
 
        image.style.height =
          map.tileHeight +
          "px";
 
 
        image.style.display =
          "block";
 
 
        image.style.userSelect =
          "none";
 
 
        image.style.pointerEvents =
          "none";
 
 
        clip.appendChild(
          image
        );
 
      }
    );
 
 
    parent.appendChild(
      clip
    );
 
 
    return clip;
 
  }
 
 
  // ==================================================
  // オーバーレイ表示条件
  // ==================================================
 
  function isOverlayVisible(
    overlay
  ) {
 
    const {
      game
    } = settings;
 
 
    const rule =
      overlay.visibleWhen;
 
 
    if (
      rule === undefined ||
      rule === null
    ) {
 
      return true;
 
    }
 
 
    if (
      typeof rule ===
      "function"
    ) {
 
      return !!rule(
        game
      );
 
    }
 
 
    if (
      typeof rule ===
        "object" &&
      rule.flag
    ) {
 
      const currentValue =
        game.flags?.[
          rule.flag
        ] ??
        false;
 
 
      return (
        currentValue ===
        rule.equals
      );
 
    }
 
 
    return true;
 
  }
 
 
  // ==================================================
  // オーバーレイ更新
  // ==================================================
 
  function updateOverlays(map) {
 
    if (
      !overlayLayer ||
      !map
    ) {
 
      return;
 
    }
 
 
    overlayLayer
      .querySelectorAll(
        "[data-overlay-index]"
      )
      .forEach(
        element => {
 
          const index =
            Number(
              element.dataset
                .overlayIndex
            );
 
 
          const overlay =
            map.overlays?.[
              index
            ];
 
 
          if (
            !overlay
          ) {
 
            element.style.display =
              "none";
 
            return;
 
          }
 
 
          element.style.display =
            isOverlayVisible(
              overlay
            )
              ? "block"
              : "none";
 
        }
      );
 
  }
 
 
  // ==================================================
  // オブジェクト表示条件
  //
  // visibleWhen:
  //
  // {
  //   flag: "kotobaGateRepaired",
  //   equals: false
  // }
  //
  // または
  //
  // visibleWhen: game => true
  // ==================================================
 
  function isMapObjectVisible(
    object
  ) {
 
    const {
      game
    } = settings;
 
 
    const rule =
      object.visibleWhen;
 
 
    if (
      rule === undefined ||
      rule === null
    ) {
 
      return true;
 
    }
 
 
    if (
      typeof rule ===
      "function"
    ) {
 
      return !!rule(
        game
      );
 
    }
 
 
    if (
      typeof rule ===
        "object" &&
      rule.flag
    ) {
 
      const currentValue =
        game.flags?.[
          rule.flag
        ] ??
        false;
 
 
      return (
        currentValue ===
        rule.equals
      );
 
    }
 
 
    return true;
 
  }
 
 
  // ==================================================
  // オブジェクトレイヤーを消去
  // ==================================================
 
  function clearMapObjects() {
 
    if (
      !objectLayer
    ) {
 
      return;
 
    }
 
 
    objectLayer.innerHTML =
      "";
 
  }
 
 
  // ==================================================
  // alpha collision 共通処理
  // ==================================================
 
  function clamp01(value) {
 
    const number =
      Number(value);
 
 
    if (
      !Number.isFinite(
        number
      )
    ) {
 
      return 0;
 
    }
 
 
    return Math.max(
      0,
      Math.min(
        1,
        number
      )
    );
 
  }
 
 
  function getObjectDisplaySize(
    object
  ) {
 
    if (
      typeof object.size ===
        "number" &&
      Number.isFinite(
        object.size
      ) &&
      object.size > 0
    ) {
 
      return {
        width: object.size,
        height: object.size
      };
 
    }
 
 
    return {
      width:
        object.width ??
        0,
 
      height:
        object.height ??
        0
    };
 
  }
 
 
  function getAlphaCollisionArea(
    collision
  ) {
 
    const source =
      collision?.area ??
      {};
 
 
    let left =
      source.left === undefined
        ? 0
        : clamp01(
            source.left
          );
 
 
    let right =
      source.right === undefined
        ? 1
        : clamp01(
            source.right
          );
 
 
    let top =
      source.top === undefined
        ? 0
        : clamp01(
            source.top
          );
 
 
    let bottom =
      source.bottom === undefined
        ? 1
        : clamp01(
            source.bottom
          );
 
 
    if (
      right < left
    ) {
 
      [
        left,
        right
      ] = [
        right,
        left
      ];
 
    }
 
 
    if (
      bottom < top
    ) {
 
      [
        top,
        bottom
      ] = [
        bottom,
        top
      ];
 
    }
 
 
    return {
      left,
      right,
      top,
      bottom
    };
 
  }
 
 
  function getAlphaCollisionImage(
    src
  ) {
 
    if (
      alphaCollisionImageCache
        .has(
          src
        )
    ) {
 
      return alphaCollisionImageCache
        .get(
          src
        );
 
    }
 
 
    const promise =
      new Promise(
        (resolve, reject) => {
 
          const image =
            new Image();
 
 
          image.onload =
            () => {
 
              resolve(
                image
              );
 
            };
 
 
          image.onerror =
            () => {
 
              reject(
                new Error(
                  `alpha collision画像を読み込めません: ${src}`
                )
              );
 
            };
 
 
          image.src =
            src;
 
        }
      );
 
 
    alphaCollisionImageCache
      .set(
        src,
        promise
      );
 
 
    return promise;
 
  }
 
 
  function getAlphaCollisionSource(
    map,
    object
  ) {
 
    if (
      object.image
    ) {
 
      return {
        image: object.image,
        columns: 1,
        rows: 1,
        col: 0,
        row: 0
      };
 
    }
 
 
    if (
      object.sheet
    ) {
 
      const sheet =
        map.objectSheets?.[
          object.sheet
        ];
 
 
      if (
        !sheet?.image
      ) {
 
        return null;
 
      }
 
 
      return {
        image: sheet.image,
        columns:
          sheet.columns ??
          1,
        rows:
          sheet.rows ??
          1,
        col:
          object.col ??
          0,
        row:
          object.row ??
          0
      };
 
    }
 
 
    return null;
 
  }
 
 
  function clearAlphaCollisionMasksForMap(
    mapId
  ) {
 
    const prefix =
      `${mapId}::`;
 
 
    for (
      const key
      of alphaCollisionMasks.keys()
    ) {
 
      if (
        key.startsWith(
          prefix
        )
      ) {
 
        alphaCollisionMasks
          .delete(
            key
          );
 
      }
 
    }
 
  }
 
 
  function prepareAlphaCollision(
    map,
    object,
    generation
  ) {
 
    const collision =
      object.collision;
 
 
    if (
      !collision ||
      collision.type !==
        "alpha" ||
      collision.enabled ===
        false
    ) {
 
      return;
 
    }
 
 
    const source =
      getAlphaCollisionSource(
        map,
        object
      );
 
 
    if (
      !source
    ) {
 
      console.warn(
        "alpha collision用画像が見つかりません:",
        object.id
      );
 
 
      return;
 
    }
 
 
    const {
      width,
      height
    } =
      getObjectDisplaySize(
        object
      );
 
 
    const maskWidth =
      Math.max(
        1,
        Math.round(
          width
        )
      );
 
 
    const maskHeight =
      Math.max(
        1,
        Math.round(
          height
        )
      );
 
 
    if (
      maskWidth <= 0 ||
      maskHeight <= 0
    ) {
 
      return;
 
    }
 
 
    const key =
      `${map.id}::${object.id}`;
 
 
    getAlphaCollisionImage(
      source.image
    )
      .then(
        image => {
 
          if (
            alphaCollisionGeneration
              .get(
                map.id
              ) !==
            generation
          ) {
 
            return;
 
          }
 
 
          const columns =
            Math.max(
              1,
              source.columns
            );
 
 
          const rows =
            Math.max(
              1,
              source.rows
            );
 
 
          const sourceWidth =
            image.naturalWidth /
            columns;
 
 
          const sourceHeight =
            image.naturalHeight /
            rows;
 
 
          const sourceX =
            sourceWidth *
            source.col;
 
 
          const sourceY =
            sourceHeight *
            source.row;
 
 
          const canvas =
            document.createElement(
              "canvas"
            );
 
 
          canvas.width =
            maskWidth;
 
 
          canvas.height =
            maskHeight;
 
 
          const context =
            canvas.getContext(
              "2d",
              {
                willReadFrequently:
                  true
              }
            );
 
 
          if (
            !context
          ) {
 
            return;
 
          }
 
 
          context.clearRect(
            0,
            0,
            maskWidth,
            maskHeight
          );
 
 
          context.drawImage(
            image,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            0,
            0,
            maskWidth,
            maskHeight
          );
 
 
          const imageData =
            context.getImageData(
              0,
              0,
              maskWidth,
              maskHeight
            );
 
 
          const alpha =
            new Uint8ClampedArray(
              maskWidth *
              maskHeight
            );
 
 
          for (
            let index = 0;
            index < alpha.length;
            index++
          ) {
 
            alpha[index] =
              imageData.data[
                index * 4 +
                3
              ];
 
          }
 
 
          alphaCollisionMasks
            .set(
              key,
              {
                x:
                  object.x ??
                  0,
                y:
                  object.y ??
                  0,
                width:
                  maskWidth,
                height:
                  maskHeight,
                alpha,
                area:
                  getAlphaCollisionArea(
                    collision
                  ),
                alphaThreshold:
                  Math.max(
                    1,
                    Math.min(
                      255,
                      Number(
                        collision.alphaThreshold ??
                        16
                      ) ||
                      16
                    )
                  )
              }
            );
 
        }
      )
      .catch(
        error => {
 
          console.warn(
            error.message
          );
 
        }
      );
 
  }
 
 
  function pointBlockedByAlphaObjects(
    map,
    x,
    y
  ) {
 
    if (
      !map ||
      !Array.isArray(
        map.objects
      )
    ) {
 
      return false;
 
    }
 
 
    for (
      const object
      of map.objects
    ) {
 
      const collision =
        object.collision;
 
 
      if (
        !collision ||
        collision.type !==
          "alpha" ||
        collision.enabled ===
          false ||
        !isMapObjectVisible(
          object
        )
      ) {
 
        continue;
 
      }
 
 
      const key =
        `${map.id}::${object.id}`;
 
 
      const mask =
        alphaCollisionMasks
          .get(
            key
          );
 
 
      if (
        !mask
      ) {
 
        continue;
 
      }
 
 
      const localX =
        x - mask.x;
 
 
      const localY =
        y - mask.y;
 
 
      if (
        localX < 0 ||
        localY < 0 ||
        localX >= mask.width ||
        localY >= mask.height
      ) {
 
        continue;
 
      }
 
 
      const normalizedX =
        localX /
        mask.width;
 
 
      const normalizedY =
        localY /
        mask.height;
 
 
      if (
        normalizedX <
          mask.area.left ||
        normalizedX >
          mask.area.right ||
        normalizedY <
          mask.area.top ||
        normalizedY >
          mask.area.bottom
      ) {
 
        continue;
 
      }
 
 
      const pixelX =
        Math.max(
          0,
          Math.min(
            mask.width - 1,
            Math.floor(
              localX
            )
          )
        );
 
 
      const pixelY =
        Math.max(
          0,
          Math.min(
            mask.height - 1,
            Math.floor(
              localY
            )
          )
        );
 
 
      const alphaValue =
        mask.alpha[
          pixelY *
          mask.width +
          pixelX
        ];
 
 
      if (
        alphaValue >=
        mask.alphaThreshold
      ) {
 
        return true;
 
      }
 
    }
 
 
    return false;
 
  }
 
 
  // ==================================================
  // オブジェクトを1個作成
  //
  // object.image
  // → 単独PNG
  //
  // object.sheet
  // → A / B / Cシート
  //
  // スプライトシート:
  //
  // size:
  // → 1セルを size × size として
  //   縦横同倍率で表示する
  //
  // width / height:
  // → 従来方式
  //   既存コード互換用
  // ==================================================
 
  function createMapObject(
    map,
    object
  ) {
 
    if (
      !objectLayer ||
      !map ||
      !object
    ) {
 
      return null;
 
    }
 
 
    const element =
      document.createElement(
        "div"
      );
 
 
    element.className =
      "field-map-object";
 
 
    element.dataset.objectId =
      object.id ?? "";
 
 
    element.style.position =
      "absolute";
 
 
    element.style.left =
      (object.x ?? 0) +
      "px";
 
 
    element.style.top =
      (object.y ?? 0) +
      "px";
 
 
    element.style.backgroundRepeat =
      "no-repeat";
 
 
    element.style.pointerEvents =
      "none";
 
 
    element.style.userSelect =
      "none";
 
 
    element.style.imageRendering =
      "pixelated";
 
 
    element.style.zIndex =
      String(
        object.z ?? 1
      );
 
 
    // ==================================================
    // 単独PNG
    //
    // 王城など
    //
    // 現時点では従来の
    // width / height方式を維持
    // ==================================================
 
    if (
      object.image
    ) {
 
      const width =
        object.width ??
        0;
 
 
      const height =
        object.height ??
        0;
 
 
      element.style.width =
        width + "px";
 
 
      element.style.height =
        height + "px";
 
 
      element.style.backgroundImage =
        `url("${object.image}")`;
 
 
      element.style.backgroundSize =
        "100% 100%";
 
 
      element.style.backgroundPosition =
        "0 0";
 
    }
 
 
    // ==================================================
    // スプライトシート
    //
    // A / B / C
    // ==================================================
 
    else if (
      object.sheet
    ) {
 
      const sheet =
        map.objectSheets?.[
          object.sheet
        ];
 
 
      if (
        !sheet
      ) {
 
        console.warn(
          "オブジェクトシートが見つかりません:",
          object.sheet,
          object.id
        );
 
 
        return null;
 
      }
 
 
      const columns =
        sheet.columns ??
        1;
 
 
      const rows =
        sheet.rows ??
        1;
 
 
      const col =
        object.col ??
        0;
 
 
      const row =
        object.row ??
        0;
 
 
      // ==================================================
      // 新方式
      //
      // size が指定されている場合
      //
      // 例:
      //
      // size: 320
      //
      // → 1セルを
      //   320 × 320px
      //   として表示する。
      //
      // 元セルが正方形なら
      // 縦横同じ倍率で縮小・拡大されるため
      // 中の素材の縦横比が崩れない。
      // ==================================================
 
      if (
        typeof object.size ===
          "number" &&
        Number.isFinite(
          object.size
        ) &&
        object.size > 0
      ) {
 
        const size =
          object.size;
 
 
        element.style.width =
          size + "px";
 
 
        element.style.height =
          size + "px";
 
 
        element.style.backgroundImage =
          `url("${sheet.image}")`;
 
 
        element.style.backgroundSize =
          `${size * columns}px ` +
          `${size * rows}px`;
 
 
        element.style.backgroundPosition =
          `${-size * col}px ` +
          `${-size * row}px`;
 
      }
 
 
      // ==================================================
      // 従来方式
      //
      // size が無い場合は
      // width / height をそのまま使用。
      //
      // 既存マップを壊さないため
      // 当面はこちらも残す。
      // ==================================================
 
      else {
 
        const width =
          object.width ??
          0;
 
 
        const height =
          object.height ??
          0;
 
 
        element.style.width =
          width + "px";
 
 
        element.style.height =
          height + "px";
 
 
        element.style.backgroundImage =
          `url("${sheet.image}")`;
 
 
        /*
         * 1セルを
         * object.width × object.height
         * として表示。
         *
         * A素材4×4なら
         * 背景全体を
         * width×4 / height×4
         * として縮尺表示する。
         *
         * 旧データ互換のため残す。
         */
        element.style.backgroundSize =
          `${width * columns}px ` +
          `${height * rows}px`;
 
 
        element.style.backgroundPosition =
          `${-width * col}px ` +
          `${-height * row}px`;
 
      }
 
    }
 
 
    else {
 
      console.warn(
        "画像指定のないマップオブジェクト:",
        object.id
      );
 
 
      return null;
 
    }
 
 
    element.style.display =
      isMapObjectVisible(
        object
      )
        ? "block"
        : "none";
 
 
    const generation =
      alphaCollisionGeneration
        .get(
          map.id
        ) ??
      0;
 
 
    prepareAlphaCollision(
      map,
      object,
      generation
    );
 
 
    objectLayer.appendChild(
      element
    );
 
 
    return element;
 
  }
 
 
  // ==================================================
  // オブジェクトをまとめて描画
  // ==================================================
 
  function renderMapObjects(
    map
  ) {
 
    clearMapObjects();
 
 
    if (
      map?.id
    ) {
 
      const nextGeneration =
        (
          alphaCollisionGeneration
            .get(
              map.id
            ) ??
          0
        ) +
        1;
 
 
      alphaCollisionGeneration
        .set(
          map.id,
          nextGeneration
        );
 
 
      clearAlphaCollisionMasksForMap(
        map.id
      );
 
    }
 
 
    if (
      !map ||
      !Array.isArray(
        map.objects
      )
    ) {
 
      return;
 
    }
 
 
    map.objects.forEach(
      object => {
 
        createMapObject(
          map,
          object
        );
 
      }
    );
 
  }
 
 
  // ==================================================
  // オブジェクト表示状態更新
  //
  // ことばの門の
  // 消灯 / 点灯など
  // ==================================================
 
  function updateMapObjects(
    map
  ) {
 
    if (
      !objectLayer ||
      !map ||
      !Array.isArray(
        map.objects
      )
    ) {
 
      return;
 
    }
 
 
    objectLayer
      .querySelectorAll(
        ".field-map-object"
      )
      .forEach(
        element => {
 
          const objectId =
            element.dataset
              .objectId;
 
 
          const object =
            map.objects.find(
              item =>
                item.id ===
                objectId
            );
 
 
          if (
            !object
          ) {
 
            element.style.display =
              "none";
 
            return;
 
          }
 
 
          element.style.display =
            isMapObjectVisible(
              object
            )
              ? "block"
              : "none";
 
        }
      );
 
  }
 
 
  // ==================================================
  // 大型タイルマップ描画
  // ==================================================
 
  function renderTiledMap(map) {
 
    const {
      field,
      playerElement
    } = settings;
 
 
    const layer =
      createWorldLayer();
 
 
    // ==================================================
    // 同じマップなら再構築しない
    // ==================================================
 
    if (
      renderedMapId ===
      map.id
    ) {
 
      layer.style.display =
        "block";
 
 
      if (
        playerElement.parentElement !==
        layer
      ) {
 
        layer.appendChild(
          playerElement
        );
 
      }
 
 
      playerElement.style.zIndex =
        "20";
 
 
      updateOverlays(
        map
      );
 
 
      updateMapObjects(
        map
      );
 
 
      return;
 
    }
 
 
    // ==================================================
    // 新しいマップ
    // ==================================================
 
    renderedMapId =
      map.id;
 
 
    backgroundLayer.innerHTML =
      "";
 
    overlayLayer.innerHTML =
      "";
 
    objectLayer.innerHTML =
      "";
 
    foregroundLayer.innerHTML =
      "";
 
 
    layer.style.display =
      "block";
 
    layer.style.width =
      map.width + "px";
 
 
    layer.style.height =
      map.height + "px";
 
 
    backgroundLayer.style.width =
      map.width + "px";
 
 
    backgroundLayer.style.height =
      map.height + "px";
 
 
    overlayLayer.style.width =
      map.width + "px";
 
 
    overlayLayer.style.height =
      map.height + "px";
 
 
    objectLayer.style.width =
      map.width + "px";
 
 
    objectLayer.style.height =
      map.height + "px";
 
 
    foregroundLayer.style.width =
      map.width + "px";
 
 
    foregroundLayer.style.height =
      map.height + "px";
 
 
    // ==================================================
    // 背景タイル
    // ==================================================
 
    if (
      Array.isArray(
        map.tiles
      )
    ) {
 
      map.tiles.forEach(
        tile => {
 
          const image =
            document.createElement(
              "img"
            );
 
 
          image.src =
            tile.image;
 
 
          image.alt =
            "";
 
 
          image.draggable =
            false;
 
 
          image.style.position =
            "absolute";
 
 
          image.style.left =
            tile.x + "px";
 
 
          image.style.top =
            tile.y + "px";
 
 
          image.style.width =
            map.tileWidth +
            "px";
 
 
          image.style.height =
            map.tileHeight +
            "px";
 
 
          image.style.display =
            "block";
 
 
          image.style.userSelect =
            "none";
 
 
          image.style.pointerEvents =
            "none";
 
 
          backgroundLayer.appendChild(
            image
          );
 
        }
      );
 
    }
 
 
    // ==================================================
    // オーバーレイ
    // ==================================================
 
    if (
      Array.isArray(
        map.overlays
      )
    ) {
 
      map.overlays.forEach(
        (
          overlay,
          index
        ) => {
 
          const element =
            createClippedMapRegion(
              map,
              overlay,
              overlayLayer
            );
 
 
          element.dataset
            .overlayIndex =
              String(index);
 
        }
      );
 
    }
 
 
    // ==================================================
    // 独立オブジェクト
    // ==================================================
 
    renderMapObjects(
      map
    );
 
 
    // ==================================================
    // 主人公
    // ==================================================
 
    layer.appendChild(
      playerElement
    );
 
 
    playerElement.style.position =
      "absolute";
 
 
    playerElement.style.zIndex =
      "20";
 
 
    // ==================================================
    // 前景
    // ==================================================
 
    if (
      Array.isArray(
        map.foregrounds
      )
    ) {
 
      map.foregrounds.forEach(
        region => {
 
          createClippedMapRegion(
            map,
            region,
            foregroundLayer
          );
 
        }
      );
 
    }
 
 
    updateOverlays(
      map
    );
 
 
    updateMapObjects(
      map
    );
 
 
    field.style.backgroundImage =
      "none";
 
  }
 
 
  // ==================================================
  // 通常1枚マップ描画
  // ==================================================
 
  function renderNormalMap(map) {
 
    const {
      field,
      playerElement
    } = settings;
 
 
    renderedMapId =
      null;
 
 
    if (
      worldLayer
    ) {
 
      worldLayer.style.display =
        "none";
 
    }
 
 
    if (
      playerElement.parentElement !==
      field
    ) {
 
      field.appendChild(
        playerElement
      );
 
    }
 
 
    playerElement.style.position =
      "absolute";
 
 
    playerElement.style.zIndex =
      "20";
 
 
    field.style.backgroundImage =
      `url("${map.image}")`;
 
 
    field.style.backgroundSize =
      "100% 100%";
 
 
    field.style.backgroundPosition =
      "center";
 
 
    field.style.backgroundRepeat =
      "no-repeat";
 
  }
 
 
  // ==================================================
  // カメラ
  // ==================================================
 
  function updateCamera(map) {
 
    const {
      game,
      field,
      playerElement
    } = settings;
 
 
    if (
      !worldLayer ||
      !isPixelMap(
        map
      )
    ) {
 
      return;
 
    }
 
 
    const viewportWidth =
      field.clientWidth;
 
 
    const viewportHeight =
      field.clientHeight;
 
 
    if (
      viewportWidth <= 0 ||
      viewportHeight <= 0
    ) {
 
      return;
 
    }
 
 
    const playerWidth =
      playerElement.offsetWidth ||
      32;
 
 
    const playerHeight =
      playerElement.offsetHeight ||
      32;
 
 
    const playerCenterX =
      game.player.x +
      playerWidth / 2;
 
 
    const playerCenterY =
      game.player.y +
      playerHeight / 2;
 
 
    let cameraX =
      playerCenterX -
      viewportWidth / 2;
 
 
    let cameraY =
      playerCenterY -
      viewportHeight / 2;
 
 
    const maxCameraX =
      Math.max(
        0,
        map.width -
        viewportWidth
      );
 
 
    const maxCameraY =
      Math.max(
        0,
        map.height -
        viewportHeight
      );
 
 
    cameraX =
      Math.max(
        0,
        Math.min(
          cameraX,
          maxCameraX
        )
      );
 
 
    cameraY =
      Math.max(
        0,
        Math.min(
          cameraY,
          maxCameraY
        )
      );
 
 
    worldLayer.style.transform =
      `translate(${-cameraX}px, ${-cameraY}px)`;
 
  }
 
 
  // ==================================================
  // フィールド更新
  // ==================================================
 
  function updateField() {
 
    const {
      game,
      playerElement,
      areaName
    } = settings;
 
 
    const map =
      getCurrentMap();
 
 
    if (
      !map
    ) {
 
      console.error(
        "マップが見つかりません:",
        game.area
      );
 
      return;
 
    }
 
 
    if (
      areaName
    ) {
 
      areaName.textContent =
        map.name;
 
    }
 
 
    if (
      isPixelMap(
        map
      )
    ) {
 
      renderTiledMap(
        map
      );
 
 
      playerElement.style.left =
        game.player.x +
        "px";
 
 
      playerElement.style.top =
        game.player.y +
        "px";
 
 
      updateCamera(
        map
      );
 
    }
 
    else {
 
      renderNormalMap(
        map
      );
 
 
      playerElement.style.left =
        game.player.x +
        "%";
 
 
      playerElement.style.top =
        game.player.y +
        "%";
 
    }
 
 
    // ==================================================
    // 主人公アニメーション
    // ==================================================
 
    const rowMap = {
 
      down: 0,
 
      left: 1,
 
      right: 2,
 
      up: 3
 
    };
 
 
    const row =
      rowMap[
        game.player.direction
      ] || 0;
 
 
    const column =
      game.player.step === 0
        ? 0
        : (
            (
              game.player.step -
              1
            ) %
            2
          ) +
          1;
 
 
    playerElement.style.backgroundPosition =
      `${-column * 32}px ${-row * 32}px`;
 
  }
 
 
  // ==================================================
  // 点が多角形内か
  // ==================================================
 
  function pointInPolygon(
    x,
    y,
    points
  ) {
 
    let inside =
      false;
 
 
    for (
      let i = 0,
          j = points.length - 1;
      i < points.length;
      j = i++
    ) {
 
      const xi =
        points[i][0];
 
 
      const yi =
        points[i][1];
 
 
      const xj =
        points[j][0];
 
 
      const yj =
        points[j][1];
 
 
      const intersects =
        (
          (yi > y) !==
          (yj > y)
        ) &&
        (
          x <
          (
            (xj - xi) *
            (y - yi) /
            (yj - yi) +
            xi
          )
        );
 
 
      if (
        intersects
      ) {
 
        inside =
          !inside;
 
      }
 
    }
 
 
    return inside;
 
  }
 
 
  // ==================================================
  // 点が障害物内か
  // ==================================================
 
  function pointBlocked(
    map,
    x,
    y
  ) {
 
    if (
      !map
    ) {
 
      return false;
 
    }
 
 
    const collisions =
      Array.isArray(
        map.collisions
      )
        ? map.collisions
        : [];
 
 
    for (
      const item
      of collisions
    ) {
 
      if (
        item.type ===
        "rect"
      ) {
 
        if (
          x >= item.x1 &&
          x <= item.x2 &&
          y >= item.y1 &&
          y <= item.y2
        ) {
 
          return true;
 
        }
 
      }
 
 
      if (
        item.type ===
        "circle"
      ) {
 
        const dx =
          x - item.x;
 
 
        const dy =
          y - item.y;
 
 
        if (
          dx * dx +
          dy * dy <=
          item.r *
          item.r
        ) {
 
          return true;
 
        }
 
      }
 
 
      if (
        item.type ===
        "polygon"
      ) {
 
        if (
          pointInPolygon(
            x,
            y,
            item.points
          )
        ) {
 
          return true;
 
        }
 
      }
 
    }
 
 
    if (
      pointBlockedByAlphaObjects(
        map,
        x,
        y
      )
    ) {
 
      return true;
 
    }
 
 
    return false;
 
  }
 
 
  // ==================================================
  // 主人公の足元
  // ==================================================
 
  function getPlayerFootBox(
    x,
    y,
    map = null
  ) {
 
    const {
      field,
      playerElement
    } = settings;
 
 
    const targetMap =
      map ||
      getCurrentMap();
 
 
    if (
      isPixelMap(
        targetMap
      )
    ) {
 
      const width =
        playerElement.offsetWidth ||
        32;
 
 
      const height =
        playerElement.offsetHeight ||
        32;
 
 
      const left =
        x +
        width *
        0.28;
 
 
      const right =
        x +
        width *
        0.72;
 
 
      const top =
        y +
        height *
        0.70;
 
 
      const bottom =
        y +
        height *
        0.92;
 
 
      return {
 
        left,
 
        right,
 
        top,
 
        bottom,
 
        centerX:
          (
            left +
            right
          ) / 2,
 
        centerY:
          (
            top +
            bottom
          ) / 2
 
      };
 
    }
 
 
    let widthPercent =
      5;
 
 
    let heightPercent =
      7;
 
 
    if (
      field &&
      playerElement &&
      field.clientWidth > 0 &&
      field.clientHeight > 0
    ) {
 
      widthPercent =
        (
          playerElement.offsetWidth /
          field.clientWidth
        ) *
        100;
 
 
      heightPercent =
        (
          playerElement.offsetHeight /
          field.clientHeight
        ) *
        100;
 
    }
 
 
    const left =
      x +
      widthPercent *
      0.28;
 
 
    const right =
      x +
      widthPercent *
      0.72;
 
 
    const top =
      y +
      heightPercent *
      0.70;
 
 
    const bottom =
      y +
      heightPercent *
      0.92;
 
 
    return {
 
      left,
 
      right,
 
      top,
 
      bottom,
 
      centerX:
        (
          left +
          right
        ) / 2,
 
      centerY:
        (
          top +
          bottom
        ) / 2
 
    };
 
  }
 
 
  // ==================================================
  // 出口内か
  // ==================================================
 
  function isInsideExit(
    foot,
    exit
  ) {
 
    return (
      foot.centerX >=
        exit.x1 &&
      foot.centerX <=
        exit.x2 &&
      foot.centerY >=
        exit.y1 &&
      foot.centerY <=
        exit.y2
    );
 
  }
 
 
  // ==================================================
  // 出口検索
  // ==================================================
 
  function findExit(
    direction,
    x,
    y
  ) {
 
    const map =
      getCurrentMap();
 
 
    if (
      !map ||
      !Array.isArray(
        map.exits
      )
    ) {
 
      return null;
 
    }
 
 
    const foot =
      getPlayerFootBox(
        x,
        y,
        map
      );
 
 
    for (
      const exit
      of map.exits
    ) {
 
      if (
        exit.direction &&
        exit.direction !==
        direction
      ) {
 
        continue;
 
      }
 
 
      if (
        isInsideExit(
          foot,
          exit
        )
      ) {
 
        return exit;
 
      }
 
    }
 
 
    return null;
 
  }
 
 
  // ==================================================
  // 外周判定
  // ==================================================
 
  function isOutsideBounds(
    map,
    foot
  ) {
 
    if (
      !map ||
      !map.bounds
    ) {
 
      return false;
 
    }
 
 
    return (
      foot.centerX <
        map.bounds.left ||
      foot.centerX >
        map.bounds.right ||
      foot.centerY <
        map.bounds.top ||
      foot.centerY >
        map.bounds.bottom
    );
 
  }
 
 
  // ==================================================
  // 障害物判定
  // ==================================================
 
  function isBlocked(
    area,
    x,
    y
  ) {
 
    const map =
      MAPS[
        area
      ];
 
 
    if (
      !map
    ) {
 
      return true;
 
    }
 
 
    const foot =
      getPlayerFootBox(
        x,
        y,
        map
      );
 
 
    if (
      Array.isArray(
        map.exits
      )
    ) {
 
      for (
        const exit
        of map.exits
      ) {
 
        if (
          isInsideExit(
            foot,
            exit
          )
        ) {
 
          return false;
 
        }
 
      }
 
    }
 
 
    if (
      isOutsideBounds(
        map,
        foot
      )
    ) {
 
      return true;
 
    }
 
 
    const points = [
 
      [
        foot.left,
        foot.top
      ],
 
      [
        foot.right,
        foot.top
      ],
 
      [
        foot.left,
        foot.bottom
      ],
 
      [
        foot.right,
        foot.bottom
      ],
 
      [
        foot.centerX,
        foot.centerY
      ]
 
    ];
 
 
    for (
      const [
        pointX,
        pointY
      ]
      of points
    ) {
 
      if (
        pointBlocked(
          map,
          pointX,
          pointY
        )
      ) {
 
        return true;
 
      }
 
    }
 
 
    return false;
 
  }
 
 
  // ==================================================
  // マップ変更
  // ==================================================
 
  function changeMap(exit) {
 
    const {
      game
    } = settings;
 
 
    const targetMap =
      MAPS[
        exit.targetMap
      ];
 
 
    if (
      !targetMap
    ) {
 
      console.error(
        "移動先マップが見つかりません:",
        exit.targetMap
      );
 
      return false;
 
    }
 
 
    game.area =
      targetMap.id;
 
 
    game.stepsSinceBattle =
      0;
 
 
    game.player.x =
      exit.targetX ??
      targetMap.spawn?.x ??
      0;
 
 
    game.player.y =
      exit.targetY ??
      targetMap.spawn?.y ??
      0;
 
 
    game.player.direction =
      exit.targetDirection ??
      targetMap.spawn?.direction ??
      "down";
 
 
    game.player.step =
      0;
 
 
    renderedMapId =
      null;
 
 
    updateField();
 
 
    if (
      typeof saveGame ===
      "function"
    ) {
 
      saveGame();
 
    }
 
 
    if (
      exit.message
    ) {
 
      setFieldMessage(
        exit.message
      );
 
    }
 
 
    return true;
 
  }
 
 
  // ==================================================
  // 指定マップへ直接移動
  // ==================================================
 
  function goToMap(
    mapId,
    options = {}
  ) {
 
    const targetMap =
      MAPS[
        mapId
      ];
 
 
    if (
      !targetMap
    ) {
 
      console.error(
        "マップが見つかりません:",
        mapId
      );
 
      return false;
 
    }
 
 
    return changeMap({
 
      targetMap:
        mapId,
 
      targetX:
        options.x ??
        targetMap.spawn?.x,
 
      targetY:
        options.y ??
        targetMap.spawn?.y,
 
      targetDirection:
        options.direction ??
        targetMap.spawn?.direction,
 
      message:
        options.message
 
    });
 
  }
 
 
  // ==================================================
  // 少しずつ移動
  // ==================================================
 
  function tryMove(
    direction,
    distance
  ) {
 
    const {
      game
    } = settings;
 
 
    const map =
      getCurrentMap();
 
 
    let remaining =
      distance;
 
 
    let moved =
      false;
 
 
    const subStep =
      isPixelMap(
        map
      )
        ? 2
        : 1;
 
 
    while (
      remaining > 0
    ) {
 
      const amount =
        Math.min(
          subStep,
          remaining
        );
 
 
      let nextX =
        game.player.x;
 
 
      let nextY =
        game.player.y;
 
 
      if (
        direction ===
        "up"
      ) {
 
        nextY -=
          amount;
 
      }
 
 
      if (
        direction ===
        "down"
      ) {
 
        nextY +=
          amount;
 
      }
 
 
      if (
        direction ===
        "left"
      ) {
 
        nextX -=
          amount;
 
      }
 
 
      if (
        direction ===
        "right"
      ) {
 
        nextX +=
          amount;
 
      }
 
 
      const exit =
        findExit(
          direction,
          nextX,
          nextY
        );
 
 
      if (
        exit
      ) {
 
        changeMap(
          exit
        );
 
 
        return {
 
          moved:
            true,
 
          changedMap:
            true
 
        };
 
      }
 
 
      if (
        isBlocked(
          game.area,
          nextX,
          nextY
        )
      ) {
 
        break;
 
      }
 
 
      game.player.x =
        nextX;
 
 
      game.player.y =
        nextY;
 
 
      moved =
        true;
 
 
      remaining -=
        amount;
 
    }
 
 
    return {
 
      moved,
 
      changedMap:
        false
 
    };
 
  }
 
 
  // ==================================================
  // 主人公移動
  // ==================================================
 
  function movePlayer(
    direction
  ) {
 
    const {
      game
    } = settings;
 
 
    const map =
      getCurrentMap();
 
 
    if (
      !map
    ) {
 
      return;
 
    }
 
 
    const speed =
      map.movementSpeed ??
      (
        isPixelMap(
          map
        )
          ? 12
          : 4
      );
 
 
    game.player.direction =
      direction;
 
 
    const result =
      tryMove(
        direction,
        speed
      );
 
 
    if (
      result.changedMap
    ) {
 
      return;
 
    }
 
 
    if (
      !result.moved
    ) {
 
      game.player.step =
        0;
 
 
      updateField();
 
 
      return;
 
    }
 
 
    game.player.step++;
 
 
    updateField();
 
 
    resetPlayerToIdle();
 
 
    scheduleSave();
 
 
    if (
      map.encounter
    ) {
 
      game.stepsSinceBattle++;
 
 
      checkEncounter(
        map
      );
 
    }
 
  }
 
 
  // ==================================================
  // 主人公・移動終了後に待機へ戻す
  // ==================================================
 
  function resetPlayerToIdle() {
 
    const {
      game
    } = settings;
 
 
    if (
      playerIdleTimer
    ) {
 
      clearTimeout(
        playerIdleTimer
      );
 
    }
 
 
    playerIdleTimer =
      setTimeout(
        () => {
 
          game.player.step =
            0;
 
 
          updateField();
 
 
          playerIdleTimer =
            null;
 
        },
        120
      );
 
  }
 
 
  // ==================================================
  // エンカウント
  // ==================================================
 
  function checkEncounter(
    map =
      getCurrentMap()
  ) {
 
    const {
      game,
      startBattle
    } = settings;
 
 
    if (
      !map ||
      !map.encounter
    ) {
 
      return;
 
    }
 
 
    const safeSteps =
      map.safeSteps ??
      12;
 
 
    const encounterChance =
      map.encounterChance ??
      0.10;
 
 
    if (
      game.stepsSinceBattle <
      safeSteps
    ) {
 
      return;
 
    }
 
 
    if (
      Math.random() <
      encounterChance
    ) {
 
      game.stepsSinceBattle =
        0;
 
 
      if (
        startBattle
      ) {
 
        startBattle();
 
      }
 
    }
 
  }
 
 
  // ==================================================
  // キーボード
  // ==================================================
 
  function handleKeydown(
    event
  ) {
 
    const {
      screens
    } = settings;
 
 
    if (
      !screens.field
        .classList
        .contains(
          "active"
        )
    ) {
 
      return;
 
    }
 
 
    const keys = {
 
      ArrowUp:
        "up",
 
      ArrowDown:
        "down",
 
      ArrowLeft:
        "left",
 
      ArrowRight:
        "right"
 
    };
 
 
    const direction =
      keys[
        event.key
      ];
 
 
    if (
      !direction
    ) {
 
      return;
 
    }
 
 
    event.preventDefault();
 
 
    movePlayer(
      direction
    );
 
  }
 
 
  // ==================================================
  // 外部公開
  // ==================================================
 
  return {
 
    init,
 
    registerMap,
 
    updateField,
 
    movePlayer,
 
    goToMap,
 
    changeMap,
 
    checkEncounter,
 
    setFieldMessage,
 
    handleKeydown,
 
    isBlocked,
 
    getCurrentMap
 
  };
 
})();
