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

  let foregroundLayer = null;

  let renderedMapId = null;


  // ==================================================
  // 自動保存
  // ==================================================

  let saveTimer = null;


  function scheduleSave() {

    if (
      typeof saveGame !== "function"
    ) {

      return;

    }


    if (saveTimer) {

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


    if (field) {

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

    if (!settings) {

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

    if (!settings) {

      return;

    }


    const {
      fieldMessage
    } = settings;


    if (fieldMessage) {

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
  //
  // 例:
  //
  // visibleWhen: {
  //   flag: "kotobaGateRepaired",
  //   equals: false
  // }
  //
  // または
  //
  // visibleWhen: game => true
  // ==================================================

  function isOverlayVisible(
    overlay
  ) {

    const {
      game
    } = settings;


    const rule =
      overlay.visibleWhen;


    // ----------------------------------------------
    // 条件なし
    // ----------------------------------------------

    if (
      rule === undefined ||
      rule === null
    ) {

      return true;

    }


    // ----------------------------------------------
    // 関数形式
    // ----------------------------------------------

    if (
      typeof rule ===
      "function"
    ) {

      return !!rule(
        game
      );

    }


    // ----------------------------------------------
    // フラグ形式
    // ----------------------------------------------

    if (
      typeof rule ===
        "object" &&
      rule.flag
    ) {

      // ------------------------------------------
      // 未定義のbooleanフラグは
      // falseとして扱う
      // ------------------------------------------

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


          if (!overlay) {

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


    if (!map) {

      console.error(
        "マップが見つかりません:",
        game.area
      );

      return;

    }


    // ----------------------------------------------
    // エリア名
    // ----------------------------------------------

    if (
      areaName
    ) {

      areaName.textContent =
        map.name;

    }


    // ==================================================
    // pxマップ
    // ==================================================

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


    // ==================================================
    // %マップ
    // ==================================================

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
      game.player.step %
      3;


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
      !map ||
      !Array.isArray(
        map.collisions
      )
    ) {

      return false;

    }


    for (
      const item
      of map.collisions
    ) {


      // ==================================================
      // 四角
      // ==================================================

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


      // ==================================================
      // 円
      // ==================================================

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


      // ==================================================
      // 多角形
      // ==================================================

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


    // ==================================================
    // pxマップ
    // ==================================================

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


    // ==================================================
    // %マップ
    // ==================================================

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


    // ==================================================
    // 出口部分は通れる
    // ==================================================

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


    // ==================================================
    // 外周
    // ==================================================

    if (
      isOutsideBounds(
        map,
        foot
      )
    ) {

      return true;

    }


    // ==================================================
    // 足元5点
    // ==================================================

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


    // ----------------------------------------------
    // マップ変更
    // ----------------------------------------------

    game.area =
      targetMap.id;


    game.stepsSinceBattle =
      0;


    // ----------------------------------------------
    // 移動先座標
    //
    // 出口側で指定
    // ↓
    // なければspawn
    // ----------------------------------------------

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


    updateField();


    // ----------------------------------------------
    // マップ移動したら即保存
    // ----------------------------------------------

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
  //
  // 将来:
  // ・ことばの栞
  // ・ファストトラベル
  // でも使用可能
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


    // ----------------------------------------------
    // pxマップ
    // → 2pxずつ
    //
    // %マップ
    // → 1%ずつ
    // ----------------------------------------------

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


      // ==================================================
      // 出口
      // ==================================================

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


      // ==================================================
      // 障害物
      // ==================================================

      if (
        isBlocked(
          game.area,
          nextX,
          nextY
        )
      ) {

        break;

      }


      // ==================================================
      // 移動確定
      // ==================================================

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


    // ----------------------------------------------
    // マップ側で速度指定可能
    // ----------------------------------------------

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


    updateField();


    if (
      result.changedMap
    ) {

      return;

    }


    if (
      !result.moved
    ) {

      return;

    }


    game.player.step++;


    // ----------------------------------------------
    // 現在地を自動保存
    // ----------------------------------------------

    scheduleSave();


    // ==================================================
    // エンカウント
    // ==================================================

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


    // ----------------------------------------------
    // マップ側で設定可能
    // ----------------------------------------------

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
