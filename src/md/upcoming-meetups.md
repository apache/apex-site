## Upcoming Meetups


<div id="1458176353510"></div>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script>jQuery.noConflict();</script>
<script>
  jQuery(function() {
    var scripts = ["var%20%24parameters%20%3D%20%7B%22topic%22%3A%22apache-apex%22%2C%22width%22%3A%22250%22%2C%22height%22%3A%221000%22%7D%3B%0Avar%20%24queries%20%3D%20%7B%20events%3A%20function%28%29%20%7B%20return%20%22https%3A//api.meetup.com/2/open_events%3Fand_text%3DFalse%26offset%3D0%26format%3Djson%26limited_events%3DFalse%26sig%3D3b7decaeff772cd10cb65730b81a845f8533cc8b%26topic%3Dapache-apex%26callback%3D%3F%26page%3D1000%26radius%3D25.0%26sig_id%3D87819142%26desc%3DFalse%26status%3Dupcoming%26_%3D1458176351397%26user_agent%3Dmeetup.widget%3Amug_stats%22%3B%20%7D%20%7D%3B%0A","%0Amup_widget.with_jquery%28function%28%24%2Cctx%29%7Bvar%20group%3D%27%27%2Cmonths%3D%5B%27Jan%27%2C%27Feb%27%2C%27Mar%27%2C%27Apr%27%2C%27May%27%2C%27Jun%27%2C%27Jul%27%2C%27Aug%27%2C%27Sep%27%2C%27Oct%27%2C%27Nov%27%2C%27Dec%27%5D%2CaddLink%3Dfunction%28content%2Clink%29%7Breturn%27%3Ca%20target%3D%22_blank%22%20href%3D%22%27+link+%27%22%3E%27+content+%27%3C/a%3E%27%3B%7D%2CaddLeadingZero%3Dfunction%28num%29%7Breturn%28num%3C10%29%3F%28%270%27+num%29%3Anum%3B%7D%2CgetFormattedDate%3Dfunction%28millis%29%7Bvar%20date%3Dnew%20Date%28millis%29%3Breturn%20months%5Bdate.getMonth%28%29%5D+%27%20%27+addLeadingZero%28date.getDate%28%29%29+%27%2C%20%27+date.getFullYear%28%29.toString%28%29%3B%7D%3B%24.getJSON%28%24queries.events%28%29%2Cfunction%28data%29%7Bif%28data.status%26%26data.status.match%28/%5E200/%29%3D%3Dnull%29%7Bconsole.log%28%22Error%20loading%20Meetups%20events%3A%20%22%2Cdata.status+%22%3A%20%22+data.details%29%3B%7Delse%7Bif%28data.results.length%3E0%29%7Bvar%20venueNameSortOrder%3D%5B%27Live%20Webcast%27%2C%27Webinar%27%2C%27Webcast%27%5D%3Bdata.results.sort%28function%28a%2Cb%29%7Bif%28a.time%3Eb.time%29%7Breturn%201%3B%7Dif%28a.time%3Cb.time%29%7Breturn-1%3B%7Dif%28a.time%3D%3D%3Db.time%29%7Bif%28a.venue%26%26a.venue.name%26%26b.venue%26%26b.venue.name%29%7Breturn%20venueNameSortOrder.indexOf%28a.venue.name%29-venueNameSortOrder.indexOf%28b.venue.name%29%3B%7Dreturn%200%3B%7Dreturn%200%3B%7D%29%3Bvar%20uniqueEventsByKey%3D%7B%7D%3Bfor%28var%20i%3D0%3Bi%3Cdata.results.length%3Bi++%29%7Bvar%20event%3Ddata.results%5Bi%5D%3Bconsole.log%28event%29%3Bvar%20venue%3Devent.venue%3Bvar%20city%3D%28venue%26%26venue.city%29%3Fvenue.city%3A%27TBD%27%3Bvar%20state_country%3D%28venue%29%3Fvenue.state%7C%7Cvenue.country%3A%27%27%3Bvar%20location%3D%28state_country%29%3Fcity+%22%2C%20%22+state_country.toUpperCase%28%29%3Acity%3Bevent.location%3Dlocation%3Bvar%20eventKey%3Devent.time%3Fevent.time%3Aevent.name%3Bif%28uniqueEventsByKey%5BeventKey%5D%29%7Bconsole.log%28%22DUPLICATE%20EVENT%20%28skipped%29%3A%20%22%2Cevent.event_url%2C%22%20matches%20previous%20event%20%22%2CuniqueEventsByKey%5BeventKey%5D.event_url%2C%22%20with%20date%3A%22%2CgetFormattedDate%28event.time%29%2C%22%20and%20name%20%22%2Cevent.name%29%3B%7Delse%7BuniqueEventsByKey%5BeventKey%5D%3Devent%3B%24%28%27.next-events%27%2Cctx%29.append%28%27%3Cp%3E%27+addLink%28getFormattedDate%28event.time%29+%22%20-%20%22+event.location%2Cevent.event_url%29+%22%20-%20%22+event.name+%22%3C/p%3E%22%29%3B%7D%7D%7D%7D%7D%29%3B%7D%29%3B"];
    jQuery("#1458176353510").append(unescape("%3Clink%20rel%3D%22stylesheet%22%20type%3D%22text/css%22%20href%3D%22https%3A//a248.e.akamai.net/secure.meetupstatic.com/style/widget.css%22/%3E%0A%0A%3C/head%3E%3Cdiv%20class%3D%22next-events%22%3E%3C/div%3E"));
    var mup_widget = {
      with_jquery: function(block) {
        block(jQuery, document.getElementById("1458176353510"));
      }
    };
    for (i in scripts) { eval(unescape(scripts[i])) }
  });
</script>



[Propose future meetups in one of the Apache Apex groups!](http://apache-apex.meetup.com/)