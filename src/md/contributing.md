# Contributing Guidelines

This project welcomes new contributors and invites everyone to participate. Our aim is to build an open community. There are many different ways to get involved:

* Adding new features, enhancements, tests or fixing bugs
* Pull request reviews
* Release management and verification
* Participation on email list
* Web site improvements
* Documentation
* Organize meetups and other events
* Publishing papers and blogs
* Present at conferences or spread the word in other ways

People that help with the project in any of the above categories or other ways are contributors. See the [roles](http://www.apache.org/foundation/how-it-works.html#roles) as defined by the ASF. Community members that make sustained, welcome contributions to the project may be invited to become a [committer](/people.html). 

## One-time Setup

### JIRA

Apache JIRA is used for issue tracking. If you do not already have an Apache JIRA account, sign up [here](https://issues.apache.org/jira/). Note that the user name should have no white spaces or other special characters that complicate auto-completion within JIRA comments etc. 

Please use a single JIRA account only (don't create multiple with different email addresses) to retain the issue history. Please use a permanent email address, for an existing account it can be changed in the profile. If you absolutely have to change your user name, contact INFRA.

Apex has 2 JIRA projects:

1. [APEXCORE](https://issues.apache.org/jira/browse/APEXCORE/) for [apex-core](https://github.com/apache/apex-core) and [apex-site](https://github.com/apache/apex-site)
2. [APEXMALHAR](https://issues.apache.org/jira/browse/APEXMALHAR/) for [apex-malhar](https://github.com/apache/apex-malhar)

Before working on changes for any of the repositories, please locate an existing JIRA ticket or submit a new one. In order to assign an issue to yourself, you need to be listed as contributor in the JIRA project. PMC members have access to add new contributors, please request to be added through a comment on your candidate ticket or send us an email on the dev@ mailing list.

### Github and git

We use GitHub’s pull request functionality to review proposed code changes. If you do not already have a personal GitHub account, sign up [here](https://github.com/join). We recommend that you use the same email address and first/lastname for emails, git and JIRA so that contributions can be better tracked and notifications correlated. It is also recommended that you use an email address that is valid permanently (for example your @gmail.com or @apache.org address). Please also see:

* https://help.github.com/articles/setting-your-email-in-git/
* https://help.github.com/articles/adding-an-email-address-to-your-github-account/
* https://help.github.com/articles/keeping-your-email-address-private/

If you are new to git, this [tutorial](https://try.github.io/) may be helpful.

The ASF Apex git repositories have mirror repositories on github which are used to review pull requests and provide a second remote endpoint for the codebase.

1. Fork the ASF github mirror: https://github.com/apache/apex-core (or https://github.com/apache/apex-malhar or https://github.com/apache/apex-site) 
1. Clone the **fork** on your local workspace (one time step):<br/>
   `git clone https://github.com/{github_username}/apex-core.git`
1. Add the mirror as remote repository, here shown for apex-core:<br/>
   `git remote add upstream https://github.com/apache/apex-core`

### Java Development Environment

For prerequisites and setup instructions see: http://apex.apache.org/docs/apex/apex_development_setup/

Apache Apex follows coding style that is closest to K & R style and uses [Checkstyle](http://checkstyle.sourceforge.net/) tool to enforce these standards. Apex checkstyle enforces no trailing whitespace. Travis CI will fail for any pull request that introduces any style violations. The checkstyle configuration is [here](https://github.com/apache/apex-core/blob/master/codestyle-config/src/main/resources/apex_checks.xml).

To make it easier for the users to set up their development environment, settings for the following common IDEs are provided in the Apache Apex Core repository with instructions.
 - [IntelliJ](https://github.com/apache/apex-core/tree/master/misc/ide-templates/intellij)
 - [Eclipse](https://github.com/apache/apex-core/tree/master/misc/ide-templates/eclipse)
 - [NetBeans](https://github.com/apache/apex-core/tree/master/misc/ide-templates/netbeans)

## Opening Pull Requests

1. Create a new branch from the `master` branch, **name it with the JIRA number, e.g. `APEXCORE-123.my-feature`**:<br/>
`git checkout -b APEXCORE-123.my-feature -t upstream/master`<br/>
Creating a local branch that tracks a remote makes pull easier (no need to specify the remote branch while pulling). A branch can be made to track a remote branch anytime, not necessarily at its creation by:<br/>
`git branch -u upstream/master`
1. When adding new files, please include the Apache v2.0 license header.
  - From the top level directory, run `mvn license:check -Dlicense.skip=false` to check correct header formatting.
  - Run `mvn license:format -Dlicense.skip=false` to automatically add the header when missing.
1. Once your feature is complete, submit the pull request on github against `master`. Use the JIRA number (e.g. APEXCORE-123) as prefix in the pull request title. This will ensure the information is attached to the JIRA ticket automatically.
1. If you want specific people to review your pull request, use the `@` notation in Github comments to mention that user, and request that he/she reviews your changes.
1. Check the status of the pull request and ensure the Travis CI build is successful. If not, inspect the linked build log for details.
  - If build fails due to license headers, follow instructions above.
  - If build fails due to code style violations, run `mvn checkstyle:check -Dcheckstyle.console=true` and correct those issues that were introduced with your changes. 
1. Add changes after the PR was opened to the same branch, Travis CI will detect changes and build automatically. To force the CI run, close and re-open the PR.
1. After all review is complete, combine all new commits into one squashed commit except when there are multiple contributors, and include the Jira number in the commit message. There are several ways to squash commits, but [here is one explanation from git-scm.com](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History#Squashing-Commits) and a simple example is illustrated below:

  If tracking upstream/master then run `git rebase -i`. Else run `git rebase -i upstream/master`.
  This command opens the text editor which lists the multiple commits:

  ```
  pick 67cd79b change1
  pick 6f98905 change2

  # Rebase e13748b..3463fbf onto e13748b (2 command(s))
  #
  # Commands:
  # p, pick = use commit
  # r, reword = use commit, but edit the commit message
  # e, edit = use commit, but stop for amending
  # s, squash = use commit, but meld into previous commit
  # f, fixup = like "squash", but discard this commit's log message
  # x, exec = run command (the rest of the line) using shell
  #
  # These lines can be re-ordered; they are executed from top to bottom.
  ```
  Squash 'change2' to 'change1' and save.

  ```
  pick 67cd79b change1
  squash 6f98905 change2
  ```
1. If there are multiple contributors in a pull request preserve individual attributions. Try to squash the commits to the minimum number of commits required to preserve attribution and the contribution to still be functionally correct.
1. Till the review is complete it may happen that working feature branch may diverge from `master` substantially. Therefore, it is recommended to frequently merge `master` to the branch being worked on by:
  * when the branch tracks upstream/master  
  `git pull`
  * when the branch doesn't track upstream  
  `git pull upstream master`
1. If a pull from `master` results in a conflict then resolve it and commit the merge. This results in additional merge commits in the pull request. Following steps help to ensure that the final pull request contains just one commit:
  * Rename the original branch:  
  `git branch -m APEXCORE-123.my-feature.squash`
  * Create a new branch (with the original name) from upstream/master that has latest changes:   
  `git checkout -b APEXCORE-123.my-feature -t upstream/master`
  * Squash merge the old branch which was renamed. When the new branch has the latest changes then this squash will result only in the changes that were made for the feature:  
  `git merge --squash APEXCORE-123.my-feature.squash`
  * Commit the squash and force push it to the old feature remote branch so that the pull request is automatically updated:    
  `git commit -m "APEXCORE-123 #comment added my-feature" `  
  `git push origin +APEXCORE-123.my-feature`
  * Delete the extra squash branch:  
  `git branch -D APEXCORE-123.my-feature.squash`

Thanks for contributing!

## Merging a Pull Request (committers)

1. Ensure that the basic requirements for a pull request are met. This includes:
  - Commit messages need to reference JIRA (pull requests will be linked to ticket)
  - Travis CI pull request build needs to pass
  - Ensure tests are added/modified for new features or fixes
  - Ensure appropriate JavaDoc comments have been added
1. To set up access to the ASF source repository, [follow these steps](https://git-wip-us.apache.org/#committers-getting-started). The ASF master repository is:<br/>
   `https://git-wip-us.apache.org/repos/asf/apex-core.git`
1. Use the git command line to pull in the changes from the pull requests. You can refer to the corresponding email that will be automatically sent to the `dev@apex.apache.org` mailing list to see the exact commands to merge the given pull request.
1. Once done with verification, push the changes to the ASF repository's `master` branch. Within a few
seconds, the changes will propagate back to the github mirror and the pull requests be closed and marked merged automatically.
1. The `Fix version` field on the corresponding JIRA ticket needs to be set and the ticket resolved after pushing the changes.

**Note: since none of us has write access to the mirror, only the author of a pull request can close it if it was not merged.**
