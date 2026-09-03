// ==================================================
// battle.js
// 戦闘処理
// ==================================================

window.BattleModule = (() => {

  let game = null;

  let enemyName = null;
  let enemySprite = null;
  let battleMessage = null;
  let enemyHP = null;

  let showScreen = null;
  let showNetwork = null;
  let updateField = null;
  let setFieldMessage = null;


  // ==================================================
  // 武器ダメージ
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

  function init(settings) {

    game =
      settings.game;

    enemyName =
      settings.enemyName;

    enemySprite =
      settings.enemySprite;

    battleMessage =
      settings.battleMessage;

    enemyHP =
      settings.enemyHP;

    showScreen =
      settings.showScreen;

    showNetwork =
      settings.showNetwork;

    updateField =
      settings.updateField;

    setFieldMessage =
      settings.setFieldMessage;


    updatePlayerStatus();

  }


  // ==================================================
  // プレイヤーHP / RP表示
  // ==================================================

  function updatePlayerStatus() {

    if (!game) {
      return;
    }


    const hpBar =
      document.getElementById(
        "player-hp-bar"
      );

    const hpText =
      document.getElementById(
        "player-hp-text"
      );

    const rpBar =
      document.getElementById(
        "player-rp-bar"
      );

    const rpText =
      document.getElementById(
        "player-rp-text"
      );


    // --------------------------
    // HP
    // --------------------------

    const hpPercent =
      Math.max(
        0,
        Math.min(
          100,
          (
            game.player.hp /
            game.player.maxHp
          ) * 100
        )
      );


    if (hpBar) {

      hpBar.style.width =
        `${hpPercent}%`;

    }


    if (hpText) {

      hpText.textContent =
        `${game.player.hp} / ${game.player.maxHp}`;

    }


    // --------------------------
    // RP
    // --------------------------

    const rpPercent =
      Math.max(
        0,
        Math.min(
          100,
          (
            game.player.rp /
            game.player.maxRp
          ) * 100
        )
      );


    if (rpBar) {

      rpBar.style.width =
        `${rpPercent}%`;

    }


    if (rpText) {

      rpText.textContent =
        `${game.player.rp} / ${game.player.maxRp}`;

    }

  }


  // ==================================================
  // 敵HP表示
  // ==================================================

  function updateEnemyHP() {

    if (
      !game.currentEnemy ||
      !enemyHP
    ) {

      return;

    }


    const percent =
      Math.max(
        0,
        (
          game.currentEnemy.hp /
          game.currentEnemy.maxHp
        ) * 100
      );


    enemyHP.style.width =
      `${percent}%`;

  }


  // ==================================================
  // 戦闘開始
  // ==================================================

  function startBattle() {

    const enemyBase =
      game.enemies[
        game.enemyIndex %
        game.enemies.length
      ];


    game.currentEnemy = {

      ...enemyBase,

      hp:
        enemyBase.maxHp

    };


    game.combo = 0;

    game.maxComboThisBattle = 0;

    game.battleBonusExp = 0;

    game.selectedWeapon = null;


    if (enemyName) {

      enemyName.textContent =
        game.currentEnemy.name;

    }


    if (enemySprite) {

      enemySprite.style.backgroundImage =
        `url("${game.currentEnemy.image}")`;

      enemySprite.style.backgroundPosition =
        "0px 0px";

      enemySprite.style.opacity =
        "1";

      enemySprite.style.transform =
        "none";

    }


    updateEnemyHP();

    updatePlayerStatus();


    if (battleMessage) {

      battleMessage.textContent =
        `${game.currentEnemy.name} があらわれた！`;

    }


    showScreen(
      "battle"
    );

  }


  // ==================================================
  // プレイヤー攻撃
  // ==================================================

  function playerAttack() {

    if (
      !game.currentEnemy ||
      !game.selectedWeapon
    ) {

      return;

    }


    const damage =
      weaponDamage[
        game.selectedWeapon
      ] || 1;


    // --------------------------
    // コンボ
    // --------------------------

    game.combo++;


    if (
      game.combo >
      game.maxComboThisBattle
    ) {

      game.maxComboThisBattle =
        game.combo;

    }


    // 3コンボごとにボーナスEXP
    if (
      game.combo > 0 &&
      game.combo % 3 === 0
    ) {

      game.battleBonusExp++;

    }


    // --------------------------
    // 敵にダメージ
    // --------------------------

    game.currentEnemy.hp -=
      damage;


    if (
      game.currentEnemy.hp < 0
    ) {

      game.currentEnemy.hp = 0;

    }


    updateEnemyHP();


    playEnemyHitEffect();

    showDamageNumber(
      damage
    );


    // --------------------------
    // メッセージ
    // --------------------------

    let message =
      `${damage} ダメージ！`;


    if (game.combo >= 2) {

      message +=
        ` ${game.combo} COMBO！`;

    }


    if (
      game.combo > 0 &&
      game.combo % 3 === 0
    ) {

      message +=
        " ボーナスEXP +1！";

    }


    if (battleMessage) {

      battleMessage.textContent =
        message;

    }


    // --------------------------
    // 敵を倒した
    // --------------------------

    if (
      game.currentEnemy.hp <= 0
    ) {

      setTimeout(
        () => {

          defeatEnemy();

        },
        500
      );

    }

  }


  // ==================================================
  // 敵の攻撃
  // ==================================================

  function enemyAttack() {

    if (!game.currentEnemy) {
      return;
    }


    // 間違えるとコンボ終了
    game.combo = 0;


    const damage =
      game.currentEnemy.attack || 1;


    game.player.hp -=
      damage;


    if (
      game.player.hp < 0
    ) {

      game.player.hp = 0;

    }


    updatePlayerStatus();

    saveGame();


    if (battleMessage) {

      battleMessage.textContent =
        `${game.currentEnemy.name} の攻撃！ ${damage} ダメージ！`;

    }


    // --------------------------
    // プレイヤーHP0
    // --------------------------

    if (
      game.player.hp <= 0
    ) {

      defeatPlayer();

    }

  }


  // ==================================================
  // 敵ヒット演出
  // ==================================================

  function playEnemyHitEffect() {

    if (!enemySprite) {
      return;
    }


    enemySprite.classList.remove(
      "enemy-hit"
    );


    void enemySprite.offsetWidth;


    enemySprite.classList.add(
      "enemy-hit"
    );


    setTimeout(
      () => {

        enemySprite.classList.remove(
          "enemy-hit"
        );

      },
      350
    );

  }


  // ==================================================
  // ダメージ数字
  // ==================================================

  function showDamageNumber(
    damage
  ) {

    if (!enemySprite) {
      return;
    }


    const parent =
      enemySprite.parentElement;


    if (!parent) {
      return;
    }


    const damageElement =
      document.createElement(
        "div"
      );


    damageElement.className =
      "damage-number";


    damageElement.textContent =
      `-${damage}`;


    parent.appendChild(
      damageElement
    );


    setTimeout(
      () => {

        damageElement.remove();

      },
      800
    );

  }


  // ==================================================
  // 敵の消滅アニメーション
  // ==================================================

  function playEnemyDefeatAnimation(
    callback
  ) {

    if (!enemySprite) {

      callback();

      return;

    }


    // 通常敵の元画像は
    // 64px × 64px が4コマ。
    //
    // CSSで2倍表示しているので
    // 画面上では1コマ128px。

    const frameWidth =
      128;


    const totalFrames =
      4;


    let frame =
      0;


    const interval =
      setInterval(
        () => {

          enemySprite.style
            .backgroundPosition =
              `-${frame * frameWidth}px 0px`;


          frame++;


          if (
            frame >=
            totalFrames
          ) {

            clearInterval(
              interval
            );


            setTimeout(
              () => {

                enemySprite.style.opacity =
                  "0";


                callback();

              },
              180
            );

          }

        },
        160
      );

  }


  // ==================================================
  // 敵撃破
  // ==================================================

  function defeatEnemy() {

    if (!game.currentEnemy) {
      return;
    }


    const defeatedEnemy =
      game.currentEnemy;


    playEnemyDefeatAnimation(
      () => {

        const gainedExp =
          defeatedEnemy.exp +
          game.battleBonusExp;


        const gainedGold =
          defeatedEnemy.gold;


        game.player.exp +=
          gainedExp;


        game.player.gold +=
          gainedGold;


        const levelUpCount =
          checkLevelUp();


        updatePlayerStatus();


        let message =
          `${defeatedEnemy.name} をたおした！ ` +
          `EXP +${gainedExp} / ${gainedGold}G`;


        if (levelUpCount > 0) {

          message +=
            `　レベルアップ！ Lv.${game.player.level}`;

        }


        if (battleMessage) {

          battleMessage.textContent =
            message;

        }


        game.enemyIndex++;

        game.stepsSinceBattle =
          0;


        game.currentEnemy =
          null;


        game.selectedWeapon =
          null;


        game.combo =
          0;


        game.battleBonusExp =
          0;


        saveGame();


        setTimeout(
          () => {

            showNetwork();

          },
          1800
        );

      }
    );

  }


  // ==================================================
  // レベルアップ
  // ==================================================

  function checkLevelUp() {

    let levelUpCount =
      0;


    while (
      game.player.exp >=
      game.player.level * 10
    ) {

      const neededExp =
        game.player.level * 10;


      game.player.exp -=
        neededExp;


      game.player.level++;


      // HP最大値 +2
      game.player.maxHp +=
        2;


      // RP最大値 +1
      game.player.maxRp +=
        1;


      // レベルアップ時は全回復
      game.player.hp =
        game.player.maxHp;


      game.player.rp =
        game.player.maxRp;


      levelUpCount++;

    }


    return levelUpCount;

  }


  // ==================================================
  // プレイヤー敗北
  // ==================================================

  function defeatPlayer() {

    if (battleMessage) {

      battleMessage.textContent =
        "力尽きた…… はじまりの王国へ戻ろう。";

    }


    setTimeout(
      () => {

        game.area =
          "kingdom";


        game.player.x =
          50;


        game.player.y =
          58;


        game.player.direction =
          "down";


        // 王国で全回復
        game.player.hp =
          game.player.maxHp;


        game.player.rp =
          game.player.maxRp;


        game.stepsSinceBattle =
          0;


        game.currentEnemy =
          null;


        game.selectedWeapon =
          null;


        game.combo =
          0;


        game.battleBonusExp =
          0;


        updatePlayerStatus();

        saveGame();


        showScreen(
          "field"
        );


        updateField();


        setFieldMessage(
          "王国で休んで、HPとRPが全回復した！"
        );

      },
      1300
    );

  }


  // ==================================================
  // 外から使うもの
  // ==================================================

  return {

    init,

    startBattle,

    playerAttack,

    enemyAttack,

    updatePlayerStatus

  };

})();
