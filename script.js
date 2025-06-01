const quizData = {
  HTML: [
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Modern Language"], answer: "Hyper Text Markup Language" },
    { question: "Which tag is used for inserting a line break?", options: ["<lb>", "<break>", "<br>", "<hr>"], answer: "<br>" },
    { question: "Choose the correct HTML element for the largest heading:", options: ["<h6>", "<heading>", "<h1>", "<head>"], answer: "<h1>" },
    { question: "Which of these is a semantic HTML tag?", options: ["<div>", "<span>", "<section>", "<br>"], answer: "<section>" },
    { question: "What is the correct HTML element for inserting an image?", options: ["<pic>", "<image>", "<img>", "<src>"], answer: "<img>" }
  ],
  CSS: [
    { question: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], answer: "Cascading Style Sheets" },
    { question: "Which property is used to change the background color?", options: ["bgcolor", "background", "background-color", "color"], answer: "background-color" },
    { question: "Which CSS property controls the text size?", options: ["text-style", "font-size", "font-style", "text-size"], answer: "font-size" },
    { question: "How do you select an element with the id 'header'?", options: ["#header", ".header", "header", "*header"], answer: "#header" },
    { question: "Which property is used to make text bold?", options: ["text-weight", "font-weight", "bold", "font-bold"], answer: "font-weight" }
  ],
  JavaScript: [
    { question: "Inside which HTML element do we put JavaScript?", options: ["<script>", "<js>", "<javascript>", "<code>"], answer: "<script>" },
    { question: "Which operator is used for strict equality?", options: ["==", "=", "===", "!="], answer: "===" },
    { question: "How do you write a comment in JavaScript?", options: ["<!-- Comment -->", "# Comment", "// Comment", "** Comment **"], answer: "// Comment" },
    { question: "Which method is used to output data to the console?", options: ["log()", "console.print()", "console.write()", "console.log()"], answer: "console.log()" },
    { question: "What keyword declares a variable in JavaScript?", options: ["int", "var", "let", "Both var and let"], answer: "Both var and let" }
  ]
};

let currentSubject = "";
let currentQuestionIndex = 0;
let score = 0;
let playerName = "";

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const subjectTitle = document.getElementById("subject-title");
const scoreEl = document.getElementById("score");
const subjectSelection = document.getElementById("subject-selection");
const nameEntry = document.getElementById("name-entry");
const historyBox = document.getElementById("score-history");

function submitName() {
  const input = document.getElementById("player-name");
  const name = input.value.trim();
  if (name === "") {
    alert("Please enter your name.");
    return;
  }
  playerName = name;
  nameEntry.classList.add("hide");
  subjectSelection.classList.remove("hide");
  showScoreHistory();
}

function startQuiz(subject) {
  currentSubject = subject;
  currentQuestionIndex = 0;
  score = 0;
  subjectSelection.classList.add("hide");
  quizBox.classList.remove("hide");
  subjectTitle.textContent = subject + " Quiz";
  loadQuestion();
}

function loadQuestion() {
  const currentQuiz = quizData[currentSubject];
  const current = currentQuiz[currentQuestionIndex];
  questionEl.textContent = current.question;
  optionsEl.innerHTML = "";

  current.options.forEach(opt => {
    const btn = document.createElement("div");
    btn.classList.add("option");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(btn, current.answer);
    optionsEl.appendChild(btn);
  });

  nextBtn.disabled = true;
}

function checkAnswer(selectedBtn, correctAnswer) {
  const options = document.querySelectorAll(".option");
  options.forEach(option => {
    option.style.pointerEvents = "none";
    if (option.textContent === correctAnswer) {
      option.classList.add("correct");
    }
    if (option !== selectedBtn && option.textContent === selectedBtn.textContent && selectedBtn.textContent !== correctAnswer) {
      option.classList.add("wrong");
    }
  });

  if (selectedBtn.textContent === correctAnswer) {
    score++;
  }

  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData[currentSubject].length) {
    loadQuestion();
  } else {
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    scoreEl.textContent = `Your Score: ${score}/${quizData[currentSubject].length}`;
    saveScore();
    showScoreHistory();
  }
};

function saveScore() {
  const record = {
    name: playerName,
    subject: currentSubject,
    score: `${score}/${quizData[currentSubject].length}`,
    time: new Date().toLocaleString()
  };

  let history = JSON.parse(localStorage.getItem("quizHistory")) || [];
  history.unshift(record);
  localStorage.setItem("quizHistory", JSON.stringify(history));
}

function showScoreHistory() {
  const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
  historyBox.innerHTML = "";
  history.slice(0, 5).forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.name} - ${entry.subject} - ${entry.score} (${entry.time})`;
    historyBox.appendChild(li);
  });
}

window.onload = () => {
  nextBtn.disabled = true;
  quizBox.classList.add("hide");
  resultBox.classList.add("hide");
  subjectSelection.classList.add("hide");
};
