$(document).ready(function () {
  $("#save").click(function () {
    const userLink = document.getElementById("user_link").value;
    const userDescription = document.getElementById("user_description").value;
    const Legit_or_not = document.getElementById("Legit_or_not").value;

     var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
     const test = regExp.exec(userLink);
     console.log(test);
    // const url="https://www.youtube.com/watch?v=WPni755-Krg&ab_channel=YellowBrickCinema-RelaxingMusic";
    // var match = url.match(regExp);
    // if (match && match[2].length == 11) {

    //   console.log(match[2]);
    //   const add =  "https://youtu.be/" + match[2];    
    //   console.log(add); 
    //   return match[2];
     
    // } else {
    //   //error
    //   document.write("niedziała");
    // }


    // const test = userLink.value = String(readyShortenedLink);
    const test1 = userLink.indexOf("https://youtu.be/");
    const deletebegin = userLink.replace("https://youtu.be/", "");
    //console.log(deletebegin);
    //console.log(userLink);
    if (test1 == 0 && userLink.length == 28) {
      console.log("Wyrażenie jest poprawne");
      console.log(deletebegin);
      // Gotowy link bez jakichkolwiek edycji bezpośrednio do bazy
      
      // $.ajax({
      //   url: "../php/test.php",
      //   type: "POST",
      //   data: {
      //     user: `${userLink}`,
      //     Legit_or_not: `${Legit_or_not}`,
      //     userDescription: `${userDescription}`,
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
      // $.ajax({
      //   url: "../php/test.php",
      //   type: "POST",
      //   data: {
      //     user: `${test}`,
      //     Legit_or_not: `${Legit_or_not}`,
      //     userDescription: `${userDescription}`,
      //   },
      //   success: function (output) {
      //     console.log(output);
      //   },
      // });
    }
  });
});

// let link = "https://youtu.be/TWRTbRzjpXQ";
// //const test = "halo".indexOf("https://youtu.be/");
// const test = link.indexOf("https://youtu.be/");
// if(test == 0){
//     console.log("Wyrażenie jest poprawne");
// } else {
//     console.log("Wyrażenie nie jest poprawne");
// }
// console.log(test);
