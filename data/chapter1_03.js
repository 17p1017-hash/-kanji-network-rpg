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
        "うえ"
      ],

      meaning: "高いほう・うえ",

      masteryGoal: 1,

      words: [
        "上",
        "上手",
        "川上"
      ],

      questions: {

        // ⚔️ 見て選ぶ
        sword: [

          {
            type: "choice",
            question: "「うえ」と読む漢字はどれ？",
            answers: [
              "上",
              "下",
              "左",
              "中"
            ],
            correct: "上"
          },

          {
            type: "choice",
            question: "高いほうを表す漢字はどれ？",
            answers: [
              "上",
              "下",
              "右",
              "中"
            ],
            correct: "上"
          }

        ],

        // 🏹 組み立てる
        bow: [

          {
            type: "build",
            question: "「かわかみ」と読むことばを、パーツを順番にえらんで作ろう。",
            parts: [
              "川",
              "上"
            ],
            correct: "川上"
          }

        ],

        // 🪄 意味・場面から考える
        staff: [

          {
            type: "meaning",
            question: "本をつくえの高いほうに置きました。どの漢字とつながりが深い？",
            answers: [
              "上",
              "下",
              "左",
              "右"
            ],
            correct: "上"
          },

          {
            type: "meaning",
            question: "エレベーターで、今いる階より高い階へ行きます。どの漢字？",
            answers: [
              "上",
              "下",
              "中",
              "左"
            ],
            correct: "上"
          }

        ],

        // 🔨 書く
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
        "した"
      ],

      meaning: "低いほう・した",

      masteryGoal: 1,

      words: [
        "下",
        "上下",
        "川下"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「した」と読む漢字はどれ？",
            answers: [
              "下",
              "上",
              "右",
              "中"
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
            question: "「じょうげ」と読むことばを、パーツを順番にえらんで作ろう。",
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
            question: "いすの低いほうにかばんを置きました。どの漢字とつながりが深い？",
            answers: [
              "下",
              "上",
              "左",
              "右"
            ],
            correct: "下"
          },

          {
            type: "meaning",
            question: "かいだんをおりて、今いる場所より低いところへ行きます。どの漢字？",
            answers: [
              "下",
              "上",
              "中",
              "右"
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

      meaning: "ひだりがわ",

      masteryGoal: 1,

      words: [
        "左",
        "左手",
        "左右"
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
            question: "右の反対を表す漢字はどれ？",
            answers: [
              "左",
              "中",
              "上",
              "下"
            ],
            correct: "左"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「ひだりて」と読むことばを、パーツを順番にえらんで作ろう。",
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
            question: "道を歩いていて、「ひだりへまがって」と言われました。どの漢字？",
            answers: [
              "左",
              "右",
              "上",
              "中"
            ],
            correct: "左"
          },

          {
            type: "meaning",
            question: "右手ではないほうの手とつながる漢字は？",
            answers: [
              "左",
              "右",
              "下",
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

      meaning: "みぎがわ",

      masteryGoal: 1,

      words: [
        "右",
        "右手",
        "左右"
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
              "中"
            ],
            correct: "右"
          },

          {
            type: "choice",
            question: "左の反対を表す漢字はどれ？",
            answers: [
              "右",
              "中",
              "上",
              "下"
            ],
            correct: "右"
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
            question: "道を歩いていて、「みぎへまがって」と言われました。どの漢字？",
            answers: [
              "右",
              "左",
              "下",
              "中"
            ],
            correct: "右"
          },

          {
            type: "meaning",
            question: "左手ではないほうの手とつながる漢字は？",
            answers: [
              "右",
              "左",
              "上",
              "中"
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

      meaning: "まんなか・内側",

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
            question: "まんなかを表す漢字はどれ？",
            answers: [
              "中",
              "左",
              "右",
              "上"
            ],
            correct: "中"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「すいちゅう」と読むことばを、パーツを順番にえらんで作ろう。",
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
            question: "箱の外ではなく、内側にボールを入れました。どの漢字とつながりが深い？",
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
            question: "三人ならんだ人の、まんなかにいる人とつながる漢字は？",
            answers: [
              "中",
              "右",
              "上",
              "下"
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
