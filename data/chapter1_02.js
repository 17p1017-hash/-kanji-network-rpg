// ==================================================
// 第1章 02
// 小学1年生漢字
// 山・川・田・土・石
// ==================================================

const CHAPTER1_02 = {

  id: "chapter1_02",

  title: "第1章 自然のことば",

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
        "山道",
        "火山"
      ],

      questions: {

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
            question: "高い土地を表す漢字はどれ？",
            answers: [
              "山",
              "川",
              "土",
              "田"
            ],
            correct: "山"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「山道」を作ろう。",
            parts: [
              "山",
              "道"
            ],
            correct: "山道"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "遠くに高くそびえている場所へ登りました。どの漢字とつながりが深い？",
            answers: [
              "山",
              "川",
              "田",
              "土"
            ],
            correct: "山"
          },

          {
            type: "meaning",
            question: "坂道を上って、頂上を目指します。どこへ行っている？",
            answers: [
              "山",
              "川",
              "田",
              "石"
            ],
            correct: "山"
          }

        ],

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

      meaning: "水が流れているところ",

      masteryGoal: 1,

      words: [
        "川",
        "川上",
        "小川"
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
              "土"
            ],
            correct: "川"
          },

          {
            type: "choice",
            question: "水が流れている場所を表す漢字はどれ？",
            answers: [
              "川",
              "石",
              "山",
              "田"
            ],
            correct: "川"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「小川」を作ろう。",
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
            question: "山から流れてきた水が、長く続いています。どこ？",
            answers: [
              "川",
              "田",
              "山",
              "石"
            ],
            correct: "川"
          },

          {
            type: "meaning",
            question: "橋をわたると、その下を水が流れていました。何がある？",
            answers: [
              "川",
              "山",
              "土",
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
              "石"
            ],
            correct: "田"
          },

          {
            type: "choice",
            question: "お米を育てる場所を表す漢字はどれ？",
            answers: [
              "田",
              "川",
              "山",
              "土"
            ],
            correct: "田"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「水田」を作ろう。",
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
            question: "春に苗を植えて、秋にお米をとります。どこで育てる？",
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
            question: "水を入れて、お米を育てる場所は？",
            answers: [
              "田",
              "土",
              "川",
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
        "つち"
      ],

      meaning: "地面を作っているもの",

      masteryGoal: 1,

      words: [
        "土",
        "土よう日",
        "土の中"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「つち」と読む漢字はどれ？",
            answers: [
              "土",
              "石",
              "田",
              "山"
            ],
            correct: "土"
          },

          {
            type: "choice",
            question: "地面を作っているものを表す漢字はどれ？",
            answers: [
              "土",
              "川",
              "山",
              "石"
            ],
            correct: "土"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「土よう日」を作ろう。",
            parts: [
              "土",
              "よう",
              "日"
            ],
            correct: "土よう日"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "花を植えるために、地面をやわらかくしました。何をほった？",
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
            question: "雨のあと、くつの裏に茶色いものがつきました。何？",
            answers: [
              "土",
              "水",
              "山",
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
        "いし"
      ],

      meaning: "かたくて小さな岩のようなもの",

      masteryGoal: 1,

      words: [
        "石",
        "小石",
        "石ころ"
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
              "田"
            ],
            correct: "石"
          },

          {
            type: "choice",
            question: "かたくて、地面に落ちていることがあるものは？",
            answers: [
              "石",
              "川",
              "田",
              "土"
            ],
            correct: "石"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「小石」を作ろう。",
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
            question: "道にかたくて小さなものが落ちていました。つまずきそうになりました。何？",
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
            question: "川べりで、丸くてかたいものを拾いました。何を拾った？",
            answers: [
              "石",
              "山",
              "土",
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
