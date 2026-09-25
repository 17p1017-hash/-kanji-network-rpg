// 一字入魂。習得問題もこのスキルと一緒に管理する。
window.KanjiSkillDefinitions = window.KanjiSkillDefinitions || [];

window.KanjiSkillDefinitions.push({
  id: "ichiji_konshin",
  name: "一字入魂",
  icon: "✨",
  requiredMastery: 5,
  kanji: ["日", "月", "火", "水", "木"],
  cost: 5,
  description: "次の正解攻撃のダメージを2倍にする。",
  effect: "nextAttackDouble",

  // 各字について、文字・読み・意味をそれぞれ出発点にする。
  // 1問では一つの答えだけを求める。
  questions: [
    { kanji: "日", from: "文字", prompt: "「日」の音読みは？", choices: ["にち", "げつ", "か", "すい"], answer: "にち" },
    { kanji: "日", from: "読み", prompt: "「にち」と読む漢字が表すものは？", choices: ["太陽・日にち", "空に見える月", "燃える火", "植物の木"], answer: "太陽・日にち" },
    { kanji: "日", from: "意味", prompt: "太陽や日にちを表す漢字は？", choices: ["日", "月", "火", "木"], answer: "日" },

    { kanji: "月", from: "文字", prompt: "「月」の訓読みは？", choices: ["つき", "ひ", "みず", "き"], answer: "つき" },
    { kanji: "月", from: "読み", prompt: "「げつ」と読む漢字が表すものは？", choices: ["空に見える月・一か月", "太陽・日にち", "燃える火", "飲む水"], answer: "空に見える月・一か月" },
    { kanji: "月", from: "意味", prompt: "夜空に見え、一か月を数えるときにも使う漢字は？", choices: ["月", "日", "水", "木"], answer: "月" },

    { kanji: "火", from: "文字", prompt: "「火」の音読みは？", choices: ["か", "にち", "すい", "もく"], answer: "か" },
    { kanji: "火", from: "読み", prompt: "「か」と読む漢字が表すものは？", choices: ["燃えて熱や光を出すもの", "飲んだり洗ったりするもの", "太陽・日にち", "幹や枝のある植物"], answer: "燃えて熱や光を出すもの" },
    { kanji: "火", from: "意味", prompt: "燃えて熱や光を出すものを表す漢字は？", choices: ["火", "日", "木", "水"], answer: "火" },

    { kanji: "水", from: "文字", prompt: "「水」の訓読みは？", choices: ["みず", "つき", "ひ", "き"], answer: "みず" },
    { kanji: "水", from: "読み", prompt: "「すい」と読む漢字が表すものは？", choices: ["飲んだり洗ったりするもの", "燃えて熱や光を出すもの", "空に見える月", "幹や枝のある植物"], answer: "飲んだり洗ったりするもの" },
    { kanji: "水", from: "意味", prompt: "飲んだり、手を洗ったりするときに使うものを表す漢字は？", choices: ["水", "火", "月", "木"], answer: "水" },

    { kanji: "木", from: "文字", prompt: "「木」の訓読みは？", choices: ["き", "ひ", "つき", "みず"], answer: "き" },
    { kanji: "木", from: "読み", prompt: "「もく」と読む漢字が表すものは？", choices: ["幹や枝のある植物", "飲んだり洗ったりするもの", "太陽・日にち", "燃えて熱や光を出すもの"], answer: "幹や枝のある植物" },
    { kanji: "木", from: "意味", prompt: "幹や枝のある植物を表す漢字は？", choices: ["木", "水", "火", "月"], answer: "木" }
  ]
});
