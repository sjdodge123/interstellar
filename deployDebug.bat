
winscp /console /script=.\copy.txt
plink -ssh -batch -i "%~dp0\deployment\nodeprivatekey.ppk" -m .\restart.txt sdodge@node.dev

start "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" http://node.dev:8080/debug?port=5858

start "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" http://node.dev