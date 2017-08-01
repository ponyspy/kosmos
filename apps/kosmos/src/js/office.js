$(function() {
	$('.block_cut').on('click', function() {
		$(this).parent().find('.hidden').removeClass('hidden').end().end().remove();
	});
});