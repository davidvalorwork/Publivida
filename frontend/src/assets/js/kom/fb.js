 /* facebook & instagram */
var oAlbumFB = null;
$(".image-tab-item").on('click', function(e){
	
	// spinner
	
	
	var oTab = $(this).attr('for');
	
	// ================================================================= Facebook
	if(oTab == "tab-facebook"){
		console.log('-- facebook tab');			
		
		console.log('-- spinner: ');
		console.log($('#idTabImageFacebook'));
		$('i#idTabImageFacebook').addClass('fa fa-spinner fa-spin')
			.removeClass('fab fa-facebook-square');
		
		FB.init({
		  appId            : '177264236677479',
		  autoLogAppEvents : true,
		  xfbml            : true,
		  version          : 'v5.0'
		});
			
		FB.getLoginStatus(response => {
			if(response.status === 'connected'){ 
				
				FB.api('/me', function(response) {	
					//$('.facebook-row').append('Good to see you again, ' + response.name + '.');
					// tampilkan album
					FB.api('/me?fields=albums.limit(5){name,count,cover_photo{picture}}', response => {								
						// tampilkan album fb
						f__tampilkan_album_fb(response.albums.data);	
					});
				});
			}else{
				console.log('Logged out');
				FB.login(function(response) {
					if (response.authResponse) {
						console.log('Welcome!  Fetching your information.... ');
						FB.api('/me', function(r) {									
							//$('.facebook-row').html('Good to see you, ' + response.name + '.');
							// tampilkan album
							FB.api('/me?fields=albums.limit(5){name,count,cover_photo{picture}}', r => {
								// tampilkan album fb
								f__tampilkan_album_fb(r.albums.data);
							});
						});
					} else {
						console.log('User cancelled login or did not fully authorize.');
					}
				});		
			}
		});
	}
	
	// ================================================================= Instagram
	if(oTab == "tab-instagram"){
		FB.init({
		  appId            : '177264236677479',
		  autoLogAppEvents : true,
		  xfbml            : true,
		  version          : 'v5.0'
		});
			
		FB.getLoginStatus(response => {
			if(response.status === 'connected'){ 
				
				FB.api(
				  "/me",
				  "GET", { "fields": "instagram_accounts" }, // Get Instagram's account ID
				  function (response) {
					
					console.log(response);
					//console.log('-- instagram id: ' + response.instagram_business_account.id);
					//$('.instagram-row').append('-- id instagram: ' + response.instagram_business_account.id);
					
					// instagram					
					FB.api(
					  "/" + response.instagram_accounts.id + "/media", // Get Instagram's media
					  "GET", { "fields": "shortcode" }, // In this case, only shortcode
					  function (response) {
						// Do something with the data
					  }
					);
				  }
				);
			}else{
				
				FB.login(function(response) {
					if (response.authResponse) {
						
						console.log(response);
						//console.log('-- instagram id: ' + response.instagram_business_account.id);						
						//$('.instagram-row').append('-- id instagram: ' + response.instagram_business_account.id);
						
						FB.api(
						  "/me",
						  "GET", { "fields": "instagram_accounts" }, // Get Instagram's account ID
						  function (response) {
							FB.api(
							  "/" + response.instagram_accounts.id + "/media", // Get Instagram's media
							  "GET", { "fields": "shortcode" }, // In this case, only shortcode
							  function (response) {
								// Do something with the data
							  }
							);
						  }
						);
					} else {
						console.log('User cancelled login or did not fully authorize.');
					}
				});		
			}
		});
	}
	
	
	// ================================================================= Function
	// ============ f__tampilkan_album_fb
	var f__tampilkan_album_fb = function(vf__arr_data_albums){
		
		vf__arr_data_albums.forEach(album => {
			console.log(album.cover_photo);
			if(typeof album.cover_photo != 'undefined' ){
				var oCoverAlbumJpg = album.cover_photo.picture;
				$('.facebook-row').append('<div class="cl__cover_album_fb"><img class="portrait" src="' + oCoverAlbumJpg + '"></div>'); 
				//$('.facebook-row').append('<div class="cl__judul_album_fb">' + album.name + '</div>');
			}
			
			if(typeof album.cover_photo == 'undefined'){
				if(typeof album.name != 'undefined'){
					//$('.facebook-row').append('<div class="cl__judul_album_fb">' + album.name + '</div>');
				}
			}
			//var oCoverAlbumJpg = album.cover_photo.picture; 
			
			//$('.facebook-row').append('<img src="' + oCoverAlbumJpg + '">');
			
			// remove spinner
			$('i#idTabImageFacebook').addClass('fab fa-facebook-square')
			.removeClass('fa fa-spinner fa-spin');
		});
		
		// salin objek albums ke objek albums lokal
		//oAlbumFB = response.albums; 
	}
});
    
   
    

 

