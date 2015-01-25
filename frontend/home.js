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
		if(!$('.login-box').is(':visible')) {
			$('.signup-tab').animate({opacity:0.25}, 300)
			if($('.signup-box').is(':visible')) {
				$('.signup-box').fadeOut(150);
				$('.login-tab').animate({opacity:1}, 300)
				$('.signup-tab').animate({opacity:0.25}, 300)
				setTimeout(function() {
					$('.login-tab').hide();
					$('.login-box').fadeIn(150);
				}, 150);
			}
			else {
				$('.login-box').fadeIn(300);
			}
		}
		else {
			$('.signup-tab').animate({opacity:1}, 300)
			$('.login-box').fadeOut(300);
		}
	});
	$('.signup-tab').click(function() {
		if(!$('.signup-box').is(':visible')) {
			if($('.login-box').is(':visible')) {
				$('.login-box').fadeOut(150);
				$('.signup-tab').animate({opacity:1}, 300)
				$('.login-tab').animate({opacity:0.25}, 300)
				setTimeout(function() {
					$('.login-box').hide();
					$('.signup-box').fadeIn(150);
				}, 150);
			}
			else {
				$('.signup-box').fadeIn(300);
				$('.login-tab').animate({opacity:0.25}, 300)
			}
		}
		else {
			$('.login-tab').animate({opacity:1}, 300)
			$('.signup-box').fadeOut(300);
		}
	});
};