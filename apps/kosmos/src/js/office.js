$(function() {
		var $gallery_press = $('.gallery-press');

		var galleryPress = new Swiper($gallery_press, {
			keyboardControl: true,
			pagination: '.swiper-pagination',
			paginationClickable: true,
			spaceBetween: 80,
			slidesPerView: 3,
			// autoHeight: true,
			// centeredSlides: true,
			breakpoints: {
				680: {
					slidesPerView: 1,
					spaceBetween: 10
				},
			}
		});

		$('.block_cut').on('click', function() {
			$(this).nextAll().removeClass('hidden').end().remove();
		});
});