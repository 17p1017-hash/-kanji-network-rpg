// ==================================================
// writing.js
// ハンマーの書き取り処理
// ==================================================

window.WritingModule = (() => {

  let settings = null;


  // ==================================================
  // 初期設定
  // game.js から必要なものを受け取る
  // ==================================================

  function init(options) {

    settings = options;

  }


  // ==================================================
  // 書き取り問題を開始
  // ==================================================

  function startWritingChallenge(
    word,
    question
  ) {

    if (!settings) {

      console.error(
        "WritingModule が初期化されていません。"
      );

      return;
    }


    const {
      challengeQuestion,
      answerArea,
      showScreen
    } = settings;


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


    // ==================================================
    // ヒント
    // ==================================================

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


    // ==================================================
    // 書く文字数
    // ==================================================

    const target =
      question.target || word;


    const characters =
      [...target];


    const characterCount =
      characters.length;


    // ==================================================
    // キャンバス
    // ==================================================

    const cellSize = 300;


    const canvas =
      document.createElement("canvas");


    canvas.width =
      cellSize * characterCount;

    canvas.height =
      cellSize;


    // 画面上では最大幅に収める
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
      canvas.getContext("2d");


    // ==================================================
    // マス目を描く
    // ==================================================

    function drawGrid() {

      ctx.save();


      ctx.strokeStyle =
        "#c8bda7";


      ctx.lineWidth = 4;


      // --------------------------
      // 文字と文字の境界線
      // --------------------------

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


      // --------------------------
      // 各マスの補助線
      // --------------------------

      ctx.setLineDash([
        12,
        12
      ]);


      ctx.lineWidth = 2;


      for (
        let i = 0;
        i < characterCount;
        i++
      ) {

        const left =
          cellSize * i;


        // 縦の中央線
        ctx.beginPath();

        ctx.moveTo(
          left + cellSize / 2,
          0
        );

        ctx.lineTo(
          left + cellSize / 2,
          cellSize
        );

        ctx.stroke();


        // 横の中央線
        ctx.beginPath();

        ctx.moveTo(
          left,
          cellSize / 2
        );

        ctx.lineTo(
          left + cellSize,
          cellSize / 2
        );

        ctx.stroke();

      }


      ctx.restore();

    }


    drawGrid();


    // ==================================================
    // ペン設定
    // ==================================================

    ctx.lineWidth = 12;

    ctx.lineCap =
      "round";

    ctx.lineJoin =
      "round";

    ctx.strokeStyle =
      "#18242d";


    let drawing = false;

    let hasDrawn = false;


    // ==================================================
    // タッチ位置
    // ==================================================

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


    // ==================================================
    // 書き始め
    // ==================================================

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

          // Safariなど一部ブラウザ対策

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
          getPosition(event);


        ctx.lineTo(
          pos.x,
          pos.y
        );


        ctx.stroke();

      }
    );


    // ==================================================
    // 書き終わり
    // ==================================================

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


    // ==================================================
    // ボタン
    // ==================================================

    const controls =
      document.createElement("div");


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


        // マス目を描き直す
        drawGrid();


        // ペン設定も戻す
        ctx.lineWidth = 12;

        ctx.lineCap =
          "round";

        ctx.lineJoin =
          "round";

        ctx.strokeStyle =
          "#18242d";


        hasDrawn = false;

      }
    );


    // ==================================================
    // 答えを見る
    // ==================================================

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


    showScreen(
      "challenge"
    );

  }


  // ==================================================
  // 自己確認
  // ==================================================

  function showWritingSelfCheck(
    word,
    question,
    writingWrap,
    oldControls
  ) {

    const {
      registerSuccess,
      onWritingSuccess
    } = settings;


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
          自分の字と見比べてみよう
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


    // ==================================================
    // ちがった
    // ==================================================

    const retryButton =
      document.createElement("button");


    retryButton.className =
      "answer-button";


    retryButton.textContent =
      "ちがった";


    retryButton.addEventListener(
      "click",
      () => {

        startWritingChallenge(
          word,
          question
        );

      }
    );


    // ==================================================
    // 書けた
    // ==================================================

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


        retryButton.disabled =
          true;


        successButton.textContent =
          "✨ 書けた！";


        // 学習成功を記録
        if (registerSuccess) {

          registerSuccess(
            word
          );

        }


        // 戦闘側へ正解を伝える
        if (onWritingSuccess) {

          onWritingSuccess(
            word,
            question
          );

        }

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
  // 外から使える機能
  // ==================================================

  return {

    init,

    startWritingChallenge

  };

})();
