 <?php 
             require_once "../php/dbconnect.php";
             error_reporting(0);
              $data['readyShortenedLink'] = $_POST['readyShortenedLink'];
            
              $ask = "SELECT `YtLink`, `Safe` FROM stream_security.users_links WHERE YtLink = :ytlink";
           
              $stmt = $connect->prepare($ask);

              $stmt->bindValue(':ytlink', $data['user']);

              $stmt->execute();

              $row = $stmt->fetch(PDO::FETCH_ASSOC);

              if ($row['Legit_or_not'] == 1) {
                echo "The movie is safe";

              } else if ($row['Legit_or_not'] == ""){
                echo "The movie is not in the database";
              }  else  {
                echo "The movie is not safe";
              }
        ?> 