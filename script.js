// 必要になったらここに機能を追加
console.log("My Hidden Side Loaded");
// モーダル開閉
const modalOverlay = document.getElementById("modalOverlay");
document.getElementById("openModal").onclick = () => {
    modalOverlay.style.display = "flex";
};

document.getElementById("closeModal").onclick = () => {
    modalOverlay.style.display = "none";
};


// 送信処理
document.getElementById("sendBtn").onclick = () => {
    const text = document.getElementById("userInput").value.trim();
    const responseBox = document.getElementById("responseBox");
    const responseText = document.getElementById("responseText");

    if (text === "") return;

    // 敬体の寄り添いメッセージ（レベル3）
    const reply =
        "その気持ちを書いてくださってありがとうございます。 " +
        "あなたがそう感じた背景には、きっと大切な理由があったのだと思います。 " +
        "もし負担にならなければで大丈夫ですが、" +
        "“その考えにたどりつくまでの流れ” を少し振り返ってみると、 " +
        "どんな出来事や気持ちがつながっていそうでしょうか？";

    responseText.textContent = reply;
    responseBox.style.display = "block";
};
