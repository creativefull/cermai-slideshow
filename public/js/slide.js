$(function() {
	$(".slideshow, .slideshow > div").fadeIn(200);
	$("#slideshow > div:gt(0)").hide();

	setInterval(function() { 
		$('#slideshow > div:first')
			.fadeOut(1000, function() {
				$(this).find(".box-caption").animate({
					bottom : "-100%"
				}, 100);				
			})
			.next()
			.fadeIn(1000, function() {
				$(this).find(".box-caption").animate({
					bottom : "0%"
				}, 1000);
			})
			.end()
			.appendTo('#slideshow');
	},	5000);
})