Apache Apex Incubator Website
=============================

This is the source code for the Apache Apex Incubator website, hosted at [apex.incubator.apache.org](http://apex.incubator.apache.org/).


How it works
------------
The master branch of this repo contains the files that are used to generate the HTML that ultimately gets pushed to the incubator site.
The `asf-site` branch is where the actual generated files are stored. Note that this branch must contain exactly one folder called `content`,
and so has been checked out as an orphan branch with its own commit history apart from the master branch. See the *Building* section below.

Through a [gitpubsub](http://www.apache.org/dev/gitpubsub.html) mechanism on the apache.org server,
files are taken from the `asf-branch` and pushed to the live server.

Partials
--------
All pages on the site share the same header and footer. These are stored in the `src/partials` folder.

Pages
-----
Pages are stored in the `src/pages` folder. Each page should look something like this:

```HTML
{{> header}}

<h1>Hello World</h1>
<p>I am a page.</p>

{{> footer}}
```

## Markdown files

If you have a block of content that you would like to render as markdown, you can do so by creating a `.md` file in the `src/md/` folder.
These will be picked up, rendered has html, and passed into your page templates as partials. 
Assuming you have a file called `src/md/example_markdown.md`, you could have this in a page template:

```HTML
{{> header}}

<h1>Page with Injected Markdown</h1>

{{> example_markdown}}

{{> footer}}
```

Building (requires node+npm)
----------------------------
Run `build.sh` from the directory. This will:

- ensure the necessary npm and bower dependencies are installed
- checks out and updates the `asf-site` branch with a new commit of the build from the current branch

You must manually push to the `asf-site` remote branch.

Developing
----------

When making changes to src files, you can run `grunt watch`, which will constantly build the project in the `/content` folder,
so you don't have to manually run `grunt` after every change