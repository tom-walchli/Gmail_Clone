// ===============================================================
//
// 	This script handles events in the compose.erb window
//
//	...for now, there's only 'click' on sendMail-button,
//	which posts a request to the server with all input data.
//
// ================================================================



$('.js-btn--send').on('click', sendMail);

function sendMail()
{
	data = {
		to 		: $('#js-email--to').val(),
		subject : $('#js-email--subject').val(),
		content : $('#js-email--content').val()
	};
	var request = $.post('send',data);
	request.done(function (data) {
		console.log(data);
	});
	update();
}

function update()
{
	window.opener.update();
	window.close();
}

