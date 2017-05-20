$(function() {
	$(document).on('touchmove', 'body.menu_open', false);

	$('.menu_drop').on('click', function(){
		$(this).toggleClass('open');
		$('body, .main_block').toggleClass('menu_open');
	});

	$('.logo').on('click', function() {
		$('body').animate({
			'scrollTop': 0
		}, 400);
	});
});