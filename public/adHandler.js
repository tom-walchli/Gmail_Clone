//	=======================================
// 	this script handles the ad that keeps 
//	popping up in the first email row
//	=======================================

$('.col__box--main').on('click','.js-ad--close', closeAd);

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
				<div class='row row__email js-row__email' tabindex='-1'>\
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

