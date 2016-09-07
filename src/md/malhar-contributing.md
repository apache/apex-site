# Malhar Contribution Guidelines

Malhar library predominantly contains different kinds of operators like connectors to messaging systems, databases, key-value and document stores, block i/o operators like various file system operators, analytic and algorithmic operators and other miscellaneous operators. It also provides other components to build applications such as partitioners, stats listeners, stream codecs and state management. This document outlines the general steps for making contributions to Malhar. Even though the processes described in the rest of the document refer to Operators in particular, they also generally apply to other application components mentioned above.

## Operators

* Follow the unix philosophy, design your operator to do one thing and do it well. If the operator is doing multiple things, you may not be taking advantage of platform parallelism aspects like pipelining to the fullest extent (akin to unix pipes). 

* Search Malhar project to see if there is an operator with similar functionality before embarking on writing a new one
	* If an operator that is supposed to solve the same problem is already present but isn’t complete or does not have the required functionality, consider making improvements to it. There should be a strong reason to not do this and create a new one. 
	* If there is an overlap in functionality with an existing operator or an operator that is designed to be extended, do not rewrite that functionality. Create the new operator in such a way that it reuses code already present and implements the new functionality on top of it. This might require refactoring of existing operator(s).
* If the functionality requires connecting two or more operators together, do that in the application. If this pattern would be useful to others and can be reused in other applications consider making it a module.
  
## Preparation for making changes

If after performing the above analysis, there is a need to write a new operator or update an existing one, follow these steps

* Make the case on [dev mailing list](/community.html#mailing-lists) as to why the changes are needed and propose any design that you are thinking of.
* If writing a new operator, mention any existing operators you considered, that have related or partially matching functionality to the desired functionality and why they cannot be improved to meet the requirements.
* Also mention which folder under Malhar the operator would go into. If scalability and recovery features such as partitioning, idempotency etc., are not going to be implemented then the operator should go into **contrib**. For more explanation, see implementing an operator section below.
* Respond to comments and suggestions and make appropriate modifications to design that are consistent with the evolving consensus.
* Summarize the final list of changes in an email.
* Create a [JIRA](https://issues.apache.org/jira/browse/APEXMALHAR) to track the work.
* Work on the changes.

## Implementing an operator

* Look at the [Operator Development Guide](/docs/apex/operator_development) and the [Best Practices Guide](/docs/apex/development_best_practices) on how to implement an operator and what the dos and don'ts are.
* Refer to existing operator implementations when in doubt or unsure about how to implement some functionality. You can also email the [dev mailing list](/community.html#mailing-lists) with any questions.
* Write unit tests for operators
	* Refer to unit tests for existing operators.
	* If possible write a sample application testing the operator.
	* Try to keep the tests self contained i.e., avoid the user having to perform additional setup or setup other services before running the tests. This can be done by starting mock versions of the required services from within the test and shutting them down when the test finishes.
* Follow the code style guidelines of the Apache Apex project described [here](http://apex.apache.org/contributing.html#code-style).
* If only the core operator business logic for the operator is implemented and advanced platform functionality for scalability and recovery, such as partitioning, idempotence etc., described in the above reference guides are not implemented, make the code submission pull request to the **contrib** folder in Malhar, otherwise make it to an appropriate top-level module or a new one if one is not present.
