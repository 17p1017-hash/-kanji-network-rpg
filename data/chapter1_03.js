// ==================================================
// 第1章 03
// 小学1年生漢字
// 上・下・左・右・中
// ==================================================

const CHAPTER1_03 = {

  id: "chapter1_03",

  title: "第1章 ばしょのことば",

  grade: 1,

  defaultMasteryGoal: 1,

  kanji: {


    // ==================================================
    // 上
    // ==================================================

    "上": {

      id: "ue",

      kanji: "上",

      readings: [
        "じょう",
        "うえ",
        "あ"
      ],

      meaning: "高いほう・うえのほう",

      masteryGoal: 1,

      words: [
        "上",
        "上る",
        "上手"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「うえ」と読む漢字はどれ？",
            answers: [
              "上",
              "下",
              "左",
              "右"
            ],
            correct: "上"
          },

          {
            type: "choice",
            question: "高いほうを表す漢字はどれ？",
            answers: [
              "上",
              "下",
              "中",
              "左"
            ],
            correct: "上"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「上る」を作ろう。",
            parts: [
              "上",
              "る"
            ],
            correct: "上る"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "本がつくえのうえにあります。どの漢字が合う？",
            answers: [
              "上",
              "下",
              "中",
              "右"
            ],
            correct: "上"
          },

          {
            type: "meaning",
            question: "階段をのぼって、二階へ行きました。どちらの方向へ進んだ？",
            answers: [
              "上",
              "下",
              "左",
              "右"
            ],
            correct: "上"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「うえ」を漢字で書いてみよう。",
            target: "上"
          }

        ]

      }

    },


    // ==================================================
    // 下
    // ==================================================

    "下": {

      id: "shita",

      kanji: "下",

      readings: [
        "か",
        "げ",
        "した",
        "さ"
      ],

      meaning: "低いほう・したのほう",

      masteryGoal: 1,

      words: [
        "下",
        "下る",
        "上下"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「した」と読む漢字はどれ？",
            answers: [
              "下",
              "上",
              "中",
              "右"
            ],
            correct: "下"
          },

          {
            type: "choice",
            question: "低いほうを表す漢字はどれ？",
            answers: [
              "下",
              "上",
              "左",
              "中"
            ],
            correct: "下"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「上下」を作ろう。",
            parts: [
              "上",
              "下"
            ],
            correct: "上下"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "ねこがつくえのしたにかくれました。どの漢字が合う？",
            answers: [
              "下",
              "上",
              "中",
              "左"
            ],
            correct: "下"
          },

          {
            type: "meaning",
            question: "階段をおりて、一階へ行きました。どちらの方向へ進んだ？",
            answers: [
              "下",
              "上",
              "右",
              "左"
            ],
            correct: "下"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「した」を漢字で書いてみよう。",
            target: "下"
          }

        ]

      }

    },


    // ==================================================
    // 左
    // ==================================================

    "左": {

      id: "hidari",

      kanji: "左",

      readings: [
        "さ",
        "ひだり"
      ],

      meaning: "ひだりの方向",

      masteryGoal: 1,

      words: [
        "左",
        "左右",
        "左手"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「ひだり」と読む漢字はどれ？",
            answers: [
              "左",
              "右",
              "上",
              "下"
            ],
            correct: "左"
          },

          {
            type: "choice",
            question: "「左手」のはじめの漢字はどれ？",
            answers: [
              "左",
              "右",
              "中",
              "上"
            ],
            correct: "左"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「左手」を作ろう。",
            parts: [
              "左",
              "手"
            ],
            correct: "左手"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "右とは反対の方向を表す漢字はどれ？",
            answers: [
              "左",
              "右",
              "上",
              "下"
            ],
            correct: "左"
          },

          {
            type: "meaning",
            question: "道の分かれ道で「ひだりへ曲がって」と言われました。どの漢字の方向？",
            answers: [
              "左",
              "右",
              "上",
              "中"
            ],
            correct: "左"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「ひだり」を漢字で書いてみよう。",
            target: "左"
          }

        ]

      }

    },


    // ==================================================
    // 右
    // ==================================================

    "右": {

      id: "migi",

      kanji: "右",

      readings: [
        "う",
        "ゆう",
        "みぎ"
      ],

      meaning: "みぎの方向",

      masteryGoal: 1,

      words: [
        "右",
        "左右",
        "右手"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「みぎ」と読む漢字はどれ？",
            answers: [
              "右",
              "左",
              "上",
              "下"
            ],
            correct: "右"
          },

          {
            type: "choice",
            question: "「右手」のはじめの漢字はどれ？",
            answers: [
              "右",
              "左",
              "中",
              "下"
            ],
            correct: "右"
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
            question: "左とは反対の方向を表す漢字はどれ？",
            answers: [
              "右",
              "左",
              "上",
              "下"
            ],
            correct: "右"
          },

          {
            type: "meaning",
            question: "道の分かれ道で「みぎへ曲がって」と言われました。どの漢字の方向？",
            answers: [
              "右",
              "左",
              "中",
              "上"
            ],
            correct: "右"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「みぎ」を漢字で書いてみよう。",
            target: "右"
          }

        ]

      }

    },


    // ==================================================
    // 中
    // ==================================================

    "中": {

      id: "naka",

      kanji: "中",

      readings: [
        "ちゅう",
        "なか"
      ],

      meaning: "ものの内側・まんなか",

      masteryGoal: 1,

      words: [
        "中",
        "水中",
        "まん中"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「なか」と読む漢字はどれ？",
            answers: [
              "中",
              "上",
              "下",
              "右"
            ],
            correct: "中"
          },

          {
            type: "choice",
            question: "「水中」の「ちゅう」に使う漢字はどれ？",
            answers: [
              "中",
              "上",
              "左",
              "右"
            ],
            correct: "中"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「水中」を作ろう。",
            parts: [
              "水",
              "中"
            ],
            correct: "水中"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "箱を開けると、そのなかに宝物が入っていました。どの漢字が合う？",
            answers: [
              "中",
              "上",
              "下",
              "左"
            ],
            correct: "中"
          },

          {
            type: "meaning",
            question: "三人でならんだとき、左右にはさまれた場所はどこ？",
            answers: [
              "中",
              "上",
              "下",
              "右"
            ],
            correct: "中"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「なか」を漢字で書いてみよう。",
            target: "中"
          }

        ]

      }

    }

  }

};
