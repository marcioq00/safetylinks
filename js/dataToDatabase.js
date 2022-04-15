$(document).ready(function () {
  $("#form-data").click(function () {
    const userLink = document.getElementById("user_link").value;
    const userLink1 = document.getElementById("user_link");

    if (userLink.length >= 28) {
      console.log("Correct length");
      userLink1.style.border = "2px solid green";

      var API_KEY = "AIzaSyBaovj5xOx_ObFXnw7H8HRklaLJnjF8_pw";

      var video = "";
      var channelTitle = "";
      var channelId = "";

      
      const radioButtons = document.querySelectorAll(
        'input[name="save-video"]'
      );
      let Legit_or_not;
      for (const radioButton of radioButtons) {
        if (radioButton.checked) {
          Legit_or_not = radioButton.value;
          break;
        }
      }
      //console.log(Legit_or_not);

      const userDescription = document.getElementById("user_description").value;
      const regExp =
        /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

      const checkLink = regExp.exec(userLink);
      var userLinkId = checkLink[2];
      console.log(userLinkId);

      event.preventDefault();
      const readyShortenedLink = "https://youtu.be/" + userLinkId;
      console.log(readyShortenedLink);
      videoSearch(API_KEY, userLink, 3);

      function videoSearch(key) {
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
              channelId = `${item.snippet.channelId}`;
              channelTitle = `${item.snippet.channelTitle}`;

              $("#channelTitle").append(channelTitle);
              $("#channelId").append(channelId);
            });
            //console.log("Id channel: " + channelId);

            $.ajax({
              url: "../php/sendLinktoDatabase.php",
              type: "POST",
              data: {
                readyShortenedLink: `${readyShortenedLink}`,
                Legit_or_not: `${Legit_or_not}`,
                userDescription: `${userDescription}`,
                channelId: `${channelId}`,
                channelTitle: `${channelTitle}`,
              },
              success: function (output) {
                console.log(output);
                //   const createDiv = document.createElement("p");
                //   const divText = document.createTextNode("Pomyślnie wysłano");
                //   createDiv.appendChild(divText);
                //   const element = document.getElementById("result");
                //   element.appendChild(createDiv);
                //   console.log(output);
              },
            });
          }
        );
      }
    } else {
      console.log("Incorrect length");
      userLink1.style.border = "2px solid red";
    }
  });
});
