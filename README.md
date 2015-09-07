Apache Apex Incubator Website
=============================

This is the source code for the Apache Apex Incubator website, hosted at [apex.incubator.apache.org](http://apex.incubator.apache.org/).


How it works
------------
The master branch of this repo contains the files that are used to generate the HTML that ultimately gets pushed to the incubator site.
The `asf-site` branch is where the actual generated files are stored. 
Through a [gitpubsub](http://www.apache.org/dev/gitpubsub.html) mechanism, files are taken from the `asf-branch` and pushed to the live server.

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

Building
--------
Requires nodejs and npm.
```bash
# install dependencies
npm install
# run gulp command
./node_modules/.bin/gulp
```

Developing
----------

When making changes to src files, you can run `grunt watch`, which will constantly build the project in the `/content` folder,
so you don't have to manually run `grunt` after every change