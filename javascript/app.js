
// Questions
var questions = [{
    name: "quest0",
    question: "Who plays Chewbacca?",
    answers: ["KENNY BAKER", "DAVID PROWSE", "PETER MAYHEW", "RICK BAKER", "DUH! CHEWIE PLAYED HIMSELF!"],
    correctAnswer: "PETER MAYHEW"
}, {
    name: "quest1",
    question: "What was the orinal name of 'Return of the Jedi'?",
    answers: ["THE END OF THE EMPIRE", "THE NEW REPUBLIC", "RETURN OF THE JEDI", "EWOKS GONE WILD", "REVENGE OF THE JEDI"],
    correctAnswer: "REVENGE OF THE JEDI"
}, {
    name: "quest2",
    question: "where did Darth Vader reveal himself to be Luke's father?",
    answers: ["DAGOBAH", "CLOUD CITY", "THE JERRY SPRINGER SHOW", "THE DEATH STAR", "ENDOR"],
    correctAnswer: "CLOUD CITY"
}, {
    name: "quest3",
    question: "Who was the concept artist who worked with George Lucas to create the look and feel of 'Star Wars'?",
    answers: ["FRANK FRAZETTA", "RALPH MCQUARRIE", "PABLO PICASSO", "H.R. GIGER", "RICK BAKER"],
    correctAnswer: "RALPH MCQUARRIE"
}, {
    name: "quest4",
    question: "What was Anakin Skywalker's mom's name?",
    answers: ["MOMMY", "SHMI", "LEIA", "BERU", "PADME"],
    correctAnswer: "SHMI"
}, {
    name: "quest5",
    question: "What is Count Dooku's Sith name?",
    answers: ["DARTH TYRANUS", "DARTH VADER", "DARTH SIDIOUS", "TYRANNOSAURUS REX", "DARTH MAUL"],
    correctAnswer: "DARTH TYRANUS"
}, {
    name: "quest6",
    question: "Who played Darth Vader on the set of the movie?",
    answers: ["DAVID PROWSE", "ANDRE THE 'GIANT'", "PETER MAYHEW", "ANTHONY DANIELS", "JAMES EARL JONES"],
    correctAnswer: "DAVID PROWSE"
}, {
    name: "quest7",
    question: "What location stood in for Hoth in 'The Empire Strikes Back'?",
    answers: ["GLACIER NATIONAL PARK", "MALMO, SWEDEN", "FINSE, NORWAY", "LES TROIS VALLEES IN FRANCE", "SANTA'S BACKYARD"],
    correctAnswer: "FINSE, NORWAY"
}, {
    name: "quest8",
    question: "What micro-organisms are said to be conductors of the Force?",
    answers: ["FORCE GHOSTS", "CHLOROMIDIANS", "MITOCHONDRIA", "MIDICHLORIANS", "MICROMACHINES"],
    correctAnswer: "MIDICHLORIANS"
}, {
    name:"quest9",
    question: "What's the name of the famous sound effect that can be heard in every 'Star Wars' movie?",
    answers: ["CASTLE THUNDER", "TARZAN CALL", "WILHELM SCREAM", "LASER BLAST", "REBEL YELL"],
    correctAnswer: "WILHELM SCREAM"
}

];

// creates the questions and answers on the page
$(document).ready(function(){

    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;


    $(".container").fadeOut();
    $(".Grade").fadeOut();

    let dontFail = document.createElement("audio");
    dontFail.setAttribute("src", "images/Dont-fail.mp3");

    let failed = document.createElement("audio");
    failed.setAttribute("src", "images/failed.wav");

    let impressive = document.createElement("audio");
    impressive.setAttribute("src", "images/impresive.mp3")

        $("#start").on("click", function(){
            $("#splash").fadeOut();
            dontFail.play();
            $(".container").fadeIn();
            loadQuestions();
            startTimer();
        })

        $("#submit").on("click", function(){
            gradeQuiz();
            $(".timer").fadeOut();
            $(".container").fadeOut();
            $(".Grade").fadeIn();
        })


    function startTimer(){
        let seconds = 60000;
        let timer = setInterval(function(){
            seconds = seconds - 4;  
            $(".timer").html("Timer: " + seconds);
            if (seconds === 0){
                $(".container").fadeOut();
                $("#timesUp").html('<h2>Times Up!!</h2>');
                gradeQuiz();
                $(".Grade").fadeIn();
            } else {
                $("#submit").on("click", function(){
                    clearInterval(timer);
                })
            }
        }) 
    }

    function loadQuestions(){
        for (let i = 0; i < questions.length; i++){
            // console.log(questions[i].correctAnswer);
            $(".questions").append('<div class="quest">' + questions[i].question + '</div>')
            for (let j = 0; j <= 4; j++){
                // console.log(questions[i].answers[j])
                $(".questions").append('<input type="radio" name="quest' + i + '" value="' + questions[i].answers[j] + '"</><label for="' + questions[i].answers[j] + '">' + questions[i].answers[j] + '</label>')
            }
        
        }
    }

    function gradeQuiz(){
        for (let i = 0; i < questions.length; i++){
            let answer = $('input:radio[name="quest' + i + '"]:checked').val();
            if (answer === questions[i].correctAnswer){
                correct++;
                // console.log(correct);
            } else {
                if (answer === undefined){
                    unanswered++;
                } else {
                    incorrect++;
            }
        }
        $("#numberRight").html('<h3>Number Right: ' + correct + '</h3>');
        $("#numberWrong").html('<h3>Number Wrong: ' + incorrect + '</h3>');
        $("#numberMissed").html('<h3>Number Missed: ' + unanswered + '</h3>');
    }
        if (correct === 10) {
            impressive.play();
        } else if (correct < 10){
            failed.play();
        }

    }

});

