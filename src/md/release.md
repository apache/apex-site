# How to release Apache Apex (incubating)

For general information on ASF releases, see:
http://incubator.apache.org/guides/releasemanagement.html
http://www.apache.org/dev/release.html

## Creating Release Branch

If this is a minor release (X.Y.0), start with creating a new branch. Example for 3.2.0:

```bash
git checkout devel-3 && git pull
git checkout -b release-3.2 devel-3
```
Replace version in devel-3 branch:
```
dv=3.2.0-incubating-SNAPSHOT
rv=3.3.0-incubating-SNAPSHOT
git checkout devel-3
git grep -l "${dv}"
```
For informational purpose, this should yield the list of files that needs the version number replaced to X.(Y+1).0 next version.

For -core:  
```bash
mvn antrun:run@replaceTextVersions versions:set -DnewVersion=${rv}
```
For -malhar:
```
mvn versions:set -DnewVersion=${rv} -Pall-modules
```
Commit and push the change:
```
git commit -am "Preparing for 3.3.0 development"
git push apache devel-3
```

## Preparing Release Candidate

### Add missing @since tags

For Java classes added since the last release, the @since tags need to be added. The javadoc plugin inserts missing tags, but does not play well with the license header when no class level documentation block is present. This is tracked as
    
https://issues.apache.org/jira/browse/APEXCORE-183

It also removes the custom @tags doclet tag when the existing JavaDoc is malformed, **do not use this to make changes in Malhar**. Until these problems are resolved, use the following Ruby script to do the replacement: https://issues.apache.org/jira/secure/attachment/12781158/add-since.rb

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
dv=3.2.0-incubating-SNAPSHOT
rv=3.2.0-incubating
```
Use following for -core releases:
```
mvn antrun:run@replaceTextVersions versions:set -DnewVersion=${rv}
```
And this for -malhar releases:
```
mvn versions:set -Pall-modules -DnewVersion=${rv} -Pall-modules
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
 - Credentials for distribution management in `~/.m2/settings.xml`
 - Tag pushed to ASF git

Build and deploy release candidate from RC tag:

```
git checkout "v${rv}-RC1"
git clean -d -f
mvn clean deploy -Papache-release -DskipTests -Dsonatype_user=<user>
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
gpg  --armor --output apex-${rv}-source-release.tar.gz.asc --detach-sig apex-${rv}-source-release.tar.gz
gpg  --armor --output apex-${rv}-source-release.zip.asc --detach-sig apex-${rv}-source-release.zip
```

For -malhar releases:

```bash
md5sum malhar-${rv}-source-release.tar.gz > malhar-${rv}-source-release.tar.gz.md5
md5sum malhar-${rv}-source-release.zip > malhar-${rv}-source-release.zip.md5
shasum -a 512 malhar-${rv}-source-release.tar.gz > malhar-${rv}-source-release.tar.gz.sha
shasum -a 512 malhar-${rv}-source-release.zip > malhar-${rv}-source-release.zip.sha
gpg  --armor --output malhar-${rv}-source-release.tar.gz.asc --detach-sig malhar-${rv}-source-release.tar.gz
gpg  --armor --output malhar-${rv}-source-release.zip.asc --detach-sig malhar-${rv}-source-release.zip
```

Check files into the dist staging area:

```bash
mkdir svn-dist && cp *-source-* svn-dist/
svn import svn-dist https://dist.apache.org/repos/dist/dev/incubator/apex/v${rv}-RC1 -m "Apache Apex v${rv}-RC1"
```

## Voting 

PPMC vote call sample:
http://mail-archives.apache.org/mod_mbox/incubator-apex-dev/201601.mbox/%3CCAKJfLDOj58dtfWTw2oBfm5GsyZqsbWCYFSCro9U%2BJw2%2BTFbVpQ%40mail.gmail.com%3E

PPMC vote result:
http://mail-archives.apache.org/mod_mbox/incubator-apex-dev/201510.mbox/%3CCAKJfLDOY-SpcJfdFiJosoyZ2JidursecietvhT5AgUeX-%3Dw-Tw%40mail.gmail.com%3E

Once PPMC vote passes, another vote needs to be called for IPMC (only IPMC votes are binding).

IPMC vote call:
http://mail-archives.apache.org/mod_mbox/incubator-general/201510.mbox/%3CCA%2B5xAo21vEVw5eggLmmbx4pxwkXNLysTXYa4_hyMbWnpUZSpyQ%40mail.gmail.com%3E

IPMC vote result:
http://mail-archives.apache.org/mod_mbox/incubator-general/201510.mbox/%3CCA%2B5xAo2O8aqg3Z0-y0hiyq5aFskYrMDG-xYbdfQR8YGCiiGAjA%40mail.gmail.com%3E

If the vote is not successful, a new RC needs to be built. Once IPMC vote passes, proceed with promoting and announcing the release.

## Promote Release

Release Nexus staging repository: http://central.sonatype.org/pages/releasing-the-deployment.html#close-and-drop-or-release-your-staging-repository

Move source release from dist staging to release folder:
```
svn mv  https://dist.apache.org/repos/dist/dev/incubator/apex/v3.2.0-incubating-RC2 https://dist.apache.org/repos/dist/release/incubator/apex/v3.2.0-incubating
```

### JIRA

Close release and all associated tickets 
Create version number X.Y.Z+1 for next release

### git

Create final release tag:
```bash
git tag -a "v3.2.0-incubating" -m "Release 3.2.0-incubating" "v3.2.0-incubating-RC2"
git push apache "v3.2.0-incubating"
```
Bump patch version number in release branch (X.Y.Z+1 - otherwise same as when creating new release branch):

For -core:
```bash
git checkout release-3.2
rv=3.2.1-incubating-SNAPSHOT
mvn antrun:run@replaceTextVersions versions:set -DnewVersion=${rv}
git commit -am "Preparing for 3.2.1 development"
```

For -malhar:
```bash
git checkout release-3.2
rv=3.2.1-incubating-SNAPSHOT
mvn versions:set -DnewVersion=${rv} -Pall-modules
git commit -am "Preparing for 3.2.1 development"
```

Merge `@since` tag and change log changes to `devel-3`

## Announce Release

http://mail-archives.apache.org/mod_mbox/incubator-general/201511.mbox/%3CCA%2B5xAo1mS-BMT%3DXk_q287_j5m6ngtaT8QEEED0zfQhXtgrnOtA%40mail.gmail.com%3E
