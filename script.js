const questions = [
    {
        question: "Which is largest animal in the world",
        answer: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Which is smallest country in the world",
        answer: [
            { text: "Vatican City", correct: true },
            { text: "Bhutan", correct: false },
            { text: "Nepal", correct: false },
            { text: "Sri Lanka", correct: false },
        ]
    },
    {
        question: "Which is largest desert in the world",
        answer: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true },
        ]
    },
    {
        question: "Which is smallest continent in the world",
        answer: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false },
        ]
    }
];

const questionElement = document.querySelector("#question");
const answerButtonContainer = document.querySelector("#answer-btns");
const nextBtn = document.querySelector("#next-btn");

let currQuestionIdx = 0;
let score = 0;

const startQuiz = () => {
    currQuestionIdx = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
};

const showQuestion = () => {
    resetState();
    const currQuestion = questions[currQuestionIdx];
    const questionNo = currQuestionIdx + 1;
    questionElement.innerHTML = questionNo + ". " + currQuestion.question;
    currQuestion.answer.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtonContainer.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAns);
    });
};

const resetState = () => {
    nextBtn.style.display = "none";
    while (answerButtonContainer.firstChild) {
        answerButtonContainer.removeChild(answerButtonContainer.firstChild);
    }
};

const selectAns = (e) => {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    // Apply styles directly based on correctness
    if (isCorrect) {
        selectedBtn.style.backgroundColor = "#9aeabc"; // Green background for correct answer
        score++; // Increment score for correct answer
    } else {
        selectedBtn.style.backgroundColor = "#ff9393"; // Red background for incorrect answer
    }

    // Disable all buttons after an answer is selected
    document.querySelectorAll('.btn').forEach(button => {
        button.disabled = true;
    });

    nextBtn.style.display = "block"; // Display the next button
};

const showScore = () => {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
};

const handleNextBtn = () => {
    currQuestionIdx++;
    if (currQuestionIdx < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
    nextBtn.innerHTML = "Next";
};

nextBtn.addEventListener("click", () => {
    if (currQuestionIdx < questions.length) {
        handleNextBtn();
    } else {
        startQuiz();
    }
});

startQuiz();
