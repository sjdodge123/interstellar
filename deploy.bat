
winscp /console /script=.\copy.txt
plink -ssh -batch -i deployment\nodeprivatekey.ppk -m .\restart.txt sdodge@node.dev