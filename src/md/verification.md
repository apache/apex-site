# How to verify Apache Apex (incubating) release candidate builds

## Prerequisites
1. Download the KEYS file and import it.  Verify that the key just imported is correct.
This is one time activity.
```bash
wget https://dist.apache.org/repos/dist/release/incubator/apex/KEYS
gpg --import KEYS
gpg --fingerprint D920A98C
```
More about key verification at [http://www.apache.org/info/verification.html](http://www.apache.org/info/verification.html)

2. You can also created your own key which is required if you would like to sign the build. This step is optional.
```bash
gpg --gen-key
```
Please provide 4096 as keysize while generating the key.


## File integrity check
Download all files present in staging directory of the RC build. Staging directory link is shared in VOTE thread of the release candidate. It is recommended that these files are downloaded in a clean directory.

```bash
wget -r -np -nd <staging-area-link>/
```
Note the link should end with "/".

Define the apex release candidate variable. We will set it up *apex-3.3.0-incubating* as an example.
```bash
APEX_RELEASE_CANDIDATE=apex-3.3.0-incubating
```

Verify integrity of tar.gz file:
```bash
gpg --verify $APEX_RELEASE_CANDIDATE-source-release.tar.gz.asc
md5sum --check $APEX_RELEASE_CANDIDATE-source-release.tar.gz.md5
sha512sum --check $APEX_RELEASE_CANDIDATE-source-release.tar.gz.sha
```

Verify integrity of .zip file:
```bash
gpg --verify $APEX_RELEASE_CANDIDATE-source-release.zip.asc
md5sum --check $APEX_RELEASE_CANDIDATE-source-release.zip.md5
sha512sum --check $APEX_RELEASE_CANDIDATE-source-release.zip.sha
```

## Source code verification
You can extract source either using .tar.gz file or .zip file.

### Using .tar.gz source
Extract source using .tar.gz:
```bash
tar -zxvf $APEX_RELEASE_CANDIDATE-source-release.tar.gz
```
### Using .zip source
```bash
unzip $APEX_RELEASE_CANDIDATE-source-release.zip
```

Any of the two commands above will create a directory named after *apex release candidate*.

Change directory:
```bash
cd $APEX_RELEASE_CANDIDATE
```

### Miscellaneous checks: Part I (Pre Compilation)
1. Existence of DISCLAIMER, LICENSE, NOTICE, README.md and CHANGELOG.md files.
Please make sure these files are present in the parent folder after extracting the zip or tar. The CHANGELOG.md file should contain change log for the current release.
2. No unexpected binary files in the sources.
The extracted directory should not contain any binary. Need to test this before compiling the source code.
```bash
find . -type f -name '*.*' | sed 's|.*\.||' | sort -u
```
Please make sure no binary extension is listed here. Likely candidates are .jar files.  Additionally, for Malhar, demo package files, i.e. .apa files.

### Check for compilation, license headers, etc.

For Apex:
```bash
mvn clean apache-rat:check verify -Dlicense.skip=false install
```
For Malhar:
```bash
mvn clean apache-rat:check verify -Dlicense.skip=false -Pall-modules install
```
Jars should be installed in your maven repository, typically in *~/.m2/repository/org/apache/apex/* directory

Following step is optional and needs prerequisite 2 given above.
```bash
mvn verify -Papache-release -DskipTests
```

## Launch demos

For verification of Apex build, check backward compatibility with respect to Malhar. Locally update *apex.core.version* in Malhar to point to *to-be released* version of apex-core and recompile Malhar.

Launch few demos to make sure everything is working fine using *dtcli* utitlity. The dtcli script is present at <apex-core-folder>/engine/src/main/scripts/dtcli . If apex-core is being verified, then simply use engine/src/main/scripts/dtcli to launch the script. Otherwise, prefix it with apex-core folder path.

```bash
engine/src/main/scripts/dtcli 
```
You will get dtcli prompt, where demos can be launched.
```bash
dt> launch <demo-apk-file>
```
Demo apk files are typically in incubating-apex-malhar/demos directory.


## Miscellaneous checks: Part II (Post compilation)
1. Correct artifact names
All the apex artifacts generated in local maven build directory should contain classs jar, sources jars, javadocs jar. All the artifacts are under *~/.m2/repository/org/apache/apex/* directory.
