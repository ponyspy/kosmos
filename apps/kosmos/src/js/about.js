$(function() {
		var $gallery_press = $('.gallery-press');

		var galleryPress = new Swiper($gallery_press, {
			keyboardControl: true,
			pagination: '.swiper-pagination',
			paginationClickable: true,
			spaceBetween: 40,
			slidesPerView: 3,
			// autoHeight: true,
			// centeredSlides: true,
		});
});