$(function() {

	var timer = function() {
		$('.active').trigger('click');
	};

	var interval = setInterval(timer, 3000);

	var $images = $('.poster_item');

	$images.on('click', function(e) {

		clearInterval(interval);
		interval = setInterval(timer, 3000);

		var flag_round = $(this).index() < $images.length - 1;
		var $next_load = flag_round
			? $images.filter(this).nextAll()
			: $images.first().nextAll().andSelf();

		$next_load.slice(0, 2).not('.load').each(function() {
			var $this = $(this);
			$this.attr('src', $this.attr('data-src')).addClass('load').removeAttr('data-src');
		});

		flag_round
			? $images.removeClass('active').filter(this).next().addClass('active')
			: $images.removeClass('active').first().addClass('active');


	}).last().trigger('click');


});