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
  // オブジェクトを1個作成
  //
  // object.image
  // → 単独PNG
  //
  // object.sheet
  // → A / B / Cシート
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


    element.style.width =
      (object.width ?? 0) +
      "px";


    element.style.height =
      (object.height ?? 0) +
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
    // ==================================================

    if (
      object.image
    ) {

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
       */
      element.style.backgroundSize =
        `${object.width * columns}px ` +
        `${object.height * rows}px`;


      element.style.backgroundPosition =
        `${-object.width * col}px ` +
        `${-object.height * row}px`;

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
