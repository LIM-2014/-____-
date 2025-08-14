let forceShow = false;

function getKSTDate() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (9 * 60 * 60 * 1000));
}

function getKSTDateObj(year, month, day, hour=0, minute=0, second=0) {
  // month는 1~12로 입력
  const utcDate = Date.UTC(year, month - 1, day, hour - 9, minute, second);
  return new Date(utcDate);
}

function updateCountdown() {
  const now = getKSTDate();
  const target = getKSTDateObj(now.getFullYear(), 8, 15, 0, 0, 0); // KST 8월 15일 0시
  console.log('KST now:', now, 'forceShow:', forceShow);
  const countdownArea = document.getElementById('countdown-area');

  if (!forceShow && now < target) {
    const diff = target - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownArea.innerHTML =
      `<strong>퀴즈는 8월 15일 이후 공개됩니다!</strong><br>
      남은 시간: ${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
    countdownArea.style.display = "block";
    document.querySelector('.quiz-area').style.display = "none";
  } else {
    countdownArea.style.display = "none";
    document.querySelector('.quiz-area').style.display = "block";
    showProblem();
  }
}

setInterval(updateCountdown, 1000);
window.onload = updateCountdown;

const problems = [
  { img: "1-문제 1.png", answer: 1 },
  { img: "2-문제 2.png", answer: 2 },
  { img: "3-문제 3.png", answer: 2 },
  { img: "4-문제 4.png", answer: 2 },
  { img: "5-문제 5.png", answer: 1 },
  { img: "6-문제 6.png", answer: 1 },
  { img: "7-문제 7.png", answer: 2 },
  { img: "8-문제 8.png", answer: 2 },
  { img: "9-문제 9.png", answer: 1 },
  { img: "10-문제 10.png", answer: 1 },
  { img: "11-문제 11.png", answer: 3 },
  { img: "12-문제 12.png", answer: 1 },
  { img: "13-문제 13.png", answer: 2 },
  { img: "14-문제 14.png", answer: 1 },
  { img: "15-문제 15.png", answer: 4 },
  { img: "16-문제 16.png", answer: 3 },
  { img: "17-문제 17.png", answer: 1 },
  { img: "18-문제 18.png", answer: 1 },
  { img: "19-문제 19.png", answer: 2 },
  { img: "20-문제 20.png", answer: 2 },
];

let current = 0;
let score = 0;

function getScore(idx) {
  if (idx < 7) return 3;
  if (idx < 14) return 5;
  return 7.5;
}

function showProblem() {
  if (current >= problems.length) {
    showResult();
    return;
  }
  document.getElementById('quiz-img').src = problems[current].img;
  document.getElementById('answerInput').value = "";
  document.getElementById('result').textContent = "";
  document.getElementById('answerInput').disabled = false;
  document.querySelector('.answer-btn').style.display = "block";
  document.getElementById('nextBtn').style.display = "none";
}

function checkAnswer() {
  const userInput = document.getElementById('answerInput').value;
  const resultDiv = document.getElementById('result');
  document.getElementById('answerInput').disabled = true;
  document.querySelector('.answer-btn').style.display = "none";
  document.getElementById('nextBtn').style.display = "block";
  if (parseInt(userInput) === problems[current].answer) {
    resultDiv.textContent = "정답입니다!";
    resultDiv.style.color = "#1976d2";
    score += getScore(current);
  } else {
    resultDiv.textContent = "오답입니다.";
    resultDiv.style.color = "#d32f2f";
  }
}

function nextQuestion() {
  current++;
  showProblem();
}

function showResult() {
  let level = "";
  const totalScore = 100;
  const percent = (score / totalScore) * 100;
  if (percent === 100) {
    level = "광복절 마스터";
  } else if (percent >= 90) {
    level = "역사 지킴이";
  } else if (percent >= 70) {
    level = "애국 도전자";
  } else {
    level = "더 공부해보세요";
  }
  document.querySelector('.quiz-area').innerHTML =
    `<div style="font-size:1.3em; font-weight:bold;">퀴즈 완료!</div>
     <div style="margin:18px 0;">총 점수: ${score} / 100</div>
     <div style="margin:18px 0;">등급: ${level}</div>`;
}
