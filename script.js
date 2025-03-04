function calculate() {
  let totalAmountInput = document.getElementById('totalAmount');
  let numPeopleInput = document.getElementById('numPeople');
  let totalAmount = parseInt(totalAmountInput.value);
  let numPeople = parseInt(numPeopleInput.value);
  let totalAmountError = document.getElementById('totalAmountError');
  let numPeopleError = document.getElementById('numPeopleError');
  let invalidPeopleError = document.getElementById('invalidPeopleError');

  let valid = true;

  if (isNaN(totalAmount) || totalAmount <= 0) {
    totalAmountInput.classList.add('error');
    totalAmountError.style.display = 'block';
    valid = false;
  } else {
    totalAmountInput.classList.remove('error');
    totalAmountError.style.display = 'none';
  }

  if (isNaN(numPeople) || numPeople <= 0) {
    numPeopleInput.classList.add('error');
    numPeopleError.style.display = 'block';
    valid = false;
  } else {
    numPeopleInput.classList.remove('error');
    numPeopleError.style.display = 'none';
  }

  // 新規エラーチェック：人数が合計金額より大きい場合
  if (numPeople > totalAmount) {
    numPeopleInput.classList.add('error');
    invalidPeopleError.style.display = 'block';
    valid = false;
  } else {
    numPeopleInput.classList.remove('error');
    invalidPeopleError.style.display = 'none';
  }

  if (!valid) {
    document.getElementById('perPerson').textContent = '-';
    document.getElementById('totalToSend').textContent = '-';
    document.getElementById('totalToSendReduce').textContent = '-';
    document.getElementById('announcementText').value = ''; // アナウンステキストを空にする
    return;
  }

  let perPerson = Math.ceil(totalAmount / numPeople);
  let adjustedTotal = numPeople * perPerson;
  let reducedTotal = numPeople * perPerson - perPerson;

  document.getElementById('perPerson').textContent = perPerson;
  document.getElementById('totalToSend').textContent = adjustedTotal;
  document.getElementById('totalToSendReduce').textContent = reducedTotal;

  generateAnnouncementText(perPerson); // アナウンステキストを生成
}

// アナウンステキストを生成する関数
function generateAnnouncementText(perPerson) {
  const announcementText = `
【〇〇集金】

お疲れ様です、会計です
〇〇の集金を行いたいと思います
お忙しいとは思いますが、下記リンクよりお支払いをお願いします

※また、送金者識別のため、送金前にPayPay表示名の確認をお願いします
https://paypay.ne.jp/app-view/edit-profile/#w_outlink

⭐お支払い金額
・1人${perPerson}円

⭐お支払い期限(リンク有効期限)
・yyyy/MM/dd

⭐対象者
〇サックス
・たっぴさん
・ゆやまさん
・なっちさん
・あみさん
・えりー
・やぶさん

〇トロンボーン
・オザキさん
・岡田さん
・村上さん
・なんちゃん

〇トランペット
・のぞえさん
・ゆいちゃん
・やのさん
・かじやまさん

〇ドラム
・きむらさん
・ごろりさん
・みどりさん

〇ギター
・みずきち
・松下さん

〇ピアノ
・高松さん
・咲人くん

⭐支払いリンク
[支払いリンク]
      `;

  const textarea = document.getElementById('announcementText');
  textarea.value = announcementText;
}

// クリップボードにコピーする関数
function copyToClipboard() {
  const textarea = document.getElementById('announcementText');
  textarea.select();
  document.execCommand('copy');

  // ボタン文言をチェックマークに変更
  const button = document.querySelector('.copy-button');
  button.textContent = '✔ ';

  // 1秒後に元に戻す
  setTimeout(() => {
    button.textContent = 'コピー';
  }, 1000);
}

document.addEventListener('DOMContentLoaded', function () {
  // 初期値設定
  document.getElementById('totalAmount').value = 3000;
  document.getElementById('numPeople').value = 20;

  // 計算の初期化
  calculate();

  // 入力イベントの追加
  document.getElementById('totalAmount').addEventListener('input', calculate);
  document.getElementById('numPeople').addEventListener('input', calculate);
});
