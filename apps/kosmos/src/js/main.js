$(function() {

	var timer = function() {
		$('.active').trigger('click');
	};

	var interval = setInterval(timer, 3000);

	// Not Lazy load

	var $images = $('.poster_item').on('click', function(e) {

		clearInterval(interval);
		interval = setInterval(timer, 3000);

		$(this).index() < $images.length - 1
			? $images.removeClass('active').filter(this).next().addClass('active')
			: $images.removeClass('active').first().addClass('active');

	}).first().addClass('active').end();

	// Lazy load

	// var $images = $('.poster_item');

	// $images.on('click', function(e) {
	// 	var $this = $(this);

	// 	clearInterval(interval);
	// 	interval = setInterval(timer, 3000);

	// 	$this.index() < $images.length - 1
	// 		? $images.removeClass('active').filter(this).next().not('.load').attr('src', $this.next().attr('data-src')).end().addClass('active load')
	// 		: $images.removeClass('active').first().not('.load').attr('src', $images.first().attr('data-src')).end().addClass('active load');


	// }).last().trigger('click');


});