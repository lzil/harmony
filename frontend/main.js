var main = function() {
	$('.data-2').hide();
	$('.data-3').hide();
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
	$('.tab-1').click(function() {
		$('.data').slideUp(300);
		setTimeout(function() {
			$('.data-2').delay(300).hide();
			$('.data-1').delay(300).show();
		}, 300);
		$('.data').slideDown(300);
		$('.tab-2').removeClass('active');
		$('.tab-1').addClass('active');
	});
	$('.tab-2').click(function() {
		$('.data').slideUp(300);
		setTimeout(function() {
			$('.data-1').delay(300).hide();
			$('.data-2').delay(300).show();
		}, 300);
		$('.data').slideDown(300);
		$('.tab-1').removeClass('active');
		$('.tab-2').addClass('active');
	});
	$('.modal-cancel').click(function() {
		$('#new-proj').modal('hide');
	});
}

$(document).ready(main);