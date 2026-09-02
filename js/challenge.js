// ==================================================
// challenge.js
// 剣・弓・杖の問題担当
// ==================================================

window.ChallengeModule = (() => {

  let settings = null;


  // ==================================================
  // 初期化
  // ==================================================

  function init(options) {

    settings = options;

  }


  // ==================================================
  // 配列をシャッフル
  // ==================================================

  function shuffle(array) {

    return [...array].sort(
      () => Math.random() - 0.5
    );

  }


  // ==================================================
  // 次に出すことば
  // ==================================================

  function chooseNextWord() {

    const {
      game
    } = settings;


    const entries =
      Object.entries(
        game.words
      );


    // まだ定着していないことば
    const learningWords =
      entries.filter(
        ([word, data]) =>
          data.successes <
          game.masteryGoal
      );


    if (
      learningWords.length >
      0
    ) {

      // 成功回数が一番少ないもの
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
            data.successes ===
            minimum
        );


      return candidates[
        Math.floor(
          Math.random() *
          candidates.length
        )
      ][0];

    }


    // 全部定着済みでも復習する
    const allWords =
      Object.keys(
        game.words
      );


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

  function startChallenge() {

    const {
      game,
      kanjiData,
      challengeQuestion,
      answerArea,
      showScreen
    } = settings;


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
      wordData.questions?.[
        weapon
      ];


    if (
      !questions ||
      questions.length === 0
    ) {

      challengeQuestion.textContent =
        "この学び方の問題はまだありません。";


      answerArea.innerHTML =
        "";


      showScreen(
        "challenge"
      );


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


    // ==================================================
    // ハンマー
    // writing.jsへ渡す
    // ==================================================

    if (
      question.type ===
      "writing"
    ) {

      if (
        window.WritingModule
      ) {

        window.WritingModule
          .startWritingChallenge(
            word,
            question
          );

      } else {

        console.error(
          "WritingModule がありません。"
        );

      }


      return;

    }


    // ==================================================
    // 弓
    // ==================================================

    if (
      question.type ===
      "build"
    ) {

      startBuildChallenge(
        word,
        question
      );


      return;

    }


    // ==================================================
    // 剣・杖
    // ==================================================

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

    const {
      challengeQuestion,
      answerArea,
      showScreen
    } = settings;


    challengeQuestion.textContent =
      question.question;


    answerArea.innerHTML =
      "";


    const shuffled =
      shuffle(
        question.answers
      );


    shuffled.forEach(
      answer => {

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

            checkChoiceAnswer(
              answer,
              question.correct,
              word,
              button
            );

          }
        );


        answerArea.appendChild(
          button
        );

      }
    );


    showScreen(
      "challenge"
    );

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

    if (
      answer === correct
    ) {

      button.textContent =
        "✨ " + answer;


      button.style.background =
        "#fff3a6";


      disableAnswerButtons();


      if (
        settings.registerSuccess
      ) {

        settings.registerSuccess(
          word
        );

      }


      // 正解したら戦闘側へ
      if (
        window.BattleModule
      ) {

        window.BattleModule
          .playerAttack();

      }


      return;

    }


    // ==================================================
    // 不正解
    // ==================================================

    button.textContent =
      "✕ " + answer;


    button.style.background =
      "#ffd0d0";


    disableAnswerButtons();


    // 不正解なら敵が反撃
    setTimeout(
      () => {

        if (
          window.BattleModule
        ) {

          window.BattleModule
            .enemyAttack();

        }

      },
      500
    );

  }


  // ==================================================
  // 回答ボタンを止める
  // ==================================================

  function disableAnswerButtons() {

    const {
      answerArea
    } = settings;


    const buttons =
      answerArea.querySelectorAll(
        "button"
      );


    buttons.forEach(
      button => {

        button.disabled =
          true;

      }
    );

  }


  // ==================================================
  // 弓
  // 組み立て問題
  // ==================================================

  function startBuildChallenge(
    word,
    question
  ) {

    const {
      challengeQuestion,
      answerArea,
      showScreen
    } = settings;


    challengeQuestion.textContent =
      question.question;


    answerArea.innerHTML =
      "";


    const buildWrap =
      document.createElement(
        "div"
      );


    buildWrap.style.gridColumn =
      "1 / -1";


    buildWrap.style.width =
      "100%";


    // ==================================================
    // 組み立て結果
    // ==================================================

    const resultBox =
      document.createElement(
        "div"
      );


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


    // ==================================================
    // 選ぶパーツ
    // ==================================================

    const partsArea =
      document.createElement(
        "div"
      );


    partsArea.style.display =
      "grid";


    partsArea.style.gridTemplateColumns =
      "repeat(2, 1fr)";


    partsArea.style.gap =
      "10px";


    let selectedParts =
      [];


    const extraParts =
      getExtraBuildParts(
        question.parts
      );


    const choices =
      shuffle([
        ...question.parts,
        ...extraParts
      ]);


    choices.forEach(
      part => {

        const button =
          document.createElement(
            "button"
          );


        button.className =
          "answer-button";


        button.textContent =
          part;


        button.addEventListener(
          "click",
          () => {

            selectedParts.push(
              part
            );


            resultBox.textContent =
              selectedParts.join(
                ""
              );


            button.disabled =
              true;

          }
        );


        partsArea.appendChild(
          button
        );

      }
    );


    buildWrap.appendChild(
      partsArea
    );


    // ==================================================
    // 決定・やり直し
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


    controls.style.marginTop =
      "14px";


    // ==================================================
    // やり直す
    // ==================================================

    const resetButton =
      document.createElement(
        "button"
      );


    resetButton.className =
      "answer-button";


    resetButton.textContent =
      "やり直す";


    resetButton.addEventListener(
      "click",
      () => {

        selectedParts =
          [];


        resultBox.textContent =
          "ここに組み立てよう";


        partsArea
          .querySelectorAll(
            "button"
          )
          .forEach(
            button => {

              button.disabled =
                false;

            }
          );

      }
    );


    // ==================================================
    // 決定
    // ==================================================

    const decideButton =
      document.createElement(
        "button"
      );


    decideButton.className =
      "answer-button";


    decideButton.textContent =
      "これで決定！";


    decideButton.addEventListener(
      "click",
      () => {

        const answer =
          selectedParts.join(
            ""
          );


        // ==================================================
        // 正解
        // ==================================================

        if (
          answer ===
          question.correct
        ) {

          resultBox.textContent =
            "✨ " + answer;


          disableBuildButtons(
            partsArea,
            controls
          );


          if (
            settings.registerSuccess
          ) {

            settings.registerSuccess(
              word
            );

          }


          setTimeout(
            () => {

              if (
                window.BattleModule
              ) {

                window.BattleModule
                  .playerAttack();

              }

            },
            400
          );


          return;

        }


        // ==================================================
        // 不正解
        // ==================================================

        resultBox.textContent =
          "ちがった！";


        disableBuildButtons(
          partsArea,
          controls
        );


        setTimeout(
          () => {

            if (
              window.BattleModule
            ) {

              window.BattleModule
                .enemyAttack();

            }

          },
          500
        );

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


    showScreen(
      "challenge"
    );

  }


  // ==================================================
  // 組み立てボタンを止める
  // ==================================================

  function disableBuildButtons(
    partsArea,
    controls
  ) {

    partsArea
      .querySelectorAll(
        "button"
      )
      .forEach(
        button => {

          button.disabled =
            true;

        }
      );


    controls
      .querySelectorAll(
        "button"
      )
      .forEach(
        button => {

          button.disabled =
            true;

        }
      );

  }


  // ==================================================
  // 弓のダミーパーツ
  // ==================================================

  function getExtraBuildParts(
    correctParts
  ) {

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
          !correctParts.includes(
            part
          )
      );


    return shuffle(
      available
    ).slice(
      0,
      2
    );

  }


  // ==================================================
  // 外から使える機能
  // ==================================================

  return {

    init,

    chooseNextWord,

    startChallenge,

    startChoiceChallenge,

    startBuildChallenge

  };

})();
