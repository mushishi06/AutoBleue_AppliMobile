
var map, markers, currentAddr;
var infoswindow=new Array();
var activeInfoWindows = 0;
var myLatlng = null;
var markerCurrent = null;
MIN_ACCURACY = 50; //metres
MAX_ACCURACY = 1500
var watchID = null;
var currentCercle;

/**
 *  @brief Brief
 *  
 *  @return Return an Object with attribute "name" and an Array "version" 
 *  
 *  @details Get a version and name of the module
 */
function getInfosModuleVersion() {
	var module_version=new Object();
	module_version = {"name":"module_maps", "version":[0,1,22] };
	var _version = module_version.version[0] + "." + module_version.version[1] + "." + module_version.version[2];
	var _msg = module_version.name + " : " + _version;
	alert(_msg);
	return	module_version;
}

function setInfosWindowContent(spots){
	for(i = 0; i < spots.length; i++){
		infoswindow[spots[i]['id']]['infowindow'].setContent(infoswindow[spots[i]['id']]['content'] + spots[i]['content']);
	}
}

function closeInfoWindows(){
	if(activeInfoWindows != 0)
		infoswindow[activeInfoWindows]['infowindow'].close();
	activeInfoWindows = 0;
}

function setSpotInfosWindowContent(idspot, content){
	infoswindow[idspot]['infowindow'].setContent(infoswindow[idspot]['content'] + content);
}

function HomeControl(controlDiv, map) {
	controlDiv.style.padding = '5px';
	var controlUI = document.createElement('DIV');
	controlUI.style.backgroundColor = 'white';
	controlUI.style.borderStyle = 'solid';
	controlUI.style.borderWidth = '2px';
	controlUI.style.cursor = 'pointer';
	controlUI.style.textAlign = 'center';
	
	controlUI.title = 'View the map in full screen';
	controlDiv.appendChild(controlUI);

	var controlText = document.createElement('DIV');
	controlText.style.fontFamily = 'Arial,sans-serif';
	controlText.style.fontSize = '12px';
	controlText.style.paddingLeft = '4px';
	controlText.style.paddingRight = '4px';
	controlText.innerHTML = 'Ou suis-je';
	controlUI.appendChild(controlText);

	google.maps.event.addDomListener(controlUI, 'click', function() {
		console.log('addLocation');
		var options = {enableHighAccuracy: true }; //maximumAge: 5000, timeout: 5000,
        watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
		//	 navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
		
		// onSuccess Geolocation
		//
		function onSuccess(position) {
			if (position.coords.accuracy > MAX_ACCURACY){
				console.log("Position rejected because accuracy is less than required "+ MAX_ACCURACY+" metres");
				return;
			}
			else if (position.coords.accuracy <= MIN_ACCURACY) {
				clearWatch();	
			}
			else {
				var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				myLatlng = location;
				map.setZoom(15);
				if (markerCurrent == null){
					markerCurrent = new google.maps.Marker({
						position: location,
						map: map
					});
					var cercleOptions = {
						strokeColor: '#009ACD',
						strokeOpacity: 0.8,
						strokeWeight: 2,
						fillColor: '#009ACD',
						fillOpacity: 0.35,
						map: map,
						center: location,
						radius: position.coords.accuracy
					};
					// Add the circle for this city to the map.
					currentCercle = new google.maps.Circle(cercleOptions);	
				}
				else{
					markerCurrent.setPosition(location);
					currentCercle.setRadius(position.coords.accuracy);
					currentCercle.setCenter(location);
				}
				
				map.setCenter(myLatlng);
			}
		}
		
		// onError Callback receives a PositionError object
		//
		function onError(error) {
			alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
			// need activate <gap:plugin name="org.apache.cordova.dialogs" /> in config.xml ligne 68
			// navigator.notification.alert(
				// 'code: '    + error.code    + '\n' + 'message: ' + error.message + '\n',  // message
				// null,         // callback
				// 'Erreur Geolocalisation',            // title
				// 'Done'                  // buttonName
			// );
			clearWatch();
		}
		
		function clearWatch() {
			if (watchID != null) {
				navigator.geolocation.clearWatch(watchID);
				watchID = null;
			}
		}
	});
}

// fonction affichage icone/control personalise sur la map

function HomeControl2(controlDiv, map) {
	controlDiv.style.padding = '5px';
	var controlUI = document.createElement('DIV');
	controlUI.style.backgroundColor = 'white';
	controlUI.style.borderStyle = 'solid';
	controlUI.style.borderWidth = '2px';
	controlUI.style.cursor = 'pointer';
	controlUI.style.textAlign = 'center';
	
	controlUI.title = 'View the center map';
	controlDiv.appendChild(controlUI);

	var controlText = document.createElement('DIV');
	controlText.style.fontFamily = 'Arial,sans-serif';
	controlText.style.fontSize = '12px';
	controlText.style.paddingLeft = '4px';
	controlText.style.paddingRight = '4px';
	controlText.innerHTML = 'Centrer la map';
	controlUI.appendChild(controlText);

	google.maps.event.addDomListener(controlUI, 'click', function() {
		map.setCenter(myLatlng);
		//map.setZoom(16);
	});
}

function initialize_gmap() {
	myLatlng = new google.maps.LatLng(43.699651,7.235184);
	var myOptions = {
		zoom: 12,
		panControl: false,
		zoomControl: false,
		streetViewControl: false,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	
	
	function makeGMap(idMap){
		return new google.maps.Map(document.getElementById(idMap), myOptions);
	}
	
	function attachMarker(map){
		var i = 0;
		markers = Array();
		 markers[i++] = {"lat":43.663346, "idspot":201, "lng":7.150721, "street":"6 ave de l\'Hôtel des Postes", "zip":"06801", "city":"CAGNES-SUR-MER", "name":'CAGNES-SUR-MER - Place de Gaulle', "typeVehicles": " : Peugeot iOn, Utilitaire / Commercial van", "typesAuto": [0,0,0,0]};
 markers[i++] = {"lat":43.65952, "idspot":875, "lng":7.204195, "street":"Terminal 2", "zip":"06200", "city":"NICE", "name":'NICE - Aéroport T2', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.69973, "idspot":212, "lng":7.2832187, "street":"7 rue Emmanuel Philibert  ", "zip":"06300", "city":"NICE", "name":'NICE - Philibert', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.7040436, "idspot":179, "lng":7.2680228, "street":"18 ave Notre Dame  ", "zip":"06000", "city":"NICE", "name":'NICE - Notre Dame', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.6904, "idspot":157, "lng":7.2425705, "street":"28 ave de La Californie  ", "zip":"06200", "city":"NICE", "name":'NICE - Californie ', "typeVehicles": " : Peugeot iOn, Utilitaire / Commercial van"};
 markers[i++] = {"lat":43.710104, "idspot":891, "lng":7.258099, "street":"28 bld Joseph Garnier", "zip":"06100", "city":"NICE", "name":'NICE - Joseph Garnier', "typeVehicles": " : Peugeot iOn, Utilitaire / Commercial van"};
 markers[i++] = {"lat":43.709213, "idspot":310, "lng":7.292829, "street":"5 bld Saint Roch", "zip":"06300", "city":"NICE", "name":'NICE - Saint Roch', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.6709313, "idspot":190, "lng":7.1907633, "street":"940-990 ave du Général de Gaulle", "zip":"06700", "city":"SAINT-LAURENT-DU-VAR", "name":'ST LAURENT DU VAR - Square Benes', "typeVehicles": " : Peugeot iOn, Utilitaire / Commercial van"};
 markers[i++] = {"lat":43.7166586, "idspot":113, "lng":7.2567341, "street":"44 ave Cyrille Besset  ", "zip":"06100", "city":"NICE", "name":'NICE - Cyrille Besset  ', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.717418, "idspot":332, "lng":7.272158, "street":"57 bld de Cimiez", "zip":"06000", "city":"NICE", "name":'NICE - Cimiez', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.7007339, "idspot":91, "lng":7.2733391, "street":"2 place Wilson", "zip":"06000", "city":"NICE", "name":'NICE - Place Wilson', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.695431, "idspot":1075, "lng":7.257174, "street":"81 rue de France", "zip":"06000", "city":"NICE", "name":'NICE - Eglise Saint Pierre d\'Arène', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.69928, "idspot":135, "lng":7.26979, "street":"5 rue Gustave Deloye  ", "zip":"06000", "city":"NICE", "name":'NICE - Deloye', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.700688, "idspot":887, "lng":7.262184, "street":"2 ave Durante", "zip":"06000", "city":"NICE", "name":'NICE - Place Mozart', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.7050315, "idspot":69, "lng":7.2864847, "street":"28-32 rue Auguste Gal  ", "zip":"06300", "city":"NICE", "name":'NICE - Auguste Gal', "typeVehicles": " : Peugeot iOn, Utilitaire / Commercial van"};
 markers[i++] = {"lat":43.6950562, "idspot":80, "lng":7.277808, "street":"28-30 rue des Ponchettes  ", "zip":"06300", "city":"NICE", "name":'NICE - Ponchettes', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.698481, "idspot":398, "lng":7.255614, "street":"56 rue Saint Philippe", "zip":"06000", "city":"NICE", "name":'NICE - Saint Philippe', "typeVehicles": " : Peugeot iOn, Utilitaire / Commercial van"};
 markers[i++] = {"lat":43.671062, "idspot":541, "lng":7.208181, "street":"58 route de Grenoble", "zip":"06200", "city":"NICE", "name":'NICE - Route de Grenoble', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.700711, "idspot":497, "lng":7.253683, "street":"22 rue Châteauneuf ", "zip":"06000", "city":"NICE", "name":'NICE - Chateauneuf', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.68655, "idspot":694, "lng":7.226285, "street":"72 bld Napoléon III", "zip":"06200", "city":"NICE", "name":'NICE - Napoleon III', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.698036, "idspot":819, "lng":7.258967, "street":"53 bld Victor Hugo", "zip":"06000", "city":"NICE", "name":'NICE - Victor Hugo', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.707245, "idspot":839, "lng":7.268831, "street":"8 bld Raimbaldi", "zip":"06000", "city":"NICE", "name":'NICE - Raimbaldi', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.714185, "idspot":574, "lng":7.25908, "street":"56 rue Théodore de Banville", "zip":"06100", "city":"NICE", "name":'NICE - Banville', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.706413, "idspot":288, "lng":7.263489, "street":"2 rue Trachel", "zip":"06000", "city":"NICE", "name":'NICE - Trachel', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.703979, "idspot":939, "lng":7.261659, "street":"11 ave Thiers", "zip":"06000", "city":"NICE", "name":'NICE - Gare Thiers - Parvis', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.710116, "idspot":321, "lng":7.289041, "street":"31 rue Monseigneur Daumas", "zip":"06300", "city":"NICE", "name":'NICE - Saint Jean d\'Angely', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.698488, "idspot":919, "lng":7.272673, "street":"2-4 Rue Alberti", "zip":"06000", "city":"NICE", "name":'NICE - Alberti', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.69459, "idspot":508, "lng":7.25317, "street":"2 rue des Potiers", "zip":"06000", "city":"NICE", "name":'NICE - Grosso', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.720537, "idspot":343, "lng":7.262418, "street":"2 ave Alfred de Musset", "zip":"06100", "city":"NICE", "name":'NICE - Alexandre Médecin', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.702379, "idspot":915, "lng":7.271679, "street":"3-5 Rue Provana Leyni", "zip":"06000", "city":"NICE", "name":'NICE - Provana Leyni', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.705056, "idspot":420, "lng":7.29059, "street":"14 place Auguste Blanqui", "zip":"06300", "city":"NICE", "name":'NICE - Gare Riquier', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.658162, "idspot":931, "lng":7.150768, "street":"46 bld Maréchal Juin", "zip":"06800", "city":"CAGNES-SUR-MER", "name":'CAGNES-SUR-MER - Les Muriers', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.773494, "idspot":365, "lng":7.19141, "street":"chemin du Roure", "zip":"06510", "city":"CARROS", "name":'CARROS - Roure', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.697963, "idspot":911, "lng":7.252044, "street":"30 Avenue des Fleurs", "zip":"06000", "city":"NICE", "name":'NICE - Fleurs', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.706872, "idspot":815, "lng":7.330342, "street":"bld Marinoni", "zip":"06310", "city":"BEAULIEU-SUR-MER", "name":'BEAULIEU - Marinoni', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.712647, "idspot":409, "lng":7.284592, "street":"41 route de Turin ", "zip":"06300", "city":"NICE", "name":'NICE - Turin', "typeVehicles": " : Peugeot iOn, Utilitaire / Commercial van"};
 markers[i++] = {"lat":43.6976043, "idspot":146, "lng":7.262856, "street":"11 bis rue du Congrès  ", "zip":"06000", "city":"NICE", "name":'NICE - Congrès', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.706849, "idspot":631, "lng":7.25647, "street":"47 rue Vernier", "zip":"06000", "city":"NICE", "name":'NICE - Vernier', "typeVehicles": " : Peugeot iOn, Utilitaire / Commercial van"};
 markers[i++] = {"lat":43.701482, "idspot":899, "lng":7.27635, "street":"7 rue Delille", "zip":"06000", "city":"NICE", "name":'NICE - Delille', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.69607, "idspot":453, "lng":7.28664, "street":"43 bld Stalingrad", "zip":"06300", "city":"NICE", "name":'NICE - Stalingrad', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.7031, "idspot":895, "lng":7.25366, "street":"20 bld Tzarewitch", "zip":"06000", "city":"NICE", "name":'NICE - Tzarewitch', "typeVehicles": ""};
 markers[i++] = {"lat":43.70317, "idspot":442, "lng":7.28358, "street":"16 rue Georges Ville", "zip":"06300", "city":"NICE", "name":'NICE - Georges Ville', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.67441, "idspot":563, "lng":7.226218, "street":"8 rue Marie Bashkirtseff", "zip":"06200", "city":"NICE", "name":'NICE - René Cassin', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.724851, "idspot":530, "lng":7.271148, "street":"55 ave de La Marne", "zip":"06100", "city":"NICE", "name":'NICE - La Marne', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.68693, "idspot":831, "lng":7.238162, "street":"195 promenade des Anglais", "zip":"06200", "city":"NICE", "name":'NICE - Fabron', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.7105372, "idspot":124, "lng":7.2632441, "street":"10 rue Flaminius Raiberti  ", "zip":"06000", "city":"NICE", "name":'NICE - Raiberti', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.741712, "idspot":387, "lng":7.312887, "street":"15 bld François Suarez ", "zip":"06340", "city":"LA TRINITE", "name":'LA TRINITE - Suarez', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.72339, "idspot":102, "lng":7.25018, "street":"141-143 bld de Cessole  ", "zip":"06100", "city":"NICE", "name":'NICE - Cessole', "typeVehicles": " : Peugeot iOn, Utilitaire / Commercial van"};
 markers[i++] = {"lat":43.70375, "idspot":486, "lng":7.26168, "street":"37 ave Auber", "zip":"06000", "city":"NICE", "name":'NICE - Gare Thiers - Auber', "typeVehicles": " : Peugeot iOn, Utilitaire / Commercial van"};
 markers[i++] = {"lat":43.762912, "idspot":552, "lng":7.221402, "street":"12 rue Etienne Curti", "zip":"06670", "city":"COLOMARS", "name":'COLOMARS - Village', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.715435, "idspot":907, "lng":7.26265, "street":"110 Avenue Saint Lambert", "zip":"06000", "city":"NICE", "name":'NICE - Saint Lambert', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.702186, "idspot":903, "lng":7.265543, "street":"6 Avenue Georges Clémenceau", "zip":"06000", "city":"NICE", "name":'NICE - Clémenceau', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.704521, "idspot":843, "lng":7.233519, "street":"167-169 bld de La Madeleine", "zip":"06000", "city":"NICE", "name":'NICE - Madeleine', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.7035219, "idspot":14, "lng":7.260774, "street":"23 ave Thiers", "zip":"06000", "city":"NICE", "name":'NICE - Gare Thiers - Poste', "typeVehicles": " : Peugeot iOn, Partner TPMR"};
 markers[i++] = {"lat":7.26979, "idspot":1283, "lng":43.69928, "street":"en voirie", "zip":"06000", "city":"NICE", "name":'en voirie', "typeVehicles": ""};
 markers[i++] = {"lat":43.658267, "idspot":935, "lng":7.16359, "street":"22 ave Général Leclerc", "zip":"06800", "city":"CAGNES-SUR-MER", "name":'CAGNES-SUR-MER - Général Leclerc', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.682592, "idspot":835, "lng":7.232442, "street":"192 ave de La Californie", "zip":"06200", "city":"NICE", "name":'NICE - Sainte Hélène', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.6957199, "idspot":36, "lng":7.2696198, "street":"15 rue Saint François de Paule", "zip":"06300", "city":"NICE", "name":'NICE - Saint Francois de Paule', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.695444, "idspot":519, "lng":7.236177, "street":"50 ave de La Bornala", "zip":"06200", "city":"NICE", "name":'NICE - La Bornala', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.69958, "idspot":354, "lng":7.258172, "street":"31 rue Verdi", "zip":"06000", "city":"NICE", "name":'NICE - Verdi', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.70231, "idspot":811, "lng":7.309186, "street":"7 ave du Général de Gaulle", "zip":"06230", "city":"VILLEFRANCHE-SUR-MER", "name":'VILLEFRANCHE - De Gaulle', "typeVehicles": " : Peugeot iOn, Utilitaire / Commercial van"};
 markers[i++] = {"lat":43.702377, "idspot":299, "lng":7.287939, "street":"46-50 rue Smolett", "zip":"06300", "city":"NICE", "name":'NICE - Smolett', "typeVehicles": " : Peugeot iOn, Utilitaire / Commercial van"};
 markers[i++] = {"lat":43.705406, "idspot":827, "lng":7.270621, "street":"21 ave Désambrois", "zip":"06000", "city":"NICE", "name":'NICE - Désambrois', "typeVehicles": " : Peugeot iOn"};
 markers[i++] = {"lat":43.723105, "idspot":376, "lng":7.108012, "street":"4 place du Maréchal Juin", "zip":"06140", "city":"VENCE", "name":'VENCE - Maréchal Juin', "typeVehicles": " : Peugeot iOn, Utilitaire / Commercial van"};
		
		for (i = 0; i < markers.length; i++) {
			var location = new google.maps.LatLng(markers[i].lat, markers[i].lng);
			var marker = new google.maps.Marker({
				icon: new google.maps.MarkerImage("./img/gmap2.gif", null, null, null, new google.maps.Size(18, 18)),
				position: location,
				map: map
			});
			var j = i + 1;
			marker.setTitle(markers[i].name + markers[i].typeVehicles);
			var message = markers[i].name + "";
			message += "<br />" + markers[i].typeVehicles +"<br />" + markers[i].street + "<br />" + markers[i].zip + " " + markers[i].city;
			infoswindow[markers[i].idspot] = new Array();
			infoswindow[markers[i].idspot]['content'] = message;
			infoswindow[markers[i].idspot]['title'] = markers[i].name + " : " + markers[i].typeVehicles;
			attachMessage(marker, message, i);
		}
		
		
	}
	function attachMessage(marker, content, i) {
		google.maps.event.addListener(marker, 'click', function(event) {
			jQuery('#parent-info-map').show();
			jQuery('#info-station > *').fadeIn(1000);
			jQuery('#content-station').html(content);
		});
	}

	map = makeGMap("gmap-unlogged-user");
	var homeControlDiv = document.createElement('DIV');
	var homeControl = new HomeControl(homeControlDiv, map);
	homeControlDiv.index = 1;
	var homeControlDiv2 = document.createElement('DIV');
	var homeControl2 = new HomeControl2(homeControlDiv2, map);
	homeControlDiv2.index = 1;
	map.controls[google.maps.ControlPosition.LEFT_CENTER].push(homeControlDiv);
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(homeControlDiv2);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(new missouristate.web.ZoomPanControl(map));
	attachMarker(map);

}

jQuery(window).load(function(){initialize_gmap();}); 

/** @preserve Maintained by the Office of Web & New Media, Missouri State University.
* Compacted version available at
* http://search.missouristate.edu/map/mobile/examples/ZoomPanControl_compiled.js
*
* Usage:
* map.controls[google.maps.ControlPosition.TOP_LEFT].push(new missouristate.web.ZoomPanControl(map));
*/

/**
* @param {string} tagName
* @param {Object.<string, string>} properties
* @returns {Node}
*/
function CreateElement(tagName, properties) {
    var elem = document.createElement(tagName);
    for (var prop in properties) {
        if (prop == "style")
            elem.style.cssText = properties[prop];
        else if (prop == "class")
            elem.className = properties[prop];
        else
            elem.setAttribute(prop, properties[prop]);
    }
    return elem;
}

/**
* @constructor
* @param {google.maps.Map} map
*/
function ZoomPanControl(map) {
    this.map = map;
    this.originalCenter = map.getCenter();

    var t = this;
    var zoomPanContainer = CreateElement("div", { 'style': "position: relative; padding: 5px;" });

    //Pan Controls
    var PanContainer = CreateElement("div", { 'style': "position: relative; left: 2px; top: 5px; width: 56px; height: 56px; padding: 5px; overflow: hidden;" });
    zoomPanContainer.appendChild(PanContainer);
    var div = CreateElement("div", { 'style': "width: 56px; height: 56px; overflow: hidden;" });
    div.appendChild(CreateElement("img", { 'alt': ' ', 'src': 'http://maps.gstatic.com/intl/en_ALL/mapfiles/mapcontrols3d5.png', 'style': "position: absolute; left: 0px; top: -1px; -moz-user-select: none; border: 0px none; padding: 0px; margin: 0px; width: 59px; height: 492px;" }));
    PanContainer.appendChild(div);    
    
    div = CreateElement("div", { 'style': "position: absolute; left: 0px; top: 19px; width: 18.6667px; height: 18.6667px; cursor: pointer;", 'title': 'Pan left' });
    google.maps.event.addDomListener(div, "click", function() { t.pan(PanDirection.LEFT); });
    PanContainer.appendChild(div);
    div = CreateElement("div", { 'style': "position: absolute; left: 37px; top: 19px; width: 18.6667px; height: 18.6667px; cursor: pointer;", 'title': 'Pan right' });
    google.maps.event.addDomListener(div, "click", function() { t.pan(PanDirection.RIGHT); });
    PanContainer.appendChild(div);
    div = CreateElement("div", { 'style': "position: absolute; left: 19px; top: 0px; width: 18.6667px; height: 18.6667px; cursor: pointer;", 'title': 'Pan up' });
    google.maps.event.addDomListener(div, "click", function() { t.pan(PanDirection.UP); });
    PanContainer.appendChild(div);
    div = CreateElement("div", { 'style': "position: absolute; left: 19px; top: 37px; width: 18.6667px; height: 18.6667px; cursor: pointer;", 'title': 'Pan down' });
    google.maps.event.addDomListener(div, "click", function() { t.pan(PanDirection.DOWN); });
    PanContainer.appendChild(div);
    div = CreateElement("div", { 'style': "position: absolute; left: 19px; top: 19px; width: 18.6667px; height: 18.6667px; cursor: pointer;", 'title': 'Reset center' });
    google.maps.event.addDomListener(div, "click", function() { t.map.setCenter(t.originalCenter); }); 
	google.maps.event.addDomListener(div, "click", function() { t.map.setCenter(map.setZoom(12)); });
    PanContainer.appendChild(div);
    
    //Zoom Controls
    var zoomContainer = CreateElement("div", { 'style': "position: relative; width: 58px; height: 48px; -moz-user-select: none; overflow: hidden;" });
    zoomPanContainer.appendChild(zoomContainer);
    div = CreateElement("div", { 'style': "position: absolute; left: 18px; top: 0px; width: 24px; height: 22px; overflow: hidden; background-image: url('http://maps.gstatic.com/intl/en_ALL/mapfiles/mapcontrols3d5.png'); background-position: -17px -65px; background-repeat: no-repeat; cursor: pointer;", 'title': 'Zoom in' });
    google.maps.event.addDomListener(div, "click", function() { t.zoom(ZoomDirection.IN); });
    zoomContainer.appendChild(div);
    div = CreateElement("div", { 'style': "position: absolute; left: 18px; top: 21px; width: 24px; height: 22px; overflow: hidden; background-image: url('http://maps.gstatic.com/intl/en_ALL/mapfiles/mapcontrols3d5.png'); background-position: -17px -360px; background-repeat: no-repeat; cursor: pointer;", 'title': 'Zoom out' });
    google.maps.event.addDomListener(div, "click", function() { t.zoom(ZoomDirection.OUT); });
    zoomContainer.appendChild(div);

    return zoomPanContainer;
}

/** @param {PanDirection} direction */
ZoomPanControl.prototype.pan = function(direction) {
    var panDistance = 50;
    if (direction == PanDirection.UP || direction == PanDirection.DOWN) {
        panDistance = Math.round(this.map.getDiv().offsetHeight / 2);
        this.map.panBy(0, direction == PanDirection.DOWN ? panDistance : -1 * panDistance);
    }
    else {
        panDistance = Math.round(this.map.getDiv().offsetWidth / 2);
        this.map.panBy(direction == PanDirection.RIGHT ? panDistance : -1 * panDistance, 0);
    }
}

/** @param {ZoomDirection} direction */
ZoomPanControl.prototype.zoom = function(direction) {
    var zoom = this.map.getZoom();
    if (direction == ZoomDirection.IN && zoom < 19)
        this.map.setZoom(zoom + 1);
    else if (direction == ZoomDirection.OUT && zoom > 1)
        this.map.setZoom(zoom - 1);
}

/** @enum */
var PanDirection = {
    LEFT: 0,
    RIGHT: 1,
    UP: 3,
    DOWN: 4
}

/** @enum */
var ZoomDirection = {
    IN: 0,
    OUT: 1
}

window["missouristate"] = window["missouristate"] || {};
window["missouristate"]["web"] = window["missouristate"]["web"] || {};
window["missouristate"]["web"]["ZoomPanControl"] = ZoomPanControl;