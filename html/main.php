<?php
require_once "../php/dbconnect.php";
require_once "../php/checklink.php";
?>
<!DOCTYPE html>
<html lang="pl">
    <head>
        <title>Sprawdź swój link</title>
        <meta charset="UTF-8">
        <meta http-equiv="Cache-control" content="no-cache">

        <link rel="stylesheet" href="../css/main.css">
        <script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"></script>
    </head>
    <body>
        <p><a href="../html/login.html" target="_blank">Przejdź do admin page</a></p>
        <h1>Witaj na stronie</h1>
        <h3>Sprawdź czy link do filmu jest bezpieczny</h3>
        <form method="post">
            <input type="text" name="user_link" size="50" id="user_link" placeholder="https://www.youtube.com/" autocomplete="off" required>
            <input type="button" value="Sprawdź" id="savs"> 
        </form>
       <br>
        <div class="wynik">
            <p></p>
        </div>
        <form autocomplete="off" method="post">
            <div class="form-group">
                <input type="text" class="form-control" id="search">
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-danger" value="Search" >
                <input type="reset" class="btn btn-danger" value="Clear">
            </div>
        </form>

        <div class="row">
            <div class="">
                <div id="videos">

                </div>
            </div>
        </div>
        <script src="../js/scripts.js"></script>  
        <script src="../js/safetyFile.js" defer></script>
    </body>
</html>


