document.addEventListener("DOMContentLoaded", () => {

  // ==================================================
  // 教材データ
  // ==================================================

  if (typeof KANJI_YOMU === "undefined") {
    alert(
      "問題データを読み込めませんでした。data/yomu.js を確認してください。"
    );
    return;
  }

  const kanjiData = KANJI_YOMU;


  // ==================================================
  // 必要なモジュールを確認
  // ==================================================

  const requiredModules = [
    "FieldModule",
    "BattleModule",
    "ChallengeModule",
    "WritingModule",
    "MasteryModule"
  ];

  const missingModules =
    requiredModules.filter(
      name => !window[name]
    );

  if (missingModules.length > 0) {
    console.error(
      "必要なモジュールがありません:",
      missingModules
    );

    alert(
      "見つからないJS：\n" +
      missingModules.join("\n")
    );

    return;
  }


  // ==================================================
  // 画面
  // ==================================================

  const screens = {
  title:
    document.getElementById("title-screen"),

  field:
    document.getElementById("field-screen"),

  battle:
    document.getElementById("battle-screen"),

  skill:
    document.getElementById("skill-screen"),

  challenge:
    document.getElementById("challenge-screen"),

  network:
    document.getElementById("network-screen"),

  clear:
    document.getElementById("clear-screen")
};
  function showScreen(name) {

    Object.values(screens)
      .forEach(screen => {

        if (screen) {
          screen.classList.remove("active");
        }

      });


    if (screens[name]) {
      screens[name].classList.add("active");
    }

  }


  // ==================================================
  // セーブデータ
  // ==================================================

  const saveData =
    loadSaveData();


  // ==================================================
  // ことば進行データ
  // ==================================================

  function createWordProgress() {

    const progress = {};


    Object.keys(
      kanjiData.words
    ).forEach(word => {

      progress[word] = {
        successes:
          saveData?.words?.[word]?.successes || 0
      };

    });


    return progress;

  }


  // ==================================================
  // ゲーム本体データ
  // ==================================================

  const game = {

    area:
      "kingdom",


    player: {

      x: 50,

      y: 58,

      direction:
        "down",

      step: 0,


      // --------------------------
      // レベル
      // --------------------------

      level:
        saveData?.player?.level || 1,


      // --------------------------
      // HP
      // --------------------------

      hp:
        saveData?.player?.hp ?? 10,

      maxHp:
        saveData?.player?.maxHp || 10,


      // --------------------------
      // RP
      // --------------------------

      rp:
        saveData?.player?.rp ?? 10,

      maxRp:
        saveData?.player?.maxRp || 10,


      // --------------------------
      // EXP・ゴールド
      // --------------------------

      exp:
        saveData?.player?.exp || 0,

      gold:
        saveData?.player?.gold || 0

    },


    stepsSinceBattle:
      0,


    enemyIndex:
      0,


    enemies: [

      {
        name:
          "ワードスライム",

        image:
          "images/word_slime.png",

        maxHp:
          2,

        exp:
          2,

        gold:
          1,

        attack:
          1
      },

      {
        name:
          "コトガラス",

        image:
          "images/kotogarasu.png",

        maxHp:
          3,

        exp:
          3,

        gold:
          2,

        attack:
          1
      },

      {
        name:
          "カミキレ",

        image:
          "images/kamikire.png",

        maxHp:
          4,

        exp:
          5,

        gold:
          3,

        attack:
          1
      }

    ],


    currentEnemy:
      null,


    selectedWeapon:
      null,


    currentWord:
      null,


    currentQuestion:
      null,


    combo:
      0,


    maxComboThisBattle:
      0,


    battleBonusExp:
      0,


    masteryGoal:
      kanjiData.masteryGoal || 3,


    words:
      createWordProgress(),


    skills:
      saveData?.skills || []

  };


  window.game = game;


  // ==================================================
  // DOM
  // ==================================================

  const startButton =
    document.getElementById(
      "start-button"
    );


  const field =
    document.getElementById(
      "field"
    );


  const playerElement =
    document.getElementById(
      "player"
    );


  const areaName =
    document.getElementById(
      "area-name"
    );


  const fieldMessage =
    document.getElementById(
      "field-message"
    );


  const enemyName =
    document.getElementById(
      "enemy-name"
    );


  const enemySprite =
    document.getElementById(
      "enemy-sprite"
    );


  const battleMessage =
    document.getElementById(
      "battle-message"
    );


  const enemyHP =
    document.getElementById(
      "enemy-hp"
    );


  const challengeQuestion =
    document.getElementById(
      "challenge-question"
    );


  const answerArea =
    document.getElementById(
      "answer-area"
    );


  const networkCount =
    document.getElementById(
      "network-count"
    );


  // ==================================================
  // ネットワークのノード
  // ==================================================

  const networkNodes = {

    "読む":
      document.getElementById(
        "node-yomu"
      ),

    "読書":
      document.getElementById(
        "node-dokusho"
      ),

    "音読":
      document.getElementById(
        "node-ondoku"
      ),

    "読者":
      document.getElementById(
        "node-dokusha"
      )

  };


  // ==================================================
  // 学習成功を記録
  // ==================================================

  function registerSuccess(word) {

    const data =
      game.words[word];


    if (!data) {
      return;
    }


    if (
      data.successes <
      game.masteryGoal
    ) {

      data.successes++;

    }


    saveGame();

  }


  // ==================================================
  // FieldModule
  // ==================================================

  FieldModule.init({

    game,

    field,

    playerElement,

    areaName,

    fieldMessage,

    screens,

    startBattle: () => {
      BattleModule.startBattle();
    }

  });


  // ==================================================
  // MasteryModule
  // ==================================================

  MasteryModule.init({

    game,

    kanjiData,

    screens,

    challengeQuestion,

    answerArea,

    networkNodes,

    networkCount,

    showScreen,

    setFieldMessage: text => {
      FieldModule.setFieldMessage(text);
    }

  });


  // ==================================================
  // BattleModule
  // ==================================================

  BattleModule.init({

    game,

    enemyName,

    enemySprite,

    battleMessage,

    enemyHP,

    showScreen,

    showNetwork: () => {
      MasteryModule.showNetwork();
    },

    updateField: () => {
      FieldModule.updateField();
    },

    setFieldMessage: text => {
      FieldModule.setFieldMessage(text);
    }

  });


  // ==================================================
  // WritingModule
  // ==================================================

  WritingModule.init({

    game,

    challengeQuestion,

    answerArea,

    showScreen,

    registerSuccess,

    onWritingSuccess: () => {

      BattleModule.playerAttack();

    }

  });


  // ==================================================
  // ChallengeModule
  // ==================================================

  ChallengeModule.init({

    game,

    kanjiData,

    challengeQuestion,

    answerArea,

    showScreen,

    registerSuccess

  });


  // ==================================================
  // タイトル → ゲーム開始
  // ==================================================

  if (startButton) {

    startButton.addEventListener(
      "click",
      () => {

        showScreen(
          "field"
        );


        FieldModule.updateField();


        FieldModule.setFieldMessage(
          "はじまりの王国だ！ 下の道から外へ出てみよう。"
        );

      }
    );

  }


  // ==================================================
  // 移動ボタン
  // ==================================================

  const directionButtons =
    document.querySelectorAll(
      ".direction-button"
    );


  directionButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          FieldModule.movePlayer(
            button.dataset.direction
          );

        }
      );

    }
  );


  // ==================================================
  // 武器ボタン
  // ==================================================

  const weaponButtons =
    document.querySelectorAll(
      ".weapon-button"
    );


  weaponButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          if (!game.currentEnemy) {
            return;
          }


          game.selectedWeapon =
            button.dataset.weapon;


          ChallengeModule
            .startChallenge();

        }
      );

    }
  );


  // ==================================================
  // 武器変更
  // ==================================================

  const changeWeaponButton =
    document.getElementById(
      "change-weapon-button"
    );


  if (changeWeaponButton) {

    changeWeaponButton
      .addEventListener(
        "click",
        () => {

          if (!game.currentEnemy) {
            return;
          }


          showScreen(
            "battle"
          );


          battleMessage.textContent =
            "別の方法で挑戦してみよう！";

        }
      );

  }
// ==================================================
// スキル画面を開く
// ==================================================

const skillMenuButton =
  document.getElementById(
    "skill-menu-button"
  );

if (skillMenuButton) {

  skillMenuButton.addEventListener(
    "click",
    () => {

      if (!game.currentEnemy) {
        return;
      }

      showScreen(
        "skill"
      );

    }
  );

}


// ==================================================
// スキル画面から戻る
// ==================================================

const skillBackButton =
  document.getElementById(
    "skill-back-button"
  );

if (skillBackButton) {

  skillBackButton.addEventListener(
    "click",
    () => {

      showScreen(
        "battle"
      );

    }
  );

}

  // ==================================================
  // ネットワークを閉じる
  // ==================================================

  const networkCloseButton =
    document.getElementById(
      "network-close-button"
    );


  if (networkCloseButton) {

    networkCloseButton
      .addEventListener(
        "click",
        () => {

          game.stepsSinceBattle =
            0;


          showScreen(
            "field"
          );


          if (!game.currentWord) {

            FieldModule.setFieldMessage(
              "冒険を続けよう！"
            );

            return;

          }


          const data =
            game.words[
              game.currentWord
            ];


          if (
            data &&
            data.successes >=
            game.masteryGoal
          ) {

            FieldModule.setFieldMessage(
              `「${game.currentWord}」のつながりが強くなった！ ★`
            );

          } else {

            FieldModule.setFieldMessage(
              `「${game.currentWord}」のつながりが育った！`
            );

          }

        }
      );

  }


  // ==================================================
  // 漢字マップ
  // ==================================================

  const mapButton =
    document.getElementById(
      "map-button"
    );


  if (mapButton) {

    mapButton.addEventListener(
      "click",
      () => {

        MasteryModule.showNetwork();

      }
    );

  }


  // ==================================================
  // スキル獲得後
  // ==================================================

  const continueButton =
    document.getElementById(
      "continue-button"
    );


  if (continueButton) {

    continueButton.addEventListener(
      "click",
      () => {

        showScreen(
          "field"
        );


        game.stepsSinceBattle =
          0;


        FieldModule.setFieldMessage(
          `漢字スキル「${kanjiData.kanji}」を習得した！`
        );

      }
    );

  }


  // ==================================================
  // キーボード操作
  // ==================================================

  document.addEventListener(
    "keydown",
    event => {

      FieldModule.handleKeydown(
        event
      );

    }
  );


  // ==================================================
  // 初期状態
  // ==================================================

  MasteryModule
    .updateNetworkNodes();


  showScreen(
    "title"
  );

});
