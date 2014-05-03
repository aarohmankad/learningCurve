$(document).ready(function () {
	var correctAnswers = 0;
	var incorrectAnswers = 0;
	var answered = false;
	var firebase = new Firebase('https://learning-curve.firebaseio.com/');
	$( "#answer_input" ).keypress(function( event ) {

		if ( event.which == 13 ) {
			setQuestion();
		}
	});

	$( ".submit-question" ).on('click',function( event ) {
		setQuestion();
	});

	$( "#student-answer" ).keypress(function( event ) {

		if($("#student-answer").val() != "")
		{
			if ( event.which == 13 ) {
				checkAnswer();
			}
		}
		else
		{
			alert("Please enter an answer");
		}
	});

	$( ".submit-answer" ).on('click',function( event ) {
		if($("#student-answer").val() != "")
		{
			checkAnswer();
		}
		else
		{
			alert("Please enter an answer");
		}
	});
	
	$( "#room_join_input" ).keypress(function( event ) {

		if ( event.which == 13 ) {
			joinRoom();
		}
	});

	$( ".submit-room-name" ).on('click',function( event ) {
		joinRoom();
	});

	function setQuestion () {
		var firebaseRoom = new Firebase('https://learning-curve.firebaseio.com/' + $("#room_input").val());
		firebaseRoom.set({
			question: $("#question_input").val(),
			answer: $("#answer_input").val(),
		});
		firebaseRoom.on('value', function (snapshot) {

			var question = snapshot.val().question;

			$("#question_output").html(question);
		});
	} 
	function checkAnswer () {
		var firebaseRoom = new Firebase('https://learning-curve.firebaseio.com/' + $("#room_join_input").val());
		firebaseRoom.on('value', function (snapshot) {

			var answer = snapshot.val().answer;
			if($("#student-answer").val() == answer && answered == false)
			{
				correctAnswers++;
			}else if(answered == false)
			{
				incorrectAnswers++;
			}
		});
		$(".correct").html(correctAnswers + " correct answers.");
		$(".incorrect").html(incorrectAnswers + " incorrect answers.");
		answered = true;
	}
	function joinRoom () {
		var joinFirebaseRoom = new Firebase('https://learning-curve.firebaseio.com/' + $("#room_join_input").val());
		
		joinFirebaseRoom.on('value', function (snapshot) {

			var question = snapshot.val().question;

			$("#question_output").html(question);
		});
		$(".student-row").removeClass("hide");
		$(".teacher-row").addClass("hide");
	}
});
