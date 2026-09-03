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

  let readingSkillButton = null;


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
  // ことばリーディング
  // ==================================================

  const READING_SKILL_ID =
    "read_skill";

  const READING_SKILL_COST =
    5;

  let readingBoostActive =
    false;


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


    readingSkillButton =
      document.getElementById(
        "reading-skill-button"
      );


    if (readingSkillButton) {

      readingSkillButton
        .addEventListener(
          "click",
          useReadingSkill
        );

    }


    updatePlayerStatus();

    updateReadingSkillButton();

  }


  // ==================================================
  // スキルを持っているか
  // ==================================================

  function hasReadingSkill() {

    return (
      Array.isArray(game.skills) &&
      game.skills.includes(
        READING_SKILL_ID
      )
    );

  }


  // ==================================================
  // スキルボタン更新
  // ==================================================

  function updateReadingSkillButton() {

    if (!readingSkillButton) {
      return;
    }


    // 未習得なら非表示
    if (!hasReadingSkill()) {

      readingSkillButton.style.display =
        "none";

      return;

    }


    // 習得済みなら表示
    readingSkillButton.style.display =
      "block";


    // 発動中
    if (readingBoostActive) {

      readingSkillButton.disabled =
        true;

      readingSkillButton.innerHTML =
        `📖 発動中！ <span class="skill-cost">次の攻撃×2</span>`;

      return;

    }


    // RP不足
    if (
      game.player.rp <
      READING_SKILL_COST
    ) {

      readingSkillButton.disabled =
        true;

      readingSkillButton.innerHTML =
        `📖 ことばリーディング <span class="skill-cost">RP不足</span>`;

      return;

    }


    // 使用可能
    readingSkillButton.disabled =
      false;

    readingSkillButton.innerHTML =
      `📖 ことばリーディング <span class="skill-cost">5 RP</span>`;

  }


  // ==================================================
  // ことばリーディング発動
  // ==================================================

  function useReadingSkill() {

    if (!game.currentEnemy) {
      return;
    }


    if (!hasReadingSkill()) {
      return;
    }


    if (readingBoostActive) {
      return;
    }


    if (
      game.player.rp <
      READING_SKILL_COST
    ) {

      if (battleMessage) {

        battleMessage.textContent =
          "RPが足りない！";

      }

      return;

    }


    game.player.rp -=
      READING_SKILL_COST;


    readingBoostActive =
      true;


    updatePlayerStatus();

    updateReadingSkillButton();

    saveGame();


    if (battleMessage) {

      battleMessage.textContent =
        "📖 ことばリーディング発動！ 次の正解攻撃が2倍！";

    }

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


    updateReadingSkillButton();

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
      hp: enemyBase.maxHp
    };


    game.combo = 0;
    game.maxComboThisBattle = 0;
    game.battleBonusExp = 0;
    game.selectedWeapon = null;

    readingBoostActive =
      false;


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

    updateReadingSkillButton();


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


    let damage =
      weaponDamage[
        game.selectedWeapon
      ] || 1;


    // --------------------------
    // ことばリーディング
    // --------------------------

    const usedReadingBoost =
      readingBoostActive;


    if (usedReadingBoost) {

      damage *= 2;

      readingBoostActive =
        false;

    }


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

    updateReadingSkillButton();

    playEnemyHitEffect();

    showDamageNumber(
      damage
    );


    // --------------------------
    // メッセージ
    // --------------------------

    let message = "";


    if (usedReadingBoost) {

      message +=
        "📖 ことばリーディング！ ";

    }


    message +=
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


    if (
      game.currentEnemy.hp <= 0
    ) {

      setTimeout(
        defeatEnemy,
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


    // 間違えても
    // readingBoostActive は消さない
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

  function showDamageNumber(damage) {

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
  // 敵消滅アニメーション
  // ==================================================

  function playEnemyDefeatAnimation(
    callback
  ) {

    if (!enemySprite) {

      callback();

      return;

    }


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
            frame >= totalFrames
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


    readingBoostActive =
      false;


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

        game.stepsSinceBattle = 0;

        game.currentEnemy = null;

        game.selectedWeapon = null;

        game.combo = 0;

        game.battleBonusExp = 0;


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


      game.player.maxHp +=
        2;

      game.player.maxRp +=
        1;


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

    readingBoostActive =
      false;


    if (battleMessage) {

      battleMessage.textContent =
        "力尽きた…… はじまりの王国へ戻ろう。";

    }


    setTimeout(
      () => {

        game.area =
          "kingdom";


        game.player.x = 50;
        game.player.y = 58;
        game.player.direction =
          "down";


        game.player.hp =
          game.player.maxHp;

        game.player.rp =
          game.player.maxRp;


        game.stepsSinceBattle = 0;

        game.currentEnemy = null;

        game.selectedWeapon = null;

        game.combo = 0;

        game.battleBonusExp = 0;


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

    updatePlayerStatus,

    updateReadingSkillButton

  };

})();
