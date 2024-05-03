<?php

header('Content-type: application/json');
$data = array(
"colorArray" => array("#364C62", "#F1C40F", "#E67E22", "#E74C3C", "#ECF0F1", "#95A5A6", "#16A085", "#27AE60", "#2980B9", "#8E44AD", "#2C3E50", "#F39C12", "#D35400", "#C0392B", "#BDC3C7","#1ABC9C", "#2ECC71", "#E87AC2", "#3498DB", "#9B59B6", "#7F8C8D"),

"segmentValuesArray" => array( 

	array(
    "probability" => 20,
    "type" => "string",
    "value" => "HOLIDAY^FOR TWO",
    "win" => false,
    "resultText" => "YOU WON A HOLIDAY!",
    "userData" => array("score" => 10)
),
	array(
    "probability" => 25,
    "type" => "image",
    "value" => "media/tip_star.svg",
    "win" => true,
    "resultText" => "A STAR!",
    "userData" => array("score" => 20)
)
,
	array(
    "probability" => 120,
    "type" => "image",
    "value" => "media/tip_sqr.svg",
    "win" => true,
    "resultText" => "A SQUARE!",
    "userData" => array("score" => 3000)
)
,
	array(
    "probability" => 20,
    "type" => "image",
    "value" => "media/tip_oct.svg",
    "win" => false,
    "resultText" => "An OCTOGON!",
    "userData" => array("score" => 40)
)
,
	array(
    "probability" => 20,
    "type" => "image",
    "value" => "media/tip_hex.svg",
    "win" => true,
    "resultText" => "A HEXAGON!",
    "userData" => array("score" => 50)
)
,
	array(
    "probability" => 14,
    "type" => "image",
    "value" => "media/tip_triangle.svg",
    "win" => true,
    "resultText" => "A TRIANGLE!",
    "userData" => array("score" => 60)
)
),
"svgWidth" => 1024,
"svgHeight" => 768,
"wheelStrokeColor" => "#D0BD0C",
"wheelStrokeWidth" => 18,
"wheelSize" => 700,
"wheelTextOffsetY" => 80,
"wheelTextColor" => "#EDEDED",
"wheelTextSize" => "2.3em",
"wheelImageOffsetY" => 40,
"wheelImageSize" => 50,
"centerCircleSize" => 360,
"centerCircleStrokeColor" => "#F1DC15",
"centerCircleStrokeWidth" => 12,
"centerCircleFillColor" => "#EDEDED",
"centerCircleImageUrl" => "media/logo.png",
"centerCircleImageWidth" => 400,
"centerCircleImageHeight" => 400,  
"segmentStrokeColor" => "#E2E2E2",
"segmentStrokeWidth" => 4,
"centerX" => 512,
"centerY" => 384,  
"hasShadows" => false,
"numSpins" => -1,
"spinDestinationArray" => array(),
"minSpinDuration" => 2,
"maxSpinDuration" => 5,
"gameOverText" => "THANK YOU FOR PLAYING SPIN2WIN WHEEL. COME AND PLAY AGAIN SOON!",
"invalidSpinText" =>"INVALID SPIN. PLEASE SPIN AGAIN.",
"introText" => "YOU HAVE TO<br>SPIN IT <span style='color=>#F282A9;'>2</span> WIN IT!",
"introTextVisible" => true,
"hasSound" => true,
"gameId" => "9a0232ec06bc431114e2a7f3aea03bbe2164f1aa",
"clickToSpin" => true,
"spinDirection" => "cw",
"disabledText" => "You have no more spins today"

);

echo json_encode( $data);
?>