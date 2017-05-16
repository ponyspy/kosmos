$(function() {

	var timer = function() {
		$('.active').trigger('click');
	};

	var interval = setInterval(timer, 3000);

	var $images = $('.poster_item');

	$images.on('click', function(e) {

		clearInterval(interval);
		interval = setInterval(timer, 3000);


		if ($(this).index() < $images.length - 1) {
			$images.filter(this).nextAll().slice(0, 2).not('.load').each(function() {
				var $this = $(this);
				$this.attr('src', $this.attr('data-src')).addClass('load').removeAttr('data-src');
			});

			$images.removeClass('active').filter(this).next().addClass('active');
		} else {
			$images.first().nextAll().andSelf().slice(0, 2).not('.load').each(function() {
				var $this = $(this);
				$this.attr('src', $this.attr('data-src')).addClass('load').removeAttr('data-src');
			});

			$images.removeClass('active').first().addClass('active');
		}


	}).last().trigger('click');


});