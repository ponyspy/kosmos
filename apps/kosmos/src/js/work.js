$(function() {

	$('.gallery-block').each(function() {
		var $gallery_top = $(this).children('.gallery-top');

		var galleryTop = new Swiper($gallery_top, {
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

});