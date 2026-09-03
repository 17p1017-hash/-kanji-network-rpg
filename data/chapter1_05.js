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

      meaning: "人間・ひと",

      masteryGoal: 1,

      words: [
        "人",
        "二人",
        "友人"
      ],

      questions: {

        // ⚔️ 見て選ぶ
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
            question: "「ふたり」の「り」に使われる漢字はどれ？",
            answers: [
              "人",
              "子",
              "友",
              "女"
            ],
            correct: "人"
          }

        ],

        // 🏹 組み立てる
        bow: [

          {
            type: "build",
            question: "「ふたり」と読むことばを、パーツを順番にえらんで作ろう。",
            parts: [
              "二",
              "人"
            ],
            correct: "二人"
          }

        ],

        // 🪄 意味・場面から考える
        staff: [

          {
            type: "meaning",
            question: "学校や町にいる、わたしたちと同じ仲間を表す漢字は？",
            answers: [
              "人",
              "子",
              "友",
              "男"
            ],
            correct: "人"
          },

          {
            type: "meaning",
            question: "一人、二人、三人と人数を数えるときにつながる漢字は？",
            answers: [
              "人",
              "女",
              "子",
              "友"
            ],
            correct: "人"
          }

        ],

        // 🔨 書く
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

      meaning: "こども・子ども",

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
              "人",
              "女",
              "友"
            ],
            correct: "子"
          },

          {
            type: "choice",
            question: "こどもを表す漢字はどれ？",
            answers: [
              "子",
              "人",
              "男",
              "友"
            ],
            correct: "子"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「じょし」と読むことばを、パーツを順番にえらんで作ろう。",
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
            question: "大人ではなく、まだ小さいこどもを表す漢字は？",
            answers: [
              "子",
              "人",
              "女",
              "友"
            ],
            correct: "子"
          },

          {
            type: "meaning",
            question: "「男の子」「女の子」の最後につながる漢字は？",
            answers: [
              "子",
              "人",
              "男",
              "友"
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

      meaning: "おんなの人",

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
              "人",
              "子"
            ],
            correct: "女"
          },

          {
            type: "choice",
            question: "「じょ」と読むことがある漢字はどれ？",
            answers: [
              "女",
              "男",
              "友",
              "子"
            ],
            correct: "女"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「じょし」と読むことばを、パーツを順番にえらんで作ろう。",
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
            question: "男ではないほうを表す漢字は？",
            answers: [
              "女",
              "男",
              "人",
              "子"
            ],
            correct: "女"
          },

          {
            type: "meaning",
            question: "「女の子」ということばの最初につながる漢字は？",
            answers: [
              "女",
              "男",
              "友",
              "人"
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

      meaning: "おとこの人",

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
            question: "「だん」と読むことがある漢字はどれ？",
            answers: [
              "男",
              "女",
              "友",
              "人"
            ],
            correct: "男"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「だんし」と読むことばを、パーツを順番にえらんで作ろう。",
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
            question: "女ではないほうを表す漢字は？",
            answers: [
              "男",
              "女",
              "人",
              "子"
            ],
            correct: "男"
          },

          {
            type: "meaning",
            question: "「男の子」ということばの最初につながる漢字は？",
            answers: [
              "男",
              "女",
              "友",
              "人"
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
        "友人",
        "友だち"
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
            question: "なかのよい人とつながる漢字はどれ？",
            answers: [
              "友",
              "女",
              "子",
              "男"
            ],
            correct: "友"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「ゆうじん」と読むことばを、パーツを順番にえらんで作ろう。",
            parts: [
              "友",
              "人"
            ],
            correct: "友人"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "休み時間にいっしょに遊ぶ、なかのよい人とつながる漢字は？",
            answers: [
              "友",
              "人",
              "男",
              "子"
            ],
            correct: "友"
          },

          {
            type: "meaning",
            question: "いっしょに話したり、遊んだりする大切な仲間を表す漢字は？",
            answers: [
              "友",
              "女",
              "男",
              "子"
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
