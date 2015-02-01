// 	===================================================================
//
// 	This script handles the keyboard events attached to 
//	<body> in gmail.erb
//
//	  - 'up'/'down' arrows and 'j'/'k' keys toggle through email list, 
//	  - 'x' toggles checkbox in a selected email
//	  - 'c' opens the compose window
//	  - 'del' removes the nasty ad in the first row
//
// 	===================================================================


$('body').bind('keydown', function(e) {
	handleKeys(e);
});

// do things based on keys pressed
function handleKeys(e){
	switch (e.keyCode){
		case 67: 			// 'c'
			composeWindowOpener();
			break;
		case 88: 			// 'x'
			selectEmail();
			break;
		case 38: 			// 'up'
		case 74: 			// 'j'
			rowSelector(-1);
			break;
		case 40: 			// 'down'
		case 75: 			// 'k'
			rowSelector(1);
			break;
		case 46: 			// 'del'
			closeAd_keyEvent();
			break;
		default:
			console.log("not listening to keyCode",e.keyCode);
	}
}

function selectEmail(){
	var focused = $(':focus');
	if (focused.hasClass('js-row__email')){
		var input = focused.find('input')[0];
		$(input).trigger('click');
	}
}

function rowSelector(toggle){
	var focused  = $(':focus');
	var hasClass = focused.hasClass('js-row__email');
	switch (toggle) {
		case -1:
			if (hasClass){
				focused.parent().prev().children().first().focus();
			} else {
				$('.col__box--main').children().last().children().first().focus();
			}
			break;
		case 1:
			if (hasClass){
				focused.parent().next().children().first().focus();
			} else {
				$('.col__box--main').children().first().children().first().focus();
			}
			break;
	}
}

function closeAd_keyEvent(){
	var focused = $(':focus');
	if (focused.parent().hasClass('row--ad')){
		console.log("i'm add row");
		$('.js-ad--close').trigger('click');
	}
}

