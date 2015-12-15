$( document ).ready( function() {
  $('#loaded').hide();
  window.location.hash = '#mainpge';
  console.log(getDIST);
  console.log("District = " + getDIST);
//  $.getJSON('/SchoolReportCards15/RC2015/getDistrict.php?term=' + getDIST, function(data){
  $.getJSON('RC2015/getDistrict.php?term=' + getDIST, function(data){
    var logID = data[0].schid;
    var logSCHOOL = data[0].facilityname;
    console.log("school = " + data[0].facilityname);

//Create the list of schools, with links

var schTXT = "";        
schTXT += '<h3>Schools in ' + getDIST + '<br><br><small>With PARCC results for the 2014-2015 school year.</small></h3>';
schTXT += '<p><strong>TIP: </strong>The list below is sortable. Click on a category name once, and the list will sort by that category in ascending order. Click it again and the list will sort in descending order. So, if you click the heading School, the list will sort in alphabetical order. Click School again and the list will sort in reverse alphabetical order.</p>';
$('#schoolsText').html(schTXT);

    var schLIST = "";
    schLIST += '<table id="distTABLE" class="table table-hover table-striped table-condensed">';
    schLIST += '<thead><tr><th>School</th><th class="text-right">Type</th><th class="text-right">% Met/Exceeds</th><th class="text-right">% Approaching</th><th class="text-right">Elem. PA-Index*</th><th class="text-right">H.S. PA-Index*</th></tr></thead><tbody>';

    $.each(data, function(i) {

    if( data[i].lowinc2015 != '--' ) { var lowinc = parseFloat(data[i].lowinc2015); } else { var lowinc = ''; };

    if( data[i].me2015school != '--' ) { var mesch = parseFloat(data[i].me2015school); } else { var mesch = ''; };

    if( data[i].me2015schAPP != '--' ) { var appsch = parseFloat(data[i].me2015schAPP); } else { var appsch = ''; };

    if( data[i].avgELEMz != '--' ) { var elemz = parseFloat(data[i].avgELEMz); } else { var elemz = ''; };

    if( data[i].avgHSz != '--' ) { var hsz = parseFloat(data[i].avgHSz); } else { var hsz = ''; };


    schLIST += '<tr><td class="text-nowrap"><a href="index.php?id-name=' + data[i].schid + '&schtype=' + data[i].schtype + '#mainpge">' + data[i].facilityname  + '</a></td><td class="text-right">' + data[i].schtype + '</td><td class="text-right">' + mesch + '</td><td class="text-right">' + appsch + '</td><td class="text-right">' + elemz + '</td><td class="text-right">' + hsz + '</td></tr>';
          });
    schLIST += '</tbody></table></p>';

var schNOTE = "";        

schNOTE += '<p class="Ppadding"><small><strong>*POVERTY-ACHIEVEMENT INDEX:</strong> The Daily Herald, in collaboration with WBEZ, examined percent meets/exceeds for public schools with similar percentages of low-income students. A school\'s index rank shows how much higher or lower their result is compared to the average for those similar schools.<br><strong>Most schools will rank between 1 and -1, with 0 (red line) being exactly average for schools in the same low-income range.</strong> For more details about our Poverty-Achievement Index, please <a href="http://reportcards.dailyherald.com/#mainpge" target="_blank">click here</a>.</small></p>';


$('#schoolsLIST').html(schLIST);
$('#distTABLE').DataTable();
$('#schoolsnote').html(schNOTE);


//________________________________________
// THIS IS THE SECTION WITH THE GENERAL INFO THAT SHOWS UP NO MATTER WHAT, AND THEN FIGURES OUT WHAT ELSE WILL SHOW UP


var schINFO = "";

schINFO += '<h2>' + getDIST + '</h2>';
schINFO += '<p><ul><li><strong>District type: </strong>' + data[0].districtTYPEdist + " serving grades " + data[0].gradesSERVEDdist + '</li>'; 
schINFO += '<li><strong>Administrator: </strong>' + data[0].AdministratorDIST + '</li>';
schINFO += '<li><strong>Address: </strong>' + data[0].AddressDIST + ", " + data[0].cityNAMEdist + ", IL " + data[0].ZipDIST + '</li>';
schINFO += '<li><strong>Phone: </strong>' + data[0].TelephoneDIST + '</li>';

if(data[0].NoteDIST != '- -'){ 
  schINFO += '<li><strong>Note: </strong>' + data[0].NoteDIST + '</li>';
};

schINFO += '</ul><small>Note: School and district information is as of September 2015.</small></p>';
schINFO += '<p><br><a href="#" onclick="window.open(' + "'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href)); " + 
    '">' + '<img src="images/fblogo.jpg" height="16" width="16">' + " Share" + '</a>' + " | " + '<a href="https://twitter.com/share" class="twitter-share-button" data-count="none">Tweet' +
  '</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?' +"'http':'https'" + ';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+' + "'://platform.twitter.com/widgets.js'" +
  ';fjs.parentNode.insertBefore(js,fjs);}}(document,' + " 'script', 'twitter-wjs');</script>" + '</p>';


$('#schoolinfo').html(schINFO);

//________________________________________
// THIS IS THE MAPPING SECTION


var mapLat = data[0].LatitudeDIST;
var mapLong = data[0].LongitudeDIST;
var mapTitle = data[0].districtNAMEdist;
var mapText =  data[0].AddressDIST + ", " + data[0].cityNAMEdist + ", IL " + data[0].ZipDIST;

function initialize() {
  var myLatlng = new google.maps.LatLng(mapLat,mapLong);
  var mapOptions = {
    zoom: 14,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  var map = new google.maps.Map(document.getElementById('schoolmap'), mapOptions);

  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h4 id="firstHeading" class="firstHeading">' + mapTitle + '</h4>'+
      '<div id="bodyContent">'+
      '<p>' + mapText + '</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 200
  });

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: mapText
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
};

initialize();
 
google.maps.visualRefresh = true;

//________________________________________
// This is the end
});

});