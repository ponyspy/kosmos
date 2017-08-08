$(function() {
	var $window = $(window);
	var $document = $(document);

	var work_type = $('body').attr('class').split(' ')[0] == 'project' ? 'projects' : 'research';
	var context = {
		skip: 0,
		limit: 4,
		category: window.location.hash.replace('#', '')
	};

	var scrollLoader = function(e) {
		if ($window.scrollTop() + $window.height() + 200 >= $document.height()) {

			$window.off('scroll');

			$.ajax({url: '/' + work_type, method: 'POST', data: { context: context }, async: false }).done(function(data) {
				if (data !== 'end') {

					$('.works_block').append(data).promise().done(function() {
						$('.category_item').removeClass('current').filter(context.category != '' ? '.' + context.category : '').addClass('current');
					});

					context.skip += 4;
					$window.on('scroll', scrollLoader);
				}
			});
		}
	};

	$window.on('load hashchange', function(e) {
		context.skip = 0;
		context.limit = 4;
		context.category = window.location.hash.replace('#', '');

		$.ajax({url: '/' + work_type, method: 'POST', data: { context: context }, async: false }).done(function(data) {
			if (data !== 'end') {
				var $data = $(data);

				$('.works_block').empty().append($data).promise().done(function() {
					$('.category_item').removeClass('current').filter(context.category != '' ? '.' + context.category : '').addClass('current');
				});

				context.skip = $data.length;
				$window.off('scroll').scrollTop(0).on('scroll', scrollLoader);
			}
		});
	});

	$document.on('click', '.category_item.current', function(e) {
		e.preventDefault();

		window.location.href = '#';
	});

});