// ==================================================
// save.js
// セーブ・ロード担当
// ==================================================

const SAVE_KEY = "kanjiNetworkRpgSave";


// ==================================================
// セーブデータを読み込む
// ==================================================

function loadSaveData() {

  try {

    const saved =
      localStorage.getItem(SAVE_KEY);

    if (!saved) {
      return null;
    }

    return JSON.parse(saved);

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
    typeof game === "undefined" ||
    !game
  ) {

    console.warn(
      "gameデータがないため保存できません。"
    );

    return;
  }


  try {

    const data = {

      player: {

        level:
          game.player.level,

        hp:
          game.player.hp,

        maxHp:
          game.player.maxHp,

        exp:
          game.player.exp,

        gold:
          game.player.gold

      },


      words:
        game.words,


      skills:
        game.skills

    };


    localStorage.setItem(
      SAVE_KEY,
      JSON.stringify(data)
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
