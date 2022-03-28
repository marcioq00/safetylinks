
$(document).ready(function(){

    var API_KEY = "AIzaSyBaovj5xOx_ObFXnw7H8HRklaLJnjF8_pw";

    var video = ''

    $("form").submit(function (event){
      event.preventDefault()

      var search = $("#search").val()
      videoSearch(API_KEY,search,3)

    })
    
// $.get("https://www.googleapis.com/youtube/v3/search?key" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search,function(data){console.log(data)
    function videoSearch(key){
//key,search,maxResults

      const userLink = document.getElementById("user_link").value;
      const test1 = userLink.indexOf("https://youtu.be/");
      //const a = userLink.replace("https://youtu.be/", "")
    console.log(userLink);
    if (test1 == 0 && userLink.length == 28) {
      console.log("Wyrażenie jest poprawne");
      const deletebegin = test1.replace("https://youtu.be/", "");
      console.log(deletebegin);
      // Gotowy link bez jakichkolwiek edycji bezpośrednio do bazy

    } else {
      console.log("Wyrażenie nie jest poprawne");
      const checkFirstPartLink = userLink.replace(
        "https://www.youtube.com/",
        "https://youtu.be/"
      );
      const checkLinkAfterSlash = checkFirstPartLink.replace("watch?v=", "");
      let readyShortenedLink = "";

      if (checkLinkAfterSlash.length > 28) {
        readyShortenedLink = checkLinkAfterSlash.substring(0, 28);
      }

      const test = (userLink.value = String(readyShortenedLink));
      console.log(test);
      
    }


      $("#videos").empty()

      $.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=_KvJDIg1CD0&maxResults=5&key=" + key,function(data){console.log(data)
      //"https://www.googleapis.com/youtube/v3/videos?part=snippet&id=_KvJDIg1CD0&maxResults=5&key=AIzaSyBaovj5xOx_ObFXnw7H8HRklaLJnjF8_pw"
        //"https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search,function(data){console.log(data)
     // https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&key=[YOUR_API_KE
        
    
        data.items.forEach(item=> {
          video = `
          <iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId} " frameborder="0" allowfullscreen></iframe>
          `

          $("#videos").append(video)

        });
        
    })

    }
    

})


