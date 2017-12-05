# How to release Apache Apex

For general information on ASF releases, see: http://www.apache.org/dev/release.html

## Creating Release Branch

If this is a minor release (X.Y.0), start with creating a new branch. Example for 3.4.0:

```bash
git checkout master && git pull
git checkout -b release-3.4 master
git push apache release-3.4
```
Replace version in master branch:
```
git checkout master
git grep -l "3.4.0-SNAPSHOT"
```
For informational purpose, this should yield the list of files that needs the version number replaced to X.(Y+1).0 next version. Note that the replacement step is different between the repositories due to an open issue. See:

https://issues.apache.org/jira/browse/APEXCORE-34

For -core:
```bash
dv=3.4.0-SNAPSHOT
rv=3.5.0-SNAPSHOT
for a in `git grep -l "${dv}"`; do echo $a; sed -i 's/'"${dv}"'/'"${rv}"'/g' $a; done
```
For -malhar:
```
mvn versions:set -DnewVersion=${rv} -Pall-modules
```
Commit and push the change:
```
git commit --author "Apex Dev <dev@apex.apache.org>" -am "Preparing for 3.5.0 development"
git push apache master
```

## Preparing Release Candidate

```
git checkout release-3.4
```

### Add missing @since tags

For Java classes added since the last release, the @since tags need to be added. The javadoc plugin inserts missing tags, but does not play well with the license header when no class level documentation block is present. This is tracked as
    
https://issues.apache.org/jira/browse/APEXCORE-183

It also removes the custom @tags doclet tag when the existing JavaDoc is malformed, **do not use this to make changes in Malhar**. Until these problems are resolved, use the following Ruby script to do the replacement: https://issues.apache.org/jira/secure/attachment/12781158/add-since.rb

```
ruby ~/add-since.rb `pwd` -s 3.4.0
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
git commit --author "Apex Dev <dev@apex.apache.org>" -am "Add @since tags and update change log for release 3.4.0"
```

### Update version number for RC

```
dv=3.4.0-SNAPSHOT
rv=3.4.0
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
git commit --author "Apex Dev <dev@apex.apache.org>" -am "Preparing to release ${rv}-RC1"
git tag -a "v${rv}-RC1" -m "Release ${rv}-RC1"
```
Push to fork (as temporary branch), open pull request, wait for Travis CI build to succeed. Then push the tag.
```
git push apache "v${rv}-RC1" 
```
The only difference between release branch and tag are this final version number change and the change log commit. The branch stays at `-SNAPSHOT` version.

## Build and Deploy Release Candidate
Prerequisites:

 - GPG key needs to be in https://dist.apache.org/repos/dist/release/apex/KEYS
 - Credentials for `apache.staging.https` server distribution management in `~/.m2/settings.xml`
 - Tag pushed to ASF git
 - The correct version of the JDK is installed and maven is using the right java version

Build and deploy release candidate from RC tag:

```
git checkout "v${rv}-RC1"
git clean -d -f
mvn clean apache-rat:check deploy -Papache-release -Pall-modules -DskipTests
```
Some recent versions of the GPG might result in the following error message when the above maven deploy command is invoked.
```
gpg: signing failed: Inappropriate ioctl for device
```
Setting the GPG terminal fixes this. GPG terminal can be set using 
```
GPG_TTY=$(tty)
export GPG_TTY
``` 

Confirm no archives are included in source release (rat:check reports them in target/rat.txt but does not fail the build):
```
unzip -l target/*-source-release.zip | grep -e ".zip\|.jar"
```

Log on to https://repository.apache.org and look for Staging Repositories. "Close" the newly created orgapacheapex-xxxx staging repository to obtain the temporary URL, note it down for the VOTE thread.

Example URL: https://repository.apache.org/content/repositories/orgapacheapex-1000/

Copy files to distribution dir and create signatures and checksums. 
(Note this is per policy to stage these files outside of the Maven repository, otherwise everything below would happen automatically as defined in the parent POM.)

For -core releases:

```
RNAME=apache-apex-core-${rv}
```

For -malhar releases:

```
RNAME=apache-apex-malhar-${rv}
```

```bash
cd target
md5sum ${RNAME}-source-release.tar.gz > ${RNAME}-source-release.tar.gz.md5
md5sum ${RNAME}-source-release.zip > ${RNAME}-source-release.zip.md5
shasum -a 512 ${RNAME}-source-release.tar.gz > ${RNAME}-source-release.tar.gz.sha512
shasum -a 512 ${RNAME}-source-release.zip > ${RNAME}-source-release.zip.sha512
gpg --yes --armor --output ${RNAME}-source-release.tar.gz.asc --detach-sig ${RNAME}-source-release.tar.gz
gpg --yes --armor --output ${RNAME}-source-release.zip.asc --detach-sig ${RNAME}-source-release.zip
```

Check files into the dist staging area:

```bash
mkdir svn-dist && cp *-source-* svn-dist/
svn import svn-dist https://dist.apache.org/repos/dist/dev/apex/${RNAME}-RC1 -m "Apache Apex v${rv}-RC1"
```

## Build and Deploy Documentation

### Javadoc

Javadoc will be automatically deployed for registered branches. For minor releases, add the new branch to the buildbot configuration:

https://svn.apache.org/repos/infra/infrastructure/buildbot/aegis/buildmaster/master1/projects/apex.conf

This essentially means that the file above needs to be edited for the release number in the array of releases. Ensure that you verify the success of the build in the build bot [url](https://ci.apache.org/builders)
Also note that the build bot is a nightly trigger. Wait for atleast the next build trigger to kick in before raising a ticket with the infra team if you see that the javadoc is not appearing as expected.

### User Documentation

The documentation will be generated as static HTML files into the `apex-site` repository, [separated by version (X.Y)](https://github.com/apache/apex-site/tree/asf-site/docs).

**Note** You need Python 2.7+ and [mkdocs](http://www.mkdocs.org/) with patch for issue [mkdocs #859](https://github.com/mkdocs/mkdocs/issues/859) on top of the currently available version 0.15.3. After installing mkdocs with pip, run the following to obtain this build:

```
sudo pip install --upgrade git+https://github.com/sashadt/mkdocs.git
```
Do the following setup steps before building and deploying the documentation. 

1. Clone the apex-site repository into a folder called ```apex-site``` at the same level as the current repository. 

2. Set the following environment variables.

	For -core releases:

	```
	REPO_NAME=apex-core
	DOC_NAME=apex
	```

	For -malhar releases:
	
	```
	REPO_NAME=apex-malhar
	DOC_NAME=malhar
	```
	
	The `REPO_NAME` variable above should match the folder name of the cloned apex module being built.

Build and deploy the documentation in the release directory:

```bash
# build docs in ${REPO_NAME}, they will be generated in a site sub-folder
mkdocs build --clean

# Calculate the major.minor version
docv=`echo ${rv} | sed 's/\([0-9]*\)\.\([0-9]*\)\.\([0-9]*\)/\1\.\2/'`

# copy docs from site folder into target folder on apex-site
cd ../apex-site
git checkout asf-site
rm -rf docs/${DOC_NAME}-${docv}
cp -r ../${REPO_NAME}/site docs/${DOC_NAME}-${docv}
git add -A
git commit --author "Apex Dev <dev@apex.apache.org>" -m "Adding ${DOC_NAME}-${rv} documentation"
git push
```

After [publishing the site](https://github.com/apache/apex-site/tree/master#contributing) the new documentation will be available at `https://apex.apache.org/docs/${DOC_NAME}-${docv}/`

## Voting 

Vote call sample:
https://lists.apache.org/thread.html/bee03103dfdd94ffeb9dafdd2e0e468609948f59649534db2d99b464@%3Cdev.apex.apache.org%3E

Vote result:
https://lists.apache.org/thread.html/2887965dba350e181d06aa02af19d8d47c82eb6f0b47eef8dce14fe8@%3Cdev.apex.apache.org%3E

Note that the vote result email should have the subject prefixed with `[RESULT]`.

If the vote is not successful, a new RC needs to be built and new vote called. Once the PMC vote passes, proceed with promoting and announcing the release.

## Promote Release

Release Nexus staging repository: http://central.sonatype.org/pages/releasing-the-deployment.html#close-and-drop-or-release-your-staging-repository

Move source release from dist staging to release folder (to be done by PMC member):
```
rv=3.4.0
RNAME=apache-apex-core-${rv}
svn mv https://dist.apache.org/repos/dist/dev/apex/${RNAME}-RC1 https://dist.apache.org/repos/dist/release/apex/${RNAME} -m "Release ${RNAME}"
```

### JIRA (To be done by a PMC member)

The closing of the JIRA item has to be done by a PMC member as the turn off notification for bulk changes in JIRA is an option available only for the PMC members.
Request a PMC member to close release and all associated tickets (using bulk change workflow transition and **turn off notification** at bottom of page to not flood the mailing list). 
Create version number X.Y.Z+1 for next release (also to be done by PMC member).

### git

Create final release tag:

Note that the value of RC2 in the example below assumes that the second release candidate RC2 is the final release tag. Change this value accordingly.
```bash
rv=3.4.0
git tag -a "v${rv}" -m "Release ${rv}" "v${rv}-RC2"
git push apache "v${rv}"
```
Cherry-pick `@since` tag and change log commit from release tag and bump patch version number in release branch (X.Y.Z+1 - otherwise same as when creating new release branch):
```bash
git checkout release-3.4
dv=3.4.0-SNAPSHOT
rv=3.4.1-SNAPSHOT
for a in `git grep -l "${dv}"`; do echo $a; sed -i 's/'"${dv}"'/'"${rv}"'/g' $a; done
```
If there are new artifacts published to Maven repositories consider enabling semantic versioning check for the newly
published libraries.

Commit all changes and push them to the remote git repository:
```bash
git commit --author "Apex Dev <dev@apex.apache.org>" -am "Preparing for 3.4.1 development"
git push apache
```
Cherry-pick `@since` tag and change log changes from release tag to `master`.
Push the changes to apache

### Documentation

If this is a minor or a major release, link the release documentation as latest on the web site. Otherwise it is a patch release and this step can be skipped (documentation is already reflected in the website).

Under the `apex-site` folder (`asf-site` branch):

```bash
# docv major.minor version calculated in the build step
cd docs
# Set the release version to be the latest available version
ln -nsf ${DOC_NAME}-${docv} ${DOC_NAME}
git add -A
git commit --author "Apex Dev <dev@apex.apache.org>" -m "Promoting ${DOC_NAME}-${docv} documentation"
git push
```

### Update Web Site

Update the download page to reflect the new release: https://github.com/apache/apex-site#updating-downloads-page

Publish the web site, see [apex-site repository](https://github.com/apache/apex-site#contributing) for instructions.

Publishing the site involves running the build.sh script from the master branch and performing a git push from the asf-site branch. The local repo is automatically switched to the asf-site branch when the build.sh script is invoked from the master.

## Announce Release

Send the announcement email, example:
http://mail-archives.apache.org/mod_mbox/www-announce/201605.mbox/%3CCA%2B5xAo1ZYso6azUBJOkpVtJqM%3DAnJFr_RtjKk9_VusBwgYNS8A%40mail.gmail.com%3E

Please include the announce@apache.org as one of the recipients. Also make sure that the email is being sent from the youremail@apache.org email id. Note that the email to announce@apache.org will bounce back if youremail@apache.org email is not configured for the alias address from which you are sending this email.
The release email must be visible under [announce mailing list](https://lists.apache.org/list.html?announce@apache.org)
 
## Anouncements page

Edit the announcements page to publish the feed about the new release by editing the markup file announcements-latest.md under the source tree. Consider removing one or multiple old announcements at the same time.

## Removing old Releases

As part of publishing new releases, please determine whether old releases should be deleted. See [release archiving policy](http://www.apache.org/dev/release.html#when-to-archive) for details why. 

With a new patch release, the previous patch release can be removed. For example, once 3.4.1 patch is released, we no longer need to have 3.4.0 on the download page. 

Once a release branch is no longer supported, we can also remove the last release in that line. For example once `release-3.4` branch is EOL, releases 3.4.1 (or whatever the latest patch was) can be removed from downloads. 
