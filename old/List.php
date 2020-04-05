<?php

use App\Database;
use App\FriendManager;

require "../vendor/autoload.php";

var_dump($_GET);


if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $db = Database::connect();

    $manager = new FriendManager($db);
    $friends = $manager->getAll();

    $result = json_encode($friends);

    var_dump($result);

    return $result;
}
