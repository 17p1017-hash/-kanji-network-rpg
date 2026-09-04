document.addEventListener("DOMContentLoaded", () => {

  // ==================================================
  // 第1章データ確認
  // ==================================================

  const chapterFiles = [
    typeof CHAPTER1_01 !== "undefined" ? CHAPTER1_01 : null,
    typeof CHAPTER1_02 !== "undefined" ? CHAPTER1_02 : null,
    typeof CHAPTER1_03 !== "undefined" ? CHAPTER1_03 : null,
    typeof CHAPTER1_04 !== "undefined" ? CHAPTER1_04 : null,
    typeof CHAPTER1_05 !== "undefined" ? CHAPTER1_05 : null,
    typeof CHAPTER1_06 !== "undefined" ? CHAPTER1_06 : null,
    typeof CHAPTER1_07 !== "undefined" ? CHAPTER1_07 : null,
    typeof CHAPTER1_08 !== "undefined" ? CHAPTER1_08 : null
  ];


  const missingChapterFiles =
    chapterFiles
      .map((data, index) => {

        if (data) {
          return null;
        }

        return `chapter1_0${index + 1}.js`;

      })
      .filter(Boolean);


  if (missingChapterFiles.length > 0) {

    console.error(
      "第1章データがありません:",
      missingChapterFiles
    );

    alert(
      "第1章の問題データを読み込めませんでした。\n\n" +
      missingChapterFiles.join("\n")
    );

    return;

  }


  // ==================================================
  // 以前の「読」データ確認
  // ==================================================

  if (typeof KANJI_YOMU === "undefined") {

    console.warn(
      "KANJI_YOMU がありません。"
    );

  }


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
  // 第1章 40字を1つにまとめる
  // ==================================================

  const chapterKanji = {};


  chapterFiles.forEach(chapter => {

    Object.entries(
      chapter.kanji
    ).forEach(([kanji, data]) => {

      chapterKanji[kanji] = data;

    });

  });


  // ==================================================
  // 漢字の順番
  // 01 → 08
  // ==================================================

  const kanjiOrder = [

    // 01
    "日",
    "月",
    "火",
    "水",
    "木",

    // 02
    "山",
    "川",
    "田",
    "土",
    "石",

    // 03
    "上",
    "下",
    "左",
    "右",
    "中",

    // 04
    "一",
    "二",
    "三",
    "四",
    "五",

    // 05
    "人",
    "子",
    "女",
    "男",
    "友",

    // 06
    "目",
    "口",
    "耳",
    "手",
    "足",

    // 07
    "大",
    "小",
    "白",
    "赤",
    "青",

    // 08
    "学",
    "校",
    "本",
    "文",
    "字"

  ];


  // ==================================================
  // ChallengeModule用データ
  // ==================================================

  let activeKanji =
    "日";


  const challengeWords = {};


  kanjiOrder.forEach(kanji => {

    const source =
      chapterKanji[kanji];


    if (!source) {

      console.error(
        `漢字データがありません: ${kanji}`
      );

      return;

    }


    challengeWords[kanji] = {

      ...source,

      word:
        kanji,

      questions:
        source.questions || {}

    };

  });


  const kanjiData = {

    get kanji() {
      return activeKanji;
    },

    masteryGoal:
      1,

    words:
      challengeWords

  };


  // ==================================================
  // 画面
  // ==================================================

  const screens = {

    title:
      document.getElementById(
        "title-screen"
      ),

    field:
      document.getElementById(
        "field-screen"
      ),

    battle:
      document.getElementById(
        "battle-screen"
      ),

    skill:
      document.getElementById(
        "skill-screen"
      ),

    challenge:
      document.getElementById(
        "challenge-screen"
      ),

    network:
      document.getElementById(
        "network-screen"
      ),

    kanjiSkill:
      document.getElementById(
        "kanji-skill-screen"
      ),

    clear:
      document.getElementById(
        "clear-screen"
      )

  };


  function showScreen(name) {

    Object.values(screens)
      .forEach(screen => {

        if (screen) {

          screen.classList.remove(
            "active"
          );

        }

      });


    if (screens[name]) {

      screens[name]
        .classList.add(
          "active"
        );

    }

  }


  // ==================================================
  // セーブデータ
  // ==================================================

  const saveData =
    loadSaveData();


  // ==================================================
  // 第1章専用セーブ
  // ==================================================

  const CHAPTER_SAVE_KEY =
    "kanjiNetworkRpgChapter1";


  function loadChapterProgress() {

    try {

      const raw =
        localStorage.getItem(
          CHAPTER_SAVE_KEY
        );


      if (!raw) {

        return {};

      }


      return JSON.parse(raw);

    } catch (error) {

      console.warn(
        "第1章進行データを読み込めませんでした。",
        error
      );

      return {};

    }

  }


  const savedChapterProgress =
    loadChapterProgress();


  // ==================================================
  // 第1章の漢字進行
  // ==================================================

  function createKanjiProgress() {

    const progress = {};


    kanjiOrder.forEach(kanji => {

      const saved =
        savedChapterProgress?.kanji?.[kanji] ||
        {};


      progress[kanji] = {

        successes:
          saved.successes || 0,

        mistakes:
          saved.mistakes || 0,

        mastered:
          saved.mastered || false,

        reviewAfter:
          saved.reviewAfter || 0,

        lastBattle:
          saved.lastBattle || 0

      };

    });


    return progress;

  }


  const kanjiProgress =
    createKanjiProgress();


  let chapterBattleCount =
    savedChapterProgress?.battleCount ||
    0;


  function saveChapterProgress() {

    try {

      localStorage.setItem(
        CHAPTER_SAVE_KEY,
        JSON.stringify({

          battleCount:
            chapterBattleCount,

          kanji:
            kanjiProgress

        })
      );

    } catch (error) {

      console.warn(
        "第1章進行データを保存できませんでした。",
        error
      );

    }

  }


  // ==================================================
  // 以前の「読」進行
  // ==================================================

  function createOldWordProgress() {

    const progress = {};


    if (
      typeof KANJI_YOMU === "undefined" ||
      !KANJI_YOMU.words
    ) {

      return progress;

    }


    Object.keys(
      KANJI_YOMU.words
    ).forEach(word => {

      progress[word] = {

        successes:
          saveData?.words?.[word]?.successes ||
          0

      };

    });


    return progress;

  }


  // ==================================================
  // game.words
  // ==================================================

  function createGameWords() {

    const words =
      createOldWordProgress();


    kanjiOrder.forEach(kanji => {

      words[kanji] = {

        successes:
          kanjiProgress[kanji].successes

      };

    });


    return words;

  }


  // ==================================================
  // ゲーム本体データ
  // ==================================================

  const game = {

    // ==================================================
    // 現在マップ
    //
    // セーブあり
    // → 保存していたマップ
    //
    // セーブなし
    // → 王国
    // ==================================================

    area:
      saveData?.area ??
      "kingdom",


    player: {

      // ==================================================
      // 現在位置
      //
      // セーブあり
      // → 保存位置
      //
      // セーブなし
      // → 王国spawn
      // ==================================================

      x:
        saveData?.player?.x ??
        window.MAP_KINGDOM?.spawn?.x ??
        610,

      y:
        saveData?.player?.y ??
        window.MAP_KINGDOM?.spawn?.y ??
        1060,

      direction:
        saveData?.player?.direction ??
        window.MAP_KINGDOM?.spawn?.direction ??
        "up",

      step:
        saveData?.player?.step ??
        0,


      // --------------------------
      // レベル
      // --------------------------

      level:
        saveData?.player?.level ||
        1,


      // --------------------------
      // HP
      // --------------------------

      hp:
        saveData?.player?.hp ??
        10,

      maxHp:
        saveData?.player?.maxHp ||
        10,


      // --------------------------
      // RP
      // --------------------------

      rp:
        saveData?.player?.rp ??
        10,

      maxRp:
        saveData?.player?.maxRp ||
        10,


      // --------------------------
      // EXP・ゴールド
      // --------------------------

      exp:
        saveData?.player?.exp ||
        0,

      gold:
        saveData?.player?.gold ||
        0

    },


    // ==================================================
    // 移動・戦闘
    // ==================================================

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


    currentKanji:
      "日",


    currentQuestion:
      null,


    combo:
      0,


    maxComboThisBattle:
      0,


    battleBonusExp:
      0,


    // ==================================================
    // 旧「読」システムとの互換
    // ==================================================

    masteryGoal:
      typeof KANJI_YOMU !== "undefined"
        ? KANJI_YOMU.masteryGoal || 3
        : 3,


    words:
      createGameWords(),


    skills:
      saveData?.skills || [],


    // ==================================================
    // ストーリー進行フラグ
    //
    // 例:
    // kotobaGateRepaired
    // ==================================================

    flags:
      saveData?.flags || {},


    // ==================================================
    // 第1章
    // ==================================================

    chapter1: {

      order:
        kanjiOrder,

      progress:
        kanjiProgress

    }

  };


  window.game =
    game;


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


  const kanjiBadge =
    document.querySelector(
      ".kanji-badge"
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
  // 習熟判定
  // ==================================================

  function isKanjiMastered(
    kanji
  ) {

    const progress =
      kanjiProgress[kanji];


    if (!progress) {

      return false;

    }


    if (
      progress.mistakes > 0
    ) {

      return (
        progress.successes >= 2
      );

    }


    return (
      progress.successes >= 1
    );

  }


  function updateMasteryState(
    kanji
  ) {

    const progress =
      kanjiProgress[kanji];


    if (!progress) {

      return;

    }


    progress.mastered =
      isKanjiMastered(
        kanji
      );


    if (
      game.words[kanji]
    ) {

      game.words[kanji].successes =
        progress.successes;

    }


    saveChapterProgress();

    saveGame();

  }


  // ==================================================
  // 習熟済み漢字数
  // ==================================================

  function getMasteredCount() {

    return kanjiOrder.filter(
      kanji =>
        isKanjiMastered(
          kanji
        )
    ).length;

  }


  // ==================================================
  // 次に戦う漢字を選ぶ
  // ==================================================

  function chooseKanjiForBattle() {

    const masteredCount =
      getMasteredCount();


    // ----------------------------------------------
    // 復習対象
    // ----------------------------------------------

    const dueReview =
      kanjiOrder.find(kanji => {

        const progress =
          kanjiProgress[kanji];


        if (!progress) {

          return false;

        }


        if (
          isKanjiMastered(
            kanji
          )
        ) {

          return false;

        }


        if (
          progress.mistakes <= 0
        ) {

          return false;

        }


        return (
          chapterBattleCount >=
          progress.reviewAfter
        );

      });


    if (
      dueReview
    ) {

      return dueReview;

    }


    // ----------------------------------------------
    // 新しい漢字
    // ----------------------------------------------

    const newKanji =
      kanjiOrder.find(kanji => {

        const progress =
          kanjiProgress[kanji];


        return (
          !isKanjiMastered(
            kanji
          ) &&
          progress.successes === 0 &&
          progress.mistakes === 0
        );

      });


    // ----------------------------------------------
    // 習熟済み漢字のランダム復習
    // ----------------------------------------------

    if (
      masteredCount >= 5 &&
      Math.random() < 0.10
    ) {

      const masteredKanji =
        kanjiOrder.filter(
          kanji =>
            isKanjiMastered(
              kanji
            )
        );


      if (
        masteredKanji.length > 0
      ) {

        return masteredKanji[
          Math.floor(
            Math.random() *
            masteredKanji.length
          )
        ];

      }

    }


    if (
      newKanji
    ) {

      return newKanji;

    }


    // ----------------------------------------------
    // 習熟待ち
    // ----------------------------------------------

    const waitingKanji =
      kanjiOrder.find(
        kanji =>
          !isKanjiMastered(
            kanji
          )
      );


    if (
      waitingKanji
    ) {

      return waitingKanji;

    }


    // ----------------------------------------------
    // 全習熟後
    // ----------------------------------------------

    return kanjiOrder[
      Math.floor(
        Math.random() *
        kanjiOrder.length
      )
    ];

  }


  // ==================================================
  // 戦闘開始前に漢字を決定
  // ==================================================

  function prepareKanjiForBattle() {

    chapterBattleCount++;


    const selectedKanji =
      chooseKanjiForBattle();


    activeKanji =
      selectedKanji;


    game.currentKanji =
      selectedKanji;


    game.currentWord =
      selectedKanji;


    const progress =
      kanjiProgress[
        selectedKanji
      ];


    if (
      progress
    ) {

      progress.lastBattle =
        chapterBattleCount;

    }


    saveChapterProgress();

  }


  // ==================================================
  // 学習成功
  // ==================================================

  function registerSuccess(word) {

    if (
      kanjiProgress[word]
    ) {

      const progress =
        kanjiProgress[word];


      if (
        isKanjiMastered(
          word
        )
      ) {

        saveChapterProgress();

        saveGame();

        return;

      }


      progress.successes++;


      if (
        progress.mistakes > 0 &&
        progress.successes === 1
      ) {

        progress.reviewAfter =
          chapterBattleCount + 2;

      }


      updateMasteryState(
        word
      );


      return;

    }


    const data =
      game.words[word];


    if (
      !data
    ) {

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
  // 間違い記録
  // ==================================================

  function registerMistake(
    kanji
  ) {

    const progress =
      kanjiProgress[kanji];


    if (
      !progress
    ) {

      return;

    }


    if (
      isKanjiMastered(
        kanji
      )
    ) {

      saveChapterProgress();

      return;

    }


    progress.mistakes++;


    progress.reviewAfter =
      chapterBattleCount + 1;


    updateMasteryState(
      kanji
    );

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

      prepareKanjiForBattle();


      BattleModule.startBattle();


      game.currentWord =
        activeKanji;


      game.currentKanji =
        activeKanji;


      if (
        kanjiBadge
      ) {

        kanjiBadge.textContent =
          activeKanji;

      }

    }

  });


  // ==================================================
  // MasteryModule
  // ==================================================

  if (
    typeof KANJI_YOMU !==
    "undefined"
  ) {

    MasteryModule.init({

      game,

      kanjiData:
        KANJI_YOMU,

      screens,

      challengeQuestion,

      answerArea,

      networkNodes,

      networkCount,

      showScreen,

      setFieldMessage: text => {

        FieldModule.setFieldMessage(
          text
        );

      }

    });

  }


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

      showScreen(
        "field"
      );


      game.stepsSinceBattle =
        0;


      FieldModule.updateField();


      const count =
        getMasteredCount();


      const progress =
        kanjiProgress[
          game.currentKanji
        ];


      if (
        progress &&
        isKanjiMastered(
          game.currentKanji
        )
      ) {

        FieldModule.setFieldMessage(
          `「${game.currentKanji}」を習熟！　1年生漢字 ${count} / 40`
        );

      } else {

        FieldModule.setFieldMessage(
          `「${game.currentKanji}」を練習した！　1年生漢字 ${count} / 40`
        );

      }

    },


    updateField: () => {

      FieldModule.updateField();

    },


    setFieldMessage: text => {

      FieldModule.setFieldMessage(
        text
      );

    }

  });


  // ==================================================
  // BattleModule.enemyAttack ラップ
  // ==================================================

  const originalEnemyAttack =
    BattleModule.enemyAttack;


  if (
    typeof originalEnemyAttack ===
    "function"
  ) {

    BattleModule.enemyAttack =
      function(...args) {

        if (
          game.currentKanji &&
          game.currentEnemy
        ) {

          registerMistake(
            game.currentKanji
          );

        }


        return originalEnemyAttack
          .apply(
            BattleModule,
            args
          );

      };

  }


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

  if (
    startButton
  ) {

    startButton.addEventListener(
      "click",
      () => {

        showScreen(
          "field"
        );


        FieldModule.updateField();


        const masteredCount =
          getMasteredCount();


        if (
          masteredCount === 0
        ) {

          FieldModule.setFieldMessage(
            "最初の漢字は「日」！ 下の道から冒険に出よう。"
          );

        } else if (
          masteredCount < 40
        ) {

          const nextKanji =
            chooseKanjiForBattle();


          FieldModule.setFieldMessage(
            `1年生漢字 ${masteredCount} / 40　次は「${nextKanji}」！`
          );

        } else {

          FieldModule.setFieldMessage(
            "1年生漢字40字を習熟した！ 冒険を続けよう！"
          );

        }

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

          if (
            !game.currentEnemy
          ) {

            return;

          }


          game.selectedWeapon =
            button.dataset.weapon;


          game.currentWord =
            activeKanji;


          game.currentKanji =
            activeKanji;


          if (
            kanjiBadge
          ) {

            kanjiBadge.textContent =
              activeKanji;

          }


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


  if (
    changeWeaponButton
  ) {

    changeWeaponButton
      .addEventListener(
        "click",
        () => {

          if (
            !game.currentEnemy
          ) {

            return;

          }


          showScreen(
            "battle"
          );


          battleMessage.textContent =
            `「${activeKanji}」に別の方法で挑戦してみよう！`;

        }
      );

  }


  // ==================================================
  // バトル用スキル
  // ==================================================

  const skillMenuButton =
    document.getElementById(
      "skill-menu-button"
    );


  if (
    skillMenuButton
  ) {

    skillMenuButton.addEventListener(
      "click",
      () => {

        if (
          !game.currentEnemy
        ) {

          return;

        }


        showScreen(
          "skill"
        );

      }
    );

  }


  // ==================================================
  // バトル用スキルから戻る
  // ==================================================

  const skillBackButton =
    document.getElementById(
      "skill-back-button"
    );


  if (
    skillBackButton
  ) {

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


  if (
    networkCloseButton
  ) {

    networkCloseButton.addEventListener(
      "click",
      () => {

        game.stepsSinceBattle =
          0;


        showScreen(
          "field"
        );


        FieldModule.setFieldMessage(
          `1年生漢字 ${getMasteredCount()} / 40`
        );

      }
    );

  }


  // ==================================================
  // 漢字スキルボタン
  // ==================================================

  const mapButton =
    document.getElementById(
      "map-button"
    );


  if (
    mapButton
  ) {

    mapButton.addEventListener(
      "click",
      () => {

        if (
          screens.kanjiSkill
        ) {

          showScreen(
            "kanjiSkill"
          );

          return;

        }


        if (
          typeof KANJI_YOMU !==
          "undefined"
        ) {

          MasteryModule.showNetwork();

        }

      }
    );

  }


  // ==================================================
  // 漢字スキル画面を閉じる
  // ==================================================

  const skillCloseButton =
    document.getElementById(
      "skill-close-button"
    );


  if (
    skillCloseButton
  ) {

    skillCloseButton.addEventListener(
      "click",
      () => {

        showScreen(
          "field"
        );


        FieldModule.setFieldMessage(
          `1年生漢字 ${getMasteredCount()} / 40`
        );

      }
    );

  }


  // ==================================================
  // 旧ネットワークを見る
  // ==================================================

  const yomuNetworkButton =
    document.getElementById(
      "skill-yomu-network-button"
    );


  if (
    yomuNetworkButton
  ) {

    yomuNetworkButton.addEventListener(
      "click",
      () => {

        if (
          typeof KANJI_YOMU !==
          "undefined"
        ) {

          MasteryModule.showNetwork();

        }

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


  if (
    continueButton
  ) {

    continueButton.addEventListener(
      "click",
      () => {

        showScreen(
          "field"
        );


        game.stepsSinceBattle =
          0;


        FieldModule.setFieldMessage(
          `1年生漢字 ${getMasteredCount()} / 40　冒険を続けよう！`
        );

      }
    );

  }


  // ==================================================
  // キーボード
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

  if (
    typeof KANJI_YOMU !==
    "undefined"
  ) {

    try {

      MasteryModule
        .updateNetworkNodes();

    } catch (error) {

      console.warn(
        "旧ネットワーク画面の更新をスキップしました。",
        error
      );

    }

  }


  showScreen(
    "title"
  );

});
