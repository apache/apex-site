# Submitting and Merging Pull Requests via the Github Mirror

The apex core and apex malhar repositories both have mirror repositories on github which are used to review Pull Requests and provide a second remote endpoint for the codebase.



## Opening a Pull Request

Fork the ASF github mirror:

https://github.com/apache/incubator-apex-core/

You can then update your local repository to add the new fork as remote. No
need for another clone or to recreate your workspace.

Once your feature is complete, submit the pull request. Some additional notes:

- Commit messages need to reference JIRA (pull requests will be linked to ticket)
- Travis CI pull request build needs to pass
- Fix version needs to be set after pushing changes

## Merging a Pull Request (must be a committer)

The ASF master repository is: `https://git-wip-us.apache.org/repos/asf/incubator-apex-core.git`

Access: [https://git-wip-us.apache.org/#committers-getting-started](https://git-wip-us.apache.org/#committers-getting-started)

Use the command line to pull in the changes from the pull requests. Since
the github mirror is readonly, you will not be shown the convenient command
line instructions :-( Good opportunity to remember the git commands!

Once done with verification, push the changes to the master. Within a few
seconds, the changes will propagate back to the github mirror and the pull
requests be closed and marked merged.

**Note: since none of us has write access to the mirror, only the author of a
pull request can close it.**