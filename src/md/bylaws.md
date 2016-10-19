#*** draft subject to top level project approval ***
#Apache Apex Project Bylaws 

This document defines the bylaws under which the Apache Apex project operates. It
defines the roles and responsibilities of the project, who may vote, how voting works,
how conflicts are resolved, etc.

Apex is a project of the <a class="externalLink" href=
"http://www.apache.org/foundation/">Apache Software Foundation</a>. The Foundation
holds the copyright on Apache code including the code in the Apex codebase. The
<a class="externalLink" href="http://www.apache.org/foundation/faq.html">Foundation
FAQ</a> explains the operation and background of the foundation.

Apex is typical of Apache projects in that it operates under a set of principles,
known collectively as the "Apache Way". If you are new to Apache
development, please refer to the <a class="externalLink" href=
"http://incubator.apache.org/">Incubator project</a> for more information on how Apache
projects operate.

##Roles and Responsibilities

Apache projects define a <a class="externalLink" href=
"http://www.apache.org/foundation/how-it-works.html#roles">set of roles</a> with
associated rights and responsibilities. These roles govern what tasks an individual
may perform within the project. The roles are defined in the following sections:

###Users

The most important participants in the project are people who use our software.
The majority of our developers start out as users and guide their development
efforts from the user&rsquo;s perspective.

Users contribute to the Apache projects by providing feedback to developers in
the form of bug reports and feature suggestions. As well, users participate in the
Apache community by helping other users on mailing lists and user support
forums.

###Contributors

All of the volunteers who are contributing time, code, documentation, or
resources to the Apex Project. A contributor that makes sustained, welcome
contributions to the project may be invited to become a Committer, though the exact
timing of such invitations depends on many factors.

###Committers

The project's committers are responsible for the project's technical
management. All committers have write access to the project's source
repositories. Committers may cast binding votes on any technical discussion
regarding the project.

Committer access is by invitation only and must be approved by lazy consensus of
the active PMC members. A committer may request removal of their commit privileges
by their own declaration. A committer will be considered
"emeritus/inactive" by not contributing in any form to the project for
over one year. An emeritus committer may request reinstatement of commit access from
the PMC. Such reinstatement is subject to lazy consensus of active PMC members.

Commit access can be revoked by a unanimous vote of all the active PMC members
(except the committer in question if they are also a PMC member).

All Apache committers are required to have a signed Contributor License
Agreement (<a class="externalLink" href=
"http://www.apache.org/licenses/icla.txt">CLA</a>) on file with the Apache Software
Foundation. There is a <a class="externalLink" href=
"http://www.apache.org/dev/committers.html">Committer FAQ</a> which provides more
details on the requirements for committers

A committer who makes a sustained contribution to the project may be invited to
become a member of the PMC. The form of contribution is not limited to code. It can
also include code review, helping out users on the mailing lists, documentation,
etc.


###Project Management Committee

The Project Management Committee (PMC) for Apache Apex was created by a
resolution of the board of the Apache Software Foundation on ***TBD***. The
PMC is responsible to the board and the ASF for the management and oversight of the
Apache Apex community. The responsibilities of the PMC include:

* Deciding what is distributed as products of the project. In particular all releases must be approved by the PMC
* Maintaining the project's shared resources, including the codebase repository, mailing lists, websites.
* Speaking on behalf of the project
* Resolving license disputes regarding products of the project
* Nominating new PMC members and committers
* Keeping the board informed of the status of the project
* Maintaining these bylaws and other guidelines of the project

Membership of the PMC is by invitation only and must be approved by a lazy
consensus of active PMC members. Board approval is required for new PMC members.
A PMC member is considered
"emeritus/inactive" by not contributing in any form to the project for
over one year. An emeritus PMC member may request reinstatement to the PMC. Such
reinstatement is subject to lazy consensus of active PMC members. A PMC member may
resign their membership from the PMC by their own declaration. Membership of the
PMC can be revoked by an unanimous vote of all the active PMC members other than
the member in question. Removal of PMC members requires board approval.

The chair of the PMC is appointed by the ASF board. The chair is an office
holder of the Apache Software Foundation (Vice President, Apache Apex) and has
primary responsibility to the board for the management of the projects within the
scope of the Apex PMC. The chair reports to the board quarterly on developments
within the Apex project. The PMC may consider the position of PMC chair annually,
and if supported by a successful vote to change the PMC chair, may recommend a new
chair to the board. Ultimately, however, it is the board's responsibility who
it chooses to appoint as the PMC chair.

##Decision Making

Within the Apex project, different types of decisions require different forms of
approval. For example, the previous section describes several decisions which require
"lazy consensus" approval. This section defines how voting is performed,
the types of approvals, and which types of decision require which type of
approval.

###Voting

Decisions regarding the project are made by votes on the primary project
development mailing list (<a class="externalLink" href=
"mailto:dev@apex.apache.org)">dev@apex.apache.org)</a>.
When involving personnel or other confidential matters, PMC voting
may take place on the private Apex PMC mailing list. Votes are clearly indicated by
subject line starting with [VOTE]. Votes may contain multiple items for approval
and these should be clearly separated. Voting is carried out by replying to the
vote mail. Voting may take four flavours:

<table border="0" class="table table-striped">
<tbody>
  <tr class="a">
    <td>+1</td>

    <td>&ldquo;Yes,&rdquo; &ldquo;Agree,&rdquo; or &ldquo;the action should be
    performed.&rdquo; In general, this vote also indicates a willingness on the
    behalf of the voter in &ldquo;making it happen&rdquo;</td>
  </tr>

  <tr class="b">
    <td>+0</td>

    <td>This vote indicates a willingness for the action under consideration to
    go ahead. The voter, however will not be able to help.</td>
  </tr>

  <tr class="a">
    <td>-0</td>

    <td>This vote indicates that the voter does not, in general, agree with the
    proposed action but is not concerned enough to prevent the action going
    ahead. The voter should state why it's not a positive vote or why the voter does not agree.</td>
  </tr>

  <tr class="b">
    <td>-1</td>

    <td>This is a negative vote. On issues where consensus is required, this vote
    counts as a veto. All vetoes must contain an explanation of why the veto is
    appropriate. Vetoes with no explanation are void. It may also be appropriate
    for a -1 vote to include an alternative course of action.</td>
  </tr>
</tbody>
</table>

All participants in the Apex project are encouraged to show their agreement with
or against a particular action by voting. For technical (but not PMC) decisions, only the votes
of active committers are binding. Non binding votes are still useful for those with
binding votes to understand the perception of an action in the wider Apex community.
For PMC decisions, only the votes of PMC members are binding.

Voting can also be applied to changes made to the Apex codebase. These typically
take the form of a veto (-1) in reply to the commit message sent when the commit is
made.

###Approvals

These are the types of approvals that can be sought. Different actions require
different types of approvals:

<table border="0" class="table table-striped">
<tbody>
  <tr class="a">
    <td>Consensus</td>

    <td>For this to pass, all voters with binding votes must vote and there can
    be no binding vetoes (-1). Consensus votes are rarely required due to the
    impracticality of getting all eligible voters to cast a vote.</td>
  </tr>

  <tr class="b">
    <td>Lazy Consensus</td>

    <td>Lazy consensus requires 3 binding +1 votes and no binding vetoes.</td>
  </tr>

  <tr class="a">
    <td>Lazy Majority</td>

    <td>A lazy majority vote requires 3 binding +1 votes and more binding +1
    votes than -1 votes. Only binding votes (+1/-1) count. However if there is a number of -1 non binding votes the PMC should take notice of that.</td>
  </tr>

  <tr class="b">
    <td>Lazy Approval</td>

    <td>An action with lazy approval requires at least 1 binding +1 vote unless a
    -1 vote is received, at which time, depending on the type of action, either
    lazy majority or lazy consensus approval must be obtained.</td>
  </tr>

  <tr class="a">
    <td>2/3 Majority</td>

    <td>Some actions require a 2/3 majority of active committers or PMC members
    to pass. Such actions typically affect the foundation of the project (e.g.
    adopting a new codebase to replace an existing product). The higher threshold
    is designed to ensure such changes are strongly supported. To pass this vote
    requires at least 2/3 of binding vote holders to vote +1</td>
  </tr>
</tbody>
</table>

###Vetoes

A valid, binding veto cannot be overruled. If a veto is cast, it must be
accompanied by a valid reason explaining the reasons for the veto. The validity of
a veto, if challenged, can be confirmed by anyone who has a binding vote. This does
not necessarily signify agreement with the veto - merely that the veto is
valid.

If you disagree with a valid veto, you must lobby the person casting the veto to
withdraw their veto. If a veto is not withdrawn, the action that has been vetoed
must be reversed in a timely manner.

###Actions

This section describes the various actions which are undertaken within the
project, the corresponding approval required for that action and those who have
binding votes over the action.

<table border="0" class="table table-striped">
<thead>
  <tr class="a">
    <th>Action</th>

    <th>Description</th>

    <th>Approval</th>

    <th>Binding Votes</th>
  </tr>
</thead>

<tbody>
  <tr class="b">
    <td>Code Change (<a class="externalLink" href=
"http://www.apache.org/foundation/glossary.html#ReviewThenCommit">R-T-C</a>)</td>

    <td>A change made to a codebase of the project and committed (in git "pushed") by a committer.
    This includes source code, documentation, website content, etc.</td>

    <td>Lazy Approval, no binding vetoes</td>

    <td>Active committers</td>
  </tr>

  <tr class="a">
    <td>Major Feature/Change via a Branch Merge</td>

    <td>A major change made to the codebase of the project done via a branch
    merge.</td>

    <td>Lazy Consensus</td>

    <td>Active committers</td>
  </tr>

  <tr class="b">
    <td>Release Plan</td>

    <td>Defines the timetable and actions for a release. The plan also nominates
    a Release Manager.</td>

    <td>Lazy Majority</td>

    <td>Active committers</td>
  </tr>

  <tr class="a">
    <td>Product Release</td>

    <td>When a release of one of the project&rsquo;s products is ready, a vote is
    required to accept the release as an official release of the project.</td>

    <td>Lazy Majority</td>

    <td>Active PMC members</td>
  </tr>

  <tr class="b">
    <td>Adoption of New Codebase</td>

    <td>When the codebase for an existing, released product is to be replaced
    with an alternative codebase. If such a vote fails to gain approval, the
    existing code base will continue. This also covers the creation of new
    sub-projects within the project.</td>

    <td>2/3 Majority</td>

    <td>Active committers</td>
  </tr>

  <tr class="a">
    <td>New Committer</td>

    <td>When a new committer is proposed for the project</td>

    <td>Lazy Consensus</td>

    <td>Active PMC members</td>
  </tr>

  <tr class="b">
    <td>New PMC Member</td>

    <td>When a committer is proposed for the PMC</td>

    <td>Lazy Consensus</td>

    <td>Active PMC members</td>
  </tr>

  <tr class="a">
    <td>Committer Removal</td>

    <td>When removal of commit privileges is sought. Note: Such actions will also
    be referred to the ASF board by the PMC chair</td>

    <td>Consensus</td>

    <td>Active PMC members (excluding the committer in question if a member of
    the PMC).</td>
  </tr>

  <tr class="b">
    <td>PMC Member Removal</td>

    <td>When removal of a PMC member is sought. Note: Such actions will also be
    referred to the ASF board by the PMC chair</td>

    <td>Consensus</td>

    <td>Active PMC members (excluding the member in question).</td>
  </tr>

  <tr class="a">
    <td>Change to Project By-Laws</td>

    <td>When a change is needed to the Project&rsquo;s By-Laws.</td>

    <td>2/3 Majority</td>

    <td>Active PMC Members</td>
  </tr>

  <tr class="b">
    <td>Change the PMC Chair</td>

    <td>When the PMC Chair needs to be changed.</td>

    <td>Lazy Consensus</td>

    <td>Active PMC Members</td>
  </tr>
</tbody>
</table>


###Voting Timeframes

Votes are open for a period of a minimum of 3 days (excluding weekend days) to
allow all active voters time to consider the vote. For any votes requiring full
consensus or a 2/3 majority, the vote should remain open for a minimum of 1 week.
Votes relating to code changes are not subject to a strict timetable but should be
made as timely as possible.

