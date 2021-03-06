$(document).ready(function () {
  $("#savs").click(function () {
    var API_KEY = "AIzaSyBaovj5xOx_ObFXnw7H8HRklaLJnjF8_pw";

    var video = "";
    // var channelTitle = "";
    // var channelId = "";

    const userLink = document.getElementById("user_link").value;
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const checkLink = regExp.exec(userLink);
    var userLinkId = checkLink[2];
    //console.log(userLinkId);

   
    event.preventDefault();

    videoSearch(API_KEY, userLink, 3);

    function videoSearch(key) {
      //key,search,maxResults

      $("#videos").empty();

      $.get(
        "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" +
          userLinkId +
          "&maxResults=5&key=" +
          key,

        function (data) {
          video = `
          <iframe width="420" height="315" src="http://www.youtube.com/embed/${userLinkId} " frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          `;

          $("#videos").append(video);

          data.items.forEach((item) => {
            const channelId = `${item.snippet.channelId}`;
            const channelTitle = `${item.snippet.channelTitle}`;

            $("#channelTitle").append(channelTitle);
            $("#channelId").append(channelId);
          });
          console.log(channelId);
        }
      );
    }
    //console.log(channelId);
    $.ajax({
      url: "../php/sendLinktoDatabase.php",
      type: "POST",
      data: {
        channelId: `${channelId}`,
        channelTitle: `${channelTitle}`,
      },
      success: function (output) {
        console.log(output);
      }
    });
  });
});
