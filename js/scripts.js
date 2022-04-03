$(document).ready(function () {
  $("#savs").click(function () {
    var API_KEY = "AIzaSyBaovj5xOx_ObFXnw7H8HRklaLJnjF8_pw";

    var video = "";
    var channelTitle = "";
    var channelId = "";

    const userLink = document.getElementById("user_link").value;
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const checkLink = regExp.exec(userLink);
    var userLinkId = checkLink[2];
    console.log(userLinkId);

    //     $("form").submit(function (event){
    event.preventDefault();

    var search = $("#userLink").val();
    videoSearch(API_KEY, userLink, 3);

    //})

    function videoSearch(key) {
      //key,search,maxResults

      $("#videos").empty();

      $.get(
        "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" +
          userLinkId +
          "&maxResults=5&key=" +
          key,
      // $.get(
      //   " https://www.googleapis.com/youtube/v3/search?key=AIzaSyBaovj5xOx_ObFXnw7H8HRklaLJnjF8_pw&type=video&part=snippet&maxResults=1&videoId=es-k4IYP2lo&channelId=UCGPKmSKumoR3TbMIHwsh5qQ",
      
        function (data) {

          // data.items.forEach((item) => {
          //   video = `
          // <iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId} " frameborder="0" allowfullscreen></iframe>
          // `;

          //   $("#videos").append(video);
          // });

          video = `
          <iframe width="420" height="315" src="http://www.youtube.com/embed/${userLinkId} " frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          `;

            $("#videos").append(video);
        
          data.items.forEach((item) =>{
            channelId = `${item.snippet.channelId}`;
            channelTitle = `${item.snippet.channelTitle}`;

            $("#video1").append(channelTitle);
            $("#video2").append(channelId);
          });
        }
      );
    }
  });
});
