npm install
./node_modules/.bin/gulp
cp -r content content_tmp
COMMIT_HASH=`git rev-parse HEAD`
git checkout asf-site
rm -rf content
mv content_tmp content
git add content
git commit -m "from $COMMIT_HASH"
