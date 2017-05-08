$(function() {

	$('.gallery-block').each(function() {
		var $gallery = $(this).children('.swiper-container');

		var gallery = new Swiper($gallery, {
			keyboardControl: true,
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
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