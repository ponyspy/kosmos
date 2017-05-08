$(function() {

	$('.gallery-block').each(function() {
		var $gallery = $(this).children('.swiper-container');

		var gallery = new Swiper($gallery, {
			// initialSlide: 0,
			keyboardControl: true,
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
			spaceBetween: 40,
			autoHeight: true,
			slidesPerView: 1,
			// centeredSlides: true,
		});

	});

	var bLazy = new Blazy({
		offset: 100,
		selector: '.image',
		successClass: 'load',
		breakpoints: [
			{
				width: 420,
				src: 'data-src-small'
			}
		]
	});

});