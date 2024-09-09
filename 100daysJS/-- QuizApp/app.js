// create a quiz class

class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

// create a question class

class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

// display question

function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        // show (next) question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // show options
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    };
}

// show quiz progress
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let ProgressElement = document.getElementById("progress");
    ProgressElement.innerHTML = `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
}

// show score
function showScores() {
    let quizEndHTML = 
    `
        <h1>Quiz Completed</h1>
        <h2 id='score'> You scored: ${quiz.score} of ${quiz.questions.length}</h2>
        <div class="quiz-repeat">
            <a href="index.html">Take Quiz Again</a>
        </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
};

// create quiz questions
let questions = [
    new Question(
        "How much does Tom love men?",
        ["more than Harry", "less than Harry", "enough to make it his full time profession", "he doesn't know any to love"],
        "less than Harry"
    ),

    new Question(
        "Who is mum's favourite?",
        ["Harry", "Tom", "Sweep", "Jess"],
        "Jess"
    ),

    new Question(
        "Does Harry have muscles?",
        ["none in his head", "he looks like the rock", "less than Jack (proved by Croatia photo)", "he does not eat enough to get gains"],
        "less than Jack (proved by Croatia photo)"
    ),

    new Question(
        "Who is dad's favourite?",
        ["he feels no emotions", "Mum", "his bike", "Jess"],
        "his bike"
    ),

    new Question(
        "Who is the perfect example of a human?",
        ["Tom", "Mum", "Harry", "Jess"],
        "Jess"
    ),

    new Question(
        "What would Harry rather do than spend time with Jess?",
        ["S**t in his hands and clap", "S**t on the floor, then clap", "Tell the family the truth about his job", "Shave his head to show the golden arches"],
        "S**t on the floor, then clap"
    )
];

let quiz = new Quiz(questions);

// display the questions
displayQuestion();

// add a countdown

let time = 5;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountDown() {
    let quizTimer = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        }
        else {
            quizTime --;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }

    }, 1000)
}

startCountDown();
