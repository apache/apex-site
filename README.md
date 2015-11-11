Apache Apex Incubator Website
=============================

This is the source code for the Apache Apex Incubator website, hosted at [apex.incubator.apache.org](http://apex.incubator.apache.org/). The following tools are used to build the html pages:

- [nodejs + npm](https://nodejs.org/en/)
- [gulp - nodejs automation tool](http://gulpjs.com/)
- [handlebars.js - templating](http://handlebarsjs.com/)
- [LESS - css pre-processor](http://lesscss.org/)
- [Marked - Markdown parser/compiler](https://github.com/chjj/marked)
- [Bootstrap - HTML/CSS/JS framework](http://getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [HighlightJS - code syntax highlighting](https://highlightjs.org/)


How it works
------------
The master branch of this repo contains the source files that are used to generate the HTML that ultimately gets pushed to the incubator site.
The `asf-site` branch is where the actual generated files are stored. Note that this branch must contain exactly one folder called `content`,
and so has been checked out as an orphan branch with its own commit history apart from the master branch. See the *Contributing* section below.

Through a [gitpubsub](http://www.apache.org/dev/gitpubsub.html) mechanism on the apache.org server,
files are taken from the `asf-branch` and pushed to the live server.

Pages
-----
Pages are stored in the `src/pages` folder. Each page uses the [handlebars templating engine](http://handlebarsjs.com/), and should look something like this:

```HTML
{{> header}} <!-- includes the header.handlebars partial -->

<h1>Hello World</h1>
<p>I am a page.</p>

{{> footer}} <!-- includes the footer.handlebars partial -->
```

Partials
--------
All pages on the site share the same header and footer. These are stored in the `src/partials` folder. You can put other partials in here and they will be made available to all templates (the `.handlebars` extension is dropped).

Markdown files
--------------
If you have a block of content that you would like to render from a markdown file, you can do so by creating a `.md` file in the `src/md/` folder.
These `.md` files will be picked up, rendered has html, and exposed to page templates as partials. 
Assuming you have a file called `src/md/example_markdown.md`, you could have this in a page template:

```HTML
{{> header}}

<h1>Page with Injected Markdown</h1>

{{> example_markdown}}

{{> footer}}
```

Contributing
------------
If you would like to make a change to the site:

1. Fork the [github mirror](https://github.com/apache/incubator-apex-site)
2. Create a new branch from `master`
3. Add commit(s) to your branch
4. Test your changes locally (see Development section below)
5. Open a pull request on the github mirror
6. A committer will merge your changes if all is good

If you are a committer, do the following:

1. Update the master branch with your (or a Pull Request's) change.
2. Push updated master to the asf remote master (https://git-wip-us.apache.org/repos/asf/incubator-apex-site.git)
2. Run `build.sh` from the master branch directory (requires nodejs and npm). This will:
  - ensure the necessary npm and bower dependencies are installed
  - checks out and updates the `asf-site` branch with a new commit of the build from the current branch
3. At this point, you should be on the `asf-site` branch. Simply push this branch to the asf remote and the site will automatically be updated within seconds.

Development
-----------

First, install dependencies:
```bash
npm install
./node_modules/.bin/bower install
```

To test changes:

1. Make your changes to `.md`, `.html`, and `.less` files
2. Run `./node_modules/.bin/gulp`. This creates a `content` folder 
3. Serve this folder using something like Python's [Simple HTTP Server](http://www.linuxjournal.com/content/tech-tip-really-simple-http-server-python).
4. View the changes on the server you started in the previous step


One way to improve this process is to run `./node_modules/.bin/gulp watch`. 
This will start a process that watches for changes to source files and updates the `/content` folder accordingly.
This way you make your change and refresh the page to see the effect immediately.
