document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // 画面
  // =========================

  const screens = {
    title: document.getElementById("title-screen"),
    field: document.getElementById("field-screen"),
    battle: document.getElementById("battle-screen"),
    challenge: document.getElementById("challenge-screen"),
    network: document.getElementById("network-screen"),
    clear: document.getElementById("clear-screen")
  };

  function showScreen(name) {
    Object.values(screens).forEach(screen => {
      screen.classList.remove("active");
    });

    screens[name].classList.add("active");
  }


  // =========================
  // ゲームデータ
  // =========================

  const game = {
    area: "kingdom",

    player: {
      x: 50,
      y: 58,
      direction: "down",
      step: 0
    },

    enemyIndex: 0,

    enemies: [
      {
        name: "ワードスライム",
        image: "images/word_slime.png"
      },
      {
        name: "コトガラス",
        image: "images/kotogarasu.png"
      },
      {
        name: "カミキレ",
        image: "images/kamikire.png"
      }
    ],

    foundWords: new Set(),

    currentWord: null,

    selectedWeapon: null,

    moveCount: 0
  };


  // =========================
  // タイトル
  // =========================

  const startButton =
    document.getElementById("start-button");

  startButton.addEventListener("click", () => {

    showScreen("field");

    updateField();

    setFieldMessage(
      "はじまりの王国だ！ 方向キーで歩いてみよう。"
    );

  });


  // =========================
  // フィールド
  // =========================

  const field =
    document.getElementById("field");

  const player =
    document.getElementById("player");

  const areaName =
    document.getElementById("area-name");

  const fieldMessage =
    document.getElementById("field-message");


  function setFieldMessage(text) {
    fieldMessage.textContent = text;
  }


  function updateField() {

    player.style.left =
      game.player.x + "%";

    player.style.top =
      game.player.y + "%";


    const row = {
      down: 0,
      left: 1,
      right: 2,
      up: 3
    }[game.player.direction];


    const column =
      game.player.step % 3;


    player.style.backgroundPosition =
      `${-column * 32}px ${-row * 32}px`;


    if (game.area === "kingdom") {

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


  // =========================
  // 移動
  // =========================

  const directionButtons =
    document.querySelectorAll(
      ".direction-button"
    );


  directionButtons.forEach(button => {

    button.addEventListener("click", () => {

      movePlayer(
        button.dataset.direction
      );

    });

  });


  function movePlayer(direction) {

    game.player.direction = direction;

    const speed = 4;


    if (direction === "up") {
      game.player.y -= speed;
    }

    if (direction === "down") {
      game.player.y += speed;
    }

    if (direction === "left") {
      game.player.x -= speed;
    }

    if (direction === "right") {
      game.player.x += speed;
    }


    // 画面外に出ないようにする
    game.player.x =
      Math.max(
        8,
        Math.min(92, game.player.x)
      );

    game.player.y =
      Math.max(
        10,
        Math.min(88, game.player.y)
      );


    game.player.step++;

    game.moveCount++;

    updateField();


    // 王国を少し歩くと森へ
    if (
      game.area === "kingdom" &&
      game.moveCount === 7
    ) {

      setFieldMessage(
        "王国の外へ続く道を見つけた！"
      );

    }


    if (
      game.area === "kingdom" &&
      game.moveCount >= 10
    ) {

      enterForest();

      return;
    }


    // 森では一定歩数で敵
    if (
      game.area === "forest" &&
      game.moveCount > 0 &&
      game.moveCount % 7 === 0
    ) {

      startBattle();

    }
  }


  // =========================
  // 読みの森
  // =========================

  function enterForest() {

    game.area = "forest";

    game.moveCount = 1;

    game.player.x = 50;
    game.player.y = 78;

    updateField();

    setFieldMessage(
      "読みの森に入った！ ことばの気配がする……"
    );

  }


  // =========================
  // バトル
  // =========================

  const enemyName =
    document.getElementById("enemy-name");

  const enemySprite =
    document.getElementById("enemy-sprite");

  const battleMessage =
    document.getElementById(
      "battle-message"
    );

  const enemyHP =
    document.getElementById("enemy-hp");


  function startBattle() {

    const enemy =
      game.enemies[
        game.enemyIndex %
        game.enemies.length
      ];


    enemyName.textContent =
      enemy.name;

    enemySprite.style.backgroundImage =
      `url("${enemy.image}")`;

    enemySprite.style.backgroundPosition =
      "0 0";

    enemyHP.style.width =
      "100%";


    battleMessage.textContent =
      `${enemy.name}が あらわれた！`;


    showScreen("battle");

  }


  // =========================
  // 武器
  // =========================

  const weaponButtons =
    document.querySelectorAll(
      ".weapon-button"
    );


  weaponButtons.forEach(button => {

    button.addEventListener("click", () => {

      game.selectedWeapon =
        button.dataset.weapon;

      startChallenge();

    });

  });


  // =========================
  // 漢字チャレンジ
  // =========================

  const challengeQuestion =
    document.getElementById(
      "challenge-question"
    );

  const answerArea =
    document.getElementById(
      "answer-area"
    );


  const wordChallenges = [

    {
      word: "読む",
      question:
        "「読」を使うことばはどれ？",
      answers: [
        "読む",
        "走る",
        "見る",
        "遊ぶ"
      ]
    },

    {
      word: "読書",
      question:
        "本を読むことを表すことばはどれ？",
      answers: [
        "読書",
        "音楽",
        "運動",
        "学校"
      ]
    },

    {
      word: "音読",
      question:
        "声に出して読むことを表すことばはどれ？",
      answers: [
        "音読",
        "読者",
        "作文",
        "計算"
      ]
    },

    {
      word: "読者",
      question:
        "本や文章を読む人を表すことばはどれ？",
      answers: [
        "読者",
        "作者",
        "先生",
        "店員"
      ]
    }

  ];


  function getNextChallenge() {

    return wordChallenges.find(
      challenge =>
        !game.foundWords.has(
          challenge.word
        )
    );

  }


  function startChallenge() {

    const challenge =
      getNextChallenge();


    if (!challenge) {

      completeNetwork();

      return;
    }


    game.currentWord =
      challenge.word;


    challengeQuestion.textContent =
      challenge.question;


    answerArea.innerHTML = "";


    const shuffled =
      [...challenge.answers]
        .sort(
          () => Math.random() - 0.5
        );


    shuffled.forEach(answer => {

      const button =
        document.createElement(
          "button"
        );

      button.className =
        "answer-button";

      button.textContent =
        answer;


      button.addEventListener(
        "click",
        () => {

          checkAnswer(
            answer,
            challenge.word,
            button
          );

        }
      );


      answerArea.appendChild(
        button
      );

    });


    showScreen("challenge");

  }


  // =========================
  // 答え
  // =========================

  function checkAnswer(
    answer,
    correct,
    button
  ) {

    if (answer === correct) {

      button.textContent =
        "✨ " + answer;

      button.style.background =
        "#fff3a6";


      game.foundWords.add(
        correct
      );


      setTimeout(() => {

        showNetwork();

      }, 500);

    } else {

      button.textContent =
        "もう一度！";

      button.style.background =
        "#ffd0d0";


      setTimeout(() => {

        button.textContent =
          answer;

        button.style.background =
          "";

      }, 700);

    }
  }


  // =========================
  // 武器変更
  // =========================

  const changeWeaponButton =
    document.getElementById(
      "change-weapon-button"
    );


  changeWeaponButton.addEventListener(
    "click",
    () => {

      showScreen("battle");

      battleMessage.textContent =
        "別の方法で挑戦してみよう！";

    }
  );


  // =========================
  // 漢字ネットワーク
  // =========================

  const networkCount =
    document.getElementById(
      "network-count"
    );


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


  function showNetwork() {

    Object.entries(
      networkNodes
    ).forEach(
      ([word, node]) => {

        if (
          game.foundWords.has(word)
        ) {

          node.classList.add(
            "found"
          );

        }

      }
    );


    networkCount.textContent =
      game.foundWords.size;


    showScreen("network");


    if (
      game.foundWords.size === 4
    ) {

      setTimeout(() => {

        completeNetwork();

      }, 1200);

    }
  }


  // =========================
  // ネットワーク画面から戻る
  // =========================

  const networkCloseButton =
    document.getElementById(
      "network-close-button"
    );


  networkCloseButton.addEventListener(
    "click",
    () => {

      if (
        game.foundWords.size >= 4
      ) {

        completeNetwork();

        return;
      }


      game.enemyIndex++;

      showScreen("field");

      setFieldMessage(
        `「${game.currentWord}」のつながりを見つけた！`
      );

    }
  );


  // =========================
  // 漢字マップボタン
  // =========================

  const mapButton =
    document.getElementById(
      "map-button"
    );


  mapButton.addEventListener(
    "click",
    () => {

      showNetwork();

    }
  );


  // =========================
  // ネットワーク完成
  // =========================

  function completeNetwork() {

    showScreen("clear");

  }


  // =========================
  // 冒険を続ける
  // =========================

  const continueButton =
    document.getElementById(
      "continue-button"
    );


  continueButton.addEventListener(
    "click",
    () => {

      showScreen("field");

      setFieldMessage(
        "「読」のことばの道がつながった！"
      );

    }
  );


  // =========================
  // PCキーボードにも対応
  // =========================

  document.addEventListener(
    "keydown",
    event => {

      if (
        !screens.field.classList.contains(
          "active"
        )
      ) {
        return;
      }


      const keys = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right"
      };


      if (keys[event.key]) {

        event.preventDefault();

        movePlayer(
          keys[event.key]
        );

      }

    }
  );


  // =========================
  // 初期状態
  // =========================

  showScreen("title");

});
