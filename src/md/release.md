# How to release Apache Apex

For general information on ASF releases, see: http://www.apache.org/dev/release.html

## Creating Release Branch

If this is a minor release (X.Y.0), start with creating a new branch. Example for 3.2.0:

```bash
git checkout master && git pull
git checkout -b release-3.2 master
```
Replace version in master branch:
```
git checkout master
git grep -l "3.2.0-SNAPSHOT"
```
For informational purpose, this should yield the list of files that needs the version number replaced to X.(Y+1).0 next version. Note that the replacement step is different between the repositories due to an open issue. See:

https://issues.apache.org/jira/browse/APEXCORE-34

For -core:
```bash
dv=3.2.0-SNAPSHOT
rv=3.3.0-SNAPSHOT
for a in `git grep -l "${dv}"`; do echo $a; sed -i 's/'"${dv}"'/'"${rv}"'/g' $a; done
```
For -malhar:
```
mvn versions:set -DnewVersion=${rv} -Pall-modules
```
Commit and push the change:
```
git commit -am "Preparing for 3.3.0 development"
git push apache master
```

## Preparing Release Candidate

### Add missing @since tags

For Java classes added since the last release, the @since tags need to be added. The javadoc plugin inserts missing tags, but does not play well with the license header when no class level documentation block is present. This is tracked as
    
https://issues.apache.org/jira/browse/APEXCORE-183

It also removes the custom @tags doclet tag when the existing JavaDoc is malformed, **do not use this to make changes in Malhar**. Until these problems are resolved, use the following Ruby script to do the replacement: https://issues.apache.org/jira/secure/attachment/12781158/add-since.rb

```
ruby ~/add-since.rb ../apex -s 3.2.0
```

### Update CHANGELOG from JIRA

Navigate to the unreleased version, example:

https://issues.apache.org/jira/browse/APEXMALHAR/fixforversion/12334589

Obtain the release notes (text mode):

https://issues.apache.org/jira/secure/ReleaseNote.jspa?version=12334589&styleName=Text&projectId=12318824

Shorten any wrapping and overly long titles to fit width.  Copy the report and insert new release section into `CHANGELOG.md` with the release date set to 72 hours ahead to reflect the time for the vote.

Create shortlink for the JIRA release notes on http://s.apache.org/ for use in the VOTE thread. 
Example: http://s.apache.org/8uT

Commit tags and change log:
```
git commit -am "Add @since tags and update change log for release 3.2.0"
```

### Update version number for RC

```
dv=3.2.0-SNAPSHOT
rv=3.2.0
```
As mentioned earlier, use the following for -core releases:
```
for a in `git grep -l "${dv}"`; do echo $a; sed -i 's/'"${dv}"'/'"${rv}"'/g' $a; done
```
And this for -malhar releases:
```
mvn versions:set -Pall-modules -DnewVersion=${rv}
```
Commit version change:
```
git commit -am "Preparing to release ${rv}-RC1"
git tag -a "v${rv}-RC1" -m "Release ${rv}-RC1"
```
Push to fork (as temporary branch), open pull request, wait for Travis CI build to succeed. Then push the tag.
```
git push apache "v${rv}-RC1" 
```
The only difference between release branch and tag is this final version number change. The branch stays at `-SNAPSHOT` version.

## Build and Deploy Release Candidate
Prerequisites:

 - GPG key needs to be in https://dist.apache.org/repos/dist/release/incubator/apex/KEYS
 - Credentials for `apache.staging.https` server distribution management in `~/.m2/settings.xml`
 - Tag pushed to ASF git

Build and deploy release candidate from RC tag:

```
git checkout "v${rv}-RC1"
git clean -d -f
mvn clean apache-rat:check deploy -Papache-release -Pall-modules -DskipTests
```

Confirm no archives are included in source release (rat:check reports them in target/rat.txt but does not fail the build):
```
unzip -l target/apex-*-source-release.zip | grep -e ".zip\|.jar"
```

Log on to https://repository.apache.org and look for Staging Repositories. "Close" the newly created orgapacheapex-xxxx staging repository to obtain the temporary URL, note it down for the VOTE thread.

Example URL: https://repository.apache.org/content/repositories/orgapacheapex-1000/

Copy files to distribution dir and create signatures and checksums. 
(Note this is per policy to stage these files outside of the Maven repository, otherwise everything below would happen automatically as defined in the parent POM.)

For -core releases:

```bash
md5sum apex-${rv}-source-release.tar.gz > apex-${rv}-source-release.tar.gz.md5
md5sum apex-${rv}-source-release.zip > apex-${rv}-source-release.zip.md5
shasum -a 512 apex-${rv}-source-release.tar.gz > apex-${rv}-source-release.tar.gz.sha
shasum -a 512 apex-${rv}-source-release.zip > apex-${rv}-source-release.zip.sha
gpg --yes --armor --output apex-${rv}-source-release.tar.gz.asc --detach-sig apex-${rv}-source-release.tar.gz
gpg --yes --armor --output apex-${rv}-source-release.zip.asc --detach-sig apex-${rv}-source-release.zip
```

For -malhar releases:

```bash
md5sum malhar-${rv}-source-release.tar.gz > malhar-${rv}-source-release.tar.gz.md5
md5sum malhar-${rv}-source-release.zip > malhar-${rv}-source-release.zip.md5
shasum -a 512 malhar-${rv}-source-release.tar.gz > malhar-${rv}-source-release.tar.gz.sha
shasum -a 512 malhar-${rv}-source-release.zip > malhar-${rv}-source-release.zip.sha
gpg --yes --armor --output malhar-${rv}-source-release.tar.gz.asc --detach-sig malhar-${rv}-source-release.tar.gz
gpg --yes --armor --output malhar-${rv}-source-release.zip.asc --detach-sig malhar-${rv}-source-release.zip
```

Check files into the dist staging area:

```bash
mkdir svn-dist && cp *-source-* svn-dist/
svn import svn-dist https://dist.apache.org/repos/dist/dev/incubator/apex/v${rv}-RC1 -m "Apache Apex v${rv}-RC1"
```

## Voting 

PPMC vote call sample:
http://mail-archives.apache.org/mod_mbox/incubator-apex-dev/201602.mbox/%3CCAKJfLDPjMAZc8-NjjyMgtJGDpHkhVpxv8PYnryfiF4zZZufVmA%40mail.gmail.com%3E

PPMC vote result:
http://mail-archives.apache.org/mod_mbox/incubator-apex-dev/201602.mbox/%3CCAKJfLDN4CUVn9cgVhAhqeojP4hDUhwjnWRgXD226VOOBPphmUg%40mail.gmail.com%3E

Once PPMC vote passes, another vote needs to be called for IPMC (only IPMC votes are binding).

IPMC vote call:
http://mail-archives.apache.org/mod_mbox/incubator-general/201602.mbox/%3CCA%2B5xAo3UmJoEg-zfC%2BK061cK7fKbNXvD46PmP-QQYqrTTCtbZg%40mail.gmail.com%3E

IPMC vote result:
http://mail-archives.apache.org/mod_mbox/incubator-general/201602.mbox/%3CCA%2B5xAo0s0ae3UU8xDw%2ByhhEkOG4Ha%2B4E1B87Do5wUPGEV%2BAhFw%40mail.gmail.com%3E

If the vote is not successful, a new RC needs to be built. Once IPMC vote passes, proceed with promoting and announcing the release.

## Promote Release

Release Nexus staging repository: http://central.sonatype.org/pages/releasing-the-deployment.html#close-and-drop-or-release-your-staging-repository

Move source release from dist staging to release folder:
```
rv=3.2.0
svn mv https://dist.apache.org/repos/dist/dev/incubator/apex/v${rv} https://dist.apache.org/repos/dist/release/incubator/apex/v${rv} -m "Release Apache Apex ${rv}"
```

### JIRA

Close release and all associated tickets (use bulk change workflow transition and turn off notification at bottom of page). 
Create version number X.Y.Z+1 for next release

### git

Create final release tag:
```bash
rv=3.2.0
git tag -a "v${rv}" -m "Release ${rv}" "v${rv}-RC2"
git push apache "v${rv}"
```
Bump patch version number in release branch (X.Y.Z+1 - otherwise same as when creating new release branch):
```bash
git checkout release-3.2
dv=3.2.0-SNAPSHOT
rv=3.2.1-SNAPSHOT
for a in `git grep -l "${dv}"`; do echo $a; sed -i 's/'"${dv}"'/'"${rv}"'/g' $a; done
```
If there are new artifacts published to Maven repositories consider enabling semantic versioning check for the newly
published libraries.

Commit all changes and push them to the remote git repository:
```bash
git commit -am "Preparing for 3.2.1 development"
git push apache
```
Merge `@since` tag and change log changes to `master`.

## Announce Release

Update the download page to reflect the new release: https://github.com/apache/incubator-apex-site#updating-downloads-page

Send the announcement email, example:
http://mail-archives.apache.org/mod_mbox/incubator-general/201602.mbox/%3CCA%2B5xAo0NmnkxmdWdxCfcKVKL5%3Dd9ssE74nB%2BB1R6vX1rLaDqNw%40mail.gmail.com%3E

## Removing old Releases

As part of publishing new releases, please determine whether old releases should be deleted. See [release archiving policy](http://www.apache.org/dev/release.html#when-to-archive) for details why. 

With a new patch release, the previous patch release can be removed. For example, once 3.3.1 patch is released, we no longer need to have 3.3.0 on the download page. 

Once a release branch is no longer supported, we can also remove the last release in that line. For example once `release-3.1` branch is EOL, releases 3.1.1 (or whatever the latest patch was) can be removed from downloads. 
