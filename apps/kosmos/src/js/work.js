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

	var bLazy = new Blazy({
		offset: 100,
		selector: '.image',
		successClass: 'loaded'
	});

});