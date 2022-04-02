$(document).ready(function () {
  $("#sav").click(function () {
    const userLink = document.getElementById("user_link").value;

    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const checkLink = regExp.exec(userLink);
    const userLinkId = checkLink[2];
    const info = "W bazie danych nie ma podanego rekordu";
    if (userLinkId.length == 11) {
      console.log("Correct!");
      const readyShortenedLink = "https://youtu.be/" + userLinkId;
      console.log(readyShortenedLink);

      $.ajax({
        url: "../php/checklink.php",
        type: "POST",
        data: {
          user: `${readyShortenedLink}`,
        },
        success: function (info) {
          console.log(info);
        }
      });
    }
  });
});
