$(document).ready(function () {
  $("#sav").click(function () {
    const userLink = document.getElementById("user_link").value;
    // const test = userLink.value = String(readyShortenedLink);
    const test1 = userLink.indexOf("https://youtu.be/");
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const url="https://www.youtube.com/watch?v=WPni755-Krg&ab_channel=YellowBrickCinema-RelaxingMusic";
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      console.log(match[2]);      
      console.log("działa");
      return match[2];
     
    } else {
      //error
      document.write("niedziała");
    }
    console.log(userLink);
    if (test1 == 0 && userLink.length == 28) {
      console.log("Wyrażenie jest poprawne");
      const deletebegin = test1.replace("https://youtu.be/", "");
      console.log(deletebegin);
      // Gotowy link bez jakichkolwiek edycji bezpośrednio do bazy

      // $.ajax({
      //   url: "../php/checklink.php",
      //   type: "POST",
      //   data: {
      //     user: `${userLink}`,
      //   },
      //   success: function (output) {
      //     console.log(output);
      //   },
      // });
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
      $.ajax({
        url: "../php/checklink.php",
        type: "POST",
        data: {
          user: `${test}`,
        },
        success: function (output) {
          console.log(output);
        },
      });
    }
  });
});
