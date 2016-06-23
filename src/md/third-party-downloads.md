## Third-Party Downloads

This is a list of 3rd party binary packages based on Apache Apex. The Apache Apex project does not endorse or maintain any 3rd party binary packages.

- <a href="https://www.datatorrent.com/download/" rel="nofollow">DataTorrent RTS</a> is a binary build of Apache Apex created by <a href="https://www.datatorrent.com/" rel="nofollow">DataTorrent</a>.
- Apache Apex Sandbox Docker image using [Bigtop](http://bigtop.apache.org/) packages
  - This is a ready to use sandbox environment where bigtop-hadoop and bigtop-apex is pre-installed
  - To use, run following commands and then launch apex cli/dtcli from docker container:
    ```bash
    docker pull apacheapex/sandbox
    docker run -it --name=apex-sandbox apacheapex/sandbox
    ```
  - For advanced usage, click [here](https://hub.docker.com/r/apacheapex/sandbox/)
- [Bigtop](http://bigtop.apache.org/) CI based distribution binaries:
  - Setup Bigtop Environment:
    1. Grab the repo/list file for your favourite linux distribution from [here](http://www.apache.org/dist/bigtop/bigtop-1.1.0/repos/)
    2. Install bigtop hadoop:
      - For RPM based systems: ** yum install hadoop\* **
      - For DEB baed systems: ** apt-get install hadoop\* **
    3. Follow steps [here](https://cwiki.apache.org/confluence/display/BIGTOP/How+to+install+Hadoop+distribution+from+Bigtop+0.5.0#HowtoinstallHadoopdistributionfromBigtop0.5.0-RunningHadoop) to start hadoop services.

  - Apex packages available are:
    - RPM: [CentOS 6](https://ci.bigtop.apache.org/job/Bigtop-trunk-packages/BUILD_ENVIRONMENTS=centos-6,COMPONENTS=apex,label=docker-slave/lastSuccessfulBuild/artifact/output/apex/noarch/apex-3.3.0-1.el6.noarch.rpm), [CentOS 7](https://ci.bigtop.apache.org/job/Bigtop-trunk-packages/BUILD_ENVIRONMENTS=centos-7,COMPONENTS=apex,label=docker-slave/lastSuccessfulBuild/artifact/output/apex/noarch/apex-3.3.0-1.el7.centos.noarch.rpm), [Fedora 20](https://ci.bigtop.apache.org/job/Bigtop-trunk-packages/BUILD_ENVIRONMENTS=fedora-20,COMPONENTS=apex,label=docker-slave/lastSuccessfulBuild/artifact/output/apex/noarch/apex-3.3.0-1.fc20.noarch.rpm), [OpenSUSE 13.2](https://ci.bigtop.apache.org/job/Bigtop-trunk-packages/BUILD_ENVIRONMENTS=opensuse-13.2,COMPONENTS=apex,label=docker-slave/lastSuccessfulBuild/artifact/output/apex/noarch/apex-3.3.0-1.noarch.rpm) 
    - DEB: [Ubuntu 14.04](https://ci.bigtop.apache.org/job/Bigtop-trunk-packages/BUILD_ENVIRONMENTS=ubuntu-14.04,COMPONENTS=apex,label=docker-slave/lastSuccessfulBuild/artifact/output/apex/apex_3.3.0-1_all.deb), [Debian 8](https://ci.bigtop.apache.org/job/Bigtop-trunk-packages/BUILD_ENVIRONMENTS=debian-8,COMPONENTS=apex,label=docker-slave/lastSuccessfulBuild/artifact/output/apex/apex_3.3.0-1_all.)

If you would like to provide your own edition of Apache Apex here, please send email to [dev@apex.apache.org](mailto:dev@apex.apache.org).