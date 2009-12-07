<?php
    //send e-mail (uncomment to actually send e-mail
    //mail("you@yourdomain.com", "User Feedback", $feedbackText, "From: feedback@{$_SERVER['SERVER_NAME']}");

    //if flag is set, set cookies
    if ($rememberMe == "yes") {
        setcookie("personName", $personName, time() + 1000 * 60 * 60 * 24 * 365);
        setcookie("personEmail", $personEmail, time() + 1000* 60 * 60 * 24 * 365);
    }
?>
<html>
    <head>
        <title>Cookies Example</title>   
                
    </head>
    <body>
        <p>Thank you for submitting feedback!</p> 
    </body>
</html>
