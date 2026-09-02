document.addEventListener("DOMContentLoaded", () => {

  // ==================================================
  // 画面
  // ==================================================

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


  // ==================================================
  // ゲームデータ
  // ==================================================

  const game = {

    area: "kingdom",

    player: {
      x: 50,
      y: 58,
      direction: "down",
      step: 0
    },

    moveCount: 0,

    // 最後に戦闘が終わってから何歩歩いたか
    stepsSinceBattle: 0,

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

    selectedWeapon: null,

    currentWord: null,

    // 1つの言葉につき3回成功で「定着」
    masteryGoal: 3,

    words: {

      "読む": {
        successes: 0
      },

      "読書": {
        successes: 0
      },

      "音読": {
        successes: 0
      },

      "読者": {
        successes: 0
      }

    },

    networkClearShown: false
  };


  // ==================================================
  // チャレンジデータ
  // ==================================================

  const wordChallenges = [

    {
      word: "読む",

      questions: [
        {
          question: "「読」を使うことばはどれ？",
          answers: [
            "読む",
            "走る",
            "見る",
            "遊ぶ"
          ]
        },
        {
          question: "本などの文字を見ることを表すのはどれ？",
          answers: [
            "読む",
            "書く",
            "聞く",
            "走る"
          ]
        }
      ]
    },

    {
      word: "読書",

      questions: [
        {
          question: "本を読むことを表すことばはどれ？",
          answers: [
            "読書",
            "音楽",
            "運動",
            "学校"
          ]
        },
        {
          question: "「どくしょ」と読むことばはどれ？",
          answers: [
            "読書",
            "読者",
            "音読",
            "作文"
          ]
        }
      ]
    },

    {
      word: "音読",

      questions: [
        {
          question: "声に出して読むことを表すことばはどれ？",
          answers: [
            "音読",
            "読者",
            "作文",
            "計算"
          ]
        },
        {
          question: "「おんどく」と読むことばはどれ？",
          answers: [
            "音読",
            "音楽",
            "読書",
            "読者"
          ]
        }
      ]
    },

    {
      word: "読者",

      questions: [
        {
          question: "本や文章を読む人を表すことばはどれ？",
          answers: [
            "読者",
            "作者",
            "先生",
            "店員"
          ]
        },
        {
          question: "「どくしゃ」と読むことばはどれ？",
          answers: [
            "読者",
            "読書",
            "音読",
            "会社"
          ]
        }
      ]
    }

  ];


  // ==================================================
  // 共通
  // ==================================================

  function getWordData(word) {
    return game.words[word];
  }


  function getMasteredCount() {

    return Object.values(game.words)
      .filter(data =>
        data.successes >= game.masteryGoal
      )
      .length;
  }


  function getDiscoveredCount() {

    return Object.values(game.words)
      .filter(data =>
        data.successes > 0
      )
      .length;
  }


  function isNetworkMastered() {

    return getMasteredCount() ===
      Object.keys(game.words).length;
  }


  // ==================================================
  // タイトル
  // ==================================================

  const startButton =
    document.getElementById("start-button");

  startButton.addEventListener("click", () => {

    showScreen("field");

    updateField();

    setFieldMessage(
      "はじまりの王国だ！ 方向キーで歩いてみよう。"
    );

  });


  // ==================================================
  // フィールド
  // ==================================================

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


  // ==================================================
  // 移動
  // ==================================================

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

    game.stepsSinceBattle++;

    updateField();


    // --------------------------
    // 王国
    // --------------------------

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


    // --------------------------
    // 森のエンカウント
    // --------------------------

    if (game.area === "forest") {

      checkEncounter();

    }

  }


  // ==================================================
  // 読みの森
  // ==================================================

  function enterForest() {

    game.area = "forest";

    game.moveCount = 0;

    game.stepsSinceBattle = 0;

    game.player.x = 50;

    game.player.y = 78;

    updateField();

    setFieldMessage(
      "読みの森に入った！ ことばの気配がする……"
    );

  }


  // ==================================================
  // エンカウント
  // ==================================================

  function checkEncounter() {

    // 戦闘後12歩は敵が出ない
    const safeSteps = 12;

    if (
      game.stepsSinceBattle <
      safeSteps
    ) {
      return;
    }


    // 12歩を超えてから1歩ごとに約10％
    const encounterChance = 0.10;


    if (
      Math.random() <
      encounterChance
    ) {

      game.stepsSinceBattle = 0;

      startBattle();

    }

  }


  // ==================================================
  // バトル
  // ==================================================

  const enemyName =
    document.getElementById("enemy-name");

  const enemySprite =
    document.getElementById("enemy-sprite");

  const battleMessage =
    document.getElementById("battle-message");

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


  // ==================================================
  // 武器
  // ==================================================

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


  // ==================================================
  // 次に出す言葉
  // ==================================================

  function chooseNextWord() {

    const entries =
      Object.entries(game.words);


    // まだ定着していない言葉
    const learningWords =
      entries.filter(
        ([word, data]) =>
          data.successes <
          game.masteryGoal
      );


    if (
      learningWords.length > 0
    ) {

      // 一番成功回数が少ないものを優先
      const minimum =
        Math.min(
          ...learningWords.map(
            ([word, data]) =>
              data.successes
          )
        );


      const candidates =
        learningWords.filter(
          ([word, data]) =>
            data.successes === minimum
        );


      const random =
        candidates[
          Math.floor(
            Math.random() *
            candidates.length
          )
        ];


      return random[0];

    }


    // 全部定着していても復習は続く
    const allWords =
      Object.keys(game.words);


    return allWords[
      Math.floor(
        Math.random() *
        allWords.length
      )
    ];

  }


  // ==================================================
  // チャレンジ開始
  // ==================================================

  const challengeQuestion =
    document.getElementById(
      "challenge-question"
    );

  const answerArea =
    document.getElementById(
      "answer-area"
    );


  function startChallenge() {

    const word =
      chooseNextWord();


    game.currentWord =
      word;


    if (
      game.selectedWeapon ===
      "hammer"
    ) {

      startWritingChallenge(word);

      return;
    }


    startChoiceChallenge(word);

  }


  // ==================================================
  // 剣・弓・杖
  // ==================================================

  function startChoiceChallenge(word) {

    const challenge =
      wordChallenges.find(
        item =>
          item.word === word
      );


    const question =
      challenge.questions[
        Math.floor(
          Math.random() *
          challenge.questions.length
        )
      ];


    challengeQuestion.textContent =
      question.question;


    answerArea.innerHTML = "";


    const shuffled =
      [...question.answers]
        .sort(
          () =>
            Math.random() - 0.5
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
            word,
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


  // ==================================================
  // 選択問題の答え
  // ==================================================

  function checkAnswer(
    answer,
    correct,
    button
  ) {

    if (
      answer === correct
    ) {

      button.textContent =
        "✨ " + answer;


      button.style.background =
        "#fff3a6";


      registerSuccess(
        correct
      );


      setTimeout(() => {

        showNetwork();

      }, 600);

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


  // ==================================================
  // ハンマー：書いてみる
  // ==================================================

  function startWritingChallenge(word) {

    challengeQuestion.textContent =
      `「${word}」の中にある「読」を指で書いてみよう！`;


    answerArea.innerHTML = "";


    const writingWrap =
      document.createElement("div");


    writingWrap.style.gridColumn =
      "1 / -1";


    writingWrap.style.width =
      "100%";


    writingWrap.style.textAlign =
      "center";


    // --------------------------
    // お手本
    // --------------------------

    const sample =
      document.createElement("div");


    sample.textContent =
      "読";


    sample.style.fontSize =
      "34px";


    sample.style.fontWeight =
      "900";


    sample.style.marginBottom =
      "10px";


    sample.style.color =
      "#42505a";


    sample.style.opacity =
      "0.35";


    writingWrap.appendChild(
      sample
    );


    // --------------------------
    // 書くキャンバス
    // --------------------------

    const canvas =
      document.createElement(
        "canvas"
      );


    canvas.width = 300;

    canvas.height = 300;


    canvas.style.width =
      "min(100%, 300px)";


    canvas.style.aspectRatio =
      "1 / 1";


    canvas.style.background =
      "#fffdf5";


    canvas.style.border =
      "4px solid #4a3722";


    canvas.style.borderRadius =
      "14px";


    canvas.style.touchAction =
      "none";


    canvas.style.display =
      "block";


    canvas.style.margin =
      "0 auto 14px";


    writingWrap.appendChild(
      canvas
    );


    const ctx =
      canvas.getContext("2d");


    ctx.lineWidth = 12;

    ctx.lineCap = "round";

    ctx.lineJoin = "round";

    ctx.strokeStyle =
      "#18242d";


    let drawing = false;


    function getPosition(event) {

      const rect =
        canvas.getBoundingClientRect();


      return {

        x:
          (
            event.clientX -
            rect.left
          ) *
          (
            canvas.width /
            rect.width
          ),

        y:
          (
            event.clientY -
            rect.top
          ) *
          (
            canvas.height /
            rect.height
          )

      };

    }


    canvas.addEventListener(
      "pointerdown",
      event => {

        drawing = true;


        const pos =
          getPosition(event);


        ctx.beginPath();

        ctx.moveTo(
          pos.x,
          pos.y
        );


        canvas.setPointerCapture(
          event.pointerId
        );

      }
    );


    canvas.addEventListener(
      "pointermove",
      event => {

        if (!drawing) {
          return;
        }


        const pos =
          getPosition(event);


        ctx.lineTo(
          pos.x,
          pos.y
        );


        ctx.stroke();

      }
    );


    function stopDrawing() {
      drawing = false;
    }


    canvas.addEventListener(
      "pointerup",
      stopDrawing
    );


    canvas.addEventListener(
      "pointercancel",
      stopDrawing
    );


    canvas.addEventListener(
      "pointerleave",
      stopDrawing
    );


    // --------------------------
    // ボタン
    // --------------------------

    const controls =
      document.createElement("div");


    controls.style.display =
      "grid";


    controls.style.gridTemplateColumns =
      "1fr 1fr";


    controls.style.gap =
      "10px";


    const clearButton =
      document.createElement(
        "button"
      );


    clearButton.className =
      "answer-button";


    clearButton.textContent =
      "消す";


    clearButton.addEventListener(
      "click",
      () => {

        ctx.clearRect(
          0,
          0,
          canvas.width,
          canvas.height
        );

      }
    );


    const doneButton =
      document.createElement(
        "button"
      );


    doneButton.className =
      "answer-button";


    doneButton.textContent =
      "できた！";


    doneButton.addEventListener(
      "click",
      () => {

        registerSuccess(
          word
        );


        doneButton.textContent =
          "✨ できた！";


        setTimeout(() => {

          showNetwork();

        }, 600);

      }
    );


    controls.appendChild(
      clearButton
    );


    controls.appendChild(
      doneButton
    );


    writingWrap.appendChild(
      controls
    );


    answerArea.appendChild(
      writingWrap
    );


    showScreen("challenge");

  }


  // ==================================================
  // 成功を記録
  // ==================================================

  function registerSuccess(word) {

    const data =
      getWordData(word);


    // 定着後も復習はできるが、
    // 数字は3で止める
    if (
      data.successes <
      game.masteryGoal
    ) {

      data.successes++;

    }

  }


  // ==================================================
  // 武器を変える
  // ==================================================

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


  // ==================================================
  // 漢字ネットワーク
  // ==================================================

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


  function updateNetworkNodes() {

    Object.entries(
      networkNodes
    ).forEach(
      ([word, node]) => {

        const data =
          getWordData(word);


        // ----------------------
        // 未発見
        // ----------------------

        if (
          data.successes === 0
        ) {

          node.textContent =
            "❓";


          node.classList.remove(
            "found"
          );


          node.style.opacity =
            "0.45";


          node.style.filter =
            "grayscale(1)";


          return;
        }


        // ----------------------
        // 発見済み
        // ----------------------

        node.textContent =
          word;


        node.classList.add(
          "found"
        );


        node.style.opacity =
          "1";


        node.style.filter =
          "none";


        // ----------------------
        // 定着
        // ----------------------

        if (
          data.successes >=
          game.masteryGoal
        ) {

          node.textContent =
            "★ " + word;


          node.style.boxShadow =
            "0 0 28px #ffe36a";

        } else {

          node.style.boxShadow =
            "";

        }

      }
    );


    networkCount.textContent =
      `${getDiscoveredCount()} / 4`;

  }


  function showNetwork() {

    updateNetworkNodes();


    showScreen("network");


    if (
      isNetworkMastered() &&
      !game.networkClearShown
    ) {

      game.networkClearShown =
        true;


      setTimeout(() => {

        completeNetwork();

      }, 1400);

    }

  }


  // 最初から答えを見せない
  updateNetworkNodes();


  // ==================================================
  // ネットワーク画面から戻る
  // ==================================================

  const networkCloseButton =
    document.getElementById(
      "network-close-button"
    );


  networkCloseButton.addEventListener(
    "click",
    () => {

      game.enemyIndex++;


      game.stepsSinceBattle = 0;


      showScreen("field");


      const data =
        getWordData(
          game.currentWord
        );


      if (
        data &&
        data.successes >=
        game.masteryGoal
      ) {

        setFieldMessage(
          `「${game.currentWord}」のつながりが強くなった！ ★`
        );

      } else {

        setFieldMessage(
          `「${game.currentWord}」を発見した！ また出会えるかもしれない。`
        );

      }

    }
  );


  // ==================================================
  // 漢字マップ
  // ==================================================

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


  // ==================================================
  // ネットワーク定着完成
  // ==================================================

  function completeNetwork() {

    showScreen("clear");

  }


  // ==================================================
  // 冒険を続ける
  // ==================================================

  const continueButton =
    document.getElementById(
      "continue-button"
    );


  continueButton.addEventListener(
    "click",
    () => {

      showScreen("field");


      game.stepsSinceBattle = 0;


      setFieldMessage(
        "「読」のつながりが定着した！ でも冒険ではこれからも復習できるぞ！"
      );

    }
  );


  // ==================================================
  // PCキーボード
  // ==================================================

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


  // ==================================================
  // 初期状態
  // ==================================================

  showScreen("title");

});
