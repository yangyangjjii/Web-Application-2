//javascript for map.html

window.onload = function(){
//unchangable values
	const api_key = "d75f1c1e59c028c5f1a0aca3b00db7c2"
	const user_id = "137672847@N05"


//1_Function: set map
	var map_location = function(lng,lat){
		mymap = L.map('mapid').setView([lng,lat], 8);

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    id: 'mapbox.streets',
	    accessToken: 'pk.eyJ1IjoiamVzc2ljYXl5IiwiYSI6ImNqYWd2Mnh5MjFsOTgzM3BkZ3Rxejd4OHMifQ.qdp2BHdUqKWffTJw4cfF3g#1.6/40.184185/67.213178/0'
		}).addTo(mymap);
		//add photo mark
		L.marker([lng,lat], {icon: redIcon}).addTo(mymap).bindPopup("This photo was taken at this place.");
		//click to add location mark
		mymap.on("click", function onClickis(event){
			L.popup().setLatLng(event.latlng).setContent("You clicked:"+ event.latlng.toString()).openOn(mymap);
			var loca = event.latlng;
			L.marker([loca.lat,loca.lng], {icon: greenIcon}).addTo(mymap).bindPopup(event.latlng.toString());
		})

	}	

//3_Function: Make up API URL_ Through search API get "photo info"
	var retrieve_data = function(text = "Iceland"){
		var method = "flickr.photos.search";
		var base_url = "http://api.flickr.com/services/rest/?";
		var XMLtoJSON ="&format=json&nojsoncallback=?";
		var addtionInfo = "&has_geo=True&geo_context=0&in_gallery=True&is_getty=True&page=3";;
		var query_url = base_url + "method=" + method + "&api_key=" + api_key + "&text=" + text + addtionInfo + XMLtoJSON
		console.log(query_url);
	//3_1_send & listen request
		var xhttp = new XMLHttpRequest();
		xhttp.addEventListener("load",function(){
			var photo_data = JSON.parse(this.response);
		//3_1_1_get photo detail
			var photo_list = photo_data.photos.photo;
		
				var number = Math.floor(((Math.random() * 10) + 1)%100);
				var photo = photo_list[number];
				var farm_id = photo.farm;
				var server_id = photo.server;
				var id = photo.id;
				var secret = photo.secret;
//Call function 4 & 5
				present_photo(farm_id,server_id,id,secret);
				retrieve_Photo_Info(id);
		})
		xhttp.open("GET",query_url);
		xhttp.send();
	}

//4_Function: present photo in bowser
	var present_photo = function(farm_id,server_id,id,secret){
		var pic_url = "https://farm"+ farm_id +".staticflickr.com/"+ server_id +"/"+ id +"_"+ secret +".jpg";
		var img = document.createElement("img");
		img.src = pic_url;
		img.className= "pop_img";
		var centre_img = document.getElementById("popup_img");
		centre_img.append(img);
	};

//5_Function: Make up API URL_ Through getInfo API get "photo geography Info"
	var retrieve_Photo_Info = function(photo_id){
		var method = "flickr.photos.getInfo"//flexible
		var base_url = "http://api.flickr.com/services/rest/?"
		var XMLtoJSON ="&format=json&nojsoncallback=?"

		var query_Info_url = base_url + "method=" + method + "&api_key=" + api_key + "&photo_id=" + photo_id + XMLtoJSON
		
		//5_1_send & listen request
		var xhttp1 = new XMLHttpRequest();
		xhttp1.addEventListener("load",function(){
			var data = JSON.parse(this.response);
			var photo = data.photo;
			var geo_lat = photo.location.latitude;
			var geo_lng = photo.location.longitude;
		//5_2_implement function: marks on map
			map_location(geo_lat,geo_lng);
		})
		xhttp1.open("GET",query_Info_url);
		xhttp1.send();
	}

//6_Function: click photo and turn to photo_detail.html
	var trans = document.getElementById("popup_img");
	console.log(trans);
	trans.addEventListener("click",function(){
		window.open('photo_detail.html', '_blank');
	});

//7_define map_location_icon
	var redIcon = L.icon({
		iconUrl: 'img/loca.png',

		iconSize:     [38, 38], // size of the icon
		iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
		popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		});

	var greenIcon = L.icon({
		iconUrl: 'img/loca2.png',

		iconSize:     [38, 38], // size of the icon
		iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
		popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		});	

//8_Function: reload window to change photo;
	var change_photo_button = document.getElementById("button_refresh");
	change_photo_button.addEventListener("click",function(){
		location.reload();
	})

//default loading photo	
document.getElementById("body1").addEventListener("load", retrieve_data());

}//window.onload