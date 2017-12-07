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

Before working on changes for any of the repositories, please locate an existing JIRA ticket or submit a new one.
Before a ticket can be assigned, you need to be listed as contributor in the JIRA project. PMC members have access to add new contributors, please request to be added through a comment on your candidate ticket or send us an email on the dev@ mailing list.

### Github and git

We use GitHub’s pull request functionality to review proposed code changes. If you do not already have a personal GitHub account, sign up [here](https://github.com/join). We recommend that you use the same email address and first/lastname for emails, git and JIRA so that contributions can be better tracked and notifications correlated. It is also recommended that you use an email address that is valid permanently (for example your @gmail.com or @apache.org address). Please also see:

* https://help.github.com/articles/setting-your-email-in-git/
* https://help.github.com/articles/adding-an-email-address-to-your-github-account/
* https://help.github.com/articles/keeping-your-email-address-private/

If you are new to git, this [tutorial](https://try.github.io/) may be helpful.

1. Fork the ASF repository: [Apex Core](https://github.com/apache/apex-core) or [Apex Malhar](https://github.com/apache/apex-malhar) or [Apex Site](https://github.com/apache/apex-site) into your github account. 
1. Clone the **fork** on your local workspace:<br/>
   `git clone https://github.com/{github_username}/apex-core.git`

### Java Development Environment

For prerequisites and setup instructions see: http://apex.apache.org/docs/apex/apex_development_setup/

Apache Apex follows coding style that is closest to K & R style and uses [Checkstyle](http://checkstyle.sourceforge.net/) tool to enforce these standards. Apex checkstyle enforces no trailing whitespace. Travis CI will fail for any pull request that introduces any style violations. The checkstyle configuration is [here](https://github.com/apache/apex-core/blob/master/codestyle-config/src/main/resources/apex_checks.xml).

To make it easier for the users to set up their development environment, settings for the following common IDEs are provided in the Apache Apex Core repository with instructions.
 - [IntelliJ](https://github.com/apache/apex-core/tree/master/misc/ide-templates/intellij)
 - [Eclipse](https://github.com/apache/apex-core/tree/master/misc/ide-templates/eclipse)
 - [NetBeans](https://github.com/apache/apex-core/tree/master/misc/ide-templates/netbeans)

## Before Coding

Before starting work, have a JIRA assigned to yourself. If you want to work on a ticket that is assigned to someone else,
send a courtesy e-mail to the assignee to check if you can take it over. 
Confirm type, priority and other JIRA fields (often default values are not the best fit).

Before implementing non-trivial changes that result in potentially large code modifications:

* Engage on the mailing list to ensure your time will be well spent, the proposal is welcome by the community
and does not overlap or conflict with other initiatives.
* Discuss the design aspects, the larger picture. This may involve discussion, questions,
suggestions, consensus building towards agreed approach. Or possibly some prototyping. 
* Capture the outcome or final approach on your JIRA ticket, this will help others to see important
information without getting into details (including users that may lookup a JIRA from release notes).
* Certain licenses cannot be used in ASF projects. Ensure contributions don't introduce such dependencies. See
1. https://www.apache.org/legal/resolved.html#category-x
1. https://www.apache.org/legal/
1. https://www.apache.org/legal/resolved.html
1. https://issues.apache.org/jira/browse/LEGAL

## Opening Pull Requests

1. Create a new branch from the `master` branch, **name it with the JIRA number, e.g. `APEXCORE-123.my-feature`**:<br/>
`git checkout -b APEXCORE-123.my-feature -t upstream/master`<br/>
Creating a local branch that tracks a remote makes pull easier (no need to specify the remote branch while pulling). A branch can be made to track a remote branch anytime, not necessarily at its creation by:<br/>
`git branch -u upstream/master`
1. When adding new files, please include the Apache v2.0 license header.
  - From the top level directory, run `mvn license:check -Dlicense.skip=false` to check correct header formatting.
  - Run `mvn license:format -Dlicense.skip=false` to automatically add the header when missing.
1. Once your feature is complete, submit the pull request on github against `master`. **Use the JIRA number (e.g. APEXCORE-123) as prefix in the pull request title**. This will ensure the information is attached to the JIRA ticket automatically. If commits result from running scripts, file formatting or similar, use following attribution:<br/>
  `git commit --amend --author "Apex Dev <dev@apex.apache.org>"`
1. If you want specific people to review the work, request reviewers or assignees on the pull request (Github will make suggestions). You can also use the `@` notation in Github comments to mention that user, and request that he/she reviews your changes.
1. Check the status of the pull request and ensure the Travis CI and Jenkins builds are successful. If not, inspect the linked build log for details.
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
1. In case you need more time to work on the PR after receiving review feedback and anticipate some period of inactivity, please close the PR and let the reviewers know if you plan to work on the PR later. Once you have time to resume
   work on the issue, please re-open existing PR prior to updating your remote branch. When a PR is inactive longer than 2 months, it may be closed by a committer.  

Thanks for contributing!

## Merging a Pull Request (committers)

1. Ensure that basic requirements for a pull request are met. This includes:
  - Sufficient time has passed for others to review 
  - PR was suffiently reviewed and comments were addressed. See [voting policy](https://www.apache.org/foundation/voting.html). 
  - When there are multiple reviewers, wait till other reviewers approve, with timeout of 48 hours before merging
  - If the PR was open for a long time, email dev@ declaring intent to merge
  - Commit messages and PR title need to reference JIRA (pull requests will be linked to ticket)
  - Travis CI and Jenkins pull request build needs to pass
  - Ensure tests are added/modified for new features or fixes
  - Ensure appropriate JavaDoc comments have been added
  - Verify contributions don't depend on incompatible licences (see https://www.apache.org/legal/resolved.html#category-x)
1. If the CI build fails because of the presence of a CVE vulnerability, further analysis needs to be performed
  - If the CVE is unrelated to the changes in the PR i.e., the changes in the PR are not the cause then it can be merged
  - If the vulnerability is in a dependency added by the PR then the committer should ask the contributor to address it. If there are no good alternatives, then a discussion should happen in the security list whether to allow the PR, before it can be merged
  - If it is determined that a vulnerability is not applicable to the project for a reason such as the code paths corresponding to it are not exercised by the software or for any other reason, the vulnerability can be added to the whitelist file `dependency-check-whitelist.xml` to ignore it for future builds 
  - In any case, if the vulnerability affects the software, a JIRA should to be created to address the vulnerability in an appropriate way
1. Use the github *rebase and merge* option or the git command line to merge the pull request (see link `view command line options` on the PR).
1. Update JIRA after pushing the changes. Set the `Fix version` field and resolve the JIRA with proper resolution. Also verify that other fields (type, priority, assignee) are correct.

