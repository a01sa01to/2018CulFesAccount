<?php
    //writer.php?room=Bear&donut=0&waffle=0&drink=0&dSet=0&wSet=0&total=0
    $room=$_GET["room"];
    $donut=$_GET["donut"];
    $waffle=$_GET["waffle"];
    $drink=$_GET["drink"];
    $dSet=$_GET["dSet"];
    $wSet=$_GET["wSet"];
    $total=$_GET["total"];
    $dRemain=$_GET["donutRemain"];
    $wRemain=$_GET["waffleRemain"];
    $totalNum = $donut + $waffle + $drink + $dSet + $wSet ;

    //Room,,Donut,Waffle,Drink,DrinkSet,WaffleSet,,TotalNumber,TotalPrice
    $filename="output.csv";
    $fileContent=file_get_contents($filename);
    $fileContent .= $room . ",," . $donut . "," . $waffle . "," . $drink . "," . $dSet . "," . $wSet . ",," . $totalNum . "," . $total . "\r\n";
    file_put_contents($filename,$fileContent);

    $href='index.html?donutRemain='.$dRemain.'&waffleRemain='.$wRemain;
    header('Location: '.$href);
?>