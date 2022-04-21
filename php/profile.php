<?php
require_once "../php/sendLinktoDatabase.php";
//require_once "../php/dbconnect.php";
// header("X-Frame-Options: DENY");

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
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<!-- <meta http-equiv="Cache-control" content="no-cache"> -->
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
			.admin-box {
				padding: 20px;
				margin-top: 10px;
				border: 2px solid green;
				width: 50%;
				height: 50%;
			}	
			.check {
				border: 1px solid white;
				width: 200px;
				height: 100px;
			}
			.img1 {
				width: 80px;
				height: 80px;
			}
			.img1:hover {
				cursor: pointer;
				width: 80px;
				height: 80px;
				background-color: green;
			}
			/* input[type=radio] { 
			position: absolute;
			opacity: 0;
			width: 0;
			height: 0;
			} */
			input[type=radio] + .img1 {
			cursor: pointer;
			}
			.addResult {
				color: green;
				border: 1px solid white;
				padding: 10px;
			}
			#goodResult {
				color: green;
			}
			#badResult {
				color: red;
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

<div class="admin-box">
		<h1>Wklej tutaj swojego linka</h1>
        <h3>Admin page</h3>
        <p>Dodawaj filmy które są save dla streamerów na Twitch i nie tylko</p>
        <p>Jeżeli film zawiera złe słowa oznacz wtedy link cyfrą 0, jeżeli film jest bezpieczny oznacz link cyfrą 1</p>
	
        <form method="post" name="test">
            <input type="text" name="user_link" value="" placeholder="Tutaj wklej linka" size="80" id="user_link" min-length="28" max-length="120" required>
            <br>
            <br>
            <input type="text" name="user_description" value="" placeholder="Tutaj opisz powód bana" size="80" id="user_description" required>
            <br>
            <br>	

			 <label>
				Good<input type="radio" value="1" name="save-video">
				<img src="../icons8-check-mark-96.png" alt="check mark" class="img1">
			</label>

			<label>
				Bad<input type="radio" value="0" name="save-video">
				<img src="../icons8-cross-mark-96.png" alt="cross mark" class="img1">
			</label>

            <br>
            <br>

			<button type="submit" id="form-data" class="button">Wyślij</button>
        
         </form> 

			<div id="channelTitle" name="channelTitle"></div>
        	<div id="channelId" name="channelId"></div>
			<p id="goodResult"></p>
			<p id="badResult"></p>

		</div>	
		
		<script src="../js/dataToDatabase.js" defer></script>
		
	</body>
</html>
