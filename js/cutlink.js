$(document).ready(function () {
  $("#save").click(function () {
    const userLink = document.getElementById("user_link").value;
    const userDescription = document.getElementById("user_description").value;
    const Legit_or_not = document.getElementById("Legit_or_not").value;

    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const checkLink = regExp.exec(userLink);
    const userLinkId = checkLink[2];

    if (userLinkId.length == 11) {
      console.log("Correct!");
      const readyShortenedLink = "https://youtu.be/" + userLinkId;
      console.log(readyShortenedLink);
      
      $.ajax({
        url: "../php/test.php",
        type: "POST",
        data: {
          user: `${readyShortenedLink}`,
          Legit_or_not: `${Legit_or_not}`,
          userDescription: `${userDescription}`,
        },
        success: function (output) {
          console.log(output);
        },
      });
    } else {
      console.log("Wrong!, error");
    }
  });
});
