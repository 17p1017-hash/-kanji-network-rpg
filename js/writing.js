 // ==================================================
// writing.js
// ハンマーの書き取り処理
//
// AIなし手書き判定
//
// 判定内容
// ・何か書いているか
// ・画数
// ・字の大きさ
// ・お手本の字との形の近さ
//
// 不合格でも敵からダメージは受けず、
// その場でもう一度書ける
// ==================================================

window.WritingModule = (() => {

  let settings = null;


  // ==================================================
  // 判定設定
  // ==================================================

  const JUDGE_CONFIG = {

    // 形の一致率
    // 低いほどやさしい
    shapeThreshold: 0.28,

    // 少なすぎる落書きを防ぐ
    minimumInkPixels: 500,

    // 字が小さすぎるのを防ぐ
    minimumWidthRatio: 0.22,

    minimumHeightRatio: 0.22,

    // お手本比較用サイズ
    compareSize: 96

  };


  // ==================================================
  // 初期設定
  // ==================================================

  function init(options) {

    settings = options;

  }


  // ==================================================
  // 0～1の範囲
  // ==================================================

  function clamp(
    value,
    min,
    max
  ) {

    return Math.max(
      min,
      Math.min(
        max,
        value
      )
    );

  }


  // ==================================================
  // ImageDataからインク範囲を探す
  // ==================================================

  function getInkBounds(
    imageData
  ) {

    const {
      data,
      width,
      height
    } = imageData;


    let minX = width;

    let minY = height;

    let maxX = -1;

    let maxY = -1;

    let count = 0;


    for (
      let y = 0;
      y < height;
      y++
    ) {

      for (
        let x = 0;
        x < width;
        x++
      ) {

        const index =
          (
            y * width +
            x
          ) * 4;


        const alpha =
          data[
            index + 3
          ];


        if (
          alpha > 30
        ) {

          count++;


          if (
            x < minX
          ) {
            minX = x;
          }


          if (
            y < minY
          ) {
            minY = y;
          }


          if (
            x > maxX
          ) {
            maxX = x;
          }


          if (
            y > maxY
          ) {
            maxY = y;
          }

        }

      }

    }


    if (
      maxX < 0 ||
      maxY < 0
    ) {

      return null;

    }


    return {

      minX,

      minY,

      maxX,

      maxY,

      width:
        maxX - minX + 1,

      height:
        maxY - minY + 1,

      count

    };

  }


  // ==================================================
  // 手書き画像を比較用キャンバスへ正規化
  // ==================================================

  function normalizeInkCanvas(
    sourceCanvas,
    bounds,
    size
  ) {

    const result =
      document.createElement(
        "canvas"
      );


    result.width =
      size;

    result.height =
      size;


    const ctx =
      result.getContext(
        "2d"
      );


    ctx.clearRect(
      0,
      0,
      size,
      size
    );


    const margin =
      Math.round(
        size * 0.10
      );


    const available =
      size -
      margin * 2;


    const scale =
      Math.min(
        available /
          bounds.width,

        available /
          bounds.height
      );


    const drawWidth =
      bounds.width *
      scale;


    const drawHeight =
      bounds.height *
      scale;


    const dx =
      (
        size -
        drawWidth
      ) / 2;


    const dy =
      (
        size -
        drawHeight
      ) / 2;


    ctx.drawImage(
      sourceCanvas,

      bounds.minX,
      bounds.minY,
      bounds.width,
      bounds.height,

      dx,
      dy,
      drawWidth,
      drawHeight
    );


    return result;

  }


  // ==================================================
  // お手本漢字をキャンバスに描く
  // ==================================================

  function createReferenceCanvas(
    character,
    size
  ) {

    const canvas =
      document.createElement(
        "canvas"
      );


    canvas.width =
      size;

    canvas.height =
      size;


    const ctx =
      canvas.getContext(
        "2d"
      );


    ctx.clearRect(
      0,
      0,
      size,
      size
    );


    ctx.fillStyle =
      "#000";


    ctx.textAlign =
      "center";


    ctx.textBaseline =
      "middle";


    // iPhone/Safariでも使える
    // 日本語フォント優先
    ctx.font =
      `900 ${Math.round(
        size * 0.82
      )}px "Hiragino Sans", "Yu Gothic", sans-serif`;


    ctx.fillText(
      character,
      size / 2,
      size / 2 +
      size * 0.02
    );


    return canvas;

  }


  // ==================================================
  // 二値画像にする
  // ==================================================

  function canvasToBinary(
    canvas
  ) {

    const ctx =
      canvas.getContext(
        "2d"
      );


    const imageData =
      ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );


    const result =
      new Uint8Array(
        canvas.width *
        canvas.height
      );


    for (
      let i = 0;
      i <
      result.length;
      i++
    ) {

      const alpha =
        imageData.data[
          i * 4 + 3
        ];


      result[i] =
        alpha > 40
          ? 1
          : 0;

    }


    return result;

  }


  // ==================================================
  // 近くに線があるか
  //
  // 手書きはフォントと完全一致しないので、
  // 数pxのズレを許す
  // ==================================================

  function hasInkNearby(
    binary,
    size,
    x,
    y,
    radius
  ) {

    const startX =
      Math.max(
        0,
        x - radius
      );


    const endX =
      Math.min(
        size - 1,
        x + radius
      );


    const startY =
      Math.max(
        0,
        y - radius
      );


    const endY =
      Math.min(
        size - 1,
        y + radius
      );


    for (
      let yy = startY;
      yy <= endY;
      yy++
    ) {

      for (
        let xx = startX;
        xx <= endX;
        xx++
      ) {

        if (
          binary[
            yy * size +
            xx
          ]
        ) {

          return true;

        }

      }

    }


    return false;

  }


  // ==================================================
  // 形の比較
  //
  // 手書き → お手本
  // お手本 → 手書き
  //
  // 両方向から比較する
  // ==================================================

  function compareShape(
    userCanvas,
    referenceCanvas
  ) {

    const size =
      userCanvas.width;


    const user =
      canvasToBinary(
        userCanvas
      );


    const reference =
      canvasToBinary(
        referenceCanvas
      );


    // ズレ許容
    const radius = 5;


    let userPixels = 0;

    let userMatched = 0;

    let referencePixels = 0;

    let referenceMatched = 0;


    for (
      let y = 0;
      y < size;
      y++
    ) {

      for (
        let x = 0;
        x < size;
        x++
      ) {

        const index =
          y * size +
          x;


        // ------------------------------------------
        // 手書きの線が
        // お手本の近くにあるか
        // ------------------------------------------

        if (
          user[index]
        ) {

          userPixels++;


          if (
            hasInkNearby(
              reference,
              size,
              x,
              y,
              radius
            )
          ) {

            userMatched++;

          }

        }


        // ------------------------------------------
        // お手本の線が
        // 手書きの近くにあるか
        // ------------------------------------------

        if (
          reference[index]
        ) {

          referencePixels++;


          if (
            hasInkNearby(
              user,
              size,
              x,
              y,
              radius
            )
          ) {

            referenceMatched++;

          }

        }

      }

    }


    if (
      userPixels === 0 ||
      referencePixels === 0
    ) {

      return 0;

    }


    const precision =
      userMatched /
      userPixels;


    const recall =
      referenceMatched /
      referencePixels;


    // F1スコア
    if (
      precision +
      recall ===
      0
    ) {

      return 0;

    }


    return (
      2 *
      precision *
      recall /
      (
        precision +
        recall
      )
    );

  }


  // ==================================================
  // 手書き判定
  // ==================================================

  function judgeWriting(
    target,
    inkCanvas,
    strokes
  ) {

    const characters =
      [...target];


    // 今回の第1章では
    // ハンマーは1漢字を想定
    if (
      characters.length !== 1
    ) {

      return {

        success: false,

        reason:
          "一文字ずつ書いてみよう。",

        score: 0

      };

    }


    const character =
      characters[0];


    // ------------------------------------------
    // 判定データ
    // ------------------------------------------

    const data =
      typeof HANDWRITING_GRADE1 !==
      "undefined"
        ? HANDWRITING_GRADE1[
            character
          ]
        : null;


    if (!data) {

      return {

        success: false,

        reason:
          `「${character}」の手書き判定データがありません。`,

        score: 0

      };

    }


    // ------------------------------------------
    // 画数
    // ------------------------------------------

    if (
      strokes.length !==
      data.strokes
    ) {

      return {

        success: false,

        reason:
          `おしい！ 「${character}」は ${data.strokes}画だよ。今は ${strokes.length}画になっているよ。`,

        score: 0

      };

    }


    // ------------------------------------------
    // 書いた量
    // ------------------------------------------

    const ctx =
      inkCanvas.getContext(
        "2d"
      );


    const imageData =
      ctx.getImageData(
        0,
        0,
        inkCanvas.width,
        inkCanvas.height
      );


    const bounds =
      getInkBounds(
        imageData
      );


    if (!bounds) {

      return {

        success: false,

        reason:
          "まだ字が書かれていないよ。",

        score: 0

      };

    }


    if (
      bounds.count <
      JUDGE_CONFIG.minimumInkPixels
    ) {

      return {

        success: false,

        reason:
          "もう少ししっかり大きく書いてみよう！",

        score: 0

      };

    }


    // ------------------------------------------
    // 字が小さすぎないか
    // ------------------------------------------

    const widthRatio =
      bounds.width /
      inkCanvas.width;


    const heightRatio =
      bounds.height /
      inkCanvas.height;


    if (
      widthRatio <
        JUDGE_CONFIG.minimumWidthRatio ||
      heightRatio <
        JUDGE_CONFIG.minimumHeightRatio
    ) {

      return {

        success: false,

        reason:
          "マスの中に、もう少し大きく書いてみよう！",

        score: 0

      };

    }


    // ------------------------------------------
    // 形を比較
    // ------------------------------------------

    const normalizedUser =
      normalizeInkCanvas(
        inkCanvas,
        bounds,
        JUDGE_CONFIG.compareSize
      );


    const reference =
      createReferenceCanvas(
        character,
        JUDGE_CONFIG.compareSize
      );


    const shapeScore =
      compareShape(
        normalizedUser,
        reference
      );


    const score =
      Math.round(
        clamp(
          shapeScore,
          0,
          1
        ) * 100
      );


    // ------------------------------------------
    // 合格
    // ------------------------------------------

    if (
      shapeScore >=
      JUDGE_CONFIG.shapeThreshold
    ) {

      return {

        success: true,

        reason:
          "いいね！ 字の形ができているよ！",

        score

      };

    }


    // ------------------------------------------
    // 不合格
    // ------------------------------------------

    return {

      success: false,

      reason:
        "おしい！ お手本の形を思い出して、もう一度書いてみよう。",

      score

    };

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
    // ヒント
    // ==================================================

    const hint =
      document.createElement(
        "div"
      );


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
    // ターゲット
    // ==================================================

    const target =
      question.target ||
      word;


    const characters =
      [...target];


    const characterCount =
      characters.length;


    // ==================================================
    // キャンバス
    // ==================================================

    const cellSize =
      300;


    // ------------------------------------------
    // 表示用キャンバス
    // ------------------------------------------

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


    // ------------------------------------------
    // 判定用キャンバス
    //
    // マス目を含めず
    // 子どもの線だけ記録する
    // ------------------------------------------

    const inkCanvas =
      document.createElement(
        "canvas"
      );


    inkCanvas.width =
      canvas.width;


    inkCanvas.height =
      canvas.height;


    const ctx =
      canvas.getContext(
        "2d"
      );


    const inkCtx =
      inkCanvas.getContext(
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


      for (
        let i = 1;
        i <
        characterCount;
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


      ctx.setLineDash([
        12,
        12
      ]);


      ctx.lineWidth =
        2;


      for (
        let i = 0;
        i <
        characterCount;
        i++
      ) {

        const left =
          cellSize * i;


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
    // ペン設定
    // ==================================================

    function setupPen(
      context
    ) {

      context.lineWidth =
        12;


      context.lineCap =
        "round";


      context.lineJoin =
        "round";


      context.strokeStyle =
        "#18242d";

    }


    setupPen(
      ctx
    );


    setupPen(
      inkCtx
    );


    let drawing =
      false;


    let hasDrawn =
      false;


    let currentStroke =
      null;


    const strokes =
      [];


    // ==================================================
    // タッチ位置
    // ==================================================

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

        event.preventDefault();


        drawing =
          true;


        hasDrawn =
          true;


        const pos =
          getPosition(
            event
          );


        currentStroke =
          [
            pos
          ];


        ctx.beginPath();


        ctx.moveTo(
          pos.x,
          pos.y
        );


        inkCtx.beginPath();


        inkCtx.moveTo(
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


        event.preventDefault();


        const pos =
          getPosition(
            event
          );


        currentStroke.push(
          pos
        );


        ctx.lineTo(
          pos.x,
          pos.y
        );


        ctx.stroke();


        inkCtx.lineTo(
          pos.x,
          pos.y
        );


        inkCtx.stroke();

      }
    );


    // ==================================================
    // 書き終わり
    // ==================================================

    function stopDrawing() {

      if (!drawing) {
        return;
      }


      drawing =
        false;


      if (
        currentStroke &&
        currentStroke.length > 0
      ) {

        strokes.push(
          currentStroke
        );

      }


      currentStroke =
        null;


      // ------------------------------------------
      // 今の画数を表示
      // ------------------------------------------

      const data =
        typeof HANDWRITING_GRADE1 !==
        "undefined"
          ? HANDWRITING_GRADE1[
              target
            ]
          : null;


      if (data) {

        hint.textContent =
          `${strokes.length}画 / ${data.strokes}画`;

      } else {

        hint.textContent =
          `${strokes.length}画`;

      }

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


        inkCtx.clearRect(
          0,
          0,
          inkCanvas.width,
          inkCanvas.height
        );


        drawGrid();


        setupPen(
          ctx
        );


        setupPen(
          inkCtx
        );


        strokes.length =
          0;


        currentStroke =
          null;


        hasDrawn =
          false;


        const data =
          typeof HANDWRITING_GRADE1 !==
          "undefined"
            ? HANDWRITING_GRADE1[
                target
              ]
            : null;


        if (data) {

          hint.textContent =
            `0画 / ${data.strokes}画`;

        } else {

          hint.textContent =
            "思い出して書いてみよう";

        }

      }
    );


    // ==================================================
    // 判定する
    // ==================================================

    const checkButton =
      document.createElement(
        "button"
      );


    checkButton.className =
      "answer-button";


    checkButton.textContent =
      "できた！";


    checkButton.addEventListener(
      "click",
      () => {

        if (!hasDrawn) {

          hint.textContent =
            "まず自分で書いてみよう！";

          return;

        }


        // 書いている途中なら
        // 先に1画として確定
        stopDrawing();


        const result =
          judgeWriting(
            target,
            inkCanvas,
            strokes
          );


        // ------------------------------------------
        // 正解
        // ------------------------------------------

        if (
          result.success
        ) {

          handleWritingSuccess(
            word,
            question,
            writingWrap,
            controls,
            result
          );


          return;

        }


        // ------------------------------------------
        // 不正解
        //
        // 敵からダメージは受けず
        // その場で書き直し
        // ------------------------------------------

        showRetryMessage(
          target,
          result,
          writingWrap,
          controls,
          () => {

            startWritingChallenge(
              word,
              question
            );

          }
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


    // 最初から画数を表示
    const data =
      typeof HANDWRITING_GRADE1 !==
      "undefined"
        ? HANDWRITING_GRADE1[
            target
          ]
        : null;


    if (data) {

      hint.textContent =
        `0画 / ${data.strokes}画`;

    }


    showScreen(
      "challenge"
    );

  }


  // ==================================================
  // 正解
  // ==================================================

  function handleWritingSuccess(
    word,
    question,
    writingWrap,
    controls,
    result
  ) {

    const {
      registerSuccess,
      onWritingSuccess
    } = settings;


    controls.remove();


    const resultBox =
      document.createElement(
        "div"
      );


    resultBox.style.marginTop =
      "12px";


    resultBox.style.padding =
      "14px";


    resultBox.style.borderRadius =
      "12px";


    resultBox.style.background =
      "#fff4b8";


    resultBox.innerHTML =
      `
        <div style="
          font-size:22px;
          font-weight:900;
          margin-bottom:6px;
        ">
          ✨ いいね！
        </div>

        <div style="
          font-size:17px;
          font-weight:700;
        ">
          ${result.reason}
        </div>
      `;


    writingWrap.appendChild(
      resultBox
    );


    if (
      registerSuccess
    ) {

      registerSuccess(
        word
      );

    }


    // 少しだけ見せてから攻撃
    setTimeout(
      () => {

        if (
          onWritingSuccess
        ) {

          onWritingSuccess(
            word,
            question
          );

        }

      },
      700
    );

  }


  // ==================================================
  // 書き直し
  // ==================================================

  function showRetryMessage(
    target,
    result,
    writingWrap,
    controls,
    onRetry
  ) {

    controls.remove();


    const resultBox =
      document.createElement(
        "div"
      );


    resultBox.style.marginTop =
      "12px";


    resultBox.style.padding =
      "14px";


    resultBox.style.borderRadius =
      "12px";


    resultBox.style.background =
      "#fff1e8";


    const title =
      document.createElement(
        "div"
      );


    title.style.fontSize =
      "22px";


    title.style.fontWeight =
      "900";


    title.style.marginBottom =
      "8px";


    title.textContent =
      "もう一回！";


    const message =
      document.createElement(
        "div"
      );


    message.style.fontSize =
      "17px";


    message.style.fontWeight =
      "700";


    message.style.marginBottom =
      "12px";


    message.textContent =
      result.reason;


    // ------------------------------------------
    // お手本
    // ------------------------------------------

    const exampleLabel =
      document.createElement(
        "div"
      );


    exampleLabel.textContent =
      "お手本";


    exampleLabel.style.fontSize =
      "15px";


    exampleLabel.style.marginTop =
      "8px";


    const example =
      document.createElement(
        "div"
      );


    example.textContent =
      target;


    example.style.fontSize =
      "64px";


    example.style.fontWeight =
      "900";


    example.style.margin =
      "6px 0 14px";


    const retryButton =
      document.createElement(
        "button"
      );


    retryButton.className =
      "answer-button";


    retryButton.textContent =
      "もう一度書く";


    retryButton.style.width =
      "100%";


    retryButton.addEventListener(
      "click",
      onRetry
    );


    resultBox.appendChild(
      title
    );


    resultBox.appendChild(
      message
    );


    resultBox.appendChild(
      exampleLabel
    );


    resultBox.appendChild(
      example
    );


    resultBox.appendChild(
      retryButton
    );


    writingWrap.appendChild(
      resultBox
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
