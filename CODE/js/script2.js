//javascript for photo_detail.html
window.onload = function(){
//1_Function_present photos on browser Function
	var show_photos=function(farm_id,server_id,id,secret){
		var pic_url = "https://farm"+ farm_id +".staticflickr.com/"+ server_id +"/"+ id +"_"+ secret +".jpg";
		console.log(pic_url);
		var img = document.createElement("img");
		 img.src = pic_url;
		var centre_img = document.getElementById("centre_img");
		centre_img.append(img);
	}
//2_Function_present photographer on browser function
	var photographer_info_name = function(photographer){
		var photographer_name = document.getElementById("photographer_info")
		photographer_name.innerHTML = "Photographer : "+photographer;
	}

//3_Function_present photo_location
	var photo_location = function(region_name,country_name){
		var photo_location = document.getElementById("photo_location");
		photo_location.innerHTML = region_name + " [" + country_name + "]";
	}

//4_Function_present photo_geography & time
	var photo_taken_geo = function(lat,lng,photo_date){
		var photo_taken_geo = document.getElementById("geo_lat_lng");
		var photo_taken_time = document.getElementById("geo_time");
		photo_taken_geo.innerHTML = "lat:" + lat + " * lng:"+lng;
		photo_taken_time.innerHTML = photo_date;
	}


//5_Function_The Main _url _component_to get photo img file, location
	const api_key = "d75f1c1e59c028c5f1a0aca3b00db7c2"
	const user_id = "137672847@N05"

	var retrieve_Photo_Info = function(){
		var method = "flickr.photos.getInfo"//flexible
		var photo_id = "20322921422"//flexible
		var base_url = "http://api.flickr.com/services/rest/?"
		var XMLtoJSON ="&format=json&nojsoncallback=?"

		var query_Info_url = base_url + "method=" + method + "&api_key=" + api_key + "&photo_id=" + photo_id + XMLtoJSON

		console.log(query_Info_url)

		//XML TO JSON
		var xhttp1 = new XMLHttpRequest();
		xhttp1.addEventListener("load",function(){
			var data = JSON.parse(this.response);
			var photo = data.photo;
			console.log(photo)
			//make up url component
			var farm_id = photo.farm;
			var server_id = photo.server;
			var id = photo.id;
			var secret = photo.secret;
			var photographer = photo.owner.username;
			var country_name = photo.location.country._content;
			var region_name = photo.location.region._content;
			var geo_lat = photo.location.latitude;
			var geo_lng = photo.location.longitude;
			var photo_date = photo.dates.taken;
//Call function 1 & 2 & 3 & 4
			show_photos(farm_id,server_id,id,secret);
			photographer_info_name(photographer);
			photo_location(region_name,country_name);
			photo_taken_geo(geo_lat,geo_lng,photo_date);
			})
		xhttp1.open("GET",query_Info_url);
		xhttp1.send();		
	}
//Call MAIN FUNCTION
	retrieve_Photo_Info()
}
