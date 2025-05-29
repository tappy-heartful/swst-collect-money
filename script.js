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

  // 各要素に対して値を設定
  document
    .getElementsByName('perPerson')
    .forEach((element) => (element.textContent = perPerson));
  document
    .getElementsByName('totalToSend')
    .forEach((element) => (element.textContent = adjustedTotal));
  document
    .getElementsByName('totalToSendReduce')
    .forEach((element) => (element.textContent = reducedTotal));

  generateAnnouncementText(perPerson); // アナウンステキストを生成

  // 入力値をlocalStorageに保存
  localStorage.setItem('totalAmount', totalAmount);
  localStorage.setItem('numPeople', numPeople);
}

// アナウンステキストを生成する関数
function generateAnnouncementText(perPerson) {
  // paypay受け取りリンク有効期限算出
  let date = new Date();
  date.setDate(date.getDate() + 14);
  let formattedDate = date.toISOString().split('T')[0].replace(/-/g, '/');
  const announcementText = `
【[集金名]の集金】

お疲れ様です、会計です
[集金名]の集金を行いたいと思います
お支払いが難しい場合、私までご連絡ください

※また、送金前にPayPay表示名を「送金者が識別できる程度のもの」に設定お願いします
https://paypay.ne.jp/app-view/edit-profile/#w_outlink

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
[請求リンク]
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
});
