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
// ・建造物に当たり判定
// ・花は通行可能
// ・南門のみ読みの森へ接続
//
// 城壁：
// ・城壁と四隅の塔は主人公より手前
// ・北西 / 北東の塔を北城壁の端へ合わせる
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

      x: 452,

      y: 35,

      width: 350,

      height: 275,

      z: 10
    },


    // ==================================================
    // 西住宅街
    // ==================================================

    {
      id: "west_house_01",
      sheet: "houses",
      col: 0,
      row: 0,
      x: 105,
      y: 320,
      width: 145,
      height: 125
    },

    {
      id: "west_house_02",
      sheet: "houses",
      col: 1,
      row: 0,
      x: 270,
      y: 320,
      width: 145,
      height: 125
    },

    {
      id: "west_house_03",
      sheet: "houses",
      col: 2,
      row: 0,
      x: 100,
      y: 475,
      width: 145,
      height: 125
    },

    {
      id: "west_house_04",
      sheet: "houses",
      col: 3,
      row: 0,
      x: 265,
      y: 475,
      width: 150,
      height: 125
    },

    {
      id: "west_house_05",
      sheet: "houses",
      col: 0,
      row: 1,
      x: 100,
      y: 625,
      width: 140,
      height: 120
    },

    {
      id: "west_house_06",
      sheet: "houses",
      col: 1,
      row: 1,
      x: 250,
      y: 625,
      width: 165,
      height: 120
    },

    {
      id: "west_house_07",
      sheet: "houses",
      col: 2,
      row: 1,
      x: 95,
      y: 770,
      width: 110,
      height: 120
    },

    {
      id: "west_house_08",
      sheet: "houses",
      col: 3,
      row: 1,
      x: 210,
      y: 770,
      width: 110,
      height: 120
    },

    {
      id: "west_house_09",
      sheet: "houses",
      col: 0,
      row: 2,
      x: 325,
      y: 770,
      width: 105,
      height: 120
    },

    {
      id: "west_house_10",
      sheet: "houses",
      col: 1,
      row: 2,
      x: 105,
      y: 925,
      width: 145,
      height: 115
    },

    {
      id: "west_house_11",
      sheet: "houses",
      col: 2,
      row: 2,
      x: 270,
      y: 925,
      width: 145,
      height: 115
    },


    // ==================================================
    // 東商店街
    // ==================================================

    {
      id: "east_house_01",
      sheet: "houses",
      col: 3,
      row: 2,
      x: 820,
      y: 315,
      width: 165,
      height: 130
    },

    {
      id: "east_house_02",
      sheet: "houses",
      col: 0,
      row: 3,
      x: 1000,
      y: 315,
      width: 160,
      height: 130
    },

    {
      id: "east_house_03",
      sheet: "houses",
      col: 1,
      row: 3,
      x: 820,
      y: 470,
      width: 110,
      height: 125
    },

    {
      id: "east_house_04",
      sheet: "houses",
      col: 2,
      row: 3,
      x: 940,
      y: 470,
      width: 110,
      height: 125
    },

    {
      id: "east_house_05",
      sheet: "houses",
      col: 3,
      row: 3,
      x: 1060,
      y: 470,
      width: 110,
      height: 125
    },

    {
      id: "east_house_06",
      sheet: "houses",
      col: 0,
      row: 0,
      x: 820,
      y: 615,
      width: 110,
      height: 120
    },

    {
      id: "east_house_07",
      sheet: "houses",
      col: 1,
      row: 0,
      x: 940,
      y: 615,
      width: 110,
      height: 120
    },

    {
      id: "east_house_08",
      sheet: "houses",
      col: 2,
      row: 0,
      x: 1060,
      y: 615,
      width: 110,
      height: 120
    },

    {
      id: "east_house_09",
      sheet: "houses",
      col: 3,
      row: 0,
      x: 820,
      y: 760,
      width: 110,
      height: 125
    },

    {
      id: "east_house_10",
      sheet: "houses",
      col: 0,
      row: 1,
      x: 940,
      y: 760,
      width: 110,
      height: 125
    },

    {
      id: "east_house_11",
      sheet: "houses",
      col: 1,
      row: 1,
      x: 1060,
      y: 760,
      width: 110,
      height: 125
    },

    {
      id: "east_house_12",
      sheet: "houses",
      col: 2,
      row: 1,
      x: 820,
      y: 915,
      width: 110,
      height: 120
    },

    {
      id: "east_house_13",
      sheet: "houses",
      col: 3,
      row: 1,
      x: 940,
      y: 915,
      width: 110,
      height: 120
    },

    {
      id: "east_house_14",
      sheet: "houses",
      col: 0,
      row: 2,
      x: 1060,
      y: 915,
      width: 110,
      height: 120
    },


    // ==================================================
    // 中央噴水
    // ==================================================

    {
      id: "central_fountain",

      sheet: "main",

      col: 0,

      row: 0,

      x: 557,

      y: 465,

      width: 140,

      height: 140,

      z: 12
    },


    // ==================================================
    // ことばの門
    // ==================================================

    {
      id: "kotoba_gate_sleeping",

      sheet: "main",

      col: 1,

      row: 0,

      x: 507,

      y: 865,

      width: 240,

      height: 190,

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

      x: 507,

      y: 865,

      width: 240,

      height: 190,

      z: 12,

      visibleWhen: {

        flag: "kotobaGateRepaired",

        equals: true

      }
    },


    // ==================================================
    // 北城壁
    //
    // 主人公 z-index:20 より手前へ
    // ==================================================

    {
      id: "north_wall_01",
      sheet: "main",
      col: 0,
      row: 1,
      x: -35,
      y: -155,
      size: 500,
      z: 25
    },

    {
      id: "north_wall_02",
      sheet: "main",
      col: 0,
      row: 1,
      x: 253,
      y: -155,
      size: 500,
      z: 25
    },

    {
      id: "north_wall_03",
      sheet: "main",
      col: 0,
      row: 1,
      x: 541,
      y: -155,
      size: 500,
      z: 25
    },

    {
      id: "north_wall_04",
      sheet: "main",
      col: 0,
      row: 1,
      x: 829,
      y: -155,
      size: 500,
      z: 25
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
      z: 25
    },

    {
      id: "west_wall_02",
      sheet: "main",
      col: 1,
      row: 1,
      x: -190,
      y: 233,
      size: 500,
      z: 25
    },

    {
      id: "west_wall_03",
      sheet: "main",
      col: 1,
      row: 1,
      x: -190,
      y: 521,
      size: 500,
      z: 25
    },

    {
      id: "west_wall_04",
      sheet: "main",
      col: 1,
      row: 1,
      x: -190,
      y: 809,
      size: 500,
      z: 25
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
      z: 25
    },

    {
      id: "east_wall_02",
      sheet: "main",
      col: 1,
      row: 1,
      x: 949,
      y: 233,
      size: 500,
      z: 25
    },

    {
      id: "east_wall_03",
      sheet: "main",
      col: 1,
      row: 1,
      x: 949,
      y: 521,
      size: 500,
      z: 25
    },

    {
      id: "east_wall_04",
      sheet: "main",
      col: 1,
      row: 1,
      x: 949,
      y: 809,
      size: 500,
      z: 25
    },


    // ==================================================
    // 四隅の塔
    //
    // 北西・北東を北城壁の端へ合わせて修正。
    // 塔は壁よりさらに前。
    // ==================================================

     // ==================================================
    // 四隅の塔
    //
    // B col2 / row1
    //
    // 北西・北東：
    // ・北城壁の角に合わせてさらに上へ移動
    // ・西/東の縦城壁より奥へ描画
    //
    // 南西・南東：
    // ・手前側なので従来どおり
    // ==================================================

    {
      id: "tower_nw",

      sheet: "main",

      col: 2,

      row: 1,

      x: -166,

      // 北側へ大きく引き上げる
      y: -215,

      size: 430,

      // 縦城壁 z:8 より奥
      z: 6
    },

    {
      id: "tower_ne",

      sheet: "main",

      col: 2,

      row: 1,

      x: 991,

      // 北側へ大きく引き上げる
      y: -215,

      size: 430,

      // 縦城壁 z:8 より奥
      z: 6
    },

    {
      id: "tower_sw",

      sheet: "main",

      col: 2,

      row: 1,

      x: -166,

      y: 914,

      size: 430,

      // 南側は主人公より手前
      z: 10
    },

    {
      id: "tower_se",

      sheet: "main",

      col: 2,

      row: 1,

      x: 991,

      y: 914,

      size: 430,

      // 南側は主人公より手前
      z: 10
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
      z: 25
    },

    {
      id: "south_wall_02",
      sheet: "main",
      col: 0,
      row: 1,
      x: 203,
      y: 935,
      size: 500,
      z: 25
    },

    {
      id: "south_wall_03",
      sheet: "main",
      col: 0,
      row: 1,
      x: 551,
      y: 935,
      size: 500,
      z: 25
    },

    {
      id: "south_wall_04",
      sheet: "main",
      col: 0,
      row: 1,
      x: 839,
      y: 935,
      size: 500,
      z: 25
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
    // 中央庭園・装飾
    // ==================================================

    {
      id: "tree_nw",
      sheet: "decorations",
      col: 0,
      row: 0,
      x: 470,
      y: 355,
      width: 70,
      height: 90
    },

    {
      id: "tree_ne",
      sheet: "decorations",
      col: 0,
      row: 0,
      x: 715,
      y: 355,
      width: 70,
      height: 90
    },

    {
      id: "tree_sw",
      sheet: "decorations",
      col: 0,
      row: 0,
      x: 470,
      y: 610,
      width: 70,
      height: 90
    },

    {
      id: "tree_se",
      sheet: "decorations",
      col: 0,
      row: 0,
      x: 715,
      y: 610,
      width: 70,
      height: 90
    },


    // --------------------------------------------------
    // 街灯
    // --------------------------------------------------

    {
      id: "lamp_01",
      sheet: "decorations",
      col: 1,
      row: 0,
      x: 430,
      y: 470,
      width: 45,
      height: 70
    },

    {
      id: "lamp_02",
      sheet: "decorations",
      col: 1,
      row: 0,
      x: 780,
      y: 470,
      width: 45,
      height: 70
    },

    {
      id: "lamp_03",
      sheet: "decorations",
      col: 1,
      row: 0,
      x: 430,
      y: 720,
      width: 45,
      height: 70
    },

    {
      id: "lamp_04",
      sheet: "decorations",
      col: 1,
      row: 0,
      x: 780,
      y: 720,
      width: 45,
      height: 70
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
      y: 400,
      width: 95,
      height: 50
    },

    {
      id: "hedge_ne",
      sheet: "decorations",
      col: 0,
      row: 1,
      x: 705,
      y: 400,
      width: 95,
      height: 50
    },

    {
      id: "hedge_sw",
      sheet: "decorations",
      col: 1,
      row: 1,
      x: 455,
      y: 655,
      width: 95,
      height: 50
    },

    {
      id: "hedge_se",
      sheet: "decorations",
      col: 2,
      row: 0,
      x: 705,
      y: 655,
      width: 95,
      height: 50
    },


    // --------------------------------------------------
    // ベンチ
    // --------------------------------------------------

    {
      id: "bench_left",
      sheet: "decorations",
      col: 2,
      row: 1,
      x: 485,
      y: 755,
      width: 75,
      height: 45
    },

    {
      id: "bench_right",
      sheet: "decorations",
      col: 2,
      row: 1,
      x: 695,
      y: 755,
      width: 75,
      height: 45
    },


    // --------------------------------------------------
    // 花
    // --------------------------------------------------

    {
      id: "flowers_01",
      sheet: "decorations",
      col: 0,
      row: 2,
      x: 480,
      y: 430,
      width: 55,
      height: 45
    },

    {
      id: "flowers_02",
      sheet: "decorations",
      col: 1,
      row: 2,
      x: 720,
      y: 430,
      width: 55,
      height: 45
    },

    {
      id: "flowers_03",
      sheet: "decorations",
      col: 2,
      row: 2,
      x: 480,
      y: 680,
      width: 55,
      height: 45
    },

    {
      id: "flowers_04",
      sheet: "decorations",
      col: 0,
      row: 2,
      x: 720,
      y: 680,
      width: 55,
      height: 45
    }

  ],


  // ==================================================
  // 当たり判定
  // ==================================================

  collisions: [

    // ==================================================
    // 王城
    // ==================================================

    {
      type: "rect",
      name: "royal_castle",
      x1: 480,
      y1: 145,
      x2: 775,
      y2: 295
    },


    // ==================================================
    // 西住宅街
    // ==================================================

    {
      type: "rect",
      name: "west_house_01",
      x1: 110,
      y1: 365,
      x2: 245,
      y2: 445
    },

    {
      type: "rect",
      name: "west_house_02",
      x1: 275,
      y1: 365,
      x2: 410,
      y2: 445
    },

    {
      type: "rect",
      name: "west_house_03",
      x1: 105,
      y1: 520,
      x2: 240,
      y2: 600
    },

    {
      type: "rect",
      name: "west_house_04",
      x1: 270,
      y1: 520,
      x2: 410,
      y2: 600
    },

    {
      type: "rect",
      name: "west_house_05",
      x1: 105,
      y1: 665,
      x2: 235,
      y2: 745
    },

    {
      type: "rect",
      name: "west_house_06",
      x1: 255,
      y1: 665,
      x2: 410,
      y2: 745
    },

    {
      type: "rect",
      name: "west_house_07",
      x1: 100,
      y1: 810,
      x2: 200,
      y2: 890
    },

    {
      type: "rect",
      name: "west_house_08",
      x1: 215,
      y1: 810,
      x2: 315,
      y2: 890
    },

    {
      type: "rect",
      name: "west_house_09",
      x1: 330,
      y1: 810,
      x2: 425,
      y2: 890
    },

    {
      type: "rect",
      name: "west_house_10",
      x1: 110,
      y1: 965,
      x2: 245,
      y2: 1035
    },

    {
      type: "rect",
      name: "west_house_11",
      x1: 275,
      y1: 965,
      x2: 410,
      y2: 1035
    },


    // ==================================================
    // 東商店街
    // ==================================================

    {
      type: "rect",
      name: "east_house_01",
      x1: 825,
      y1: 365,
      x2: 980,
      y2: 445
    },

    {
      type: "rect",
      name: "east_house_02",
      x1: 1005,
      y1: 365,
      x2: 1155,
      y2: 445
    },

    {
      type: "rect",
      name: "east_house_03",
      x1: 825,
      y1: 515,
      x2: 925,
      y2: 595
    },

    {
      type: "rect",
      name: "east_house_04",
      x1: 945,
      y1: 515,
      x2: 1050,
      y2: 595
    },

    {
      type: "rect",
      name: "east_house_05",
      x1: 1065,
      y1: 515,
      x2: 1165,
      y2: 595
    },

    {
      type: "rect",
      name: "east_house_06",
      x1: 825,
      y1: 655,
      x2: 925,
      y2: 735
    },

    {
      type: "rect",
      name: "east_house_07",
      x1: 945,
      y1: 655,
      x2: 1050,
      y2: 735
    },

    {
      type: "rect",
      name: "east_house_08",
      x1: 1065,
      y1: 655,
      x2: 1165,
      y2: 735
    },

    {
      type: "rect",
      name: "east_house_09",
      x1: 825,
      y1: 805,
      x2: 925,
      y2: 885
    },

    {
      type: "rect",
      name: "east_house_10",
      x1: 945,
      y1: 805,
      x2: 1050,
      y2: 885
    },

    {
      type: "rect",
      name: "east_house_11",
      x1: 1065,
      y1: 805,
      x2: 1165,
      y2: 885
    },

    {
      type: "rect",
      name: "east_house_12",
      x1: 825,
      y1: 955,
      x2: 925,
      y2: 1035
    },

    {
      type: "rect",
      name: "east_house_13",
      x1: 945,
      y1: 955,
      x2: 1050,
      y2: 1035
    },

    {
      type: "rect",
      name: "east_house_14",
      x1: 1065,
      y1: 955,
      x2: 1165,
      y2: 1035
    },


    // ==================================================
    // 噴水
    // ==================================================

    {
      type: "circle",
      name: "central_fountain",
      x: 627,
      y: 535,
      r: 62
    },


    // ==================================================
    // ことばの門
    // ==================================================

    {
      type: "rect",
      name: "kotoba_gate",
      x1: 525,
      y1: 930,
      x2: 730,
      y2: 1045
    },


    // ==================================================
    // 木
    // ==================================================

    {
      type: "circle",
      name: "tree_nw",
      x: 505,
      y: 425,
      r: 25
    },

    {
      type: "circle",
      name: "tree_ne",
      x: 750,
      y: 425,
      r: 25
    },

    {
      type: "circle",
      name: "tree_sw",
      x: 505,
      y: 680,
      r: 25
    },

    {
      type: "circle",
      name: "tree_se",
      x: 750,
      y: 680,
      r: 25
    },


    // ==================================================
    // 生垣
    // ==================================================

    {
      type: "rect",
      name: "hedge_nw",
      x1: 460,
      y1: 420,
      x2: 545,
      y2: 448
    },

    {
      type: "rect",
      name: "hedge_ne",
      x1: 710,
      y1: 420,
      x2: 795,
      y2: 448
    },

    {
      type: "rect",
      name: "hedge_sw",
      x1: 460,
      y1: 675,
      x2: 545,
      y2: 703
    },

    {
      type: "rect",
      name: "hedge_se",
      x1: 710,
      y1: 675,
      x2: 795,
      y2: 703
    },


    // ==================================================
    // ベンチ
    // ==================================================

    {
      type: "rect",
      name: "bench_left",
      x1: 490,
      y1: 775,
      x2: 555,
      y2: 795
    },

    {
      type: "rect",
      name: "bench_right",
      x1: 700,
      y1: 775,
      x2: 765,
      y2: 795
    },


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
