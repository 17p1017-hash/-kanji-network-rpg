// ==================================================
// 第1章 04
// 小学1年生漢字
// 一・二・三・四・五
// ==================================================

const CHAPTER1_04 = {

  id: "chapter1_04",

  title: "第1章 かずのことば",

  grade: 1,

  defaultMasteryGoal: 1,

  kanji: {


    // ==================================================
    // 一
    // ==================================================

    "一": {

      id: "ichi",

      kanji: "一",

      readings: [
        "いち",
        "ひと"
      ],

      meaning: "数の1",

      masteryGoal: 1,

      words: [
        "一",
        "一日",
        "一本"
      ],

      questions: {

        // ⚔️ 見て選ぶ
        sword: [

          {
            type: "choice",
            question: "「いち」と読む漢字はどれ？",
            answers: [
              "一",
              "二",
              "三",
              "五"
            ],
            correct: "一"
          },

          {
            type: "choice",
            question: "数の「1」を表す漢字はどれ？",
            answers: [
              "一",
              "二",
              "四",
              "五"
            ],
            correct: "一"
          }

        ],

        // 🏹 組み立てる
        bow: [

          {
            type: "build",
            question: "「いっぽん」と読むことばを、パーツを順番にえらんで作ろう。",
            parts: [
              "一",
              "本"
            ],
            correct: "一本"
          }

        ],

        // 🪄 意味・場面から考える
        staff: [

          {
            type: "meaning",
            question: "りんごが1こあります。いくつある？",
            answers: [
              "一",
              "二",
              "三",
              "五"
            ],
            correct: "一"
          },

          {
            type: "meaning",
            question: "えんぴつを1本だけ持っています。数を表す漢字は？",
            answers: [
              "一",
              "二",
              "四",
              "五"
            ],
            correct: "一"
          }

        ],

        // 🔨 書く
        hammer: [

          {
            type: "writing",
            question: "「いち」を漢字で書いてみよう。",
            target: "一"
          }

        ]

      }

    },


    // ==================================================
    // 二
    // ==================================================

    "二": {

      id: "ni",

      kanji: "二",

      readings: [
        "に",
        "ふた"
      ],

      meaning: "数の2",

      masteryGoal: 1,

      words: [
        "二",
        "二日",
        "二人"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「に」と読む漢字はどれ？",
            answers: [
              "二",
              "一",
              "三",
              "四"
            ],
            correct: "二"
          },

          {
            type: "choice",
            question: "数の「2」を表す漢字はどれ？",
            answers: [
              "二",
              "一",
              "四",
              "五"
            ],
            correct: "二"
          }

        ],

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

        staff: [

          {
            type: "meaning",
            question: "ねこが2ひきいます。いくついる？",
            answers: [
              "二",
              "一",
              "三",
              "五"
            ],
            correct: "二"
          },

          {
            type: "meaning",
            question: "ふたりでいっしょに遊びます。人数を表す漢字は？",
            answers: [
              "二",
              "一",
              "四",
              "五"
            ],
            correct: "二"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「に」を漢字で書いてみよう。",
            target: "二"
          }

        ]

      }

    },


    // ==================================================
    // 三
    // ==================================================

    "三": {

      id: "san",

      kanji: "三",

      readings: [
        "さん",
        "み"
      ],

      meaning: "数の3",

      masteryGoal: 1,

      words: [
        "三",
        "三人",
        "三日"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「さん」と読む漢字はどれ？",
            answers: [
              "三",
              "一",
              "二",
              "五"
            ],
            correct: "三"
          },

          {
            type: "choice",
            question: "数の「3」を表す漢字はどれ？",
            answers: [
              "三",
              "一",
              "四",
              "五"
            ],
            correct: "三"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「さんにん」と読むことばを、パーツを順番にえらんで作ろう。",
            parts: [
              "三",
              "人"
            ],
            correct: "三人"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "ボールが3こあります。いくつある？",
            answers: [
              "三",
              "一",
              "二",
              "五"
            ],
            correct: "三"
          },

          {
            type: "meaning",
            question: "三人でならんでいます。人数を表す漢字は？",
            answers: [
              "三",
              "二",
              "四",
              "五"
            ],
            correct: "三"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「さん」を漢字で書いてみよう。",
            target: "三"
          }

        ]

      }

    },


    // ==================================================
    // 四
    // ==================================================

    "四": {

      id: "yon",

      kanji: "四",

      readings: [
        "し",
        "よん",
        "よ"
      ],

      meaning: "数の4",

      masteryGoal: 1,

      words: [
        "四",
        "四人",
        "四日"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「よん」と読む漢字はどれ？",
            answers: [
              "四",
              "一",
              "三",
              "五"
            ],
            correct: "四"
          },

          {
            type: "choice",
            question: "数の「4」を表す漢字はどれ？",
            answers: [
              "四",
              "二",
              "三",
              "五"
            ],
            correct: "四"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「よにん」と読むことばを、パーツを順番にえらんで作ろう。",
            parts: [
              "四",
              "人"
            ],
            correct: "四人"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "いすが4こならんでいます。いくつある？",
            answers: [
              "四",
              "一",
              "三",
              "五"
            ],
            correct: "四"
          },

          {
            type: "meaning",
            question: "4人でチームを作りました。人数を表す漢字は？",
            answers: [
              "四",
              "二",
              "三",
              "五"
            ],
            correct: "四"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「よん」を漢字で書いてみよう。",
            target: "四"
          }

        ]

      }

    },


    // ==================================================
    // 五
    // ==================================================

    "五": {

      id: "go",

      kanji: "五",

      readings: [
        "ご",
        "いつ"
      ],

      meaning: "数の5",

      masteryGoal: 1,

      words: [
        "五",
        "五人",
        "五月"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「ご」と読む漢字はどれ？",
            answers: [
              "五",
              "一",
              "二",
              "四"
            ],
            correct: "五"
          },

          {
            type: "choice",
            question: "数の「5」を表す漢字はどれ？",
            answers: [
              "五",
              "二",
              "三",
              "四"
            ],
            correct: "五"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「ごにん」と読むことばを、パーツを順番にえらんで作ろう。",
            parts: [
              "五",
              "人"
            ],
            correct: "五人"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "星が5こ見えます。いくつある？",
            answers: [
              "五",
              "一",
              "三",
              "四"
            ],
            correct: "五"
          },

          {
            type: "meaning",
            question: "5人でいっしょに歩いています。人数を表す漢字は？",
            answers: [
              "五",
              "二",
              "三",
              "四"
            ],
            correct: "五"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「ご」を漢字で書いてみよう。",
            target: "五"
          }

        ]

      }

    }

  }

};
