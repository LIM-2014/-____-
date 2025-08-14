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
