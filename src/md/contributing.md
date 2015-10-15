# Contributing Guidelines

The apex core and apex malhar repositories both have mirror repositories on github which are used to review Pull Requests and provide a second remote endpoint for the codebase.



## Opening a Pull Request (contributors)

This project welcomes new contributors. If you would like to help by adding new features, enhancements or fixing bugs, here is how to do it.

1. Create a [JIRA](https://malhar.atlassian.net/) for the work you plan to do (or assign yourself to an existing JIRA ticket)
1. Fork the ASF github mirror (one time step):
   https://github.com/apache/incubator-apex-core/
1. Create a new branch from the [devel-3](https://github.com/apache/incubator-apex-core/tree/devel-3) branch. **Name your branch with the JIRA number in it, e.g. `APEX-123.my-feature`.**
1. When adding new files, please include the Apache v2.0 license header.
  - From the top level directory, run `mvn license:check -Dlicense.skip=false` to check correct header formatting.
  - Run `mvn license:format -Dlicense.skip=false` to automatically add the header when missing.
1. Once your feature is complete, submit the pull request on github against `devel-3`.
1. If you want specific people to review your pull request, use the `@` notation in Github comments to mention that user, and request that he/she reviews your changes.
1. After all review is complete, combine all new commits into one squashed commit, and include the Jira number in the commit message. There are several ways to squash commits, but [here is one explanation from git-scm.com](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History#Squashing-Commits).

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