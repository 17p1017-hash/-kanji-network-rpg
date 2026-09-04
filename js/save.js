// ==================================================
// save.js
// セーブ・ロード担当
//
// 保存:
// ・現在のマップ
// ・主人公の現在位置
// ・主人公の向き
// ・レベル / HP / RP / EXP / ゴールド
// ・漢字進行
// ・スキル
// ==================================================

const SAVE_KEY =
  "kanjiNetworkRpgSave";


// ==================================================
// セーブデータを読み込む
// ==================================================

function loadSaveData() {

  try {

    const saved =
      localStorage.getItem(
        SAVE_KEY
      );


    if (!saved) {

      return null;

    }


    const data =
      JSON.parse(
        saved
      );


    if (
      !data ||
      typeof data !==
        "object"
    ) {

      return null;

    }


    return data;

  } catch (error) {

    console.error(
      "セーブデータを読み込めませんでした。",
      error
    );


    return null;

  }

}


// ==================================================
// ゲームを保存する
// ==================================================

function saveGame() {

  if (
    typeof window.game ===
      "undefined" ||
    !window.game
  ) {

    console.warn(
      "gameデータがないため保存できません。"
    );


    return;

  }


  try {

    const game =
      window.game;


    const data = {

      // ==================================================
      // 現在地
      // ==================================================

      area:
        game.area,


      // ==================================================
      // 主人公
      // ==================================================

      player: {

        // --------------------------
        // 現在位置
        // --------------------------

        x:
          game.player.x,

        y:
          game.player.y,

        direction:
          game.player.direction,


        // --------------------------
        // レベル
        // --------------------------

        level:
          game.player.level,


        // --------------------------
        // HP
        // --------------------------

        hp:
          game.player.hp,

        maxHp:
          game.player.maxHp,


        // --------------------------
        // RP
        // --------------------------

        rp:
          game.player.rp,

        maxRp:
          game.player.maxRp,


        // --------------------------
        // EXP
        // --------------------------

        exp:
          game.player.exp,


        // --------------------------
        // ゴールド
        // --------------------------

        gold:
          game.player.gold

      },


      // ==================================================
      // 漢字進行
      // ==================================================

      words:
        game.words,


      // ==================================================
      // スキル
      // ==================================================

      skills:
        game.skills

    };


    localStorage.setItem(
      SAVE_KEY,
      JSON.stringify(
        data
      )
    );

  } catch (error) {

    console.error(
      "ゲームを保存できませんでした。",
      error
    );

  }

}


// ==================================================
// セーブデータを削除する
// ==================================================

function deleteSaveData() {

  try {

    localStorage.removeItem(
      SAVE_KEY
    );


    console.log(
      "セーブデータを削除しました。"
    );

  } catch (error) {

    console.error(
      "セーブデータを削除できませんでした。",
      error
    );

  }

}
