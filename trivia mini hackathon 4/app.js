let player1 = { name: '', score: 0, answers: [] };
let player2 = { name: '', score: 0, answers: [] };
let currentPlayer;
let usedCategories = [];
let selectedCategory = '';
let questions = [];
let questionIndex = 0;
let player1QuestionsCount = 0;
let player2QuestionsCount = 0;
const apiUrl = 'https://the-trivia-api.com/v2/questions';

function startGame() {
    player1.name = document.getElementById('player1-name').value;
    player2.name = document.getElementById('player2-name').value;
    if (player1.name === '' || player2.name === '') {
        alert('Please enter names for both players.');
        return;
    }
    currentPlayer = player1;
    document.getElementById('setup-phase').style.display = 'none';
    document.getElementById('category-phase').style.display = 'block';
    fetchCategories();
}

function fetchCategories() {
    const categories = ["General Knowledge", "Science", "History", "Geography", "Sports", "Entertainment"];
    const categoriesDiv = document.getElementById('categories');
    categoriesDiv.innerHTML = '';
    categories.forEach(category => {
        if (!usedCategories.includes(category)) {
            const button = document.createElement('button');
            button.innerText = category;
            button.onclick = () => selectCategory(category);
            categoriesDiv.appendChild(button);
        }
    });
}

function selectCategory(category) {
    selectedCategory = category.toLowerCase().replace(' ', '_');
    usedCategories.push(category);

    const categoryButtons = document.querySelectorAll('#categories button');
    categoryButtons.forEach(button => {
        if (button.innerText === category) {
            button.disabled = true;
            button.style.backgroundColor = '#ccc';
            button.style.cursor = 'not-allowed';
        }
    });

    document.getElementById('category-phase').style.display = 'none';
    fetchQuestions();
}

function fetchQuestions() {
    const difficulties = ['easy', 'medium', 'hard'];
    questions = [];

    let promises = difficulties.map(difficulty => {
        return fetch(`${apiUrl}?categories=${selectedCategory}&difficulty=${difficulty}&limit=2`)
            .then(response => response.json())
            .then(data => {
                questions = questions.concat(data);
            });
    });

    Promise.all(promises).then(() => {
        questions = shuffleArray(questions);
        questionIndex = 0;
        showQuestion();
    });
}

function showQuestion() {
    if (questionIndex >= questions.length) {
        endRound();
        return;
    }

    document.getElementById('question-phase').style.display = 'block';
    document.getElementById('category-text').innerText = `Category: ${selectedCategory.replace('_', ' ').toUpperCase()}`;
    document.getElementById('player-info').innerHTML = `Current Player: <span style="color: ${currentPlayer === player1 ? '#00796b' : '#0a5ba1'};">${currentPlayer.name}</span>`;

    if (currentPlayer === player1) {
        player1QuestionsCount++;
        document.getElementById('question-number').innerText = `Question ${player1QuestionsCount}`;
    } else {
        player2QuestionsCount++;
        document.getElementById('question-number').innerText = `Question ${player2QuestionsCount}`;
    }

    const question = questions[questionIndex];
    document.getElementById('question-text').innerText = question.question.text;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';

    const allAnswers = [...question.incorrectAnswers, question.correctAnswer];
    shuffleArray(allAnswers);

    allAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.onclick = () => checkAnswer(answer, question.correctAnswer, question.difficulty, question.question.text);
        answersDiv.appendChild(button);
    });
}

function checkAnswer(answer, correctAnswer, difficulty, questionText) {
    const answerObject = {
        question: questionText,
        selectedAnswer: answer,
        correctAnswer: correctAnswer,
    };
    if (answer === correctAnswer) {
        updateScore(difficulty);
    }

    currentPlayer.answers.push(answerObject);

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    questionIndex++;
    showQuestion();
}

function updateScore(difficulty) {
    let points = 0;
    if (difficulty === 'easy') points = 10;
    else if (difficulty === 'medium') points = 15;
    else if (difficulty === 'hard') points = 20;
    currentPlayer.score += points;
}

function endRound() {
    document.getElementById('question-phase').style.display = 'none';
    document.getElementById('category-phase').style.display = 'block';
    if (usedCategories.length >= 6) { 
        endGame();
    }
}
function endGame() {
    document.getElementById('category-phase').style.display = 'none';
    document.getElementById('end-phase').style.display = 'block';

    let resultsTable = '<table>';
    resultsTable += '<tr><th>Question</th><th>Correct Answer</th><th>Player 1 Answer</th><th>Player 2 Answer</th></tr>';

    player1.answers.forEach((answer, index) => {
        resultsTable += `<tr>
            <td>${answer.question}</td>
            <td>${answer.correctAnswer}</td>
            <td>${answer.selectedAnswer}</td>
            <td>${player2.answers[index] ? player2.answers[index].selectedAnswer : 'N/A'}</td>
        </tr>`;
    });

    player2.answers.forEach((answer, index) => {
        if (!player1.answers[index]) {
            resultsTable += `<tr>
                <td>${answer.question}</td>
                <td>${answer.correctAnswer}</td>
                <td>${player1.answers[index] ? player1.answers[index].selectedAnswer : 'N/A'}</td>
                <td>${answer.selectedAnswer}</td>
            </tr>`;
        }
    });

    resultsTable += '</table>';
    document.getElementById('final-scores').innerHTML = resultsTable;

    let winnerText;
    if (player1.score > player2.score) {
        winnerText = `<p style="color: #00796b; margin: 0;">${player1.name} wins with ${player1.score} points!</p>`;
        winnerText += `<p style="color: #a10a0a; margin: 0;">${player2.name} loses with ${player2.score} points.</p>`;
    } else if (player2.score > player1.score) {
        winnerText = `<p style="color: #0a5ba1; margin: 0;">${player2.name} wins with ${player2.score} points!</p>`;
        winnerText += `<p style="color: #a10a0a; margin: 0;">${player1.name} loses with ${player1.score} points.</p>`;
    } else {
        winnerText = `<p style="margin: 0;">It's a tie! Both players scored ${player1.score} points.</p>`;
    }
    
  
    document.getElementById('final-scores').innerHTML += winnerText;
    
}


function restartGame() {
    player1.score = 0;
    player2.score = 0;
    player1.answers = [];
    player2.answers = [];
    usedCategories = [];
    player1QuestionsCount = 0;
    player2QuestionsCount = 0;
    document.getElementById('end-phase').style.display = 'none';
    document.getElementById('setup-phase').style.display = 'block';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
