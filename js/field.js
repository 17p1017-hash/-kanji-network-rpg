// ==================================================
// field.js
// 共通フィールドシステム
// マップ移動・当たり判定・出口・エンカウント
// ==================================================

window.FieldModule = (() => {

  let settings = null;


  // ==================================================
  // マップ一覧
  // ==================================================

  const MAPS = {};


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

  }


  // ==================================================
  // 現在のマップを取得
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
    // 主人公位置
    // ----------------------------------------------

    playerElement.style.left =
      game.player.x + "%";


    playerElement.style.top =
      game.player.y + "%";


    // ----------------------------------------------
    // 主人公向き
    // ----------------------------------------------

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


    // ----------------------------------------------
    // マップ名
    // ----------------------------------------------

    areaName.textContent =
      map.name;


    // ----------------------------------------------
    // 背景画像
    // ----------------------------------------------

    field.style.backgroundImage =
      `url("${map.image}")`;

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
  // 点が障害物に入っているか
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
    y
  ) {

    const {
      field,
      playerElement
    } = settings;


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


    // ----------------------------------------------
    // 主人公画像の下側だけを
    // 足元として判定
    // ----------------------------------------------

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


    const centerX =
      (
        left +
        right
      ) / 2;


    const centerY =
      (
        top +
        bottom
      ) / 2;


    return {

      left,

      right,

      top,

      bottom,

      centerX,

      centerY

    };

  }


  // ==================================================
  // 出口内にいるか
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
  // 出口を探す
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
        y
      );


    for (
      const exit
      of map.exits
    ) {

      if (
        exit.direction &&
        exit.direction !== direction
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
  // マップ外周判定
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


    if (
      foot.centerX < left ||
      foot.centerX > right ||
      foot.centerY < top ||
      foot.centerY > bottom
    ) {

      return true;

    }


    return false;

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
      MAPS[area];


    if (!map) {

      return true;

    }


    const foot =
      getPlayerFootBox(
        x,
        y
      );


    // ----------------------------------------------
    // 出口部分は外周より優先
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
    // マップ外周
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
    // 足元5点でチェック
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


    game.player.x =
      exit.targetX;


    game.player.y =
      exit.targetY;


    game.player.direction =
      exit.targetDirection ||
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
  //
  // 4%を一気に移動せず、
  // 1%ずつ当たり判定する
  // ==================================================

  function tryMove(
    direction,
    distance
  ) {

    const {
      game
    } = settings;


    let remaining =
      distance;


    let moved =
      false;


    const subStep =
      1;


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
      // 出口判定
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
      // 障害物判定
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


      // ----------------------------------------------
      // 移動
      // ----------------------------------------------

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

  function movePlayer(direction) {

    const {
      game
    } = settings;


    const speed =
      4;


    // ----------------------------------------------
    // 向き変更
    // ----------------------------------------------

    game.player.direction =
      direction;


    // ----------------------------------------------
    // 移動
    // ----------------------------------------------

    const result =
      tryMove(
        direction,
        speed
      );


    updateField();


    // ----------------------------------------------
    // マップ移動した場合
    // ----------------------------------------------

    if (
      result.changedMap
    ) {

      return;

    }


    // ----------------------------------------------
    // 動けなかった場合
    // ----------------------------------------------

    if (
      !result.moved
    ) {

      return;

    }


    game.player.step++;


    // ----------------------------------------------
    // エンカウント
    // ----------------------------------------------

    const map =
      getCurrentMap();


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
  //
  // 旧コードとの互換用
  // ==================================================

  function enterForest() {

    const exit = {

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

    };


    changeMap(
      exit
    );

  }


  // ==================================================
  // 森 → 王国
  //
  // 旧コードとの互換用
  // ==================================================

  function returnToKingdom() {

    const exit = {

      targetMap:
        "kingdom",

      targetX:
        48,

      targetY:
        78,

      targetDirection:
        "up",

      message:
        "はじまりの王国に戻ってきた。"

    };


    changeMap(
      exit
    );

  }


  // ==================================================
  // エンカウント判定
  // ==================================================

  function checkEncounter() {

    const {
      game,
      startBattle
    } = settings;


    // ----------------------------------------------
    // 最低12歩は安全
    // ----------------------------------------------

    const safeSteps =
      12;


    if (
      game.stepsSinceBattle <
      safeSteps
    ) {

      return;

    }


    // ----------------------------------------------
    // その後は1歩ごとに10%
    // ----------------------------------------------

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
  // キーボード操作
  // ==================================================

  function handleKeydown(event) {

    const {
      screens
    } = settings;


    if (
      !screens.field
        .classList
        .contains("active")
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
      keys[event.key]
    ) {

      event.preventDefault();


      movePlayer(
        keys[event.key]
      );

    }

  }


  // ==================================================
  // 外から使える機能
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
