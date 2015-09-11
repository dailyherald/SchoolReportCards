$( document ).ready( function() {
  console.log(getID);
  if (getID == "") { 
    console.log("please choose a school");
  } else
  console.log(getID);
  $('#loaded').hide();
  $.getJSON('/SchoolReportCards/RC2014/getSchool14.php?term=' + getID, function(json){
    var logID = json[0].schid;
    var logSCHOOL = json[0].facilityname;
        console.log("school = " + json[0].facilityname);

//________________________________________
// THIS IS THE SECTION WITH THE GENERAL INFO THAT SHOWS UP NO MATTER WHAT, AND THEN FIGURES OUT WHAT ELSE WILL SHOW UP


  var schInfo = '';

  if(json[0].selective != '--'){
    schInfo += '<h2>' + json[0].facilityname + json[0].selective + '</h2>';
  } else {
    schInfo += '<h2>' + json[0].facilityname + '</h2>';
  };

  schInfo +='<p><ul><li><strong>District: </strong><a href="../schools/?COUNTYlist=no&schoolsAll=no&districtsAll=no&CITYlist=no&ISAT=no&PSAE=no&ACT=no&district-name=' + json[0].districtname + '">' + json[0].districtname + '</a></li><li><strong>School type: </strong>' + json[0].schooltype + ' serving grades ' + json[0].gradesserved + '</li><li><strong>Administrator: </strong>' + json[0].administrator + '</li><li><strong>Address: </strong>' + json[0].address + ', ' + json[0].city + ', IL ' + json[0].zip + '</li><li><strong>Phone: </strong>' + json[0].telephone + '</li><li><strong>Enrollment: </strong>' + json[0].enroll2014 + '</li>';

  if(json[0].note != '--'){
    schInfo += '<li><strong>Note: </strong>' + json[0].note + '</li>';
  };

  schInfo += '</ul>';

  if(json[0].selective != '--'){
    schInfo += '<small>Schools marked with an asterisk are those with a selective enrollment or involve some measure of choice, such as some magnet or charter schools.</small>';
  };

  schInfo += '</p>';

   schInfo += '<p><a href="#" onclick="window.open(' + "'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href)); " + '"><img src="images/fblogo.jpg" height="16" width="16">Share</a> | <a href="https://twitter.com/share" class="twitter-share-button" data-count="none">Tweet' + '</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?' + "'http':'https'" + ';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+' + "'://platform.twitter.com/widgets.js'" + ';fjs.parentNode.insertBefore(js,fjs);}}(document,' + " 'script', 'twitter-wjs');</script>" + '</p>';

  $('#schoolinfo').html( schInfo );		

//________________________________________
// THIS IS THE MAPPING SECTION
	 
	var mapLat = json[0].latitude;
	var mapLong = json[0].longitude;
	var mapTitle = json[0].facilityname;
	var mapText =  json[0].address + ", " + json[0].city + ", IL " + json[0].zip;
	
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
}

 initialize();
 
 google.maps.visualRefresh = true;


//________________________________________
// THIS FIGURES OUT WHAT ELSE WILL SHOW UP

				
if(json[0].mreadschool3all == '--' && json[0].mreadschool4all == '--' && json[0].mreadschool5all == '--' && json[0].mreadschool6all == '--' && json[0].mreadschool7all == '--' && json[0].mreadschool8all == '--' && json[0].mreadschool11all == '--' ){
  $('#message').removeClass('hidden');
  $('#pageControl').remove();
	$('#chartList').remove();
  $('#adpst1').remove();
  $('#demgroup').remove();
  $('#adpst2').remove();
	$('#financials').remove();
	$('#footnotes').remove();

  } else if(json[0].mreadschool3all == null && json[0].mreadschool4all == null && json[0].mreadschool5all == null && json[0].mreadschool6all == null && json[0].mreadschool7all == null && json[0].mreadschool8all == null && json[0].mreadschool11all == null ){
  $('#message').removeClass('hidden');
  $('#pageControl').remove();
  $('#chartList').remove();
  $('#adpst1').remove();
  $('#demgroup').remove();
  $('#adpst2').remove();
  $('#financials').remove();
  $('#footnotes').remove();

 } else if(json[0].schooltype == "CHARTER NET SCH" || json[0].schooltype == "CHARTER NET" ){
  $('#message').removeClass('hidden');
  $('#pageControl').remove();
  $('#chartList').remove();
  $('#adpst1').remove();
  $('#demgroup').remove();
  $('#adpst2').remove();
  $('#financials').remove();
  $('#footnotes').remove();

	} else {								
	$('#message').remove();
  $('#chartList').removeClass('hidden');
  $('#adpst1').removeClass('hidden');
  $('#demgroup').removeClass('hidden');
  $('#adpst2').removeClass('hidden');
  $('#financials').removeClass('hidden');


//________________________________________
// THIS IS THE SECTION FOR PAGE CONTROL

var pagenum = 1;

$("#demgroup, #financials, #adspt1, #adspt2").hide();

$("#page0").click(function () {
  if (pagenum >1){
    --pagenum;
    turnPage(pagenum);
    return false;
  } else {
    pagenum = 1;
    return false;
  };
});
$("#page1").click(function () {
  pagenum = 1;
  turnPage(pagenum);
  return false;
});
$("#page2").click(function () {
  pagenum = 2;
  turnPage(pagenum);
  return false;
});
$("#page3").click(function () {
  pagenum = 3;
  turnPage(pagenum);
  return false;
});
$("#page4").click(function () {
  pagenum = 4;
  turnPage(pagenum);
  return false;
});
$("#page5").click(function () {
  pagenum = 5;
  turnPage(pagenum);
  return false;
});
$("#page6").click(function () {
  if (pagenum < 5){
    ++pagenum;
    turnPage(pagenum);
    return false;
  } else {
    pagenum = 5;
    return false;
  };
});

function turnPage(numpage) {

  if(numpage == 1) {
    $("#lipage1, #lipage2, #lipage3, #lipage4, #lipage5").removeClass('active');
    $("#lipage1").addClass('active');
    $("#lipage0").addClass('disabled');
    $("#lipage6").removeClass('disabled');
    $("#adspt1, #demgroup, #adspt2, #financials").hide();
    $("#chartList").show();
  } else if(numpage == 2) {
    $("#lipage1, #lipage2, #lipage3, #lipage4, #lipage5").removeClass('active');
    $("#lipage2").addClass('active');
    $("#lipage0").removeClass('disabled');
    $("#lipage6").removeClass('disabled');
    $("#chartList, #demgroup, #adspt2, #financials").hide();
    $("#adspt1").removeClass('hidden');
    $("#adspt1").show();
  } else if(numpage == 3) {
    $("#lipage1, #lipage2, #lipage3, #lipage4, #lipage5").removeClass('active');
    $("#lipage3").addClass('active');
    $("#lipage0").removeClass('disabled');
    $("#lipage6").removeClass('disabled');
    $("#chartList, #adspt1, #adspt2, #financials").hide();
    $("#demgroup").show();
  } else if(numpage == 4) {
    $("#lipage1, #lipage2, #lipage3, #lipage4, #lipage5").removeClass('active');
    $("#lipage4").addClass('active');
    $("#lipage0").removeClass('disabled');
    $("#lipage6").removeClass('disabled');
    $("#chartList, #adspt1, #demgroup, #financials").hide();
    $("#adspt2").removeClass('hidden');
    $("#adspt2").show();
  } else if(numpage == 5) {
    $("#lipage1, #lipage2, #lipage3, #lipage4, #lipage5").removeClass('active');
    $("#lipage5").addClass('active');
    $("#lipage0").removeClass('disabled');
    $("#lipage6").addClass('disabled');
    $("#chartList, #adspt1, #demgroup, #adspt2").hide();
    $("#financials").show();
  } else {
    var junk = "junk";
  };
};

//____________________________________________________________________________________
//____________________________________________________________________________________
// THIS IS THE SECTION TEXT/TABLE PORTIONS

//________________________________________
// THIS IS THE SECTION FOR TABULAR CHARTS GOING INTO DETAIL ON M/E
  
    
// This is eleventh grade                       
      if(json[0].mreadschool11all != '--' || json[0].mmathschool11all != '--'){
          $('#moreTabs-11').show();
          $('ul li.list-11').show();
        $('#moreTabs-11a').html(
        '<p class="Ppadding"><strong>11th grade reading, math and science results</strong><br><img src="images/read.jpg" class="imgfloatL">&nbsp;&nbsp;<i>Tip: Click the subject name for more.</i></p>' + 
        '<table class="table table-hover table-striped table-condensed"><thead>' + 
        '<tr><th><strong> </strong></th><th class="text-center" colspan="2"><strong>SCHOOL</strong></th><th class="text-center" colspan="2"><strong>DISTRICT</strong></th><th class="text-center" colspan="2"><strong>STATE</strong></th></tr></thead>' + 
        '<tbody><tr><td><strong>Subject</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td></tr>' +  
        '<tr><td bgcolor="#e6ebef"><a id="11readSHOW" href="">Reading</a></td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadschool11all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].ereadschool11all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreaddist11all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereaddist11all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadstate11all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereadstate11all + '</td></tr>' + 
        '<tr class="11readSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].mreadschool11male + '</td><td class="text-right">' + json[0].ereadschool11male + '</td><td class="text-right">' + json[0].mreaddist11male + '</td><td class="text-right">' + json[0].ereaddist11male + '</td><td class="text-right">' + json[0].mreadstate11male + '</td><td class="text-right">' + json[0].ereadstate11male + '</td></tr>' + 
        '<tr class="11readSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].mreadschool11female + '</td><td class="text-right">' + json[0].ereadschool11female + '</td><td class="text-right">' + json[0].mreaddist11female + '</td><td class="text-right">' + json[0].ereaddist11female + '</td><td class="text-right">' + json[0].mreadstate11female + '</td><td class="text-right">' + json[0].ereadstate11female + '</td></tr>' + 
        '<tr class="11readSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].mreadschool11white + '</td><td class="text-right">' + json[0].ereadschool11white + '</td><td class="text-right">' + json[0].mreaddist11white + '</td><td class="text-right">' + json[0].ereaddist11white + '</td><td class="text-right">' + json[0].mreadstate11white + '</td><td class="text-right">' + json[0].ereadstate11white + '</td></tr>' + 
        '<tr class="11readSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].mreadschool11black + '</td><td class="text-right">' + json[0].ereadschool11black + '</td><td class="text-right">' + json[0].mreaddist11black + '</td><td class="text-right">' + json[0].ereaddist11black + '</td><td class="text-right">' + json[0].mreadstate11black + '</td><td class="text-right">' + json[0].ereadstate11black + '</td></tr>' + 
        '<tr class="11readSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].mreadschool11hisp + '</td><td class="text-right">' + json[0].ereadschool11hisp + '</td><td class="text-right">' + json[0].mreaddist11hisp + '</td><td class="text-right">' + json[0].ereaddist11hisp + '</td><td class="text-right">' + json[0].mreadstate11hisp + '</td><td class="text-right">' + json[0].ereadstate11hisp + '</td></tr>' + 
        '<tr class="11readSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].mreadschool11asian + '</td><td class="text-right">' + json[0].ereadschool11asian + '</td><td class="text-right">' + json[0].mreaddist11asian + '</td><td class="text-right">' + json[0].ereaddist11asian + '</td><td class="text-right">' + json[0].mreadstate11asian + '</td><td class="text-right">' + json[0].ereadstate11asian + '</td></tr>' + 
        '<tr class="11readSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].mreadschool11low + '</td><td class="text-right">' + json[0].ereadschool11low + '</td><td class="text-right">' + json[0].mreaddist11low + '</td><td class="text-right">' + json[0].ereaddist11low + '</td><td class="text-right">' + json[0].mreadstate11low + '</td><td class="text-right">' + json[0].ereadstate11low + '</td></tr>' +
        '<tr class="11readSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].mreadschool11lep + '</td><td class="text-right">' + json[0].ereadschool11lep + '</td><td class="text-right">' + json[0].mreaddist11lep + '</td><td class="text-right">' + json[0].ereaddist11lep + '</td><td class="text-right">' + json[0].mreadstate11lep  + '</td><td class="text-right">' + json[0].ereadstate11lep + '</td></tr>' +
        '<tr class="11readSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].mreadschool11iep + '</td><td class="text-right">' + json[0].ereadschool11iep + '</td><td class="text-right">' + json[0].mreaddist11iep + '</td><td class="text-right">' + json[0].ereaddist11iep + '</td><td class="text-right">' + json[0].mreadstate11iep + '</td><td class="text-right">' + json[0].ereadstate11iep + '</td></tr>' +     
        '<tr><td bgcolor="#e1e1e1"><a id="11mathSHOW" href="">Math</a></td><td class="text-right" bgcolor=#e1e1e1>' + json[0].mmathschool11all + '</td><td class="text-right" bgcolor=#e1e1e1>' + json[0].emathschool11all + '</td><td class="text-right" bgcolor=#e1e1e1>' + json[0].mmathdist11all + '</td><td class="text-right" bgcolor=#e1e1e1>' + json[0].emathdist11all + '</td><td class="text-right" bgcolor=#e1e1e1>' + json[0].mmathstate11all + '</td><td class="text-right" bgcolor=#e1e1e1>' + json[0].emathstate11all + '</td></tr>' + 
        '<tr class="11mathSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].mmathschool11male + '</td><td class="text-right">' + json[0].emathschool11male + '</td><td class="text-right">' + json[0].mmathdist11male + '</td><td class="text-right">' + json[0].emathdist11male + '</td><td class="text-right">' + json[0].mmathstate11male + '</td><td class="text-right">' + json[0].emathstate11male + '</td></tr>' + 
        '<tr class="11mathSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].mmathschool11female + '</td><td class="text-right">' + json[0].emathschool11female + '</td><td class="text-right">' + json[0].mmathdist11female + '</td><td class="text-right">' + json[0].emathdist11female + '</td><td class="text-right">' + json[0].mmathstate11female + '</td><td class="text-right">' + json[0].emathstate11female + '</td></tr>' + 
        '<tr class="11mathSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].mmathschool11white + '</td><td class="text-right">' + json[0].emathschool11white + '</td><td class="text-right">' + json[0].mmathdist11white + '</td><td class="text-right">' + json[0].emathdist11white + '</td><td class="text-right">' + json[0].mmathstate11white + '</td><td class="text-right">' + json[0].emathstate11white + '</td></tr>' + 
        '<tr class="11mathSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].mmathschool11black + '</td><td class="text-right">' + json[0].emathschool11black + '</td><td class="text-right">' + json[0].mmathdist11black + '</td><td class="text-right">' + json[0].emathdist11black + '</td><td class="text-right">' + json[0].mmathstate11black + '</td><td class="text-right">' + json[0].emathstate11black + '</td></tr>' + 
        '<tr class="11mathSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].mmathschool11hisp + '</td><td class="text-right">' + json[0].emathschool11hisp + '</td><td class="text-right">' + json[0].mmathdist11hisp + '</td><td class="text-right">' + json[0].emathdist11hisp + '</td><td class="text-right">' + json[0].mmathstate11hisp + '</td><td class="text-right">' + json[0].emathstate11hisp + '</td></tr>' + 
        '<tr class="11mathSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].mmathschool11asian + '</td><td class="text-right">' + json[0].emathschool11asian + '</td><td class="text-right">' + json[0].mmathdist11asian + '</td><td class="text-right">' + json[0].emathdist11asian + '</td><td class="text-right">' + json[0].mmathstate11asian + '</td><td class="text-right">' + json[0].emathstate11asian + '</td></tr>' + 
        '<tr class="11mathSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].mmathschool11low + '</td><td class="text-right">' + json[0].emathschool11low + '</td><td class="text-right">' + json[0].mmathdist11low + '</td><td class="text-right">' + json[0].emathdist11low + '</td><td class="text-right">' + json[0].mmathstate11low + '</td><td class="text-right">' + json[0].emathstate11low + '</td></tr>' +
        '<tr class="11mathSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].mmathschool11lep + '</td><td class="text-right">' + json[0].emathschool11lep + '</td><td class="text-right">' + json[0].mmathdist11lep + '</td><td class="text-right">' + json[0].emathdist11lep + '</td><td class="text-right">' + json[0].mmathstate11lep + '</td><td class="text-right">' + json[0].emathstate11lep + '</td></tr>' +
        '<tr class="11mathSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></td><td class="text-right">' + json[0].mmathschool11iep + '</td><td class="text-right">' + json[0].emathschool11iep + '</td><td class="text-right">' + json[0].mmathdist11iep + '</td><td class="text-right">' + json[0].emathdist11iep + '</td><td class="text-right">' + json[0].mmathstate11iep + '</td><td class="text-right">' + json[0].emathstate11iep + '</td></tr>' +     
        '<tr><td bgcolor="#e6ebef"><a id="11sciSHOW" href="">Science</a></td><td class="text-right" bgcolor="#e6ebef">' + json[0].mscischool11all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].escischool11all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mscidist11all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].escidist11all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mscistate11all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].escistate11all + '</td></tr>' + 
        '<tr class="11sciSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].mscischool11male + '</td><td class="text-right">' + json[0].escischool11male + '</td><td class="text-right">' + json[0].mscidist11male + '</td><td class="text-right">' + json[0].escidist11male + '</td><td class="text-right">' + json[0].mscistate11male + '</td><td class="text-right">' + json[0].escistate11male + '</td></tr>' + 
        '<tr class="11sciSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].mscischool11female + '</td><td class="text-right">' + json[0].escischool11female + '</td><td class="text-right">' + json[0].mscidist11female + '</td><td class="text-right">' + json[0].escidist11female + '</td><td class="text-right">' + json[0].mscistate11female + '</td><td class="text-right">' + json[0].escistate11female + '</td></tr>' + 
        '<tr class="11sciSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].mscischool11white + '</td><td class="text-right">' + json[0].escischool11white + '</td><td class="text-right">' + json[0].mscidist11white + '</td><td class="text-right">' + json[0].escidist11white + '</td><td class="text-right">' + json[0].mscistate11white + '</td><td class="text-right">' + json[0].escistate11white + '</td></tr>' + 
        '<tr class="11sciSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].mscischool11black + '</td><td class="text-right">' + json[0].escischool11black + '</td><td class="text-right">' + json[0].mscidist11black + '</td><td class="text-right">' + json[0].escidist11black + '</td><td class="text-right">' + json[0].mscistate11black + '</td><td class="text-right">' + json[0].escistate11black + '</td></tr>' + 
        '<tr class="11sciSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].mscischool11hisp + '</td><td class="text-right">' + + json[0].escischool11hisp + '</td><td class="text-right">' + json[0].mscidist11hisp + '</td><td class="text-right">' + json[0].escidist11hisp + '</td><td class="text-right">' + json[0].mscistate11hisp + '</td><td class="text-right">' + json[0].escistate11hisp + '</td></tr>' + 
        '<tr class="11sciSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].mscischool11asian + '</td><td class="text-right">' + json[0].escischool11asian + '</td><td class="text-right">' + json[0].mscidist11asian + '</td><td class="text-right">' + json[0].escidist11asian + '</td><td class="text-right">' + json[0].mscistate11asian + '</td><td class="text-right">' + json[0].escistate11asian + '</td></tr>' + 
        '<tr class="11sciSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].mscischool11low + '</td><td class="text-right">' + json[0].escischool11low + '</td><td class="text-right">' + json[0].mscidist11low + '</td><td class="text-right">' + json[0].escidist11low + '</td><td class="text-right">' + json[0].mscistate11low + '</td><td class="text-right">' + json[0].escistate11low + '</td></tr>' +
        '<tr class="11sciSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].mscischool11lep + '</td><td class="text-right">' + json[0].escischool11lep + '</td><td class="text-right">' + json[0].mscidist11lep + '</td><td class="text-right">' + json[0].escidist11lep + '</td><td class="text-right">' + json[0].mscistate11lep + '</td><td class="text-right">' + json[0].escistate11lep + '</td></tr>' +
        '<tr class="11sciSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></td><td class="text-right">' + json[0].mscischool11iep + '</td><td class="text-right">' + json[0].escischool11iep + '</td><td class="text-right">' + json[0].mscidist11iep + '</td><td class="text-right">' + json[0].escidist11iep + '</td><td class="text-right">' + json[0].mscistate11iep + '</td><td class="text-right">' + json[0].escistate11iep + '</td></tr>' +     
        '</tbody></table>'
        );
      } else {
        $('#moreTabs-11').remove();
        $('ul li.list-11').remove();
      };



// This is eighth grade             
        if(json[0].mreadschool8all != '--' || json[0].mmathschool8all != '--'){
            $('#moreTabs-8').show();
              $('ul li.list-8').show();
        $('#moreTabs-8a').html(
        '<p class="Ppadding"><strong>8th grade reading, math and science results</strong><br><img src="images/read.jpg" class="imgfloatL">&nbsp;&nbsp;<i>Tip: Click the subject name for more.</i></p>' + 
        '<table class="table table-hover table-striped table-condensed"><thead>' + 
        '<tr><th><strong> </strong></th><th class="text-center" colspan="2"><strong>SCHOOL</strong></th><th class="text-center" colspan="2"><strong>DISTRICT</strong></th><th class="text-center" colspan="2"><strong>STATE</strong></th></tr></thead>' + 
        '<tbody><tr><td><strong>Subject</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td></tr>' +  
        '<tr><td bgcolor="#e6ebef"><a id="8readSHOW" href="">Reading</a></td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadschool8all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].ereadschool8all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreaddist8all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereaddist8all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadstate8all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereadstate8all + '</td></tr>' + 
        '<tr class="8readSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].mreadschool8male + '</td><td class="text-right">' + json[0].ereadschool8male + '</td><td class="text-right">' + json[0].mreaddist8male + '</td><td class="text-right">' + json[0].ereaddist8male + '</td><td class="text-right">' + json[0].mreadstate8male + '</td><td class="text-right">' + json[0].ereadstate8male + '</td></tr>' + 
        '<tr class="8readSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].mreadschool8female + '</td><td class="text-right">' + json[0].ereadschool8female + '</td><td class="text-right">' + json[0].mreaddist8female + '</td><td class="text-right">' + json[0].ereaddist8female + '</td><td class="text-right">' + json[0].mreadstate8female + '</td><td class="text-right">' + json[0].ereadstate8female + '</td></tr>' + 
        '<tr class="8readSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].mreadschool8white + '</td><td class="text-right">' + json[0].ereadschool8white + '</td><td class="text-right">' + json[0].mreaddist8white + '</td><td class="text-right">' + json[0].ereaddist8white + '</td><td class="text-right">' + json[0].mreadstate8white + '</td><td class="text-right">' + json[0].ereadstate8white + '</td></tr>' + 
        '<tr class="8readSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].mreadschool8black + '</td><td class="text-right">' + json[0].ereadschool8black + '</td><td class="text-right">' + json[0].mreaddist8black + '</td><td class="text-right">' + json[0].ereaddist8black + '</td><td class="text-right">' + json[0].mreadstate8black + '</td><td class="text-right">' + json[0].ereadstate8black + '</td></tr>' + 
        '<tr class="8readSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].mreadschool8hisp + '</td><td class="text-right">' + json[0].ereadschool8hisp + '</td><td class="text-right">' + json[0].mreaddist8hisp + '</td><td class="text-right">' + json[0].ereaddist8hisp + '</td><td class="text-right">' + json[0].mreadstate8hisp + '</td><td class="text-right">' + json[0].ereadstate8hisp + '</td></tr>' + 
        '<tr class="8readSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].mreadschool8asian + '</td><td class="text-right">' + json[0].ereadschool8asian + '</td><td class="text-right">' + json[0].mreaddist8asian + '</td><td class="text-right">' + json[0].ereaddist8asian + '</td><td class="text-right">' + json[0].mreadstate8asian + '</td><td class="text-right">' + json[0].ereadstate8asian + '</td></tr>' + 
        '<tr class="8readSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].mreadschool8low + '</td><td class="text-right">' + json[0].ereadschool8low + '</td><td class="text-right">' + json[0].mreaddist8low + '</td><td class="text-right">' + json[0].ereaddist8low + '</td><td class="text-right">' + json[0].mreadstate8low + '</td><td class="text-right">' + json[0].ereadstate8low + '</td></tr>' +
        '<tr class="8readSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].mreadschool8lep + '</td><td class="text-right">' + json[0].ereadschool8lep + '</td><td class="text-right">' + json[0].mreaddist8lep + '</td><td class="text-right">' + json[0].ereaddist8lep + '</td><td class="text-right">' + json[0].mreadstate8lep  + '</td><td class="text-right">' + json[0].ereadstate8lep + '</td></tr>' +
        '<tr class="8readSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].mreadschool8iep + '</td><td class="text-right">' + json[0].ereadschool8iep + '</td><td class="text-right">' + json[0].mreaddist8iep + '</td><td class="text-right">' + json[0].ereaddist8iep + '</td><td class="text-right">' + json[0].mreadstate8iep + '</td><td class="text-right">' + json[0].ereadstate8iep + '</td></tr>' +     
        '<tr><td bgcolor="#e1e1e1"><a id="8mathSHOW" href="">Math</a></td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathschool8all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathschool8all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathdist8all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathdist8all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathstate8all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathstate8all + '</td></tr>' + 
        '<tr class="8mathSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].mmathschool8male + '</td><td class="text-right">' + json[0].emathschool8male + '</td><td class="text-right">' + json[0].mmathdist8male + '</td><td class="text-right">' + json[0].emathdist8male + '</td><td class="text-right">' + json[0].mmathstate8male + '</td><td class="text-right">' + json[0].emathstate8male + '</td></tr>' + 
        '<tr class="8mathSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].mmathschool8female + '</td><td class="text-right">' + json[0].emathschool8female + '</td><td class="text-right">' + json[0].mmathdist8female + '</td><td class="text-right">' + json[0].emathdist8female + '</td><td class="text-right">' + json[0].mmathstate8female + '</td><td class="text-right">' + json[0].emathstate8female + '</td></tr>' + 
        '<tr class="8mathSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].mmathschool8white + '</td><td class="text-right">' + json[0].emathschool8white + '</td><td class="text-right">' + json[0].mmathdist8white + '</td><td class="text-right">' + json[0].emathdist8white + '</td><td class="text-right">' + json[0].mmathstate8white + '</td><td class="text-right">' + json[0].emathstate8white + '</td></tr>' + 
        '<tr class="8mathSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].mmathschool8black + '</td><td class="text-right">' + json[0].emathschool8black + '</td><td class="text-right">' + json[0].mmathdist8black + '</td><td class="text-right">' + json[0].emathdist8black + '</td><td class="text-right">' + json[0].mmathstate8black + '</td><td class="text-right">' + json[0].emathstate8black + '</td></tr>' + 
        '<tr class="8mathSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].mmathschool8hisp + '</td><td class="text-right">' + json[0].emathschool8hisp + '</td><td class="text-right">' + json[0].mmathdist8hisp + '</td><td class="text-right">' + json[0].emathdist8hisp + '</td><td class="text-right">' + json[0].mmathstate8hisp + '</td><td class="text-right">' + json[0].emathstate8hisp + '</td></tr>' + 
        '<tr class="8mathSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].mmathschool8asian + '</td><td class="text-right">' + json[0].emathschool8asian + '</td><td class="text-right">' + json[0].mmathdist8asian + '</td><td class="text-right">' + json[0].emathdist8asian + '</td><td class="text-right">' + json[0].mmathstate8asian + '</td><td class="text-right">' + json[0].emathstate8asian + '</td></tr>' + 
        '<tr class="8mathSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].mmathschool8low + '</td><td class="text-right">' + json[0].emathschool8low + '</td><td class="text-right">' + json[0].mmathdist8low + '</td><td class="text-right">' + json[0].emathdist8low + '</td><td class="text-right">' + json[0].mmathstate8low + '</td><td class="text-right">' + json[0].emathstate8low + '</td></tr>' +
        '<tr class="8mathSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].mmathschool8lep + '</td><td class="text-right">' + json[0].emathschool8lep + '</td><td class="text-right">' + json[0].mmathdist8lep + '</td><td class="text-right">' + json[0].emathdist8lep + '</td><td class="text-right">' + json[0].mmathstate8lep + '</td><td class="text-right">' + json[0].emathstate8lep + '</td></tr>' +
        '<tr class="8mathSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></td><td class="text-right">' + json[0].mmathschool8iep + '</td><td class="text-right">' + json[0].emathschool8iep + '</td><td class="text-right">' + json[0].mmathdist8iep + '</td><td class="text-right">' + json[0].emathdist8iep + '</td><td class="text-right">' + json[0].mmathstate8iep + '</td><td class="text-right">' + json[0].emathstate8iep + '</td></tr>' +     
        '</tbody></table>'
        );
      } else {
        $('#moreTabs-8').remove();
        $('ul li.list-8').remove();
      };


// This is seventh grade              
        if(json[0].mreadschool7all != '--' || json[0].mmathschool7all != '--'){
          $('#moreTabs-7').show();
          $('ul li.list-7').show();
        $('#moreTabs-7a').html(
        '<p class="Ppadding"><strong>7th grade reading, math and science results</strong><br><img src="images/read.jpg" class="imgfloatL">&nbsp;&nbsp;<i>Tip: Click the subject name for more.</i></p>' + 
        '<table class="table table-hover table-striped table-condensed"><thead>' + 
        '<tr><th><strong> </strong></th><th class="text-center" colspan="2"><strong>SCHOOL</strong></th><th class="text-center" colspan="2"><strong>DISTRICT</strong></th><th class="text-center" colspan="2"><strong>STATE</strong></th></tr></thead>' + 
        '<tbody><tr><td><strong>Subject</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td></tr>' +  
        '<tr><td bgcolor="#e6ebef"><a id="7readSHOW" href="">Reading</a></td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadschool7all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].ereadschool7all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreaddist7all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereaddist7all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadstate7all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereadstate7all + '</td></tr>' + 
        '<tr class="7readSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].mreadschool7male + '</td><td class="text-right">' + json[0].ereadschool7male + '</td><td class="text-right">' + json[0].mreaddist7male + '</td><td class="text-right">' + json[0].ereaddist7male + '</td><td class="text-right">' + json[0].mreadstate7male + '</td><td class="text-right">' + json[0].ereadstate7male + '</td></tr>' + 
        '<tr class="7readSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].mreadschool7female + '</td><td class="text-right">' + json[0].ereadschool7female + '</td><td class="text-right">' + json[0].mreaddist7female + '</td><td class="text-right">' + json[0].ereaddist7female + '</td><td class="text-right">' + json[0].mreadstate7female + '</td><td class="text-right">' + json[0].ereadstate7female + '</td></tr>' + 
        '<tr class="7readSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].mreadschool7white + '</td><td class="text-right">' + json[0].ereadschool7white + '</td><td class="text-right">' + json[0].mreaddist7white + '</td><td class="text-right">' + json[0].ereaddist7white + '</td><td class="text-right">' + json[0].mreadstate7white + '</td><td class="text-right">' + json[0].ereadstate7white + '</td></tr>' + 
        '<tr class="7readSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].mreadschool7black + '</td><td class="text-right">' + json[0].ereadschool7black + '</td><td class="text-right">' + json[0].mreaddist7black + '</td><td class="text-right">' + json[0].ereaddist7black + '</td><td class="text-right">' + json[0].mreadstate7black + '</td><td class="text-right">' + json[0].ereadstate7black + '</td></tr>' + 
        '<tr class="7readSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].mreadschool7hisp + '</td><td class="text-right">' + json[0].ereadschool7hisp + '</td><td class="text-right">' + json[0].mreaddist7hisp + '</td><td class="text-right">' + json[0].ereaddist7hisp + '</td><td class="text-right">' + json[0].mreadstate7hisp + '</td><td class="text-right">' + json[0].ereadstate7hisp + '</td></tr>' + 
        '<tr class="7readSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].mreadschool7asian + '</td><td class="text-right">' + json[0].ereadschool7asian + '</td><td class="text-right">' + json[0].mreaddist7asian + '</td><td class="text-right">' + json[0].ereaddist7asian + '</td><td class="text-right">' + json[0].mreadstate7asian + '</td><td class="text-right">' + json[0].ereadstate7asian + '</td></tr>' + 
        '<tr class="7readSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].mreadschool7low + '</td><td class="text-right">' + json[0].ereadschool7low + '</td><td class="text-right">' + json[0].mreaddist7low + '</td><td class="text-right">' + json[0].ereaddist7low + '</td><td class="text-right">' + json[0].mreadstate7low + '</td><td class="text-right">' + json[0].ereadstate7low + '</td></tr>' +
        '<tr class="7readSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].mreadschool7lep + '</td><td class="text-right">' + json[0].ereadschool7lep + '</td><td class="text-right">' + json[0].mreaddist7lep + '</td><td class="text-right">' + json[0].ereaddist7lep + '</td><td class="text-right">' + json[0].mreadstate7lep  + '</td><td class="text-right">' + json[0].ereadstate7lep + '</td></tr>' +
        '<tr class="7readSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].mreadschool7iep + '</td><td class="text-right">' + json[0].ereadschool7iep + '</td><td class="text-right">' + json[0].mreaddist7iep + '</td><td class="text-right">' + json[0].ereaddist7iep + '</td><td class="text-right">' + json[0].mreadstate7iep + '</td><td class="text-right">' + json[0].ereadstate7iep + '</td></tr>' +     
        '<tr><td bgcolor="#e1e1e1"><a id="7mathSHOW" href="">Math</a></td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathschool7all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathschool7all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathdist7all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathdist7all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathstate7all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathstate7all + '</td></tr>' + 
        '<tr class="7mathSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].mmathschool7male + '</td><td class="text-right">' + json[0].emathschool7male + '</td><td class="text-right">' + json[0].mmathdist7male + '</td><td class="text-right">' + json[0].emathdist7male + '</td><td class="text-right">' + json[0].mmathstate7male + '</td><td class="text-right">' + json[0].emathstate7male + '</td></tr>' + 
        '<tr class="7mathSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].mmathschool7female + '</td><td class="text-right">' + json[0].emathschool7female + '</td><td class="text-right">' + json[0].mmathdist7female + '</td><td class="text-right">' + json[0].emathdist7female + '</td><td class="text-right">' + json[0].mmathstate7female + '</td><td class="text-right">' + json[0].emathstate7female + '</td></tr>' + 
        '<tr class="7mathSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].mmathschool7white + '</td><td class="text-right">' + json[0].emathschool7white + '</td><td class="text-right">' + json[0].mmathdist7white + '</td><td class="text-right">' + json[0].emathdist7white + '</td><td class="text-right">' + json[0].mmathstate7white + '</td><td class="text-right">' + json[0].emathstate7white + '</td></tr>' + 
        '<tr class="7mathSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].mmathschool7black + '</td><td class="text-right">' + json[0].emathschool7black + '</td><td class="text-right">' + json[0].mmathdist7black + '</td><td class="text-right">' + json[0].emathdist7black + '</td><td class="text-right">' + json[0].mmathstate7black + '</td><td class="text-right">' + json[0].emathstate7black + '</td></tr>' + 
        '<tr class="7mathSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].mmathschool7hisp + '</td><td class="text-right">' + json[0].emathschool7hisp + '</td><td class="text-right">' + json[0].mmathdist7hisp + '</td><td class="text-right">' + json[0].emathdist7hisp + '</td><td class="text-right">' + json[0].mmathstate7hisp + '</td><td class="text-right">' + json[0].emathstate7hisp + '</td></tr>' + 
        '<tr class="7mathSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].mmathschool7asian + '</td><td class="text-right">' + json[0].emathschool7asian + '</td><td class="text-right">' + json[0].mmathdist7asian + '</td><td class="text-right">' + json[0].emathdist7asian + '</td><td class="text-right">' + json[0].mmathstate7asian + '</td><td class="text-right">' + json[0].emathstate7asian + '</td></tr>' + 
        '<tr class="7mathSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].mmathschool7low + '</td><td class="text-right">' + json[0].emathschool7low + '</td><td class="text-right">' + json[0].mmathdist7low + '</td><td class="text-right">' + json[0].emathdist7low + '</td><td class="text-right">' + json[0].mmathstate7low + '</td><td class="text-right">' + json[0].emathstate7low + '</td></tr>' +
        '<tr class="7mathSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].mmathschool7lep + '</td><td class="text-right">' + json[0].emathschool7lep + '</td><td class="text-right">' + json[0].mmathdist7lep + '</td><td class="text-right">' + json[0].emathdist7lep + '</td><td class="text-right">' + json[0].mmathstate7lep + '</td><td class="text-right">' + json[0].emathstate7lep + '</td></tr>' +
        '<tr class="7mathSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></td><td class="text-right">' + json[0].mmathschool7iep + '</td><td class="text-right">' + json[0].emathschool7iep + '</td><td class="text-right">' + json[0].mmathdist7iep + '</td><td class="text-right">' + json[0].emathdist7iep + '</td><td class="text-right">' + json[0].mmathstate7iep + '</td><td class="text-right">' + json[0].emathstate7iep + '</td></tr>' +     
        '<tr><td bgcolor="#e6ebef"><a id="7sciSHOW" href="">Science</a></td><td class="text-right" bgcolor="#e6ebef">' + json[0].mscischool7all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].escischool7all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mscidist7all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].escidist7all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mscistate7all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].escistate7all + '</td></tr>' + 
        '<tr class="7sciSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].mscischool7male + '</td><td class="text-right">' + json[0].escischool7male + '</td><td class="text-right">' + json[0].mscidist7male + '</td><td class="text-right">' + json[0].escidist7male + '</td><td class="text-right">' + json[0].mscistate7male + '</td><td class="text-right">' + json[0].escistate7male + '</td></tr>' + 
        '<tr class="7sciSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].mscischool7female + '</td><td class="text-right">' + json[0].escischool7female + '</td><td class="text-right">' + json[0].mscidist7female + '</td><td class="text-right">' + json[0].escidist7female + '</td><td class="text-right">' + json[0].mscistate7female + '</td><td class="text-right">' + json[0].escistate7female + '</td></tr>' + 
        '<tr class="7sciSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].mscischool7white + '</td><td class="text-right">' + json[0].escischool7white + '</td><td class="text-right">' + json[0].mscidist7white + '</td><td class="text-right">' + json[0].escidist7white + '</td><td class="text-right">' + json[0].mscistate7white + '</td><td class="text-right">' + json[0].escistate7white + '</td></tr>' + 
        '<tr class="7sciSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].mscischool7black + '</td><td class="text-right">' + json[0].escischool7black + '</td><td class="text-right">' + json[0].mscidist7black + '</td><td class="text-right">' + json[0].escidist7black + '</td><td class="text-right">' + json[0].mscistate7black + '</td><td class="text-right">' + json[0].escistate7black + '</td></tr>' + 
        '<tr class="7sciSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].mscischool7hisp + '</td><td class="text-right">' + + json[0].escischool7hisp + '</td><td class="text-right">' + json[0].mscidist7hisp + '</td><td class="text-right">' + json[0].escidist7hisp + '</td><td class="text-right">' + json[0].mscistate7hisp + '</td><td class="text-right">' + json[0].escistate7hisp + '</td></tr>' + 
        '<tr class="7sciSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].mscischool7asian + '</td><td class="text-right">' + json[0].escischool7asian + '</td><td class="text-right">' + json[0].mscidist7asian + '</td><td class="text-right">' + json[0].escidist7asian + '</td><td class="text-right">' + json[0].mscistate7asian + '</td><td class="text-right">' + json[0].escistate7asian + '</td></tr>' + 
        '<tr class="7sciSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].mscischool7low + '</td><td class="text-right">' + json[0].escischool7low + '</td><td class="text-right">' + json[0].mscidist7low + '</td><td class="text-right">' + json[0].escidist7low + '</td><td class="text-right">' + json[0].mscistate7low + '</td><td class="text-right">' + json[0].escistate7low + '</td></tr>' +
        '<tr class="7sciSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].mscischool7lep + '</td><td class="text-right">' + json[0].escischool7lep + '</td><td class="text-right">' + json[0].mscidist7lep + '</td><td class="text-right">' + json[0].escidist7lep + '</td><td class="text-right">' + json[0].mscistate7lep + '</td><td class="text-right">' + json[0].escistate7lep + '</td></tr>' +
        '<tr class="7sciSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></td><td class="text-right">' + json[0].mscischool7iep + '</td><td class="text-right">' + json[0].escischool7iep + '</td><td class="text-right">' + json[0].mscidist7iep + '</td><td class="text-right">' + json[0].escidist7iep + '</td><td class="text-right">' + json[0].mscistate7iep + '</td><td class="text-right">' + json[0].escistate7iep + '</td></tr>' +     
        '</tbody></table>'
        );
      } else {
        $('#moreTabs-7').remove();
        $('ul li.list-7').remove();
      };

// This is sixth grade              
        if(json[0].mreadschool6all != '--' || json[0].mmathschool6all != '--'){
            $('#moreTabs-6').show();
              $('ul li.list-6').show();
        $('#moreTabs-6a').html(
        '<p class="Ppadding"><strong>6th grade reading, math and science results</strong><br><img src="images/read.jpg" class="imgfloatL">&nbsp;&nbsp;<i>Tip: Click the subject name for more.</i></p>' + 
        '<table class="table table-hover table-striped table-condensed"><thead>' + 
        '<tr><th><strong> </strong></th><th class="text-center" colspan="2"><strong>SCHOOL</strong></th><th class="text-center" colspan="2"><strong>DISTRICT</strong></th><th class="text-center" colspan="2"><strong>STATE</strong></th></tr></thead>' + 
        '<tbody><tr><td><strong>Subject</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td></tr>' +  
        '<tr><td bgcolor="#e6ebef"><a id="6readSHOW" href="">Reading</a></td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadschool6all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].ereadschool6all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreaddist6all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereaddist6all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadstate6all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereadstate6all + '</td></tr>' + 
        '<tr class="6readSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].mreadschool6male + '</td><td class="text-right">' + json[0].ereadschool6male + '</td><td class="text-right">' + json[0].mreaddist6male + '</td><td class="text-right">' + json[0].ereaddist6male + '</td><td class="text-right">' + json[0].mreadstate6male + '</td><td class="text-right">' + json[0].ereadstate6male + '</td></tr>' + 
        '<tr class="6readSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].mreadschool6female + '</td><td class="text-right">' + json[0].ereadschool6female + '</td><td class="text-right">' + json[0].mreaddist6female + '</td><td class="text-right">' + json[0].ereaddist6female + '</td><td class="text-right">' + json[0].mreadstate6female + '</td><td class="text-right">' + json[0].ereadstate6female + '</td></tr>' + 
        '<tr class="6readSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].mreadschool6white + '</td><td class="text-right">' + json[0].ereadschool6white + '</td><td class="text-right">' + json[0].mreaddist6white + '</td><td class="text-right">' + json[0].ereaddist6white + '</td><td class="text-right">' + json[0].mreadstate6white + '</td><td class="text-right">' + json[0].ereadstate6white + '</td></tr>' + 
        '<tr class="6readSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].mreadschool6black + '</td><td class="text-right">' + json[0].ereadschool6black + '</td><td class="text-right">' + json[0].mreaddist6black + '</td><td class="text-right">' + json[0].ereaddist6black + '</td><td class="text-right">' + json[0].mreadstate6black + '</td><td class="text-right">' + json[0].ereadstate6black + '</td></tr>' + 
        '<tr class="6readSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].mreadschool6hisp + '</td><td class="text-right">' + json[0].ereadschool6hisp + '</td><td class="text-right">' + json[0].mreaddist6hisp + '</td><td class="text-right">' + json[0].ereaddist6hisp + '</td><td class="text-right">' + json[0].mreadstate6hisp + '</td><td class="text-right">' + json[0].ereadstate6hisp + '</td></tr>' + 
        '<tr class="6readSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].mreadschool6asian + '</td><td class="text-right">' + json[0].ereadschool6asian + '</td><td class="text-right">' + json[0].mreaddist6asian + '</td><td class="text-right">' + json[0].ereaddist6asian + '</td><td class="text-right">' + json[0].mreadstate6asian + '</td><td class="text-right">' + json[0].ereadstate6asian + '</td></tr>' + 
        '<tr class="6readSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].mreadschool6low + '</td><td class="text-right">' + json[0].ereadschool6low + '</td><td class="text-right">' + json[0].mreaddist6low + '</td><td class="text-right">' + json[0].ereaddist6low + '</td><td class="text-right">' + json[0].mreadstate6low + '</td><td class="text-right">' + json[0].ereadstate6low + '</td></tr>' +
        '<tr class="6readSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].mreadschool6lep + '</td><td class="text-right">' + json[0].ereadschool6lep + '</td><td class="text-right">' + json[0].mreaddist6lep + '</td><td class="text-right">' + json[0].ereaddist6lep + '</td><td class="text-right">' + json[0].mreadstate6lep  + '</td><td class="text-right">' + json[0].ereadstate6lep + '</td></tr>' +
        '<tr class="6readSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].mreadschool6iep + '</td><td class="text-right">' + json[0].ereadschool6iep + '</td><td class="text-right">' + json[0].mreaddist6iep + '</td><td class="text-right">' + json[0].ereaddist6iep + '</td><td class="text-right">' + json[0].mreadstate6iep + '</td><td class="text-right">' + json[0].ereadstate6iep + '</td></tr>' +     
        '<tr><td bgcolor="#e1e1e1"><a id="6mathSHOW" href="">Math</a></td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathschool6all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathschool6all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathdist6all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathdist6all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathstate6all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathstate6all + '</td></tr>' + 
        '<tr class="6mathSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].mmathschool6male + '</td><td class="text-right">' + json[0].emathschool6male + '</td><td class="text-right">' + json[0].mmathdist6male + '</td><td class="text-right">' + json[0].emathdist6male + '</td><td class="text-right">' + json[0].mmathstate6male + '</td><td class="text-right">' + json[0].emathstate6male + '</td></tr>' + 
        '<tr class="6mathSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].mmathschool6female + '</td><td class="text-right">' + json[0].emathschool6female + '</td><td class="text-right">' + json[0].mmathdist6female + '</td><td class="text-right">' + json[0].emathdist6female + '</td><td class="text-right">' + json[0].mmathstate6female + '</td><td class="text-right">' + json[0].emathstate6female + '</td></tr>' + 
        '<tr class="6mathSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].mmathschool6white + '</td><td class="text-right">' + json[0].emathschool6white + '</td><td class="text-right">' + json[0].mmathdist6white + '</td><td class="text-right">' + json[0].emathdist6white + '</td><td class="text-right">' + json[0].mmathstate6white + '</td><td class="text-right">' + json[0].emathstate6white + '</td></tr>' + 
        '<tr class="6mathSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].mmathschool6black + '</td><td class="text-right">' + json[0].emathschool6black + '</td><td class="text-right">' + json[0].mmathdist6black + '</td><td class="text-right">' + json[0].emathdist6black + '</td><td class="text-right">' + json[0].mmathstate6black + '</td><td class="text-right">' + json[0].emathstate6black + '</td></tr>' + 
        '<tr class="6mathSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].mmathschool6hisp + '</td><td class="text-right">' + json[0].emathschool6hisp + '</td><td class="text-right">' + json[0].mmathdist6hisp + '</td><td class="text-right">' + json[0].emathdist6hisp + '</td><td class="text-right">' + json[0].mmathstate6hisp + '</td><td class="text-right">' + json[0].emathstate6hisp + '</td></tr>' + 
        '<tr class="6mathSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].mmathschool6asian + '</td><td class="text-right">' + json[0].emathschool6asian + '</td><td class="text-right">' + json[0].mmathdist6asian + '</td><td class="text-right">' + json[0].emathdist6asian + '</td><td class="text-right">' + json[0].mmathstate6asian + '</td><td class="text-right">' + json[0].emathstate6asian + '</td></tr>' + 
        '<tr class="6mathSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].mmathschool6low + '</td><td class="text-right">' + json[0].emathschool6low + '</td><td class="text-right">' + json[0].mmathdist6low + '</td><td class="text-right">' + json[0].emathdist6low + '</td><td class="text-right">' + json[0].mmathstate6low + '</td><td class="text-right">' + json[0].emathstate6low + '</td></tr>' +
        '<tr class="6mathSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].mmathschool6lep + '</td><td class="text-right">' + json[0].emathschool6lep + '</td><td class="text-right">' + json[0].mmathdist6lep + '</td><td class="text-right">' + json[0].emathdist6lep + '</td><td class="text-right">' + json[0].mmathstate6lep + '</td><td class="text-right">' + json[0].emathstate6lep + '</td></tr>' +
        '<tr class="6mathSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></td><td class="text-right">' + json[0].mmathschool6iep + '</td><td class="text-right">' + json[0].emathschool6iep + '</td><td class="text-right">' + json[0].mmathdist6iep + '</td><td class="text-right">' + json[0].emathdist6iep + '</td><td class="text-right">' + json[0].mmathstate6iep + '</td><td class="text-right">' + json[0].emathstate6iep + '</td></tr>' +     
        '</tbody></table>'
        );
      } else {
        $('#moreTabs-6').remove();
        $('ul li.list-6').remove();
      };


// This is fifth grade              
        if(json[0].mreadschool5all != '--' || json[0].mmathschool5all != '--'){
            $('#moreTabs-5').show();
              $('ul li.list-5').show();
        $('#moreTabs-5a').html(
        '<p class="Ppadding"><strong>5th grade reading, math and science results</strong><br><img src="images/read.jpg" class="imgfloatL">&nbsp;&nbsp;<i>Tip: Click the subject name for more.</i></p>' + 
        '<table class="table table-hover table-striped table-condensed"><thead>' + 
        '<tr><th><strong> </strong></th><th class="text-center" colspan="2"><strong>SCHOOL</strong></th><th class="text-center" colspan="2"><strong>DISTRICT</strong></th><th class="text-center" colspan="2"><strong>STATE</strong></th></tr></thead>' + 
        '<tbody><tr><td><strong>Subject</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td></tr>' +  
        '<tr><td bgcolor="#e6ebef"><a id="5readSHOW" href="">Reading</a></td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadschool5all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].ereadschool5all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreaddist5all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereaddist5all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadstate5all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereadstate5all + '</td></tr>' + 
        '<tr class="5readSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].mreadschool5male + '</td><td class="text-right">' + json[0].ereadschool5male + '</td><td class="text-right">' + json[0].mreaddist5male + '</td><td class="text-right">' + json[0].ereaddist5male + '</td><td class="text-right">' + json[0].mreadstate5male + '</td><td class="text-right">' + json[0].ereadstate5male + '</td></tr>' + 
        '<tr class="5readSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].mreadschool5female + '</td><td class="text-right">' + json[0].ereadschool5female + '</td><td class="text-right">' + json[0].mreaddist5female + '</td><td class="text-right">' + json[0].ereaddist5female + '</td><td class="text-right">' + json[0].mreadstate5female + '</td><td class="text-right">' + json[0].ereadstate5female + '</td></tr>' + 
        '<tr class="5readSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].mreadschool5white + '</td><td class="text-right">' + json[0].ereadschool5white + '</td><td class="text-right">' + json[0].mreaddist5white + '</td><td class="text-right">' + json[0].ereaddist5white + '</td><td class="text-right">' + json[0].mreadstate5white + '</td><td class="text-right">' + json[0].ereadstate5white + '</td></tr>' + 
        '<tr class="5readSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].mreadschool5black + '</td><td class="text-right">' + json[0].ereadschool5black + '</td><td class="text-right">' + json[0].mreaddist5black + '</td><td class="text-right">' + json[0].ereaddist5black + '</td><td class="text-right">' + json[0].mreadstate5black + '</td><td class="text-right">' + json[0].ereadstate5black + '</td></tr>' + 
        '<tr class="5readSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].mreadschool5hisp + '</td><td class="text-right">' + json[0].ereadschool5hisp + '</td><td class="text-right">' + json[0].mreaddist5hisp + '</td><td class="text-right">' + json[0].ereaddist5hisp + '</td><td class="text-right">' + json[0].mreadstate5hisp + '</td><td class="text-right">' + json[0].ereadstate5hisp + '</td></tr>' + 
        '<tr class="5readSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].mreadschool5asian + '</td><td class="text-right">' + json[0].ereadschool5asian + '</td><td class="text-right">' + json[0].mreaddist5asian + '</td><td class="text-right">' + json[0].ereaddist5asian + '</td><td class="text-right">' + json[0].mreadstate5asian + '</td><td class="text-right">' + json[0].ereadstate5asian + '</td></tr>' + 
        '<tr class="5readSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].mreadschool5low + '</td><td class="text-right">' + json[0].ereadschool5low + '</td><td class="text-right">' + json[0].mreaddist5low + '</td><td class="text-right">' + json[0].ereaddist5low + '</td><td class="text-right">' + json[0].mreadstate5low + '</td><td class="text-right">' + json[0].ereadstate5low + '</td></tr>' +
        '<tr class="5readSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].mreadschool5lep + '</td><td class="text-right">' + json[0].ereadschool5lep + '</td><td class="text-right">' + json[0].mreaddist5lep + '</td><td class="text-right">' + json[0].ereaddist5lep + '</td><td class="text-right">' + json[0].mreadstate5lep  + '</td><td class="text-right">' + json[0].ereadstate5lep + '</td></tr>' +
        '<tr class="5readSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].mreadschool5iep + '</td><td class="text-right">' + json[0].ereadschool5iep + '</td><td class="text-right">' + json[0].mreaddist5iep + '</td><td class="text-right">' + json[0].ereaddist5iep + '</td><td class="text-right">' + json[0].mreadstate5iep + '</td><td class="text-right">' + json[0].ereadstate5iep + '</td></tr>' +     
        '<tr><td bgcolor="#e1e1e1"><a id="5mathSHOW" href="">Math</a></td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathschool5all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathschool5all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathdist5all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathdist5all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathstate5all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathstate5all + '</td></tr>' + 
        '<tr class="5mathSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].mmathschool5male + '</td><td class="text-right">' + json[0].emathschool5male + '</td><td class="text-right">' + json[0].mmathdist5male + '</td><td class="text-right">' + json[0].emathdist5male + '</td><td class="text-right">' + json[0].mmathstate5male + '</td><td class="text-right">' + json[0].emathstate5male + '</td></tr>' + 
        '<tr class="5mathSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].mmathschool5female + '</td><td class="text-right">' + json[0].emathschool5female + '</td><td class="text-right">' + json[0].mmathdist5female + '</td><td class="text-right">' + json[0].emathdist5female + '</td><td class="text-right">' + json[0].mmathstate5female + '</td><td class="text-right">' + json[0].emathstate5female + '</td></tr>' + 
        '<tr class="5mathSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].mmathschool5white + '</td><td class="text-right">' + json[0].emathschool5white + '</td><td class="text-right">' + json[0].mmathdist5white + '</td><td class="text-right">' + json[0].emathdist5white + '</td><td class="text-right">' + json[0].mmathstate5white + '</td><td class="text-right">' + json[0].emathstate5white + '</td></tr>' + 
        '<tr class="5mathSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].mmathschool5black + '</td><td class="text-right">' + json[0].emathschool5black + '</td><td class="text-right">' + json[0].mmathdist5black + '</td><td class="text-right">' + json[0].emathdist5black + '</td><td class="text-right">' + json[0].mmathstate5black + '</td><td class="text-right">' + json[0].emathstate5black + '</td></tr>' + 
        '<tr class="5mathSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].mmathschool5hisp + '</td><td class="text-right">' + json[0].emathschool5hisp + '</td><td class="text-right">' + json[0].mmathdist5hisp + '</td><td class="text-right">' + json[0].emathdist5hisp + '</td><td class="text-right">' + json[0].mmathstate5hisp + '</td><td class="text-right">' + json[0].emathstate5hisp + '</td></tr>' + 
        '<tr class="5mathSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].mmathschool5asian + '</td><td class="text-right">' + json[0].emathschool5asian + '</td><td class="text-right">' + json[0].mmathdist5asian + '</td><td class="text-right">' + json[0].emathdist5asian + '</td><td class="text-right">' + json[0].mmathstate5asian + '</td><td class="text-right">' + json[0].emathstate5asian + '</td></tr>' + 
        '<tr class="5mathSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].mmathschool5low + '</td><td class="text-right">' + json[0].emathschool5low + '</td><td class="text-right">' + json[0].mmathdist5low + '</td><td class="text-right">' + json[0].emathdist5low + '</td><td class="text-right">' + json[0].mmathstate5low + '</td><td class="text-right">' + json[0].emathstate5low + '</td></tr>' +
        '<tr class="5mathSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].mmathschool5lep + '</td><td class="text-right">' + json[0].emathschool5lep + '</td><td class="text-right">' + json[0].mmathdist5lep + '</td><td class="text-right">' + json[0].emathdist5lep + '</td><td class="text-right">' + json[0].mmathstate5lep + '</td><td class="text-right">' + json[0].emathstate5lep + '</td></tr>' +
        '<tr class="5mathSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></td><td class="text-right">' + json[0].mmathschool5iep + '</td><td class="text-right">' + json[0].emathschool5iep + '</td><td class="text-right">' + json[0].mmathdist5iep + '</td><td class="text-right">' + json[0].emathdist5iep + '</td><td class="text-right">' + json[0].mmathstate5iep + '</td><td class="text-right">' + json[0].emathstate5iep + '</td></tr>' +     
        '</tbody></table>'
        );
      } else {
        $('#moreTabs-5').remove();
        $('ul li.list-5').remove();
      };


// This is fourth grade             
        if(json[0].mreadschool4all != '--' || json[0].mmathschool4all != '--'){
          $('#moreTabs-4').show();
          $('ul li.list-4').show();
        $('#moreTabs-4a').html(
        '<p class="Ppadding"><strong>4th grade reading, math and science results</strong><br><img src="images/read.jpg" class="imgfloatL">&nbsp;&nbsp;<i>Tip: Click the subject name for more.</i></p>' + 
        '<table class="table table-hover table-striped table-condensed"><thead>' + 
        '<tr><th><strong> </strong></th><th class="text-center" colspan="2"><strong>SCHOOL</strong></th><th class="text-center" colspan="2"><strong>DISTRICT</strong></th><th class="text-center" colspan="2"><strong>STATE</strong></th></tr></thead>' + 
        '<tbody><tr><td><strong>Subject</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td></tr>' +  
        '<tr><td bgcolor="#e6ebef"><a id="4readSHOW" href="">Reading</a></td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadschool4all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].ereadschool4all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreaddist4all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereaddist4all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadstate4all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereadstate4all + '</td></tr>' + 
        '<tr class="4readSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].mreadschool4male + '</td><td class="text-right">' + json[0].ereadschool4male + '</td><td class="text-right">' + json[0].mreaddist4male + '</td><td class="text-right">' + json[0].ereaddist4male + '</td><td class="text-right">' + json[0].mreadstate4male + '</td><td class="text-right">' + json[0].ereadstate4male + '</td></tr>' + 
        '<tr class="4readSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].mreadschool4female + '</td><td class="text-right">' + json[0].ereadschool4female + '</td><td class="text-right">' + json[0].mreaddist4female + '</td><td class="text-right">' + json[0].ereaddist4female + '</td><td class="text-right">' + json[0].mreadstate4female + '</td><td class="text-right">' + json[0].ereadstate4female + '</td></tr>' + 
        '<tr class="4readSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].mreadschool4white + '</td><td class="text-right">' + json[0].ereadschool4white + '</td><td class="text-right">' + json[0].mreaddist4white + '</td><td class="text-right">' + json[0].ereaddist4white + '</td><td class="text-right">' + json[0].mreadstate4white + '</td><td class="text-right">' + json[0].ereadstate4white + '</td></tr>' + 
        '<tr class="4readSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].mreadschool4black + '</td><td class="text-right">' + json[0].ereadschool4black + '</td><td class="text-right">' + json[0].mreaddist4black + '</td><td class="text-right">' + json[0].ereaddist4black + '</td><td class="text-right">' + json[0].mreadstate4black + '</td><td class="text-right">' + json[0].ereadstate4black + '</td></tr>' + 
        '<tr class="4readSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].mreadschool4hisp + '</td><td class="text-right">' + json[0].ereadschool4hisp + '</td><td class="text-right">' + json[0].mreaddist4hisp + '</td><td class="text-right">' + json[0].ereaddist4hisp + '</td><td class="text-right">' + json[0].mreadstate4hisp + '</td><td class="text-right">' + json[0].ereadstate4hisp + '</td></tr>' + 
        '<tr class="4readSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].mreadschool4asian + '</td><td class="text-right">' + json[0].ereadschool4asian + '</td><td class="text-right">' + json[0].mreaddist4asian + '</td><td class="text-right">' + json[0].ereaddist4asian + '</td><td class="text-right">' + json[0].mreadstate4asian + '</td><td class="text-right">' + json[0].ereadstate4asian + '</td></tr>' + 
        '<tr class="4readSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].mreadschool4low + '</td><td class="text-right">' + json[0].ereadschool4low + '</td><td class="text-right">' + json[0].mreaddist4low + '</td><td class="text-right">' + json[0].ereaddist4low + '</td><td class="text-right">' + json[0].mreadstate4low + '</td><td class="text-right">' + json[0].ereadstate4low + '</td></tr>' +
        '<tr class="4readSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].mreadschool4lep + '</td><td class="text-right">' + json[0].ereadschool4lep + '</td><td class="text-right">' + json[0].mreaddist4lep + '</td><td class="text-right">' + json[0].ereaddist4lep + '</td><td class="text-right">' + json[0].mreadstate4lep  + '</td><td class="text-right">' + json[0].ereadstate4lep + '</td></tr>' +
        '<tr class="4readSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].mreadschool4iep + '</td><td class="text-right">' + json[0].ereadschool4iep + '</td><td class="text-right">' + json[0].mreaddist4iep + '</td><td class="text-right">' + json[0].ereaddist4iep + '</td><td class="text-right">' + json[0].mreadstate4iep + '</td><td class="text-right">' + json[0].ereadstate4iep + '</td></tr>' +     
        '<tr><td bgcolor="#e1e1e1"><a id="4mathSHOW" href="">Math</a></td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathschool4all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathschool4all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathdist4all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathdist4all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathstate4all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathstate4all + '</td></tr>' + 
        '<tr class="4mathSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].mmathschool4male + '</td><td class="text-right">' + json[0].emathschool4male + '</td><td class="text-right">' + json[0].mmathdist4male + '</td><td class="text-right">' + json[0].emathdist4male + '</td><td class="text-right">' + json[0].mmathstate4male + '</td><td class="text-right">' + json[0].emathstate4male + '</td></tr>' + 
        '<tr class="4mathSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].mmathschool4female + '</td><td class="text-right">' + json[0].emathschool4female + '</td><td class="text-right">' + json[0].mmathdist4female + '</td><td class="text-right">' + json[0].emathdist4female + '</td><td class="text-right">' + json[0].mmathstate4female + '</td><td class="text-right">' + json[0].emathstate4female + '</td></tr>' + 
        '<tr class="4mathSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].mmathschool4white + '</td><td class="text-right">' + json[0].emathschool4white + '</td><td class="text-right">' + json[0].mmathdist4white + '</td><td class="text-right">' + json[0].emathdist4white + '</td><td class="text-right">' + json[0].mmathstate4white + '</td><td class="text-right">' + json[0].emathstate4white + '</td></tr>' + 
        '<tr class="4mathSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].mmathschool4black + '</td><td class="text-right">' + json[0].emathschool4black + '</td><td class="text-right">' + json[0].mmathdist4black + '</td><td class="text-right">' + json[0].emathdist4black + '</td><td class="text-right">' + json[0].mmathstate4black + '</td><td class="text-right">' + json[0].emathstate4black + '</td></tr>' + 
        '<tr class="4mathSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].mmathschool4hisp + '</td><td class="text-right">' + json[0].emathschool4hisp + '</td><td class="text-right">' + json[0].mmathdist4hisp + '</td><td class="text-right">' + json[0].emathdist4hisp + '</td><td class="text-right">' + json[0].mmathstate4hisp + '</td><td class="text-right">' + json[0].emathstate4hisp + '</td></tr>' + 
        '<tr class="4mathSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].mmathschool4asian + '</td><td class="text-right">' + json[0].emathschool4asian + '</td><td class="text-right">' + json[0].mmathdist4asian + '</td><td class="text-right">' + json[0].emathdist4asian + '</td><td class="text-right">' + json[0].mmathstate4asian + '</td><td class="text-right">' + json[0].emathstate4asian + '</td></tr>' + 
        '<tr class="4mathSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].mmathschool4low + '</td><td class="text-right">' + json[0].emathschool4low + '</td><td class="text-right">' + json[0].mmathdist4low + '</td><td class="text-right">' + json[0].emathdist4low + '</td><td class="text-right">' + json[0].mmathstate4low + '</td><td class="text-right">' + json[0].emathstate4low + '</td></tr>' +
        '<tr class="4mathSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].mmathschool4lep + '</td><td class="text-right">' + json[0].emathschool4lep + '</td><td class="text-right">' + json[0].mmathdist4lep + '</td><td class="text-right">' + json[0].emathdist4lep + '</td><td class="text-right">' + json[0].mmathstate4lep + '</td><td class="text-right">' + json[0].emathstate4lep + '</td></tr>' +
        '<tr class="4mathSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></td><td class="text-right">' + json[0].mmathschool4iep + '</td><td class="text-right">' + json[0].emathschool4iep + '</td><td class="text-right">' + json[0].mmathdist4iep + '</td><td class="text-right">' + json[0].emathdist4iep + '</td><td class="text-right">' + json[0].mmathstate4iep + '</td><td class="text-right">' + json[0].emathstate4iep + '</td></tr>' +     
        '<tr><td bgcolor="#e6ebef"><a id="4sciSHOW" href="">Science</a></td><td class="text-right" bgcolor="#e6ebef">' + json[0].mscischool4all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].escischool4all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mscidist4all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].escidist4all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mscistate4all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].escistate4all + '</td></tr>' + 
        '<tr class="4sciSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].mscischool4male + '</td><td class="text-right">' + json[0].escischool4male + '</td><td class="text-right">' + json[0].mscidist4male + '</td><td class="text-right">' + json[0].escidist4male + '</td><td class="text-right">' + json[0].mscistate4male + '</td><td class="text-right">' + json[0].escistate4male + '</td></tr>' + 
        '<tr class="4sciSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].mscischool4female + '</td><td class="text-right">' + json[0].escischool4female + '</td><td class="text-right">' + json[0].mscidist4female + '</td><td class="text-right">' + json[0].escidist4female + '</td><td class="text-right">' + json[0].mscistate4female + '</td><td class="text-right">' + json[0].escistate4female + '</td></tr>' + 
        '<tr class="4sciSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].mscischool4white + '</td><td class="text-right">' + json[0].escischool4white + '</td><td class="text-right">' + json[0].mscidist4white + '</td><td class="text-right">' + json[0].escidist4white + '</td><td class="text-right">' + json[0].mscistate4white + '</td><td class="text-right">' + json[0].escistate4white + '</td></tr>' + 
        '<tr class="4sciSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].mscischool4black + '</td><td class="text-right">' + json[0].escischool4black + '</td><td class="text-right">' + json[0].mscidist4black + '</td><td class="text-right">' + json[0].escidist4black + '</td><td class="text-right">' + json[0].mscistate4black + '</td><td class="text-right">' + json[0].escistate4black + '</td></tr>' + 
        '<tr class="4sciSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].mscischool4hisp + '</td><td class="text-right">' + + json[0].escischool4hisp + '</td><td class="text-right">' + json[0].mscidist4hisp + '</td><td class="text-right">' + json[0].escidist4hisp + '</td><td class="text-right">' + json[0].mscistate4hisp + '</td><td class="text-right">' + json[0].escistate4hisp + '</td></tr>' + 
        '<tr class="4sciSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].mscischool4asian + '</td><td class="text-right">' + json[0].escischool4asian + '</td><td class="text-right">' + json[0].mscidist4asian + '</td><td class="text-right">' + json[0].escidist4asian + '</td><td class="text-right">' + json[0].mscistate4asian + '</td><td class="text-right">' + json[0].escistate4asian + '</td></tr>' + 
        '<tr class="4sciSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].mscischool4low + '</td><td class="text-right">' + json[0].escischool4low + '</td><td class="text-right">' + json[0].mscidist4low + '</td><td class="text-right">' + json[0].escidist4low + '</td><td class="text-right">' + json[0].mscistate4low + '</td><td class="text-right">' + json[0].escistate4low + '</td></tr>' +
        '<tr class="4sciSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].mscischool4lep + '</td><td class="text-right">' + json[0].escischool4lep + '</td><td class="text-right">' + json[0].mscidist4lep + '</td><td class="text-right">' + json[0].escidist4lep + '</td><td class="text-right">' + json[0].mscistate4lep + '</td><td class="text-right">' + json[0].escistate4lep + '</td></tr>' +
        '<tr class="4sciSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></td><td class="text-right">' + json[0].mscischool4iep + '</td><td class="text-right">' + json[0].escischool4iep + '</td><td class="text-right">' + json[0].mscidist4iep + '</td><td class="text-right">' + json[0].escidist4iep + '</td><td class="text-right">' + json[0].mscistate4iep + '</td><td class="text-right">' + json[0].escistate4iep + '</td></tr>' +     
        '</tbody></table>'
        );
      } else {
        $('#moreTabs-4').remove();
        $('ul li.list-4').remove();
      };


// This is third grade              
        if(json[0].mreadschool3all != '--' || json[0].mmathschool3all != '--'){
            $('#moreTabs-3').show();
              $('ul li.list-3').show();
        $('#moreTabs-3a').html(
        '<p class="Ppadding"><strong>3th grade reading, math and science results</strong><br><img src="images/read.jpg" class="imgfloatL">&nbsp;&nbsp;<i>Tip: Click the subject name for more.</i></p>' + 
        '<table class="table table-hover table-striped table-condensed"><thead>' + 
        '<tr><th><strong> </strong></th><th class="text-center" colspan="2"><strong>SCHOOL</strong></th><th class="text-center" colspan="2"><strong>DISTRICT</strong></th><th class="text-center" colspan="2"><strong>STATE</strong></th></tr></thead>' + 
        '<tbody><tr><td><strong>Subject</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td></tr>' +  
        '<tr><td bgcolor="#e6ebef"><a id="3readSHOW" href="">Reading</a></td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadschool3all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].ereadschool3all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreaddist3all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereaddist3all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadstate3all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereadstate3all + '</td></tr>' + 
        '<tr class="3readSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].mreadschool3male + '</td><td class="text-right">' + json[0].ereadschool3male + '</td><td class="text-right">' + json[0].mreaddist3male + '</td><td class="text-right">' + json[0].ereaddist3male + '</td><td class="text-right">' + json[0].mreadstate3male + '</td><td class="text-right">' + json[0].ereadstate3male + '</td></tr>' + 
        '<tr class="3readSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].mreadschool3female + '</td><td class="text-right">' + json[0].ereadschool3female + '</td><td class="text-right">' + json[0].mreaddist3female + '</td><td class="text-right">' + json[0].ereaddist3female + '</td><td class="text-right">' + json[0].mreadstate3female + '</td><td class="text-right">' + json[0].ereadstate3female + '</td></tr>' + 
        '<tr class="3readSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].mreadschool3white + '</td><td class="text-right">' + json[0].ereadschool3white + '</td><td class="text-right">' + json[0].mreaddist3white + '</td><td class="text-right">' + json[0].ereaddist3white + '</td><td class="text-right">' + json[0].mreadstate3white + '</td><td class="text-right">' + json[0].ereadstate3white + '</td></tr>' + 
        '<tr class="3readSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].mreadschool3black + '</td><td class="text-right">' + json[0].ereadschool3black + '</td><td class="text-right">' + json[0].mreaddist3black + '</td><td class="text-right">' + json[0].ereaddist3black + '</td><td class="text-right">' + json[0].mreadstate3black + '</td><td class="text-right">' + json[0].ereadstate3black + '</td></tr>' + 
        '<tr class="3readSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].mreadschool3hisp + '</td><td class="text-right">' + json[0].ereadschool3hisp + '</td><td class="text-right">' + json[0].mreaddist3hisp + '</td><td class="text-right">' + json[0].ereaddist3hisp + '</td><td class="text-right">' + json[0].mreadstate3hisp + '</td><td class="text-right">' + json[0].ereadstate3hisp + '</td></tr>' + 
        '<tr class="3readSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].mreadschool3asian + '</td><td class="text-right">' + json[0].ereadschool3asian + '</td><td class="text-right">' + json[0].mreaddist3asian + '</td><td class="text-right">' + json[0].ereaddist3asian + '</td><td class="text-right">' + json[0].mreadstate3asian + '</td><td class="text-right">' + json[0].ereadstate3asian + '</td></tr>' + 
        '<tr class="3readSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].mreadschool3low + '</td><td class="text-right">' + json[0].ereadschool3low + '</td><td class="text-right">' + json[0].mreaddist3low + '</td><td class="text-right">' + json[0].ereaddist3low + '</td><td class="text-right">' + json[0].mreadstate3low + '</td><td class="text-right">' + json[0].ereadstate3low + '</td></tr>' +
        '<tr class="3readSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].mreadschool3lep + '</td><td class="text-right">' + json[0].ereadschool3lep + '</td><td class="text-right">' + json[0].mreaddist3lep + '</td><td class="text-right">' + json[0].ereaddist3lep + '</td><td class="text-right">' + json[0].mreadstate3lep  + '</td><td class="text-right">' + json[0].ereadstate3lep + '</td></tr>' +
        '<tr class="3readSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].mreadschool3iep + '</td><td class="text-right">' + json[0].ereadschool3iep + '</td><td class="text-right">' + json[0].mreaddist3iep + '</td><td class="text-right">' + json[0].ereaddist3iep + '</td><td class="text-right">' + json[0].mreadstate3iep + '</td><td class="text-right">' + json[0].ereadstate3iep + '</td></tr>' +     
        '<tr><td bgcolor="#e1e1e1"><a id="3mathSHOW" href="">Math</a></td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathschool3all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathschool3all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathdist3all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathdist3all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathstate3all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathstate3all + '</td></tr>' + 
        '<tr class="3mathSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].mmathschool3male + '</td><td class="text-right">' + json[0].emathschool3male + '</td><td class="text-right">' + json[0].mmathdist3male + '</td><td class="text-right">' + json[0].emathdist3male + '</td><td class="text-right">' + json[0].mmathstate3male + '</td><td class="text-right">' + json[0].emathstate3male + '</td></tr>' + 
        '<tr class="3mathSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].mmathschool3female + '</td><td class="text-right">' + json[0].emathschool3female + '</td><td class="text-right">' + json[0].mmathdist3female + '</td><td class="text-right">' + json[0].emathdist3female + '</td><td class="text-right">' + json[0].mmathstate3female + '</td><td class="text-right">' + json[0].emathstate3female + '</td></tr>' + 
        '<tr class="3mathSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].mmathschool3white + '</td><td class="text-right">' + json[0].emathschool3white + '</td><td class="text-right">' + json[0].mmathdist3white + '</td><td class="text-right">' + json[0].emathdist3white + '</td><td class="text-right">' + json[0].mmathstate3white + '</td><td class="text-right">' + json[0].emathstate3white + '</td></tr>' + 
        '<tr class="3mathSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].mmathschool3black + '</td><td class="text-right">' + json[0].emathschool3black + '</td><td class="text-right">' + json[0].mmathdist3black + '</td><td class="text-right">' + json[0].emathdist3black + '</td><td class="text-right">' + json[0].mmathstate3black + '</td><td class="text-right">' + json[0].emathstate3black + '</td></tr>' + 
        '<tr class="3mathSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].mmathschool3hisp + '</td><td class="text-right">' + json[0].emathschool3hisp + '</td><td class="text-right">' + json[0].mmathdist3hisp + '</td><td class="text-right">' + json[0].emathdist3hisp + '</td><td class="text-right">' + json[0].mmathstate3hisp + '</td><td class="text-right">' + json[0].emathstate3hisp + '</td></tr>' + 
        '<tr class="3mathSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].mmathschool3asian + '</td><td class="text-right">' + json[0].emathschool3asian + '</td><td class="text-right">' + json[0].mmathdist3asian + '</td><td class="text-right">' + json[0].emathdist3asian + '</td><td class="text-right">' + json[0].mmathstate3asian + '</td><td class="text-right">' + json[0].emathstate3asian + '</td></tr>' + 
        '<tr class="3mathSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].mmathschool3low + '</td><td class="text-right">' + json[0].emathschool3low + '</td><td class="text-right">' + json[0].mmathdist3low + '</td><td class="text-right">' + json[0].emathdist3low + '</td><td class="text-right">' + json[0].mmathstate3low + '</td><td class="text-right">' + json[0].emathstate3low + '</td></tr>' +
        '<tr class="3mathSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].mmathschool3lep + '</td><td class="text-right">' + json[0].emathschool3lep + '</td><td class="text-right">' + json[0].mmathdist3lep + '</td><td class="text-right">' + json[0].emathdist3lep + '</td><td class="text-right">' + json[0].mmathstate3lep + '</td><td class="text-right">' + json[0].emathstate3lep + '</td></tr>' +
        '<tr class="3mathSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></td><td class="text-right">' + json[0].mmathschool3iep + '</td><td class="text-right">' + json[0].emathschool3iep + '</td><td class="text-right">' + json[0].mmathdist3iep + '</td><td class="text-right">' + json[0].emathdist3iep + '</td><td class="text-right">' + json[0].mmathstate3iep + '</td><td class="text-right">' + json[0].emathstate3iep + '</td></tr>' +     
        '</tbody></table>'
        );
      } else {
        $('#moreTabs-3').remove();
        $('ul li.list-3').remove();
      };
      
$("#3readSHOW").click(function () {
  $(".3readSPAN").toggle();
  return false;
  });
$("#4readSHOW").click(function () {
  $(".4readSPAN").toggle();
  return false;
  });
$("#5readSHOW").click(function () {
  $(".5readSPAN").toggle();
  return false;
  });

$("#6readSHOW").click(function () {
  $(".6readSPAN").toggle();
  return false;
  });
$("#7readSHOW").click(function () {
  $(".7readSPAN").toggle();
  return false;
  });
$("#8readSHOW").click(function () {
  $(".8readSPAN").toggle();
  return false;
  });
$("#11readSHOW").click(function () {
  $(".11readSPAN").toggle();
  return false;
  });
  
$("#3mathSHOW").click(function () {
  $(".3mathSPAN").toggle();
  return false;
  });
$("#4mathSHOW").click(function () {
  $(".4mathSPAN").toggle();
  return false;
  });
$("#5mathSHOW").click(function () {
  $(".5mathSPAN").toggle();
  return false;
  });
$("#6mathSHOW").click(function () {
  $(".6mathSPAN").toggle();
  return false;
  });
$("#7mathSHOW").click(function () {
  $(".7mathSPAN").toggle();
  return false;
  });
$("#8mathSHOW").click(function () {
  $(".8mathSPAN").toggle();
  return false;
  });
$("#11mathSHOW").click(function () {
  $(".11mathSPAN").toggle();
  return false;
  });

$("#4sciSHOW").click(function () {
  $(".4sciSPAN").toggle();
  return false;
  });
$("#7sciSHOW").click(function () {
  $(".7sciSPAN").toggle();
  return false;
  });
$("#11sciSHOW").click(function () {
  $(".11sciSPAN").toggle();
  return false;
  });


//-----------------------------------------
// Here's the Finanicals section

$('#salary').html(
'<table class="table table-hover table-striped table-condensed">' + 
'<tbody><tr><td><strong>SALARY</strong></td><td class="text-right"><strong>DISTRICT</strong></td><td class="text-right"><strong>STATE</strong></td></tr>' +
'<tr><td>Avg. teacher</td><td class="text-right">' + json[0].teachsaldist + '</td><td class="text-right">' + json[0].teachsalstate + '</td></tr>' + 
'<tr><td>Avg. administrator</td><td class="text-right">' + json[0].adminsaldist + '</td><td class="text-right">' + json[0].adminsalstate + '</td></tr>' + 
'<tr><td><strong>PER PUPIL SPENDING</strong></td><td class="text-right"><strong>DISTRICT</strong></td><td class="text-right"><strong>STATE</strong></td></tr>' +
'<tr><td>Instruction</td><td class="text-right">' + json[0].instexppupildist + '</td><td class="text-right">' + json[0].instexppupilstate + '</td></tr>' + 
'<tr><td>Operations</td><td class="text-right">' + json[0].otherexppupildist + '</td><td class="text-right">' + json[0].otherexppupilstate + '</td></tr>' + 
'</tbody></table>'
);


// Revenue charting info

var propDISTperc = parseFloat(json[0].fundlocpropdistperc);
var stateDISTperc = parseFloat(json[0].fundstateaiddistperc);
var fedDISTperc = parseFloat(json[0].fundfeddistperc);
var otherLocDISTperc = parseFloat(json[0].fundotherdistperc);
var otherStateDISTperc = parseFloat(json[0].fundotherstatedistperc);

var chartRevDIST = new Highcharts.Chart({
      chart: {
    renderTo: 'fundDIST',
      spacingBottom: 15,
      spacingTop: 10,
      spacingLeft: 10,
      spacingRight: 10,
      width: null,
      height: 350,
          type: 'pie'
      },
      plotOptions: {
         pie: {
             dataLabels: {
                  enabled: false
              }
          }
      },
      title: {
          text: 'District revenue sources'
      },
       series: [{
          name: 'District:',
          data: [
              ['% Local property taxes', propDISTperc],
              ['% State aid', stateDISTperc],
              ['% Federal aid', fedDISTperc],
              ['% Other local funding', otherLocDISTperc],
              ['% Other state funding', otherStateDISTperc]
           ],
         showInLegend: true
      }]
});


var propSTATEperc = parseFloat(json[0].fundlocpropstateperc);
var stateSTATEperc = parseFloat(json[0].fundstateaidstateperc);
var fedSTATEperc = parseFloat(json[0].fundfedstateperc);
var otherLocSTATEperc = parseFloat(json[0].fundotherstateperc);
var otherStateSTATEperc = parseFloat(json[0].fundotherstatestateperc);

var chartRevSTATE = new Highcharts.Chart({
      chart: {
    renderTo: 'fundSTATE',
      spacingBottom: 15,
      spacingTop: 10,
      spacingLeft: 10,
      spacingRight: 10,
      width: null,
      height: 350,
          type: 'pie'
      },
      plotOptions: {
         pie: {
             dataLabels: {
                  enabled: false
              }
          }
      },
      title: {
          text: 'Statewide average'
      },
      series: [{
          name: 'State average:',
          data: [
              ['% Local property taxes', propSTATEperc],
              ['% State aid', stateSTATEperc],
              ['% Federal aid', fedSTATEperc],
              ['% Other local funding', otherLocSTATEperc],
              ['% Other state funding', otherStateSTATEperc]
          ],
         showInLegend: true
      }]
});

$('#budget').html(
  '<p><strong>2012-2013 DISTRICT BUDGET </strong>(payable in 2013-\'14 school year)</p>' +
  '<table class="table table-hover table-striped table-condensed"><tbody>' + 
  '<tr><td></td><td colspan="3" class="text-center"><strong>EXPENDITURES</strong></td></tr>' +
  '<tr><td><strong>CATEGORY</strong></td><td class="text-right"><strong>Amount</strong></td><td class="text-right"><strong>% of total district spending</strong></td><td class="text-right"><strong>Versus state % average</strong></td></tr>' +
  '<tr><td>Instruction</td><td class="text-right">' + json[0].instdollars + '</td><td class="text-right">' + json[0].instdollarsdistperc + '</td><td class="text-right">' + json[0].instdollarsstateperc + '</td></tr>' + 
  '<tr><td>General administration</td><td class="text-right">' + json[0].genadmindollars + '</td><td class="text-right">' + json[0].genadmindistperc + '</td><td class="text-right">' + json[0].genadminstateperc + '</td></tr>' + 
  '<tr><td>Support services</td><td class="text-right">' + json[0].supportservdollars + '</td><td class="text-right">' + json[0].supportservdistperc + '</td><td class="text-right">' + json[0].supportservstateperc + '</td></tr>' + 
  '<tr><td>Other expenditures</td><td class="text-right">' + json[0].otherexpdollars + '</td><td class="text-right">' + json[0].otherexpdistperc + '</td><td class="text-right">' + json[0].otherexpstateperc + '</td></tr>' + 
  '<tr><td>Education fund</td><td class="text-right">' + json[0].edfunddollars + '</td><td class="text-right">' + json[0].edfunddistperc + '</td><td class="text-right">' + json[0].edfundstateperc + '</td></tr>' + 
  '<tr><td>Operations</td><td class="text-right">' + json[0].opbmdollars + '</td><td class="text-right">' + json[0].opbmdistperc + '</td><td class="text-right">' + json[0].opbmstateperc + '</td></tr>' + 
  '<tr><td>Transportation</td><td class="text-right">' + json[0].transportdollars + '</td><td class="text-right">' + json[0].transportdistperc + '</td><td class="text-right">' + json[0].transportstateperc + '</td></tr>' + 
  '<tr><td>Debt service</td><td class="text-right">' + json[0].debtservdollars + '</td><td class="text-right">' + json[0].debtservdistperc + '</td><td class="text-right">' + json[0].debtservstateperc + '</td></tr>' + 
  '<tr><td>Tort</td><td class="text-right">' + json[0].tortdollars + '</td><td class="text-right">' + json[0].tortdistperc + '</td><td class="text-right">' + json[0].tortstateperc + '</td></tr>' + 
  '<tr><td>Pension, Social security</td><td class="text-right">' + json[0].muncretsocdollars + '</td><td class="text-right">' + json[0].muncretsocdistperc + '</td><td class="text-right">' + json[0].muncretsocstateperc + '</td></tr>' + 
  '<tr><td>Fire prevention and safety</td><td class="text-right">' + json[0].fireprevdollars + '</td><td class="text-right">' + json[0].fireprevdistperc + '</td><td class="text-right">' + json[0].fireprevstateperc + '</td></tr>' + 
  '<tr><td>Capital projects</td><td class="text-right">' + json[0].capdollars + '</td><td class="text-right">' + json[0].capdistperc + '</strong></td><td class="text-right">' + json[0].capstateperc + '</td></tr>' + 
  '</table>'
);


//____________________________________________________________________________________
//____________________________________________________________________________________
// THIS IS THE SECTION FOR CHARTING - IT MUST COME AT THE END DUE TO PARSING AND NULLS

//-----------------------------------------
// here's the high school charting

  if(json[0].act2014school != '--'){



// ACT range

  var schoolNAME = json[0].facilityname;
  var scoreFLOORact = Math.floor(parseFloat(json[0].act2014school));
  var chartACTcount = new Highcharts.Chart({
        chart: {
      renderTo: 'ACTrange',
      height: 325,
      spacingBottom: 15,
      spacingTop: 10,
      spacingLeft: 10,
      spacingRight: 10,
            type: 'column'
        },
        title: {
            text: null,
        },
        legend: {
            enabled: false
        },
        xAxis: {
      name: 'avg. ACT score',
        title: {
                text: 'Average ACT score'
            },
                  categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36'],
                tickInterval: 5,
                labels: {
                  staggerLines: 2
            }
        },
        yAxis: {
      tickInterval: 25,
      max: 150,
            title: {
                text: 'Number of schools'
            }
        },
        series: [{
      name: 'Number of schools with similar ACT score',
            data: [0,0,0,0,0,0,0,0,0,0,0,0,0,8,22,29,34,52,96,117,131,79,50,26,8,9,5,3,0,0,2,0,0,0,0,0,0]
        }],
      tooltip: {
      crosshairs: true,
            shared: true,
            useHTML: true,
            headerFormat: 'Average ACT score: <b>{point.key}</b><br>',
            pointFormat: '<span style="color: {series.color}"># of schools<br>with similar score: </span><b>{point.y}</b>',
            footerFormat: '</table>',
        },
   }, function(chart) { // on complete
      chart.series[0].data[scoreFLOORact].select();

    if (chart.series[0].data[scoreFLOORact].selected) {
      var selectPOINTact = chart.series[0].data[scoreFLOORact].y - 1;
        chart.xAxis[0].addPlotLine({
                value: chart.series[0].data[scoreFLOORact].x,
                color: '#FFFF99',
                width: 8
            });
            } else {
              return false;
               };
    $('#ACTnoteRANGE').html(
      '<p class="Ppadding"><strong>Number of schools in the state with similar average ACT scores.</strong> Highlighted below, ' + selectPOINTact + ' other school(s) had a score similar to ' + json[0].facilityname + '\'s average ACT score of ' + json[0].act2014school + '.</p>'
    );
});

      $('#ACTnote').html(
        '<p class="Ppadding"><strong>For the school, district and state since the 2005-\'06 school year.</strong></p>'
        );

// ACT scores

  var chartACT = new Highcharts.Chart({
        chart: {
      renderTo: 'ACTyears',
      backgroundColor: '#e6ebef',
      height: 325,
      spacingBottom: 15,
      spacingTop: 10,
      spacingLeft: 10,
      spacingRight: 10,
            type: 'line'
        },
        title: {
            text: null,
        },
        xAxis: {
            categories: ['2006', '2007', '2008', '2009', '2010', '2011', '2012','2013', '2014'],
              labels: {
                staggerLines: 2
            }
        },
        yAxis: {
      tickInterval: 6,
      min: 0,
      max: 36,
            title: {
                text: 'ACT scores'
            }
        },
        series: [{
            name: 'State',
            data: $.map([json[0].act2006state, json[0].act2007state, json[0].act2008state, json[0].act2009state, json[0].act2010state, json[0].act2011state, json[0].act2012state, json[0].act2013state, json[0].actscore2014state], function (valueACTsta) {
        return isNaN(valueACTsta) ? { y: null } : parseFloat(valueACTsta);
            })
          }, {  
            name: 'District',
            data: $.map([json[0].act2006district, json[0].act2007district, json[0].act2008district, json[0].act2009district, json[0].act2010district, json[0].act2011district, json[0].act2012district, json[0].act2013district, json[0].actscore2014district], function (valueACTdis) {
        return isNaN(valueACTdis) ? { y: null } : parseFloat(valueACTdis);
            })
          }, {  
      name: 'School',
            data: $.map([json[0].act2006school, json[0].act2007school, json[0].act2008school, json[0].act2009school, json[0].act2010school, json[0].act2011school, json[0].act2012school, json[0].act2013school, json[0].act2014school], function (valueACTsch) {
              return isNaN(valueACTsch) ? { y: null } : parseFloat(valueACTsch);
            })
        }],
        tooltip: {
          crosshairs: true,
          shared: true
        },
    });
      } else {
        $('#ACTchart').remove();
        $('#ACTcharts').remove();
      };

// High school scores range chart
      
      if(json[0].me2014schoolpsae != '--'){


//HS range

  var schoolNAME = json[0].facilityname;
  var scoreFLOORPSAE = Math.floor(parseFloat(json[0].me2014schoolpsae));
  var chartPSAEcount = new Highcharts.Chart({
        chart: {
      renderTo: 'PSAErange',
      height: 325,
      spacingBottom: 15,
      spacingTop: 10,
      spacingLeft: 10,
      spacingRight: 10,
            type: 'column'
        },
        title: {
            text: null,
        },
        legend: {
            enabled: false
        },
        xAxis: {
      name: 'Percent meets/exceeds',
        title: {
                text: 'Composite meets/exceeds PSAE score'
            },
                categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'],
                tickInterval: 5,
                labels: {
                 staggerLines: 2
            }
        },
        yAxis: {
            title: {
                text: 'Number of schools'
            }
        },
        series: [{
      name: 'Number of schools with a similar meets/exceeds percentage',
            data: [0,1,1,2,4,4,3,8,5,4,3,4,3,3,1,3,3,5,3,2,5,4,3,5,2,5,2,3,9,7,7,8,7,11,5,8,9,7,6,7,10,8,17,16,8,12,19,20,10,7,17,15,18,11,17,19,17,21,18,15,17,13,8,10,14,6,14,8,7,11,10,6,9,6,7,4,7,7,2,3,4,3,4,1,1,1,1,2,4,1,0,0,2,0,0,0,1,0,1,2,0]
        }],
      tooltip: {
            shared: true,
      crosshairs: true,
            useHTML: true,
            headerFormat: 'Meets/exceeds<br>score: <b>{point.key}</b><br>',
            pointFormat: '<span style="color: {series.color}"># of schools<br>with similar score: </span><b>{point.y}</b>',
            footerFormat: '</table>',
        },
   }, function(chart) { // on complete
      chart.series[0].data[scoreFLOORPSAE].select();

    if (chart.series[0].data[scoreFLOORPSAE].selected) {
      var selectPOINTPSAE = chart.series[0].data[scoreFLOORPSAE].y - 1;
        chart.xAxis[0].addPlotLine({
                value: chart.series[0].data[scoreFLOORPSAE].x,
                color: '#FFFF99',
                width: 5
            });
            } else {
              return false;
               };

    $('#PSAEnoteRANGE').html(
        '<p class="Ppadding"><strong>Number of schools in the state with a similar percentage of students meeting or exceeding PSAE standards.</strong> Highlighted below, ' + json[0].me2014schoolpsae + '% of ' + json[0].facilityname + ' students met or exceeded state PSAE standards. ' + selectPOINTPSAE + ' other school(s) had a similar percentage.</p>'
        );       
    });


// HS scores 

      $('#PSAEnote').html(
        '<p class="Ppadding"><strong>For the school, district and state since the 2006-\'07 school year.</strong></p>'
        );


// High school scores

  var chartPSAE = new Highcharts.Chart({
        chart: {
      renderTo: 'PSAEyears',
      height: 375,
      spacingBottom: 15,
      spacingTop: 10,
      spacingLeft: 10,
      spacingRight: 10,
            type: 'line'
        },
        title: {
            text: null,
        },
        xAxis: {
            categories: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'],
              labels: {
                staggerLines: 2
            }
        },
        yAxis: {
      min: 0,
      max: 100,
            title: {
                text: 'PSAE scores'
            }
        },
        series: [{
            name: 'State',
            data: $.map([json[0].me2006statepsae, json[0].me2007statepsae, json[0].me2008statepsae, json[0].me2009statepsae, json[0].me2010statepsae, json[0].me2011statepsae, json[0].me2012statepsae, json[0].me2013statepsae, json[0].me2014statepsae], function (valuePSATsta) {
                return isNaN(valuePSATsta) ? { y: null } : parseFloat(valuePSATsta);
            })
          }, {  
            name: 'District',
            data: $.map([json[0].me2006districtpsae, json[0].me2007districtpsae, json[0].me2008districtpsae, json[0].me2009districtpsae, json[0].me2010districtpsae, json[0].me2011districtpsae, json[0].me2012districtpsae, json[0].me2013districtpsae, json[0].me2014districtpsae], function (valuePSATdis) {
                return isNaN(valuePSATdis) ? { y: null } : parseFloat(valuePSATdis);
            })
          }, {  
      name: 'School',
            data: $.map([json[0].me2006schoolpsae, json[0].me2007schoolpsae, json[0].me2008schoolpsae, json[0].me2009schoolpsae, json[0].me2010schoolpsae, json[0].me2011schoolpsae, json[0].me2012schoolpsae, json[0].me2013schoolpsae, json[0].me2014schoolpsae], function (valuePSATsch) {
                return isNaN(valuePSATsch) ? { y: null } : parseFloat(valuePSATsch);
            })
        }],
        tooltip: {
          crosshairs: true,
          shared: true
        },
    });


// Here's a placeholder graphic for the HS PA index


  $('#hsPAInote').html(
  '<p class="Ppadding"><strong>POVERTY-ACHIEVEMENT INDEX:</strong> The Daily Herald, in collaboration with WBEZ, examined scores for public schools with similar percentages of low-income students. A school\'s index rank shows how much higher or lower their score is compared to the average for those similar schools.<br><strong>Most schools will rank between 1 and -1, with 0 (red line) being exactly average for schools in the same low-income range.</strong> For more details about our Poverty-Achievement Index, please <a href="http://reportcards.dailyherald.com/lowincome" target="_blank">click here</a>.</p>'
  );

  var charthsPAI = new Highcharts.Chart({
        chart: {
      renderTo: 'hsPAIyears',
      backgroundColor: '#e6ebef',
      height: 325,
      spacingBottom: 15,
      spacingTop: 10,
      spacingLeft: 10,
      spacingRight: 10,
        },
        title: {
            text: null,
        },
        legend: {
            enabled: false
        },
        xAxis: [{
            categories: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'],
            crosshair: true,
            labels: {
                staggerLines: 2
            }
        }],
        yAxis: [{ 
            title: {
                text: '% Low Income',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            min: 0,
            max: 100,
            tickInterval: 10
        }, { 
            title: {
                text: 'Poverty-Achievement Index rank',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            plotLines:[{
              value:0,
              color: '#ff0000',
              width:1,
              zIndex:4
            }],
            min: -5,
            max: 5,
            tickInterval: 1,
            opposite: true
        }],
        tooltip: {
            crosshairs: true,
            shared: true,
            useHTML: true
        },
        series: [{
            name: 'Poverty-Achievement<br>Index',
            type: 'column',
            yAxis: 1,
            data: $.map([json[0].zhsscore2006, json[0].zhsscore2007, json[0].zhsscore2008, json[0].zhsscore2009, json[0].zhsscore2010, json[0].zhsscore2011, json[0].zhsscore2012, json[0].zhsscore2013, json[0].zhsscore2014], function (valuePAIhs) {
                return isNaN(valuePAIhs) ? { y: null } : parseFloat(valuePAIhs);
            })

        }, {
            name: '% Low Income',
            type: 'line',
            data: $.map([json[0].lowinc2006, json[0].lowinc2007, json[0].lowinc2008, json[0].lowinc2009, json[0].lowinc2010, json[0].lowinc2011, json[0].lowinc2012, json[0].lowinc2013, json[0].lowinc2014], function (valueLOWhs) {
                return isNaN(valueLOWhs) ? { y: null } : parseFloat(valueLOWhs);
            })

//        }, {
//            name: '% Minority',
//            type: 'line',
//            data: $.map([json[0].percmin2006, json[0].percmin2007, json[0].percmin2008, json[0].percmin2009, json[0].percmin2010, json[0].percmin2011, json[0].percmin2012, json[0].percmin2013, json[0].percmin2014], function (valueMINhs) {
//                return isNaN(valueMINhs) ? { y: null } : parseFloat(valueMINhs);
//            })
        }]
    });

// THIS IS THE SECTION FOR college readiness and graduation rates

$('#collegeReady').html(
      '<h4>GRADUATION AND COLLEGE READINESS</h4><p><table class="table table-hover table-striped table-condensed"><thead><tr><th></th><th class="text-right">SCHOOL</th><th class="text-right">DISTRICT</th><th class="text-right">STATE</th></tr></thead>' + 
      '<tbody><tr><td><strong>ACT benchmarks</strong></td><td class="text-right"></td><td class="text-right"></td><td class="text-right"></td></tr>' + 
      '<tr><td>% met english</td><td class="text-right">' + json[0].actschoolengmet + '</td><td class="text-right">' + json[0].actdistengmet + '</td><td class="text-right">' + json[0].actstateengmet + '</td></tr>' + 
      '<tr><td>% met math</td><td class="text-right">' + json[0].actschoolmathmet + '</td><td class="text-right">' + json[0].actdistmathmet + '</td><td class="text-right">' + json[0].actstatemathmet + '</td></tr>' + 
      '<tr><td>% met reading</td><td class="text-right">' + json[0].actschoolreadmet + '</td><td class="text-right">' + json[0].actdistreadmet + '</td><td class="text-right">' + json[0].actstatereadmet + '</td></tr>' + 
      '<tr><td>% met science</td><td class="text-right">' + json[0].actschoolscimet + '</td><td class="text-right">' + json[0].actdistscimet + '</td><td class="text-right">' + json[0].actstatescimet + '</td></tr>' + 
      '<tr><td>% met all</td><td class="text-right">' + json[0].actschoolallmet + '</td><td class="text-right">' + json[0].actdistallmet + '</td><td class="text-right">' + json[0].actstateallmet + '</td></tr>' + 
      '<tr><td>% college ready<sup><a href="#footnotes"> 7</sup></a></td><td class="text-right">' + json[0].percschoolcol + '</td><td class="text-right">' + json[0].percdistcol + '</td><td class="text-right">' + json[0].percstatecol + '</td></tr>' + 
      '<tr><td><strong>Graduation</strong></td><td class="text-right"></td><td class="text-right"></td><td class="text-right"></td></tr>' +
      '<tr><td>% freshmen on track</td><td class="text-right">' + json[0].percschoolfresh + '</td><td class="text-right">' + json[0].percdistfresh + '</td><td class="text-right">' + json[0].percstatefresh + '</td></tr>' +        
      '<tr><td>% H.S. 4-year graduation</td><td class="text-right">' + json[0].perchs4gradschoolall + '</td><td class="text-right">' + json[0].perchs4graddistall + '</td><td class="text-right">' + json[0].perchs4gradstateall + '</td></tr>' +        
      '<tr><td>% H.S. 5-year graduation</td><td class="text-right">' + json[0].perchs5gradschoolall + '</td><td class="text-right">' + json[0].perchs5graddistall + '</td><td class="text-right">' + json[0].perchs5gradstateall + '</td></tr>' +               
      '<tr><td>Dropout rate (%)<sup><a href="#footnotes"> 8</sup></a></td><td class="text-right">' + json[0].percdropoutschool + '</td><td class="text-right">' + json[0].percdropoutdist + '</td><td class="text-right">' + json[0].percdropoutstate + '</td></tr>' +        
      '<tr><td><strong>Grads enrolled in college</strong></td><td class="text-right"></td><td class="text-right"></td><td class="text-right"></td></tr>' +
      '<tr><td>% within 12 months</td><td class="text-right">' + json[0].percschoolenroll12 + '</td><td class="text-right">' + json[0].percdistenroll12 + '</td><td class="text-right">' + json[0].percstateenroll12 + '</td></tr>' +               
      '<tr><td>% within 16 months</td><td class="text-right">' + json[0].percschoolenroll16 + '</td><td class="text-right">' + json[0].percdistenroll16 + '</td><td class="text-right">' + json[0].percstateenroll16 + '</td></tr>' +               
      '</tbody></table></p>'
);


    $("ul li.hsdrop").addClass( "active" );
    $("ul li.hsdrop ul li.PSAEchart").addClass( "active" );
    $("#PSAEcharts").addClass( "active" );
    $("#chartTabs").tab();

      } else {
        $('ul li.hsdrop').remove();
        $('#PSAEcharts').remove();
        $('#hsPersp').remove();
      };

// Here's the elementary school charting

	if(json[0].mreadschool3all != '--' || json[0].mreadschool4all != '--' || json[0].mreadschool5all != '--' || json[0].mreadschool6all != '--' || json[0].mreadschool7all != '--' || json[0].mreadschool8all != '--' ){

		$('#ISATnote').html(
			'<p class="Ppadding"><strong>For the school, district and state since the 2006-\'07 school year.</strong> The large drop in 2013 results were affected by the state raising the minimum ISAT score students needed to achieve a rating of "meets expectations." Actual scores did not necessarily drop, but those scores may not have met the new "cut" score.</p>'
			);

	var chartISAT = new Highcharts.Chart({
        chart: {
			renderTo: 'ISATyears',
			height: 375,
			spacingBottom: 15,
			spacingTop: 10,
			spacingLeft: 10,
			spacingRight: 10,
            type: 'line'
        },
        title: {
            text: null
        },
        xAxis: {
        	plotBands: [{
        		from: 6.5,
        		to: 8.5,
        		color: '#e1e1e1'
        	}],
            categories: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'],
            labels: {
            	staggerLines: 2
            }
        },
        yAxis: {
			min: 0,
			max: 100,
            title: {
                text: 'ISAT scores'
            }
        },
        series: [{
            name: 'State',
            data: $.map([json[0].me2006stateisat, json[0].me2007stateisat, json[0].me2008stateisat, json[0].me2009stateisat, json[0].me2010stateisat, json[0].me2011stateisat, json[0].me2012stateisat, json[0].me2013stateisat, json[0].me2014stateisat], function (valueISATsta) {
                return isNaN(valueISATsta) ? { y: null } : parseFloat(valueISATsta);
            })
	        }, {	
            name: 'District',
            data: $.map([json[0].me2006districtisat, json[0].me2007districtisat, json[0].me2008districtisat, json[0].me2009districtisat, json[0].me2010districtisat, json[0].me2011districtisat, json[0].me2012districtisat, json[0].me2013districtisat, json[0].me2014districtisat], function (valueISATdis) {
                return isNaN(valueISATdis) ? { y: null } : parseFloat(valueISATdis);
           })
	        }, {	
 			name: 'School',
            data: $.map([json[0].me2006schoolisat, json[0].me2007schoolisat, json[0].me2008schoolisat, json[0].me2009schoolisat, json[0].me2010schoolisat, json[0].me2011schoolisat, json[0].me2012schoolisat, json[0].me2013schoolisat, json[0].me2014schoolisat], function (valueISATsch) {
                return isNaN(valueISATsch) ? { y: null } : parseFloat(valueISATsch);
            })
        }],
        tooltip: {
        	crosshairs: true,
        	shared: true,
        	valueSuffix: '%'
        },
    });

//Here's the ISAT bell curve

  var schoolNAME = json[0].facilityname;
  var scoreFLOOR = Math.floor(parseFloat(json[0].me2014schoolisat));
  var chartISATcount = new Highcharts.Chart({
    chart: {
      renderTo: 'ISATrange',
      height: 300,
      spacingBottom: 15,
      spacingTop: 10,
      spacingLeft: 10,
      spacingRight: 10,
        type: 'column'
    },
    title: {
        text: null,
    },
    legend: {
        enabled: false
    },
    xAxis: {
      name: 'Percent meets/exceeds',
      title: {
        text: 'Composite meets/exceeds ISAT score'
      },
      categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'],
      tickInterval: 5,
      labels: {
      staggerLines: 2
          }
    },
    yAxis: {
        title: {
          text: 'Number of schools'
        }
    },
    series: [{
      name: 'Number of schools with a similar meets/exceeds percentage',
        data: [0,0,0,0,0,0,0,0,0,0,0,1,2,1,1,6,6,3,2,13,7,5,13,13,9,8,15,25,19,25,25,26,35,31,31,26,31,35,29,37,57,39,36,57,34,45,54,63,66,49,46,65,46,45,58,68,47,77,44,46,61,68,58,55,72,56,61,60,42,43,52,48,51,44,47,39,38,47,39,40,26,26,45,42,24,27,29,26,13,20,8,14,9,5,4,1,2,1,5,4,0]
    }],
    tooltip: {
      shared: true,
      crosshairs: true,
      useHTML: true,
      headerFormat: 'Meets/exceeds<br>score: <b>{point.key}</b><br>',
      pointFormat: '<span style="color: {series.color}"># of schools<br>with similar score: </span><b>{point.y}</b>',
      footerFormat: '',
    },
  }, function(chart) { // on complete
      chart.series[0].data[scoreFLOOR].select();
      if (chart.series[0].data[scoreFLOOR].selected) {
        var selectPOINT = chart.series[0].data[scoreFLOOR].y - 1;
        chart.xAxis[0].addPlotLine({
          value: chart.series[0].data[scoreFLOOR].x,
          color: '#FFFF99',
          width: 5
        });
      } else {
        return false;
      };
	$('#ISATnoteRANGE').html(
        '<p class="Ppadding"><strong>Number of schools in the state with a similar percentage of students meeting or exceeding ISAT standards.</strong> Highlighted below, ' + json[0].me2014schoolisat + '% of ' + json[0].facilityname + ' students met or exceeded state ISAT standards. ' + selectPOINT + ' other school(s) had a similar percentage.</p>'
      );
  });

//And here's the PAI and growth scores

	$('#GROWnote').html(
	'<p class="Ppadding"><strong>Average change in students knowledge or skills</strong> from the previous school year. A number above 100 indicates students are making good progress. To better understand the state\'s new method of evaluating schools, <strong><a href="../schools/"> click here.</a></strong> Measure is for currently for elementary grades only.</p>'
	);

		
	var chartGROWTH = new Highcharts.Chart({
        chart: {
			renderTo: 'GROWyears',
			height: 300,
			spacingBottom: 15,
			spacingTop: 10,
			spacingLeft: 10,
			spacingRight: 10,
            type: 'column'
        },
        title: {
            text: null,
        },
        xAxis: {
            categories: [{
            	name: "<b>2013</b>",
            	categories: ["Reading", "Math"]
            }, {
            	name:"<b>2014</b>",
            	categories: ["Reading", "Math"]
            }]
         },
        yAxis: {
			tickInterval: 10,
			min: 60,
			max: 130,
            title: {
                text: 'GROWTH SCORE'
            }
        },
        plotOptions: {
            series: {
                threshold: 100
            }
        },

        series: [{
            name: 'State',
            data: $.map([json[0].grow2013stateread, json[0].grow2013statemath, json[0].grow2014stateread, json[0].grow2014statemath], function (valueGROsta) {
				return isNaN(valueGROsta) ? { y: null } : parseFloat(valueGROsta);
            })
	        }, {	
            name: 'District',
            data: $.map([json[0].grow2013distread, json[0].grow2013distmath, json[0].grow2014distread, json[0].grow2014distmath], function (valueGROdis) {
				return isNaN(valueGROdis) ? { y: null } : parseFloat(valueGROdis);
            })
	        }, {	
 			name: 'School',
            data: $.map([json[0].grow2013schoolread, json[0].grow2013schoolmath, json[0].grow2014schoolread, json[0].grow2014schoolmath], function (valueGROsch) {
				return isNaN(valueGROsch) ? { y: null } : parseFloat(valueGROsch);
            })
        }],

         tooltip: {
            formatter: function () {
                return this.series.name + '\'s ' + this.x +
                    ',<br>avg. growth value: <b>' + this.y +'</b>';
            }
        },
    });

// Here's a placeholder graphic for the elem PA index


	$('#PAInote').html(
  '<p class="Ppadding"><strong>POVERTY-ACHIEVEMENT INDEX:</strong> The Daily Herald, in collaboration with WBEZ, examined scores for public schools with similar percentages of low-income students. A school\'s index rank shows how much higher or lower their score is compared to the average for those similar schools.<br><strong>Most schools will rank between 1 and -1, with 0 (red line) being exactly average for schools in the same low-income range.</strong> For more details about our Poverty-Achievement Index, please <a href="http://reportcards.dailyherald.com/lowincome" target="_blank">click here</a>.</p>'
	);

	var chartPAI = new Highcharts.Chart({
        chart: {
			renderTo: 'PAIyears',
      backgroundColor: '#e6ebef',
      height: 325,
      spacingBottom: 15,
      spacingTop: 10,
      spacingLeft: 10,
      spacingRight: 10,
        },
        title: {
            text: null,
        },
        legend: {
            enabled: false
        },
        xAxis: [{
            categories: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'],
            crosshair: true,
            labels: {
                staggerLines: 2
            }
        }],
        yAxis: [{ 
            title: {
                text: '% Low Income',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            min: 0,
            max: 100,
            tickInterval: 10
        }, { 
            title: {
                text: 'Poverty-Achievement Index rank',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            plotLines:[{
              value:0,
              color: '#ff0000',
              width:1,
              zIndex:4
            }],
            min: -5,
            max: 5,
            tickInterval: 1,
            opposite: true
        }],
        tooltip: {
            crosshairs: true,
            shared: true,
            useHTML: true
        },
        series: [{
            name: 'Poverty-Achievement<br>Index',
            type: 'column',
            yAxis: 1,
            data: $.map([json[0].zelemscore2006, json[0].zelemscore2007, json[0].zelemscore2008, json[0].zelemscore2009, json[0].zelemscore2010, json[0].zelemscore2011, json[0].zelemscore2012, json[0].zelemscore2013, json[0].zelemscore2014], function (valuePAI) {
                return isNaN(valuePAI) ? { y: null } : parseFloat(valuePAI);
            })

        }, {
            name: '% Low Income',
            type: 'line',
            data: $.map([json[0].lowinc2006, json[0].lowinc2007, json[0].lowinc2008, json[0].lowinc2009, json[0].lowinc2010, json[0].lowinc2011, json[0].lowinc2012, json[0].lowinc2013, json[0].lowinc2014], function (valueLOW) {
                return isNaN(valueLOW) ? { y: null } : parseFloat(valueLOW);
            })

//        }, {
//            name: '% Minority',
//            type: 'line',
//            data: $.map([json[0].percmin2006, json[0].percmin2007, json[0].percmin2008, json[0].percmin2009, json[0].percmin2010, json[0].percmin2011, json[0].percmin2012, json[0].percmin2013, json[0].percmin2014], function (valueMIN) {
//                return isNaN(valueMIN) ? { y: null } : parseFloat(valueMIN);
//            })
        }]
    });

// finishing the three charts up

    $("ul li.hsdrop").removeClass( "active" );
    $("ul li.hsdrop ul li.PSAEchart").removeClass( "active" );
    $("#PSAEcharts").removeClass( "active" );

    $("ul li.elemdrop li.ISATchart").addClass( "active" );
    $("ul li.elemdrop").addClass( "active" );
		$("#ISATcharts").addClass( "active" );
		$("#chartTabs" ).tab();

	} else {
		$('ul li.elemdrop').remove();
    $('#ISATcharts').remove();
		$('#elemPersp').remove();

	};
        

//-----------------------------------------
// footnotes

			if(json[0].SCHOOL11status != 'n'){
				$('#footnotes').html(
				'<hr><h4>FOOTNOTES</h4>' + 
				'<p><small><ul><li><sup>1</sup><strong> LEP: </strong>Percentage of students found to be eligible for bilingual education.<a href="#scores""> BACK</a></li>' + 
				'<li><sup>2</sup><strong> IEP: </strong>Percentage of students found to be eligible to receive special education services.<a href="#scores"> BACK</a></li>' +
				'<li><sup>3</sup><strong> % homeless: </strong>Percentage of students who do not have permanent and adequate homes. <a href="#attend">BACK</a></li>' +
				'<li><sup>4</sup><strong> Attendance rate (%): </strong>Percent of school days attended.<a href="#attend"> BACK</a></li>' +
				'<li><sup>5</sup><strong> Mobility rate (%): </strong>Percent of students who transfer in or out of a school. Students who transfer in and out multiple times during the year are counted each time they transfer.<a href="#attend"> BACK</a></li>' +
				'<li><sup>6</sup><strong> Truancy rate (%): </strong>Chronic truancy rate is the percentage of students who have been absent from school without a valid cause for five percent or more of attendance days.<a href="#attend"> BACK</a></li>' +
				'<li><sup>7</sup><strong> % college ready: </strong>Percentage of students who scored at least a 21 on the ACT.<a href="#cready"> BACK</a></li>' +
				'<li><sup>8</sup><strong> Dropout rate (%): </strong>Percent of students removed from a school\'s attendance roster. Does not include students who have passed away or suffer an extended illness, transfered to another public/private or home school, or who have been expelled.<a href="#cready"> BACK</a></li>' +
				'</ul></small></p>'
);
			} else {
				$('#footnotes').html(
				'<hr><h4>FOOTNOTES</h4>' + 
				'<p><small><ul><li><sup>1</sup><strong> LEP: </strong>Percentage of students found to be eligible for bilingual education.<a href="#scores""> BACK</a></li>' + 
				'<li><sup>2</sup><strong> IEP: </strong>Percentage of students found to be eligible to receive special education services.<a href="#scores"> BACK</a></li>' +
				'<li><sup>3</sup><strong> % homeless: </strong>Percentage of students who do not have permanent and adequate homes. <a href="#attend">BACK</a></li>' +
				'<li><sup>4</sup><strong> Attendance rate (%): </strong>Percent of school days attended.<a href="#attend"> BACK</a></li>' +
				'<li><sup>5</sup><strong> Mobility rate (%): </strong>Percent of students who transfer in or out of a school. Students who transfer in and out multiple times during the year are counted each time they transfer.<a href="#attend"> BACK</a></li>' +
				'<li><sup>6</sup><strong> Truancy rate (%): </strong>Chronic truancy rate is the percentage of students who have been absent from school without a valid cause for five percent or more of attendance days.<a href="#attend"> BACK</a></li>' +
				'</ul><small></p>'
);
			};

	$(function() {
//		$( "#scores" ).tab();
		$( "#demgroup" ).tab();
		$( "#chartTabs" ).tab();
		$( "#topnavbar" ).tab();
		});

//________________________________________

// THIS IS THE END
  };
	});
});