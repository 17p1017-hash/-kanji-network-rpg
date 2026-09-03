// ==================================================
// 第1章 02
// 小学1年生漢字
// 山・川・田・土・石
// ==================================================

const CHAPTER1_02 = {

  id: "chapter1_02",

  title: "第1章 しぜんのことば",

  grade: 1,

  defaultMasteryGoal: 1,

  kanji: {


    // ==================================================
    // 山
    // ==================================================

    "山": {

      id: "yama",

      kanji: "山",

      readings: [
        "さん",
        "やま"
      ],

      meaning: "高くもり上がった土地",

      masteryGoal: 1,

      words: [
        "山",
        "火山",
        "山道"
      ],

      questions: {

        // ⚔️ 見て選ぶ
        sword: [

          {
            type: "choice",
            question: "「やま」と読む漢字はどれ？",
            answers: [
              "山",
              "川",
              "田",
              "石"
            ],
            correct: "山"
          },

          {
            type: "choice",
            question: "高くもり上がった土地を表す漢字はどれ？",
            answers: [
              "山",
              "川",
              "田",
              "土"
            ],
            correct: "山"
          }

        ],

        // 🏹 組み立てる
        bow: [

          {
            type: "build",
            question: "「かざん」と読むことばを、パーツを順番にえらんで作ろう。",
            parts: [
              "火",
              "山"
            ],
            correct: "火山"
          }

        ],

        // 🪄 意味・場面から考える
        staff: [

          {
            type: "meaning",
            question: "高いところへ登って、上から町を見ました。どの漢字とつながりが深い？",
            answers: [
              "山",
              "川",
              "田",
              "石"
            ],
            correct: "山"
          },

          {
            type: "meaning",
            question: "木がたくさん生えていて、高くなっている場所は？",
            answers: [
              "山",
              "川",
              "土",
              "田"
            ],
            correct: "山"
          }

        ],

        // 🔨 書く
        hammer: [

          {
            type: "writing",
            question: "「やま」を漢字で書いてみよう。",
            target: "山"
          }

        ]

      }

    },


    // ==================================================
    // 川
    // ==================================================

    "川": {

      id: "kawa",

      kanji: "川",

      readings: [
        "せん",
        "かわ"
      ],

      meaning: "水が流れるところ",

      masteryGoal: 1,

      words: [
        "川",
        "小川",
        "川上"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「かわ」と読む漢字はどれ？",
            answers: [
              "川",
              "山",
              "田",
              "石"
            ],
            correct: "川"
          },

          {
            type: "choice",
            question: "水が流れるところを表す漢字はどれ？",
            answers: [
              "川",
              "山",
              "土",
              "田"
            ],
            correct: "川"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「おがわ」と読むことばを、パーツを順番にえらんで作ろう。",
            parts: [
              "小",
              "川"
            ],
            correct: "小川"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "山から水が流れてきています。どの漢字とつながりが深い？",
            answers: [
              "川",
              "山",
              "田",
              "石"
            ],
            correct: "川"
          },

          {
            type: "meaning",
            question: "魚が泳いでいて、水がずっと流れている場所は？",
            answers: [
              "川",
              "土",
              "山",
              "田"
            ],
            correct: "川"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「かわ」を漢字で書いてみよう。",
            target: "川"
          }

        ]

      }

    },


    // ==================================================
    // 田
    // ==================================================

    "田": {

      id: "ta",

      kanji: "田",

      readings: [
        "でん",
        "た"
      ],

      meaning: "お米を育てる場所",

      masteryGoal: 1,

      words: [
        "田",
        "田んぼ",
        "水田"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「た」と読む漢字はどれ？",
            answers: [
              "田",
              "山",
              "川",
              "土"
            ],
            correct: "田"
          },

          {
            type: "choice",
            question: "お米を育てる場所を表す漢字はどれ？",
            answers: [
              "田",
              "川",
              "石",
              "山"
            ],
            correct: "田"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「すいでん」と読むことばを、パーツを順番にえらんで作ろう。",
            parts: [
              "水",
              "田"
            ],
            correct: "水田"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "水を入れて、お米を育てている場所は？",
            answers: [
              "田",
              "山",
              "川",
              "石"
            ],
            correct: "田"
          },

          {
            type: "meaning",
            question: "秋になると、お米をとるために稲を刈ります。どの漢字とつながりが深い？",
            answers: [
              "田",
              "川",
              "土",
              "山"
            ],
            correct: "田"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「た」を漢字で書いてみよう。",
            target: "田"
          }

        ]

      }

    },


    // ==================================================
    // 土
    // ==================================================

    "土": {

      id: "tsuchi",

      kanji: "土",

      readings: [
        "ど",
        "と",
        "つち"
      ],

      meaning: "地面にあるつち",

      masteryGoal: 1,

      words: [
        "土",
        "赤土",
        "土山"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「つち」と読む漢字はどれ？",
            answers: [
              "土",
              "石",
              "山",
              "田"
            ],
            correct: "土"
          },

          {
            type: "choice",
            question: "地面にある、やわらかいつちを表す漢字はどれ？",
            answers: [
              "土",
              "石",
              "川",
              "山"
            ],
            correct: "土"
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
            question: "花を植えるために、地面をほりました。どの漢字とつながりが深い？",
            answers: [
              "土",
              "石",
              "川",
              "山"
            ],
            correct: "土"
          },

          {
            type: "meaning",
            question: "畑で野菜が育っている、地面のやわらかい部分は？",
            answers: [
              "土",
              "石",
              "川",
              "田"
            ],
            correct: "土"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「つち」を漢字で書いてみよう。",
            target: "土"
          }

        ]

      }

    },


    // ==================================================
    // 石
    // ==================================================

    "石": {

      id: "ishi",

      kanji: "石",

      readings: [
        "せき",
        "しゃく",
        "いし"
      ],

      meaning: "かたい石",

      masteryGoal: 1,

      words: [
        "石",
        "小石",
        "石山"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「いし」と読む漢字はどれ？",
            answers: [
              "石",
              "土",
              "山",
              "川"
            ],
            correct: "石"
          },

          {
            type: "choice",
            question: "地面にある、かたいものを表す漢字はどれ？",
            answers: [
              "石",
              "土",
              "田",
              "川"
            ],
            correct: "石"
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
            question: "道に、かたくて丸いものが落ちています。どの漢字とつながりが深い？",
            answers: [
              "石",
              "土",
              "川",
              "田"
            ],
            correct: "石"
          },

          {
            type: "meaning",
            question: "川べで、かたくて小さなものをひろいました。どの漢字？",
            answers: [
              "石",
              "土",
              "山",
              "田"
            ],
            correct: "石"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「いし」を漢字で書いてみよう。",
            target: "石"
          }

        ]

      }

    }

  }

};
