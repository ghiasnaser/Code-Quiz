//var q_nb=-1;//question number
var questions=[{
    id: 0,
    question: " Q 1 - Which of the following is correct about JavaScript?",
    answers:[{answer:"A - JavaScript is a lightweight, interpreted programming language.",iscorrect:false},{answer:"B - JavaScript has object-oriented capabilities that allows you to build interactivity into otherwise static HTML pages.",iscorrect:false},
    {answer:"C - The general-purpose core of the language has been embedded in Netscape, Internet Explorer, and other web browsers.",iscorrect:false},{answer:"D - All of the above.",iscorrect:true}]
},
{
    id: 1,
    question: " Q 2 - Which built-in method returns the index within the calling String object of the first occurrence of the specified value?",
    answers:[{answer:"A - getIndex()",iscorrect:false},{answer:"B - location()",iscorrect:false},
    {answer:"C - indexOf()",iscorrect:true},{answer:"D - None of the above.",iscorrect:false}]
},
{
    id: 2,
    question: " Q 3 - Which built-in method returns the calling string value converted to lower case?",
    answers:[{answer:"A - toLowerCase()",iscorrect:false},{answer:"B - toLower()",iscorrect:false},
    {answer:"C - changeCase(case)",iscorrect:false},{answer:"D - None of the above.",iscorrect:true}]
},
{
    id: 3,
    question: " Q 4 - Which of the following function of String object causes a string to be displayed in the specified color as if it were in a <font color='color'> tag?",
    answers:[{answer:"A - fixed()",iscorrect:false},{answer:"B - fontcolor()",iscorrect:true},
    {answer:"C - blink()",iscorrect:false},{answer:"D - bold()",iscorrect:false}]
},
{
    id: 4,
    question: " Q 5 - Which of the following function of String object returns the character at the specified index?",
    answers:[{answer:"A - charAt()",iscorrect:true},{answer:"B - charCodeAt()",iscorrect:false},
    {answer:"C - concat()",iscorrect:false},{answer:"D - indexOf()",iscorrect:false}]
}];
// function that display the question in the reight place and take the question number as an in attribute
function display_question(id){
    document.getElementById("question").innerHTML=questions[id].question;
    document.getElementById("answer1").innerHTML=questions[id].answers[0].answer;
    document.getElementById("answer2").innerHTML=questions[id].answers[1].answer;
    document.getElementById("answer3").innerHTML=questions[id].answers[2].answer;
    document.getElementById("answer4").innerHTML=questions[id].answers[3].answer;
}
var q_nb =0;
function display_next(){
    if(q_nb < questions.length){
        display_question(q_nb);
        document.getElementById("result").innerHTML=q_nb;
        q_nb +=1;
    }
    else{
        alert("This is the last question");
    }
    
}
function display_previous(){
    if(q_nb > 0){
        q_nb -=1;
        display_question(q_nb);
        document.getElementById("result").innerHTML=q_nb;
    }
    else{
        alert("This is the first question");
    }
}






