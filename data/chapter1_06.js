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

        // ⚔️ 見て選ぶ
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
            question: "ものを見るところを表す漢字はどれ？",
            answers: [
              "目",
              "耳",
              "口",
              "足"
            ],
            correct: "目"
          }

        ],

        // 🏹 組み立てる
        bow: [

          {
            type: "build",
            question: "「いちにちめ」と読むことばを、パーツを順番にえらんで作ろう。",
            parts: [
              "一",
              "日",
              "目"
            ],
            correct: "一日目"
          }

        ],

        // 🪄 意味・場面から考える
        staff: [

          {
            type: "meaning",
            question: "本を読むときに使う、顔にあるところは？",
            answers: [
              "目",
              "口",
              "耳",
              "手"
            ],
            correct: "目"
          },

          {
            type: "meaning",
            question: "遠くのものを見るときに使うところは？",
            answers: [
              "目",
              "耳",
              "口",
              "足"
            ],
            correct: "目"
          }

        ],

        // 🔨 書く
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
            question: "食べたり話したりするときに使うところを表す漢字はどれ？",
            answers: [
              "口",
              "目",
              "耳",
              "足"
            ],
            correct: "口"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「いりぐち」と読むことばを、パーツを順番にえらんで作ろう。",
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
            question: "ごはんを食べるときに使う、顔にあるところは？",
            answers: [
              "口",
              "目",
              "耳",
              "手"
            ],
            correct: "口"
          },

          {
            type: "meaning",
            question: "声を出して話すときに使うところは？",
            answers: [
              "口",
              "耳",
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
              "手"
            ],
            correct: "耳"
          },

          {
            type: "choice",
            question: "音を聞くところを表す漢字はどれ？",
            answers: [
              "耳",
              "目",
              "口",
              "足"
            ],
            correct: "耳"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「みみもと」と読むことばを、パーツを順番にえらんで作ろう。",
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
            question: "音楽を聞くときに使う、顔の横にあるところは？",
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
            question: "だれかの声を聞くときに使うところは？",
            answers: [
              "耳",
              "目",
              "口",
              "足"
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

      meaning: "ものを持ったり使ったりするところ",

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
              "目",
              "耳"
            ],
            correct: "手"
          },

          {
            type: "choice",
            question: "ものを持つときに使うところを表す漢字はどれ？",
            answers: [
              "手",
              "足",
              "口",
              "耳"
            ],
            correct: "手"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「みぎて」と読むことばを、パーツを順番にえらんで作ろう。",
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
            question: "えんぴつを持つときに使うところは？",
            answers: [
              "手",
              "足",
              "口",
              "耳"
            ],
            correct: "手"
          },

          {
            type: "meaning",
            question: "ボールをつかむときに使うところは？",
            answers: [
              "手",
              "足",
              "目",
              "口"
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
        "あし"
      ],

      meaning: "立ったり歩いたりするところ",

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
              "目",
              "口"
            ],
            correct: "足"
          },

          {
            type: "choice",
            question: "歩くときに使うところを表す漢字はどれ？",
            answers: [
              "足",
              "手",
              "耳",
              "口"
            ],
            correct: "足"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「あしもと」と読むことばを、パーツを順番にえらんで作ろう。",
            parts: [
              "足",
              "下"
            ],
            correct: "足下"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "走るときに使う、体の下のほうにあるところは？",
            answers: [
              "足",
              "手",
              "耳",
              "口"
            ],
            correct: "足"
          },

          {
            type: "meaning",
            question: "くつをはくところは？",
            answers: [
              "足",
              "手",
              "目",
              "耳"
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
