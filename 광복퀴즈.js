
const problems = [
  { img: "pictures/1-문제 1.png", answer: 1 },
  { img: "pictures/2-문제 2.png", answer: 2 },
  { img: "pictures/3-문제 3.png", answer: 2 },
  { img: "pictures/4-문제 4.png", answer: 2 },
  { img: "pictures/5-문제 5.png", answer: 1 },
  { img: "pictures/6-문제 6.png", answer: 1 },
  { img: "pictures/7-문제 7.png", answer: 2 },
  { img: "pictures/8-문제 8.png", answer: 2 },
  { img: "pictures/9-문제 9.png", answer: 1 },
  { img: "pictures/10-문제 10.png", answer: 1 },
  { img: "pictures/11-문제 11.png", answer: 3 },
  { img: "pictures/12-문제 12.png", answer: 1 },
  { img: "pictures/13-문제 13.png", answer: 2 },
  { img: "pictures/14-문제 14.png", answer: 1 },
  { img: "pictures/15-문제 15.png", answer: 4 },
  { img: "pictures/16-문제 16.png", answer: 3 },
  { img: "pictures/17-문제 17.png", answer: 1 },
  { img: "pictures/18-문제 18.png", answer: 1 },
  { img: "pictures/19-문제 19.png", answer: 2 },
  { img: "pictures/20-문제 20.png", answer: 2 },
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
     <div style="margin:18px 0;">등급: ${level}</div>
     <button class="answer-btn" onclick="location.reload()">제출</button>`;
}