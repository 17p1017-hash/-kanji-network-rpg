document.addEventListener("DOMContentLoaded", () => {

  // ==================================================
  // 教材データ
  // ==================================================

  if (typeof KANJI_YOMU === "undefined") {
    alert("問題データを読み込めませんでした。data/yomu.js を確認してください。");
    return;
  }

  const kanjiData = KANJI_YOMU;


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
  // セーブデータ
  // ==================================================

  function loadSaveData() {
    try {
      const saved = localStorage.getItem("kanjiNetworkRpgSave");

      if (!saved) {
        return null;
      }

      return JSON.parse(saved);

    } catch (error) {
      console.log("セーブデータを読み込めませんでした。");
      return null;
    }
  }

  const saveData = loadSaveData();


  // ==================================================
  // ことばデータを作る
  // ==================================================

  function createWordProgress() {

    const progress = {};

    Object.keys(kanjiData.words).forEach(word => {

      progress[word] = {
        successes:
          saveData?.words?.[word]?.successes || 0
      };

    });

    return progress;
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
  step: 0,

  level: saveData.player?.level || 1,
  hp: saveData.player?.hp ?? 10,
  maxHp: saveData.player?.maxHp || 10,
  exp: saveData.player?.exp || 0,
  gold: saveData.player?.gold || 0
},

    stepsSinceBattle: 0,

    enemyIndex: 0,

  enemies: [
  {
    name: "ワードスライム",
    image: "images/word_slime.png",
    maxHp: 2,
    exp: 2,
    gold: 1,
    attack: 1
  },
  {
    name: "コトガラス",
    image: "images/kotogarasu.png",
    maxHp: 3,
    exp: 3,
    gold: 2,
    attack: 1
  },
  {
    name: "カミキレ",
    image: "images/kamikire.png",
    maxHp: 4,
    exp: 5,
    gold: 3,
    attack: 1
  }
],
currentEnemy: null,

combo: 0,

maxComboThisBattle: 0,
    selectedWeapon: null,

    currentWord: null,

    currentQuestion: null,

    masteryGoal:
      kanjiData.masteryGoal || 3,

    words:
      createWordProgress(),

    skills:
      saveData?.skills || [],

    networkClearShown: false
  };

const weaponDamage = {
  sword: 1,
  bow: 2,
  staff: 3,
  hammer: 4
};

  // ==================================================
  // セーブ
  // ==================================================

  function saveGame() {

    const data = {
  player: {
    level: game.player.level,
    hp: game.player.hp,
    maxHp: game.player.maxHp,
    exp: game.player.exp,
    gold: game.player.gold
  },

  words: game.words,
  skills: game.skills
};

    localStorage.setItem(
      "kanjiNetworkRpgSave",
      JSON.stringify(data)
    );
  }


  // ==================================================
  // 共通
  // ==================================================

  function getWordData(word) {
    return game.words[word];
  }


  function getDiscoveredCount() {

    return Object.values(game.words)
      .filter(data => data.successes > 0)
      .length;
  }


  function getMasteredCount() {

    return Object.values(game.words)
      .filter(
        data =>
          data.successes >= game.masteryGoal
      )
      .length;
  }


  function isNetworkMastered() {

    return getMasteredCount() ===
      Object.keys(game.words).length;
  }


  function hasSkill(skillId) {

    return game.skills.includes(skillId);
  }


  function shuffle(array) {

    return [...array].sort(
      () => Math.random() - 0.5
    );
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
      "はじまりの王国だ！ 下の道から外へ出てみよう。"
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

    if (fieldMessage) {
      fieldMessage.textContent = text;
    }
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
  // 移動ボタン
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


  // ==================================================
  // 主人公移動
  // ==================================================

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


    game.player.step++;

    updateField();


    // ==================================================
    // 王国 → 読みの森
    // ==================================================

    if (
      game.area === "kingdom" &&
      game.player.y >= 90
    ) {

      enterForest();
      return;
    }


    // ==================================================
    // 読みの森 → 王国
    // ==================================================

    if (
      game.area === "forest" &&
      game.player.y <= 8
    ) {

      returnToKingdom();
      return;
    }


    game.player.y =
      Math.max(
        8,
        Math.min(90, game.player.y)
      );


    updateField();


    // ==================================================
    // 森だけエンカウント
    // ==================================================

    if (game.area === "forest") {

      game.stepsSinceBattle++;

      checkEncounter();
    }

  }


  // ==================================================
  // 王国 → 森
  // ==================================================

  function enterForest() {

    game.area = "forest";

    game.stepsSinceBattle = 0;

    game.player.x = 50;
    game.player.y = 16;
    game.player.direction = "down";

    updateField();

    setFieldMessage(
      "読みの森に入った！ ことばの気配がする……"
    );

  }


  // ==================================================
  // 森 → 王国
  // ==================================================

  function returnToKingdom() {

    game.area = "kingdom";

    game.stepsSinceBattle = 0;

    game.player.x = 50;
    game.player.y = 82;
    game.player.direction = "up";

    updateField();

    setFieldMessage(
      "はじまりの王国に戻ってきた。"
    );

  }


  // ==================================================
  // エンカウント
  // ==================================================

  function checkEncounter() {

    // 最低12歩は安全
    const safeSteps = 12;

    if (
      game.stepsSinceBattle <
      safeSteps
    ) {
      return;
    }


    // その後は毎歩10％
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

   const enemyTemplate =
  game.enemies[
    game.enemyIndex %
    game.enemies.length
  ];

game.currentEnemy = {
  ...enemyTemplate,
  hp: enemyTemplate.maxHp
};

const enemy = game.currentEnemy;

game.combo = 0;
game.maxComboThisBattle = 0;


    enemyName.textContent =
  `${enemy.name} HP ${enemy.hp}/${enemy.maxHp}`;


    enemySprite.style.backgroundImage =
      `url("${enemy.image}")`;


    enemySprite.style.backgroundPosition =
      "0 0";


    if (enemyHP) {
      enemyHP.style.width = "100%";
    }


    battleMessage.textContent =
      `${enemy.name}が あらわれた！`;


    showScreen("battle");

  }
function updateEnemyHp() {

  if (!game.currentEnemy) {
    return;
  }

  const percent =
    (game.currentEnemy.hp / game.currentEnemy.maxHp) * 100;

  if (enemyHP) {
    enemyHP.style.width =
      Math.max(0, percent) + "%";
  }

  enemyName.textContent =
    `${game.currentEnemy.name} HP ${game.currentEnemy.hp}/${game.currentEnemy.maxHp}`;
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
  // 次に出すことば
  // ==================================================

  function chooseNextWord() {

    const entries =
      Object.entries(game.words);


    // まだ定着していないもの
    const learningWords =
      entries.filter(
        ([word, data]) =>
          data.successes <
          game.masteryGoal
      );


    if (learningWords.length > 0) {

      // 成功回数が少ないものを優先
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


      return candidates[
        Math.floor(
          Math.random() *
          candidates.length
        )
      ][0];

    }


    // 全部定着していても復習
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


    const wordData =
      kanjiData.words[word];


    if (!wordData) {

      console.error(
        "問題データがありません:",
        word
      );

      return;
    }


    const weapon =
      game.selectedWeapon;


    const questions =
      wordData.questions?.[weapon];


    if (
      !questions ||
      questions.length === 0
    ) {

      challengeQuestion.textContent =
        "この学び方の問題はまだありません。";

      answerArea.innerHTML = "";

      showScreen("challenge");

      return;
    }


    const question =
      questions[
        Math.floor(
          Math.random() *
          questions.length
        )
      ];


    game.currentQuestion =
      question;


    // 問題タイプによって分ける
    if (question.type === "writing") {

      startWritingChallenge(
        word,
        question
      );

      return;
    }


    if (question.type === "build") {

      startBuildChallenge(
        word,
        question
      );

      return;
    }


    // choice / meaning
    startChoiceChallenge(
      word,
      question
    );

  }


  // ==================================================
  // 剣・杖
  // 選択式問題
  // ==================================================

  function startChoiceChallenge(
    word,
    question
  ) {

    challengeQuestion.textContent =
      question.question;


    answerArea.innerHTML = "";


    const shuffled =
      shuffle(question.answers);


    shuffled.forEach(answer => {

      const button =
        document.createElement("button");


      button.className =
        "answer-button";


      button.textContent =
        answer;


      button.addEventListener(
        "click",
        () => {

          checkChoiceAnswer(
            answer,
            question.correct,
            word,
            button
          );

        }
      );


      answerArea.appendChild(button);

    });


    showScreen("challenge");

  }


  // ==================================================
  // 選択式問題の正誤
  // ==================================================

  function checkChoiceAnswer(
    answer,
    correct,
    word,
    button
  ) {

    if (answer === correct) {

      button.textContent =
        "✨ " + answer;


      button.style.background =
        "#fff3a6";


      disableAnswerButtons();


      registerSuccess(word);


      game.combo++;

if (game.combo > game.maxComboThisBattle) {
  game.maxComboThisBattle = game.combo;
}

const damage =
  weaponDamage[game.selectedWeapon];

game.currentEnemy.hp -= damage;

if (game.currentEnemy.hp < 0) {
  game.currentEnemy.hp = 0;
}

updateEnemyHp();

showScreen("battle");

battleMessage.textContent =
  `${damage}ダメージ！`;
if (game.currentEnemy.hp <= 0) {

  setTimeout(() => {
    defeatEnemy();
  }, 700);

} else {

  setTimeout(() => {
    battleMessage.textContent =
      "次の武器を選ぼう！";
  }, 700);

}
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


  function disableAnswerButtons() {

    const buttons =
      answerArea.querySelectorAll(
        "button"
      );


    buttons.forEach(button => {
      button.disabled = true;
    });

  }


  // ==================================================
  // 弓
  // 組み立て問題
  // ==================================================

  function startBuildChallenge(
    word,
    question
  ) {

    challengeQuestion.textContent =
      question.question;


    answerArea.innerHTML = "";


    const buildWrap =
      document.createElement("div");


    buildWrap.style.gridColumn =
      "1 / -1";

    buildWrap.style.width =
      "100%";


    // --------------------------
    // 組み立て結果
    // --------------------------

    const resultBox =
      document.createElement("div");


    resultBox.textContent =
      "ここに組み立てよう";


    resultBox.style.minHeight =
      "64px";

    resultBox.style.display =
      "flex";

    resultBox.style.alignItems =
      "center";

    resultBox.style.justifyContent =
      "center";

    resultBox.style.fontSize =
      "32px";

    resultBox.style.fontWeight =
      "900";

    resultBox.style.background =
      "#fffdf5";

    resultBox.style.border =
      "3px solid #4a3722";

    resultBox.style.borderRadius =
      "14px";

    resultBox.style.marginBottom =
      "14px";


    buildWrap.appendChild(
      resultBox
    );


    // --------------------------
    // 選ぶパーツ
    // --------------------------

    const partsArea =
      document.createElement("div");


    partsArea.style.display =
      "grid";

    partsArea.style.gridTemplateColumns =
      "repeat(2, 1fr)";

    partsArea.style.gap =
      "10px";


    let selectedParts = [];


    const extraParts =
      getExtraBuildParts(
        question.parts
      );


    const choices =
      shuffle([
        ...question.parts,
        ...extraParts
      ]);


    choices.forEach(part => {

      const button =
        document.createElement("button");


      button.className =
        "answer-button";


      button.textContent =
        part;


      button.addEventListener(
        "click",
        () => {

          selectedParts.push(part);

          resultBox.textContent =
            selectedParts.join("");


          button.disabled = true;

        }
      );


      partsArea.appendChild(button);

    });


    buildWrap.appendChild(
      partsArea
    );


    // --------------------------
    // 決定・やり直し
    // --------------------------

    const controls =
      document.createElement("div");


    controls.style.display =
      "grid";

    controls.style.gridTemplateColumns =
      "1fr 1fr";

    controls.style.gap =
      "10px";

    controls.style.marginTop =
      "14px";


    const resetButton =
      document.createElement("button");


    resetButton.className =
      "answer-button";

    resetButton.textContent =
      "やり直す";


    resetButton.addEventListener(
      "click",
      () => {

        selectedParts = [];

        resultBox.textContent =
          "ここに組み立てよう";


        partsArea
          .querySelectorAll("button")
          .forEach(button => {
            button.disabled = false;
          });

      }
    );


    const decideButton =
      document.createElement("button");


    decideButton.className =
      "answer-button";

    decideButton.textContent =
      "これで決定！";


    decideButton.addEventListener(
      "click",
      () => {

        const answer =
          selectedParts.join("");


        if (
          answer ===
          question.correct
        ) {

          resultBox.textContent =
            "✨ " + answer;


          registerSuccess(word);


          setTimeout(() => {

            showNetwork();

          }, 700);

        } else {

          resultBox.textContent =
            "もう一度組み立てよう！";


          selectedParts = [];


          partsArea
            .querySelectorAll("button")
            .forEach(button => {
              button.disabled = false;
            });

        }

      }
    );


    controls.appendChild(
      resetButton
    );

    controls.appendChild(
      decideButton
    );


    buildWrap.appendChild(
      controls
    );


    answerArea.appendChild(
      buildWrap
    );


    showScreen("challenge");

  }


  // ==================================================
  // 組み立て問題のダミーパーツ
  // ==================================================

  function getExtraBuildParts(correctParts) {

    const pool = [
      "音",
      "書",
      "者",
      "読",
      "見",
      "聞",
      "話",
      "む"
    ];


    const available =
      pool.filter(
        part =>
          !correctParts.includes(part)
      );


    return shuffle(available)
      .slice(0, 2);

  }


  // ==================================================
  // ハンマー
  // 書き取り問題
  // ==================================================

  function startWritingChallenge(
    word,
    question
  ) {

    challengeQuestion.textContent =
      question.question;


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
    // 読みだけ表示
    // 答えの漢字は最初は隠す
    // --------------------------

    const hint =
      document.createElement("div");


    hint.textContent =
      "思い出して書いてみよう";


    hint.style.fontSize =
      "18px";

    hint.style.fontWeight =
      "700";

    hint.style.marginBottom =
      "10px";


    writingWrap.appendChild(
      hint
    );


    // --------------------------
    // キャンバス
    // --------------------------

    const canvas =
      document.createElement("canvas");


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
    ctx.strokeStyle = "#18242d";


    let drawing = false;
    let hasDrawn = false;


    function getPosition(event) {

      const rect =
        canvas.getBoundingClientRect();


      return {

        x:
          (event.clientX - rect.left) *
          (canvas.width / rect.width),

        y:
          (event.clientY - rect.top) *
          (canvas.height / rect.height)

      };

    }


    canvas.addEventListener(
      "pointerdown",
      event => {

        drawing = true;
        hasDrawn = true;

        const pos =
          getPosition(event);


        ctx.beginPath();

        ctx.moveTo(
          pos.x,
          pos.y
        );


        try {
          canvas.setPointerCapture(
            event.pointerId
          );
        } catch (error) {
          // 一部ブラウザ対策
        }

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
      document.createElement("button");


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

        hasDrawn = false;

      }
    );


    const checkButton =
      document.createElement("button");


    checkButton.className =
      "answer-button";

    checkButton.textContent =
      "答えを見る";


    checkButton.addEventListener(
      "click",
      () => {

        if (!hasDrawn) {

          hint.textContent =
            "まず自分で書いてみよう！";

          return;
        }


        showWritingSelfCheck(
          word,
          question,
          writingWrap,
          controls
        );

      }
    );


    controls.appendChild(
      clearButton
    );

    controls.appendChild(
      checkButton
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
  // 書き取り自己確認
  // ==================================================

  function showWritingSelfCheck(
    word,
    question,
    writingWrap,
    oldControls
  ) {

    oldControls.remove();


    const answerDisplay =
      document.createElement("div");


    answerDisplay.innerHTML =
      `
        <div style="
          font-size:16px;
          margin-top:12px;
        ">
          お手本
        </div>

        <div style="
          font-size:42px;
          font-weight:900;
          margin:6px 0 14px;
        ">
          ${question.target}
        </div>

        <div style="
          font-size:17px;
          font-weight:700;
          margin-bottom:10px;
        ">
          自分で見比べてみよう
        </div>
      `;


    writingWrap.appendChild(
      answerDisplay
    );


    const selfCheck =
      document.createElement("div");


    selfCheck.style.display =
      "grid";

    selfCheck.style.gridTemplateColumns =
      "1fr 1fr";

    selfCheck.style.gap =
      "10px";


    const retryButton =
      document.createElement("button");


    retryButton.className =
      "answer-button";

    retryButton.textContent =
      "もう一度書く";


    retryButton.addEventListener(
      "click",
      () => {

        startWritingChallenge(
          word,
          question
        );

      }
    );


    const successButton =
      document.createElement("button");


    successButton.className =
      "answer-button";

    successButton.textContent =
      "書けた！";


    successButton.addEventListener(
      "click",
      () => {

        successButton.disabled =
          true;

        successButton.textContent =
          "✨ 書けた！";


        registerSuccess(word);


        setTimeout(() => {

          showNetwork();

        }, 700);

      }
    );


    selfCheck.appendChild(
      retryButton
    );

    selfCheck.appendChild(
      successButton
    );


    writingWrap.appendChild(
      selfCheck
    );

  }


  // ==================================================
  // 成功を記録
  // ==================================================

  function registerSuccess(word) {

    const data =
      getWordData(word);


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

function defeatEnemy() {

  const enemy = game.currentEnemy;
 let leveledUp = false; 
game.player.exp += enemy.exp;
  game.player.gold += enemy.gold;
  if (game.player.exp >= game.player.level * 10) {
  game.player.exp -= game.player.level * 10;
  game.player.level++;
  game.player.maxHp += 2;
  game.player.hp = game.player.maxHp;
}
battleMessage.textContent =
  `${enemy.name}を たおした！
EXP +${enemy.exp}
💰 ${enemy.gold}G`;  

  game.currentEnemy = null;
}
  // ==================================================
  // 武器変更
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
  // ことばのつながり
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

        if (!node) {
          return;
        }


        const data =
          getWordData(word);


        if (!data) {
          return;
        }


        // ----------------------
        // 未発見
        // ----------------------

        if (data.successes === 0) {

          node.textContent =
            "❓";


          node.classList.remove(
            "found"
          );


          node.style.opacity =
            "0.45";


          node.style.filter =
            "grayscale(1)";


          node.style.boxShadow =
            "";


          return;
        }


        // ----------------------
        // 発見
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
        // 練習回数による表示
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


    if (networkCount) {

      networkCount.textContent =
        `${getDiscoveredCount()} / ${Object.keys(game.words).length}`;

    }

  }


  // ==================================================
  // ネットワーク表示
  // ==================================================

  function showNetwork() {

    updateNetworkNodes();

    showScreen("network");


    // ここではまだスキルを与えない
    // 全部定着すると「習得テスト」が解放された扱い
    if (isNetworkMastered()) {

      showMasteryReadyMessage();

    }

  }


  // ==================================================
  // 習得テスト解放メッセージ
  // ==================================================

  function showMasteryReadyMessage() {

    let message =
      document.getElementById(
        "mastery-ready-message"
      );


    if (!message) {

      message =
        document.createElement("div");


      message.id =
        "mastery-ready-message";


      message.style.margin =
        "16px auto";


      message.style.padding =
        "12px";


      message.style.maxWidth =
        "320px";


      message.style.background =
        "#fff3a6";


      message.style.borderRadius =
        "14px";


      message.style.fontWeight =
        "900";


      message.style.textAlign =
        "center";


      screens.network.appendChild(
        message
      );

    }


    const skillId =
      kanjiData.skill.id;


    if (hasSkill(skillId)) {

      message.innerHTML =
        `
          ✨ 漢字スキル「${kanjiData.kanji}」習得済み<br>
          ${kanjiData.skill.icon}
          ${kanjiData.skill.name}
        `;

      return;
    }


    message.innerHTML =
      `
        ✨ 「${kanjiData.kanji}」のつながりが育った！<br>
        習得テストに挑戦できます
      `;


    let testButton =
      document.getElementById(
        "mastery-test-button"
      );


    if (!testButton) {

      testButton =
        document.createElement("button");


      testButton.id =
        "mastery-test-button";


      testButton.className =
        "answer-button";


      testButton.style.display =
        "block";


      testButton.style.margin =
        "10px auto";


      testButton.textContent =
        "習得テストに挑戦";


      testButton.addEventListener(
        "click",
        () => {

          startMasteryTest();

        }
      );


      message.appendChild(
        testButton
      );

    }

  }


  // ==================================================
  // 習得テスト
  // ==================================================

  let masteryTestIndex = 0;
  let masteryTestScore = 0;


  function startMasteryTest() {

    masteryTestIndex = 0;
    masteryTestScore = 0;

    showMasteryTestQuestion();

  }


  function showMasteryTestQuestion() {

    const test =
      kanjiData.masteryTest;


    if (
      masteryTestIndex >=
      test.questions.length
    ) {

      finishMasteryTest();
      return;
    }


    const question =
      test.questions[
        masteryTestIndex
      ];


    challengeQuestion.textContent =
      `${test.title} ${masteryTestIndex + 1}/${test.questions.length}
      
${question.question}`;


    answerArea.innerHTML = "";


    const writingWrap =
      document.createElement("div");


    writingWrap.style.gridColumn =
      "1 / -1";

    writingWrap.style.width =
      "100%";

    writingWrap.style.textAlign =
      "center";


    const canvas =
      document.createElement("canvas");


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
    ctx.strokeStyle = "#18242d";


    let drawing = false;
    let hasDrawn = false;


    function getPosition(event) {

      const rect =
        canvas.getBoundingClientRect();


      return {

        x:
          (event.clientX - rect.left) *
          (canvas.width / rect.width),

        y:
          (event.clientY - rect.top) *
          (canvas.height / rect.height)

      };

    }


    canvas.addEventListener(
      "pointerdown",
      event => {

        drawing = true;
        hasDrawn = true;

        const pos =
          getPosition(event);


        ctx.beginPath();

        ctx.moveTo(
          pos.x,
          pos.y
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


    canvas.addEventListener(
      "pointerup",
      () => {
        drawing = false;
      }
    );


    canvas.addEventListener(
      "pointercancel",
      () => {
        drawing = false;
      }
    );


    const checkButton =
      document.createElement("button");


    checkButton.className =
      "answer-button";


    checkButton.textContent =
      "答えを確認";


    checkButton.addEventListener(
      "click",
      () => {

        if (!hasDrawn) {

          checkButton.textContent =
            "まず書いてみよう！";

          return;
        }


        showMasterySelfCheck(
          question,
          writingWrap,
          checkButton
        );

      }
    );


    writingWrap.appendChild(
      checkButton
    );


    answerArea.appendChild(
      writingWrap
    );


    showScreen("challenge");

  }


  // ==================================================
  // 習得テスト自己採点
  // ==================================================

  function showMasterySelfCheck(
    question,
    writingWrap,
    checkButton
  ) {

    checkButton.remove();


    const answer =
      document.createElement("div");


    answer.innerHTML =
      `
        <div style="
          margin-top:14px;
          font-size:16px;
        ">
          正しい漢字
        </div>

        <div style="
          font-size:44px;
          font-weight:900;
          margin:8px;
        ">
          ${question.target}
        </div>

        <div style="
          font-weight:700;
          margin-bottom:12px;
        ">
          自分の字と見比べよう
        </div>
      `;


    writingWrap.appendChild(
      answer
    );


    const controls =
      document.createElement("div");


    controls.style.display =
      "grid";

    controls.style.gridTemplateColumns =
      "1fr 1fr";

    controls.style.gap =
      "10px";


    const wrongButton =
      document.createElement("button");


    wrongButton.className =
      "answer-button";

    wrongButton.textContent =
      "ちがった";


    wrongButton.addEventListener(
      "click",
      () => {

        masteryTestIndex++;

        showMasteryTestQuestion();

      }
    );


    const correctButton =
      document.createElement("button");


    correctButton.className =
      "answer-button";

    correctButton.textContent =
      "書けた！";


    correctButton.addEventListener(
      "click",
      () => {

        masteryTestScore++;

        masteryTestIndex++;

        showMasteryTestQuestion();

      }
    );


    controls.appendChild(
      wrongButton
    );

    controls.appendChild(
      correctButton
    );


    writingWrap.appendChild(
      controls
    );

  }


  // ==================================================
  // 習得テスト結果
  // ==================================================

  function finishMasteryTest() {

    const test =
      kanjiData.masteryTest;


    if (
      masteryTestScore >=
      test.passingScore
    ) {

      acquireKanjiSkill();

      return;
    }


    challengeQuestion.textContent =
      "もう少し練習しよう！";


    answerArea.innerHTML =
      `
        <div style="
          grid-column:1 / -1;
          text-align:center;
          padding:20px;
        ">

          <div style="
            font-size:22px;
            font-weight:900;
            margin-bottom:10px;
          ">
            ${masteryTestScore} / ${test.questions.length} 問
          </div>

          <p>
            「${kanjiData.kanji}」のことばをもう一度練習してから挑戦しよう。
          </p>

          <button
            id="return-field-after-test"
            class="answer-button"
          >
            冒険に戻る
          </button>

        </div>
      `;


    const returnButton =
      document.getElementById(
        "return-field-after-test"
      );


    returnButton.addEventListener(
      "click",
      () => {

        showScreen("field");

        setFieldMessage(
          "また「読」のことばを練習しよう！"
        );

      }
    );


    showScreen("challenge");

  }


  // ==================================================
  // 漢字スキル獲得
  // ==================================================

  function acquireKanjiSkill() {

    const skillId =
      kanjiData.skill.id;


    if (!hasSkill(skillId)) {

      game.skills.push(
        skillId
      );

      saveGame();

    }


    showScreen("clear");


    let skillStatus =
      document.getElementById(
        "skill-acquired-status"
      );


    if (!skillStatus) {

      skillStatus =
        document.createElement("div");


      skillStatus.id =
        "skill-acquired-status";


      skillStatus.style.marginTop =
        "14px";


      skillStatus.style.padding =
        "14px 18px";


      skillStatus.style.background =
        "#fff3a6";


      skillStatus.style.borderRadius =
        "14px";


      skillStatus.style.fontSize =
        "20px";


      skillStatus.style.fontWeight =
        "900";


      skillStatus.style.textAlign =
        "center";


      screens.clear.appendChild(
        skillStatus
      );

    }


    skillStatus.innerHTML =
      `
        ✨ 漢字スキル獲得！ ✨
        <br><br>

        【${kanjiData.kanji}】
        <br>

        ${kanjiData.skill.icon}
        ${kanjiData.skill.name}
      `;

  }


  // ==================================================
  // ネットワークを閉じる
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


      if (!game.currentWord) {

        setFieldMessage(
          "冒険を続けよう！"
        );

        return;
      }


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
          `「${game.currentWord}」のつながりが育った！`
        );

      }

    }
  );


  // ==================================================
  // 漢字マップボタン
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
  // スキル獲得後
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
        `漢字スキル「${kanjiData.kanji}」を習得した！`
      );

    }
  );


  // ==================================================
  // キーボード操作
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

  updateNetworkNodes();

  showScreen("title");

});
