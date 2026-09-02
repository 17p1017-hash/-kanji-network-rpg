// ==================================================
// battle.js
// 戦闘・ダメージ・EXP・ゴールド・レベル担当
// ==================================================

window.BattleModule = (() => {

  let settings = null;


  // ==================================================
  // 武器の攻撃力
  // ==================================================

  const weaponDamage = {

    sword: 1,

    bow: 2,

    staff: 3,

    hammer: 4

  };


  // ==================================================
  // 初期化
  // ==================================================

  function init(options) {

    settings = options;

  }


  // ==================================================
  // バトル開始
  // ==================================================

  function startBattle() {

    const {
      game,
      enemyName,
      enemySprite,
      battleMessage,
      enemyHP,
      showScreen
    } = settings;


    const enemyTemplate =
      game.enemies[
        game.enemyIndex %
        game.enemies.length
      ];


    game.currentEnemy = {

      ...enemyTemplate,

      hp:
        enemyTemplate.maxHp

    };


    const enemy =
      game.currentEnemy;


    game.combo =
      0;


    game.maxComboThisBattle =
      0;


    enemyName.textContent =
      `${enemy.name} HP ${enemy.hp}/${enemy.maxHp}`;


    enemySprite.style.backgroundImage =
      `url("${enemy.image}")`;


    enemySprite.style.backgroundPosition =
      "0 0";


    enemySprite.classList.remove(
      "enemy-hit",
      "enemy-defeated"
    );


    if (enemyHP) {

      enemyHP.style.width =
        "100%";

    }


    battleMessage.textContent =
      `${enemy.name}が あらわれた！`;


    showScreen(
      "battle"
    );

  }


  // ==================================================
  // 敵HP表示
  // ==================================================

  function updateEnemyHp() {

    const {
      game,
      enemyName,
      enemyHP
    } = settings;


    if (
      !game.currentEnemy
    ) {

      return;

    }


    const enemy =
      game.currentEnemy;


    const percent =
      (
        enemy.hp /
        enemy.maxHp
      ) * 100;


    if (enemyHP) {

      enemyHP.style.width =
        Math.max(
          0,
          percent
        ) + "%";

    }


    enemyName.textContent =
      `${enemy.name} HP ${enemy.hp}/${enemy.maxHp}`;

  }


  // ==================================================
  // 武器ダメージ取得
  // ==================================================

  function getWeaponDamage(
    weapon
  ) {

    return (
      weaponDamage[weapon] ||
      1
    );

  }


  // ==================================================
  // 正解 → 主人公の攻撃
  // ==================================================

  function playerAttack() {

    const {
      game,
      battleMessage,
      showScreen
    } = settings;


    if (
      !game.currentEnemy
    ) {

      return;

    }


    const damage =
      getWeaponDamage(
        game.selectedWeapon
      );


    // コンボ
    game.combo++;


    if (
      game.combo >
      game.maxComboThisBattle
    ) {

      game.maxComboThisBattle =
        game.combo;

    }


    // 敵HPを減らす
    game.currentEnemy.hp -=
      damage;


    if (
      game.currentEnemy.hp <
      0
    ) {

      game.currentEnemy.hp =
        0;

    }


    updateEnemyHp();


    showScreen(
      "battle"
    );


    playEnemyHitEffect(
      damage
    );


    let message =
      `${damage}ダメージ！`;


    if (
      game.combo >= 2
    ) {

      message +=
        `\n${game.combo} COMBO!`;

    }


    // 3コンボごとにボーナスEXP
    if (
      game.combo > 0 &&
      game.combo % 3 === 0
    ) {

      if (
        typeof game.battleBonusExp !==
        "number"
      ) {

        game.battleBonusExp =
          0;

      }


      game.battleBonusExp++;


      message +=
        "\nBONUS EXP +1!";

    }


    battleMessage.textContent =
      message;


    // 敵を倒した
    if (
      game.currentEnemy.hp <=
      0
    ) {

      setTimeout(
        () => {

          defeatEnemy();

        },
        700
      );


      return;

    }


    // 次のターン
    setTimeout(
      () => {

        if (
          !game.currentEnemy
        ) {

          return;

        }


        battleMessage.textContent =
          "次の武器を選ぼう！";

      },
      800
    );

  }


  // ==================================================
  // 不正解 → 敵の攻撃
  // ==================================================

  function enemyAttack() {

    const {
      game,
      battleMessage,
      showScreen
    } = settings;


    if (
      !game.currentEnemy
    ) {

      return;

    }


    const damage =
      game.currentEnemy.attack ||
      1;


    // コンボ終了
    game.combo =
      0;


    game.player.hp -=
      damage;


    if (
      game.player.hp <
      0
    ) {

      game.player.hp =
        0;

    }


    if (
      typeof saveGame ===
      "function"
    ) {

      saveGame();

    }


    showScreen(
      "battle"
    );


    battleMessage.textContent =
      `${game.currentEnemy.name}の攻撃！\n${damage}ダメージ！\nHP ${game.player.hp}/${game.player.maxHp}`;


    // 主人公が倒れた
    if (
      game.player.hp <=
      0
    ) {

      setTimeout(
        () => {

          defeatPlayer();

        },
        900
      );


      return;

    }


    setTimeout(
      () => {

        if (
          !game.currentEnemy
        ) {

          return;

        }


        battleMessage.textContent =
          `HP ${game.player.hp}/${game.player.maxHp}\n次の武器を選ぼう！`;

      },
      1000
    );

  }


  // ==================================================
  // 敵ダメージリアクション
  // ==================================================

  function playEnemyHitEffect(
    damage
  ) {

    const {
      enemySprite
    } = settings;


    if (
      !enemySprite
    ) {

      return;

    }


    enemySprite.classList.remove(
      "enemy-hit"
    );


    // 同じアニメーションを
    // 連続で再生するため
    void enemySprite.offsetWidth;


    enemySprite.classList.add(
      "enemy-hit"
    );


    showDamageNumber(
      damage
    );


    setTimeout(
      () => {

        enemySprite.classList.remove(
          "enemy-hit"
        );

      },
      450
    );

  }


  // ==================================================
  // ダメージ数字
  // ==================================================

  function showDamageNumber(
    damage
  ) {

    const {
      enemySprite
    } = settings;


    if (
      !enemySprite ||
      !enemySprite.parentElement
    ) {

      return;

    }


    const number =
      document.createElement(
        "div"
      );


    number.className =
      "damage-number";


    number.textContent =
      `-${damage}`;


    enemySprite.parentElement
      .appendChild(
        number
      );


    setTimeout(
      () => {

        number.remove();

      },
      800
    );

  }


  // ==================================================
  // 敵撃破
  // ==================================================

  function defeatEnemy() {

    const {
      game,
      enemySprite,
      battleMessage
    } = settings;


    if (
      !game.currentEnemy
    ) {

      return;

    }


    const enemy =
      game.currentEnemy;


    const bonusExp =
      game.battleBonusExp ||
      0;


    const gainedExp =
      enemy.exp +
      bonusExp;


    // --------------------------
    // 撃破アニメーション
    // --------------------------

    if (enemySprite) {

      enemySprite.classList.remove(
        "enemy-hit"
      );


      enemySprite.classList.add(
        "enemy-defeated"
      );

    }


    // --------------------------
    // EXP・ゴールド
    // --------------------------

    game.player.exp +=
      gainedExp;


    game.player.gold +=
      enemy.gold;


    // --------------------------
    // レベルアップ
    // --------------------------

    const levelUps =
      checkLevelUp();


    // --------------------------
    // 撃破メッセージ
    // --------------------------

    let message =
      `${enemy.name}を たおした！`;


    message +=
      `\nEXP +${gainedExp}`;


    message +=
      `\n💰 ${enemy.gold}G`;


    if (
      bonusExp > 0
    ) {

      message +=
        `\nコンボボーナス EXP +${bonusExp}`;

    }


    if (
      levelUps > 0
    ) {

      message +=
        `\n\n✨ LEVEL UP! ✨`;


      message +=
        `\nLv.${game.player.level}`;


      message +=
        `\n最大HP ${game.player.maxHp}`;

    }


    battleMessage.textContent =
      message;


    game.enemyIndex++;


    game.stepsSinceBattle =
      0;


    game.battleBonusExp =
      0;


    if (
      typeof saveGame ===
      "function"
    ) {

      saveGame();

    }


    // --------------------------
    // 「○○を倒した」を
    // しっかり表示してから
    // ことばのつながりへ
    // --------------------------

    setTimeout(
      () => {

        game.currentEnemy =
          null;


        if (
          typeof settings.showNetwork ===
          "function"
        ) {

          settings.showNetwork();

        }

      },
      1800
    );

  }


  // ==================================================
  // レベルアップ判定
  // ==================================================

  function checkLevelUp() {

    const {
      game
    } = settings;


    let levelUps =
      0;


    let requiredExp =
      game.player.level *
      10;


    while (
      game.player.exp >=
      requiredExp
    ) {

      game.player.exp -=
        requiredExp;


      game.player.level++;


      game.player.maxHp +=
        2;


      // レベルアップ時は全回復
      game.player.hp =
        game.player.maxHp;


      levelUps++;


      requiredExp =
        game.player.level *
        10;

    }


    return levelUps;

  }


  // ==================================================
  // 主人公敗北
  // ==================================================

  function defeatPlayer() {

    const {
      game,
      battleMessage,
      showScreen
    } = settings;


    battleMessage.textContent =
      "力尽きた……";


    game.combo =
      0;


    game.battleBonusExp =
      0;


    setTimeout(
      () => {

        // 王国へ戻る
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


        // HP全回復
        game.player.hp =
          game.player.maxHp;


        game.currentEnemy =
          null;


        if (
          typeof saveGame ===
          "function"
        ) {

          saveGame();

        }


        showScreen(
          "field"
        );


        if (
          settings.updateField
        ) {

          settings.updateField();

        }


        if (
          settings.setFieldMessage
        ) {

          settings.setFieldMessage(
            "王国で休んでHPが全回復した！"
          );

        }

      },
      1300
    );

  }


  // ==================================================
  // 外から使える機能
  // ==================================================

  return {

    init,

    startBattle,

    updateEnemyHp,

    getWeaponDamage,

    playerAttack,

    enemyAttack,

    defeatEnemy,

    defeatPlayer,

    checkLevelUp

  };

})();
