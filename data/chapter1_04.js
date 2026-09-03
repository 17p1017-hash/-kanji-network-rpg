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
        "一つ",
        "一日"
      ],

      questions: {

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

        bow: [

          {
            type: "build",
            question: "「一つ」を作ろう。",
            parts: [
              "一",
              "つ"
            ],
            correct: "一つ"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "りんごが1こあります。「1」を漢字で表すとどれ？",
            answers: [
              "一",
              "二",
              "三",
              "四"
            ],
            correct: "一"
          },

          {
            type: "meaning",
            question: "一番はじめの数を漢字で表すと？",
            answers: [
              "一",
              "二",
              "三",
              "五"
            ],
            correct: "一"
          }

        ],

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
        "二つ",
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
              "三",
              "四",
              "五"
            ],
            correct: "二"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「二つ」を作ろう。",
            parts: [
              "二",
              "つ"
            ],
            correct: "二つ"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "えんぴつが2本あります。「2」を漢字で表すとどれ？",
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
            question: "一の次にくる数を漢字で表すと？",
            answers: [
              "二",
              "三",
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
        "みっ"
      ],

      meaning: "数の3",

      masteryGoal: 1,

      words: [
        "三",
        "三つ",
        "三人"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「さん」と読む漢字はどれ？",
            answers: [
              "三",
              "二",
              "四",
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
              "二",
              "五"
            ],
            correct: "三"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「三つ」を作ろう。",
            parts: [
              "三",
              "つ"
            ],
            correct: "三つ"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "ボールが3こあります。「3」を漢字で表すとどれ？",
            answers: [
              "三",
              "一",
              "二",
              "四"
            ],
            correct: "三"
          },

          {
            type: "meaning",
            question: "一、二、その次の数を漢字で表すと？",
            answers: [
              "三",
              "四",
              "五",
              "二"
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
        "よっ"
      ],

      meaning: "数の4",

      masteryGoal: 1,

      words: [
        "四",
        "四つ",
        "四人"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「よん」と読む漢字はどれ？",
            answers: [
              "四",
              "三",
              "五",
              "二"
            ],
            correct: "四"
          },

          {
            type: "choice",
            question: "数の「4」を表す漢字はどれ？",
            answers: [
              "四",
              "一",
              "三",
              "五"
            ],
            correct: "四"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「四つ」を作ろう。",
            parts: [
              "四",
              "つ"
            ],
            correct: "四つ"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "いすが4きゃくあります。「4」を漢字で表すとどれ？",
            answers: [
              "四",
              "三",
              "二",
              "五"
            ],
            correct: "四"
          },

          {
            type: "meaning",
            question: "三の次、五の前にある数は？",
            answers: [
              "四",
              "二",
              "一",
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
        "五つ",
        "五人"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「ご」と読む漢字はどれ？",
            answers: [
              "五",
              "四",
              "三",
              "二"
            ],
            correct: "五"
          },

          {
            type: "choice",
            question: "数の「5」を表す漢字はどれ？",
            answers: [
              "五",
              "一",
              "二",
              "四"
            ],
            correct: "五"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「五つ」を作ろう。",
            parts: [
              "五",
              "つ"
            ],
            correct: "五つ"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "星が5こあります。「5」を漢字で表すとどれ？",
            answers: [
              "五",
              "二",
              "三",
              "四"
            ],
            correct: "五"
          },

          {
            type: "meaning",
            question: "一、二、三、四、その次の数は？",
            answers: [
              "五",
              "三",
              "二",
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
