$(document).ready(function () {
	
	var firebase = new Firebase('https://learning-curve.firebaseio.com/');

	$( "#question-input" ).keypress(function( event ) {

		if ( event.which == 13 ) {
			alert("Enter was pressed");
			firebase.set({
				question: $("#question-input").val(),
			});
		}
	});
});