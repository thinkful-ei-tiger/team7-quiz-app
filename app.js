/* eslint-disable strict */
// main object
const store = {
  questions: [
    {
      question: 'Which pop star burnt down her home gym with candles?',
      answers: [
        'Katy Perry',
        'Britney Spears',
        'Madonna',
        'Lady Gaga'
      ],
      correctAnswer: 'Britney Spears'
    },
    {
      question: 'In "Arrested Development", there’s always money where?',
      answers: [
        'Sofa',
        'Car dealership',
        'Bottom shoe drawer',
        'Banana stand'
      ],
      correctAnswer: 'Banana stand'
    },
    {
      question: 'What is Star Wars day?',
      answers: [
        'May 4th',
        'orange',
        'pink',
        'green'
      ],
      correctAnswer: 'May 4th'
    },
    {
      question: 'What is the answer to life, the universe and everything?',
      answers: [
        '42',
        '2015',
        '2019',
        '2005'
      ],
      correctAnswer: '42'
    },
    {
      question: 'What is the name of Han Solo’s ship?',
      answers: [
        'Millenium Falcon',
        'orange',
        'pink',
        'green'
      ],
      correctAnswer: 'Millenium Falcon'
    },
    {
      question: 'Never gonna give you up',
      answers: [
        'Never gonna let you down',
        '2015',
        '2019',
        '2005'
      ],
      correctAnswer: 'Never gonna let you down'
    },
    {
      question: 'Who is the main character in "The Office"',
      answers: [
        'Stanley Hudson',
        'Michael Scott',
        'Walter White',
        'Morty Smith'
      ],
      correctAnswer: 'Michael Scott'
    },
    {
      question: 'SpongeBob created _____ in the episode “Frankendoodle”',
      answers: [
        'Sheldon J. Plankton',
        'SpongeGar',
        'DoodleBob',
        'Gary the Snail'
      ],
      correctAnswer: 'DoodleBob'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  correct: false,
  answered: false,
};

// variables
let index = store.questionNumber;
let question = store.questions[index].question;
let answers = store.questions[index].answers;
let correctAnswer = store.questions[index].correctAnswer;

// show home screen
function renderStart() {
  $('main').html(
    `<form>
      <label">Are You Meme Enough???</label>
      <button type="submit">BEGIN</button>
    </form>`
  );
  // assign submit handler to form to render question
  $('form').submit(function(evt) {
    evt.preventDefault();
    render();
  });
}
// screen to show question
function render() {
  $('main').html(
    `<form>
      <label>Pick an answer:</label>
      <div class = "group">
        <div class = "questionItem">
          <label>${question}</label>
          <div class = "radioItem"><input type="radio" name="color" value="${answers[0]}" required>
          <label for="other">${answers[0]}</label></div>
          <div class = "radioItem"><input type="radio" name="color" value="${answers[1]}">
          <label for="female">${answers[1]}</label></div>
          <div class = "radioItem"><input type="radio" name="color" value="${answers[2]}">
          <label for="other">${answers[2]}</label></div>
          <div class = "radioItem"><input type="radio" name="color" value="${answers[3]}">
          <label for="other">${answers[3]}</label></div>
        </div>
        <div class = tracker><button type="submit">Submit</button></div>
        <label>Question ${index+1} of ${store.questions.length}</label>
      </div>
    </form>`
  );
  // assign submit handler to form for handling answer
  $('form').submit(function(evt) {
    evt.preventDefault();
    handleAnswer();
  });
}

// function to handle selection
function handleAnswer() {
  let selection = $('input:checked').val();
  (selection === correctAnswer) ? renderCorrect() : renderWrong();
}

// screen if selection correct
function renderCorrect() {
  $('main').html(
    `<form id="next-question-form">
      <label for="next-question-label">CORRECT!</label>
      <button type="submit">Continue</button>
    </form>`
  );
  // assign submit handler to prepare next question
  $('form').submit(function(evt) {
    handleNextQuestion();
  });
  // accumulator for correct answers
  store.score++;
}

// screen if selection wrong
function renderWrong() {
  $('main').html(
    `<form id="next-question-form">
      <label>Wrong T_T</label>
      <label>The correct answer is:</label>
      <label>${correctAnswer}</label>
      <button type="submit">Continue</button>
    </form>`
  );
  $('form').submit(function(evt) {
    handleNextQuestion();
  });
}

// function to update variables, load next question. Re-renders question.
function handleNextQuestion() {
  index++;
  try {
    question = store.questions[index].question;
    answers = store.questions[index].answers;
    correctAnswer = store.questions[index].correctAnswer;
    render();
  } catch(e) {
    renderFinish();
  }
}

function renderFinish() {
  $('main').html(
    `<form id="finished-form">
      <label for="finished-label">YOU FINISHED!<div class = finished>
      ${store.score}/${store.questions.length}<p>correct!</p></div></label>
      <label>Play again!</label>
      <button type='submit'>Submit</button>
    </form>`
  );
}

// start quiz home screen on load
$(renderStart);