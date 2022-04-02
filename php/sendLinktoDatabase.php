<?php
require_once "../php/dbconnect.php";

//header('Location: ../php/profile.php');

       $localIP = gethostbyname(getHostName());
       $date = date('d-m-y h:i:s');
       $data['user'] = $_POST['user'];
       $data['userDescription'] = $_POST['userDescription'];
       $data['Legit_or_not'] = $_POST['Legit_or_not'];


if(empty($data['user']) && empty($data['Legit_or_not'])){
    
    echo "The input is empty";

} else {

    echo "nie ma pusto";

    $ask = "SELECT COUNT(*) AS num FROM save_stream.user_link WHERE yt_link= :ytlink";

    $stmt = $connect->prepare($ask);

    $stmt->bindValue(':ytlink', $data['user']);

    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if($row['num'] > 0){
        echo "Row exists!";
    } else {

        $sql = "INSERT INTO save_stream.user_link (`yt_link`, `Legit_or_not`, `users_ip`, `users_time`, `Opis_bana`) VALUES (:yt_link, :Legit_or_not, :users_ip, :users_time, :Opis_bana)";

        $statement = $connect->prepare($sql);

        $statement->bindValue(':yt_link', $data['user']);
        $statement->bindValue(':Legit_or_not', $data['Legit_or_not']);
        $statement->bindValue(':Opis_bana', $data['userDescription']);
        $statement->bindValue(':users_ip', $localIP);
        $statement->bindValue(':users_time', $date);
     
        $inserted = $statement->execute();
        echo " Zaraz dodam do bazy";
        
    }
    //$stmt->close();
}
     

?>

