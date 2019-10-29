 $(function()
{	
	
	applygotop();
	applyNav();
});

	
	
function applygotop()
	{
	
		jQuery(window).scroll(function () {
			if(jQuery(this).scrollTop() > 1) {
				jQuery('.sa-gotop').css({
					opacity: 1
				});
			} else {
				jQuery('.sa-gotop').css({
					opacity: 0
				});
			}
		});
		$(document).on('click','.sa-gotop',function(){
		
			jQuery('html, body').animate({
				scrollTop: '0px'
			}, 800);
			return false;
		});
		
					
	
	}
	

	$(window).scroll(function(){
		if ($(window).scrollTop() >= 20) {
		    
			 $('.sa-main-header').addClass('minheader');
			
			 $('.min_header_hide').addClass('hide');
			
		}
		else {
		  
		    $('.sa-main-header').removeClass('minheader');
			
			 $('.min_header_hide').removeClass('hide');
			
		}
	});
			
		
		
		function applyNav()
	{		
		
		$('.inr-link').click(function(){
			$('html, body').animate({
				scrollTop: $( $(this).attr('href') ).offset().top
			}, 1000);
			return false;
		});	
		
		
		$('.sa_navclk').click(function() {
			$('.nav-sec').addClass('open');
			$('html').addClass('shownav');
			//$('html').addClass('noscroll');
		});
		
		$('.sa_navclose').click(function() {
			$('.nav-sec').removeClass('open');
			$('html').removeClass('shownav');
			//$('html').removeClass('noscroll');
		});
		
		
		$('.mobile_category_btn').click(function() {
			
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$("#sa_category_mobile").removeClass('sa_category_open');
				$('.mobile_category_over').addClass('sa_hide');
				$('html').removeClass('noscroll');
			} else {
				$(this).addClass('active');
				$("#sa_category_mobile").addClass('sa_category_open');
				$('.mobile_category_over').removeClass('sa_hide');
				$('html').addClass('noscroll');
				
			}
			
		});
		
		
		$('.mobile_category_over').click(function() {
			$('.mobile_category_btn').removeClass('active');
			$("html").removeClass('noscroll');
			$("#sa_category_mobile").removeClass('sa_category_open');
			$('.mobile_category_over').addClass('sa_hide');
		});
		
		
	
	
	}
	
	
