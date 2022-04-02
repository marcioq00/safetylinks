<?php 
             require_once "../php/dbconnect.php";
              $data['user'] = $_POST['user'];
            
              $ask = "SELECT yt_link, Legit_or_not FROM save_stream.user_link WHERE yt_link = :ytlink";
           
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