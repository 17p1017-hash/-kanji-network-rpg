// ==================================================
// 第1章 06
// 小学1年生漢字
// 目・口・耳・手・足
// ==================================================

const CHAPTER1_06 = {

  id: "chapter1_06",

  title: "第1章 からだのことば",

  grade: 1,

  defaultMasteryGoal: 1,

  kanji: {


    // ==================================================
    // 目
    // ==================================================

    "目": {

      id: "me",

      kanji: "目",

      readings: [
        "もく",
        "め"
      ],

      meaning: "ものを見るところ",

      masteryGoal: 1,

      words: [
        "目",
        "一日目",
        "目上"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「め」と読む漢字はどれ？",
            answers: [
              "目",
              "口",
              "耳",
              "手"
            ],
            correct: "目"
          },

          {
            type: "choice",
            question: "ものを見るときに使う体の部分はどれ？",
            answers: [
              "目",
              "耳",
              "口",
              "足"
            ],
            correct: "目"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「一日目」を作ろう。",
            parts: [
              "一日",
              "目"
            ],
            correct: "一日目"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "本の文字を見るときに使う体の部分は？",
            answers: [
              "目",
              "耳",
              "口",
              "手"
            ],
            correct: "目"
          },

          {
            type: "meaning",
            question: "遠くの山を見ました。どこを使って見た？",
            answers: [
              "目",
              "口",
              "足",
              "耳"
            ],
            correct: "目"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「め」を漢字で書いてみよう。",
            target: "目"
          }

        ]

      }

    },


    // ==================================================
    // 口
    // ==================================================

    "口": {

      id: "kuchi",

      kanji: "口",

      readings: [
        "こう",
        "く",
        "くち"
      ],

      meaning: "食べたり話したりするところ",

      masteryGoal: 1,

      words: [
        "口",
        "入口",
        "出口"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「くち」と読む漢字はどれ？",
            answers: [
              "口",
              "目",
              "耳",
              "手"
            ],
            correct: "口"
          },

          {
            type: "choice",
            question: "「入口」「出口」に使われている漢字はどれ？",
            answers: [
              "口",
              "目",
              "足",
              "耳"
            ],
            correct: "口"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「入口」を作ろう。",
            parts: [
              "入",
              "口"
            ],
            correct: "入口"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "ごはんを食べるときに使う体の部分は？",
            answers: [
              "口",
              "耳",
              "目",
              "足"
            ],
            correct: "口"
          },

          {
            type: "meaning",
            question: "声を出して話すときに使うところは？",
            answers: [
              "口",
              "手",
              "目",
              "足"
            ],
            correct: "口"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「くち」を漢字で書いてみよう。",
            target: "口"
          }

        ]

      }

    },


    // ==================================================
    // 耳
    // ==================================================

    "耳": {

      id: "mimi",

      kanji: "耳",

      readings: [
        "じ",
        "みみ"
      ],

      meaning: "音を聞くところ",

      masteryGoal: 1,

      words: [
        "耳",
        "耳もと",
        "耳かき"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「みみ」と読む漢字はどれ？",
            answers: [
              "耳",
              "目",
              "口",
              "足"
            ],
            correct: "耳"
          },

          {
            type: "choice",
            question: "音を聞くときに使う体の部分はどれ？",
            answers: [
              "耳",
              "目",
              "手",
              "口"
            ],
            correct: "耳"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「耳もと」を作ろう。",
            parts: [
              "耳",
              "もと"
            ],
            correct: "耳もと"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "先生の話を聞くときに使う体の部分は？",
            answers: [
              "耳",
              "目",
              "口",
              "手"
            ],
            correct: "耳"
          },

          {
            type: "meaning",
            question: "鳥の鳴き声が聞こえました。どこで音を感じる？",
            answers: [
              "耳",
              "足",
              "目",
              "口"
            ],
            correct: "耳"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「みみ」を漢字で書いてみよう。",
            target: "耳"
          }

        ]

      }

    },


    // ==================================================
    // 手
    // ==================================================

    "手": {

      id: "te",

      kanji: "手",

      readings: [
        "しゅ",
        "て"
      ],

      meaning: "ものを持ったり使ったりする体の部分",

      masteryGoal: 1,

      words: [
        "手",
        "右手",
        "左手"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「て」と読む漢字はどれ？",
            answers: [
              "手",
              "足",
              "口",
              "目"
            ],
            correct: "手"
          },

          {
            type: "choice",
            question: "「右手」「左手」の最後の漢字はどれ？",
            answers: [
              "手",
              "足",
              "耳",
              "口"
            ],
            correct: "手"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「右手」を作ろう。",
            parts: [
              "右",
              "手"
            ],
            correct: "右手"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "えんぴつを持って字を書くときに使う体の部分は？",
            answers: [
              "手",
              "足",
              "耳",
              "口"
            ],
            correct: "手"
          },

          {
            type: "meaning",
            question: "ボールをつかむときに使うところは？",
            answers: [
              "手",
              "目",
              "耳",
              "足"
            ],
            correct: "手"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「て」を漢字で書いてみよう。",
            target: "手"
          }

        ]

      }

    },


    // ==================================================
    // 足
    // ==================================================

    "足": {

      id: "ashi",

      kanji: "足",

      readings: [
        "そく",
        "あし",
        "た"
      ],

      meaning: "立ったり歩いたりするときに使う体の部分",

      masteryGoal: 1,

      words: [
        "足",
        "足音",
        "足下"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「あし」と読む漢字はどれ？",
            answers: [
              "足",
              "手",
              "耳",
              "口"
            ],
            correct: "足"
          },

          {
            type: "choice",
            question: "歩くときに使う体の部分はどれ？",
            answers: [
              "足",
              "手",
              "目",
              "耳"
            ],
            correct: "足"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「足音」を作ろう。",
            parts: [
              "足",
              "音"
            ],
            correct: "足音"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "学校まで歩いて行きました。歩くときに使う体の部分は？",
            answers: [
              "足",
              "手",
              "耳",
              "目"
            ],
            correct: "足"
          },

          {
            type: "meaning",
            question: "走ったりジャンプしたりするときによく使うところは？",
            answers: [
              "足",
              "口",
              "耳",
              "手"
            ],
            correct: "足"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「あし」を漢字で書いてみよう。",
            target: "足"
          }

        ]

      }

    }

  }

};
