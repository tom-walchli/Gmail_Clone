// ===============================================================
//
// 	This script handles the main user interaction of gmail.erb. It
//
//	 - switches buttons based on selection of emails
//	 - deletes and archives selected emails
// 	 - opens a compose window
//
// ================================================================


// The number of checked emails
var checked = 0;

// Number of mails 'sent'
var sent = 0;

// add an ad after 2000ms
$(document).ready(setTimeout(function(e){
	addAd();
	$('#searchbar').focus();
}, 2000));

// event listeners
$('.js-mail-cb').on('click', switchBtnBar);
$('.js-btn--delete').on('click', removeAndArchive);
$('.js-btn--compose').on('click', composeWindowOpener);

// def btn bars that will be switched based on selections
var checkedBtns 	= $('.js-col__btns--checked');
var uncheckedBtns 	= $('.js-col__btns--unchecked');

// handle the buttons when script is loading.
// If added the 'hidden' class to checkedBtns in html,
// for some reason, it wouldn't show when 'showing' was added
// (and 'hidden' removed...)  
handleBtnBar();

// ad or remove a class for bg-color depending on cb-selection
function switchBtnBar()
{
	var grandParent = $(this).parent().parent();
	if(this.checked){
		checked++;
		grandParent.addClass('bg--yellow');
	} else {
		checked--;
		grandParent.removeClass('bg--yellow');
	}
	handleBtnBar();
}

// show or hide btn bars
function handleBtnBar()
{
	if (checked > 0){
		checkedBtns.removeClass('hidden');
		checkedBtns.addClass('showing');
		uncheckedBtns.removeClass('showing');
		uncheckedBtns.addClass('hidden');
	} else {
		uncheckedBtns.removeClass('hidden');
		uncheckedBtns.addClass('showing');
		checkedBtns.removeClass('showing');
		checkedBtns.addClass('hidden');
	}
}

// loop over all emails, if checked, remove from DOM and archive  
function removeAndArchive()
{
	$('.col__box--main').children().each( function() {
		var input = $(this).find('input')[0];
		if ($(input).prop('checked') === true){
		 	archive($(this));
		 	$(this).remove();
		 	checked--;
		}	
	});
	handleBtnBar();
}

// dump the item into /logs/gmail.log
function archive(item)
{
	var from = clean(item.find('.col__email--from').text());
	var head = clean(item.find('.col__email--head').text());
	data = {from:from, head:head};
	var request = $.post('archive',data);
	request.done(function (data) {
		console.log(data);
	});
}

// turn 'Sent Mail' bold and add number of mails sent
// gets called from compose-window
function update()
{
	sent++;
	var sentMail = $('#sentMail');
	sentMail.addClass('font--bold');
	sentMail.text('Sent Mail (' + sent.toString() + ')');
}


// clean the input string
function clean(input){
	return input.split('\t').join('').split('\n').join('');
}


function composeWindowOpener(){
	window.open("compose", "compose","width=350,height=450");
}

