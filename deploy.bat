
winscp /console /script=.\copy.txt
plink -ssh -batch -i "C:\Users\sdodge\Desktop\nodedev\nodeprivatekey.ppk" -m .\restart.txt sdodge@node.dev