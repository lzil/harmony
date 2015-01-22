$(document).ready(function() {
	$('#edit-btn').click(function() {
		var $parent = $(this).parent('.input-group');
		$('.input-group').removeClass('current');
		$('.profile-form').attr('disabled','disabled');
		if
		$parent.addClass('current');
		$parent.children('.profile-form').removeAttr('disabled');
	})
})