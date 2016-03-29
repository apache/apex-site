# Documentation

- [Primary documentation](/docs/apex/) for Apache Apex including overviews of the product,
security, application development, operators and the commandline tool.

- [Apache Apex Malhar Documentation](/docs/malhar/) for the  operator library including a
diagrammatic taxonomy and some in-depth tutorials for selected operators (such as Kafka Input).

- <a href="https://www.datatorrent.com/docs/apidocs/" rel="nofollow">Java API documentation</a>
for both the platform and the operator library.

The following sections provide links to additional informative material such as
presentations, videos and blogs.

### Writing Apache Apex Applications

- [Building Your First Apache Apex Application](https://youtu.be/LwRWBudOjg4) This video has a hands-on demonstration of how to check out the source code
repositories and build them, then run the maven archetype command
to generate a new Apache Apex project, populate the project with Java source files
for a new application, and finally, build and run the application -- all on a
virtual machine running Linux with Apache Hadoop installed. 

- <a href="http://docs.datatorrent.com/tutorials/topnwords/" rel="nofollow">Top N Words Application Tutorial</a>This document provides a detailed step-by-step description of how to build and run a
word counting application with Apache Apex starting with setting up your development environment,
progressing to building, running and monitoring the application, visualizing the output and
concluding with some advanced features such as assessing operator memory requirements,
partitioning, and debugging.

- <a href="http://docs.datatorrent.com/tutorials/salesdimensions/" rel="nofollow">Sales Dimensions Application Tutorial</a> Similar to the Top N Words application but covers
dimensional computations on a simulated sales data stream.

- <a href="https://github.com/DataTorrent/examples" rel="nofollow">Example Applications</a> A `git` repository with sample code for specialized tutorials covering a
variety of topics such as a high-performance key-value store (HDHT), custom
partitioning using stream codecs, etc.

- [Malhar Demos](https://github.com/apache/incubator-apex-malhar/tree/master/demos) This is part of the source repository for Apache Apex Malhar and contains a number
of more substantial sample applications that developers will find especially useful.
They include an application that computes some
statistics (such as moving averages) from a live stream of stock transactions from
**Yahoo! Finance**; one that analyzes a synthetic stream of eruption event data for
the **Old Faithful** geyser; a Twitter stream analyzer; and a simulated fraud
detector.

### Presentations

- [Writing an Apache Apex application](http://files.meetup.com/18978602/University%20program%20-%20Writing%20an%20Apache%20Apex%20application.pdf) A PDF document that
frames a hands-on exercise of building a basic application; also includes a diagram
illustrating the life-cycle of operators.

- [Capital One Meetup](https://www.youtube.com/watch?v=KkjhyBLupvs) A pair of videos: The first by Capital One discussing their experience
with Apache Apex and evaluation of competing technologies and the second covering
integration of Apache Nifi and Apache Apex.

- [Next Gen Decision Making in < 2ms](http://www.slideshare.net/ApacheApex/capital-ones-next-generation-decision-in-less-than-2-ms) and [Nifi Integration with Apex](http://www.slideshare.net/ApacheApex/integrating-ni-fiandapex-by-bryan-bende) Slide decks that go with the above videos.

- [Introducing Apache Apex](https://www.brighttalk.com/webcast/13685/190407) A webinar that begins with the historical context for the rise of Hadoop and Big Data,
discusses why the promise of Hadoop remains largely unfulfilled and why moving beyond
Map-Reduce model is essential and why operability is critically important. It continues
with a discussion of the programming model, the various components of a running application
on a YARN cluster and the large library of operators and connectors available with
Apache Apex for reading data from and writing data to external systems. Concludes with
a brief description of the visualization dashboards.

- [Stream Processing with Apache Apex](http://www.slideshare.net/PramodImmaneni/meetup-59089806) A broad overview slide deck covering topics such as windowing, static and dynamic
partitioning, unification, fault tolerance, locality, monitoring, etc.

- [Fault Tolerance and Processing Semantics](https://www.brighttalk.com/webcast/13685/194115) A webinar and associated
[slides](http://www.slideshare.net/ApacheApexOrganizer/webinar-fault-toleranceandprocessingsemantics) covering core Apache Apex features including checkpointing and fault tolerance with fast,
incremental recovery via a buffer server which uses a publish-subscribe model for
inter-operator data transport. A variety of failure scenarios and processing guarantees
are discussed.

- [Windows in Apache Apex](http://www.slideshare.net/DevendraVyavahare/windowing-in-apex) Discusses the various flavors of windows available in Apache Apex and how to configure and
use them via callbacks. Contrasts windows with micro-batches.

- [Real Time Stream Processing Versus Batch](http://www.slideshare.net/DevendraVyavahare/batch-processing-vs-real-time-data-processing-streaming) Slide deck compares and contrasts the needs, use cases and challenges of stream processing
with those of batch processing.

### Blogs

- <a href="https://www.datatorrent.com/blog/introducing-apache-apex-incubating/" rel="nofollow">Introducing Apache Apex</a> Introduces Apache Apex and discusses how it addresses the current
challenges of Big Data in the areas of code reuse, operability, ease of use and the benefits
of a YARN-native solution.

- <a href="https://www.datatorrent.com/blog/tracing-dags-from-specification-to-execution/" rel="nofollow">Tracing DAGs from Specification to Execution</a> Discusses DAGs (Directed
Acyclic Graphs) as an application model, how they can be specified
in Java or via JSON, how the platform transforms them to physical plans for scaling and
how they can be monitored via the REST API.

- <a href="https://www.datatorrent.com/blog/blog-introduction-to-checkpoint/" rel="nofollow">An Introduction to Checkpointing in Apache Apex</a> Discusses checkpointing by saving serializing
operator state to HDFS and how to configure the frequency of checkpointing (or skip it
altogether) via attributes or annotations.

- <a href="https://www.datatorrent.com/blog/blog-operability-the-graveyard-of-big-data-projects" rel="nofollow">Operability — The Graveyard of Big Data Projects</a> Argues that operability
is a critical aspect of Big Data projects which implementors ignore at their peril. Features
of Apache Apex that solve operability issues are discussed broadly.

- <a href="https://www.datatorrent.com/blog/end-to-end-exactly-once-with-apache-apex" rel="nofollow"> End-to-end _Exactly-Once_ with Apache Apex</a> Details how Apache Apex can work in
conjunction with transactional systems to provide _exactly-once_ semantics. A simple example
of reading data from a Kafka topic and writing processed results to a SQL database is discussed
along with the relevant operators (already provided in the Apex Malhar library) and the
importance of idempotency.

- <a href="https://www.datatorrent.com/blog/blog-dimensions-computation-aggregate-navigator-part-1-intro/" rel="nofollow">Dimensions Computation - Part 1: Introduction</a> A two-part blog
that discusses dimensions computation in Apache Apex in considerable detail. The first part
introduces the domain, shows an **AdEvent** object to model tuples in the data stream and
analyzes the various dimensions of interest.

- <a href="https://www.datatorrent.com/blog/dimensions-computation-aggregate-navigator-part-2-implementation/" rel="nofollow">Dimensions Computation - Part 2: Implementation</a> The second
part continues with discussion of the three phases involved (_pre-aggregation_,
_unification_ and _storage_) the JSON schema to encapsulate the various keys and
aggregates, code fragments and, finally, concludes with visualization of the results.

- <a href="https://www.datatorrent.com/blog/blog-apex-performance-benchmark" rel="nofollow">Apache Apex Performance Benchmarks</a> Discusses the performance suite used to certify releases.

- <a href="https://blogs.apache.org/foundation/entry/celebrating_17_years_of_the">Apache Software Foundation</a> Discusses the history of the foundation, guiding principles, current
statistics and provides numerous additional links for details of how the foundation operates
and is managed.

### Trouble Shooting

- <a href="http://docs.datatorrent.com/troubleshooting/" rel="nofollow">Troubleshooting Guide</a>
