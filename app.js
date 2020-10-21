/* eslint-disable strict */
/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
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
function questionHelper(question){
  let title =`<div class="title">${question.question}</div>`;
  
  let answers =
  `<form>
     <label>Pick an answer:</label>
     <div class = "group">
       <div class = "questionItem">
         <div class = "radioItem"><input type="radio" id=${question.answers[0]} name="color" value="${question.answers[0]}">
         <label for="other">${question.answers[0]}</label></div>
         <div class = "radioItem"><input type="radio" id=${question.answers[1]} name="color" value="${question.answers[1]}">
         <label for="female">${question.answers[1]}</label></div>
         <div class = "radioItem"><input type="radio" id=${question.answers[2]} name="color" value="${question.answers[2]}">
         <label for="other">${question.answers[2]}</label></div>
         <div class = "radioItem"><input type="radio" id=${question.answers[3]} name="color" value="${question.answers[3]}">
         <label for="other">${question.answers[3]}</label></div>
       </div>
       <div class = tracker><input type="submit" value="Submit"></div>
     </div>
   </form>`;
  store.questionNumber++;
  templatePage(title+answers);
  submitAnswer(question);
}
const startPage =`<form id="js-quiz-start-form">
      <label for="quiz-start-label">Are You Meme Enough???</label>
      <input type="submit">
    </form>`;

const correctScreen = `<form id="next-question-form">
<label for="next-question-label">CORRECT!</label>
<input type="submit">
</form>`;
//code that handles if an answer is correct or not
function submitAnswer(question){
  $('form').submit(function (event){
    event.preventDefault();
    let answer =$('[name=\'color\']:checked').val();
    console.log(answer);
    if(answer === (question.correctAnswer)){
      store.correct =true;
    }
    store.answered=true;
    render();
  });
}
//this code controls starting the quiz
function quizStart(){
  $( 'form' ).submit(function( event ) {
    event.preventDefault();
    store.quizStarted = true;
    render();
  });
}
//code that handles displaying correct page
function correctPage(){
  const wrongScreen=`<form id="next-question-form">
<label>Wrong T_T</label>
<label>${store.questions[store.questionNumber-1].correctAnswer}</label>
<input type="submit">
</form>`;
console.log(`I am at ${store.questionNumber}`);
  if(store.correct){
    templatePage(correctScreen);
    store.score++;
  }else{
    templatePage(wrongScreen);
  }
  $( 'form' ).submit(function( event ) {
    event.preventDefault();
    nextQuestion();
    render();
  });
}
//code to format text on the page
function templatePage(html){
  let question = store.questionNumber;
  if(question===0){
    question=1;
  }
  let questionTracker =`<div class = tracker><h3><p>Question #${question} of ${store.questions.length}</h3></div>`;
  if(store.quizStarted){
    $('h1').html(html+questionTracker);
  }else{
    $('h1').html(html);
  }
}
function nextQuestion(){
  store.answered=false;
  store.correct=false;
}

//code that handles displaying finished quiz
//boolean function that checks if a quiz is finished
function lastQuestion(){
  return store.questionNumber>=store.questions.length;
}
//function that displays a finished quiz
function finishedPage(){
  const finishedScreen= `<form id="finished-form">
<label for="finished-label">YOU FINISHED!<div class = finished>
${store.score}/${store.questions.length}<p>correct</p></div></label>
<button type='submit'>Submit</button>
</form>`;
  //let html=finishedScreen;
  //$( 'h1' ).html(html);
  templatePage(finishedScreen);
  $( 'form' ).submit(function( event ) {
    event.preventDefault();
    //console.log(`${store.score} fininished`);
    resetQuiz();
    render();
  });
}
//helper function to reset the quiz at the end
function resetQuiz(){
  store.quizStarted = false;
  store.questionNumber= 0;
  store.score=0;
  store.correct=false;
  store.answered =false;
}
//this code controls what the page displays
//I could use a switch statement for this if I wanted
function render(){
  if(store.quizStarted && store.answered){
    //store.correct = false;
    //console.log('you did it!');
    correctPage();
  }else if(lastQuestion()){
    finishedPage();
  }else if(store.quizStarted){
    //console.log('how?');
    questionHelper(store.questions[store.questionNumber]);
  }else{
    //let html=startPage;
    //console.log('nice');
    templatePage(startPage);
  }
}
function main(){
  render();
  quizStart();




}

$(main);
/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)