// questions for the quiz --------------------------------------------
const questions = [
  {
    question: "The web is based on?",
    choices: ["HTML", "Images", "Text", "Information"],
    correct: 0,
  },
  {
    question: "What is a web browser?",
    choices: [
      "Something in my dashboard",
      "Used to make web pages",
      "Software application for retrieving and presenting information on the web",
      "All the above",
    ],
    correct: 2,
  },
  {
    question: "What is web hosting?",
    choices: [
      "A domain name",
      "Something people view with a browser",
      "Online space for web site and data",
      "All the above",
    ],
    correct: 2,
  },

  {
    question: "What is the correct HTML tag for inserting a line break?",
    choices: ["Lb", "Break", "b", "br"],
    correct: 3,
  },
  {
    question: " What does FTP stand for?",
    choices: [
      "Files To Put online",
      "File transfer protocol",
      "File Transfer Please",
      "File Topology Please",
    ],
    correct: 1,
  },
];
//////////////////////////////////////////////////////////////////////

// html elements
const quizContainer = document.querySelector(".quiz-container");
const questionElement = document.querySelector(".quiz-container>h2");
const radios = document.querySelectorAll("input[type='radio']");
const labels = document.querySelectorAll("label");
const submitBtn = document.querySelector("button.submit");
const resultContainer = document.querySelector(".result-container");
const resultHeading = document.querySelector(".result-container h2");

// reload button is created
const reloadButton = document.createElement("button");
reloadButton.classList.add("reload");
reloadButton.innerHTML = "Reload";
reloadButton.addEventListener("click", () => {
  location.reload();
});
//////////////////////////////////////////////////////////////////////

// global variables
// the user answers will be stored here
const userAnswers = [];

// index used to iterate on the questions
let questionIndex = 0;
//////////////////////////////////////////////////////////////////////

function loadNextQuestion() {
  // updating question
  questionElement.innerHTML = `${questionIndex + 1}/${questions.length}: ${
    questions[questionIndex].question
  }`;
  // updating choices
  labels.forEach((label, idx) => {
    label.innerHTML = questions[questionIndex].choices[idx];
  });
  // clearing radio inputs
  radios.forEach((radio) => {
    radio.checked = false;
  });
  // incrementing the global question index
  questionIndex++;
}

//////////////////////////////////////////////////////////////////////

// event listener for submit button in quiz container
submitBtn.addEventListener("click", () => {
  // find the selected answer
  let selectedAnswer = -1;
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked === true) {
      selectedAnswer = i;
      break;
    }
  }

  // store the selected answer
  userAnswers.push(selectedAnswer);

  // load new questions if available
  if (questionIndex < questions.length) {
    loadNextQuestion();
  }
  // else load the result
  else {
    // counting the number of correct answers
    let numberOfCorrectAnswers = 0;
    for (let i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i] === questions[i].correct) {
        numberOfCorrectAnswers++;
      }
    }

    // making the quiz-container invisible
    // and making the result-container visible
    quizContainer.classList.add("invisible");
    resultContainer.classList.remove("invisible");

    // "x/y questions correct"
    resultHeading.innerHTML = `You answered ${numberOfCorrectAnswers}/${questions.length} questions correctly!`;

    // display all the questions along with their correct answers
    questions.forEach((element) => {
      // create a new div to store the question and answer
      const questionAnswerDiv = document.createElement("div");
      questionAnswerDiv.innerHTML = `<h4>${element.question}</h4>
        <p>Correct Answer: ${element.choices[element.correct]}</p>`;
      questionAnswerDiv.classList.add("question-answer");
      // append this div into result container
      resultContainer.appendChild(questionAnswerDiv);
    });
    // append the reload button
    resultContainer.appendChild(reloadButton);
  }
});

// load the first question
loadNextQuestion();
