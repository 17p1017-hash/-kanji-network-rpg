// ==================================================
// 第1章 01
// 小学1年生漢字
// 日・月・火・水・木
// ==================================================

const CHAPTER1_01 = {

  id: "chapter1_01",

  title: "第1章 はじめのことば",

  grade: 1,

  // 1年生漢字は基本1回正解で習熟
  // 一度間違えた場合は復習対象にする
  defaultMasteryGoal: 1,

  kanji: {


    // ==================================================
    // 日
    // ==================================================

    "日": {

      id: "nichi",

      kanji: "日",

      readings: [
        "にち",
        "ひ"
      ],

      meaning: "太陽・一日・日にち",

      masteryGoal: 1,

      words: [
        "日",
        "一日",
        "日よう日"
      ],

      questions: {

        // ⚔️ 見て選ぶ
        sword: [

          {
            type: "choice",
            question: "「ひ」と読む漢字はどれ？",
            answers: [
              "日",
              "月",
              "火",
              "木"
            ],
            correct: "日"
          },

          {
            type: "choice",
            question: "「日よう日」のはじめの漢字はどれ？",
            answers: [
              "日",
              "月",
              "水",
              "木"
            ],
            correct: "日"
          }

        ],

        // 🏹 組み立てる
        bow: [

          {
            type: "build",
            question: "「日よう日」を作ろう。",
            parts: [
              "日",
              "よう",
              "日"
            ],
            correct: "日よう日"
          }

        ],

        // 🪄 意味・場面から考える
        staff: [

          {
            type: "meaning",
            question: "空が明るくなりました。空に出ているものとつながりが深い漢字は？",
            answers: [
              "日",
              "月",
              "水",
              "木"
            ],
            correct: "日"
          },

          {
            type: "meaning",
            question: "きょう、あした、きのう。どれも何と関係することば？",
            answers: [
              "日",
              "木",
              "火",
              "水"
            ],
            correct: "日"
          }

        ],

        // 🔨 書く
        hammer: [

          {
            type: "writing",
            question: "「ひ」を漢字で書いてみよう。",
            target: "日"
          }

        ]

      }

    },


    // ==================================================
    // 月
    // ==================================================

    "月": {

      id: "getsu",

      kanji: "月",

      readings: [
        "げつ",
        "つき"
      ],

      meaning: "空に見える月・一か月",

      masteryGoal: 1,

      words: [
        "月",
        "月よう日",
        "一月"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「つき」と読む漢字はどれ？",
            answers: [
              "月",
              "日",
              "水",
              "木"
            ],
            correct: "月"
          },

          {
            type: "choice",
            question: "「月よう日」のはじめの漢字はどれ？",
            answers: [
              "月",
              "日",
              "火",
              "水"
            ],
            correct: "月"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「月よう日」を作ろう。",
            parts: [
              "月",
              "よう",
              "日"
            ],
            correct: "月よう日"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "夜の空に丸く光って見えるものは？",
            answers: [
              "月",
              "日",
              "火",
              "木"
            ],
            correct: "月"
          },

          {
            type: "meaning",
            question: "カレンダーの「一月」「二月」の最後につく漢字は？",
            answers: [
              "月",
              "日",
              "水",
              "火"
            ],
            correct: "月"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「つき」を漢字で書いてみよう。",
            target: "月"
          }

        ]

      }

    },


    // ==================================================
    // 火
    // ==================================================

    "火": {

      id: "hi",

      kanji: "火",

      readings: [
        "か",
        "ひ"
      ],

      meaning: "燃えて熱や光を出すもの",

      masteryGoal: 1,

      words: [
        "火",
        "火よう日",
        "花火"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「ひ」と読む漢字はどれ？",
            answers: [
              "火",
              "水",
              "木",
              "月"
            ],
            correct: "火"
          },

          {
            type: "choice",
            question: "「火よう日」のはじめの漢字はどれ？",
            answers: [
              "火",
              "水",
              "木",
              "日"
            ],
            correct: "火"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「火よう日」を作ろう。",
            parts: [
              "火",
              "よう",
              "日"
            ],
            correct: "火よう日"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "たき火で、赤く燃えているものは？",
            answers: [
              "火",
              "水",
              "月",
              "木"
            ],
            correct: "火"
          },

          {
            type: "meaning",
            question: "料理をするとき、ものを熱くするために使うことがあるものは？",
            answers: [
              "火",
              "月",
              "日",
              "水"
            ],
            correct: "火"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「ひ」を漢字で書いてみよう。",
            target: "火"
          }

        ]

      }

    },


    // ==================================================
    // 水
    // ==================================================

    "水": {

      id: "mizu",

      kanji: "水",

      readings: [
        "すい",
        "みず"
      ],

      meaning: "飲んだり洗ったりする水",

      masteryGoal: 1,

      words: [
        "水",
        "水よう日",
        "水中"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「みず」と読む漢字はどれ？",
            answers: [
              "水",
              "火",
              "木",
              "月"
            ],
            correct: "水"
          },

          {
            type: "choice",
            question: "「水よう日」のはじめの漢字はどれ？",
            answers: [
              "水",
              "火",
              "木",
              "日"
            ],
            correct: "水"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「水よう日」を作ろう。",
            parts: [
              "水",
              "よう",
              "日"
            ],
            correct: "水よう日"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "のどがかわいたので、コップに入れて飲みました。何を飲んだ？",
            answers: [
              "水",
              "火",
              "木",
              "月"
            ],
            correct: "水"
          },

          {
            type: "meaning",
            question: "手を洗うときに使うものは？",
            answers: [
              "水",
              "火",
              "日",
              "月"
            ],
            correct: "水"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「みず」を漢字で書いてみよう。",
            target: "水"
          }

        ]

      }

    },


    // ==================================================
    // 木
    // ==================================================

    "木": {

      id: "ki",

      kanji: "木",

      readings: [
        "もく",
        "き"
      ],

      meaning: "幹や枝がある植物",

      masteryGoal: 1,

      words: [
        "木",
        "木よう日",
        "大木"
      ],

      questions: {

        sword: [

          {
            type: "choice",
            question: "「き」と読む漢字はどれ？",
            answers: [
              "木",
              "水",
              "火",
              "月"
            ],
            correct: "木"
          },

          {
            type: "choice",
            question: "「木よう日」のはじめの漢字はどれ？",
            answers: [
              "木",
              "水",
              "火",
              "日"
            ],
            correct: "木"
          }

        ],

        bow: [

          {
            type: "build",
            question: "「木よう日」を作ろう。",
            parts: [
              "木",
              "よう",
              "日"
            ],
            correct: "木よう日"
          }

        ],

        staff: [

          {
            type: "meaning",
            question: "森にたくさん生えていて、幹や枝があるものは？",
            answers: [
              "木",
              "水",
              "火",
              "月"
            ],
            correct: "木"
          },

          {
            type: "meaning",
            question: "大きく育つと、枝に葉がたくさんつくものは？",
            answers: [
              "木",
              "日",
              "水",
              "火"
            ],
            correct: "木"
          }

        ],

        hammer: [

          {
            type: "writing",
            question: "「き」を漢字で書いてみよう。",
            target: "木"
          }

        ]

      }

    }

  }

};
