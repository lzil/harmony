var main = function() {	// General
	$('.data-2').hide();
	$('.data-3').hide();
	$('.data-4').hide();
	$('.tab-1').click(function() {
		$('.data').slideUp(300);
		setTimeout(function() {
			$('.profile-form').val('');
			$('.data-2').hide();
			$('.data-3').hide();
			$('.data-4').hide();
			$('.data-1').show();
		}, 300);
		$('.data').slideDown(300);
		$('.tab-4').removeClass('active');
		$('.tab-2').removeClass('active');
		$('.tab-3').removeClass('active');
		$('.tab-1').addClass('active');
	});
	$('.tab-2').click(function() {
		$('.data').slideUp(300);
		setTimeout(function() {
			$('.profile-form').val('');
			$('.data-1').hide();
			$('.data-4').hide();
			$('.data-3').hide();
			$('.data-2').show();
		}, 300);
		$('.data').slideDown(300);
		$('.tab-4').removeClass('active');
		$('.tab-1').removeClass('active');
		$('.tab-3').removeClass('active');
		$('.tab-2').addClass('active');
	});
	$('.tab-3').click(function() {
		$('.data').slideUp(300);
		setTimeout(function() {
			$('.profile-form').val('');
			$('.data-1').hide();
			$('.data-4').hide();
			$('.data-2').hide();
			$('.data-3').show();
		}, 300);
		$('.data').slideDown(300);
		$('.tab-4').removeClass('active');
		$('.tab-1').removeClass('active');
		$('.tab-2').removeClass('active');
		$('.tab-3').addClass('active');
	});
	$('.tab-4').click(function() {
		$('.data').slideUp(300);
		setTimeout(function() {
			$('.profile-form').val('');
			$('.data-1').hide();
			$('.data-3').hide();
			$('.data-2').hide();
			$('.data-4').show();
		}, 300);
		$('.data').slideDown(300);
		$('.tab-3').removeClass('active');
		$('.tab-1').removeClass('active');
		$('.tab-2').removeClass('active');
		$('.tab-4').addClass('active');
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
			$parent.addClass('enabled');
			$child.removeAttr('disabled');
			$child.focus();
		}
		else {
			$parent.removeClass('enabled');
			$child.val('');
			$child.attr('disabled','disabled');
			$(this).blur();
		};
	});
};