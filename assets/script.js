var answer1=document.getElementById("answer1"); //first answer's element 
var answer2=document.getElementById("answer2"); //Second answer's element 
var answer3=document.getElementById("answer3"); //third answer's element 
var answer4=document.getElementById("answer4"); //fourth answer's element 
var result=document.getElementById("result"); // the result correct/not correct element
var timeEl = document.querySelector("#timer"); // the timer element
var submit_button=document.querySelector("#submit_button") // the submit button element
var go_back=document.getElementById("go_back"); // go back button element
var clearEl=document.getElementById("clear"); // clear highscore button
var listEL=document.querySelector("#score_list"); // the list element that contain the high scores
var startEl=document.querySelector("#start"); // start button element
var questionNB =0; // the question number of the question we dispaly now 
var secondsLeft = 600; // timer duration 1 minute
var high_score=[]; // array of objects to hold the high scores
var score=0; // holding the score for current person
// array of objects for the test questions
// each object has: question , array of answers abojects (containing the answer and blooean value to know the correct answer)
var questions=[{
    question: " Q 1 - Which of the following is correct about JavaScript?",
    answers:[{answer:"A - JavaScript is a lightweight, interpreted programming language.",iscorrect:false},{answer:"B - JavaScript has object-oriented capabilities that allows you to build interactivity into otherwise static HTML pages.",iscorrect:false},
    {answer:"C - The general-purpose core of the language has been embedded in Netscape, Internet Explorer, and other web browsers.",iscorrect:false},{answer:"D - All of the above.",iscorrect:true}]
},
{
    question: " Q 2 - Which built-in method returns the index within the calling String object of the first occurrence of the specified value?",
    answers:[{answer:"A - getIndex()",iscorrect:false},{answer:"B - location()",iscorrect:false},
    {answer:"C - indexOf()",iscorrect:true},{answer:"D - None of the above.",iscorrect:false}]
},
{
    question: " Q 3 - Which built-in method returns the calling string value converted to lower case?",
    answers:[{answer:"A - toLowerCase()",iscorrect:false},{answer:"B - toLower()",iscorrect:false},
    {answer:"C - changeCase(case)",iscorrect:false},{answer:"D - None of the above.",iscorrect:true}]
},
{
    question: " Q 4 - Which of the following function of String object causes a string to be displayed in the specified color as if it were in a <font color='color'> tag?",
    answers:[{answer:"A - fixed()",iscorrect:false},{answer:"B - fontcolor()",iscorrect:true},
    {answer:"C - blink()",iscorrect:false},{answer:"D - bold()",iscorrect:false}]
},
{
    question: " Q 5 - Which of the following function of String object returns the character at the specified index?",
    answers:[{answer:"A - charAt()",iscorrect:true},{answer:"B - charCodeAt()",iscorrect:false},
    {answer:"C - concat()",iscorrect:false},{answer:"D - indexOf()",iscorrect:false}]
}];

var question_grade=(100/questions.length); // the wight of each question whis is 100 divided by total number of questions
if (localStorage.getItem("string_result")!=null){
    high_score=JSON.parse(localStorage.getItem("string_result"));//we assign the local memory item which contain the reult until now to the array of high scores
}

// function that display the question and the answers on the screen 
function display_question(id){
    var j=0;
    document.getElementById("question").innerHTML=questions[id].question;
    //check how many answers dose the quistion has and just display them
    for (var i=0;i<questions[id].answers.length;i++){
        j=i+1;
        var answer_OP=document.getElementById("answer"+j);
        answer_OP.style.display="block";
        answer_OP.innerHTML=questions[id].answers[i].answer; 
    }

}


var time_pointer; // this variable will hold the pointer value of the interval that we will set in the setTime funaction
function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    if(secondsLeft>0){
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left";
        // when we reach the 0 seconds then we end the test and go the second screen to enter the initial
        if(secondsLeft <= 0) {
        clearInterval(timerInterval);
        document.getElementById("quiz").style.display="none";
        document.getElementById("game-over").style.display="block";
        }
    }
    else{
        timeEl.textContent = secondsLeft + " seconds left";
    }
  }, 1000);
  time_pointer=timerInterval; // we assign the value of the current interval pointer to the outer varibel so we can use it in the stop_timer function
}

// this funtion to stop the timer
function stop_timer(){
    clearInterval(time_pointer);
}

// funvtion to check if the answer is correct 
// and display the next question after we choose an answer
 function validate_answer(selected_answer,question_index){
    var correct_answer;
    // this loop is to get the correct answer of the question (question_index) that we pass its number to the funtion
    for (var i=0;i<questions[question_index].answers.length;i++){
        if (questions[question_index].answers[i].iscorrect){
            correct_answer=questions[question_index].answers[i].answer;
        }
    }
    // if the selected answer is correct, then we will display correct word with green background color
    // and we will add the grade of this question to the score value
    if (selected_answer == correct_answer){
        result.innerHTML="correct";
        result.style.color="green";
        score+=question_grade;
    }
    // if the selected answer is worng, then we will display wrong word with red background color
    //then we will subtract 15 seconds from the rest seconds of the test 
    else{
        result.innerHTML="wrong";
        result.style.color="red";
        // if the time left is > 15, then we will subtract 15 seconds
        if(secondsLeft>15){
            secondsLeft-=15;
        }
        // if the time left is less than 15 seconds then
        // we will set the left time to 0, and we will end the test
        else{
            secondsLeft = 0;
            stop_timer();
            timeEl.textContent = secondsLeft + " seconds left";
            document.getElementById("quiz").style.display="none";
            document.getElementById("game-over").style.display="block";
            document.getElementById("score").textContent="Your score is: " + score;
            return;
        }
    }   
    display_next(); 
 }

 // this function will display the next question if there is any left
 // or it will stop the timer and end the test if there is no more questions
 function display_next(){
    if(questionNB < questions.length-1 && secondsLeft>0){
        questionNB +=1;
        display_question(questionNB);
    }
    else{
        stop_timer();
        document.getElementById("quiz").style.display="none";
        document.getElementById("game-over").style.display="block";  
        document.getElementById("score").textContent="Your score is: " + score;
    }
}

// this function is to add the initial and the score of the current person to the result array
// it will add the result in the right place of the array so we will get a descending array according to the score of each one
function add_result(initial,final_grade){
    console.log(high_score);
    if (high_score != null){
        var i=high_score.length; // the length of the current high score array
    }
    else{
        i=0;
    }
    // a new object that will hold the result of the test
    var new_result={
        name:initial,
        final_score:final_grade
    };
    // if the high score array is empty
    if(i==0){
        high_score.push(new_result);
    }
    //if the current person score is less than last item in the high score array, then we just add it to the end of the array
    else if(new_result.final_score <= high_score[i-1].final_score){
        high_score.push(new_result);
    }
    //if the current person score is grater than the first object in the high score array then we add it at the begining of the array
    else if(new_result.final_score >= high_score[0].final_score){
        high_score.unshift(new_result);
    }
    // otherwise we will look for the object which has the smaller score than the current person and we will insert the current object righ infort of it.
    else{
        for (var j=1; j < high_score.length-1; j++){
            if(new_result.final_score >= high_score[j].final_score){
                high_score.splice(j,0,new_result);
                break;
            }

        }
    }
}

// this is the function that will start displaying the questions and start the timer after we press the start button
function hideunhide(){
    console.log(high_score);
    document.getElementById("quiz").style.display="block";
    document.getElementById("main_page").style.display="none";
    setTime();
    display_question(questionNB);
    
}

// this function will display the high score array after we press the submit button
function display_high_score(){
    document.querySelector("#score_list").innerHTML="";
    var retrive_high_score=JSON.parse(localStorage.getItem("string_result"));
    for (var i=0 ; i<retrive_high_score.length ; i++){
        var list_item=document.createElement("li");
        list_item.textContent=retrive_high_score[i].name + " : " +retrive_high_score[i].final_score;
        document.querySelector("#score_list").appendChild(list_item);
    }
}

// listener on the start button to start the test
startEl.addEventListener("click",function(event){
    event.preventDefault();
    event.currentTarget;
    hideunhide();
})

//listener on the first answer button wich will call the validate answer function
answer1.addEventListener("click", function (event){
    event.preventDefault();
    event.currentTarget;
    var choosen_answer=answer1.innerHTML;
    validate_answer(choosen_answer,questionNB);
})

//listener on the second answer button wich will call the validate answer function
answer2.addEventListener("click", function (event){
    event.preventDefault();
    event.currentTarget;
    var choosen_answer=answer2.innerHTML;
    validate_answer(choosen_answer,questionNB);
})

//listener on the third answer button wich will call the validate answer function
answer3.addEventListener("click", function (event){
    event.preventDefault();
    event.currentTarget;
    var choosen_answer=answer3.innerHTML;
    validate_answer(choosen_answer,questionNB);
})

//listener on the fourth answer button wich will call the validate answer function
answer4.addEventListener("click", function (event){
    event.preventDefault();
    event.currentTarget;
    var choosen_answer=answer4.innerHTML;
    validate_answer(choosen_answer,questionNB);
})

//listener on the submit button wich will add the score and initial of current person the the high score array
// and it will assign the high score array to local storage pointer after we turn it to a JSON object
submit_button.addEventListener("click",function(event){
    event.preventDefault();
    event.currentTarget;
    var name=document.getElementById("initial").value.toUpperCase();
    if(name==""){
        alert("You cann't submit empty initial");
        return;
    }
    add_result(name,score);
    localStorage.setItem("string_result",JSON.stringify(high_score));
    display_high_score();
    document.getElementById("initial").value="";
    document.getElementById("game-over").style.display="none";
    document.getElementById("final_result").style.display="block"; 
})

//listener to the go back function which will reset all the variable we need to calculate the score of a person
go_back.addEventListener("click",function(event){
    event.preventDefault();
    event.currentTarget;
    questionNB =0;
    secondsLeft = 60;
    score=0;
    result.innerHTML="";
    timeEl.textContent ="";
    document.getElementById("final_result").style.display="none";
    document.getElementById("main_page").style.display="block"; 
})

// listener to the clear highscore button wich will relase the pointer of the local storage pointer and assigne it to null
// and rest the high score array to [] empty
clearEl.addEventListener("click", function(event){
    event.preventDefault();
    event.currentTarget;
    localStorage.removeItem("string_result");
    high_score=[];
    document.querySelector("#score_list").innerHTML="";
})
