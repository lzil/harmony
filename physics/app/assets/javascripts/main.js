var main = function() {	// General
	$('.data-2').hide();
	$('.data-3').hide();
	$('.tab-1').click(function() {
		$('.data').slideUp(300);
		setTimeout(function() {
			$('.profile-form').val('');
			$('.data-2').hide();
			$('.data-1').show();
		}, 300);
		$('.data').slideDown(300);
		$('.tab-2').removeClass('active');
		$('.tab-1').addClass('active');
	});
	$('.tab-2').click(function() {
		$('.data').slideUp(300);
		setTimeout(function() {
			$('.profile-form').val('');
			$('.data-1').hide();
			$('.data-2').show();
		}, 300);
		$('.data').slideDown(300);
		$('.tab-1').removeClass('active');
		$('.tab-2').addClass('active');
	});
	// For Dashboard
	$('.modal-cancel').click(function() {
		$('#new-proj').modal('hide');
		$('.form-control').val('');
	});
	// For Show
	if($('.account-fail').text() === '') {
		$('.account-fail').hide();
	};
	$('.clear-inputs').click(function() {
		$('.profile-form').val('');
	});
		$('.profile-btn').click(function() {
		var $parent = $(this).parent().parent();
		var $child = $parent.children('.profile-form');
		if(!$parent.hasClass('enabled')) {
			$('.profile-group').removeClass('enabled');
			$('.profile-form').attr('disabled','disabled');
			$parent.addClass('enabled');
			$child.removeAttr('disabled');
			$child.focus();
		}
		else {
			$parent.removeClass('enabled');
			$child.attr('disabled','disabled');
			$(this).blur();
		};
	});
};
