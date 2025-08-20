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
    document
      .getElementsByName('perPerson')
      .forEach((element) => (element.textContent = '-'));
    document
      .getElementsByName('totalToSend')
      .forEach((element) => (element.textContent = '-'));
    document
      .getElementsByName('totalToSendReduce')
      .forEach((element) => (element.textContent = '-'));
    document
      .getElementsByName('announcementText')
      .forEach((element) => (element.value = '')); // アナウンステキストを空にする
    return;
  }

  let perPerson = Math.ceil(totalAmount / numPeople);
  let adjustedTotal = numPeople * perPerson;
  let reducedTotal = numPeople * perPerson - perPerson;

  // 各要素に対して値を設定（強調クラス適用）
  document.getElementsByName('perPerson').forEach((element) => {
    element.textContent = perPerson;
    element.classList.add('result-highlight');
  });

  document.getElementsByName('totalToSend').forEach((element) => {
    element.textContent = adjustedTotal;
    element.classList.add('result-highlight');
  });

  document.getElementsByName('totalToSendReduce').forEach((element) => {
    element.textContent = reducedTotal;
    element.classList.add('result-highlight');
  });

  generateAnnouncementText(perPerson);
}

// アナウンステキストを生成する関数
function generateAnnouncementText(perPerson) {
  let collectionName = document.getElementById('collectionName').value.trim();
  let collectionDate = document
    .getElementById('collectionDate')
    .value.trim()
    .replace(/-/g, '/'); // 日付をスラッシュ区切りに変換
  let paymentLink = document.getElementById('paymentLink').value.trim();

  if (!collectionName) collectionName = '[集金名]';
  if (!collectionDate) collectionDate = '[日付]';
  if (!paymentLink) paymentLink = '[請求リンク]';

  // 支払い期限（2週間後）
  let date = new Date();
  date.setDate(date.getDate() + 14);
  let formattedDate = date.toISOString().split('T')[0].replace(/-/g, '/');

  const announcementText = `
【${collectionDate} ${collectionName}の集金】

お疲れ様です、会計です💰
${collectionDate} ${collectionName}の集金を行いたいと思います

以下をご確認の上、お支払いをお願いいたします
https://tappy-heartful.github.io/swst-collect-money/member/pay-guide.html

⭐お支払い金額
・1人${perPerson}円

⭐お支払い期限(リンク有効期限)
・${formattedDate}

⭐対象者
〇サックス
・たっぴさん
・ゆやまさん
・なっちさん
・あみさん
・えりー
・やぶさん
・やまとくん
・櫻井くん

〇トロンボーン
・朝廣さん
・岡田さん
・村上さん
・なんちゃん
・マイオニー

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
${paymentLink}
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

  // ボタンにフォーカスを当てる
  button.focus();

  // 1秒後に元に戻す
  setTimeout(() => {
    button.textContent = 'コピー';
  }, 1000);
}

document.addEventListener('DOMContentLoaded', function () {
  // 初期値設定（localStorageから取得した値を使用）
  const savedTotalAmount = localStorage.getItem('totalAmount');
  const savedNumPeople = localStorage.getItem('numPeople');

  // localStorageに保存された値があれば、それを使って初期化
  document.getElementById('totalAmount').value = savedTotalAmount
    ? savedTotalAmount
    : 3000;
  document.getElementById('numPeople').value = savedNumPeople
    ? savedNumPeople
    : 20;

  // 計算の初期化
  calculate();

  // 入力イベントの追加
  document.getElementById('totalAmount').addEventListener('input', calculate);
  document.getElementById('numPeople').addEventListener('input', calculate);
  document
    .getElementById('collectionName')
    .addEventListener('input', calculate);
  document.getElementById('paymentLink').addEventListener('input', calculate);
  document
    .getElementById('collectionDate')
    .addEventListener('input', calculate);
});
