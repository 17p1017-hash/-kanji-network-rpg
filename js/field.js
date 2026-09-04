// ==================================================
// field.js
// 共通フィールドシステム
//
// 対応:
// ・通常1枚マップ（％座標）
// ・大型タイルマップ（px座標）
// ・カメラ追従
// ・当たり判定
// ・出口
// ・エンカウント
// ==================================================

window.FieldModule = (() => {

  let settings = null;


  // ==================================================
  // マップ一覧
  // ==================================================

  const MAPS = {};


  // ==================================================
  // 大型マップ用
  // ==================================================

  let worldLayer = null;

  let renderedMapId = null;


  // ==================================================
  // 初期化
  // ==================================================

  function init(options) {

    settings = options;


    // ----------------------------------------------
    // マップ登録
    // ----------------------------------------------

    if (window.MAP_KINGDOM) {

      MAPS[
        window.MAP_KINGDOM.id
      ] = window.MAP_KINGDOM;

    }


    if (window.MAP_READING_FOREST) {

      MAPS[
        window.MAP_READING_FOREST.id
      ] = window.MAP_READING_FOREST;

    }


    // ----------------------------------------------
    // フィールド基本設定
    // ----------------------------------------------

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
    // 旧セーブデータ対策
    //
    // 以前の王国は％座標だったため
    // x:50 y:58 などが保存されている可能性がある
    // ----------------------------------------------

    migrateOldKingdomPosition();


    // ----------------------------------------------
    // 画面サイズ変更時
    // カメラ位置を再計算
    // ----------------------------------------------

    window.addEventListener(
      "resize",
      () => {

        updateField();

      }
    );

  }


  // ==================================================
  // 旧王国座標を新王国へ移行
  // ==================================================

  function migrateOldKingdomPosition() {

    const {
      game
    } = settings;


    if (
      game.area !==
      "kingdom"
    ) {

      return;

    }


    const map =
      MAPS.kingdom;


    if (
      !map ||
      map.coordinateUnit !==
      "pixel"
    ) {

      return;

    }


    // ----------------------------------------------
    // 旧％座標と判断
    // ----------------------------------------------

    if (
      game.player.x <= 100 &&
      game.player.y <= 100
    ) {

      game.player.x =
        map.spawn.x;

      game.player.y =
        map.spawn.y;

      game.player.direction =
        map.spawn.direction ||
        "up";

    }

  }


  // ==================================================
  // 現在のマップ
  // ==================================================

  function getCurrentMap() {

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

    const {
      fieldMessage
    } = settings;


    if (fieldMessage) {

      fieldMessage.textContent =
        text;

    }

  }


  // ==================================================
  // 大型マップ用レイヤー作成
  // ==================================================

  function createWorldLayer() {

    const {
      field
    } = settings;


    if (
      worldLayer &&
      worldLayer.parentElement === field
    ) {

      return worldLayer;

    }


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


    field.appendChild(
      worldLayer
    );


    return worldLayer;

  }


  // ==================================================
  // 9枚マップを作る
  // ==================================================

  function renderTiledMap(map) {

    const {
      field,
      playerElement
    } = settings;


    const layer =
      createWorldLayer();


    // ----------------------------------------------
    // 同じマップなら作り直さない
    // ----------------------------------------------

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


      return;

    }


    renderedMapId =
      map.id;


    layer.innerHTML =
      "";


    layer.style.display =
      "block";


    layer.style.width =
      map.width + "px";

    layer.style.height =
      map.height + "px";


    // ----------------------------------------------
    // 9枚配置
    // ----------------------------------------------

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
          map.tileWidth + "px";

        image.style.height =
          map.tileHeight + "px";

        image.style.display =
          "block";

        image.style.userSelect =
          "none";

        image.style.pointerEvents =
          "none";


        layer.appendChild(
          image
        );

      }
    );


    // ----------------------------------------------
    // 主人公を画像より前へ
    // ----------------------------------------------

    layer.appendChild(
      playerElement
    );


    playerElement.style.position =
      "absolute";

    playerElement.style.zIndex =
      "20";


    // ----------------------------------------------
    // 旧背景を消す
    // ----------------------------------------------

    field.style.backgroundImage =
      "none";

  }


  // ==================================================
  // 通常1枚マップ表示
  // ==================================================

  function renderNormalMap(map) {

    const {
      field,
      playerElement
    } = settings;


    renderedMapId =
      null;


    // ----------------------------------------------
    // 大型マップを隠す
    // ----------------------------------------------

    if (worldLayer) {

      worldLayer.style.display =
        "none";

    }


    // ----------------------------------------------
    // 主人公をfieldへ戻す
    // ----------------------------------------------

    if (
      playerElement.parentElement !==
      field
    ) {

      field.appendChild(
        playerElement
      );

    }


    // ----------------------------------------------
    // 背景
    // ----------------------------------------------

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
  // カメラ更新
  // ==================================================

  function updateCamera(
    map
  ) {

    const {
      game,
      field
    } = settings;


    if (
      !worldLayer ||
      !isPixelMap(map)
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


    // ----------------------------------------------
    // 主人公を中央へ
    // ----------------------------------------------

    let cameraX =
      game.player.x -
      viewportWidth / 2;


    let cameraY =
      game.player.y -
      viewportHeight / 2;


    // ----------------------------------------------
    // マップ端ではカメラを止める
    // ----------------------------------------------

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
  // フィールド表示更新
  // ==================================================

  function updateField() {

    const {
      game,
      field,
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
    // マップ名
    // ----------------------------------------------

    if (areaName) {

      areaName.textContent =
        map.name;

    }


    // ==================================================
    // 大型pxマップ
    // ==================================================

    if (
      isPixelMap(map)
    ) {

      renderTiledMap(
        map
      );


      playerElement.style.left =
        game.player.x + "px";


      playerElement.style.top =
        game.player.y + "px";


      updateCamera(
        map
      );

    }


    // ==================================================
    // 通常％マップ
    // ==================================================

    else {

      renderNormalMap(
        map
      );


      playerElement.style.left =
        game.player.x + "%";


      playerElement.style.top =
        game.player.y + "%";

    }


    // ==================================================
    // 主人公アニメ
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
      game.player.step % 3;


    playerElement.style.backgroundPosition =
      `${-column * 32}px ${-row * 32}px`;

  }


  // ==================================================
  // 点が多角形の中にあるか
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


      if (intersects) {

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


      // ----------------------------------------------
      // 四角
      // ----------------------------------------------

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


      // ----------------------------------------------
      // 円
      // ----------------------------------------------

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
          item.r * item.r
        ) {

          return true;

        }

      }


      // ----------------------------------------------
      // 多角形
      // ----------------------------------------------

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
  // 主人公の足元判定
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


      return {

        left:
          x +
          width * 0.28,

        right:
          x +
          width * 0.72,

        top:
          y +
          height * 0.70,

        bottom:
          y +
          height * 0.92,

        centerX:
          x +
          width * 0.50,

        centerY:
          y +
          height * 0.82

      };

    }


    // ==================================================
    // ％マップ
    // ==================================================

    let playerWidthPercent =
      5;


    let playerHeightPercent =
      7;


    if (
      field &&
      playerElement &&
      field.clientWidth > 0 &&
      field.clientHeight > 0
    ) {

      playerWidthPercent =
        (
          playerElement.offsetWidth /
          field.clientWidth
        ) * 100;


      playerHeightPercent =
        (
          playerElement.offsetHeight /
          field.clientHeight
        ) * 100;

    }


    const left =
      x +
      playerWidthPercent *
      0.28;


    const right =
      x +
      playerWidthPercent *
      0.72;


    const top =
      y +
      playerHeightPercent *
      0.70;


    const bottom =
      y +
      playerHeightPercent *
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
      foot.centerX >= exit.x1 &&
      foot.centerX <= exit.x2 &&
      foot.centerY >= exit.y1 &&
      foot.centerY <= exit.y2
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


    const {
      left,
      right,
      top,
      bottom
    } = map.bounds;


    return (
      foot.centerX < left ||
      foot.centerX > right ||
      foot.centerY < top ||
      foot.centerY > bottom
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


    if (!map) {

      return true;

    }


    const foot =
      getPlayerFootBox(
        x,
        y,
        map
      );


    // ----------------------------------------------
    // 出口を優先
    // ----------------------------------------------

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


    // ----------------------------------------------
    // 外周
    // ----------------------------------------------

    if (
      isOutsideBounds(
        map,
        foot
      )
    ) {

      return true;

    }


    // ----------------------------------------------
    // 足元5点
    // ----------------------------------------------

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
      const point
      of points
    ) {

      if (
        pointBlocked(
          map,
          point[0],
          point[1]
        )
      ) {

        return true;

      }

    }


    return false;

  }


  // ==================================================
  // マップ移動
  // ==================================================

  function changeMap(exit) {

    const {
      game
    } = settings;


    const targetMap =
      MAPS[
        exit.targetMap
      ];


    if (!targetMap) {

      console.error(
        "移動先マップが見つかりません:",
        exit.targetMap
      );

      return;

    }


    game.area =
      exit.targetMap;


    game.stepsSinceBattle =
      0;


    // ==================================================
    // 移動先がpxマップ
    //
    // 旧forest.jsから
    // x:50 y:82 等で戻ってきても対応
    // ==================================================

    if (
      isPixelMap(
        targetMap
      ) &&
      (
        exit.targetX <= 100 &&
        exit.targetY <= 100
      )
    ) {

      game.player.x =
        targetMap.spawn.x;

      game.player.y =
        targetMap.spawn.y;

    }

    else {

      game.player.x =
        exit.targetX;

      game.player.y =
        exit.targetY;

    }


    game.player.direction =
      exit.targetDirection ||
      targetMap.spawn?.direction ||
      "down";


    updateField();


    if (
      exit.message
    ) {

      setFieldMessage(
        exit.message
      );

    }

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
    // pxなら2pxずつ
    // ％なら1％ずつ
    // ----------------------------------------------

    const subStep =
      isPixelMap(map)
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


      // ----------------------------------------------
      // 出口
      // ----------------------------------------------

      const exit =
        findExit(
          direction,
          nextX,
          nextY
        );


      if (exit) {

        changeMap(
          exit
        );


        return {

          moved: true,

          changedMap: true

        };

      }


      // ----------------------------------------------
      // 障害物
      // ----------------------------------------------

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

      changedMap: false

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


    // ----------------------------------------------
    // 大型王国はpx
    // 森は今まで通り％
    // ----------------------------------------------

    const speed =
      isPixelMap(map)
        ? 12
        : 4;


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
    // エンカウント
    // ----------------------------------------------

    if (
      map &&
      map.encounter
    ) {

      game.stepsSinceBattle++;


      checkEncounter();

    }

  }


  // ==================================================
  // 王国 → 森
  // 旧コード互換
  // ==================================================

  function enterForest() {

    changeMap({

      targetMap:
        "forest",

      targetX:
        61,

      targetY:
        8,

      targetDirection:
        "down",

      message:
        "読みの森に入った！ ことばの気配がする……"

    });

  }


  // ==================================================
  // 森 → 王国
  // ==================================================

  function returnToKingdom() {

    const kingdom =
      MAPS.kingdom;


    changeMap({

      targetMap:
        "kingdom",

      targetX:
        kingdom?.spawn?.x ??
        627,

      targetY:
        kingdom?.spawn?.y ??
        1030,

      targetDirection:
        "up",

      message:
        "はじまりの王国に戻ってきた。"

    });

  }


  // ==================================================
  // エンカウント
  // ==================================================

  function checkEncounter() {

    const {
      game,
      startBattle
    } = settings;


    const safeSteps =
      12;


    if (
      game.stepsSinceBattle <
      safeSteps
    ) {

      return;

    }


    const encounterChance =
      0.10;


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


    if (
      keys[
        event.key
      ]
    ) {

      event.preventDefault();


      movePlayer(
        keys[
          event.key
        ]
      );

    }

  }


  // ==================================================
  // 外部公開
  // ==================================================

  return {

    init,

    updateField,

    movePlayer,

    enterForest,

    returnToKingdom,

    checkEncounter,

    setFieldMessage,

    handleKeydown,

    isBlocked,

    getCurrentMap

  };

})();
