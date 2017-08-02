$(function() {
	var $window = $(window);
	var type = $('body').attr('class').split(' ')[0] == 'project' ? 'projects' : 'research';
	var context = {
		skip: 0,
		limit: 6,
		category: window.location.hash === '' ? 'all' : window.location.hash.replace('#','')
	};

	function scrollLoader(event) {
		if ($window.scrollTop() + $window.height() + 600 >= $(document).height()) {
			$window.off('scroll');
			$.ajax({url: '/' + type, method: 'POST', data: { context: context }, async: false }).done(function(data) {
				if (data !== 'end') {
					$('.works_block').append(data).promise().done(function() {
						$('.category_item').removeClass('current').filter('.' + context.category).addClass('current');
					});
					context.skip += 6;
					$window.on('scroll', scrollLoader);
				}
			});
		}
	}

	$window
		.on('scroll', scrollLoader)
		.on('load hashchange', function(event) {
			context.skip = 0;
			context.limit = 6;
			context.category = window.location.hash === '' ? 'all' : window.location.hash.replace('#', '');

			$.ajax({url: '/' + type, method: 'POST', data: { context: context }, async: false }).done(function(data) {
				if (data !== 'end') {
					var elems = $(data);
					context.skip = elems.length;

					$('.works_block').empty().append(data).promise().done(function() {
						$('.category_item').removeClass('current').filter('.' + context.category).addClass('current');
					});

					$window.on('scroll', scrollLoader);
				}
			});
		});
});