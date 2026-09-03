// ==================================================
// 第1章 08
// 小学1年生漢字
// 学・校・本・文・字
// ==================================================

const CHAPTER1_08 = {

  id: "chapter1_08",

  title: "第1章 まなびのことば",

  grade: 1,

  defaultMasteryGoal: 1,

  kanji: {


    // ==================================================
    // 学
    // ==================================================

    "学": {

      id: "gaku",

      kanji: "学",

      readings: [
        "がく",
        "まな"
      ],

      meaning: "勉強すること・学ぶこと",

      masteryGoal: 1,

      words: [
        "学ぶ",
        "学校",
        "学生"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「がく」と読む漢字はどれ？",
            answers: [
              "学",
              "校",
              "文",
              "字"
            ],
            correct: "学"
          },

          {
            type: "choice",
            question: "「学校」のはじめの漢字はどれ？",
            answers: [
              "学",
              "校",
              "本",
              "文"
            ],
            correct: "学"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「学校」を作ろう。",
            parts: [
              "学",
              "校"
            ],
            correct: "学校"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "先生から新しいことを教えてもらい、勉強しています。どの漢字とつながりが深い？",
            answers: [
              "学",
              "本",
              "字",
              "文"
            ],
            correct: "学"
          },

          {
            type: "meaning",
            question: "新しいことを知ったり、できるようになったりすることを何という？",
            answers: [
              "学ぶ",
              "読む",
              "見る",
              "歩く"
            ],
            correct: "学ぶ"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「がく」を漢字で書いてみよう。",
            target: "学"
          }

        ]

      }

    },


    // ==================================================
    // 校
    // ==================================================

    "校": {

      id: "kou",

      kanji: "校",

      readings: [
        "こう"
      ],

      meaning: "学校などに使う漢字",

      masteryGoal: 1,

      words: [
        "学校",
        "校内",
        "校門"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「こう」と読む漢字はどれ？",
            answers: [
              "校",
              "学",
              "本",
              "字"
            ],
            correct: "校"
          },

          {
            type: "choice",
            question: "「学校」の最後の漢字はどれ？",
            answers: [
              "校",
              "学",
              "文",
              "本"
            ],
            correct: "校"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「学校」を作ろう。",
            parts: [
              "学",
              "校"
            ],
            correct: "学校"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "毎日、勉強するために通う場所は？",
            answers: [
              "学校",
              "山",
              "川",
              "田"
            ],
            correct: "学校"
          },

          {
            type: "meaning",
            question: "「がっこう」の「こう」に使う漢字はどれ？",
            answers: [
              "校",
              "学",
              "本",
              "文"
            ],
            correct: "校"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「がっこう」の「こう」を漢字で書いてみよう。",
            target: "校"
          }

        ]

      }

    },


    // ==================================================
    // 本
    // ==================================================

    "本": {

      id: "hon",

      kanji: "本",

      readings: [
        "ほん",
        "もと"
      ],

      meaning: "文字や絵が書かれたもの",

      masteryGoal: 1,

      words: [
        "本",
        "本を読む",
        "一本"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「ほん」と読む漢字はどれ？",
            answers: [
              "本",
              "文",
              "字",
              "学"
            ],
            correct: "本"
          },

          {
            type: "choice",
            question: "物語や図鑑などを表す漢字はどれ？",
            answers: [
              "本",
              "文",
              "字",
              "校"
            ],
            correct: "本"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「一本」を作ろう。",
            parts: [
              "一",
              "本"
            ],
            correct: "一本"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "図書室で借りて、家で読みました。何を借りた？",
            answers: [
              "本",
              "文",
              "字",
              "校"
            ],
            correct: "本"
          },

          {
            type: "meaning",
            question: "ページをめくりながら物語を読みます。手に持っているものは？",
            answers: [
              "本",
              "石",
              "木",
              "紙"
            ],
            correct: "本"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「ほん」を漢字で書いてみよう。",
            target: "本"
          }

        ]

      }

    },


    // ==================================================
    // 文
    // ==================================================

    "文": {

      id: "bun",

      kanji: "文",

      readings: [
        "ぶん",
        "もん"
      ],

      meaning: "ことばをつなげて作った文章",

      masteryGoal: 1,

      words: [
        "文",
        "作文",
        "本文"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「ぶん」と読む漢字はどれ？",
            answers: [
              "文",
              "字",
              "本",
              "学"
            ],
            correct: "文"
          },

          {
            type: "choice",
            question: "「作文」の最後の漢字はどれ？",
            answers: [
              "文",
              "字",
              "本",
              "校"
            ],
            correct: "文"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「作文」を作ろう。",
            parts: [
              "作",
              "文"
            ],
            correct: "作文"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "「きょう、公園で遊びました。」これは一つの何？",
            answers: [
              "文",
              "字",
              "本",
              "学校"
            ],
            correct: "文"
          },

          {
            type: "meaning",
            question: "いくつかのことばをつなげて、意味のあるまとまりを作りました。何ができた？",
            answers: [
              "文",
              "字",
              "本",
              "校"
            ],
            correct: "文"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「ぶん」を漢字で書いてみよう。",
            target: "文"
          }

        ]

      }

    },


    // ==================================================
    // 字
    // ==================================================

    "字": {

      id: "ji",

      kanji: "字",

      readings: [
        "じ",
        "あざ"
      ],

      meaning: "書いたり読んだりする文字",

      masteryGoal: 1,

      words: [
        "字",
        "文字",
        "漢字"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「じ」と読む漢字はどれ？",
            answers: [
              "字",
              "文",
              "本",
              "学"
            ],
            correct: "字"
          },

          {
            type: "choice",
            question: "「漢字」の最後の漢字はどれ？",
            answers: [
              "字",
              "文",
              "本",
              "校"
            ],
            correct: "字"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「文字」を作ろう。",
            parts: [
              "文",
              "字"
            ],
            correct: "文字"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "ノートに「あ」「山」「川」と書きました。書いた一つ一つを何という？",
            answers: [
              "字",
              "文",
              "本",
              "学校"
            ],
            correct: "字"
          },

          {
            type: "meaning",
            question: "「山」という一つの漢字も、一つの何？",
            answers: [
              "字",
              "文",
              "本",
              "校"
            ],
            correct: "字"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「じ」を漢字で書いてみよう。",
            target: "字"
          }

        ]

      }

    }

  }

};
