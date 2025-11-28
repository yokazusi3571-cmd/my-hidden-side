// シーン切り替え管理
const scenes = document.querySelectorAll(".scene");

function showScene(id) {
  scenes.forEach((s) => s.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");
}

// 要素取得
const btnStart = document.getElementById("btn-start");
const mirrorButton = document.getElementById("magic-mirror");
const btnBackA = document.getElementById("btn-back-a");
const btnToB = document.getElementById("btn-to-b");
const btnBackB = document.getElementById("btn-back-b");
const btnSendThought = document.getElementById("btn-send-thought");
const btnToC = document.getElementById("btn-to-c");
const btnBackC = document.getElementById("btn-back-c");
const btnToD = document.getElementById("btn-to-d");
const btnNewQuestion = document.getElementById("btn-new-question");
const btnRestart = document.getElementById("btn-restart");

const choiceButtons = document.querySelectorAll(".btn.choice");
const choiceReflection = document.getElementById("choice-reflection");

const inputThought = document.getElementById("input-thought");
const mirrorResponse = document.getElementById("mirror-response");

const mirrorQuestion = document.getElementById("mirror-question");

// =====================
// ノベルパート（Scene A）
// =====================
choiceButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    choiceButtons.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    btnToB.disabled = false;

    const type = btn.getAttribute("data-choice");
    switch (type) {
      case "body":
        choiceReflection.textContent =
          "──自分の身体や見た目のこと。どんな感覚も、「こう感じちゃいけない」はここにはない。";
        break;
      case "relation":
        choiceReflection.textContent =
          "──人との距離感や関係のこと。近すぎても、遠すぎても、揺れるのは自然なことかもしれない。";
        break;
      case "words":
        choiceReflection.textContent =
          "──言葉にしにくいモヤモヤ。はっきりしていない状態のまま、ここに置いておいてもいい。";
        break;
      default:
        choiceReflection.textContent =
          "（どれを選んでも、「間違い」にはならない。）";
    }
  });
});

// =====================
// 内省パート（Scene B）
// =====================

// 擬似AIレスポンス生成
function buildMirrorResponse(text) {
  const trimmed = text.trim();

  if (!trimmed) {
    return "何も書けない感じも、ちゃんとひとつの“状態”だと思う。いまは、ただ鏡の前に座っているだけでも大丈夫。";
  }

  if (trimmed.length <= 15) {
    return `短いけれど、その一言にいまのあなたの温度が入っている気がする。「${trimmed}」と感じている自分を、少しだけそっと抱えてみてもいいかもしれない。`;
  }

  if (trimmed.length <= 80) {
    return `丁寧に書いてくれてありがとう。ここに書かれた「${trimmed}」は、この先も変化していく途中の景色かもしれない。いまの時点の自分の輪郭として、鏡がそっと受け取っている。`;
  }

  return "たくさんの言葉をここに預けてくれてありがとう。全部を一度に整理しなくても、少しずつ読み返したり、別の角度から見てみたりしていい。鏡は、あなたのペースを急かさずに見守っている。";
}

btnSendThought.addEventListener("click", () => {
  const text = inputThought.value;
  const response = buildMirrorResponse(text);
  mirrorResponse.textContent = response;
  mirrorResponse.classList.add("visible");
});

// =====================
// 問いパート（Scene D）
// =====================

const questions = [
  "最近の自分を思い浮かべたとき、「この瞬間の自分は好きかもしれない」と思える場面はどんなとき？",
  "誰にも言っていないけれど、心の中で何度もリピートしている言葉やフレーズはある？",
  "子どもの頃の自分に、いまのあなたはどんな一言をかけてみたい？",
  "「こうあらなきゃいけない」と無意識に思っているルールの中で、そっと緩めてみたいものはある？",
  "自分の性やジェンダーについて、安心して話せる場所や相手は、いまどれくらいあると感じる？",
  "人から見た“自分らしさ”と、自分で感じている“自分らしさ”に、どんなズレがある？",
  "今日の自分に、「ありがとう」と言えることをひとつだけ挙げるとしたら、何が思い浮かぶ？"
];

function pickRandomQuestion() {
  const idx = Math.floor(Math.random() * questions.length);
  mirrorQuestion.textContent = questions[idx];
}

// =====================
// シーン遷移ボタン
// =====================

// intro → A
function goToSceneA() {
  showScene("scene-a");
}

btnStart.addEventListener("click", goToSceneA);
mirrorButton.addEventListener("click", goToSceneA);

// A 戻る
btnBackA.addEventListener("click", () => {
  showScene("scene-intro");
});

// A → B
btnToB.addEventListener("click", () => {
  showScene("scene-b");
});

// B 戻る
btnBackB.addEventListener("click", () => {
  showScene("scene-a");
});

// Cへ進む
btnToC.addEventListener("click", () => {
  showScene("scene-c");
});

// C 戻る
btnBackC.addEventListener("click", () => {
  showScene("scene-b");
});

// Dへ進む
btnToD.addEventListener("click", () => {
  showScene("scene-d");
  pickRandomQuestion();
});

// D: 新しい問い
btnNewQuestion.addEventListener("click", () => {
  pickRandomQuestion();
});

// D: 最初に戻る
btnRestart.addEventListener("click", () => {
  // 軽く状態リセット
  choiceButtons.forEach((b) => b.classList.remove("selected"));
  btnToB.disabled = true;
  choiceReflection.textContent = "（どれを選んでも、「間違い」にはならない。）";
  inputThought.value = "";
  mirrorResponse.textContent = "";
  mirrorResponse.classList.remove("visible");
  showScene("scene-intro");
});

// 初期状態
pickRandomQuestion();
