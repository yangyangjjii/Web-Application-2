window.onload=function(){

//present photos in the browser
	var show_photos=function(farm_id,server_id,id,secret,title){
		var pic_url = "https://farm"+ farm_id +".staticflickr.com/"+ server_id +"/"+ id +"_"+ secret +".jpg";
		var img_row = document.createElement("div");
		img_row.className="pic_rows";
		var img = document.createElement("img");
		img.src = pic_url;
		img.title = title;
		img.className = "present_photos";

		var photo_row1 = document.getElementById("photo_row");
		photo_row1.append(img_row);
		img_row.append(img);
	}

//delete previous pics to show new
	var delete_previous = function(){
		var imgs = document.getElementsByClassName("present_photos")
		for (var i = 0 ; i < imgs.length ; i++) {
			imgs[i].parentNode.removeChild(imgs[i]);
		}
	}

//index.html_ Search_basic query url
	const api_key = "d75f1c1e59c028c5f1a0aca3b00db7c2"
	const user_id = "137672847@N05"

	var retrieve_data = function(text,){
		var method = "flickr.photos.search"
		var base_url = "http://api.flickr.com/services/rest/?"
		var XMLtoJSON ="&format=json&nojsoncallback=?"
		var addtionInfo = "&has_geo=True&geo_context=0&in_gallery=True&is_getty=True"

		var query_url = base_url + "method=" + method + "&api_key=" + api_key + "&text=" + text + addtionInfo + XMLtoJSON
//send & listen request
		var xhttp = new XMLHttpRequest();
		xhttp.addEventListener("load",function(){
			var data = JSON.parse(this.response);
			console.log(data);
			var photo = data.photos.photo;
			for (i=0; i< 8 ;i++){
				var farm_id = photo[i].farm;
				var server_id = photo[i].server;
				var id = photo[i].id;
				var secret = photo[i].secret;
				var title = photo[i].title;
				show_photos(farm_id,server_id,id,secret,title)
			}
		})//load/click
		xhttp.open("GET",query_url);
		xhttp.send();
	}

//before click
	retrieve_data("seaworld")

//click nature
	var obj1 = document.getElementById("nature");
	obj1.addEventListener("click",function(){
		delete_previous()
		delete_previous()
		delete_previous()
		delete_previous()
		retrieve_data("nature")
	})
// click people
	var obj2 = document.getElementById("people");
	obj2.addEventListener("click",function(){
		delete_previous()
		delete_previous()
		delete_previous()
		delete_previous()
		retrieve_data("kids")
	})
// click animal
	var obj3 = document.getElementById("animal");
	obj3.addEventListener("click",function(){
		delete_previous()
		delete_previous()
		delete_previous()
		delete_previous()
		retrieve_data("animal")
	})


//click search button turn to new page
	var search_button = document.getElementById("search_button");
		search_button.addEventListener("click",function(){
			var text = document.getElementById("search_term").value;
			window.open('map.html', '_blank');
	})

}//window onload