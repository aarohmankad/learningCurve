$(document).ready(function () {
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

		if ( event.which == 13 ) {
			checkAnswer();
		}
	});

	$( ".submit-answer" ).on('click',function( event ) {
		checkAnswer();
	});

	$( "#anotherQuestion" ).on('click',function( event ) {
		$(".student-row").addClass("hide");
		$(".teacher-row").removeClass("hide");
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
		$(".student-row").removeClass("hide");
		$(".teacher-row").addClass("hide");
	} 
	function checkAnswer () {
		firebaseRoom.on('value', function (snapshot) {

			var answer = snapshot.val().answer;

			if($("#student-answer").val() == answer)
			{
				alert("correct!");
			}else
			{
				alert("Sorry, you either have the wrong answer or it's just a little off.");
			}
		});	
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
