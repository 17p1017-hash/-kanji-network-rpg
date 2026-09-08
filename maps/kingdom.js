// ==================================================
// maps/kingdom.js
// はじまりの王国
//
// 座標系：1254 × 1254px
//
// ベース：
// kingdom_base_01 ～ kingdom_base_09
//
// オブジェクト：
// A = 家 4×4
// B = 主要パーツ 3×3
// C = 装飾 3×3
// 王城 = royal_castle.PNG
//
// 方針：
// ・ベース画像は地面のみ
// ・建造物は独立オブジェクト
// ・家は緑の芝生上へ配置
// ・王城は北側12時方向
// ・中央噴水の周囲を庭園化
// ・ことばの門は単体で配置
// ・外周城壁は現在の調整済み配置を維持
// ・南門のみ読みの森へ接続
//
// 城壁奥行き：
// 縦向き城壁 z:10
// 円柱塔     z:9
// 横向き城壁 z:8
//
// 現在：
// ・中央噴水は alpha collision
// ・噴水の手動 circle / rect collision は削除
// ・外周城壁 collision のみ手動で残す
// ・住宅・商業区等の collision は一時的に削除中
// ==================================================

const MAP_KINGDOM = {

  // ==================================================
  // 基本情報
  // ==================================================

  id: "kingdom",

  name: "はじまりの王国",

  type: "tiled",

  coordinateUnit: "pixel",

  encounter: false,


  // ==================================================
  // マップサイズ
  // ==================================================

  width: 1254,

  height: 1254,

  tileWidth: 418,

  tileHeight: 418,

  columns: 3,

  rows: 3,


  // ==================================================
  // ベースマップ
  // ==================================================

  tiles: [

    {
      id: "kingdom_base_01",
      image:
        "images/maps/kingdom/base/kingdom_base_01.png",
      x: 0,
      y: 0
    },

    {
      id: "kingdom_base_02",
      image:
        "images/maps/kingdom/base/kingdom_base_02.png",
      x: 418,
      y: 0
    },

    {
      id: "kingdom_base_03",
      image:
        "images/maps/kingdom/base/kingdom_base_03.png",
      x: 836,
      y: 0
    },

    {
      id: "kingdom_base_04",
      image:
        "images/maps/kingdom/base/kingdom_base_04.png",
      x: 0,
      y: 418
    },

    {
      id: "kingdom_base_05",
      image:
        "images/maps/kingdom/base/kingdom_base_05.png",
      x: 418,
      y: 418
    },

    {
      id: "kingdom_base_06",
      image:
        "images/maps/kingdom/base/kingdom_base_06.png",
      x: 836,
      y: 418
    },

    {
      id: "kingdom_base_07",
      image:
        "images/maps/kingdom/base/kingdom_base_07.png",
      x: 0,
      y: 836
    },

    {
      id: "kingdom_base_08",
      image:
        "images/maps/kingdom/base/kingdom_base_08.png",
      x: 418,
      y: 836
    },

    {
      id: "kingdom_base_09",
      image:
        "images/maps/kingdom/base/kingdom_base_09.png",
      x: 836,
      y: 836
    }

  ],


  // ==================================================
  // 素材シート
  // ==================================================

  objectSheets: {

    houses: {

      image:
        "images/maps/kingdom/objects/houses/kingdom_A_4x4_final.png",

      columns: 4,

      rows: 4

    },


    main: {

      image:
        "images/maps/kingdom/objects/main/kingdom_B_game_ready_3x3_v2.png",

      columns: 3,

      rows: 3

    },


    decorations: {

      image:
        "images/maps/kingdom/objects/decorations/kingdom_C_game_ready_3x3.png",

      columns: 3,

      rows: 3

    }

  },


  // ==================================================
  // 初期位置
  // ==================================================

  spawn: {

    x: 627,

    y: 1060,

    direction: "up"

  },


  // ==================================================
  // 外周移動範囲
  // ==================================================

  bounds: {

    left: 35,

    right: 1219,

    top: 30,

    bottom: 1225

  },


  // ==================================================
  // オブジェクト
  // ==================================================

  objects: [

    // ==================================================
    // 王城
    // ==================================================

    {
      id: "royal_castle",

      type: "image",

      image:
        "images/maps/kingdom/objects/main/royal_castle.PNG",

      x: 382,

      y: 18,

      width: 490,

      height: 385,

      z: 10
    },


    // ==================================================
    // 西側・居住区
    // ==================================================

    {
      id: "west_house_01",
      sheet: "houses",
      col: 0,
      row: 0,
      x: 42,
      y: 300,
      width: 215,
      height: 187
    },

    {
      id: "west_house_02",
      sheet: "houses",
      col: 1,
      row: 0,
      x: 165,
      y: 300,
      width: 215,
      height: 187
    },

    {
      id: "west_house_03",
      sheet: "houses",
      col: 2,
      row: 0,
      x: 288,
      y: 300,
      width: 215,
      height: 187
    },

    {
      id: "west_house_04",
      sheet: "houses",
      col: 3,
      row: 0,
      x: 42,
      y: 475,
      width: 220,
      height: 187
    },

    {
      id: "west_house_05",
      sheet: "houses",
      col: 0,
      row: 1,
      x: 165,
      y: 475,
      width: 209,
      height: 176
    },

    {
      id: "west_house_06",
      sheet: "houses",
      col: 1,
      row: 1,
      x: 285,
      y: 475,
      width: 242,
      height: 176
    },

    {
      id: "west_house_07",
      sheet: "houses",
      col: 2,
      row: 1,
      x: 55,
      y: 700,
      width: 165,
      height: 176
    },

    {
      id: "west_house_08",
      sheet: "houses",
      col: 3,
      row: 1,
      x: 175,
      y: 700,
      width: 165,
      height: 176
    },

    {
      id: "west_house_09",
      sheet: "houses",
      col: 0,
      row: 2,
      x: 295,
      y: 700,
      width: 160,
      height: 176
    },

    {
      id: "west_house_10",
      sheet: "houses",
      col: 1,
      row: 2,
      x: 105,
      y: 890,
      width: 215,
      height: 171
    },

    {
      id: "west_house_11",
      sheet: "houses",
      col: 2,
      row: 2,
      x: 245,
      y: 890,
      width: 215,
      height: 171
    },


    // ==================================================
    // 東側・商業区
    // ==================================================

    {
      id: "east_house_01",
      sheet: "houses",
      col: 3,
      row: 2,
      x: 748,
      y: 300,
      width: 242,
      height: 193
    },

    {
      id: "east_house_02",
      sheet: "houses",
      col: 0,
      row: 3,
      x: 880,
      y: 300,
      width: 237,
      height: 193
    },

    {
      id: "east_house_03",
      sheet: "houses",
      col: 1,
      row: 3,
      x: 1010,
      y: 300,
      width: 165,
      height: 187
    },

    {
      id: "east_house_04",
      sheet: "houses",
      col: 2,
      row: 3,
      x: 755,
      y: 485,
      width: 165,
      height: 187
    },

    {
      id: "east_house_05",
      sheet: "houses",
      col: 3,
      row: 3,
      x: 880,
      y: 485,
      width: 165,
      height: 187
    },

    {
      id: "east_house_06",
      sheet: "houses",
      col: 0,
      row: 0,
      x: 1005,
      y: 485,
      width: 165,
      height: 176
    },

    {
      id: "east_house_07",
      sheet: "houses",
      col: 1,
      row: 0,
      x: 755,
      y: 690,
      width: 165,
      height: 176
    },

    {
      id: "east_house_08",
      sheet: "houses",
      col: 2,
      row: 0,
      x: 880,
      y: 690,
      width: 165,
      height: 176
    },

    {
      id: "east_house_09",
      sheet: "houses",
      col: 3,
      row: 0,
      x: 1005,
      y: 690,
      width: 165,
      height: 187
    },

    {
      id: "east_house_10",
      sheet: "houses",
      col: 0,
      row: 1,
      x: 755,
      y: 880,
      width: 165,
      height: 187
    },

    {
      id: "east_house_11",
      sheet: "houses",
      col: 1,
      row: 1,
      x: 880,
      y: 880,
      width: 165,
      height: 187
    },

    {
      id: "east_house_12",
      sheet: "houses",
      col: 2,
      row: 1,
      x: 1005,
      y: 880,
      width: 165,
      height: 176
    },

    {
      id: "east_house_13",
      sheet: "houses",
      col: 3,
      row: 1,
      x: 830,
      y: 1010,
      width: 165,
      height: 176
    },

    {
      id: "east_house_14",
      sheet: "houses",
      col: 0,
      row: 2,
      x: 965,
      y: 1010,
      width: 165,
      height: 176
    },


    // ==================================================
    // 中央噴水
    //
    // ベースマップ中央の円形芝生上
    //
    // collision:
    // PNGの不透明ピクセルを利用。
    // 石像全体ではなく、
    // 台座周辺だけを判定対象にする。
    // ==================================================

    {
      id: "central_fountain",

      sheet: "main",

      col: 0,

      row: 0,

      x: 505,

      y: 414,

      size: 245,

      z: 12,

      collision: {

        type: "alpha",

        area: {

          left: 0.18,

          right: 1,

          top: 0.48,

          bottom: 0.82

        },

        alphaThreshold: 16

      }
    },


    // ==================================================
    // 北城壁
    // ==================================================

    {
      id: "north_wall_01",
      sheet: "main",
      col: 0,
      row: 1,
      x: -35,
      y: -155,
      size: 500,
      z: 8
    },

    {
      id: "north_wall_02",
      sheet: "main",
      col: 0,
      row: 1,
      x: 253,
      y: -155,
      size: 500,
      z: 8
    },

    {
      id: "north_wall_03",
      sheet: "main",
      col: 0,
      row: 1,
      x: 541,
      y: -155,
      size: 500,
      z: 8
    },

    {
      id: "north_wall_04",
      sheet: "main",
      col: 0,
      row: 1,
      x: 829,
      y: -155,
      size: 500,
      z: 8
    },


    // ==================================================
    // 西城壁
    // ==================================================

    {
      id: "west_wall_01",
      sheet: "main",
      col: 1,
      row: 1,
      x: -190,
      y: -55,
      size: 500,
      z: 10
    },

    {
      id: "west_wall_02",
      sheet: "main",
      col: 1,
      row: 1,
      x: -190,
      y: 233,
      size: 500,
      z: 10
    },

    {
      id: "west_wall_03",
      sheet: "main",
      col: 1,
      row: 1,
      x: -190,
      y: 521,
      size: 500,
      z: 10
    },

    {
      id: "west_wall_04",
      sheet: "main",
      col: 1,
      row: 1,
      x: -190,
      y: 809,
      size: 500,
      z: 10
    },


    // ==================================================
    // 東城壁
    // ==================================================

    {
      id: "east_wall_01",
      sheet: "main",
      col: 1,
      row: 1,
      x: 949,
      y: -55,
      size: 500,
      z: 10
    },

    {
      id: "east_wall_02",
      sheet: "main",
      col: 1,
      row: 1,
      x: 949,
      y: 233,
      size: 500,
      z: 10
    },

    {
      id: "east_wall_03",
      sheet: "main",
      col: 1,
      row: 1,
      x: 949,
      y: 521,
      size: 500,
      z: 10
    },

    {
      id: "east_wall_04",
      sheet: "main",
      col: 1,
      row: 1,
      x: 949,
      y: 809,
      size: 500,
      z: 10
    },


    // ==================================================
    // 四隅の円柱塔
    // ==================================================

    {
      id: "tower_nw",
      sheet: "main",
      col: 2,
      row: 1,
      x: -166,
      y: -120,
      size: 430,
      z: 9
    },

    {
      id: "tower_ne",
      sheet: "main",
      col: 2,
      row: 1,
      x: 991,
      y: -120,
      size: 430,
      z: 9
    },

    {
      id: "tower_sw",
      sheet: "main",
      col: 2,
      row: 1,
      x: -166,
      y: 884,
      size: 430,
      z: 9
    },

    {
      id: "tower_se",
      sheet: "main",
      col: 2,
      row: 1,
      x: 991,
      y: 884,
      size: 430,
      z: 9
    },


    // ==================================================
    // 南城壁
    // ==================================================

    {
      id: "south_wall_01",
      sheet: "main",
      col: 0,
      row: 1,
      x: -85,
      y: 935,
      size: 500,
      z: 8
    },

    {
      id: "south_wall_02",
      sheet: "main",
      col: 0,
      row: 1,
      x: 203,
      y: 935,
      size: 500,
      z: 8
    },

    {
      id: "south_wall_03",
      sheet: "main",
      col: 0,
      row: 1,
      x: 551,
      y: 935,
      size: 500,
      z: 8
    },

    {
      id: "south_wall_04",
      sheet: "main",
      col: 0,
      row: 1,
      x: 839,
      y: 935,
      size: 500,
      z: 8
    },


    // ==================================================
    // ことばの門
    // ==================================================

    {
      id: "kotoba_gate_sleeping",

      sheet: "main",

      col: 1,

      row: 0,

      x: 500,

      y: 765,

      size: 255,

      z: 12,

      visibleWhen: {

        flag: "kotobaGateRepaired",

        equals: false

      }
    },


    {
      id: "kotoba_gate_active",

      sheet: "main",

      col: 2,

      row: 0,

      x: 500,

      y: 765,

      size: 255,

      z: 12,

      visibleWhen: {

        flag: "kotobaGateRepaired",

        equals: true

      }
    },


    // ==================================================
    // 南門
    // ==================================================

    {
      id: "south_gate",

      sheet: "main",

      col: 0,

      row: 2,

      x: 377,

      y: 905,

      size: 500,

      z: 30
    },


    // ==================================================
    // 中央庭園
    // ==================================================

    // --------------------------------------------------
    // 木
    // --------------------------------------------------

    {
      id: "tree_nw",
      sheet: "decorations",
      col: 0,
      row: 0,
      x: 405,
      y: 410,
      width: 105,
      height: 135
    },

    {
      id: "tree_ne",
      sheet: "decorations",
      col: 0,
      row: 0,
      x: 735,
      y: 410,
      width: 105,
      height: 135
    },

    {
      id: "tree_sw",
      sheet: "decorations",
      col: 0,
      row: 0,
      x: 405,
      y: 655,
      width: 105,
      height: 135
    },

    {
      id: "tree_se",
      sheet: "decorations",
      col: 0,
      row: 0,
      x: 735,
      y: 655,
      width: 105,
      height: 135
    },


    // --------------------------------------------------
    // 街灯
    // --------------------------------------------------

    {
      id: "lamp_01",
      sheet: "decorations",
      col: 1,
      row: 0,
      x: 470,
      y: 435,
      width: 70,
      height: 115
    },

    {
      id: "lamp_02",
      sheet: "decorations",
      col: 1,
      row: 0,
      x: 715,
      y: 435,
      width: 70,
      height: 115
    },

    {
      id: "lamp_03",
      sheet: "decorations",
      col: 1,
      row: 0,
      x: 470,
      y: 690,
      width: 70,
      height: 115
    },

    {
      id: "lamp_04",
      sheet: "decorations",
      col: 1,
      row: 0,
      x: 715,
      y: 690,
      width: 70,
      height: 115
    },


    // --------------------------------------------------
    // 生垣
    // --------------------------------------------------

    {
      id: "hedge_nw",
      sheet: "decorations",
      col: 2,
      row: 0,
      x: 455,
      y: 460,
      width: 110,
      height: 58
    },

    {
      id: "hedge_ne",
      sheet: "decorations",
      col: 0,
      row: 1,
      x: 690,
      y: 460,
      width: 110,
      height: 58
    },

    {
      id: "hedge_sw",
      sheet: "decorations",
      col: 1,
      row: 1,
      x: 455,
      y: 685,
      width: 110,
      height: 58
    },

    {
      id: "hedge_se",
      sheet: "decorations",
      col: 2,
      row: 0,
      x: 690,
      y: 685,
      width: 110,
      height: 58
    },


    // --------------------------------------------------
    // ベンチ
    // --------------------------------------------------

    {
      id: "bench_left",
      sheet: "decorations",
      col: 2,
      row: 1,
      x: 470,
      y: 740,
      width: 105,
      height: 63
    },

    {
      id: "bench_right",
      sheet: "decorations",
      col: 2,
      row: 1,
      x: 680,
      y: 740,
      width: 105,
      height: 63
    },


    // --------------------------------------------------
    // 花
    // --------------------------------------------------

    {
      id: "flowers_01",
      sheet: "decorations",
      col: 0,
      row: 2,
      x: 455,
      y: 520,
      width: 70,
      height: 58
    },

    {
      id: "flowers_02",
      sheet: "decorations",
      col: 1,
      row: 2,
      x: 730,
      y: 520,
      width: 70,
      height: 58
    },

    {
      id: "flowers_03",
      sheet: "decorations",
      col: 2,
      row: 2,
      x: 455,
      y: 640,
      width: 70,
      height: 58
    },

    {
      id: "flowers_04",
      sheet: "decorations",
      col: 0,
      row: 2,
      x: 730,
      y: 640,
      width: 70,
      height: 58
    }

  ],


  // ==================================================
  // 当たり判定
  //
  // 中央噴水：
  // objects 側の alpha collision を使用。
  //
  // ここには噴水用の circle / rect は置かない。
  //
  // 現在この配列に残しているのは
  // 外周城壁のみ。
  // ==================================================

  collisions: [

    // ==================================================
    // 外周城壁
    // ==================================================

    {
      type: "rect",
      name: "west_wall",
      x1: 0,
      y1: 0,
      x2: 75,
      y2: 1254
    },

    {
      type: "rect",
      name: "east_wall",
      x1: 1179,
      y1: 0,
      x2: 1254,
      y2: 1254
    },

    {
      type: "rect",
      name: "north_wall",
      x1: 0,
      y1: 0,
      x2: 1254,
      y2: 80
    },


    // ==================================================
    // 南城壁
    // ==================================================

    {
      type: "rect",
      name: "south_wall_left",
      x1: 0,
      y1: 1165,
      x2: 555,
      y2: 1254
    },

    {
      type: "rect",
      name: "south_wall_right",
      x1: 700,
      y1: 1165,
      x2: 1254,
      y2: 1254
    }

  ],


  // ==================================================
  // 出口
  // ==================================================

  exits: [

    {

      id: "south_gate",

      name: "南門",

      direction: "down",

      x1: 565,

      x2: 690,

      y1: 1110,

      y2: 1254,

      targetMap: "forest",

      targetX: 63,

      targetY: 13,

      targetDirection: "down",

      message:
        "読みの森に入った！ ことばの気配がする……"

    }

  ],


  // ==================================================
  // イベント
  // ==================================================

  events: [],


  // ==================================================
  // 前景・オーバーレイ
  // ==================================================

  foregrounds: [],

  overlays: []

};


// ==================================================
// 外部公開
// ==================================================

window.MAP_KINGDOM =
  MAP_KINGDOM;
