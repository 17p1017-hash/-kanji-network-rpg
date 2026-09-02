// ==================================================
// field.js
// フィールド移動・エリア移動・エンカウント担当
// ==================================================

window.FieldModule = (() => {

  let settings = null;


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
  // 主人公移動
  // ==================================================

  function movePlayer(direction) {

    const {
      game
    } = settings;


    const speed = 4;


    game.player.direction =
      direction;


    if (
      direction ===
      "up"
    ) {

      game.player.y -=
        speed;

    }


    if (
      direction ===
      "down"
    ) {

      game.player.y +=
        speed;

    }


    if (
      direction ===
      "left"
    ) {

      game.player.x -=
        speed;

    }


    if (
      direction ===
      "right"
    ) {

      game.player.x +=
        speed;

    }


    game.player.x =
      Math.max(
        8,
        Math.min(
          92,
          game.player.x
        )
      );


    game.player.step++;


    // ==================================================
    // 王国 → 読みの森
    // ==================================================

    if (
      game.area ===
        "kingdom" &&
      game.player.y >=
        90
    ) {

      enterForest();

      return;

    }


    // ==================================================
    // 読みの森 → 王国
    // ==================================================

    if (
      game.area ===
        "forest" &&
      game.player.y <=
        8
    ) {

      returnToKingdom();

      return;

    }


    game.player.y =
      Math.max(
        8,
        Math.min(
          90,
          game.player.y
        )
      );


    updateField();


    // ==================================================
    // 読みの森だけエンカウント
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

    handleKeydown

  };

})();
