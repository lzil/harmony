var home = function() {
	$('.login-box').hide();
	$('.signup-box').hide();
	if($('.login-fail').text() === '') {
		$('.login-fail').hide();
	};
	if($('.signup-fail').text() === '') {
		$('.signup-fail').hide();
	};
	$('.login-tab').click(function() {
		$('.login-tab').blur();
		if(!$('.login-box').is(':visible')) {
			if($('.signup-box').is(':visible')) {
				$('.signup-box').fadeOut(150);
				$('.login-tab').animate({opacity:1}, 300);
				$('.signup-tab').animate({opacity:0.25}, 300);
				setTimeout(function() {
					$('.signup-box').hide();
					$('.login-box').fadeIn(150);
					$('.login-box').children().children('.form-group:first').children('input').focus();
				}, 150);
			}
			else {
				$('.login-box').fadeIn(300);
				$('.signup-tab').animate({opacity:0.25}, 300);	
				$('.login-box').children().children('.form-group:first').children('input').focus();
			}
		}
		else {
			$('.login-tab').animate({opacity:1}, 300);
			$('.signup-tab').animate({opacity:1}, 300);
			$('.login-box').fadeOut(300);
		};
	});
	$('.signup-tab').click(function() {
		$('.signup-tab').blur();
		if(!$('.signup-box').is(':visible')) {
			if($('.login-box').is(':visible')) {
				$('.login-box').fadeOut(150);
				$('.signup-tab').animate({opacity:1}, 300);
				$('.login-tab').animate({opacity:0.25}, 300);
				setTimeout(function() {
					$('.login-box').hide();
					$('.signup-box').fadeIn(150);
					$('.signup-box').children().children('.form-group:first').children('input').focus();
				}, 150);
			}
			else {
				$('.signup-box').fadeIn(300);
				$('.login-tab').animate({opacity:0.25}, 300);
				$('.signup-box').children().children('.form-group:first').children('input').focus();
			}
		}
		else {
			$('.signup-tab').animate({opacity:1}, 300);
			$('.login-tab').animate({opacity:1}, 300);
			$('.signup-box').fadeOut(300);
		};
	});
	$('.login-link').click(function() {
		$('.login-tab').blur();
		if(!$('.login-box').is(':visible')) {
			if($('.signup-box').is(':visible')) {
				$('.signup-box').fadeOut(150);
				$('.login-tab').animate({opacity:1}, 300);
				$('.signup-tab').animate({opacity:0.25}, 300);
				setTimeout(function() {
					$('.signup-box').hide();
					$('.login-box').fadeIn(150);
					$('.login-box').children().children('.form-group:first').children('input').focus();
				}, 150);
			}
			else {
				$('.login-box').fadeIn(300);
				$('.signup-tab').animate({opacity:0.25}, 300);	
				$('.login-box').children().children('.form-group:first').children('input').focus();
			}
		}
		else {
			$('.login-tab').animate({opacity:1}, 300);
			$('.signup-tab').animate({opacity:1}, 300);
			$('.login-box').fadeOut(300);
		};
	});
	$('.signup-link').click(function() {
		$('.signup-tab').blur();
		if(!$('.signup-box').is(':visible')) {
			if($('.login-box').is(':visible')) {
				$('.login-box').fadeOut(150);
				$('.signup-tab').animate({opacity:1}, 300);
				$('.login-tab').animate({opacity:0.25}, 300);
				setTimeout(function() {
					$('.login-box').hide();
					$('.signup-box').fadeIn(150);
					$('.signup-box').children().children('.form-group:first').children('input').focus();
				}, 150);
			}
			else {
				$('.signup-box').fadeIn(300);
				$('.login-tab').animate({opacity:0.25}, 300);
				$('.signup-box').children().children('.form-group:first').children('input').focus();
			}
		}
		else {
			$('.signup-tab').animate({opacity:1}, 300);
			$('.login-tab').animate({opacity:1}, 300);
			$('.signup-box').fadeOut(300);
		};
	});

	if (!$('.error').text() == '') {
		$('.login-tab').click();
	}
	if (!$('.error2').text() == '') {
		$('.signup-tab').click();
	}
};
