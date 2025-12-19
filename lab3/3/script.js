function randomScore() {
    for(let i = 1; i <= 8; i++) {
        const randomNumber = Math.floor(Math.random() * (100 - 40 + 1)) + 40;
        document.getElementById("score" + i).innerHTML = randomNumber;
    }
}

function calcGrade(score) {
    if (score >= 80) {
        return "A";
    } else if (score >= 70) {
        return "B";
    } else if (score >= 60) {
        return "C";
    } else if (score >= 50) {
        return "D";
    } else {
        return "F";
    }
}
randomScore();

function displayGrade() {
    for (let i = 1; i <= 8; i++) {
        const scoreElement = document.getElementById("score" + i);
        const score = scoreElement.innerHTML;
        document.getElementById("grade" + i).innerHTML = calcGrade(score);
    }
}