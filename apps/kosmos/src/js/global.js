$(function() {
	$('.menu_drop').on('click', function(){
		$(this).toggleClass('open');
		$('html, body, .main_block').toggleClass('menu_open');
	});
});