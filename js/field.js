// ==================================================
// field.js
// フィールド移動・エリア移動・エンカウント・障害物判定
// ==================================================

window.FieldModule = (() => {

  let settings = null;


  // ==================================================
  // 障害物データ
  //
  // x1 = 左
  // x2 = 右
  // y1 = 上
  // y2 = 下
  //
  // すべてフィールドに対する % 座標
  // ==================================================

  const COLLISION_MAPS = {

    // ==================================================
    // はじまりの王国
    // ==================================================

    kingdom: [

      // ------------------------------
      // 上側の城
      // ------------------------------
      {
        name: "城",
        x1: 25,
        x2: 75,
        y1: 5,
        y2: 31
      },


      // ------------------------------
      // 左上の建物
      // ------------------------------
      {
        name: "左上の建物",
        x1: 7,
        x2: 27,
        y1: 23,
        y2: 45
      },


      // ------------------------------
      // 右上の建物
      // ------------------------------
      {
        name: "右上の建物",
        x1: 73,
        x2: 93,
        y1: 23,
        y2: 45
      },


      // ------------------------------
      // 左側の木
      // ------------------------------
      {
        name: "左の木",
        x1: 5,
        x2: 18,
        y1: 48,
        y2: 66
      },


      // ------------------------------
      // 右側の木
      // ------------------------------
      {
        name: "右の木",
        x1: 82,
        x2: 95,
        y1: 48,
        y2: 66
      },


      // ------------------------------
      // 左下の障害物
      // ------------------------------
      {
        name: "左下の木",
        x1: 7,
        x2: 22,
        y1: 67,
        y2: 84
      },


      // ------------------------------
      // 右下の障害物
      // ------------------------------
      {
        name: "右下の木",
        x1: 78,
        x2: 93,
        y1: 67,
        y2: 84
      }

    ],


    // ==================================================
    // 読みの森
    // ==================================================

    forest: [

      // ------------------------------
      // 左上の木々
      // ------------------------------
      {
        name: "左上の木",
        x1: 4,
        x2: 30,
        y1: 5,
        y2: 25
      },


      // ------------------------------
      // 右上の木々
      // ------------------------------
      {
        name: "右上の木",
        x1: 70,
        x2: 96,
        y1: 5,
        y2: 25
      },


      // ------------------------------
      // 左中央の木々
      // ------------------------------
      {
        name: "左中央の木",
        x1: 3,
        x2: 24,
        y1: 27,
        y2: 55
      },


      // ------------------------------
      // 右中央の木々
      // ------------------------------
      {
        name: "右中央の木",
        x1: 76,
        x2: 97,
        y1: 27,
        y2: 55
      },


      // ------------------------------
      // 左下の木々
      // ------------------------------
      {
        name: "左下の木",
        x1: 3,
        x2: 28,
        y1: 57,
        y2: 88
      },


      // ------------------------------
      // 右下の木々
      // ------------------------------
      {
        name: "右下の木",
        x1: 72,
        x2: 97,
        y1: 57,
        y2: 88
      },


      // ------------------------------
      // 池
      // ------------------------------
      {
        name: "池",
        x1: 34,
        x2: 58,
        y1: 48,
        y2: 66
      },


      // ------------------------------
      // 岩
      // ------------------------------
      {
        name: "岩",
        x1: 60,
        x2: 70,
        y1: 61,
        y2: 72
      }

    ]

  };


  // ==================================================
  // 初期化
  // ==================================================

  function init(options) {

    settings = options;

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


    playerElement.style.left =
      game.player.x + "%";


    playerElement.style.top =
      game.player.y + "%";


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


    if (
      game.area ===
      "kingdom"
    ) {

      areaName.textContent =
        "はじまりの王国";


      field.style.backgroundImage =
        'url("images/kingdom.png")';

    } else {

      areaName.textContent =
        "読みの森";


      field.style.backgroundImage =
        'url("images/reading_forest.png")';

    }

  }


  // ==================================================
  // 障害物判定
  // ==================================================

  function isBlocked(
    area,
    x,
    y
  ) {

    const obstacles =
      COLLISION_MAPS[area] || [];


    // ==================================================
    // 主人公は32×32なので、
    // 画像全体ではなく「足元」で判定する
    //
    // x,y は主人公画像の位置。
    // 少し下側を実際の足として扱う。
    // ==================================================

    const footX =
      x;

    const footY =
      y + 3;


    for (
      const obstacle
      of obstacles
    ) {

      if (
        footX >= obstacle.x1 &&
        footX <= obstacle.x2 &&
        footY >= obstacle.y1 &&
        footY <= obstacle.y2
      ) {

        return true;

      }

    }


    return false;

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


    // 向きだけは必ず変える
    game.player.direction =
      direction;


    // ==================================================
    // 現在位置を保存
    // ==================================================

    const oldX =
      game.player.x;

    const oldY =
      game.player.y;


    // ==================================================
    // 移動予定位置を作る
    // ==================================================

    let nextX =
      oldX;

    let nextY =
      oldY;


    if (
      direction ===
      "up"
    ) {

      nextY -=
        speed;

    }


    if (
      direction ===
      "down"
    ) {

      nextY +=
        speed;

    }


    if (
      direction ===
      "left"
    ) {

      nextX -=
        speed;

    }


    if (
      direction ===
      "right"
    ) {

      nextX +=
        speed;

    }


    // ==================================================
    // 左右の画面外へ出ない
    // ==================================================

    nextX =
      Math.max(
        8,
        Math.min(
          92,
          nextX
        )
      );


    // ==================================================
    // 王国 → 読みの森
    //
    // 王国の下端だけは、
    // 障害物判定より先に出口として扱う
    // ==================================================

    if (
      game.area ===
        "kingdom" &&
      nextY >=
        90
    ) {

      enterForest();

      return;

    }


    // ==================================================
    // 読みの森 → 王国
    //
    // 森の上端だけ出口
    // ==================================================

    if (
      game.area ===
        "forest" &&
      nextY <=
        8
    ) {

      returnToKingdom();

      return;

    }


    // ==================================================
    // 上下の画面外へ出ない
    // ==================================================

    nextY =
      Math.max(
        8,
        Math.min(
          90,
          nextY
        )
      );


    // ==================================================
    // 障害物チェック
    // ==================================================

    if (
      isBlocked(
        game.area,
        nextX,
        nextY
      )
    ) {

      // 移動しない。
      // 向きだけ変更して表示する。

      updateField();

      return;

    }


    // ==================================================
    // 移動OK
    // ==================================================

    game.player.x =
      nextX;

    game.player.y =
      nextY;


    game.player.step++;


    updateField();


    // ==================================================
    // 読みの森だけエンカウント
    //
    // 障害物にぶつかっただけでは
    // 歩数に数えない。
    // ==================================================

    if (
      game.area ===
      "forest"
    ) {

      game.stepsSinceBattle++;


      checkEncounter();

    }

  }


  // ==================================================
  // 王国 → 読みの森
  // ==================================================

  function enterForest() {

    const {
      game
    } = settings;


    game.area =
      "forest";


    game.stepsSinceBattle =
      0;


    game.player.x =
      50;


    game.player.y =
      16;


    game.player.direction =
      "down";


    updateField();


    setFieldMessage(
      "読みの森に入った！ ことばの気配がする……"
    );

  }


  // ==================================================
  // 読みの森 → 王国
  // ==================================================

  function returnToKingdom() {

    const {
      game
    } = settings;


    game.area =
      "kingdom";


    game.stepsSinceBattle =
      0;


    game.player.x =
      50;


    game.player.y =
      82;


    game.player.direction =
      "up";


    updateField();


    setFieldMessage(
      "はじまりの王国に戻ってきた。"
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


    // 最低12歩は安全
    const safeSteps =
      12;


    if (
      game.stepsSinceBattle <
      safeSteps
    ) {

      return;

    }


    // その後は1歩ごとに10%
    const encounterChance =
      0.10;


    if (
      Math.random() <
      encounterChance
    ) {

      game.stepsSinceBattle =
        0;


      if (startBattle) {

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

    isBlocked

  };

})();
