const question = document.getElementById('question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBalFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true;
let score = 0;
let qestionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question:'Jak ma na imię najpiękniejszy pies na świecie',
        choice1: 'Frania',
        choice2: 'Dina',
        choice3: 'Misia',
        choice4: 'Bambi',
        answer: 1,
    },
    {
        question:'Kto w pracy uzywa stetoskopu',
        choice1: 'Lesnik',
        choice2: 'Policjant',
        choice3: 'Hutnik',
        choice4: 'Lekarz',
        answer: 4,
    },
    {
        question:'Jak miała na imię Samosia z popularnego wiersza ?',
        choice1: 'Jadzia',
        choice2: 'Madzia',
        choice3: 'Zosia',
        choice4: 'Ania',
        answer: 3,
    },
    {
        question:'Komputery w obliczeniach najczęściej posługują się systemem:',
        choice1: 'Dwójkowym',
        choice2: 'Dziesiętnym',
        choice3: 'Siódemkowym',
        choice4: 'Jedenastkowym',
        answer: 1,
    }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}


getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}


choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if( !acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
         
    }, 1000)
})
})

incementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()