// ==================================================
// 第1章 05
// 小学1年生漢字
// 人・子・女・男・友
// ==================================================

const CHAPTER1_05 = {

  id: "chapter1_05",

  title: "第1章 ひとのことば",

  grade: 1,

  defaultMasteryGoal: 1,

  kanji: {


    // ==================================================
    // 人
    // ==================================================

    "人": {

      id: "hito",

      kanji: "人",

      readings: [
        "じん",
        "にん",
        "ひと"
      ],

      meaning: "ひと・人間",

      masteryGoal: 1,

      words: [
        "人",
        "一人",
        "二人"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「ひと」と読む漢字はどれ？",
            answers: [
              "人",
              "子",
              "女",
              "男"
            ],
            correct: "人"
          },

          {
            type: "choice",
            question: "「一人」「二人」に使われている漢字はどれ？",
            answers: [
              "人",
              "友",
              "子",
              "女"
            ],
            correct: "人"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「一人」を作ろう。",
            parts: [
              "一",
              "人"
            ],
            correct: "一人"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "教室に先生や子どもたちがいます。みんなまとめて何？",
            answers: [
              "人",
              "山",
              "木",
              "石"
            ],
            correct: "人"
          },

          {
            type: "meaning",
            question: "公園に一人の子が立っています。「一人」の最後の漢字は？",
            answers: [
              "人",
              "子",
              "友",
              "男"
            ],
            correct: "人"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「ひと」を漢字で書いてみよう。",
            target: "人"
          }

        ]

      }

    },


    // ==================================================
    // 子
    // ==================================================

    "子": {

      id: "ko",

      kanji: "子",

      readings: [
        "し",
        "こ"
      ],

      meaning: "こども",

      masteryGoal: 1,

      words: [
        "子",
        "子ども",
        "女子"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「こ」と読む漢字はどれ？",
            answers: [
              "子",
              "女",
              "男",
              "人"
            ],
            correct: "子"
          },

          {
            type: "choice",
            question: "「子ども」のはじめの漢字はどれ？",
            answers: [
              "子",
              "友",
              "人",
              "女"
            ],
            correct: "子"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「子ども」を作ろう。",
            parts: [
              "子",
              "ども"
            ],
            correct: "子ども"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "学校で勉強している小さなこどもを表す漢字は？",
            answers: [
              "子",
              "人",
              "友",
              "男"
            ],
            correct: "子"
          },

          {
            type: "meaning",
            question: "お父さんやお母さんから見た「こども」を表す漢字は？",
            answers: [
              "子",
              "女",
              "友",
              "人"
            ],
            correct: "子"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「こ」を漢字で書いてみよう。",
            target: "子"
          }

        ]

      }

    },


    // ==================================================
    // 女
    // ==================================================

    "女": {

      id: "onna",

      kanji: "女",

      readings: [
        "じょ",
        "おんな"
      ],

      meaning: "女性・おんなの人",

      masteryGoal: 1,

      words: [
        "女",
        "女子",
        "女の子"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「おんな」と読む漢字はどれ？",
            answers: [
              "女",
              "男",
              "子",
              "人"
            ],
            correct: "女"
          },

          {
            type: "choice",
            question: "「女子」のはじめの漢字はどれ？",
            answers: [
              "女",
              "子",
              "男",
              "友"
            ],
            correct: "女"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「女子」を作ろう。",
            parts: [
              "女",
              "子"
            ],
            correct: "女子"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "「おんなの人」を表す漢字はどれ？",
            answers: [
              "女",
              "男",
              "友",
              "子"
            ],
            correct: "女"
          },

          {
            type: "meaning",
            question: "「女の子」のはじめに使う漢字は？",
            answers: [
              "女",
              "子",
              "人",
              "友"
            ],
            correct: "女"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「おんな」を漢字で書いてみよう。",
            target: "女"
          }

        ]

      }

    },


    // ==================================================
    // 男
    // ==================================================

    "男": {

      id: "otoko",

      kanji: "男",

      readings: [
        "だん",
        "なん",
        "おとこ"
      ],

      meaning: "男性・おとこの人",

      masteryGoal: 1,

      words: [
        "男",
        "男子",
        "男の子"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「おとこ」と読む漢字はどれ？",
            answers: [
              "男",
              "女",
              "人",
              "子"
            ],
            correct: "男"
          },

          {
            type: "choice",
            question: "「男子」のはじめの漢字はどれ？",
            answers: [
              "男",
              "女",
              "子",
              "友"
            ],
            correct: "男"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「男子」を作ろう。",
            parts: [
              "男",
              "子"
            ],
            correct: "男子"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "「おとこの人」を表す漢字はどれ？",
            answers: [
              "男",
              "女",
              "友",
              "子"
            ],
            correct: "男"
          },

          {
            type: "meaning",
            question: "「男の子」のはじめに使う漢字は？",
            answers: [
              "男",
              "子",
              "人",
              "友"
            ],
            correct: "男"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「おとこ」を漢字で書いてみよう。",
            target: "男"
          }

        ]

      }

    },


    // ==================================================
    // 友
    // ==================================================

    "友": {

      id: "tomo",

      kanji: "友",

      readings: [
        "ゆう",
        "とも"
      ],

      meaning: "なかのよい人・ともだち",

      masteryGoal: 1,

      words: [
        "友",
        "友だち",
        "親友"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「とも」と読む漢字はどれ？",
            answers: [
              "友",
              "人",
              "子",
              "男"
            ],
            correct: "友"
          },

          {
            type: "choice",
            question: "「友だち」のはじめの漢字はどれ？",
            answers: [
              "友",
              "人",
              "女",
              "子"
            ],
            correct: "友"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「友だち」を作ろう。",
            parts: [
              "友",
              "だち"
            ],
            correct: "友だち"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "学校でいっしょに遊んだり話したりする、なかのよい人は？",
            answers: [
              "友",
              "山",
              "木",
              "石"
            ],
            correct: "友"
          },

          {
            type: "meaning",
            question: "「ともだち」の「とも」を漢字で表すとどれ？",
            answers: [
              "友",
              "人",
              "子",
              "女"
            ],
            correct: "友"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「とも」を漢字で書いてみよう。",
            target: "友"
          }

        ]

      }

    }

  }

};
