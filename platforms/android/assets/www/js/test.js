      function initialize() 
	  {
        var map_html = document.getElementById('map');
        var map_options = 
		{
          center: new google.maps.LatLng(43.7, 7.25),
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        var map = new google.maps.Map(map_html, map_options);
		var marker = new google.maps.Marker(
		{
			position: new google.maps.LatLng(43.7, 7.25),
			map: map,
			title: "poil",
		});
		var myWindowOptions = 
		{
			content:'<div style="background-color:blue;color:red;font-size:40px;">Test ! <a style="font-size:40px;" href="#" title="Site officiel">Lien du Test (La meme page hehe :D )</a></div>',
		};
		var myInfoWindow = new google.maps.InfoWindow(myWindowOptions);
		google.maps.event.addListener(marker, 'click', function()
		{
			myInfoWindow.open(map, marker);
			});
			
	  }
