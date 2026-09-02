// ==================================================
// mastery.js
// 漢字ネットワーク・習得テスト・スキル獲得担当
// ==================================================

window.MasteryModule = (() => {

  let settings = null;

  let masteryTestIndex = 0;
  let masteryTestScore = 0;


  // ==================================================
  // 初期化
  // ==================================================

  function init(options) {

    settings = options;

  }


  // ==================================================
  // ことばデータ
  // ==================================================

  function getWordData(word) {

    const {
      game
    } = settings;

    return game.words[word];

  }


  // ==================================================
  // 発見したことばの数
  // ==================================================

  function getDiscoveredCount() {

    const {
      game
    } = settings;

    return Object.values(
      game.words
    ).filter(
      data =>
        data.successes > 0
    ).length;

  }


  // ==================================================
  // 定着したことばの数
  // ==================================================

  function getMasteredCount() {

    const {
      game
    } = settings;

    return Object.values(
      game.words
    ).filter(
      data =>
        data.successes >=
        game.masteryGoal
    ).length;

  }


  // ==================================================
  // ネットワーク完成判定
  // ==================================================

  function isNetworkMastered() {

    const {
      game
    } = settings;

    return (
      getMasteredCount() ===
      Object.keys(
        game.words
      ).length
    );

  }


  // ==================================================
  // スキル所持判定
  // ==================================================

  function hasSkill(skillId) {

    const {
      game
    } = settings;

    return game.skills.includes(
      skillId
    );

  }


  // ==================================================
  // ネットワーク表示更新
  // ==================================================

  function updateNetworkNodes() {

    const {
      game,
      networkNodes,
      networkCount
    } = settings;


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


        // --------------------------
        // 未発見
        // --------------------------

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


          node.style.boxShadow =
            "";


          return;

        }


        // --------------------------
        // 発見済み
        // --------------------------

        node.textContent =
          word;


        node.classList.add(
          "found"
        );


        node.style.opacity =
          "1";


        node.style.filter =
          "none";


        // --------------------------
        // 定着済み
        // --------------------------

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
  // ネットワーク画面
  // ==================================================

  function showNetwork() {

    updateNetworkNodes();


    settings.showScreen(
      "network"
    );


    if (
      isNetworkMastered()
    ) {

      showMasteryReadyMessage();

    }

  }


  // ==================================================
  // 習得テスト解放表示
  // ==================================================

  function showMasteryReadyMessage() {

    const {
      screens,
      kanjiData
    } = settings;


    let message =
      document.getElementById(
        "mastery-ready-message"
      );


    if (!message) {

      message =
        document.createElement(
          "div"
        );


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


    // 習得済み
    if (
      hasSkill(skillId)
    ) {

      message.innerHTML =
        `
          ✨ 漢字スキル「${kanjiData.kanji}」習得済み
          <br>
          ${kanjiData.skill.icon}
          ${kanjiData.skill.name}
        `;


      return;

    }


    message.innerHTML =
      `
        ✨ 「${kanjiData.kanji}」のつながりが育った！
        <br>
        習得テストに挑戦できます
      `;


    const testButton =
      document.createElement(
        "button"
      );


    testButton.className =
      "answer-button";


    testButton.style.display =
      "block";


    testButton.style.margin =
      "10px auto 0";


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


  // ==================================================
  // 習得テスト開始
  // ==================================================

  function startMasteryTest() {

    masteryTestIndex =
      0;


    masteryTestScore =
      0;


    showMasteryTestQuestion();

  }


  // ==================================================
  // 習得テスト問題
  // ==================================================

  function showMasteryTestQuestion() {

    const {
      kanjiData,
      challengeQuestion,
      answerArea,
      showScreen
    } = settings;


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


    answerArea.innerHTML =
      "";


    const writingWrap =
      document.createElement(
        "div"
      );


    writingWrap.style.gridColumn =
      "1 / -1";


    writingWrap.style.width =
      "100%";


    writingWrap.style.textAlign =
      "center";


    // ==================================================
    // 文字数に合わせてマスを作る
    // ==================================================

    const characters =
      [...question.target];


    const characterCount =
      characters.length;


    const cellSize =
      300;


    const canvas =
      document.createElement(
        "canvas"
      );


    canvas.width =
      cellSize *
      characterCount;


    canvas.height =
      cellSize;


    canvas.style.width =
      "100%";


    canvas.style.maxWidth =
      characterCount === 1
        ? "300px"
        : "600px";


    canvas.style.height =
      "auto";


    canvas.style.aspectRatio =
      `${characterCount} / 1`;


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
      canvas.getContext(
        "2d"
      );


    // ==================================================
    // マス目
    // ==================================================

    function drawGrid() {

      ctx.save();


      ctx.strokeStyle =
        "#c8bda7";


      ctx.lineWidth =
        4;


      // 文字の境界線
      for (
        let i = 1;
        i < characterCount;
        i++
      ) {

        ctx.beginPath();


        ctx.moveTo(
          cellSize * i,
          0
        );


        ctx.lineTo(
          cellSize * i,
          cellSize
        );


        ctx.stroke();

      }


      // 各マスの中央補助線
      ctx.setLineDash([
        12,
        12
      ]);


      ctx.lineWidth =
        2;


      for (
        let i = 0;
        i < characterCount;
        i++
      ) {

        const left =
          cellSize * i;


        // 縦
        ctx.beginPath();


        ctx.moveTo(
          left +
          cellSize / 2,
          0
        );


        ctx.lineTo(
          left +
          cellSize / 2,
          cellSize
        );


        ctx.stroke();


        // 横
        ctx.beginPath();


        ctx.moveTo(
          left,
          cellSize / 2
        );


        ctx.lineTo(
          left +
          cellSize,
          cellSize / 2
        );


        ctx.stroke();

      }


      ctx.restore();

    }


    drawGrid();


    // ==================================================
    // ペン
    // ==================================================

    ctx.lineWidth =
      12;


    ctx.lineCap =
      "round";


    ctx.lineJoin =
      "round";


    ctx.strokeStyle =
      "#18242d";


    let drawing =
      false;


    let hasDrawn =
      false;


    function getPosition(
      event
    ) {

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


    // ==================================================
    // 書き始め
    // ==================================================

    canvas.addEventListener(
      "pointerdown",
      event => {

        drawing =
          true;


        hasDrawn =
          true;


        const pos =
          getPosition(
            event
          );


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

          // Safari対策

        }

      }
    );


    // ==================================================
    // 書いている途中
    // ==================================================

    canvas.addEventListener(
      "pointermove",
      event => {

        if (!drawing) {
          return;
        }


        const pos =
          getPosition(
            event
          );


        ctx.lineTo(
          pos.x,
          pos.y
        );


        ctx.stroke();

      }
    );


    function stopDrawing() {

      drawing =
        false;

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


    // ==================================================
    // 操作ボタン
    // ==================================================

    const controls =
      document.createElement(
        "div"
      );


    controls.style.display =
      "grid";


    controls.style.gridTemplateColumns =
      "1fr 1fr";


    controls.style.gap =
      "10px";


    // ==================================================
    // 消す
    // ==================================================

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


        drawGrid();


        ctx.lineWidth =
          12;


        ctx.lineCap =
          "round";


        ctx.lineJoin =
          "round";


        ctx.strokeStyle =
          "#18242d";


        hasDrawn =
          false;

      }
    );


    // ==================================================
    // 答え確認
    // ==================================================

    const checkButton =
      document.createElement(
        "button"
      );


    checkButton.className =
      "answer-button";


    checkButton.textContent =
      "答えを確認";


    checkButton.addEventListener(
      "click",
      () => {

        if (
          !hasDrawn
        ) {

          checkButton.textContent =
            "まず書いてみよう！";


          return;

        }


        showMasterySelfCheck(
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


    showScreen(
      "challenge"
    );

  }


  // ==================================================
  // 習得テスト自己採点
  // ==================================================

  function showMasterySelfCheck(
    question,
    writingWrap,
    oldControls
  ) {

    oldControls.remove();


    const answer =
      document.createElement(
        "div"
      );


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
      document.createElement(
        "div"
      );


    controls.style.display =
      "grid";


    controls.style.gridTemplateColumns =
      "1fr 1fr";


    controls.style.gap =
      "10px";


    // ==================================================
    // ちがった
    // ==================================================

    const wrongButton =
      document.createElement(
        "button"
      );


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


    // ==================================================
    // 書けた
    // ==================================================

    const correctButton =
      document.createElement(
        "button"
      );


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

    const {
      kanjiData,
      challengeQuestion,
      answerArea,
      showScreen,
      setFieldMessage
    } = settings;


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

        showScreen(
          "field"
        );


        if (
          setFieldMessage
        ) {

          setFieldMessage(
            `また「${kanjiData.kanji}」のことばを練習しよう！`
          );

        }

      }
    );


    showScreen(
      "challenge"
    );

  }


  // ==================================================
  // 漢字スキル獲得
  // ==================================================

  function acquireKanjiSkill() {

    const {
      game,
      kanjiData,
      screens,
      showScreen
    } = settings;


    const skillId =
      kanjiData.skill.id;


    if (
      !hasSkill(
        skillId
      )
    ) {

      game.skills.push(
        skillId
      );


      if (
        typeof saveGame ===
        "function"
      ) {

        saveGame();

      }

    }


    showScreen(
      "clear"
    );


    let skillStatus =
      document.getElementById(
        "skill-acquired-status"
      );


    if (!skillStatus) {

      skillStatus =
        document.createElement(
          "div"
        );


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
  // 外から使える機能
  // ==================================================

  return {

    init,

    getWordData,

    getDiscoveredCount,

    getMasteredCount,

    isNetworkMastered,

    hasSkill,

    updateNetworkNodes,

    showNetwork,

    startMasteryTest

  };

})();
