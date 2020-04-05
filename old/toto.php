<?php

use App\Database;
use App\FriendManager;

require "../vendor/autoload.php";




if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $db = Database::connect();

    $manager = new FriendManager($db);
    $friends = $manager->getAll();

    // $result = json_encode($friends);
    $result = serialize($friends);

    // echo $result;


}
