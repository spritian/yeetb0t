<?php
error_reporting(0);
$files1 = scandir("mp3/");
for ($z=0; $z<count($files1); $z++) {
	if (substr($files1[$z], 0, 4)=="usec") {
		$chk=explode("_",$files1[$z]);
		$chk2=explode("-",$chk[count($chk)-1]);
		$remove="-".$chk2[1]."-".$chk2[2]."-".$chk2[3];
		$to=str_replace($remove, ".wav", $files1[$z]);

		echo $files1[$z]." -> ".$to."\n";
		//rename($files1[$z], $to);
	}
}
