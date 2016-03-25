# Documentation

Primary documentation for Apache Apex including overviews of the product, security,
application development, operators and the commandline tool is
[here](/docs/apex/). Documentation for the Apache Apex Malhar operator library
including a diagrammatic taxonomy and some in-depth tutorials for selected operators
(such as Kafka Input) is [here](/docs/malhar/).

The Java API for both the platform and the operator library is
<a href="https://www.datatorrent.com/docs/apidocs/" rel="nofollow">here</a>.

The following sections provide links to additional informative material such as
presentations, videos and blogs.

### Writing Apache Apex Applications

- [Building Your First Apache Apex Application (video)](https://youtu.be/LwRWBudOjg4)
This video has a hands-on demonstration of how to check out the source code
repositories and build them, then run the maven archetype command
to generate a new Apache Apex project, populate the project with Java source files
for a new application, and finally, build and run the application -- all on a
virtual machine running Linux with Apache Hadoop installed. 

- [Top N Words Application Tutorial](http://docs.datatorrent.com/tutorials/topnwords/)
This document provides a detailed step-by-step description of how to build and
run a word counting application with Apache Apex starting with setting up your
development, progressing to building, running and monitoring the application,
visualizing the output and concluding with some advanced features such as
assessing operator memory requiremnets, partitioning, and debugging.

- [Sales Dimensions Application Tutorial](http://docs.datatorrent.com/tutorials/salesdimensions/)
Similar to the Top N Words application but covers dimensional computations on a
simulated sales data stream.

- [Example Applications](https://github.com/DataTorrent/examples)
A `git` repository with sample code for specialized tutorials covering a
a variety of topcs such as a high-performance key-value store (HDHT), custom
partitioning using stream codecs, etc.

- [Malhar Demos](https://github.com/apache/incubator-apex-malhar/tree/master/demos)
This is part of the source repository for Apache Apex Malhar and contains a number
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

- [Capital One Meetup](https://www.youtube.com/watch?v=KkjhyBLupvs)
A pair of videos: The first by Capital One discussing their experience
with Apache Apex and evaluation of competing technologies and the second covering
integration of Apache Nifi and Apache Apex.

- [Next gen decision making < 2ms](http://www.slideshare.net/ApacheApex/capital-ones-next-generation-decision-in-less-than-2-ms) and
  [Nifi integration with Apex](http://www.slideshare.net/ApacheApex/integrating-ni-fiandapex-by-bryan-bende) Slide decks that go with the above video.

- [Stream Processing with Apache Apex](http://www.slideshare.net/PramodImmaneni/meetup-59089806) A broad overview slide deck covering topics
such as windowing, static and dynamic partitioning, unification,
fault tolerance, locality, monitoring, etc.
