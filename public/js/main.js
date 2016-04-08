$(window).load(function() {
	var pageUrl = location.hash;
	var indexHalaman = ['/home', '/dashboard', '/index', ''];
	if (pageUrl == '' || pageUrl == '#_=_') {
		pageUrl = '/dashboard';
	}
	console.log(indexHalaman.indexOf(pageUrl));
	if (indexHalaman.indexOf(pageUrl) == -1) {
		var url = pageUrl.slice(1);
		$.ajax({
			url : url,
			type : 'GET',
			beforeSend : function() {
				console.log("Loading");
			},
			success : function(msg) {
				$("#main-content").html(msg);				
				// window.history.pushState({path: pageUrl}, '', '#' + pageUrl);
				menuActive(url);
			}
		});
	}
});

$(function() {
	$("a").click(function() {
		var indexHalaman = ['/home', '/dashboard', '/index'];
		var pageUrl = $(this).attr("href");
		if (pageUrl != "#") {
			if (pageUrl == '/') {
				pageUrl = '/home';
			}

			$.ajax({
				url : pageUrl,
				type : 'GET',
				beforeSend : function() {
					console.log("Loading");
				},
				success : function(msg) {
					$("#main-content").html(msg);
					// if(pageUrl != window.location) {
					window.history.pushState({path: pageUrl}, '', '#' + pageUrl);
					// }
				}
			})			
			return false;
		}
	});

	$(".nav a").click(function() {
		var url = $(this).attr("href");
		if (url != "#") {
			menuActive(url);
			return false;;
		}
	})
})

function menuActive(url) {
	$(".nav li").removeClass("active");
	// $(".nav li").removeClass("active").each(function(doc) {
	// 	if ($(this).find("ul").hasClass("nav-show")) {
	// 		$(this).find("ul").removeClass("nav-show").addClass("nav-hide").css({"display" : "none"});
	// 	}
	// 	$(this).removeClass("open");
	// });
	var selector = $('.nav li:has(a[href="' + url + '"])');
	selector.addClass("active");
	if (selector.find("a").hasClass("dropdown-toggle")) {
		selector.find("a").closest("ul").closest("li").addClass("active open");
	}
}
