var main = function() {
	$('.account').hide();
	$('.profile-btn').click(function() {
		var $parent = $(this).parent().parent();
		var $child = $parent.children('.profile-form');
		if(!$parent.hasClass('enabled')) {
			$('.profile-group').removeClass('enabled');
			$('.profile-form').attr('disabled','disabled');
			$parent.addClass('enabled');
			$child.removeAttr('disabled');
		}
		else {
			$parent.removeClass('enabled');
			$child.attr('disabled','disabled');
			$(this).blur();
		};
	});
	$('.profile-tab').click(function() {
		$('.data').slideUp(500);
		setTimeout(function() {
			$('.account').delay(500).hide();
			$('.profile').delay(500).show();
		}, 500);
		$('.data').slideDown(500);
		$('.account-tab').removeClass('active');
		$('.profile-tab').addClass('active');
	});
	$('.account-tab').click(function() {
		$('.data').slideUp(500);
		setTimeout(function() {
			$('.profile').delay(500).hide();
			$('.account').delay(500).show();
		}, 500);
		$('.data').slideDown(500);
		$('.profile-tab').removeClass('active');
		$('.account-tab').addClass('active');
	});
}

$(document).ready(main);