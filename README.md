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

**Note: If you have a version of node earlier than 4, run the following command:**
```bash
npm install jsdom@3.1.2
```


To test changes:

1. Make your changes to `.md`, `.html`, and `.less` files
2. Run `./node_modules/.bin/gulp`. This creates a `content` folder 
3. Serve this folder using something like Python's [Simple HTTP Server](http://www.linuxjournal.com/content/tech-tip-really-simple-http-server-python). If
   you have Ruby installed you can simply run: `ruby -run -e httpd . -p 9090` and view the documents in your browser at localhost:9090.
4. View the changes on the server you started in the previous step


One way to improve this process is to run `./node_modules/.bin/gulp watch`. 
This will start a process that watches for changes to source files and updates the `/content` folder accordingly.
This way you make your change and refresh the page to see the effect immediately.


Updating Downloads Page
-----------------------

The downloads page uses the content of `./releases.json` to populate the tables found there.
Care has been taken to automatically generate this releases.json file. To do so, run:

```bash
./node_modules/.bin/gulp fetch-releases
git add releases.json
git commit -m 'updated releases'
```

This will do the following things:

1. Parses out the release versions available via the [ASF dist pages](https://dist.apache.org/repos/dist/release/incubator/apex).
2. Queries Github for these found release tags to find the date they were published to github
3. Writes to releases.json with release information.


Once you have committed the changes to `releases.json`, follow the steps to contributing steps to publish the site to go live.



Updating Roadmap Page
---------------------

The roadmap page uses [roadmap.json](roadmap.json) to populate the Core and Malhar roadmap JIRA list.  The `roadmap.json` can be automatically generated via JIRA API calls by running:

```bash
gulp fetch-roadmap
git add roadmap.json
git commit -m 'Updating roadmap'
```

Once changes have been committed, follow the regular site publishing steps to update and publish `roadmap.html`.


Updating Announcements Page
---------------------------

Announcement updates are added to announcements.md file.

Upcoming meetups are automatically generated by a widget which uses meetup.com API to load all the events with apache-apex topic.  Additional events can be added directly to upcoming-meetups.md file.

To update the widget, or change the topic, go to the [Meetup Widget Foundry]http://www.meetup.com/meetup_api/foundry/, select Meetup Group Stats widget editable section, and paste the following code:

```html
<!-- http://www.meetup.com/meetup_api/foundry/ -->
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
<script src="local.js"></script>
<script src="api_key.js"></script>
<script id="config" type="text/javascript" charset="utf-8">
  var $parameters = {
    topic: "apache-apex",
    width: 250,
    height: 1000,
  };
  var $queries = {
    events: function() {
      return mup_widget.api_call("/2/open_events", {topic: $parameters.topic, page: '1000'});
    }
  };
</script>
<link rel="stylesheet" type="text/css" href="https://a248.e.akamai.net/secure.meetupstatic.com/style/widget.css">
<script type="text/javascript" charset="utf-8">
  mup_widget.with_jquery(function($, ctx) {
    var group = '',
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        addLink = function(content, link) {
            return '<a target="_blank" href="' + link + '">' + content + '</a>';
        },
        addLeadingZero = function( num ) {
            return (num < 10) ? ('0' + num) : num;
          },
        getFormattedDate = function( millis ) {
            var date = new Date( millis );
            return  months[date.getMonth()] + ' ' + addLeadingZero( date.getDate() ) + ', ' + date.getFullYear().toString();
          };

    $.getJSON($queries.events(), function(data) {
      if (data.status && data.status.match(/^200/) == null) {
        console.log("Error loading Meetups events: ", data.status + ": " + data.details);
      } else {
          if (data.results.length > 0) {

              // Sort results by meeting time, and if times are equal, by event.venue.name based on following ordering.
              // Venues names are sorted based on array index.  Venues not listed below are index -1, so are sorted higher.
              var venueNameSortOrder = ['Live Webcast', 'Webinar', 'Webcast'];
              data.results.sort(function(a, b) {
                if (a.time > b.time) { 
                  return 1; 
                }
                if (a.time < b.time) { 
                  return -1; 
                }
                if (a.time === b.time) {
                  if (a.venue && a.venue.name && b.venue && b.venue.name) {
                    return venueNameSortOrder.indexOf(a.venue.name) - venueNameSortOrder.indexOf(b.venue.name);
                  }
                  return 0;
                }
                return 0;
              });


              var uniqueEventsByKey = {};
              for (var i = 0; i < data.results.length; i++) {
                var event = data.results[i];
                console.log(event);
                var venue = event.venue;
                var city = (venue && venue.city) ? venue.city : 'TBD';
                var state_country = (venue) ?  venue.state || venue.country : '' ;
                var location = (state_country) ? city + ", " + state_country.toUpperCase() : city;
                event.location = location;
                // Check for duplicate events by event time
                var eventKey = event.time ? event.time : event.name;
                
                if (uniqueEventsByKey[eventKey]) {
                  console.log("DUPLICATE EVENT (skipped): ", event.event_url, " matches previous event ", uniqueEventsByKey[eventKey].event_url, " with date:", getFormattedDate(event.time), " and name ", event.name);
                } else {
                  uniqueEventsByKey[eventKey] = event;
                  $('.next-events', ctx).append('<p>'+ addLink(getFormattedDate(event.time) + " - " + event.location, event.event_url) + " - " + event.name + "</p>");
                }

              }

            }
      }
    });

  });
</script>
</head>
<body>
  <div class="next-events"></div>
</body>
</html>
```

The generated widget code can be directly pasted into upcoming-meetups.md page.



