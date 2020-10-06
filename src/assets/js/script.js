
 $(document).ready(function()
{	
	applygotop();

});

 
	$(window).scroll(function(){
		if ($(window).scrollTop() >= 20) {
		    
			 $('#header').addClass('minheader');
			 $('.rg-logo').addClass('minlogo');
			 $('.min_header_hide').addClass('hide');
			
		}
		else {
		  
		    $('#header').removeClass('minheader');
			$('.rg-logo').removeClass('minlogo');
			 $('.min_header_hide').removeClass('hide');
			
		}
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
		jQuery(document).on('click','.sa-gotop',function(){
			jQuery('html, body').animate({
				scrollTop: '0px'
			}, 800);
			return false;
		});
		
	}
	

