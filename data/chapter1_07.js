// ==================================================
// 第1章 07
// 小学1年生漢字
// 大・小・白・赤・青
// ==================================================

const CHAPTER1_07 = {

  id: "chapter1_07",

  title: "第1章 おおきさといろ",

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

        // ⚔️ 見て選ぶ
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
            question: "大きいことを表す漢字はどれ？",
            answers: [
              "大",
              "小",
              "青",
              "白"
            ],
            correct: "大"
          }

        ],

        // 🏹 組み立てる
        bow: [

          {
            type: "build",
            question: "「たいぼく」と読むことばを、パーツを順番にえらんで作ろう。",
            parts: [
              "大",
              "木"
            ],
            correct: "大木"
          }

        ],

        // 🪄 意味・場面から考える
        staff: [

          {
            type: "meaning",
            question: "小さな箱ではなく、とても大きな箱があります。どの漢字とつながりが深い？",
            answers: [
              "大",
              "小",
              "白",
              "青"
            ],
            correct: "大"
          },

          {
            type: "meaning",
            question: "ぞうは、ねずみよりずっと大きいです。どの漢字？",
            answers: [
              "大",
              "小",
              "赤",
              "白"
            ],
            correct: "大"
          }

        ],

        // 🔨 書く
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
            question: "小さいことを表す漢字はどれ？",
            answers: [
              "小",
              "大",
              "赤",
              "白"
            ],
            correct: "小"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「こいし」と読むことばを、パーツを順番にえらんで作ろう。",
            parts: [
              "小",
              "石"
            ],
            correct: "小石"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "大きな石ではなく、手のひらにのるくらいの石です。どの漢字とつながりが深い？",
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
            question: "ぞうより、ねずみのほうがずっと小さいです。どの漢字？",
            answers: [
              "小",
              "大",
              "青",
              "白"
            ],
            correct: "小"
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
        "しろ",
        "しろい"
      ],

      meaning: "白い色",

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
            question: "雪のような色を表す漢字はどれ？",
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
            question: "「しろい」と読むことばを、パーツを順番にえらんで作ろう。",
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
            question: "雪の色とつながりが深い漢字は？",
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
            question: "何も書いていない紙のような色は？",
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
        "あか",
        "あかい"
      ],

      meaning: "赤い色",

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
            question: "りんごやいちごに多い色を表す漢字はどれ？",
            answers: [
              "赤",
              "白",
              "青",
              "小"
            ],
            correct: "赤"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「あかつち」と読むことばを、パーツを順番にえらんで作ろう。",
            parts: [
              "赤",
              "土"
            ],
            correct: "赤土"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "消防車によく使われている色とつながりが深い漢字は？",
            answers: [
              "赤",
              "白",
              "青",
              "大"
            ],
            correct: "赤"
          },

          {
            type: "meaning",
            question: "熟したトマトのような色は？",
            answers: [
              "赤",
              "白",
              "青",
              "小"
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
        "あお",
        "あおい"
      ],

      meaning: "青い色",

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
              "大"
            ],
            correct: "青"
          },

          {
            type: "choice",
            question: "晴れた空によく見える色を表す漢字はどれ？",
            answers: [
              "青",
              "赤",
              "白",
              "小"
            ],
            correct: "青"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「あおい」と読むことばを、パーツを順番にえらんで作ろう。",
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
            question: "よく晴れた日の空とつながりが深い色は？",
            answers: [
              "青",
              "赤",
              "白",
              "大"
            ],
            correct: "青"
          },

          {
            type: "meaning",
            question: "海を遠くから見たときに見えることが多い色は？",
            answers: [
              "青",
              "赤",
              "白",
              "小"
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
