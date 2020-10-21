/* eslint-disable strict */
/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What color is broccoli?',
      answers: [
        'red',
        'orange',
        'pink',
        'green'
      ],
      correctAnswer: 'green'
    },
    {
      question: 'What is the current year?',
      answers: [
        '1970',
        '2015',
        '2019',
        '2005'
      ],
      correctAnswer: '2019'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  correct: false,
  answered: false,
};
function questionHelper(question){
  //let html='';
  let title =`${question.question}`;
  
  let answers =`<form>
  <p>Pick an answer:</p>
  <input type="radio" id=${question.answers[0]} name="color" value=${question.answers[0]}>
  <label for="other">${question.answers[0]}</label>
  <input type="radio" id=${question.answers[1]} name="color" value=${question.answers[1]}>
  <label for="female">${question.answers[1]}</label><br>
  <input type="radio" id=${question.answers[2]} name="color" value=${question.answers[2]}>
  <label for="other">${question.answers[2]}</label>
  <input type="radio" id=${question.answers[3]} name="color" value=${question.answers[3]}>
  <label for="other">${question.answers[3]}</label>
  <input type="submit" value="Submit"></form>`;
  //$('h1').html(title + answers);
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
const wrongScreen=`<form id="next-question-form">
<label for="next-question-label">Wrong T_T</label>
<input type="submit">
</form>`;
//code that handles if an answer is correct or not
function submitAnswer(question){
  $('form').submit(function (event){
    event.preventDefault();
    //console.log('thats right you clicked me');
    let answer =$('[name=\'color\']:checked').val();
    if(answer === question.correctAnswer){
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
  if(store.correct){
    templatePage(correctScreen);
    console.log('correct!');
    store.score++;
    //console.log(store.score);
  }else{
    templatePage(wrongScreen);
    console.log('incorect');
  }
  //$( 'h1' ).html(html);
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
  let questionTracker =`<div class = tracker><h3><p>question #${question} of ${store.questions.length}</h3></div>`;
  if(store.quizStarted){
    $('h1').html(html+questionTracker);
  }else{
    $('h1').html(html);
  }
}
function nextQuestion(){
  store.answered=false;
  store.correct=false;
  //store.questionNumber++;
}

//code that handles displaying finished quiz

function lastQuestion(){
  return store.questionNumber>=store.questions.length;
}

function finishedPage(){
  const finishedScreen= `<form id="finished-form">
<label for="finished-label">YOU FINISHED!<div class = finished>${store.score}/${store.questions.length}<p>correct</p></div></label>
<input type="submit">
</form>`;
  //let html=finishedScreen;
  //$( 'h1' ).html(html);
  templatePage(finishedScreen);
  $( 'form' ).submit(function( event ) {
    event.preventDefault();
    //console.log(`${store.score} fininished`);
    render();
  });
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