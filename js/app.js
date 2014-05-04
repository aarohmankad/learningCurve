$(document).ready(function () {
	var correctAnswers = 0;
	var incorrectAnswers = 0;
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
	});

	$( ".submit-answer" ).on('click',function( event ) {
		if($("#student-answer").val() != "")
		{
			checkAnswer();
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
			answered: false
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
			var answered = snapshot.val().answered;
			if($("#student-answer").val().toLowerCase() == answer.toLowerCase() && answered == false)
			{
				correctAnswers++;
				answered = true;
			}else if(answered == false)
			{
				incorrectAnswers++;
			}
		});
		$(".correct").html(correctAnswers + " correct answers.");
		$(".incorrect").html(incorrectAnswers + " incorrect answers.");
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
