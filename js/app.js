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
			correctAnswers: 0,
			incorrectAnswers: 0,
		});
		firebaseRoom.on('value', function (snapshot) {

			var question = snapshot.val().question;

			$("#question_output").html(question);
		});
	} 
	function checkAnswer () {
		var firebaseRoom = new Firebase('https://learning-curve.firebaseio.com/' + $("#room_join_input").val());
		firebaseRoom.once('value', function (snapshot) {

			var answer = snapshot.val().answer;
			var correctAnswersPrev = snapshot.val().correctAnswers;
			var incorrectAnswersPrev = snapshot.val().incorrectAnswers;
			if($("#student-answer").val().toLowerCase() == answer.toLowerCase())
			{
				firebaseRoom.update({
					correctAnswers: correctAnswersPrev+1
				});
			}else
			{
				firebaseRoom.update({
					incorrectAnswers: incorrectAnswersPrev+1
				});
			}
			firebaseRoom.once('value', function (snapshot) {
				var correctAnswers = snapshot.val().correctAnswers;
				var incorrectAnswers = snapshot.val().incorrectAnswers;
				// Update the chart
				var data = 
				[
					{
						value: correctAnswers/(correctAnswers+incorrectAnswers),
						color:"#F7464A"
					},
					{
						value: incorrectAnswers/(correctAnswers+incorrectAnswers),
						color : "#47F573"
					}
				]

				var options = 
				{
					segmentShowStroke: false,
					percentageInnerCutout: 25,
				}
				var ctx = $("#correctnessChart").get(0).getContext("2d");
				//This will get the first returned node in the jQuery collection.
				var correctnessChart = new Chart(ctx).Doughnut(data,options);
			})
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