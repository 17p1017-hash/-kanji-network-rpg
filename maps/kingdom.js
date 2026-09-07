// ==================================================
// maps/kingdom.js
// はじまりの王国
//
// 新方式:
// ・ベースマップ 9分割画像
// ・建物、城壁、木、噴水などは後から独立PNGで配置
//
// ベース画像:
// kingdom_base_01.png ～ kingdom_base_09.png
//
// 01 | 02 | 03
// 04 | 05 | 06
// 07 | 08 | 09
//
// 1枚 418 × 418px
// 全体 1254 × 1254px
//
// 現在の段階:
// ・まずベースマップだけ表示
// ・主人公がマップ上を歩けることを確認
// ・建造物、前景、イベント、当たり判定は後から追加
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
  // ベースマップ 9分割画像
  //
  // 保存場所:
  // images/maps/kingdom/base/
  // ==================================================

  tiles: [

    {
      id: "kingdom_base_01",
      image: "images/maps/kingdom/base/kingdom_base_01.png",
      x: 0,
      y: 0
    },

    {
      id: "kingdom_base_02",
      image: "images/maps/kingdom/base/kingdom_base_02.png",
      x: 418,
      y: 0
    },

    {
      id: "kingdom_base_03",
      image: "images/maps/kingdom/base/kingdom_base_03.png",
      x: 836,
      y: 0
    },

    {
      id: "kingdom_base_04",
      image: "images/maps/kingdom/base/kingdom_base_04.png",
      x: 0,
      y: 418
    },

    {
      id: "kingdom_base_05",
      image: "images/maps/kingdom/base/kingdom_base_05.png",
      x: 418,
      y: 418
    },

    {
      id: "kingdom_base_06",
      image: "images/maps/kingdom/base/kingdom_base_06.png",
      x: 836,
      y: 418
    },

    {
      id: "kingdom_base_07",
      image: "images/maps/kingdom/base/kingdom_base_07.png",
      x: 0,
      y: 836
    },

    {
      id: "kingdom_base_08",
      image: "images/maps/kingdom/base/kingdom_base_08.png",
      x: 418,
      y: 836
    },

    {
      id: "kingdom_base_09",
      image: "images/maps/kingdom/base/kingdom_base_09.png",
      x: 836,
      y: 836
    }

  ],


  // ==================================================
  // 初期位置
  // ==================================================

  spawn: {

    x: 610,

    y: 1060,

    direction: "up"

  },


  // ==================================================
  // 外周
  // ==================================================

  bounds: {

    left: 35,

    right: 1219,

    top: 30,

    bottom: 1225

  },


  // ==================================================
  // 現段階ではベース表示・歩行確認のみ
  // ==================================================

  exits: [],

  objects: [],

  foregrounds: [],

  overlays: [],

  events: [],

  collisions: []

};


// ==================================================
// 外部公開
// ==================================================

window.MAP_KINGDOM =
  MAP_KINGDOM;
