// ==================================================
// save.js
// セーブ・ロード担当
//
// 保存するもの:
// ・現在のマップ
// ・主人公の位置、向き
// ・レベル、HP、RP、EXP、ゴールド
// ・漢字進行
// ・スキル
// ・ストーリー進行フラグ
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
      // 現在のマップ
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

        step:
          game.player.step,


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
        // EXP・ゴールド
        // --------------------------

        exp:
          game.player.exp,

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
        game.skills,


      // ==================================================
      // ストーリー進行フラグ
      //
      // 例:
      // kotobaGateRepaired
      // ==================================================

      flags:
        game.flags || {}

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
//
// デバッグ・最初から遊ぶ機能用
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
