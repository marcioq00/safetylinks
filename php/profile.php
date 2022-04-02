<?php

header("X-Frame-Options: DENY");
// We need to use sessions, so you should always start sessions using the below code.
session_start();
// If the user is not logged in redirect to the login page...
// if (!isset($_SESSION['loggedin'])) {
// 	header('Location: index.html');
// 	exit;
// }
$DATABASE_HOST = 'localhost';
$DATABASE_USER = 'root';
$DATABASE_PASS = '';
$DATABASE_NAME = 'phplogin';
$con = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);
if (mysqli_connect_errno()) {
	exit('Failed to connect to MySQL: ' . mysqli_connect_error());
}
if (!isset($_SESSION['loggedin'])) {
	header('Location: login.html');
	exit;
}

// We don't have the password or email info stored in sessions so instead we can get the results from the database.
$stmt = $con->prepare('SELECT password, email FROM accounts WHERE id = ?');
// In this case we can use the account ID to get the account info.
$stmt->bind_param('i', $_SESSION['id']);
$stmt->execute();
$stmt->bind_result($password, $email);
$stmt->fetch();
$stmt->close();
?>
<?php 

require_once "../php/dbconnect.php";
// include_once "../php/test.php";
 include_once "../php/curlget.php";


?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="Cache-control" content="no-cache">
		<title>Profile Page</title>
		<link href="../css/main.css" rel="stylesheet">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css">
		<style>
			.navtop {
				background-color: purple;
				color: #fff;
			}
			a {
				color: #fff;
			}
		</style>
		<script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"></script>
	</head>
	
	<body class="loggedin">
		<nav class="navtop">
			<div>
				<h1>Website Title</h1>
				<a href="profile.php"><i class="fas fa-user-circle"></i>Profile</a>
				<a href="logout.php"><i class="fas fa-sign-out-alt"></i>Logout</a>
			</div>
		</nav>
		<div class="content">
			<h2>Profile Page</h2>
			<div>
				<p>Your account details are below:</p>
				<table>
					<tr>
						<td>Username:</td>
						<td><?=$_SESSION['name']?></td>
					</tr>
					<tr>
						<td>Password:</td>
						<td><?=$password?></td>
					</tr>
					<tr>
						<td>Email:</td>
						<td><?=$email?></td>
					</tr>
				</table>

				<a href="../html/main.php">Admin page do dodawania filmów</a>
			</div>
		</div>
		<h1>Wklej tutaj swojego linka</h1>
        <h3>Admin page</h3>
        <p>Dodawaj filmy które są save dla streamerów na Twitch i nie tylko</p>
        <p>Jeżeli film zawiera złe słowa oznacz wtedy link cyfrą 0, jeżeli film jest bezpieczny oznacz link cyfrą 1</p>
	
        <form method="post" name="test">
            <input type="text" name="user_link" value="" placeholder="Tutaj wklej linka" size="80" id="user_link" required>
            <br>
            <br>
            <input type="text" name="user_description" value="" placeholder="Tutaj opisz powód bana" size="80" id="user_description" required>
            <br>
            <br>
            Film dobry czy zły 0 lub 1:<input type="number" value="" name="save-video" min="0" max="1" id="Legit_or_not" required>
            <br>
            <br>
            <input type="button" value="Wyślij" id="save" class="button">
        
        </form>
		
         <!-- <form autocomplete="off">
            <div class="form-group">
                <input type="text" class="form-control" id="search">
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-danger" value="Search">
                <input type="reset" class="btn btn-danger" value="Clear">
            </div>
        </form> -->

        <!-- <div class="row">
            <div class="">
                <div id="videos">

                </div>
            </div>
        </div> -->
		
		<script src="../js/cutlink.js" defer></script>
	</body>
</html>