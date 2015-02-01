// The number of checked emails
var checked = 0;

// Number of mails 'sent'
var sent = 0

// add an ad after 2000ms
$(document).ready(setTimeout(function(e){
	addAd();
	$('#searchbar').focus();
}, 2000));

// event listeners
$('.js-mail-cb').on('click', switchBtnBar);
$('.js-btn--delete').on('click', removeAndArchive);
$('.js-btn--compose').on('click', composeWindowOpener);
$('.js-btn--send').on('click', sendMail);
$('#addAd').on('click', addAd);
$('.col__box--main').on('click','.js-ad--close', closeAd);
$('body').bind('keydown', function(e) {
	handleKeys(e);
});
$('.js-row__email').on('focus',function(){
	console.log('I got focus!!',this);
	$(this).css('border-left','5px solid yellow');
});
$('.js-row__email').on('focusout',function(){
	console.log('I lost focus!!',this);
	$(this).css('border-left','0px solid white');
});

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
	$('.col__box--main').children().each(function(){
		// if ($(this).hasClass("js-row__separator")) return;
		// if ($(this).hasClass("js-row__separator")) return;
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

// clean the input string
function clean(input){
	return input.split('\t').join('').split('\n').join('');
}

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

// turn 'Sent Mail' bold and add number of mails sent
function update()
{
	sent++;
	var sentMail = window.opener.$('#sentMail');
	sentMail.addClass('font--bold');
	sentMail.text('Sent Mail (' + sent.toString() + ')');
	window.close('compose');
}

function addAd()
{
	console.log('addAd');
	$('.col__box--main').prepend(adRow);
}

// remove an add (...and add another one after 3sec)
function closeAd()
{
	var greatGrandParent = $(this).parent().parent().parent();
	greatGrandParent.remove();
	setTimeout(addAd, 3000);
}



var adRow = $("<div class='row--ad'>\
				<div class='row row__email'>\
					<div class='col-sm-4 col__email--from'>\
						<div class='icon__check--red'><img src='img/icon_check_red.png'></div>\
						<div class='ad--left'><span class='font--bold'>TurboTax</span><br>Ad &copy;</div>\
					</div>\
					<div class='col-sm-8 col__email--head'>\
						<span class='font--bold'>IRS is now open</span><br>\
						E-file Fed & state for $0 with TurboTax Federal Free Edition. Max refund, guaranteed.\
						<button class='mail--date ad--close js-ad--close'>&#9747;</button>\
					</div>\
				</div>\
			    <div class='row row--separator js-row__separator'></div>\
			   </div>");


// do things based on keys pressed
function handleKeys(e){
	switch (e.keyCode){
		case 67: 			// 'c'
			composeWindowOpener();
			break;
		case 88: 			// 'x'
			selectCurrent();
			break;
		case 38: 			// 'down'
			selectCurrent(-1);
			break;
		case 40: 			// 'up'
			selectCurrent(1);
			break;
		default:
			console.log("not listening to keyCode",e.keyCode);
	}
}

function selectCurrent(tog){

}

function rowSelector(){

}

function composeWindowOpener(){
	window.open("compose", "compose","width=350,height=450");
}

