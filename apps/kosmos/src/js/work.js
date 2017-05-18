$(function() {

	$('.gallery-block').each(function() {
		var $this = $(this);

		var gallery = new Swiper($this.children('.swiper-container'), {
			keyboardControl: true,
			nextButton: $this.children('.swiper-button-next'),
			prevButton: $this.children('.swiper-button-prev'),
			spaceBetween: 40,
			autoHeight: true,
			slidesPerView: 1,
			// preloadImages: false,
			// lazyLoading: true,
			// lazyLoadingInPrevNext: true,
			// lazyLoadingInPrevNextAmount: 2
		});

	});

	var $images = $('.image').on('load', function(e) {
		$(this).addClass('loaded');
	});

	var $document = $(document).on('scroll', function() {
		$images.each(function() {
			var $this = $(this);

			if ($document.scrollTop() + $document.height() + 200 > $this.offset().top) {
				if ($images.length === 0) {
					$document.off('scroll');
				} else {
					$images = $images.filter(this);
				}

				$this.attr('src', $this.attr('data-src'));
			}
		});
	});

	// var bLazy = new Blazy({
	// 	offset: 100,
	// 	selector: '.image',
	// 	successClass: 'loaded'
	// });

});