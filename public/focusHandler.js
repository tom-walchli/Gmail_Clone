// This script handles the focus events on emails in gmail.erb

$('.js-row__email').on('focus',function(){
	$(this).css('border-left','5px solid blue');
	// first child is col-sm-4 with padding-left = 15px. subtract our blue border...
	$(this).children().first().css('padding-left','10px'); 
});
$('.js-row__email').on('focusout',function(){
	$(this).css('border-left','0px solid white');
	// restore padding-left = 15px
	$(this).children().first().css('padding-left','15px');
});
