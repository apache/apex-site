$(function(){
	if($(".fixed-links").length == 0) {
		return false;
	}

	var  fl = $(".fixed-links"),
	flh = fl.height(),
	navh = $("nav").height();

	$(window).scroll(function() {
		if( $(this).scrollTop() > navh ) {
			fl.addClass("stick");
		} else {
			fl.removeClass("stick");
		}
	});

	var target, topV;

	$(".docs-nav ul li a[href^='#']").click(function() {
		target = $(this.hash);

		$(this).parents("ul").find("li.active").removeClass("active");
		$(this).parent().addClass("active");

		if (target.length == 0){
			console.log("anchor is not right.");
			return false;
		} 

		if(fl.hasClass("stick")) {
			topV = flh + 10;
		}else{
			topV = 2* flh + 20;
		}

		$('html, body').animate({ 
			scrollTop: target.offset().top - topV}, 500);

		return false;
	});	
});