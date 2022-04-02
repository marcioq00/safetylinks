$(document).ready(function () {
  $("#savs").click(function () {
    var API_KEY = "AIzaSyBaovj5xOx_ObFXnw7H8HRklaLJnjF8_pw";

    var video = "";

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
        function (data) {
          console.log(data);

          data.items.forEach((item) => {
            video = `
          <iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId} " frameborder="0" allowfullscreen></iframe>
          `;

            $("#videos").append(video);
          });
        }
      );
    }
  });
});
