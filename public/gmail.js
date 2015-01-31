// The number of checked emails
var checked = 0;

$('.js-mail-cb').on('click', switchBtnBar);
$('.js-btn--delete').on('click', removeAndArchive);
$('.js-btn--compose').on('click', function(){
	window.open();
});

var checkedBtns 	= $('.js-col__btns--checked');
var uncheckedBtns 	= $('.js-col__btns--unchecked');

// handle the buttons when script is loading.
// If added the 'hidden' class to checkedBtns in html,
// for some reason, it wouldn't show when 'showing' was added
// (and 'hidden' removed...)  
handleBtnBar();

function switchBtnBar(){
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

function handleBtnBar(){
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
function removeAndArchive(){
	console.log("Hello!!")
	$('.col__box--main').children().each(function(){
		if ($(this).hasClass("js-row__separator")) return;
		var input = $(this).find('input')[0];
		if ($(input).prop('checked') === true){
		 	archive($(this));
		 	$(this).remove();
		}	
	});
}

// dump the item into /logs/gmail.log
function archive(item){
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

