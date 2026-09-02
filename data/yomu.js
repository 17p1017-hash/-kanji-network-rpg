const KANJI_YOMU = {
  id: "yomu",

  kanji: "読",

  grade: 2,

  title: "読のちから",

  description: "「読む」につながることばを見つけて、読の力を身につけよう！",

  masteryGoal: 3,

  skill: {
    id: "read_skill",
    name: "ことばリーディング",
    description: "ことばの意味を読み取り、問題のヒントを見つける力。",
    icon: "📖"
  },

  words: {
    "読む": {
      reading: "よむ",
      meaning: "文字や本を見る",

      questions: {
        sword: [
          {
            type: "choice",
            question: "「読」を使うことばはどれ？",
            answers: [
              "読む",
              "走る",
              "見る",
              "遊ぶ"
            ],
            correct: "読む"
          },

          {
            type: "choice",
            question: "本の文字を見ることを表すことばはどれ？",
            answers: [
              "読む",
              "書く",
              "聞く",
              "走る"
            ],
            correct: "読む"
          }
        ],

        bow: [
          {
            type: "build",
            question: "「よむ」になるようにつなげよう。",
            parts: [
              "読",
              "む"
            ],
            correct: "読む"
          }
        ],

        staff: [
          {
            type: "meaning",
            question: "本や文章の文字を見ることを表すことばは？",
            answers: [
              "読む",
              "走る",
              "遊ぶ",
              "歌う"
            ],
            correct: "読む"
          }
        ],

        hammer: [
          {
            type: "writing",
            question: "「よむ」の「読」を書いてみよう。",
            target: "読"
          }
        ]
      }
    },


    "読書": {
      reading: "どくしょ",
      meaning: "本を読むこと",

      questions: {
        sword: [
          {
            type: "choice",
            question: "本を読むことを表すことばはどれ？",
            answers: [
              "読書",
              "音楽",
              "運動",
              "学校"
            ],
            correct: "読書"
          },

          {
            type: "choice",
            question: "「どくしょ」と読むことばはどれ？",
            answers: [
              "読書",
              "読者",
              "音読",
              "作文"
            ],
            correct: "読書"
          }
        ],

        bow: [
          {
            type: "build",
            question: "「どくしょ」になるように漢字をつなげよう。",
            parts: [
              "読",
              "書"
            ],
            correct: "読書"
          }
        ],

        staff: [
          {
            type: "meaning",
            question: "本を読むことを表すことばは？",
            answers: [
              "読書",
              "音読",
              "読者",
              "作文"
            ],
            correct: "読書"
          }
        ],

        hammer: [
          {
            type: "writing",
            question: "「どくしょ」を漢字で書いてみよう。",
            target: "読書"
          }
        ]
      }
    },


    "音読": {
      reading: "おんどく",
      meaning: "声に出して読むこと",

      questions: {
        sword: [
          {
            type: "choice",
            question: "声に出して読むことを表すことばはどれ？",
            answers: [
              "音読",
              "読者",
              "作文",
              "計算"
            ],
            correct: "音読"
          },

          {
            type: "choice",
            question: "「おんどく」と読むことばはどれ？",
            answers: [
              "音読",
              "音楽",
              "読書",
              "読者"
            ],
            correct: "音読"
          }
        ],

        bow: [
          {
            type: "build",
            question: "「おんどく」になるように漢字をつなげよう。",
            parts: [
              "音",
              "読"
            ],
            correct: "音読"
          }
        ],

        staff: [
          {
            type: "meaning",
            question: "声に出して本や文章を読むことは？",
            answers: [
              "音読",
              "読書",
              "読者",
              "作文"
            ],
            correct: "音読"
          }
        ],

        hammer: [
          {
            type: "writing",
            question: "「おんどく」を漢字で書いてみよう。",
            target: "音読"
          }
        ]
      }
    },


    "読者": {
      reading: "どくしゃ",
      meaning: "本や文章を読む人",

      questions: {
        sword: [
          {
            type: "choice",
            question: "本や文章を読む人を表すことばはどれ？",
            answers: [
              "読者",
              "作者",
              "先生",
              "店員"
            ],
            correct: "読者"
          },

          {
            type: "choice",
            question: "「どくしゃ」と読むことばはどれ？",
            answers: [
              "読者",
              "読書",
              "音読",
              "会社"
            ],
            correct: "読者"
          }
        ],

        bow: [
          {
            type: "build",
            question: "「どくしゃ」になるように漢字をつなげよう。",
            parts: [
              "読",
              "者"
            ],
            correct: "読者"
          }
        ],

        staff: [
          {
            type: "meaning",
            question: "本や文章を読む人を表すことばは？",
            answers: [
              "読者",
              "作者",
              "先生",
              "店員"
            ],
            correct: "読者"
          }
        ],

        hammer: [
          {
            type: "writing",
            question: "「どくしゃ」を漢字で書いてみよう。",
            target: "読者"
          }
        ]
      }
    }
  },


  masteryTest: {
    title: "「読」の習得テスト",

    description: "ことばを書いて、「読」の力を自分のものにしよう！",

    passingScore: 2,

    questions: [
      {
        type: "writing",
        question: "「どくしょ」を漢字で書こう。",
        target: "読書"
      },

      {
        type: "writing",
        question: "「おんどく」を漢字で書こう。",
        target: "音読"
      },

      {
        type: "writing",
        question: "「どくしゃ」を漢字で書こう。",
        target: "読者"
      }
    ]
  }
};
