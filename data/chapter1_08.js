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

      meaning: "知ること・勉強すること",

      masteryGoal: 1,

      words: [
        "学ぶ",
        "学校",
        "学生"
      ],

      questions: {

        // ⚔️ 見て選ぶ
        sword: [

          {
            type: "choice",
            question: "「がく」と読むことがある漢字はどれ？",
            answers: [
              "学",
              "校",
              "本",
              "文"
            ],
            correct: "学"
          },

          {
            type: "choice",
            question: "勉強したり、ものを知ったりすることとつながる漢字は？",
            answers: [
              "学",
              "校",
              "字",
              "本"
            ],
            correct: "学"
          }

        ],

        // 🏹 組み立てる
        bow: [

          {
            type: "build",
            question: "「がっこう」と読むことばを、パーツを順番にえらんで作ろう。",
            parts: [
              "学",
              "校"
            ],
            correct: "学校"
          }

        ],

        // 🪄 意味・場面から考える
        staff: [

          {
            type: "meaning",
            question: "新しいことを知ったり、勉強したりすることとつながる漢字は？",
            answers: [
              "学",
              "校",
              "本",
              "字"
            ],
            correct: "学"
          },

          {
            type: "meaning",
            question: "先生の話を聞いたり、本を読んだりして知識をふやします。どの漢字とつながりが深い？",
            answers: [
              "学",
              "文",
              "校",
              "字"
            ],
            correct: "学"
          }

        ],

        // 🔨 書く
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

      meaning: "学校につかわれる漢字",

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
            question: "学校ということばの後ろに使う漢字はどれ？",
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
            question: "「がっこう」と読むことばを、パーツを順番にえらんで作ろう。",
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
            question: "子どもたちが勉強する場所の名前とつながりが深い漢字は？",
            answers: [
              "校",
              "本",
              "文",
              "字"
            ],
            correct: "校"
          },

          {
            type: "meaning",
            question: "「学校」ということばで、「学」の次にくる漢字は？",
            answers: [
              "校",
              "本",
              "字",
              "文"
            ],
            correct: "校"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「こう」を漢字で書いてみよう。",
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

      meaning: "読むもの・冊子",

      masteryGoal: 1,

      words: [
        "本",
        "一本",
        "本を読む"
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
            question: "お話や絵が書かれていて、ページをめくって読むものを表す漢字は？",
            answers: [
              "本",
              "字",
              "校",
              "文"
            ],
            correct: "本"
          }

        ],

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

        staff: [

          {
            type: "meaning",
            question: "図書室で借りて、ページをめくって読むものは？",
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
            question: "物語や図鑑を読むとき、手に持っているものとつながる漢字は？",
            answers: [
              "本",
              "学",
              "文",
              "字"
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

      meaning: "ことばをつないで書いたもの",

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
            question: "いくつかのことばをつないで書いたものを表す漢字は？",
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
            question: "「もじ」と読むことばを、パーツを順番にえらんで作ろう。",
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
            question: "「きょうは いい てんきです。」のように、ことばをつないだものは？",
            answers: [
              "文",
              "字",
              "本",
              "学"
            ],
            correct: "文"
          },

          {
            type: "meaning",
            question: "一つの字ではなく、ことばをつないで気もちや出来事を伝えるものは？",
            answers: [
              "文",
              "字",
              "校",
              "本"
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
        "じ"
      ],

      meaning: "書かれた文字",

      masteryGoal: 1,

      words: [
        "字",
        "文字",
        "大字"
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
              "校"
            ],
            correct: "字"
          },

          {
            type: "choice",
            question: "紙に書く、一つ一つの文字とつながる漢字は？",
            answers: [
              "字",
              "文",
              "学",
              "本"
            ],
            correct: "字"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「もじ」と読むことばを、パーツを順番にえらんで作ろう。",
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
            question: "ノートに「あ」「日」「山」のような形を書きました。一つ一つを何という？",
            answers: [
              "字",
              "文",
              "本",
              "校"
            ],
            correct: "字"
          },

          {
            type: "meaning",
            question: "名前を書くとき、一つ一つ書いていくものとつながる漢字は？",
            answers: [
              "字",
              "学",
              "文",
              "本"
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
