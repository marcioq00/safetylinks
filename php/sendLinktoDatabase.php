<?php
require_once "../php/dbconnect.php";

error_reporting(0);
//header('Location: ../php/profile.php');

       $date = date('d-m-y h:i:s');
      
       $data['readyShortenedLink'] = $_POST['readyShortenedLink'];
       $data['userDescription'] = $_POST['userDescription'];
       $data['Legit_or_not'] = $_POST['Legit_or_not'];
       $data['channelId'] = $_POST['channelId'];
       $data['channelTitle'] = $_POST['channelTitle'];

if(empty($data['Legit_or_not']) || empty($data['channelId']) || empty($data['channelTitle'])){
    
    echo "The input is empty";  

} else {

       $ask = "SELECT COUNT(*) AS num FROM stream_security.users_links WHERE YtLink= :ytlink";

       $stmt = $connect->prepare($ask);
   
       $stmt->bindValue(':ytlink', $data['readyShortenedLink']);
   
       $stmt->execute();
   
       $row = $stmt->fetch(PDO::FETCH_ASSOC);
       if($row['num'] > 0){
           echo "Row exists!";
       } else {
   
           $sql = "INSERT INTO stream_security.users_links (`YtLink`, `Safe`, `ChannelTitle`, `ChannelId`, `Description`, `UserTime`) VALUES (:yt_link, :Legit_or_not, :channelTitle, :channelId, :Opis_bana, :users_time)";
   
           $statement = $connect->prepare($sql);
   
           $statement->bindValue(':yt_link', $data['readyShortenedLink']);
           $statement->bindValue(':Legit_or_not', $data['Legit_or_not']);
           $statement->bindValue(':Opis_bana', $data['userDescription']);
           $statement->bindValue(':channelTitle', $data['channelTitle']);
           $statement->bindValue(':channelId', $data['channelId']);
           $statement->bindValue(':users_time', $date);
        
           $inserted = $statement->execute();
           echo " Added to database";
   
       }
       $stmt->close();

}
     

?>

