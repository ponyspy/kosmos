$(function() {

	var timer = function() {
		$('.active').trigger('click');
	};

	var interval = setInterval(timer, 3000);

	var $images = $('.poster_item').on('click', function(e) {

		clearInterval(interval);
		interval = setInterval(timer, 3000);

		$(this).index() < $images.length - 1
			? $images.removeClass('active').filter(this).next().addClass('active')
			: $images.removeClass('active').first().addClass('active');

	}).first().addClass('active').end();

});