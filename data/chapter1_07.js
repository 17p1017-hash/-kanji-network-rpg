// ==================================================
// 第1章 07
// 小学1年生漢字
// 大・小・白・赤・青
// ==================================================

const CHAPTER1_07 = {

  id: "chapter1_07",

  title: "第1章 ようすのことば",

  grade: 1,

  defaultMasteryGoal: 1,

  kanji: {


    // ==================================================
    // 大
    // ==================================================

    "大": {

      id: "dai",

      kanji: "大",

      readings: [
        "だい",
        "たい",
        "おお"
      ],

      meaning: "大きいこと",

      masteryGoal: 1,

      words: [
        "大きい",
        "大人",
        "大木"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「おおきい」の「おお」に使う漢字はどれ？",
            answers: [
              "大",
              "小",
              "白",
              "赤"
            ],
            correct: "大"
          },

          {
            type: "choice",
            question: "「大木」のはじめの漢字はどれ？",
            answers: [
              "大",
              "木",
              "小",
              "青"
            ],
            correct: "大"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「大きい」を作ろう。",
            parts: [
              "大",
              "きい"
            ],
            correct: "大きい"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "小さな犬より、ぞうはとてもどう見える？",
            answers: [
              "大きい",
              "小さい",
              "白い",
              "赤い"
            ],
            correct: "大きい"
          },

          {
            type: "meaning",
            question: "森にとても太くて高い木がありました。どの漢字とつながりが深い？",
            answers: [
              "大",
              "小",
              "赤",
              "青"
            ],
            correct: "大"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「おおきい」の「おお」を漢字で書いてみよう。",
            target: "大"
          }

        ]

      }

    },


    // ==================================================
    // 小
    // ==================================================

    "小": {

      id: "shou",

      kanji: "小",

      readings: [
        "しょう",
        "ちい",
        "こ"
      ],

      meaning: "小さいこと",

      masteryGoal: 1,

      words: [
        "小さい",
        "小川",
        "小石"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「ちいさい」の「ちい」に使う漢字はどれ？",
            answers: [
              "小",
              "大",
              "白",
              "青"
            ],
            correct: "小"
          },

          {
            type: "choice",
            question: "「小川」のはじめの漢字はどれ？",
            answers: [
              "小",
              "川",
              "大",
              "赤"
            ],
            correct: "小"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「小さい」を作ろう。",
            parts: [
              "小",
              "さい"
            ],
            correct: "小さい"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "大きな箱のとなりに、とても小さな箱があります。どちらを表す漢字？",
            answers: [
              "小",
              "大",
              "白",
              "赤"
            ],
            correct: "小"
          },

          {
            type: "meaning",
            question: "手のひらにのるくらいの石を拾いました。どんな石？",
            answers: [
              "小さい",
              "大きい",
              "青い",
              "白い"
            ],
            correct: "小さい"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「ちいさい」の「ちい」を漢字で書いてみよう。",
            target: "小"
          }

        ]

      }

    },


    // ==================================================
    // 白
    // ==================================================

    "白": {

      id: "shiro",

      kanji: "白",

      readings: [
        "はく",
        "びゃく",
        "しろ"
      ],

      meaning: "しろい色",

      masteryGoal: 1,

      words: [
        "白",
        "白い",
        "白紙"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「しろ」と読む漢字はどれ？",
            answers: [
              "白",
              "赤",
              "青",
              "大"
            ],
            correct: "白"
          },

          {
            type: "choice",
            question: "雪の色を表す漢字はどれ？",
            answers: [
              "白",
              "赤",
              "青",
              "小"
            ],
            correct: "白"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「白い」を作ろう。",
            parts: [
              "白",
              "い"
            ],
            correct: "白い"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "雪がつもって、あたり一面が何色になった？",
            answers: [
              "白",
              "赤",
              "青",
              "大"
            ],
            correct: "白"
          },

          {
            type: "meaning",
            question: "何も書いていない紙があります。どんな色の紙を思い浮かべる？",
            answers: [
              "白",
              "赤",
              "青",
              "小"
            ],
            correct: "白"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「しろ」を漢字で書いてみよう。",
            target: "白"
          }

        ]

      }

    },


    // ==================================================
    // 赤
    // ==================================================

    "赤": {

      id: "aka",

      kanji: "赤",

      readings: [
        "せき",
        "しゃく",
        "あか"
      ],

      meaning: "あかい色",

      masteryGoal: 1,

      words: [
        "赤",
        "赤い",
        "赤土"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「あか」と読む漢字はどれ？",
            answers: [
              "赤",
              "白",
              "青",
              "大"
            ],
            correct: "赤"
          },

          {
            type: "choice",
            question: "「赤い」のはじめの漢字はどれ？",
            answers: [
              "赤",
              "青",
              "白",
              "小"
            ],
            correct: "赤"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「赤い」を作ろう。",
            parts: [
              "赤",
              "い"
            ],
            correct: "赤い"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "りんごがあざやかな色をしています。どの色を思い浮かべる？",
            answers: [
              "赤",
              "白",
              "青",
              "小"
            ],
            correct: "赤"
          },

          {
            type: "meaning",
            question: "信号で「止まれ」を知らせる色は？",
            answers: [
              "赤",
              "青",
              "白",
              "大"
            ],
            correct: "赤"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「あか」を漢字で書いてみよう。",
            target: "赤"
          }

        ]

      }

    },


    // ==================================================
    // 青
    // ==================================================

    "青": {

      id: "ao",

      kanji: "青",

      readings: [
        "せい",
        "しょう",
        "あお"
      ],

      meaning: "あおい色",

      masteryGoal: 1,

      words: [
        "青",
        "青い",
        "青空"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「あお」と読む漢字はどれ？",
            answers: [
              "青",
              "赤",
              "白",
              "小"
            ],
            correct: "青"
          },

          {
            type: "choice",
            question: "「青空」のはじめの漢字はどれ？",
            answers: [
              "青",
              "白",
              "赤",
              "大"
            ],
            correct: "青"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「青い」を作ろう。",
            parts: [
              "青",
              "い"
            ],
            correct: "青い"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "よく晴れた日の空は、どんな色に見える？",
            answers: [
              "青",
              "赤",
              "白",
              "小"
            ],
            correct: "青"
          },

          {
            type: "meaning",
            question: "信号で「進んでもよい」を知らせる色として使われる漢字は？",
            answers: [
              "青",
              "赤",
              "白",
              "大"
            ],
            correct: "青"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「あお」を漢字で書いてみよう。",
            target: "青"
          }

        ]

      }

    }

  }

};
