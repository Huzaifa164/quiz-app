const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { answer: "Shark", correct: false },
      { answer: "Blue Whale", correct: true },
      { answer: "Elephant", correct: false },
      { answer: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { answer: "Vatican City", correct: true },
      { answer: "Bhutan", correct: false },
      { answer: "Nepal", correct: false },
      { answer: "Sri Lanka", correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { answer: "Kalahari", correct: false },
      { answer: "Gobi", correct: false },
      { answer: "Sahara", correct: true },
      { answer: "Antarctica", correct: false },
    ],
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { answer: "Asia", correct: false },
      { answer: "Australia", correct: true },
      { answer: "Arctic", correct: false },
      { answer: "Africa", correct: false },
    ],
  },
];

let questionText = document.getElementById("question-text");
let answerContainer = document.getElementById("answer-container");
let nextButton = document.getElementById("next-button");

let score = 0;
let questionIndex = 0;

function startQuiz() {
  score = 0;
  questionIndex = 0;
  nextButton.removeEventListener("click", startQuiz);
  nextButton.innerHTML = "Next";
  loadNewQuestion(questionIndex);
}

function loadNewQuestion(index) {
  console.log(index);
  removePreviousQuestion();
  questionText.innerHTML = `${index + 1}. ${questions[index].question}`;
  let answerElementArray = questions[index].answers;
  answerElementArray.forEach((answerElement) => {
    const answerButton = document.createElement("button");
    answerButton.classList.add("answer-button");
    answerButton.innerHTML = answerElement.answer;
    answerContainer.appendChild(answerButton);
    answerButton.dataset.correct = answerElement.correct;
    answerButton.addEventListener("click", checkAnswer);
  });
}

function removePreviousQuestion() {
  while (answerContainer.hasChildNodes()) {
    answerContainer.removeChild(answerContainer.firstChild);
  }
}

function checkAnswer(event) {
  let answerElement = event.target;
  if (answerElement.dataset.correct === "true") {
    answerElement.style.backgroundColor = "#9aeabc";
    score++;
  } else {
    answerElement.style.backgroundColor = "#ff9393";
  }
  answerContainer.childNodes.forEach((childNode) => {
    if (childNode.dataset.correct === "true") {
      childNode.style.backgroundColor = "#9aeabc";
    }
    childNode.disabled = true;
  });
  nextButton.style.display = "block";
  questionIndex++;

  nextButton.addEventListener("click", () => {
    if (questionIndex === questions.length) {
      questionText.innerHTML = `<h2 id="question-text">You scored ${score} out of 4</h2>`;
      answerContainer.innerHTML = ``;
      nextButton.innerHTML = "Play Again";
      nextButton.addEventListener("click", startQuiz);
    } else {
      loadNewQuestion(questionIndex);
    }
  });
}

startQuiz();
