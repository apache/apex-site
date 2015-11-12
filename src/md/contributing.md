# Contributing Guidelines

The apex core and apex malhar repositories both have mirror repositories on github which are used to review Pull Requests and provide a second remote endpoint for the codebase.



## Opening a Pull Request (contributors)

This project welcomes new contributors. If you would like to help by adding new features, enhancements or fixing bugs, here is how to do it.

1. Create a [JIRA](https://malhar.atlassian.net/) for the work you plan to do (or assign yourself to an existing JIRA ticket)
1. Fork the ASF github mirror (one time step):
   https://github.com/apache/incubator-apex-core/  
1. Add [incubator apex core](https://github.com/apache/incubator-apex-core) as a remote repository.  
`git remote add upstream https://github.com/apache/incubator-apex-core`
1. Create a new branch from the [devel-3](https://github.com/apache/incubator-apex-core/tree/devel-3) branch. **Name your branch with the JIRA number in it, e.g. `APEX-123.my-feature`.**  
`git checkout -b APEX-123.my-feature -t upstream/devel-3`
1. When adding new files, please include the Apache v2.0 license header.
  - From the top level directory, run `mvn license:check -Dlicense.skip=false` to check correct header formatting.
  - Run `mvn license:format -Dlicense.skip=false` to automatically add the header when missing.
1. Once your feature is complete, submit the pull request on github against `devel-3`.
1. If you want specific people to review your pull request, use the `@` notation in Github comments to mention that user, and request that he/she reviews your changes.
1. After all review is complete, combine all new commits into one squashed commit, and include the Jira number in the commit message. There are several ways to squash commits, but [here is one explanation from git-scm.com]
 (https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History#Squashing-Commits) and a simple example is illustrated below:

  Run `git rebase -i`  
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
1. Till the review is complete it may happen that working feature branch may diverge from `devel-3` substantially and there are merge conflicts. Therefore, it is recommended to frequently merge `devel-3` to the branch being worked on. However, do **not** combine feature changes and changes related to merge conflict in a single commit. Doing so results in an inaccurate history and changes that are not part of a feature become part of the feature's history. If this was already done then create a new branch `APEX-123.my-feature.squash` from `devel-3` and squash merge the old feature branch to it. Following are the steps:

  ```
  git checkout -b APEX-123.my-feature.squash -t upstream/devel-3
  git merge --squash APEX-123.my-feature
  git commit -m 'JIRA-123 #comment added my-feature'
  git push origin +APEX-123.my-feature.squash:APEX-123.my-feature
  ```
1. Rebase again if needed. The final pull request should contain just one commit and that commit should only include changes which were made for that feature.


Thanks for contributing!

## Merging a Pull Request (committers)

1. Ensure that the basic requirements for a pull request are met. This includes:
  - Commit messages need to reference JIRA (pull requests will be linked to ticket)
  - Travis CI pull request build needs to pass
  - Ensure tests are added/modified for new features or fixes
  - Ensure appropriate JavaDoc comments have been added
1. To set up access to the ASF source repository, [follow these steps](https://git-wip-us.apache.org/#committers-getting-started). The ASF master repository is: `https://git-wip-us.apache.org/repos/asf/incubator-apex-core.git`
1. Use the git command line to pull in the changes from the pull requests. You can refer to the corresponding email that will be automatically sent to the `dev@apex.incubator.apache.org` mailing list to see the exact commands to merge the given pull request.
1. Once done with verification, push the changes to the ASF repository's `devel-3` branch. Within a few
seconds, the changes will propagate back to the github mirror and the pull requests be closed and marked merged automatically.
1. The `Fix version` field on the corresponding JIRA ticket needs to be set after pushing the changes.

**Note: since none of us has write access to the mirror, only the author of a pull request can close it if it was not merged.**
