$( document ).ready( function() {
  window.location.hash = '#mainpge';
  console.log(getID);
  if (getID == "") { 
    console.log("please choose a school");
  } else
  console.log(getID);
  $('#loaded').hide();
//  $.getJSON('/SchoolReportCards15/RC2015/getSchool.php?term=' + getID, function(json){
  $.getJSON('RC2015/getSchool.php?term=' + getID, function(json){
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

  schInfo +='<p><ul><li><strong>District: </strong><a href="index.php?district-name=' + json[0].districtname + '">' + json[0].districtname + '</a></li><li><strong>School type: </strong>' + json[0].schooltype + ' serving grades ' + json[0].gradesserved + '</li><li><strong>Administrator: </strong>' + json[0].administrator + '</li><li><strong>Address: </strong>' + json[0].address + ', ' + json[0].city + ', IL ' + json[0].zip + '</li><li><strong>Phone: </strong>' + json[0].telephone + '</li><li><strong>Enrollment: </strong>' + json[0].enroll2015 + '</li>';

  if(json[0].note != '--'){
    schInfo += '<li><strong>Note: </strong>' + json[0].note + '</li>';
  };

  schInfo += '</ul>';

  schInfo += '</p>';

   schInfo += '<p><a href="#" onclick="window.open(' + "'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href)); " + '"><img src="images/fblogo.jpg" height="16" width="16">Share</a> | <a href="https://twitter.com/share" class="twitter-share-button" data-count="none">Tweet' + '</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?' + "'http':'https'" + ';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+' + "'://platform.twitter.com/widgets.js'" + ';fjs.parentNode.insertBefore(js,fjs);}}(document,' + " 'script', 'twitter-wjs');</script>" + '</p>';

  $('#schoolinfo').html( schInfo );		

  var schInfoNote = '';

  schInfoNote += '<p><small>Note: School and district information is as of September 2015. ';

  if(json[0].selective != '--'){
    schInfoNote += ' Schools marked with an asterisk are those with a selective enrollment or involve some measure of choice, such as some magnet or charter schools.';
  };

  schInfoNote += '</small></p>';

  $('#schoolinfonote').html( schInfoNote );   


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

				
if(json[0].me2015school == '--' && json[0].act2015school == '--'){
  $('#message').removeClass('hidden');
  $('#chnetmessage').remove();
  $('#chnetschmessage').remove();
  $('#pageControl').remove();
	$('#chartList').remove();
  $('#demgroup').remove();
	$('#financials').remove();
	$('#footnotes').remove();

 } else if(json[0].schooltype == "CHARTER NET SCH" || json[0].schooltype == "CHARTER NET SCH+" || json[0].schooltype == "CHARTER NET HIGH SCH" || json[0].schooltype == "CHARTER NET HIGH SCH+" ){
  $('#chnetschmessage').removeClass('hidden');
  $('#chnetmessage').remove();
  $('#message').remove();
  $('#pageControl').remove();
  $('#chartList').remove();
  $('#demgroup').remove();
  $('#financials').remove();
  $('#footnotes').remove();

	} else {
  if(json[0].schooltype == "CHARTER NET" || json[0].schooltype == "CHARTER NET+"){
    $('#chnetmessage').removeClass('hidden');
  };
  $('#message').remove();
  $('#chnetschmessage').remove();
  $('#chartList').removeClass('hidden');
  $('#demgroup').removeClass('hidden');
  $('#financials').removeClass('hidden');


//________________________________________
// THIS IS THE SECTION FOR PAGE CONTROL

var pagenum = 1;

$("#demgroup, #financials, #adspt1, #adspt2").hide();

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


function turnPage(numpage) {

  if(numpage == 1) {
    $("#lipage1, #lipage2, #lipage3").removeClass('active');
    $("#lipage1").addClass('active');
    $("#demgroup, #financials").hide();
    $("#chartList").show();
    $(window).resize();
  } else if(numpage == 2) {
    $("#lipage1, #lipage2, #lipage3").removeClass('active');
    $("#lipage2").addClass('active');
    $("#chartList, #financials").hide();
    $("#demgroup").show();
    $(window).resize();
  } else if(numpage == 3) {
    $("#lipage1, #lipage2, #lipage3").removeClass('active');
    $("#lipage3").addClass('active');
    $("#chartList, #demgroup").hide();
    $("#financials").show();
    $(window).resize();
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
//      if(json[0].mreadschool11all != '--' || json[0].mmathschool11all != '--'){
      if(json[0].mreadschoolHSall != '--' || json[0].mmathschoolHSall != '--'){
          $('#moreTabs-11').show();
          $('ul li.list-11').show();
        $('#moreTabs-11a').html(
        '<p class="Ppadding"><strong>11th grade reading, math and science results</strong><br><img src="images/read.jpg" class="imgfloatL">&nbsp;&nbsp;<i>Tip: Click the subject name for more.</i></p>' + 
        '<table class="table table-hover table-striped table-condensed"><thead>' + 
        '<tr><th><strong> </strong></th><th class="text-center" colspan="3" bgcolor="#e6ebef"><strong>SCHOOL</strong></th><th class="text-center" colspan="3"><strong>DISTRICT</strong></th><th class="text-center" colspan="3" bgcolor="#e6ebef"><strong>STATE</strong></th></tr></thead>' + 
        '<tbody><tr><td><strong>Subject</strong></td><td class="text-right"><strong>App.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>App.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>App.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td></tr>' +  
         '<tr><td><a id="HSreadSHOW" href=""><strong>ALL ELA</strong></a></td><td class="text-right">' + json[0].apreadschoolHSall + '</td><td class="text-right">' + json[0].mreadschoolHSall + '</td><td class="text-right">' + json[0].ereadschoolHSall + '</td><td class="text-right">' + json[0].apreaddistHSall  + '</td><td class="text-right">' + json[0].mreaddistHSall  + '</td><td class="text-right">' +  json[0].ereaddistHSall + '</td><td class="text-right">' + json[0].apreadstateHSall  + '</td><td class="text-right">' + json[0].mreadstateHSall  + '</td><td class="text-right">' +  json[0].ereadstateHSall + '</td></tr>' + 
        '<tr class="HSreadSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apreadschoolHSmale + '</td><td class="text-right">' + json[0].mreadschoolHSmale + '</td><td class="text-right">' + json[0].ereadschoolHSmale + '</td><td class="text-right">' + json[0].apreaddistHSmale + '</td><td class="text-right">' + json[0].mreaddistHSmale + '</td><td class="text-right">' + json[0].ereaddistHSmale + '</td><td class="text-right">' + json[0].apreadstateHSmale + '</td><td class="text-right">' + json[0].mreadstateHSmale + '</td><td class="text-right">' + json[0].ereadstateHSmale + '</td></tr>' + 
        '<tr class="HSreadSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apreadschoolHSfemale + '</td><td class="text-right">' + json[0].mreadschoolHSfemale + '</td><td class="text-right">' + json[0].ereadschoolHSfemale + '</td><td class="text-right">' + json[0].apreaddistHSfemale + '</td><td class="text-right">' + json[0].mreaddistHSfemale + '</td><td class="text-right">' + json[0].ereaddistHSfemale + '</td><td class="text-right">' + json[0].apreadstateHSfemale + '</td><td class="text-right">' + json[0].mreadstateHSfemale + '</td><td class="text-right">' + json[0].ereadstateHSfemale + '</td></tr>' + 
        '<tr class="HSreadSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apreadschoolHSwhite + '</td><td class="text-right">' + json[0].mreadschoolHSwhite + '</td><td class="text-right">' + json[0].ereadschoolHSwhite + '</td><td class="text-right">' + json[0].apreaddistHSwhite + '</td><td class="text-right">' + json[0].mreaddistHSwhite + '</td><td class="text-right">' + json[0].ereaddistHSwhite + '</td><td class="text-right">' + json[0].apreadstateHSwhite + '</td><td class="text-right">' + json[0].mreadstateHSwhite + '</td><td class="text-right">' + json[0].ereadstateHSwhite + '</td></tr>' + 
        '<tr class="HSreadSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apreadschoolHSblack + '</td><td class="text-right">' + json[0].mreadschoolHSblack + '</td><td class="text-right">' + json[0].ereadschoolHSblack + '</td><td class="text-right">' + json[0].apreaddistHSblack + '</td><td class="text-right">' + json[0].mreaddistHSblack + '</td><td class="text-right">' + json[0].ereaddistHSblack + '</td><td class="text-right">' + json[0].apreadstateHSblack + '</td><td class="text-right">' + json[0].mreadstateHSblack + '</td><td class="text-right">' + json[0].ereadstateHSblack + '</td></tr>' + 
        '<tr class="HSreadSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apreadschoolHShisp + '</td><td class="text-right">' + json[0].mreadschoolHShisp + '</td><td class="text-right">' + json[0].ereadschoolHShisp + '</td><td class="text-right">' + json[0].apreaddistHShisp + '</td><td class="text-right">' + json[0].mreaddistHShisp + '</td><td class="text-right">' + json[0].ereaddistHShisp + '</td><td class="text-right">' + json[0].apreadstateHShisp + '</td><td class="text-right">' + json[0].mreadstateHShisp + '</td><td class="text-right">' + json[0].ereadstateHShisp + '</td></tr>' + 
        '<tr class="HSreadSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apreadschoolHSasian + '</td><td class="text-right">' + json[0].mreadschoolHSasian + '</td><td class="text-right">' + json[0].ereadschoolHSasian + '</td><td class="text-right">' + json[0].apreaddistHSasian + '</td><td class="text-right">' + json[0].mreaddistHSasian + '</td><td class="text-right">' + json[0].ereaddistHSasian + '</td><td class="text-right">' + json[0].apreadstateHSasian + '</td><td class="text-right">' + json[0].mreadstateHSasian + '</td><td class="text-right">' + json[0].ereadstateHSasian + '</td></tr>' + 
        '<tr class="HSreadSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apreadschoolHSlow + '</td><td class="text-right">' + json[0].mreadschoolHSlow + '</td><td class="text-right">' + json[0].ereadschoolHSlow + '</td><td class="text-right">' + json[0].apreaddistHSlow + '</td><td class="text-right">' + json[0].mreaddistHSlow + '</td><td class="text-right">' + json[0].ereaddistHSlow + '</td><td class="text-right">' + json[0].apreadstateHSlow + '</td><td class="text-right">' + json[0].mreadstateHSlow + '</td><td class="text-right">' + json[0].ereadstateHSlow + '</td></tr>' +
        '<tr class="HSreadSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apreadschoolHSlep + '</td><td class="text-right">' + json[0].mreadschoolHSlep + '</td><td class="text-right">' + json[0].ereadschoolHSlep + '</td><td class="text-right">' + json[0].apreaddistHSlep + '</td><td class="text-right">' + json[0].mreaddistHSlep + '</td><td class="text-right">' + json[0].ereaddistHSlep + '</td><td class="text-right">' + json[0].apreadstateHSlep  + '</td><td class="text-right">' + json[0].mreadstateHSlep  + '</td><td class="text-right">' + json[0].ereadstateHSlep + '</td></tr>' +
        '<tr class="HSreadSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].apreadschoolHSiep + '</td><td class="text-right">' + json[0].mreadschoolHSiep + '</td><td class="text-right">' + json[0].ereadschoolHSiep + '</td><td class="text-right">' + json[0].apreaddistHSiep + '</td><td class="text-right">' + json[0].mreaddistHSiep + '</td><td class="text-right">' + json[0].ereaddistHSiep + '</td><td class="text-right">' + json[0].apreadstateHSiep + '</td><td class="text-right">' + json[0].mreadstateHSiep + '</td><td class="text-right">' + json[0].ereadstateHSiep + '</td></tr>' +     
       '<tr><td bgcolor="#e6ebef"><a id="elaiSHOW" href="">ELA I</a></td><td class="text-right" bgcolor="#e6ebef">' + json[0].apELAIschoolall + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mELAIschoolall + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].eELAIschoolall + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].apELAIdistall  + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mELAIdistall  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].eELAIdistall + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].apELAIstateall  + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mELAIstateall  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].eELAIstateall + '</td></tr>' + 
        '<tr class="elaiSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apELAIschoolmale + '</td><td class="text-right">' + json[0].mELAIschoolmale + '</td><td class="text-right">' + json[0].eELAIschoolmale + '</td><td class="text-right">' + json[0].apELAIdistmale + '</td><td class="text-right">' + json[0].mELAIdistmale + '</td><td class="text-right">' + json[0].eELAIdistmale + '</td><td class="text-right">' + json[0].apELAIstatemale + '</td><td class="text-right">' + json[0].mELAIstatemale + '</td><td class="text-right">' + json[0].eELAIstatemale + '</td></tr>' + 
        '<tr class="elaiSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apELAIschoolfemale + '</td><td class="text-right">' + json[0].mELAIschoolfemale + '</td><td class="text-right">' + json[0].eELAIschoolfemale + '</td><td class="text-right">' + json[0].apELAIdistfemale + '</td><td class="text-right">' + json[0].mELAIdistfemale + '</td><td class="text-right">' + json[0].eELAIdistfemale + '</td><td class="text-right">' + json[0].apELAIstatefemale + '</td><td class="text-right">' + json[0].mELAIstatefemale + '</td><td class="text-right">' + json[0].eELAIstatefemale + '</td></tr>' + 
        '<tr class="elaiSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apELAIschoolwhite + '</td><td class="text-right">' + json[0].mELAIschoolwhite + '</td><td class="text-right">' + json[0].eELAIschoolwhite + '</td><td class="text-right">' + json[0].apELAIdistwhite + '</td><td class="text-right">' + json[0].mELAIdistwhite + '</td><td class="text-right">' + json[0].eELAIdistwhite + '</td><td class="text-right">' + json[0].apELAIstatewhite + '</td><td class="text-right">' + json[0].mELAIstatewhite + '</td><td class="text-right">' + json[0].eELAIstatewhite + '</td></tr>' + 
        '<tr class="elaiSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apELAIschoolblack + '</td><td class="text-right">' + json[0].mELAIschoolblack + '</td><td class="text-right">' + json[0].eELAIschoolblack + '</td><td class="text-right">' + json[0].apELAIdistblack + '</td><td class="text-right">' + json[0].mELAIdistblack + '</td><td class="text-right">' + json[0].eELAIdistblack + '</td><td class="text-right">' + json[0].apELAIstateblack + '</td><td class="text-right">' + json[0].mELAIstateblack + '</td><td class="text-right">' + json[0].eELAIstateblack + '</td></tr>' + 
        '<tr class="elaiSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apELAIschoolhisp + '</td><td class="text-right">' + json[0].mELAIschoolhisp + '</td><td class="text-right">' + json[0].eELAIschoolhisp + '</td><td class="text-right">' + json[0].apELAIdisthisp + '</td><td class="text-right">' + json[0].mELAIdisthisp + '</td><td class="text-right">' + json[0].eELAIdisthisp + '</td><td class="text-right">' + json[0].apELAIstatehisp + '</td><td class="text-right">' + json[0].mELAIstatehisp + '</td><td class="text-right">' + json[0].eELAIstatehisp + '</td></tr>' + 
        '<tr class="elaiSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apELAIschoolasian + '</td><td class="text-right">' + json[0].mELAIschoolasian + '</td><td class="text-right">' + json[0].eELAIschoolasian + '</td><td class="text-right">' + json[0].apELAIdistasian + '</td><td class="text-right">' + json[0].mELAIdistasian + '</td><td class="text-right">' + json[0].eELAIdistasian + '</td><td class="text-right">' + json[0].apELAIstateasian + '</td><td class="text-right">' + json[0].mELAIstateasian + '</td><td class="text-right">' + json[0].eELAIstateasian + '</td></tr>' + 
        '<tr class="elaiSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apELAIschoollow + '</td><td class="text-right">' + json[0].mELAIschoollow + '</td><td class="text-right">' + json[0].eELAIschoollow + '</td><td class="text-right">' + json[0].apELAIdistlow + '</td><td class="text-right">' + json[0].mELAIdistlow + '</td><td class="text-right">' + json[0].eELAIdistlow + '</td><td class="text-right">' + json[0].apELAIstatelow + '</td><td class="text-right">' + json[0].mELAIstatelow + '</td><td class="text-right">' + json[0].eELAIstatelow + '</td></tr>' +
        '<tr class="elaiSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apELAIschoollep + '</td><td class="text-right">' + json[0].mELAIschoollep + '</td><td class="text-right">' + json[0].eELAIschoollep + '</td><td class="text-right">' + json[0].apELAIdistlep + '</td><td class="text-right">' + json[0].mELAIdistlep + '</td><td class="text-right">' + json[0].eELAIdistlep + '</td><td class="text-right">' + json[0].apELAIstatelep  + '</td><td class="text-right">' + json[0].mELAIstatelep  + '</td><td class="text-right">' + json[0].eELAIstatelep + '</td></tr>' +
        '<tr class="elaiSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].apELAIschooliep + '</td><td class="text-right">' + json[0].mELAIschooliep + '</td><td class="text-right">' + json[0].eELAIschooliep + '</td><td class="text-right">' + json[0].apELAIdistiep + '</td><td class="text-right">' + json[0].mELAIdistiep + '</td><td class="text-right">' + json[0].eELAIdistiep + '</td><td class="text-right">' + json[0].apELAIstateiep + '</td><td class="text-right">' + json[0].mELAIstateiep + '</td><td class="text-right">' + json[0].eELAIstateiep + '</td></tr>' +     
        '<tr><td bgcolor="#e1e1e1"><a id="elaiiSHOW" href="">ELA II</a></td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apELAIIschoolall + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mELAIIschoolall + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].eELAIIschoolall + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apELAIIdistall  + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mELAIIdistall  + '</td><td class="text-right" bgcolor="#e1e1e1">' +  json[0].eELAIIdistall + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apELAIIstateall  + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mELAIIstateall  + '</td><td class="text-right" bgcolor="#e1e1e1">' +  json[0].eELAIIstateall + '</td></tr>' + 
        '<tr class="elaiiSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apELAIIschoolmale + '</td><td class="text-right">' + json[0].mELAIIschoolmale + '</td><td class="text-right">' + json[0].eELAIIschoolmale + '</td><td class="text-right">' + json[0].apELAIIdistmale + '</td><td class="text-right">' + json[0].mELAIIdistmale + '</td><td class="text-right">' + json[0].eELAIIdistmale + '</td><td class="text-right">' + json[0].apELAIIstatemale + '</td><td class="text-right">' + json[0].mELAIIstatemale + '</td><td class="text-right">' + json[0].eELAIIstatemale + '</td></tr>' + 
        '<tr class="elaiiSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apELAIIschoolfemale + '</td><td class="text-right">' + json[0].mELAIIschoolfemale + '</td><td class="text-right">' + json[0].eELAIIschoolfemale + '</td><td class="text-right">' + json[0].apELAIIdistfemale + '</td><td class="text-right">' + json[0].mELAIIdistfemale + '</td><td class="text-right">' + json[0].eELAIIdistfemale + '</td><td class="text-right">' + json[0].apELAIIstatefemale + '</td><td class="text-right">' + json[0].mELAIIstatefemale + '</td><td class="text-right">' + json[0].eELAIIstatefemale + '</td></tr>' + 
        '<tr class="elaiiSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apELAIIschoolwhite + '</td><td class="text-right">' + json[0].mELAIIschoolwhite + '</td><td class="text-right">' + json[0].eELAIIschoolwhite + '</td><td class="text-right">' + json[0].apELAIIdistwhite + '</td><td class="text-right">' + json[0].mELAIIdistwhite + '</td><td class="text-right">' + json[0].eELAIIdistwhite + '</td><td class="text-right">' + json[0].apELAIIstatewhite + '</td><td class="text-right">' + json[0].mELAIIstatewhite + '</td><td class="text-right">' + json[0].eELAIIstatewhite + '</td></tr>' + 
        '<tr class="elaiiSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apELAIIschoolblack + '</td><td class="text-right">' + json[0].mELAIIschoolblack + '</td><td class="text-right">' + json[0].eELAIIschoolblack + '</td><td class="text-right">' + json[0].apELAIIdistblack + '</td><td class="text-right">' + json[0].mELAIIdistblack + '</td><td class="text-right">' + json[0].eELAIIdistblack + '</td><td class="text-right">' + json[0].apELAIIstateblack + '</td><td class="text-right">' + json[0].mELAIIstateblack + '</td><td class="text-right">' + json[0].eELAIIstateblack + '</td></tr>' + 
        '<tr class="elaiiSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apELAIIschoolhisp + '</td><td class="text-right">' + json[0].mELAIIschoolhisp + '</td><td class="text-right">' + json[0].eELAIIschoolhisp + '</td><td class="text-right">' + json[0].apELAIIdisthisp + '</td><td class="text-right">' + json[0].mELAIIdisthisp + '</td><td class="text-right">' + json[0].eELAIIdisthisp + '</td><td class="text-right">' + json[0].apELAIIstatehisp + '</td><td class="text-right">' + json[0].mELAIIstatehisp + '</td><td class="text-right">' + json[0].eELAIIstatehisp + '</td></tr>' + 
        '<tr class="elaiiSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apELAIIschoolasian + '</td><td class="text-right">' + json[0].mELAIIschoolasian + '</td><td class="text-right">' + json[0].eELAIIschoolasian + '</td><td class="text-right">' + json[0].apELAIIdistasian + '</td><td class="text-right">' + json[0].mELAIIdistasian + '</td><td class="text-right">' + json[0].eELAIIdistasian + '</td><td class="text-right">' + json[0].apELAIIstateasian + '</td><td class="text-right">' + json[0].mELAIIstateasian + '</td><td class="text-right">' + json[0].eELAIIstateasian + '</td></tr>' + 
        '<tr class="elaiiSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apELAIIschoollow + '</td><td class="text-right">' + json[0].mELAIIschoollow + '</td><td class="text-right">' + json[0].eELAIIschoollow + '</td><td class="text-right">' + json[0].apELAIIdistlow + '</td><td class="text-right">' + json[0].mELAIIdistlow + '</td><td class="text-right">' + json[0].eELAIIdistlow + '</td><td class="text-right">' + json[0].apELAIIstatelow + '</td><td class="text-right">' + json[0].mELAIIstatelow + '</td><td class="text-right">' + json[0].eELAIIstatelow + '</td></tr>' +
        '<tr class="elaiiSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apELAIIschoollep + '</td><td class="text-right">' + json[0].mELAIIschoollep + '</td><td class="text-right">' + json[0].eELAIIschoollep + '</td><td class="text-right">' + json[0].apELAIIdistlep + '</td><td class="text-right">' + json[0].mELAIIdistlep + '</td><td class="text-right">' + json[0].eELAIIdistlep + '</td><td class="text-right">' + json[0].apELAIIstatelep  + '</td><td class="text-right">' + json[0].mELAIIstatelep  + '</td><td class="text-right">' + json[0].eELAIIstatelep + '</td></tr>' +
        '<tr class="elaiiSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].apELAIIschooliep + '</td><td class="text-right">' + json[0].mELAIIschooliep + '</td><td class="text-right">' + json[0].eELAIIschooliep + '</td><td class="text-right">' + json[0].apELAIIdistiep + '</td><td class="text-right">' + json[0].mELAIIdistiep + '</td><td class="text-right">' + json[0].eELAIIdistiep + '</td><td class="text-right">' + json[0].apELAIIstateiep + '</td><td class="text-right">' + json[0].mELAIIstateiep + '</td><td class="text-right">' + json[0].eELAIIstateiep + '</td></tr>' +     
        '<tr><td bgcolor="#e6ebef"><a id="elaiiiSHOW" href="">ELA III</a></td><td class="text-right" bgcolor="#e6ebef">' + json[0].apELAIIIschoolall + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mELAIIIschoolall + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].eELAIIIschoolall + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].apELAIIIdistall  + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mELAIIIdistall  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].eELAIIIdistall + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].apELAIIIstateall  + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mELAIIIstateall  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].eELAIIIstateall + '</td></tr>' + 
        '<tr class="elaiiiSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apELAIIIschoolmale + '</td><td class="text-right">' + json[0].mELAIIIschoolmale + '</td><td class="text-right">' + json[0].eELAIIIschoolmale + '</td><td class="text-right">' + json[0].apELAIIIdistmale + '</td><td class="text-right">' + json[0].mELAIIIdistmale + '</td><td class="text-right">' + json[0].eELAIIIdistmale + '</td><td class="text-right">' + json[0].apELAIIIstatemale + '</td><td class="text-right">' + json[0].mELAIIIstatemale + '</td><td class="text-right">' + json[0].eELAIIIstatemale + '</td></tr>' + 
        '<tr class="elaiiiSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apELAIIIschoolfemale + '</td><td class="text-right">' + json[0].mELAIIIschoolfemale + '</td><td class="text-right">' + json[0].eELAIIIschoolfemale + '</td><td class="text-right">' + json[0].apELAIIIdistfemale + '</td><td class="text-right">' + json[0].mELAIIIdistfemale + '</td><td class="text-right">' + json[0].eELAIIIdistfemale + '</td><td class="text-right">' + json[0].apELAIIIstatefemale + '</td><td class="text-right">' + json[0].mELAIIIstatefemale + '</td><td class="text-right">' + json[0].eELAIIIstatefemale + '</td></tr>' + 
        '<tr class="elaiiiSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apELAIIIschoolwhite + '</td><td class="text-right">' + json[0].mELAIIIschoolwhite + '</td><td class="text-right">' + json[0].eELAIIIschoolwhite + '</td><td class="text-right">' + json[0].apELAIIIdistwhite + '</td><td class="text-right">' + json[0].mELAIIIdistwhite + '</td><td class="text-right">' + json[0].eELAIIIdistwhite + '</td><td class="text-right">' + json[0].apELAIIIstatewhite + '</td><td class="text-right">' + json[0].mELAIIIstatewhite + '</td><td class="text-right">' + json[0].eELAIIIstatewhite + '</td></tr>' + 
        '<tr class="elaiiiSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apELAIIIschoolblack + '</td><td class="text-right">' + json[0].mELAIIIschoolblack + '</td><td class="text-right">' + json[0].eELAIIIschoolblack + '</td><td class="text-right">' + json[0].apELAIIIdistblack + '</td><td class="text-right">' + json[0].mELAIIIdistblack + '</td><td class="text-right">' + json[0].eELAIIIdistblack + '</td><td class="text-right">' + json[0].apELAIIIstateblack + '</td><td class="text-right">' + json[0].mELAIIIstateblack + '</td><td class="text-right">' + json[0].eELAIIIstateblack + '</td></tr>' + 
        '<tr class="elaiiiSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apELAIIIschoolhisp + '</td><td class="text-right">' + json[0].mELAIIIschoolhisp + '</td><td class="text-right">' + json[0].eELAIIIschoolhisp + '</td><td class="text-right">' + json[0].apELAIIIdisthisp + '</td><td class="text-right">' + json[0].mELAIIIdisthisp + '</td><td class="text-right">' + json[0].eELAIIIdisthisp + '</td><td class="text-right">' + json[0].apELAIIIstatehisp + '</td><td class="text-right">' + json[0].mELAIIIstatehisp + '</td><td class="text-right">' + json[0].eELAIIIstatehisp + '</td></tr>' + 
        '<tr class="elaiiiSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apELAIIIschoolasian + '</td><td class="text-right">' + json[0].mELAIIIschoolasian + '</td><td class="text-right">' + json[0].eELAIIIschoolasian + '</td><td class="text-right">' + json[0].apELAIIIdistasian + '</td><td class="text-right">' + json[0].mELAIIIdistasian + '</td><td class="text-right">' + json[0].eELAIIIdistasian + '</td><td class="text-right">' + json[0].apELAIIIstateasian + '</td><td class="text-right">' + json[0].mELAIIIstateasian + '</td><td class="text-right">' + json[0].eELAIIIstateasian + '</td></tr>' + 
        '<tr class="elaiiiSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apELAIIIschoollow + '</td><td class="text-right">' + json[0].mELAIIIschoollow + '</td><td class="text-right">' + json[0].eELAIIIschoollow + '</td><td class="text-right">' + json[0].apELAIIIdistlow + '</td><td class="text-right">' + json[0].mELAIIIdistlow + '</td><td class="text-right">' + json[0].eELAIIIdistlow + '</td><td class="text-right">' + json[0].apELAIIIstatelow + '</td><td class="text-right">' + json[0].mELAIIIstatelow + '</td><td class="text-right">' + json[0].eELAIIIstatelow + '</td></tr>' +
        '<tr class="elaiiiSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apELAIIIschoollep + '</td><td class="text-right">' + json[0].mELAIIIschoollep + '</td><td class="text-right">' + json[0].eELAIIIschoollep + '</td><td class="text-right">' + json[0].apELAIIIdistlep + '</td><td class="text-right">' + json[0].mELAIIIdistlep + '</td><td class="text-right">' + json[0].eELAIIIdistlep + '</td><td class="text-right">' + json[0].apELAIIIstatelep  + '</td><td class="text-right">' + json[0].mELAIIIstatelep  + '</td><td class="text-right">' + json[0].eELAIIIstatelep + '</td></tr>' +
        '<tr class="elaiiiSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].apELAIIIschooliep + '</td><td class="text-right">' + json[0].mELAIIIschooliep + '</td><td class="text-right">' + json[0].eELAIIIschooliep + '</td><td class="text-right">' + json[0].apELAIIIdistiep + '</td><td class="text-right">' + json[0].mELAIIIdistiep + '</td><td class="text-right">' + json[0].eELAIIIdistiep + '</td><td class="text-right">' + json[0].apELAIIIstateiep + '</td><td class="text-right">' + json[0].mELAIIIstateiep + '</td><td class="text-right">' + json[0].eELAIIIstateiep + '</td></tr>' +     
        '<tr><td><a id="HSmathSHOW" href=""><strong>ALL MATH</strong></a></td><td class="text-right">' + json[0].apmathschoolHSall + '</td><td class="text-right">' + json[0].mmathschoolHSall + '</td><td class="text-right">' + json[0].emathschoolHSall + '</td><td class="text-right">' + json[0].apmathdistHSall + '</td><td class="text-right">' + json[0].mmathdistHSall + '</td><td class="text-right">' + json[0].emathdistHSall + '</td><td class="text-right">' + json[0].apmathstateHSall + '</td><td class="text-right">' + json[0].mmathstateHSall + '</td><td class="text-right">' + json[0].emathstateHSall + '</td></tr>' + 
        '<tr class="HSmathSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apmathschoolHSmale + '</td><td class="text-right">' + json[0].mmathschoolHSmale + '</td><td class="text-right">' + json[0].emathschoolHSmale + '</td><td class="text-right">' + json[0].apmathdistHSmale + '</td><td class="text-right">' + json[0].mmathdistHSmale + '</td><td class="text-right">' + json[0].emathdistHSmale + '</td><td class="text-right">' + json[0].apmathstateHSmale + '</td><td class="text-right">' + json[0].mmathstateHSmale + '</td><td class="text-right">' + json[0].emathstateHSmale + '</td></tr>' + 
        '<tr class="HSmathSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apmathschoolHSfemale + '</td><td class="text-right">' + json[0].mmathschoolHSfemale + '</td><td class="text-right">' + json[0].emathschoolHSfemale + '</td><td class="text-right">' + json[0].apmathdistHSfemale + '</td><td class="text-right">' + json[0].mmathdistHSfemale + '</td><td class="text-right">' + json[0].emathdistHSfemale + '</td><td class="text-right">' + json[0].apmathstateHSfemale + '</td><td class="text-right">' + json[0].mmathstateHSfemale + '</td><td class="text-right">' + json[0].emathstateHSfemale + '</td></tr>' + 
        '<tr class="HSmathSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apmathschoolHSwhite + '</td><td class="text-right">' + json[0].mmathschoolHSwhite + '</td><td class="text-right">' + json[0].emathschoolHSwhite + '</td><td class="text-right">' + json[0].apmathdistHSwhite + '</td><td class="text-right">' + json[0].mmathdistHSwhite + '</td><td class="text-right">' + json[0].emathdistHSwhite + '</td><td class="text-right">' + json[0].apmathstateHSwhite + '</td><td class="text-right">' + json[0].mmathstateHSwhite + '</td><td class="text-right">' + json[0].emathstateHSwhite + '</td></tr>' + 
        '<tr class="HSmathSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apmathschoolHSblack + '</td><td class="text-right">' + json[0].mmathschoolHSblack + '</td><td class="text-right">' + json[0].emathschoolHSblack + '</td><td class="text-right">' + json[0].apmathdistHSblack + '</td><td class="text-right">' + json[0].mmathdistHSblack + '</td><td class="text-right">' + json[0].emathdistHSblack + '</td><td class="text-right">' + json[0].apmathstateHSblack + '</td><td class="text-right">' + json[0].mmathstateHSblack + '</td><td class="text-right">' + json[0].emathstateHSblack + '</td></tr>' + 
        '<tr class="HSmathSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apmathschoolHShisp + '</td><td class="text-right">' + json[0].mmathschoolHShisp + '</td><td class="text-right">' + json[0].emathschoolHShisp + '</td><td class="text-right">' + json[0].apmathdistHShisp + '</td><td class="text-right">' + json[0].mmathdistHShisp + '</td><td class="text-right">' + json[0].emathdistHShisp + '</td><td class="text-right">' + json[0].apmathstateHShisp + '</td><td class="text-right">' + json[0].mmathstateHShisp + '</td><td class="text-right">' + json[0].emathstateHShisp + '</td></tr>' + 
        '<tr class="HSmathSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apmathschoolHSasian + '</td><td class="text-right">' + json[0].mmathschoolHSasian + '</td><td class="text-right">' + json[0].emathschoolHSasian + '</td><td class="text-right">' + json[0].apmathdistHSasian + '</td><td class="text-right">' + json[0].mmathdistHSasian + '</td><td class="text-right">' + json[0].emathdistHSasian + '</td><td class="text-right">' + json[0].apmathstateHSasian + '</td><td class="text-right">' + json[0].mmathstateHSasian + '</td><td class="text-right">' + json[0].emathstateHSasian + '</td></tr>' + 
        '<tr class="HSmathSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apmathschoolHSlow + '</td><td class="text-right">' + json[0].mmathschoolHSlow + '</td><td class="text-right">' + json[0].emathschoolHSlow + '</td><td class="text-right">' + json[0].apmathdistHSlow + '</td><td class="text-right">' + json[0].mmathdistHSlow + '</td><td class="text-right">' + json[0].emathdistHSlow + '</td><td class="text-right">' + json[0].apmathstateHSlow + '</td><td class="text-right">' + json[0].mmathstateHSlow + '</td><td class="text-right">' + json[0].emathstateHSlow + '</td></tr>' +
        '<tr class="HSmathSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apmathschoolHSlep + '</td><td class="text-right">' + json[0].mmathschoolHSlep + '</td><td class="text-right">' + json[0].emathschoolHSlep + '</td><td class="text-right">' + json[0].apmathdistHSlep + '</td><td class="text-right">' + json[0].mmathdistHSlep + '</td><td class="text-right">' + json[0].emathdistHSlep + '</td><td class="text-right">' + json[0].apmathstateHSlep + '</td><td class="text-right">' + json[0].mmathstateHSlep + '</td><td class="text-right">' + json[0].emathstateHSlep + '</td></tr>' +
        '<tr class="HSmathSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></td><td class="text-right">' + json[0].apmathschoolHSiep + '</td><td class="text-right">' + json[0].mmathschoolHSiep + '</td><td class="text-right">' + json[0].emathschoolHSiep + '</td><td class="text-right">' + json[0].apmathdistHSiep + '</td><td class="text-right">' + json[0].mmathdistHSiep + '</td><td class="text-right">' + json[0].emathdistHSiep + '</td><td class="text-right">' + json[0].apmathstateHSiep + '</td><td class="text-right">' + json[0].mmathstateHSiep + '</td><td class="text-right">' + json[0].emathstateHSiep + '</td></tr>' +     
        '<tr><td bgcolor="#e1e1e1"><a id="algiSHOW" href="">Algebra I</a></td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apALGIschoolall + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mALGIschoolall + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].eALGIschoolall + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apALGIdistall  + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mALGIdistall  + '</td><td class="text-right" bgcolor="#e1e1e1">' +  json[0].eALGIdistall + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apALGIstateall  + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mALGIstateall  + '</td><td class="text-right" bgcolor="#e1e1e1">' +  json[0].eALGIstateall + '</td></tr>' + 
        '<tr class="algiSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apALGIschoolmale + '</td><td class="text-right">' + json[0].mALGIschoolmale + '</td><td class="text-right">' + json[0].eALGIschoolmale + '</td><td class="text-right">' + json[0].apALGIdistmale + '</td><td class="text-right">' + json[0].mALGIdistmale + '</td><td class="text-right">' + json[0].eALGIdistmale + '</td><td class="text-right">' + json[0].apALGIstatemale + '</td><td class="text-right">' + json[0].mALGIstatemale + '</td><td class="text-right">' + json[0].eALGIstatemale + '</td></tr>' + 
        '<tr class="algiSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apALGIschoolfemale + '</td><td class="text-right">' + json[0].mALGIschoolfemale + '</td><td class="text-right">' + json[0].eALGIschoolfemale + '</td><td class="text-right">' + json[0].apALGIdistfemale + '</td><td class="text-right">' + json[0].mALGIdistfemale + '</td><td class="text-right">' + json[0].eALGIdistfemale + '</td><td class="text-right">' + json[0].apALGIstatefemale + '</td><td class="text-right">' + json[0].mALGIstatefemale + '</td><td class="text-right">' + json[0].eALGIstatefemale + '</td></tr>' + 
        '<tr class="algiSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apALGIschoolwhite + '</td><td class="text-right">' + json[0].mALGIschoolwhite + '</td><td class="text-right">' + json[0].eALGIschoolwhite + '</td><td class="text-right">' + json[0].apALGIdistwhite + '</td><td class="text-right">' + json[0].mALGIdistwhite + '</td><td class="text-right">' + json[0].eALGIdistwhite + '</td><td class="text-right">' + json[0].apALGIstatewhite + '</td><td class="text-right">' + json[0].mALGIstatewhite + '</td><td class="text-right">' + json[0].eALGIstatewhite + '</td></tr>' + 
        '<tr class="algiSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apALGIschoolblack + '</td><td class="text-right">' + json[0].mALGIschoolblack + '</td><td class="text-right">' + json[0].eALGIschoolblack + '</td><td class="text-right">' + json[0].apALGIdistblack + '</td><td class="text-right">' + json[0].mALGIdistblack + '</td><td class="text-right">' + json[0].eALGIdistblack + '</td><td class="text-right">' + json[0].apALGIstateblack + '</td><td class="text-right">' + json[0].mALGIstateblack + '</td><td class="text-right">' + json[0].eALGIstateblack + '</td></tr>' + 
        '<tr class="algiSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apALGIschoolhisp + '</td><td class="text-right">' + json[0].mALGIschoolhisp + '</td><td class="text-right">' + json[0].eALGIschoolhisp + '</td><td class="text-right">' + json[0].apALGIdisthisp + '</td><td class="text-right">' + json[0].mALGIdisthisp + '</td><td class="text-right">' + json[0].eALGIdisthisp + '</td><td class="text-right">' + json[0].apALGIstatehisp + '</td><td class="text-right">' + json[0].mALGIstatehisp + '</td><td class="text-right">' + json[0].eALGIstatehisp + '</td></tr>' + 
        '<tr class="algiSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apALGIschoolasian + '</td><td class="text-right">' + json[0].mALGIschoolasian + '</td><td class="text-right">' + json[0].eALGIschoolasian + '</td><td class="text-right">' + json[0].apALGIdistasian + '</td><td class="text-right">' + json[0].mALGIdistasian + '</td><td class="text-right">' + json[0].eALGIdistasian + '</td><td class="text-right">' + json[0].apALGIstateasian + '</td><td class="text-right">' + json[0].mALGIstateasian + '</td><td class="text-right">' + json[0].eALGIstateasian + '</td></tr>' + 
        '<tr class="algiSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apALGIschoollow + '</td><td class="text-right">' + json[0].mALGIschoollow + '</td><td class="text-right">' + json[0].eALGIschoollow + '</td><td class="text-right">' + json[0].apALGIdistlow + '</td><td class="text-right">' + json[0].mALGIdistlow + '</td><td class="text-right">' + json[0].eALGIdistlow + '</td><td class="text-right">' + json[0].apALGIstatelow + '</td><td class="text-right">' + json[0].mALGIstatelow + '</td><td class="text-right">' + json[0].eALGIstatelow + '</td></tr>' +
        '<tr class="algiSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apALGIschoollep + '</td><td class="text-right">' + json[0].mALGIschoollep + '</td><td class="text-right">' + json[0].eALGIschoollep + '</td><td class="text-right">' + json[0].apALGIdistlep + '</td><td class="text-right">' + json[0].mALGIdistlep + '</td><td class="text-right">' + json[0].eALGIdistlep + '</td><td class="text-right">' + json[0].apALGIstatelep  + '</td><td class="text-right">' + json[0].mALGIstatelep  + '</td><td class="text-right">' + json[0].eALGIstatelep + '</td></tr>' +
        '<tr class="algiSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].apALGIschooliep + '</td><td class="text-right">' + json[0].mALGIschooliep + '</td><td class="text-right">' + json[0].eALGIschooliep + '</td><td class="text-right">' + json[0].apALGIdistiep + '</td><td class="text-right">' + json[0].mALGIdistiep + '</td><td class="text-right">' + json[0].eALGIdistiep + '</td><td class="text-right">' + json[0].apALGIstateiep + '</td><td class="text-right">' + json[0].mALGIstateiep + '</td><td class="text-right">' + json[0].eALGIstateiep + '</td></tr>' +     
        '<tr><td bgcolor="#e6ebef"><a id="algiiSHOW" href="">Algebra II</a></td><td class="text-right" bgcolor="#e6ebef">' + json[0].apALGIIschoolall + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mALGIIschoolall + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].eALGIIschoolall + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].apALGIIdistall  + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mALGIIdistall  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].eALGIIdistall + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].apALGIIstateall  + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mALGIIstateall  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].eALGIIstateall + '</td></tr>' + 
        '<tr class="algiiSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apALGIIschoolmale + '</td><td class="text-right">' + json[0].mALGIIschoolmale + '</td><td class="text-right">' + json[0].eALGIIschoolmale + '</td><td class="text-right">' + json[0].apALGIIdistmale + '</td><td class="text-right">' + json[0].mALGIIdistmale + '</td><td class="text-right">' + json[0].eALGIIdistmale + '</td><td class="text-right">' + json[0].apALGIIstatemale + '</td><td class="text-right">' + json[0].mALGIIstatemale + '</td><td class="text-right">' + json[0].eALGIIstatemale + '</td></tr>' + 
        '<tr class="algiiSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apALGIIschoolfemale + '</td><td class="text-right">' + json[0].mALGIIschoolfemale + '</td><td class="text-right">' + json[0].eALGIIschoolfemale + '</td><td class="text-right">' + json[0].apALGIIdistfemale + '</td><td class="text-right">' + json[0].mALGIIdistfemale + '</td><td class="text-right">' + json[0].eALGIIdistfemale + '</td><td class="text-right">' + json[0].apALGIIstatefemale + '</td><td class="text-right">' + json[0].mALGIIstatefemale + '</td><td class="text-right">' + json[0].eALGIIstatefemale + '</td></tr>' + 
        '<tr class="algiiSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apALGIIschoolwhite + '</td><td class="text-right">' + json[0].mALGIIschoolwhite + '</td><td class="text-right">' + json[0].eALGIIschoolwhite + '</td><td class="text-right">' + json[0].apALGIIdistwhite + '</td><td class="text-right">' + json[0].mALGIIdistwhite + '</td><td class="text-right">' + json[0].eALGIIdistwhite + '</td><td class="text-right">' + json[0].apALGIIstatewhite + '</td><td class="text-right">' + json[0].mALGIIstatewhite + '</td><td class="text-right">' + json[0].eALGIIstatewhite + '</td></tr>' + 
        '<tr class="algiiSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apALGIIschoolblack + '</td><td class="text-right">' + json[0].mALGIIschoolblack + '</td><td class="text-right">' + json[0].eALGIIschoolblack + '</td><td class="text-right">' + json[0].apALGIIdistblack + '</td><td class="text-right">' + json[0].mALGIIdistblack + '</td><td class="text-right">' + json[0].eALGIIdistblack + '</td><td class="text-right">' + json[0].apALGIIstateblack + '</td><td class="text-right">' + json[0].mALGIIstateblack + '</td><td class="text-right">' + json[0].eALGIIstateblack + '</td></tr>' + 
        '<tr class="algiiSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apALGIIschoolhisp + '</td><td class="text-right">' + json[0].mALGIIschoolhisp + '</td><td class="text-right">' + json[0].eALGIIschoolhisp + '</td><td class="text-right">' + json[0].apALGIIdisthisp + '</td><td class="text-right">' + json[0].mALGIIdisthisp + '</td><td class="text-right">' + json[0].eALGIIdisthisp + '</td><td class="text-right">' + json[0].apALGIIstatehisp + '</td><td class="text-right">' + json[0].mALGIIstatehisp + '</td><td class="text-right">' + json[0].eALGIIstatehisp + '</td></tr>' + 
        '<tr class="algiiSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apALGIIschoolasian + '</td><td class="text-right">' + json[0].mALGIIschoolasian + '</td><td class="text-right">' + json[0].eALGIIschoolasian + '</td><td class="text-right">' + json[0].apALGIIdistasian + '</td><td class="text-right">' + json[0].mALGIIdistasian + '</td><td class="text-right">' + json[0].eALGIIdistasian + '</td><td class="text-right">' + json[0].apALGIIstateasian + '</td><td class="text-right">' + json[0].mALGIIstateasian + '</td><td class="text-right">' + json[0].eALGIIstateasian + '</td></tr>' + 
        '<tr class="algiiSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apALGIIschoollow + '</td><td class="text-right">' + json[0].mALGIIschoollow + '</td><td class="text-right">' + json[0].eALGIIschoollow + '</td><td class="text-right">' + json[0].apALGIIdistlow + '</td><td class="text-right">' + json[0].mALGIIdistlow + '</td><td class="text-right">' + json[0].eALGIIdistlow + '</td><td class="text-right">' + json[0].apALGIIstatelow + '</td><td class="text-right">' + json[0].mALGIIstatelow + '</td><td class="text-right">' + json[0].eALGIIstatelow + '</td></tr>' +
        '<tr class="algiiSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apALGIIschoollep + '</td><td class="text-right">' + json[0].mALGIIschoollep + '</td><td class="text-right">' + json[0].eALGIIschoollep + '</td><td class="text-right">' + json[0].apALGIIdistlep + '</td><td class="text-right">' + json[0].mALGIIdistlep + '</td><td class="text-right">' + json[0].eALGIIdistlep + '</td><td class="text-right">' + json[0].apALGIIstatelep  + '</td><td class="text-right">' + json[0].mALGIIstatelep  + '</td><td class="text-right">' + json[0].eALGIIstatelep + '</td></tr>' +
        '<tr class="algiiSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].apALGIIschooliep + '</td><td class="text-right">' + json[0].mALGIIschooliep + '</td><td class="text-right">' + json[0].eALGIIschooliep + '</td><td class="text-right">' + json[0].apALGIIdistiep + '</td><td class="text-right">' + json[0].mALGIIdistiep + '</td><td class="text-right">' + json[0].eALGIIdistiep + '</td><td class="text-right">' + json[0].apALGIIstateiep + '</td><td class="text-right">' + json[0].mALGIIstateiep + '</td><td class="text-right">' + json[0].eALGIIstateiep + '</td></tr>' +     
        '<tr><td bgcolor="#e1e1e1"><a id="geoSHOW" href="">Geometry</a></td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apGEOschoolall + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mGEOschoolall + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].eGEOschoolall + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apGEOdistall  + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mGEOdistall  + '</td><td class="text-right" bgcolor="#e1e1e1">' +  json[0].eGEOdistall + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apGEOstateall  + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mGEOstateall  + '</td><td class="text-right" bgcolor="#e1e1e1">' +  json[0].eGEOstateall + '</td></tr>' + 
        '<tr class="geoSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apGEOschoolmale + '</td><td class="text-right">' + json[0].mGEOschoolmale + '</td><td class="text-right">' + json[0].eGEOschoolmale + '</td><td class="text-right">' + json[0].apGEOdistmale + '</td><td class="text-right">' + json[0].mGEOdistmale + '</td><td class="text-right">' + json[0].eGEOdistmale + '</td><td class="text-right">' + json[0].apGEOstatemale + '</td><td class="text-right">' + json[0].mGEOstatemale + '</td><td class="text-right">' + json[0].eGEOstatemale + '</td></tr>' + 
        '<tr class="geoSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apGEOschoolfemale + '</td><td class="text-right">' + json[0].mGEOschoolfemale + '</td><td class="text-right">' + json[0].eGEOschoolfemale + '</td><td class="text-right">' + json[0].apGEOdistfemale + '</td><td class="text-right">' + json[0].mGEOdistfemale + '</td><td class="text-right">' + json[0].eGEOdistfemale + '</td><td class="text-right">' + json[0].apGEOstatefemale + '</td><td class="text-right">' + json[0].mGEOstatefemale + '</td><td class="text-right">' + json[0].eGEOstatefemale + '</td></tr>' + 
        '<tr class="geoSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apGEOschoolwhite + '</td><td class="text-right">' + json[0].mGEOschoolwhite + '</td><td class="text-right">' + json[0].eGEOschoolwhite + '</td><td class="text-right">' + json[0].apGEOdistwhite + '</td><td class="text-right">' + json[0].mGEOdistwhite + '</td><td class="text-right">' + json[0].eGEOdistwhite + '</td><td class="text-right">' + json[0].apGEOstatewhite + '</td><td class="text-right">' + json[0].mGEOstatewhite + '</td><td class="text-right">' + json[0].eGEOstatewhite + '</td></tr>' + 
        '<tr class="geoSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apGEOschoolblack + '</td><td class="text-right">' + json[0].mGEOschoolblack + '</td><td class="text-right">' + json[0].eGEOschoolblack + '</td><td class="text-right">' + json[0].apGEOdistblack + '</td><td class="text-right">' + json[0].mGEOdistblack + '</td><td class="text-right">' + json[0].eGEOdistblack + '</td><td class="text-right">' + json[0].apGEOstateblack + '</td><td class="text-right">' + json[0].mGEOstateblack + '</td><td class="text-right">' + json[0].eGEOstateblack + '</td></tr>' + 
        '<tr class="geoSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apGEOschoolhisp + '</td><td class="text-right">' + json[0].mGEOschoolhisp + '</td><td class="text-right">' + json[0].eGEOschoolhisp + '</td><td class="text-right">' + json[0].apGEOdisthisp + '</td><td class="text-right">' + json[0].mGEOdisthisp + '</td><td class="text-right">' + json[0].eGEOdisthisp + '</td><td class="text-right">' + json[0].apGEOstatehisp + '</td><td class="text-right">' + json[0].mGEOstatehisp + '</td><td class="text-right">' + json[0].eGEOstatehisp + '</td></tr>' + 
        '<tr class="geoSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apGEOschoolasian + '</td><td class="text-right">' + json[0].mGEOschoolasian + '</td><td class="text-right">' + json[0].eGEOschoolasian + '</td><td class="text-right">' + json[0].apGEOdistasian + '</td><td class="text-right">' + json[0].mGEOdistasian + '</td><td class="text-right">' + json[0].eGEOdistasian + '</td><td class="text-right">' + json[0].apGEOstateasian + '</td><td class="text-right">' + json[0].mGEOstateasian + '</td><td class="text-right">' + json[0].eGEOstateasian + '</td></tr>' + 
        '<tr class="geoSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apGEOschoollow + '</td><td class="text-right">' + json[0].mGEOschoollow + '</td><td class="text-right">' + json[0].eGEOschoollow + '</td><td class="text-right">' + json[0].apGEOdistlow + '</td><td class="text-right">' + json[0].mGEOdistlow + '</td><td class="text-right">' + json[0].eGEOdistlow + '</td><td class="text-right">' + json[0].apGEOstatelow + '</td><td class="text-right">' + json[0].mGEOstatelow + '</td><td class="text-right">' + json[0].eGEOstatelow + '</td></tr>' +
        '<tr class="geoSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apGEOschoollep + '</td><td class="text-right">' + json[0].mGEOschoollep + '</td><td class="text-right">' + json[0].eGEOschoollep + '</td><td class="text-right">' + json[0].apGEOdistlep + '</td><td class="text-right">' + json[0].mGEOdistlep + '</td><td class="text-right">' + json[0].eGEOdistlep + '</td><td class="text-right">' + json[0].apGEOstatelep  + '</td><td class="text-right">' + json[0].mGEOstatelep  + '</td><td class="text-right">' + json[0].eGEOstatelep + '</td></tr>' +
        '<tr class="geoSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].apGEOschooliep + '</td><td class="text-right">' + json[0].mGEOschooliep + '</td><td class="text-right">' + json[0].eGEOschooliep + '</td><td class="text-right">' + json[0].apGEOdistiep + '</td><td class="text-right">' + json[0].mGEOdistiep + '</td><td class="text-right">' + json[0].eGEOdistiep + '</td><td class="text-right">' + json[0].apGEOstateiep + '</td><td class="text-right">' + json[0].mGEOstateiep + '</td><td class="text-right">' + json[0].eGEOstateiep + '</td></tr>' +     
        '<tr><td bgcolor="#e6ebef"><a id="mathiSHOW" href="">Math I</a></td><td class="text-right" bgcolor="#e6ebef">' + json[0].apMATHIschoolall + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mMATHIschoolall + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].eMATHIschoolall + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].apMATHIdistall  + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mMATHIdistall  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].eMATHIdistall + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].apMATHIstateall  + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mMATHIstateall  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].eMATHIstateall + '</td></tr>' + 
        '<tr class="mathiSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apMATHIschoolmale + '</td><td class="text-right">' + json[0].mMATHIschoolmale + '</td><td class="text-right">' + json[0].eMATHIschoolmale + '</td><td class="text-right">' + json[0].apMATHIdistmale + '</td><td class="text-right">' + json[0].mMATHIdistmale + '</td><td class="text-right">' + json[0].eMATHIdistmale + '</td><td class="text-right">' + json[0].apMATHIstatemale + '</td><td class="text-right">' + json[0].mMATHIstatemale + '</td><td class="text-right">' + json[0].eMATHIstatemale + '</td></tr>' + 
        '<tr class="mathiSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apMATHIschoolfemale + '</td><td class="text-right">' + json[0].mMATHIschoolfemale + '</td><td class="text-right">' + json[0].eMATHIschoolfemale + '</td><td class="text-right">' + json[0].apMATHIdistfemale + '</td><td class="text-right">' + json[0].mMATHIdistfemale + '</td><td class="text-right">' + json[0].eMATHIdistfemale + '</td><td class="text-right">' + json[0].apMATHIstatefemale + '</td><td class="text-right">' + json[0].mMATHIstatefemale + '</td><td class="text-right">' + json[0].eMATHIstatefemale + '</td></tr>' + 
        '<tr class="mathiSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apMATHIschoolwhite + '</td><td class="text-right">' + json[0].mMATHIschoolwhite + '</td><td class="text-right">' + json[0].eMATHIschoolwhite + '</td><td class="text-right">' + json[0].apMATHIdistwhite + '</td><td class="text-right">' + json[0].mMATHIdistwhite + '</td><td class="text-right">' + json[0].eMATHIdistwhite + '</td><td class="text-right">' + json[0].apMATHIstatewhite + '</td><td class="text-right">' + json[0].mMATHIstatewhite + '</td><td class="text-right">' + json[0].eMATHIstatewhite + '</td></tr>' + 
        '<tr class="mathiSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apMATHIschoolblack + '</td><td class="text-right">' + json[0].mMATHIschoolblack + '</td><td class="text-right">' + json[0].eMATHIschoolblack + '</td><td class="text-right">' + json[0].apMATHIdistblack + '</td><td class="text-right">' + json[0].mMATHIdistblack + '</td><td class="text-right">' + json[0].eMATHIdistblack + '</td><td class="text-right">' + json[0].apMATHIstateblack + '</td><td class="text-right">' + json[0].mMATHIstateblack + '</td><td class="text-right">' + json[0].eMATHIstateblack + '</td></tr>' + 
        '<tr class="mathiSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apMATHIschoolhisp + '</td><td class="text-right">' + json[0].mMATHIschoolhisp + '</td><td class="text-right">' + json[0].eMATHIschoolhisp + '</td><td class="text-right">' + json[0].apMATHIdisthisp + '</td><td class="text-right">' + json[0].mMATHIdisthisp + '</td><td class="text-right">' + json[0].eMATHIdisthisp + '</td><td class="text-right">' + json[0].apMATHIstatehisp + '</td><td class="text-right">' + json[0].mMATHIstatehisp + '</td><td class="text-right">' + json[0].eMATHIstatehisp + '</td></tr>' + 
        '<tr class="mathiSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apMATHIschoolasian + '</td><td class="text-right">' + json[0].mMATHIschoolasian + '</td><td class="text-right">' + json[0].eMATHIschoolasian + '</td><td class="text-right">' + json[0].apMATHIdistasian + '</td><td class="text-right">' + json[0].mMATHIdistasian + '</td><td class="text-right">' + json[0].eMATHIdistasian + '</td><td class="text-right">' + json[0].apMATHIstateasian + '</td><td class="text-right">' + json[0].mMATHIstateasian + '</td><td class="text-right">' + json[0].eMATHIstateasian + '</td></tr>' + 
        '<tr class="mathiSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apMATHIschoollow + '</td><td class="text-right">' + json[0].mMATHIschoollow + '</td><td class="text-right">' + json[0].eMATHIschoollow + '</td><td class="text-right">' + json[0].apMATHIdistlow + '</td><td class="text-right">' + json[0].mMATHIdistlow + '</td><td class="text-right">' + json[0].eMATHIdistlow + '</td><td class="text-right">' + json[0].apMATHIstatelow + '</td><td class="text-right">' + json[0].mMATHIstatelow + '</td><td class="text-right">' + json[0].eMATHIstatelow + '</td></tr>' +
        '<tr class="mathiSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apMATHIschoollep + '</td><td class="text-right">' + json[0].mMATHIschoollep + '</td><td class="text-right">' + json[0].eMATHIschoollep + '</td><td class="text-right">' + json[0].apMATHIdistlep + '</td><td class="text-right">' + json[0].mMATHIdistlep + '</td><td class="text-right">' + json[0].eMATHIdistlep + '</td><td class="text-right">' + json[0].apMATHIstatelep  + '</td><td class="text-right">' + json[0].mMATHIstatelep  + '</td><td class="text-right">' + json[0].eMATHIstatelep + '</td></tr>' +
        '<tr class="mathiSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].apMATHIschooliep + '</td><td class="text-right">' + json[0].mMATHIschooliep + '</td><td class="text-right">' + json[0].eMATHIschooliep + '</td><td class="text-right">' + json[0].apMATHIdistiep + '</td><td class="text-right">' + json[0].mMATHIdistiep + '</td><td class="text-right">' + json[0].eMATHIdistiep + '</td><td class="text-right">' + json[0].apMATHIstateiep + '</td><td class="text-right">' + json[0].mMATHIstateiep + '</td><td class="text-right">' + json[0].eMATHIstateiep + '</td></tr>' +     
        '<tr><td bgcolor="#e1e1e1"><a id="mathiiSHOW" href="">Math II</a></td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apMATHIIschoolall + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mMATHIIschoolall + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].eMATHIIschoolall + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apMATHIIdistall  + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mMATHIIdistall  + '</td><td class="text-right" bgcolor="#e1e1e1">' +  json[0].eMATHIIdistall + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apMATHIIstateall  + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mMATHIIstateall  + '</td><td class="text-right" bgcolor="#e1e1e1">' +  json[0].eMATHIIstateall + '</td></tr>' + 
        '<tr class="mathiiSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apMATHIIschoolmale + '</td><td class="text-right">' + json[0].mMATHIIschoolmale + '</td><td class="text-right">' + json[0].eMATHIIschoolmale + '</td><td class="text-right">' + json[0].apMATHIIdistmale + '</td><td class="text-right">' + json[0].mMATHIIdistmale + '</td><td class="text-right">' + json[0].eMATHIIdistmale + '</td><td class="text-right">' + json[0].apMATHIIstatemale + '</td><td class="text-right">' + json[0].mMATHIIstatemale + '</td><td class="text-right">' + json[0].eMATHIIstatemale + '</td></tr>' + 
        '<tr class="mathiiSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apMATHIIschoolfemale + '</td><td class="text-right">' + json[0].mMATHIIschoolfemale + '</td><td class="text-right">' + json[0].eMATHIIschoolfemale + '</td><td class="text-right">' + json[0].apMATHIIdistfemale + '</td><td class="text-right">' + json[0].mMATHIIdistfemale + '</td><td class="text-right">' + json[0].eMATHIIdistfemale + '</td><td class="text-right">' + json[0].apMATHIIstatefemale + '</td><td class="text-right">' + json[0].mMATHIIstatefemale + '</td><td class="text-right">' + json[0].eMATHIIstatefemale + '</td></tr>' + 
        '<tr class="mathiiSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apMATHIIschoolwhite + '</td><td class="text-right">' + json[0].mMATHIIschoolwhite + '</td><td class="text-right">' + json[0].eMATHIIschoolwhite + '</td><td class="text-right">' + json[0].apMATHIIdistwhite + '</td><td class="text-right">' + json[0].mMATHIIdistwhite + '</td><td class="text-right">' + json[0].eMATHIIdistwhite + '</td><td class="text-right">' + json[0].apMATHIIstatewhite + '</td><td class="text-right">' + json[0].mMATHIIstatewhite + '</td><td class="text-right">' + json[0].eMATHIIstatewhite + '</td></tr>' + 
        '<tr class="mathiiSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apMATHIIschoolblack + '</td><td class="text-right">' + json[0].mMATHIIschoolblack + '</td><td class="text-right">' + json[0].eMATHIIschoolblack + '</td><td class="text-right">' + json[0].apMATHIIdistblack + '</td><td class="text-right">' + json[0].mMATHIIdistblack + '</td><td class="text-right">' + json[0].eMATHIIdistblack + '</td><td class="text-right">' + json[0].apMATHIIstateblack + '</td><td class="text-right">' + json[0].mMATHIIstateblack + '</td><td class="text-right">' + json[0].eMATHIIstateblack + '</td></tr>' + 
        '<tr class="mathiiSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apMATHIIschoolhisp + '</td><td class="text-right">' + json[0].mMATHIIschoolhisp + '</td><td class="text-right">' + json[0].eMATHIIschoolhisp + '</td><td class="text-right">' + json[0].apMATHIIdisthisp + '</td><td class="text-right">' + json[0].mMATHIIdisthisp + '</td><td class="text-right">' + json[0].eMATHIIdisthisp + '</td><td class="text-right">' + json[0].apMATHIIstatehisp + '</td><td class="text-right">' + json[0].mMATHIIstatehisp + '</td><td class="text-right">' + json[0].eMATHIIstatehisp + '</td></tr>' + 
        '<tr class="mathiiSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apMATHIIschoolasian + '</td><td class="text-right">' + json[0].mMATHIIschoolasian + '</td><td class="text-right">' + json[0].eMATHIIschoolasian + '</td><td class="text-right">' + json[0].apMATHIIdistasian + '</td><td class="text-right">' + json[0].mMATHIIdistasian + '</td><td class="text-right">' + json[0].eMATHIIdistasian + '</td><td class="text-right">' + json[0].apMATHIIstateasian + '</td><td class="text-right">' + json[0].mMATHIIstateasian + '</td><td class="text-right">' + json[0].eMATHIIstateasian + '</td></tr>' + 
        '<tr class="mathiiSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apMATHIIschoollow + '</td><td class="text-right">' + json[0].mMATHIIschoollow + '</td><td class="text-right">' + json[0].eMATHIIschoollow + '</td><td class="text-right">' + json[0].apMATHIIdistlow + '</td><td class="text-right">' + json[0].mMATHIIdistlow + '</td><td class="text-right">' + json[0].eMATHIIdistlow + '</td><td class="text-right">' + json[0].apMATHIIstatelow + '</td><td class="text-right">' + json[0].mMATHIIstatelow + '</td><td class="text-right">' + json[0].eMATHIIstatelow + '</td></tr>' +
        '<tr class="mathiiSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apMATHIIschoollep + '</td><td class="text-right">' + json[0].mMATHIIschoollep + '</td><td class="text-right">' + json[0].eMATHIIschoollep + '</td><td class="text-right">' + json[0].apMATHIIdistlep + '</td><td class="text-right">' + json[0].mMATHIIdistlep + '</td><td class="text-right">' + json[0].eMATHIIdistlep + '</td><td class="text-right">' + json[0].apMATHIIstatelep  + '</td><td class="text-right">' + json[0].mMATHIIstatelep  + '</td><td class="text-right">' + json[0].eMATHIIstatelep + '</td></tr>' +
        '<tr class="mathiiSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].apMATHIIschooliep + '</td><td class="text-right">' + json[0].mMATHIIschooliep + '</td><td class="text-right">' + json[0].eMATHIIschooliep + '</td><td class="text-right">' + json[0].apMATHIIdistiep + '</td><td class="text-right">' + json[0].mMATHIIdistiep + '</td><td class="text-right">' + json[0].eMATHIIdistiep + '</td><td class="text-right">' + json[0].apMATHIIstateiep + '</td><td class="text-right">' + json[0].mMATHIIstateiep + '</td><td class="text-right">' + json[0].eMATHIIstateiep + '</td></tr>' +     
        '<tr><td bgcolor="#e6ebef"><a id="mathiiiSHOW" href="">Math III</a></td><td class="text-right" bgcolor="#e6ebef">' + json[0].apMATHIIIschoolall + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mMATHIIIschoolall + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].eMATHIIIschoolall + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].apMATHIIIdistall  + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mMATHIIIdistall  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].eMATHIIIdistall + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].apMATHIIIstateall  + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mMATHIIIstateall  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].eMATHIIIstateall + '</td></tr>' + 
        '<tr class="mathiiiSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apMATHIIIschoolmale + '</td><td class="text-right">' + json[0].mMATHIIIschoolmale + '</td><td class="text-right">' + json[0].eMATHIIIschoolmale + '</td><td class="text-right">' + json[0].apMATHIIIdistmale + '</td><td class="text-right">' + json[0].mMATHIIIdistmale + '</td><td class="text-right">' + json[0].eMATHIIIdistmale + '</td><td class="text-right">' + json[0].apMATHIIIstatemale + '</td><td class="text-right">' + json[0].mMATHIIIstatemale + '</td><td class="text-right">' + json[0].eMATHIIIstatemale + '</td></tr>' + 
        '<tr class="mathiiiSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apMATHIIIschoolfemale + '</td><td class="text-right">' + json[0].mMATHIIIschoolfemale + '</td><td class="text-right">' + json[0].eMATHIIIschoolfemale + '</td><td class="text-right">' + json[0].apMATHIIIdistfemale + '</td><td class="text-right">' + json[0].mMATHIIIdistfemale + '</td><td class="text-right">' + json[0].eMATHIIIdistfemale + '</td><td class="text-right">' + json[0].apMATHIIIstatefemale + '</td><td class="text-right">' + json[0].mMATHIIIstatefemale + '</td><td class="text-right">' + json[0].eMATHIIIstatefemale + '</td></tr>' + 
        '<tr class="mathiiiSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apMATHIIIschoolwhite + '</td><td class="text-right">' + json[0].mMATHIIIschoolwhite + '</td><td class="text-right">' + json[0].eMATHIIIschoolwhite + '</td><td class="text-right">' + json[0].apMATHIIIdistwhite + '</td><td class="text-right">' + json[0].mMATHIIIdistwhite + '</td><td class="text-right">' + json[0].eMATHIIIdistwhite + '</td><td class="text-right">' + json[0].apMATHIIIstatewhite + '</td><td class="text-right">' + json[0].mMATHIIIstatewhite + '</td><td class="text-right">' + json[0].eMATHIIIstatewhite + '</td></tr>' + 
        '<tr class="mathiiiSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apMATHIIIschoolblack + '</td><td class="text-right">' + json[0].mMATHIIIschoolblack + '</td><td class="text-right">' + json[0].eMATHIIIschoolblack + '</td><td class="text-right">' + json[0].apMATHIIIdistblack + '</td><td class="text-right">' + json[0].mMATHIIIdistblack + '</td><td class="text-right">' + json[0].eMATHIIIdistblack + '</td><td class="text-right">' + json[0].apMATHIIIstateblack + '</td><td class="text-right">' + json[0].mMATHIIIstateblack + '</td><td class="text-right">' + json[0].eMATHIIIstateblack + '</td></tr>' + 
        '<tr class="mathiiiSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apMATHIIIschoolhisp + '</td><td class="text-right">' + json[0].mMATHIIIschoolhisp + '</td><td class="text-right">' + json[0].eMATHIIIschoolhisp + '</td><td class="text-right">' + json[0].apMATHIIIdisthisp + '</td><td class="text-right">' + json[0].mMATHIIIdisthisp + '</td><td class="text-right">' + json[0].eMATHIIIdisthisp + '</td><td class="text-right">' + json[0].apMATHIIIstatehisp + '</td><td class="text-right">' + json[0].mMATHIIIstatehisp + '</td><td class="text-right">' + json[0].eMATHIIIstatehisp + '</td></tr>' + 
        '<tr class="mathiiiSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apMATHIIIschoolasian + '</td><td class="text-right">' + json[0].mMATHIIIschoolasian + '</td><td class="text-right">' + json[0].eMATHIIIschoolasian + '</td><td class="text-right">' + json[0].apMATHIIIdistasian + '</td><td class="text-right">' + json[0].mMATHIIIdistasian + '</td><td class="text-right">' + json[0].eMATHIIIdistasian + '</td><td class="text-right">' + json[0].apMATHIIIstateasian + '</td><td class="text-right">' + json[0].mMATHIIIstateasian + '</td><td class="text-right">' + json[0].eMATHIIIstateasian + '</td></tr>' + 
        '<tr class="mathiiiSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apMATHIIIschoollow + '</td><td class="text-right">' + json[0].mMATHIIIschoollow + '</td><td class="text-right">' + json[0].eMATHIIIschoollow + '</td><td class="text-right">' + json[0].apMATHIIIdistlow + '</td><td class="text-right">' + json[0].mMATHIIIdistlow + '</td><td class="text-right">' + json[0].eMATHIIIdistlow + '</td><td class="text-right">' + json[0].apMATHIIIstatelow + '</td><td class="text-right">' + json[0].mMATHIIIstatelow + '</td><td class="text-right">' + json[0].eMATHIIIstatelow + '</td></tr>' +
        '<tr class="mathiiiSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apMATHIIIschoollep + '</td><td class="text-right">' + json[0].mMATHIIIschoollep + '</td><td class="text-right">' + json[0].eMATHIIIschoollep + '</td><td class="text-right">' + json[0].apMATHIIIdistlep + '</td><td class="text-right">' + json[0].mMATHIIIdistlep + '</td><td class="text-right">' + json[0].eMATHIIIdistlep + '</td><td class="text-right">' + json[0].apMATHIIIstatelep  + '</td><td class="text-right">' + json[0].mMATHIIIstatelep  + '</td><td class="text-right">' + json[0].eMATHIIIstatelep + '</td></tr>' +
        '<tr class="mathiiiSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].apMATHIIIschooliep + '</td><td class="text-right">' + json[0].mMATHIIIschooliep + '</td><td class="text-right">' + json[0].eMATHIIIschooliep + '</td><td class="text-right">' + json[0].apMATHIIIdistiep + '</td><td class="text-right">' + json[0].mMATHIIIdistiep + '</td><td class="text-right">' + json[0].eMATHIIIdistiep + '</td><td class="text-right">' + json[0].apMATHIIIstateiep + '</td><td class="text-right">' + json[0].mMATHIIIstateiep + '</td><td class="text-right">' + json[0].eMATHIIIstateiep + '</td></tr>' +     
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
        $('#moreTabs-8alg').html(
        '<br><p><strong><span style="color:red">NEW: </span>Percent 8th-graders taking and passing Algebra I</strong></p>' +
        '<table class="table table-hover table-striped table-condensed"><thead>' + 
        '<tr><th> </th><th class="text-right">SCHOOL</th><th class="text-right">DISTRICT</th><th class="text-right">STATE</th></tr></thead><tbody>' +
        '<tr><td> </td><td class="text-right">' + json[0].perc8algsch + '</td><td class="text-right">' + json[0].perc8algdist + '</td><td class="text-right">' + json[0].perc8algstate + '</td></tr></tbody></table>' +
        '<p><small>Note: A zero or otherwise low score may mean the school does not require Algebra in the eigth grade, or the math class may not qualify as a high-school level Algebra class according to the state.</small></p><hr>'
        );
        $('#moreTabs-8a').html(
        '<p class="Ppadding"><strong>8th grade reading, math and science results</strong><br><img src="images/read.jpg" class="imgfloatL">&nbsp;&nbsp;<i>Tip: Click the subject name for more.</i></p>' + 
        '<table class="table table-hover table-striped table-condensed"><thead>' + 
        '<tr><th><strong> </strong></th><th class="text-center" colspan="3" bgcolor="#e6ebef"><strong>SCHOOL</strong></th><th class="text-center" colspan="3"><strong>DISTRICT</strong></th><th class="text-center" colspan="3" bgcolor="#e6ebef"><strong>STATE</strong></th></tr></thead>' + 
        '<tbody><tr><td><strong>Subject</strong></td><td class="text-right"><strong>App.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>App.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>App.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td></tr>' +  
         '<tr><td bgcolor="#e6ebef"><a id="8readSHOW" href="">Reading</a></td><td class="text-right" bgcolor="#e6ebef">' + json[0].apreadschool8all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadschool8all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].ereadschool8all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].apreaddist8all  + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreaddist8all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereaddist8all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].apreadstate8all  + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadstate8all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereadstate8all + '</td></tr>' + 
        '<tr class="8readSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apreadschool8male + '</td><td class="text-right">' + json[0].mreadschool8male + '</td><td class="text-right">' + json[0].ereadschool8male + '</td><td class="text-right">' + json[0].apreaddist8male + '</td><td class="text-right">' + json[0].mreaddist8male + '</td><td class="text-right">' + json[0].ereaddist8male + '</td><td class="text-right">' + json[0].apreadstate8male + '</td><td class="text-right">' + json[0].mreadstate8male + '</td><td class="text-right">' + json[0].ereadstate8male + '</td></tr>' + 
        '<tr class="8readSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apreadschool8female + '</td><td class="text-right">' + json[0].mreadschool8female + '</td><td class="text-right">' + json[0].ereadschool8female + '</td><td class="text-right">' + json[0].apreaddist8female + '</td><td class="text-right">' + json[0].mreaddist8female + '</td><td class="text-right">' + json[0].ereaddist8female + '</td><td class="text-right">' + json[0].apreadstate8female + '</td><td class="text-right">' + json[0].mreadstate8female + '</td><td class="text-right">' + json[0].ereadstate8female + '</td></tr>' + 
        '<tr class="8readSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apreadschool8white + '</td><td class="text-right">' + json[0].mreadschool8white + '</td><td class="text-right">' + json[0].ereadschool8white + '</td><td class="text-right">' + json[0].apreaddist8white + '</td><td class="text-right">' + json[0].mreaddist8white + '</td><td class="text-right">' + json[0].ereaddist8white + '</td><td class="text-right">' + json[0].apreadstate8white + '</td><td class="text-right">' + json[0].mreadstate8white + '</td><td class="text-right">' + json[0].ereadstate8white + '</td></tr>' + 
        '<tr class="8readSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apreadschool8black + '</td><td class="text-right">' + json[0].mreadschool8black + '</td><td class="text-right">' + json[0].ereadschool8black + '</td><td class="text-right">' + json[0].apreaddist8black + '</td><td class="text-right">' + json[0].mreaddist8black + '</td><td class="text-right">' + json[0].ereaddist8black + '</td><td class="text-right">' + json[0].apreadstate8black + '</td><td class="text-right">' + json[0].mreadstate8black + '</td><td class="text-right">' + json[0].ereadstate8black + '</td></tr>' + 
        '<tr class="8readSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apreadschool8hisp + '</td><td class="text-right">' + json[0].mreadschool8hisp + '</td><td class="text-right">' + json[0].ereadschool8hisp + '</td><td class="text-right">' + json[0].apreaddist8hisp + '</td><td class="text-right">' + json[0].mreaddist8hisp + '</td><td class="text-right">' + json[0].ereaddist8hisp + '</td><td class="text-right">' + json[0].apreadstate8hisp + '</td><td class="text-right">' + json[0].mreadstate8hisp + '</td><td class="text-right">' + json[0].ereadstate8hisp + '</td></tr>' + 
        '<tr class="8readSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apreadschool8asian + '</td><td class="text-right">' + json[0].mreadschool8asian + '</td><td class="text-right">' + json[0].ereadschool8asian + '</td><td class="text-right">' + json[0].apreaddist8asian + '</td><td class="text-right">' + json[0].mreaddist8asian + '</td><td class="text-right">' + json[0].ereaddist8asian + '</td><td class="text-right">' + json[0].apreadstate8asian + '</td><td class="text-right">' + json[0].mreadstate8asian + '</td><td class="text-right">' + json[0].ereadstate8asian + '</td></tr>' + 
        '<tr class="8readSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apreadschool8low + '</td><td class="text-right">' + json[0].mreadschool8low + '</td><td class="text-right">' + json[0].ereadschool8low + '</td><td class="text-right">' + json[0].apreaddist8low + '</td><td class="text-right">' + json[0].mreaddist8low + '</td><td class="text-right">' + json[0].ereaddist8low + '</td><td class="text-right">' + json[0].apreadstate8low + '</td><td class="text-right">' + json[0].mreadstate8low + '</td><td class="text-right">' + json[0].ereadstate8low + '</td></tr>' +
        '<tr class="8readSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apreadschool8lep + '</td><td class="text-right">' + json[0].mreadschool8lep + '</td><td class="text-right">' + json[0].ereadschool8lep + '</td><td class="text-right">' + json[0].apreaddist8lep + '</td><td class="text-right">' + json[0].mreaddist8lep + '</td><td class="text-right">' + json[0].ereaddist8lep + '</td><td class="text-right">' + json[0].apreadstate8lep  + '</td><td class="text-right">' + json[0].mreadstate8lep  + '</td><td class="text-right">' + json[0].ereadstate8lep + '</td></tr>' +
        '<tr class="8readSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].apreadschool8iep + '</td><td class="text-right">' + json[0].mreadschool8iep + '</td><td class="text-right">' + json[0].ereadschool8iep + '</td><td class="text-right">' + json[0].apreaddist8iep + '</td><td class="text-right">' + json[0].mreaddist8iep + '</td><td class="text-right">' + json[0].ereaddist8iep + '</td><td class="text-right">' + json[0].apreadstate8iep + '</td><td class="text-right">' + json[0].mreadstate8iep + '</td><td class="text-right">' + json[0].ereadstate8iep + '</td></tr>' +     
        '<tr><td bgcolor="#e1e1e1"><a id="8mathSHOW" href="">Math</a></td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apmathschool8all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathschool8all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathschool8all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apmathdist8all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathdist8all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathdist8all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apmathstate8all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathstate8all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathstate8all + '</td></tr>' + 
        '<tr class="8mathSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apmathschool8male + '</td><td class="text-right">' + json[0].mmathschool8male + '</td><td class="text-right">' + json[0].emathschool8male + '</td><td class="text-right">' + json[0].apmathdist8male + '</td><td class="text-right">' + json[0].mmathdist8male + '</td><td class="text-right">' + json[0].emathdist8male + '</td><td class="text-right">' + json[0].apmathstate8male + '</td><td class="text-right">' + json[0].mmathstate8male + '</td><td class="text-right">' + json[0].emathstate8male + '</td></tr>' + 
        '<tr class="8mathSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apmathschool8female + '</td><td class="text-right">' + json[0].mmathschool8female + '</td><td class="text-right">' + json[0].emathschool8female + '</td><td class="text-right">' + json[0].apmathdist8female + '</td><td class="text-right">' + json[0].mmathdist8female + '</td><td class="text-right">' + json[0].emathdist8female + '</td><td class="text-right">' + json[0].apmathstate8female + '</td><td class="text-right">' + json[0].mmathstate8female + '</td><td class="text-right">' + json[0].emathstate8female + '</td></tr>' + 
        '<tr class="8mathSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apmathschool8white + '</td><td class="text-right">' + json[0].mmathschool8white + '</td><td class="text-right">' + json[0].emathschool8white + '</td><td class="text-right">' + json[0].apmathdist8white + '</td><td class="text-right">' + json[0].mmathdist8white + '</td><td class="text-right">' + json[0].emathdist8white + '</td><td class="text-right">' + json[0].apmathstate8white + '</td><td class="text-right">' + json[0].mmathstate8white + '</td><td class="text-right">' + json[0].emathstate8white + '</td></tr>' + 
        '<tr class="8mathSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apmathschool8black + '</td><td class="text-right">' + json[0].mmathschool8black + '</td><td class="text-right">' + json[0].emathschool8black + '</td><td class="text-right">' + json[0].apmathdist8black + '</td><td class="text-right">' + json[0].mmathdist8black + '</td><td class="text-right">' + json[0].emathdist8black + '</td><td class="text-right">' + json[0].apmathstate8black + '</td><td class="text-right">' + json[0].mmathstate8black + '</td><td class="text-right">' + json[0].emathstate8black + '</td></tr>' + 
        '<tr class="8mathSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apmathschool8hisp + '</td><td class="text-right">' + json[0].mmathschool8hisp + '</td><td class="text-right">' + json[0].emathschool8hisp + '</td><td class="text-right">' + json[0].apmathdist8hisp + '</td><td class="text-right">' + json[0].mmathdist8hisp + '</td><td class="text-right">' + json[0].emathdist8hisp + '</td><td class="text-right">' + json[0].apmathstate8hisp + '</td><td class="text-right">' + json[0].mmathstate8hisp + '</td><td class="text-right">' + json[0].emathstate8hisp + '</td></tr>' + 
        '<tr class="8mathSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apmathschool8asian + '</td><td class="text-right">' + json[0].mmathschool8asian + '</td><td class="text-right">' + json[0].emathschool8asian + '</td><td class="text-right">' + json[0].apmathdist8asian + '</td><td class="text-right">' + json[0].mmathdist8asian + '</td><td class="text-right">' + json[0].emathdist8asian + '</td><td class="text-right">' + json[0].apmathstate8asian + '</td><td class="text-right">' + json[0].mmathstate8asian + '</td><td class="text-right">' + json[0].emathstate8asian + '</td></tr>' + 
        '<tr class="8mathSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apmathschool8low + '</td><td class="text-right">' + json[0].mmathschool8low + '</td><td class="text-right">' + json[0].emathschool8low + '</td><td class="text-right">' + json[0].apmathdist8low + '</td><td class="text-right">' + json[0].mmathdist8low + '</td><td class="text-right">' + json[0].emathdist8low + '</td><td class="text-right">' + json[0].apmathstate8low + '</td><td class="text-right">' + json[0].mmathstate8low + '</td><td class="text-right">' + json[0].emathstate8low + '</td></tr>' +
        '<tr class="8mathSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apmathschool8lep + '</td><td class="text-right">' + json[0].mmathschool8lep + '</td><td class="text-right">' + json[0].emathschool8lep + '</td><td class="text-right">' + json[0].apmathdist8lep + '</td><td class="text-right">' + json[0].mmathdist8lep + '</td><td class="text-right">' + json[0].emathdist8lep + '</td><td class="text-right">' + json[0].apmathstate8lep + '</td><td class="text-right">' + json[0].mmathstate8lep + '</td><td class="text-right">' + json[0].emathstate8lep + '</td></tr>' +
        '<tr class="8mathSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></td><td class="text-right">' + json[0].apmathschool8iep + '</td><td class="text-right">' + json[0].mmathschool8iep + '</td><td class="text-right">' + json[0].emathschool8iep + '</td><td class="text-right">' + json[0].apmathdist8iep + '</td><td class="text-right">' + json[0].mmathdist8iep + '</td><td class="text-right">' + json[0].emathdist8iep + '</td><td class="text-right">' + json[0].apmathstate8iep + '</td><td class="text-right">' + json[0].mmathstate8iep + '</td><td class="text-right">' + json[0].emathstate8iep + '</td></tr>' +     
        '</tbody></table>'
        );
      } else {
        $('#moreTabs-8').remove();
        $('ul li.list-8').remove();
      };

//perc8algsch
//perc8algdist
//perc8algstate

// This is seventh grade              
        if(json[0].mreadschool7all != '--' || json[0].mmathschool7all != '--'){
          $('#moreTabs-7').show();
          $('ul li.list-7').show();
        $('#moreTabs-7a').html(
        '<p class="Ppadding"><strong>7th grade reading, math and science results</strong><br><img src="images/read.jpg" class="imgfloatL">&nbsp;&nbsp;<i>Tip: Click the subject name for more.</i></p>' + 
        '<table class="table table-hover table-striped table-condensed"><thead>' + 
        '<tr><th><strong> </strong></th><th class="text-center" colspan="3" bgcolor="#e6ebef"><strong>SCHOOL</strong></th><th class="text-center" colspan="3"><strong>DISTRICT</strong></th><th class="text-center" colspan="3" bgcolor="#e6ebef"><strong>STATE</strong></th></tr></thead>' + 
        '<tbody><tr><td><strong>Subject</strong></td><td class="text-right"><strong>App.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>App.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>App.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td></tr>' +  
         '<tr><td bgcolor="#e6ebef"><a id="7readSHOW" href="">Reading</a></td><td class="text-right" bgcolor="#e6ebef">' + json[0].apreadschool7all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadschool7all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].ereadschool7all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].apreaddist7all  + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreaddist7all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereaddist7all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].apreadstate7all  + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadstate7all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereadstate7all + '</td></tr>' + 
        '<tr class="7readSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apreadschool7male + '</td><td class="text-right">' + json[0].mreadschool7male + '</td><td class="text-right">' + json[0].ereadschool7male + '</td><td class="text-right">' + json[0].apreaddist7male + '</td><td class="text-right">' + json[0].mreaddist7male + '</td><td class="text-right">' + json[0].ereaddist7male + '</td><td class="text-right">' + json[0].apreadstate7male + '</td><td class="text-right">' + json[0].mreadstate7male + '</td><td class="text-right">' + json[0].ereadstate7male + '</td></tr>' + 
        '<tr class="7readSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apreadschool7female + '</td><td class="text-right">' + json[0].mreadschool7female + '</td><td class="text-right">' + json[0].ereadschool7female + '</td><td class="text-right">' + json[0].apreaddist7female + '</td><td class="text-right">' + json[0].mreaddist7female + '</td><td class="text-right">' + json[0].ereaddist7female + '</td><td class="text-right">' + json[0].apreadstate7female + '</td><td class="text-right">' + json[0].mreadstate7female + '</td><td class="text-right">' + json[0].ereadstate7female + '</td></tr>' + 
        '<tr class="7readSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apreadschool7white + '</td><td class="text-right">' + json[0].mreadschool7white + '</td><td class="text-right">' + json[0].ereadschool7white + '</td><td class="text-right">' + json[0].apreaddist7white + '</td><td class="text-right">' + json[0].mreaddist7white + '</td><td class="text-right">' + json[0].ereaddist7white + '</td><td class="text-right">' + json[0].apreadstate7white + '</td><td class="text-right">' + json[0].mreadstate7white + '</td><td class="text-right">' + json[0].ereadstate7white + '</td></tr>' + 
        '<tr class="7readSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apreadschool7black + '</td><td class="text-right">' + json[0].mreadschool7black + '</td><td class="text-right">' + json[0].ereadschool7black + '</td><td class="text-right">' + json[0].apreaddist7black + '</td><td class="text-right">' + json[0].mreaddist7black + '</td><td class="text-right">' + json[0].ereaddist7black + '</td><td class="text-right">' + json[0].apreadstate7black + '</td><td class="text-right">' + json[0].mreadstate7black + '</td><td class="text-right">' + json[0].ereadstate7black + '</td></tr>' + 
        '<tr class="7readSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apreadschool7hisp + '</td><td class="text-right">' + json[0].mreadschool7hisp + '</td><td class="text-right">' + json[0].ereadschool7hisp + '</td><td class="text-right">' + json[0].apreaddist7hisp + '</td><td class="text-right">' + json[0].mreaddist7hisp + '</td><td class="text-right">' + json[0].ereaddist7hisp + '</td><td class="text-right">' + json[0].apreadstate7hisp + '</td><td class="text-right">' + json[0].mreadstate7hisp + '</td><td class="text-right">' + json[0].ereadstate7hisp + '</td></tr>' + 
        '<tr class="7readSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apreadschool7asian + '</td><td class="text-right">' + json[0].mreadschool7asian + '</td><td class="text-right">' + json[0].ereadschool7asian + '</td><td class="text-right">' + json[0].apreaddist7asian + '</td><td class="text-right">' + json[0].mreaddist7asian + '</td><td class="text-right">' + json[0].ereaddist7asian + '</td><td class="text-right">' + json[0].apreadstate7asian + '</td><td class="text-right">' + json[0].mreadstate7asian + '</td><td class="text-right">' + json[0].ereadstate7asian + '</td></tr>' + 
        '<tr class="7readSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apreadschool7low + '</td><td class="text-right">' + json[0].mreadschool7low + '</td><td class="text-right">' + json[0].ereadschool7low + '</td><td class="text-right">' + json[0].apreaddist7low + '</td><td class="text-right">' + json[0].mreaddist7low + '</td><td class="text-right">' + json[0].ereaddist7low + '</td><td class="text-right">' + json[0].apreadstate7low + '</td><td class="text-right">' + json[0].mreadstate7low + '</td><td class="text-right">' + json[0].ereadstate7low + '</td></tr>' +
        '<tr class="7readSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apreadschool7lep + '</td><td class="text-right">' + json[0].mreadschool7lep + '</td><td class="text-right">' + json[0].ereadschool7lep + '</td><td class="text-right">' + json[0].apreaddist7lep + '</td><td class="text-right">' + json[0].mreaddist7lep + '</td><td class="text-right">' + json[0].ereaddist7lep + '</td><td class="text-right">' + json[0].apreadstate7lep  + '</td><td class="text-right">' + json[0].mreadstate7lep  + '</td><td class="text-right">' + json[0].ereadstate7lep + '</td></tr>' +
        '<tr class="7readSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].apreadschool7iep + '</td><td class="text-right">' + json[0].mreadschool7iep + '</td><td class="text-right">' + json[0].ereadschool7iep + '</td><td class="text-right">' + json[0].apreaddist7iep + '</td><td class="text-right">' + json[0].mreaddist7iep + '</td><td class="text-right">' + json[0].ereaddist7iep + '</td><td class="text-right">' + json[0].apreadstate7iep + '</td><td class="text-right">' + json[0].mreadstate7iep + '</td><td class="text-right">' + json[0].ereadstate7iep + '</td></tr>' +     
        '<tr><td bgcolor="#e1e1e1"><a id="7mathSHOW" href="">Math</a></td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apmathschool7all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathschool7all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathschool7all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apmathdist7all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathdist7all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathdist7all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apmathstate7all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathstate7all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathstate7all + '</td></tr>' + 
        '<tr class="7mathSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apmathschool7male + '</td><td class="text-right">' + json[0].mmathschool7male + '</td><td class="text-right">' + json[0].emathschool7male + '</td><td class="text-right">' + json[0].apmathdist7male + '</td><td class="text-right">' + json[0].mmathdist7male + '</td><td class="text-right">' + json[0].emathdist7male + '</td><td class="text-right">' + json[0].apmathstate7male + '</td><td class="text-right">' + json[0].mmathstate7male + '</td><td class="text-right">' + json[0].emathstate7male + '</td></tr>' + 
        '<tr class="7mathSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apmathschool7female + '</td><td class="text-right">' + json[0].mmathschool7female + '</td><td class="text-right">' + json[0].emathschool7female + '</td><td class="text-right">' + json[0].apmathdist7female + '</td><td class="text-right">' + json[0].mmathdist7female + '</td><td class="text-right">' + json[0].emathdist7female + '</td><td class="text-right">' + json[0].apmathstate7female + '</td><td class="text-right">' + json[0].mmathstate7female + '</td><td class="text-right">' + json[0].emathstate7female + '</td></tr>' + 
        '<tr class="7mathSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apmathschool7white + '</td><td class="text-right">' + json[0].mmathschool7white + '</td><td class="text-right">' + json[0].emathschool7white + '</td><td class="text-right">' + json[0].apmathdist7white + '</td><td class="text-right">' + json[0].mmathdist7white + '</td><td class="text-right">' + json[0].emathdist7white + '</td><td class="text-right">' + json[0].apmathstate7white + '</td><td class="text-right">' + json[0].mmathstate7white + '</td><td class="text-right">' + json[0].emathstate7white + '</td></tr>' + 
        '<tr class="7mathSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apmathschool7black + '</td><td class="text-right">' + json[0].mmathschool7black + '</td><td class="text-right">' + json[0].emathschool7black + '</td><td class="text-right">' + json[0].apmathdist7black + '</td><td class="text-right">' + json[0].mmathdist7black + '</td><td class="text-right">' + json[0].emathdist7black + '</td><td class="text-right">' + json[0].apmathstate7black + '</td><td class="text-right">' + json[0].mmathstate7black + '</td><td class="text-right">' + json[0].emathstate7black + '</td></tr>' + 
        '<tr class="7mathSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apmathschool7hisp + '</td><td class="text-right">' + json[0].mmathschool7hisp + '</td><td class="text-right">' + json[0].emathschool7hisp + '</td><td class="text-right">' + json[0].apmathdist7hisp + '</td><td class="text-right">' + json[0].mmathdist7hisp + '</td><td class="text-right">' + json[0].emathdist7hisp + '</td><td class="text-right">' + json[0].apmathstate7hisp + '</td><td class="text-right">' + json[0].mmathstate7hisp + '</td><td class="text-right">' + json[0].emathstate7hisp + '</td></tr>' + 
        '<tr class="7mathSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apmathschool7asian + '</td><td class="text-right">' + json[0].mmathschool7asian + '</td><td class="text-right">' + json[0].emathschool7asian + '</td><td class="text-right">' + json[0].apmathdist7asian + '</td><td class="text-right">' + json[0].mmathdist7asian + '</td><td class="text-right">' + json[0].emathdist7asian + '</td><td class="text-right">' + json[0].apmathstate7asian + '</td><td class="text-right">' + json[0].mmathstate7asian + '</td><td class="text-right">' + json[0].emathstate7asian + '</td></tr>' + 
        '<tr class="7mathSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apmathschool7low + '</td><td class="text-right">' + json[0].mmathschool7low + '</td><td class="text-right">' + json[0].emathschool7low + '</td><td class="text-right">' + json[0].apmathdist7low + '</td><td class="text-right">' + json[0].mmathdist7low + '</td><td class="text-right">' + json[0].emathdist7low + '</td><td class="text-right">' + json[0].apmathstate7low + '</td><td class="text-right">' + json[0].mmathstate7low + '</td><td class="text-right">' + json[0].emathstate7low + '</td></tr>' +
        '<tr class="7mathSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apmathschool7lep + '</td><td class="text-right">' + json[0].mmathschool7lep + '</td><td class="text-right">' + json[0].emathschool7lep + '</td><td class="text-right">' + json[0].apmathdist7lep + '</td><td class="text-right">' + json[0].mmathdist7lep + '</td><td class="text-right">' + json[0].emathdist7lep + '</td><td class="text-right">' + json[0].apmathstate7lep + '</td><td class="text-right">' + json[0].mmathstate7lep + '</td><td class="text-right">' + json[0].emathstate7lep + '</td></tr>' +
        '<tr class="7mathSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></td><td class="text-right">' + json[0].apmathschool7iep + '</td><td class="text-right">' + json[0].mmathschool7iep + '</td><td class="text-right">' + json[0].emathschool7iep + '</td><td class="text-right">' + json[0].apmathdist7iep + '</td><td class="text-right">' + json[0].mmathdist7iep + '</td><td class="text-right">' + json[0].emathdist7iep + '</td><td class="text-right">' + json[0].apmathstate7iep + '</td><td class="text-right">' + json[0].mmathstate7iep + '</td><td class="text-right">' + json[0].emathstate7iep + '</td></tr>' +     
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
         '<tr><th><strong> </strong></th><th class="text-center" colspan="3" bgcolor="#e6ebef"><strong>SCHOOL</strong></th><th class="text-center" colspan="3"><strong>DISTRICT</strong></th><th class="text-center" colspan="3" bgcolor="#e6ebef"><strong>STATE</strong></th></tr></thead>' + 
        '<tbody><tr><td><strong>Subject</strong></td><td class="text-right"><strong>App.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>App.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>App.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td></tr>' +  
         '<tr><td bgcolor="#e6ebef"><a id="6readSHOW" href="">Reading</a></td><td class="text-right" bgcolor="#e6ebef">' + json[0].apreadschool6all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadschool6all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].ereadschool6all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].apreaddist6all  + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreaddist6all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereaddist6all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].apreadstate6all  + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadstate6all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereadstate6all + '</td></tr>' + 
        '<tr class="6readSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apreadschool6male + '</td><td class="text-right">' + json[0].mreadschool6male + '</td><td class="text-right">' + json[0].ereadschool6male + '</td><td class="text-right">' + json[0].apreaddist6male + '</td><td class="text-right">' + json[0].mreaddist6male + '</td><td class="text-right">' + json[0].ereaddist6male + '</td><td class="text-right">' + json[0].apreadstate6male + '</td><td class="text-right">' + json[0].mreadstate6male + '</td><td class="text-right">' + json[0].ereadstate6male + '</td></tr>' + 
        '<tr class="6readSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apreadschool6female + '</td><td class="text-right">' + json[0].mreadschool6female + '</td><td class="text-right">' + json[0].ereadschool6female + '</td><td class="text-right">' + json[0].apreaddist6female + '</td><td class="text-right">' + json[0].mreaddist6female + '</td><td class="text-right">' + json[0].ereaddist6female + '</td><td class="text-right">' + json[0].apreadstate6female + '</td><td class="text-right">' + json[0].mreadstate6female + '</td><td class="text-right">' + json[0].ereadstate6female + '</td></tr>' + 
        '<tr class="6readSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apreadschool6white + '</td><td class="text-right">' + json[0].mreadschool6white + '</td><td class="text-right">' + json[0].ereadschool6white + '</td><td class="text-right">' + json[0].apreaddist6white + '</td><td class="text-right">' + json[0].mreaddist6white + '</td><td class="text-right">' + json[0].ereaddist6white + '</td><td class="text-right">' + json[0].apreadstate6white + '</td><td class="text-right">' + json[0].mreadstate6white + '</td><td class="text-right">' + json[0].ereadstate6white + '</td></tr>' + 
        '<tr class="6readSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apreadschool6black + '</td><td class="text-right">' + json[0].mreadschool6black + '</td><td class="text-right">' + json[0].ereadschool6black + '</td><td class="text-right">' + json[0].apreaddist6black + '</td><td class="text-right">' + json[0].mreaddist6black + '</td><td class="text-right">' + json[0].ereaddist6black + '</td><td class="text-right">' + json[0].apreadstate6black + '</td><td class="text-right">' + json[0].mreadstate6black + '</td><td class="text-right">' + json[0].ereadstate6black + '</td></tr>' + 
        '<tr class="6readSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apreadschool6hisp + '</td><td class="text-right">' + json[0].mreadschool6hisp + '</td><td class="text-right">' + json[0].ereadschool6hisp + '</td><td class="text-right">' + json[0].apreaddist6hisp + '</td><td class="text-right">' + json[0].mreaddist6hisp + '</td><td class="text-right">' + json[0].ereaddist6hisp + '</td><td class="text-right">' + json[0].apreadstate6hisp + '</td><td class="text-right">' + json[0].mreadstate6hisp + '</td><td class="text-right">' + json[0].ereadstate6hisp + '</td></tr>' + 
        '<tr class="6readSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apreadschool6asian + '</td><td class="text-right">' + json[0].mreadschool6asian + '</td><td class="text-right">' + json[0].ereadschool6asian + '</td><td class="text-right">' + json[0].apreaddist6asian + '</td><td class="text-right">' + json[0].mreaddist6asian + '</td><td class="text-right">' + json[0].ereaddist6asian + '</td><td class="text-right">' + json[0].apreadstate6asian + '</td><td class="text-right">' + json[0].mreadstate6asian + '</td><td class="text-right">' + json[0].ereadstate6asian + '</td></tr>' + 
        '<tr class="6readSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apreadschool6low + '</td><td class="text-right">' + json[0].mreadschool6low + '</td><td class="text-right">' + json[0].ereadschool6low + '</td><td class="text-right">' + json[0].apreaddist6low + '</td><td class="text-right">' + json[0].mreaddist6low + '</td><td class="text-right">' + json[0].ereaddist6low + '</td><td class="text-right">' + json[0].apreadstate6low + '</td><td class="text-right">' + json[0].mreadstate6low + '</td><td class="text-right">' + json[0].ereadstate6low + '</td></tr>' +
        '<tr class="6readSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apreadschool6lep + '</td><td class="text-right">' + json[0].mreadschool6lep + '</td><td class="text-right">' + json[0].ereadschool6lep + '</td><td class="text-right">' + json[0].apreaddist6lep + '</td><td class="text-right">' + json[0].mreaddist6lep + '</td><td class="text-right">' + json[0].ereaddist6lep + '</td><td class="text-right">' + json[0].apreadstate6lep  + '</td><td class="text-right">' + json[0].mreadstate6lep  + '</td><td class="text-right">' + json[0].ereadstate6lep + '</td></tr>' +
        '<tr class="6readSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].apreadschool6iep + '</td><td class="text-right">' + json[0].mreadschool6iep + '</td><td class="text-right">' + json[0].ereadschool6iep + '</td><td class="text-right">' + json[0].apreaddist6iep + '</td><td class="text-right">' + json[0].mreaddist6iep + '</td><td class="text-right">' + json[0].ereaddist6iep + '</td><td class="text-right">' + json[0].apreadstate6iep + '</td><td class="text-right">' + json[0].mreadstate6iep + '</td><td class="text-right">' + json[0].ereadstate6iep + '</td></tr>' +     
        '<tr><td bgcolor="#e1e1e1"><a id="6mathSHOW" href="">Math</a></td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apmathschool6all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathschool6all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathschool6all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apmathdist6all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathdist6all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathdist6all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apmathstate6all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathstate6all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathstate6all + '</td></tr>' + 
        '<tr class="6mathSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apmathschool6male + '</td><td class="text-right">' + json[0].mmathschool6male + '</td><td class="text-right">' + json[0].emathschool6male + '</td><td class="text-right">' + json[0].apmathdist6male + '</td><td class="text-right">' + json[0].mmathdist6male + '</td><td class="text-right">' + json[0].emathdist6male + '</td><td class="text-right">' + json[0].apmathstate6male + '</td><td class="text-right">' + json[0].mmathstate6male + '</td><td class="text-right">' + json[0].emathstate6male + '</td></tr>' + 
        '<tr class="6mathSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apmathschool6female + '</td><td class="text-right">' + json[0].mmathschool6female + '</td><td class="text-right">' + json[0].emathschool6female + '</td><td class="text-right">' + json[0].apmathdist6female + '</td><td class="text-right">' + json[0].mmathdist6female + '</td><td class="text-right">' + json[0].emathdist6female + '</td><td class="text-right">' + json[0].apmathstate6female + '</td><td class="text-right">' + json[0].mmathstate6female + '</td><td class="text-right">' + json[0].emathstate6female + '</td></tr>' + 
        '<tr class="6mathSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apmathschool6white + '</td><td class="text-right">' + json[0].mmathschool6white + '</td><td class="text-right">' + json[0].emathschool6white + '</td><td class="text-right">' + json[0].apmathdist6white + '</td><td class="text-right">' + json[0].mmathdist6white + '</td><td class="text-right">' + json[0].emathdist6white + '</td><td class="text-right">' + json[0].apmathstate6white + '</td><td class="text-right">' + json[0].mmathstate6white + '</td><td class="text-right">' + json[0].emathstate6white + '</td></tr>' + 
        '<tr class="6mathSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apmathschool6black + '</td><td class="text-right">' + json[0].mmathschool6black + '</td><td class="text-right">' + json[0].emathschool6black + '</td><td class="text-right">' + json[0].apmathdist6black + '</td><td class="text-right">' + json[0].mmathdist6black + '</td><td class="text-right">' + json[0].emathdist6black + '</td><td class="text-right">' + json[0].apmathstate6black + '</td><td class="text-right">' + json[0].mmathstate6black + '</td><td class="text-right">' + json[0].emathstate6black + '</td></tr>' + 
        '<tr class="6mathSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apmathschool6hisp + '</td><td class="text-right">' + json[0].mmathschool6hisp + '</td><td class="text-right">' + json[0].emathschool6hisp + '</td><td class="text-right">' + json[0].apmathdist6hisp + '</td><td class="text-right">' + json[0].mmathdist6hisp + '</td><td class="text-right">' + json[0].emathdist6hisp + '</td><td class="text-right">' + json[0].apmathstate6hisp + '</td><td class="text-right">' + json[0].mmathstate6hisp + '</td><td class="text-right">' + json[0].emathstate6hisp + '</td></tr>' + 
        '<tr class="6mathSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apmathschool6asian + '</td><td class="text-right">' + json[0].mmathschool6asian + '</td><td class="text-right">' + json[0].emathschool6asian + '</td><td class="text-right">' + json[0].apmathdist6asian + '</td><td class="text-right">' + json[0].mmathdist6asian + '</td><td class="text-right">' + json[0].emathdist6asian + '</td><td class="text-right">' + json[0].apmathstate6asian + '</td><td class="text-right">' + json[0].mmathstate6asian + '</td><td class="text-right">' + json[0].emathstate6asian + '</td></tr>' + 
        '<tr class="6mathSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apmathschool6low + '</td><td class="text-right">' + json[0].mmathschool6low + '</td><td class="text-right">' + json[0].emathschool6low + '</td><td class="text-right">' + json[0].apmathdist6low + '</td><td class="text-right">' + json[0].mmathdist6low + '</td><td class="text-right">' + json[0].emathdist6low + '</td><td class="text-right">' + json[0].apmathstate6low + '</td><td class="text-right">' + json[0].mmathstate6low + '</td><td class="text-right">' + json[0].emathstate6low + '</td></tr>' +
        '<tr class="6mathSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apmathschool6lep + '</td><td class="text-right">' + json[0].mmathschool6lep + '</td><td class="text-right">' + json[0].emathschool6lep + '</td><td class="text-right">' + json[0].apmathdist6lep + '</td><td class="text-right">' + json[0].mmathdist6lep + '</td><td class="text-right">' + json[0].emathdist6lep + '</td><td class="text-right">' + json[0].apmathstate6lep + '</td><td class="text-right">' + json[0].mmathstate6lep + '</td><td class="text-right">' + json[0].emathstate6lep + '</td></tr>' +
        '<tr class="6mathSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></td><td class="text-right">' + json[0].apmathschool6iep + '</td><td class="text-right">' + json[0].mmathschool6iep + '</td><td class="text-right">' + json[0].emathschool6iep + '</td><td class="text-right">' + json[0].apmathdist6iep + '</td><td class="text-right">' + json[0].mmathdist6iep + '</td><td class="text-right">' + json[0].emathdist6iep + '</td><td class="text-right">' + json[0].apmathstate6iep + '</td><td class="text-right">' + json[0].mmathstate6iep + '</td><td class="text-right">' + json[0].emathstate6iep + '</td></tr>' +     
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
        '<tr><th><strong> </strong></th><th class="text-center" colspan="3" bgcolor="#e6ebef"><strong>SCHOOL</strong></th><th class="text-center" colspan="3"><strong>DISTRICT</strong></th><th class="text-center" colspan="3" bgcolor="#e6ebef"><strong>STATE</strong></th></tr></thead>' + 
        '<tbody><tr><td><strong>Subject</strong></td><td class="text-right"><strong>App.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>App.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>App.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td></tr>' +  
         '<tr><td bgcolor="#e6ebef"><a id="5readSHOW" href="">Reading</a></td><td class="text-right" bgcolor="#e6ebef">' + json[0].apreadschool5all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadschool5all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].ereadschool5all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].apreaddist5all  + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreaddist5all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereaddist5all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].apreadstate5all  + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadstate5all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereadstate5all + '</td></tr>' + 
        '<tr class="5readSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apreadschool5male + '</td><td class="text-right">' + json[0].mreadschool5male + '</td><td class="text-right">' + json[0].ereadschool5male + '</td><td class="text-right">' + json[0].apreaddist5male + '</td><td class="text-right">' + json[0].mreaddist5male + '</td><td class="text-right">' + json[0].ereaddist5male + '</td><td class="text-right">' + json[0].apreadstate5male + '</td><td class="text-right">' + json[0].mreadstate5male + '</td><td class="text-right">' + json[0].ereadstate5male + '</td></tr>' + 
        '<tr class="5readSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apreadschool5female + '</td><td class="text-right">' + json[0].mreadschool5female + '</td><td class="text-right">' + json[0].ereadschool5female + '</td><td class="text-right">' + json[0].apreaddist5female + '</td><td class="text-right">' + json[0].mreaddist5female + '</td><td class="text-right">' + json[0].ereaddist5female + '</td><td class="text-right">' + json[0].apreadstate5female + '</td><td class="text-right">' + json[0].mreadstate5female + '</td><td class="text-right">' + json[0].ereadstate5female + '</td></tr>' + 
        '<tr class="5readSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apreadschool5white + '</td><td class="text-right">' + json[0].mreadschool5white + '</td><td class="text-right">' + json[0].ereadschool5white + '</td><td class="text-right">' + json[0].apreaddist5white + '</td><td class="text-right">' + json[0].mreaddist5white + '</td><td class="text-right">' + json[0].ereaddist5white + '</td><td class="text-right">' + json[0].apreadstate5white + '</td><td class="text-right">' + json[0].mreadstate5white + '</td><td class="text-right">' + json[0].ereadstate5white + '</td></tr>' + 
        '<tr class="5readSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apreadschool5black + '</td><td class="text-right">' + json[0].mreadschool5black + '</td><td class="text-right">' + json[0].ereadschool5black + '</td><td class="text-right">' + json[0].apreaddist5black + '</td><td class="text-right">' + json[0].mreaddist5black + '</td><td class="text-right">' + json[0].ereaddist5black + '</td><td class="text-right">' + json[0].apreadstate5black + '</td><td class="text-right">' + json[0].mreadstate5black + '</td><td class="text-right">' + json[0].ereadstate5black + '</td></tr>' + 
        '<tr class="5readSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apreadschool5hisp + '</td><td class="text-right">' + json[0].mreadschool5hisp + '</td><td class="text-right">' + json[0].ereadschool5hisp + '</td><td class="text-right">' + json[0].apreaddist5hisp + '</td><td class="text-right">' + json[0].mreaddist5hisp + '</td><td class="text-right">' + json[0].ereaddist5hisp + '</td><td class="text-right">' + json[0].apreadstate5hisp + '</td><td class="text-right">' + json[0].mreadstate5hisp + '</td><td class="text-right">' + json[0].ereadstate5hisp + '</td></tr>' + 
        '<tr class="5readSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apreadschool5asian + '</td><td class="text-right">' + json[0].mreadschool5asian + '</td><td class="text-right">' + json[0].ereadschool5asian + '</td><td class="text-right">' + json[0].apreaddist5asian + '</td><td class="text-right">' + json[0].mreaddist5asian + '</td><td class="text-right">' + json[0].ereaddist5asian + '</td><td class="text-right">' + json[0].apreadstate5asian + '</td><td class="text-right">' + json[0].mreadstate5asian + '</td><td class="text-right">' + json[0].ereadstate5asian + '</td></tr>' + 
        '<tr class="5readSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apreadschool5low + '</td><td class="text-right">' + json[0].mreadschool5low + '</td><td class="text-right">' + json[0].ereadschool5low + '</td><td class="text-right">' + json[0].apreaddist5low + '</td><td class="text-right">' + json[0].mreaddist5low + '</td><td class="text-right">' + json[0].ereaddist5low + '</td><td class="text-right">' + json[0].apreadstate5low + '</td><td class="text-right">' + json[0].mreadstate5low + '</td><td class="text-right">' + json[0].ereadstate5low + '</td></tr>' +
        '<tr class="5readSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apreadschool5lep + '</td><td class="text-right">' + json[0].mreadschool5lep + '</td><td class="text-right">' + json[0].ereadschool5lep + '</td><td class="text-right">' + json[0].apreaddist5lep + '</td><td class="text-right">' + json[0].mreaddist5lep + '</td><td class="text-right">' + json[0].ereaddist5lep + '</td><td class="text-right">' + json[0].apreadstate5lep  + '</td><td class="text-right">' + json[0].mreadstate5lep  + '</td><td class="text-right">' + json[0].ereadstate5lep + '</td></tr>' +
        '<tr class="5readSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].apreadschool5iep + '</td><td class="text-right">' + json[0].mreadschool5iep + '</td><td class="text-right">' + json[0].ereadschool5iep + '</td><td class="text-right">' + json[0].apreaddist5iep + '</td><td class="text-right">' + json[0].mreaddist5iep + '</td><td class="text-right">' + json[0].ereaddist5iep + '</td><td class="text-right">' + json[0].apreadstate5iep + '</td><td class="text-right">' + json[0].mreadstate5iep + '</td><td class="text-right">' + json[0].ereadstate5iep + '</td></tr>' +     
        '<tr><td bgcolor="#e1e1e1"><a id="5mathSHOW" href="">Math</a></td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apmathschool5all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathschool5all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathschool5all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apmathdist5all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathdist5all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathdist5all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apmathstate5all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathstate5all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathstate5all + '</td></tr>' + 
        '<tr class="5mathSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apmathschool5male + '</td><td class="text-right">' + json[0].mmathschool5male + '</td><td class="text-right">' + json[0].emathschool5male + '</td><td class="text-right">' + json[0].apmathdist5male + '</td><td class="text-right">' + json[0].mmathdist5male + '</td><td class="text-right">' + json[0].emathdist5male + '</td><td class="text-right">' + json[0].apmathstate5male + '</td><td class="text-right">' + json[0].mmathstate5male + '</td><td class="text-right">' + json[0].emathstate5male + '</td></tr>' + 
        '<tr class="5mathSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apmathschool5female + '</td><td class="text-right">' + json[0].mmathschool5female + '</td><td class="text-right">' + json[0].emathschool5female + '</td><td class="text-right">' + json[0].apmathdist5female + '</td><td class="text-right">' + json[0].mmathdist5female + '</td><td class="text-right">' + json[0].emathdist5female + '</td><td class="text-right">' + json[0].apmathstate5female + '</td><td class="text-right">' + json[0].mmathstate5female + '</td><td class="text-right">' + json[0].emathstate5female + '</td></tr>' + 
        '<tr class="5mathSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apmathschool5white + '</td><td class="text-right">' + json[0].mmathschool5white + '</td><td class="text-right">' + json[0].emathschool5white + '</td><td class="text-right">' + json[0].apmathdist5white + '</td><td class="text-right">' + json[0].mmathdist5white + '</td><td class="text-right">' + json[0].emathdist5white + '</td><td class="text-right">' + json[0].apmathstate5white + '</td><td class="text-right">' + json[0].mmathstate5white + '</td><td class="text-right">' + json[0].emathstate5white + '</td></tr>' + 
        '<tr class="5mathSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apmathschool5black + '</td><td class="text-right">' + json[0].mmathschool5black + '</td><td class="text-right">' + json[0].emathschool5black + '</td><td class="text-right">' + json[0].apmathdist5black + '</td><td class="text-right">' + json[0].mmathdist5black + '</td><td class="text-right">' + json[0].emathdist5black + '</td><td class="text-right">' + json[0].apmathstate5black + '</td><td class="text-right">' + json[0].mmathstate5black + '</td><td class="text-right">' + json[0].emathstate5black + '</td></tr>' + 
        '<tr class="5mathSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apmathschool5hisp + '</td><td class="text-right">' + json[0].mmathschool5hisp + '</td><td class="text-right">' + json[0].emathschool5hisp + '</td><td class="text-right">' + json[0].apmathdist5hisp + '</td><td class="text-right">' + json[0].mmathdist5hisp + '</td><td class="text-right">' + json[0].emathdist5hisp + '</td><td class="text-right">' + json[0].apmathstate5hisp + '</td><td class="text-right">' + json[0].mmathstate5hisp + '</td><td class="text-right">' + json[0].emathstate5hisp + '</td></tr>' + 
        '<tr class="5mathSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apmathschool5asian + '</td><td class="text-right">' + json[0].mmathschool5asian + '</td><td class="text-right">' + json[0].emathschool5asian + '</td><td class="text-right">' + json[0].apmathdist5asian + '</td><td class="text-right">' + json[0].mmathdist5asian + '</td><td class="text-right">' + json[0].emathdist5asian + '</td><td class="text-right">' + json[0].apmathstate5asian + '</td><td class="text-right">' + json[0].mmathstate5asian + '</td><td class="text-right">' + json[0].emathstate5asian + '</td></tr>' + 
        '<tr class="5mathSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apmathschool5low + '</td><td class="text-right">' + json[0].mmathschool5low + '</td><td class="text-right">' + json[0].emathschool5low + '</td><td class="text-right">' + json[0].apmathdist5low + '</td><td class="text-right">' + json[0].mmathdist5low + '</td><td class="text-right">' + json[0].emathdist5low + '</td><td class="text-right">' + json[0].apmathstate5low + '</td><td class="text-right">' + json[0].mmathstate5low + '</td><td class="text-right">' + json[0].emathstate5low + '</td></tr>' +
        '<tr class="5mathSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apmathschool5lep + '</td><td class="text-right">' + json[0].mmathschool5lep + '</td><td class="text-right">' + json[0].emathschool5lep + '</td><td class="text-right">' + json[0].apmathdist5lep + '</td><td class="text-right">' + json[0].mmathdist5lep + '</td><td class="text-right">' + json[0].emathdist5lep + '</td><td class="text-right">' + json[0].apmathstate5lep + '</td><td class="text-right">' + json[0].mmathstate5lep + '</td><td class="text-right">' + json[0].emathstate5lep + '</td></tr>' +
        '<tr class="5mathSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></td><td class="text-right">' + json[0].apmathschool5iep + '</td><td class="text-right">' + json[0].mmathschool5iep + '</td><td class="text-right">' + json[0].emathschool5iep + '</td><td class="text-right">' + json[0].apmathdist5iep + '</td><td class="text-right">' + json[0].mmathdist5iep + '</td><td class="text-right">' + json[0].emathdist5iep + '</td><td class="text-right">' + json[0].apmathstate5iep + '</td><td class="text-right">' + json[0].mmathstate5iep + '</td><td class="text-right">' + json[0].emathstate5iep + '</td></tr>' +     
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
        '<tr><th><strong> </strong></th><th class="text-center" colspan="3" bgcolor="#e6ebef"><strong>SCHOOL</strong></th><th class="text-center" colspan="3"><strong>DISTRICT</strong></th><th class="text-center" colspan="3" bgcolor="#e6ebef"><strong>STATE</strong></th></tr></thead>' + 
        '<tbody><tr><td><strong>Subject</strong></td><td class="text-right"><strong>App.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>App.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>App.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td></tr>' +  
         '<tr><td bgcolor="#e6ebef"><a id="4readSHOW" href="">Reading</a></td><td class="text-right" bgcolor="#e6ebef">' + json[0].apreadschool4all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadschool4all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].ereadschool4all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].apreaddist4all  + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreaddist4all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereaddist4all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].apreadstate4all  + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadstate4all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereadstate4all + '</td></tr>' + 
        '<tr class="4readSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apreadschool4male + '</td><td class="text-right">' + json[0].mreadschool4male + '</td><td class="text-right">' + json[0].ereadschool4male + '</td><td class="text-right">' + json[0].apreaddist4male + '</td><td class="text-right">' + json[0].mreaddist4male + '</td><td class="text-right">' + json[0].ereaddist4male + '</td><td class="text-right">' + json[0].apreadstate4male + '</td><td class="text-right">' + json[0].mreadstate4male + '</td><td class="text-right">' + json[0].ereadstate4male + '</td></tr>' + 
        '<tr class="4readSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apreadschool4female + '</td><td class="text-right">' + json[0].mreadschool4female + '</td><td class="text-right">' + json[0].ereadschool4female + '</td><td class="text-right">' + json[0].apreaddist4female + '</td><td class="text-right">' + json[0].mreaddist4female + '</td><td class="text-right">' + json[0].ereaddist4female + '</td><td class="text-right">' + json[0].apreadstate4female + '</td><td class="text-right">' + json[0].mreadstate4female + '</td><td class="text-right">' + json[0].ereadstate4female + '</td></tr>' + 
        '<tr class="4readSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apreadschool4white + '</td><td class="text-right">' + json[0].mreadschool4white + '</td><td class="text-right">' + json[0].ereadschool4white + '</td><td class="text-right">' + json[0].apreaddist4white + '</td><td class="text-right">' + json[0].mreaddist4white + '</td><td class="text-right">' + json[0].ereaddist4white + '</td><td class="text-right">' + json[0].apreadstate4white + '</td><td class="text-right">' + json[0].mreadstate4white + '</td><td class="text-right">' + json[0].ereadstate4white + '</td></tr>' + 
        '<tr class="4readSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apreadschool4black + '</td><td class="text-right">' + json[0].mreadschool4black + '</td><td class="text-right">' + json[0].ereadschool4black + '</td><td class="text-right">' + json[0].apreaddist4black + '</td><td class="text-right">' + json[0].mreaddist4black + '</td><td class="text-right">' + json[0].ereaddist4black + '</td><td class="text-right">' + json[0].apreadstate4black + '</td><td class="text-right">' + json[0].mreadstate4black + '</td><td class="text-right">' + json[0].ereadstate4black + '</td></tr>' + 
        '<tr class="4readSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apreadschool4hisp + '</td><td class="text-right">' + json[0].mreadschool4hisp + '</td><td class="text-right">' + json[0].ereadschool4hisp + '</td><td class="text-right">' + json[0].apreaddist4hisp + '</td><td class="text-right">' + json[0].mreaddist4hisp + '</td><td class="text-right">' + json[0].ereaddist4hisp + '</td><td class="text-right">' + json[0].apreadstate4hisp + '</td><td class="text-right">' + json[0].mreadstate4hisp + '</td><td class="text-right">' + json[0].ereadstate4hisp + '</td></tr>' + 
        '<tr class="4readSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apreadschool4asian + '</td><td class="text-right">' + json[0].mreadschool4asian + '</td><td class="text-right">' + json[0].ereadschool4asian + '</td><td class="text-right">' + json[0].apreaddist4asian + '</td><td class="text-right">' + json[0].mreaddist4asian + '</td><td class="text-right">' + json[0].ereaddist4asian + '</td><td class="text-right">' + json[0].apreadstate4asian + '</td><td class="text-right">' + json[0].mreadstate4asian + '</td><td class="text-right">' + json[0].ereadstate4asian + '</td></tr>' + 
        '<tr class="4readSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apreadschool4low + '</td><td class="text-right">' + json[0].mreadschool4low + '</td><td class="text-right">' + json[0].ereadschool4low + '</td><td class="text-right">' + json[0].apreaddist4low + '</td><td class="text-right">' + json[0].mreaddist4low + '</td><td class="text-right">' + json[0].ereaddist4low + '</td><td class="text-right">' + json[0].apreadstate4low + '</td><td class="text-right">' + json[0].mreadstate4low + '</td><td class="text-right">' + json[0].ereadstate4low + '</td></tr>' +
        '<tr class="4readSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apreadschool4lep + '</td><td class="text-right">' + json[0].mreadschool4lep + '</td><td class="text-right">' + json[0].ereadschool4lep + '</td><td class="text-right">' + json[0].apreaddist4lep + '</td><td class="text-right">' + json[0].mreaddist4lep + '</td><td class="text-right">' + json[0].ereaddist4lep + '</td><td class="text-right">' + json[0].apreadstate4lep  + '</td><td class="text-right">' + json[0].mreadstate4lep  + '</td><td class="text-right">' + json[0].ereadstate4lep + '</td></tr>' +
        '<tr class="4readSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].apreadschool4iep + '</td><td class="text-right">' + json[0].mreadschool4iep + '</td><td class="text-right">' + json[0].ereadschool4iep + '</td><td class="text-right">' + json[0].apreaddist4iep + '</td><td class="text-right">' + json[0].mreaddist4iep + '</td><td class="text-right">' + json[0].ereaddist4iep + '</td><td class="text-right">' + json[0].apreadstate4iep + '</td><td class="text-right">' + json[0].mreadstate4iep + '</td><td class="text-right">' + json[0].ereadstate4iep + '</td></tr>' +     
        '<tr><td bgcolor="#e1e1e1"><a id="4mathSHOW" href="">Math</a></td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apmathschool4all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathschool4all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathschool4all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apmathdist4all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathdist4all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathdist4all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apmathstate4all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathstate4all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathstate4all + '</td></tr>' + 
        '<tr class="4mathSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apmathschool4male + '</td><td class="text-right">' + json[0].mmathschool4male + '</td><td class="text-right">' + json[0].emathschool4male + '</td><td class="text-right">' + json[0].apmathdist4male + '</td><td class="text-right">' + json[0].mmathdist4male + '</td><td class="text-right">' + json[0].emathdist4male + '</td><td class="text-right">' + json[0].apmathstate4male + '</td><td class="text-right">' + json[0].mmathstate4male + '</td><td class="text-right">' + json[0].emathstate4male + '</td></tr>' + 
        '<tr class="4mathSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apmathschool4female + '</td><td class="text-right">' + json[0].mmathschool4female + '</td><td class="text-right">' + json[0].emathschool4female + '</td><td class="text-right">' + json[0].apmathdist4female + '</td><td class="text-right">' + json[0].mmathdist4female + '</td><td class="text-right">' + json[0].emathdist4female + '</td><td class="text-right">' + json[0].apmathstate4female + '</td><td class="text-right">' + json[0].mmathstate4female + '</td><td class="text-right">' + json[0].emathstate4female + '</td></tr>' + 
        '<tr class="4mathSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apmathschool4white + '</td><td class="text-right">' + json[0].mmathschool4white + '</td><td class="text-right">' + json[0].emathschool4white + '</td><td class="text-right">' + json[0].apmathdist4white + '</td><td class="text-right">' + json[0].mmathdist4white + '</td><td class="text-right">' + json[0].emathdist4white + '</td><td class="text-right">' + json[0].apmathstate4white + '</td><td class="text-right">' + json[0].mmathstate4white + '</td><td class="text-right">' + json[0].emathstate4white + '</td></tr>' + 
        '<tr class="4mathSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apmathschool4black + '</td><td class="text-right">' + json[0].mmathschool4black + '</td><td class="text-right">' + json[0].emathschool4black + '</td><td class="text-right">' + json[0].apmathdist4black + '</td><td class="text-right">' + json[0].mmathdist4black + '</td><td class="text-right">' + json[0].emathdist4black + '</td><td class="text-right">' + json[0].apmathstate4black + '</td><td class="text-right">' + json[0].mmathstate4black + '</td><td class="text-right">' + json[0].emathstate4black + '</td></tr>' + 
        '<tr class="4mathSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apmathschool4hisp + '</td><td class="text-right">' + json[0].mmathschool4hisp + '</td><td class="text-right">' + json[0].emathschool4hisp + '</td><td class="text-right">' + json[0].apmathdist4hisp + '</td><td class="text-right">' + json[0].mmathdist4hisp + '</td><td class="text-right">' + json[0].emathdist4hisp + '</td><td class="text-right">' + json[0].apmathstate4hisp + '</td><td class="text-right">' + json[0].mmathstate4hisp + '</td><td class="text-right">' + json[0].emathstate4hisp + '</td></tr>' + 
        '<tr class="4mathSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apmathschool4asian + '</td><td class="text-right">' + json[0].mmathschool4asian + '</td><td class="text-right">' + json[0].emathschool4asian + '</td><td class="text-right">' + json[0].apmathdist4asian + '</td><td class="text-right">' + json[0].mmathdist4asian + '</td><td class="text-right">' + json[0].emathdist4asian + '</td><td class="text-right">' + json[0].apmathstate4asian + '</td><td class="text-right">' + json[0].mmathstate4asian + '</td><td class="text-right">' + json[0].emathstate4asian + '</td></tr>' + 
        '<tr class="4mathSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apmathschool4low + '</td><td class="text-right">' + json[0].mmathschool4low + '</td><td class="text-right">' + json[0].emathschool4low + '</td><td class="text-right">' + json[0].apmathdist4low + '</td><td class="text-right">' + json[0].mmathdist4low + '</td><td class="text-right">' + json[0].emathdist4low + '</td><td class="text-right">' + json[0].apmathstate4low + '</td><td class="text-right">' + json[0].mmathstate4low + '</td><td class="text-right">' + json[0].emathstate4low + '</td></tr>' +
        '<tr class="4mathSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apmathschool4lep + '</td><td class="text-right">' + json[0].mmathschool4lep + '</td><td class="text-right">' + json[0].emathschool4lep + '</td><td class="text-right">' + json[0].apmathdist4lep + '</td><td class="text-right">' + json[0].mmathdist4lep + '</td><td class="text-right">' + json[0].emathdist4lep + '</td><td class="text-right">' + json[0].apmathstate4lep + '</td><td class="text-right">' + json[0].mmathstate4lep + '</td><td class="text-right">' + json[0].emathstate4lep + '</td></tr>' +
        '<tr class="4mathSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></td><td class="text-right">' + json[0].apmathschool4iep + '</td><td class="text-right">' + json[0].mmathschool4iep + '</td><td class="text-right">' + json[0].emathschool4iep + '</td><td class="text-right">' + json[0].apmathdist4iep + '</td><td class="text-right">' + json[0].mmathdist4iep + '</td><td class="text-right">' + json[0].emathdist4iep + '</td><td class="text-right">' + json[0].apmathstate4iep + '</td><td class="text-right">' + json[0].mmathstate4iep + '</td><td class="text-right">' + json[0].emathstate4iep + '</td></tr>' +     
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
       '<tr><th><strong> </strong></th><th class="text-center" colspan="3" bgcolor="#e6ebef"><strong>SCHOOL</strong></th><th class="text-center" colspan="3"><strong>DISTRICT</strong></th><th class="text-center" colspan="3" bgcolor="#e6ebef"><strong>STATE</strong></th></tr></thead>' + 
        '<tbody><tr><td><strong>Subject</strong></td><td class="text-right"><strong>App.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>App.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td><td class="text-right"><strong>App.</strong></td><td class="text-right"><strong>Mts.</strong></td><td class="text-right"><strong>Exc.</strong></td></tr>' +  
         '<tr><td bgcolor="#e6ebef"><a id="3readSHOW" href="">Reading</a></td><td class="text-right" bgcolor="#e6ebef">' + json[0].apreadschool3all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadschool3all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].ereadschool3all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].apreaddist3all  + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreaddist3all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereaddist3all + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].apreadstate3all  + '</td><td class="text-right" bgcolor="#e6ebef">' + json[0].mreadstate3all  + '</td><td class="text-right" bgcolor="#e6ebef">' +  json[0].ereadstate3all + '</td></tr>' + 
        '<tr class="3readSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apreadschool3male + '</td><td class="text-right">' + json[0].mreadschool3male + '</td><td class="text-right">' + json[0].ereadschool3male + '</td><td class="text-right">' + json[0].apreaddist3male + '</td><td class="text-right">' + json[0].mreaddist3male + '</td><td class="text-right">' + json[0].ereaddist3male + '</td><td class="text-right">' + json[0].apreadstate3male + '</td><td class="text-right">' + json[0].mreadstate3male + '</td><td class="text-right">' + json[0].ereadstate3male + '</td></tr>' + 
        '<tr class="3readSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apreadschool3female + '</td><td class="text-right">' + json[0].mreadschool3female + '</td><td class="text-right">' + json[0].ereadschool3female + '</td><td class="text-right">' + json[0].apreaddist3female + '</td><td class="text-right">' + json[0].mreaddist3female + '</td><td class="text-right">' + json[0].ereaddist3female + '</td><td class="text-right">' + json[0].apreadstate3female + '</td><td class="text-right">' + json[0].mreadstate3female + '</td><td class="text-right">' + json[0].ereadstate3female + '</td></tr>' + 
        '<tr class="3readSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apreadschool3white + '</td><td class="text-right">' + json[0].mreadschool3white + '</td><td class="text-right">' + json[0].ereadschool3white + '</td><td class="text-right">' + json[0].apreaddist3white + '</td><td class="text-right">' + json[0].mreaddist3white + '</td><td class="text-right">' + json[0].ereaddist3white + '</td><td class="text-right">' + json[0].apreadstate3white + '</td><td class="text-right">' + json[0].mreadstate3white + '</td><td class="text-right">' + json[0].ereadstate3white + '</td></tr>' + 
        '<tr class="3readSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apreadschool3black + '</td><td class="text-right">' + json[0].mreadschool3black + '</td><td class="text-right">' + json[0].ereadschool3black + '</td><td class="text-right">' + json[0].apreaddist3black + '</td><td class="text-right">' + json[0].mreaddist3black + '</td><td class="text-right">' + json[0].ereaddist3black + '</td><td class="text-right">' + json[0].apreadstate3black + '</td><td class="text-right">' + json[0].mreadstate3black + '</td><td class="text-right">' + json[0].ereadstate3black + '</td></tr>' + 
        '<tr class="3readSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apreadschool3hisp + '</td><td class="text-right">' + json[0].mreadschool3hisp + '</td><td class="text-right">' + json[0].ereadschool3hisp + '</td><td class="text-right">' + json[0].apreaddist3hisp + '</td><td class="text-right">' + json[0].mreaddist3hisp + '</td><td class="text-right">' + json[0].ereaddist3hisp + '</td><td class="text-right">' + json[0].apreadstate3hisp + '</td><td class="text-right">' + json[0].mreadstate3hisp + '</td><td class="text-right">' + json[0].ereadstate3hisp + '</td></tr>' + 
        '<tr class="3readSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apreadschool3asian + '</td><td class="text-right">' + json[0].mreadschool3asian + '</td><td class="text-right">' + json[0].ereadschool3asian + '</td><td class="text-right">' + json[0].apreaddist3asian + '</td><td class="text-right">' + json[0].mreaddist3asian + '</td><td class="text-right">' + json[0].ereaddist3asian + '</td><td class="text-right">' + json[0].apreadstate3asian + '</td><td class="text-right">' + json[0].mreadstate3asian + '</td><td class="text-right">' + json[0].ereadstate3asian + '</td></tr>' + 
        '<tr class="3readSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apreadschool3low + '</td><td class="text-right">' + json[0].mreadschool3low + '</td><td class="text-right">' + json[0].ereadschool3low + '</td><td class="text-right">' + json[0].apreaddist3low + '</td><td class="text-right">' + json[0].mreaddist3low + '</td><td class="text-right">' + json[0].ereaddist3low + '</td><td class="text-right">' + json[0].apreadstate3low + '</td><td class="text-right">' + json[0].mreadstate3low + '</td><td class="text-right">' + json[0].ereadstate3low + '</td></tr>' +
        '<tr class="3readSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apreadschool3lep + '</td><td class="text-right">' + json[0].mreadschool3lep + '</td><td class="text-right">' + json[0].ereadschool3lep + '</td><td class="text-right">' + json[0].apreaddist3lep + '</td><td class="text-right">' + json[0].mreaddist3lep + '</td><td class="text-right">' + json[0].ereaddist3lep + '</td><td class="text-right">' + json[0].apreadstate3lep  + '</td><td class="text-right">' + json[0].mreadstate3lep  + '</td><td class="text-right">' + json[0].ereadstate3lep + '</td></tr>' +
        '<tr class="3readSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></a></td><td class="text-right">' + json[0].apreadschool3iep + '</td><td class="text-right">' + json[0].mreadschool3iep + '</td><td class="text-right">' + json[0].ereadschool3iep + '</td><td class="text-right">' + json[0].apreaddist3iep + '</td><td class="text-right">' + json[0].mreaddist3iep + '</td><td class="text-right">' + json[0].ereaddist3iep + '</td><td class="text-right">' + json[0].apreadstate3iep + '</td><td class="text-right">' + json[0].mreadstate3iep + '</td><td class="text-right">' + json[0].ereadstate3iep + '</td></tr>' +     
        '<tr><td bgcolor="#e1e1e1"><a id="3mathSHOW" href="">Math</a></td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apmathschool3all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathschool3all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathschool3all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apmathdist3all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathdist3all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathdist3all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].apmathstate3all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].mmathstate3all + '</td><td class="text-right" bgcolor="#e1e1e1">' + json[0].emathstate3all + '</td></tr>' + 
        '<tr class="3mathSPAN" style="display: none"><td>Male</td><td class="text-right">' + json[0].apmathschool3male + '</td><td class="text-right">' + json[0].mmathschool3male + '</td><td class="text-right">' + json[0].emathschool3male + '</td><td class="text-right">' + json[0].apmathdist3male + '</td><td class="text-right">' + json[0].mmathdist3male + '</td><td class="text-right">' + json[0].emathdist3male + '</td><td class="text-right">' + json[0].apmathstate3male + '</td><td class="text-right">' + json[0].mmathstate3male + '</td><td class="text-right">' + json[0].emathstate3male + '</td></tr>' + 
        '<tr class="3mathSPAN" style="display: none"><td>Female</td><td class="text-right">' + json[0].apmathschool3female + '</td><td class="text-right">' + json[0].mmathschool3female + '</td><td class="text-right">' + json[0].emathschool3female + '</td><td class="text-right">' + json[0].apmathdist3female + '</td><td class="text-right">' + json[0].mmathdist3female + '</td><td class="text-right">' + json[0].emathdist3female + '</td><td class="text-right">' + json[0].apmathstate3female + '</td><td class="text-right">' + json[0].mmathstate3female + '</td><td class="text-right">' + json[0].emathstate3female + '</td></tr>' + 
        '<tr class="3mathSPAN" style="display: none"><td>White</td><td class="text-right">' + json[0].apmathschool3white + '</td><td class="text-right">' + json[0].mmathschool3white + '</td><td class="text-right">' + json[0].emathschool3white + '</td><td class="text-right">' + json[0].apmathdist3white + '</td><td class="text-right">' + json[0].mmathdist3white + '</td><td class="text-right">' + json[0].emathdist3white + '</td><td class="text-right">' + json[0].apmathstate3white + '</td><td class="text-right">' + json[0].mmathstate3white + '</td><td class="text-right">' + json[0].emathstate3white + '</td></tr>' + 
        '<tr class="3mathSPAN" style="display: none"><td>Black</td><td class="text-right">' + json[0].apmathschool3black + '</td><td class="text-right">' + json[0].mmathschool3black + '</td><td class="text-right">' + json[0].emathschool3black + '</td><td class="text-right">' + json[0].apmathdist3black + '</td><td class="text-right">' + json[0].mmathdist3black + '</td><td class="text-right">' + json[0].emathdist3black + '</td><td class="text-right">' + json[0].apmathstate3black + '</td><td class="text-right">' + json[0].mmathstate3black + '</td><td class="text-right">' + json[0].emathstate3black + '</td></tr>' + 
        '<tr class="3mathSPAN" style="display: none"><td>Hispanic</td><td class="text-right">' + json[0].apmathschool3hisp + '</td><td class="text-right">' + json[0].mmathschool3hisp + '</td><td class="text-right">' + json[0].emathschool3hisp + '</td><td class="text-right">' + json[0].apmathdist3hisp + '</td><td class="text-right">' + json[0].mmathdist3hisp + '</td><td class="text-right">' + json[0].emathdist3hisp + '</td><td class="text-right">' + json[0].apmathstate3hisp + '</td><td class="text-right">' + json[0].mmathstate3hisp + '</td><td class="text-right">' + json[0].emathstate3hisp + '</td></tr>' + 
        '<tr class="3mathSPAN" style="display: none"><td>Asian</td><td class="text-right">' + json[0].apmathschool3asian + '</td><td class="text-right">' + json[0].mmathschool3asian + '</td><td class="text-right">' + json[0].emathschool3asian + '</td><td class="text-right">' + json[0].apmathdist3asian + '</td><td class="text-right">' + json[0].mmathdist3asian + '</td><td class="text-right">' + json[0].emathdist3asian + '</td><td class="text-right">' + json[0].apmathstate3asian + '</td><td class="text-right">' + json[0].mmathstate3asian + '</td><td class="text-right">' + json[0].emathstate3asian + '</td></tr>' + 
        '<tr class="3mathSPAN" style="display: none"><td>Low Income</td><td class="text-right">' + json[0].apmathschool3low + '</td><td class="text-right">' + json[0].mmathschool3low + '</td><td class="text-right">' + json[0].emathschool3low + '</td><td class="text-right">' + json[0].apmathdist3low + '</td><td class="text-right">' + json[0].mmathdist3low + '</td><td class="text-right">' + json[0].emathdist3low + '</td><td class="text-right">' + json[0].apmathstate3low + '</td><td class="text-right">' + json[0].mmathstate3low + '</td><td class="text-right">' + json[0].emathstate3low + '</td></tr>' +
        '<tr class="3mathSPAN" style="display: none"><td>LEP<sup><a href="#footnotes">1</sup></a></td><td class="text-right">' + json[0].apmathschool3lep + '</td><td class="text-right">' + json[0].mmathschool3lep + '</td><td class="text-right">' + json[0].emathschool3lep + '</td><td class="text-right">' + json[0].apmathdist3lep + '</td><td class="text-right">' + json[0].mmathdist3lep + '</td><td class="text-right">' + json[0].emathdist3lep + '</td><td class="text-right">' + json[0].apmathstate3lep + '</td><td class="text-right">' + json[0].mmathstate3lep + '</td><td class="text-right">' + json[0].emathstate3lep + '</td></tr>' +
        '<tr class="3mathSPAN" style="display: none"><td>IEP<sup><a href="#footnotes">2</sup></td><td class="text-right">' + json[0].apmathschool3iep + '</td><td class="text-right">' + json[0].mmathschool3iep + '</td><td class="text-right">' + json[0].emathschool3iep + '</td><td class="text-right">' + json[0].apmathdist3iep + '</td><td class="text-right">' + json[0].mmathdist3iep + '</td><td class="text-right">' + json[0].emathdist3iep + '</td><td class="text-right">' + json[0].apmathstate3iep + '</td><td class="text-right">' + json[0].mmathstate3iep + '</td><td class="text-right">' + json[0].emathstate3iep + '</td></tr>' +     
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

$("#HSreadSHOW").click(function () {
  $(".HSreadSPAN").toggle();
  return false;
  });
$("#HSmathSHOW").click(function () {
  $(".HSmathSPAN").toggle();
  return false;
  });

$("#elaiSHOW").click(function () {
  $(".elaiSPAN").toggle();
  return false;
  });
$("#elaiiSHOW").click(function () {
  $(".elaiiSPAN").toggle();
  return false;
  });
$("#elaiiiSHOW").click(function () {
  $(".elaiiiSPAN").toggle();
  return false;
  });
$("#algiSHOW").click(function () {
  $(".algiSPAN").toggle();
  return false;
  });
$("#algiiSHOW").click(function () {
  $(".algiiSPAN").toggle();
  return false;
  });
$("#geoSHOW").click(function () {
  $(".geoSPAN").toggle();
  return false;
  });
$("#mathiSHOW").click(function () {
  $(".mathiSPAN").toggle();
  return false;
  });
$("#mathiiSHOW").click(function () {
  $(".mathiiSPAN").toggle();
  return false;
  });
$("#mathiiiSHOW").click(function () {
  $(".mathiiiSPAN").toggle();
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


$('#perctesta').html(
'<p class="Ppadding"><strong>Percent of students not tested</strong></p>' + 
'<table class="table table-hover table-striped table-condensed"><thead>' + 
'<thead><tr><th>SUBJECT</th><th class="text-right">SCHOOL</th><th class="text-right">DISTRICT</th><th class="text-right">STATE</th></tr></thead><tbody>' +
'<tr><td>Reading</td><td class="text-right">' + json[0].nttkreadsch + '</td><td class="text-right">'+ json[0].nttkreaddist + '</td><td class="text-right">' + json[0].nttkreadstate + '</td></tr>' + 
'<tr><td>Math</td><td class="text-right">' + json[0].nttkmathsch + '</td><td class="text-right">'+ json[0].nttkmathdist + '</td><td class="text-right">' + json[0].nttkmathstate + '</td></tr>' + 
'</tbody></table>' +
'<p class="Ppadding"><strong>Percent of students tested</strong></p>' + 
'<table class="table table-hover table-striped table-condensed"><thead>' + 
'<thead><tr><th>SUBJECT</th><th class="text-right">SCHOOL</th><th class="text-right">DISTRICT</th><th class="text-right">STATE</th></tr></thead><tbody>' +
'<tr><td>Reading</td><td class="text-right">' + json[0].tkreadsch + '</td><td class="text-right">'+ json[0].tkreaddist + '</td><td class="text-right">' + json[0].tkreadstate + '</td></tr>' + 
'<tr><td>Math</td><td class="text-right">' + json[0].tkmathsch + '</td><td class="text-right">'+ json[0].tkmathdist + '</td><td class="text-right">' + json[0].tkmathstate + '</td></tr>' + 
'</tbody></table>'

);



//-----------------------------------------
// Here's the Finanicals section

$('#salary').html(
'<table class="table table-hover table-striped table-condensed">' + 
'<thead><tr><th>SALARY</th><th class="text-right">DISTRICT</th><th class="text-right">STATE</th></tr></thead><tbody>' +
'<tr><td class="text-nowrap">Avg. teacher</td><td class="text-right">' + json[0].teachsaldist + '</td><td class="text-right">' + json[0].teachsalstate + '</td></tr>' + 
'<tr><td class="text-nowrap">Avg. administrator</td><td class="text-right">' + json[0].adminsaldist + '</td><td class="text-right">' + json[0].adminsalstate + '</td></tr>' + 
'<tr><td class="text-nowrap"><strong>PER PUPIL SPENDING</strong></td><td class="text-right"><strong>DISTRICT</strong></td><td class="text-right"><strong>STATE</strong></td></tr>' +
'<tr><td class="text-nowrap">Instruction</td><td class="text-right">' + json[0].instexppupildist + '</td><td class="text-right">' + json[0].instexppupilstate + '</td></tr>' + 
'<tr><td class="text-nowrap">Operations</td><td class="text-right">' + json[0].otherexppupildist + '</td><td class="text-right">' + json[0].otherexppupilstate + '</td></tr>' + 
'</tbody></table>'
);


// Revenue charting info

var chartRevDIST = new Highcharts.Chart({
      chart: {
    renderTo: 'fundDIST',
    reflow: true,
      spacingBottom: 15,
      spacingTop: 10,
      spacingLeft: 10,
      spacingRight: 10,
      width: null,
      height: 400,
          type: 'bar'
      },
    title: {
      text: null
  },
    xAxis: {
      categories: ['% Local property taxes', '% State aid', '% Federal aid', '% Other local funding', '% Other state funding'],
      title: {
        text: null
        }
    },
    yAxis: {
      tickInterval: 10,
      min: 0,
      max: 100,
      title: {
        text: 'Percent'
      },
      labels: {
       overflow: 'justify'
       }
      },
      tooltip: {
        crosshairs: true,
        shared: true,
        valueSuffix: ' %'
      },
      plotOptions: {
        bar: {
        dataLabels: {
        enabled: false
        }
      }
    },
  series: [{
        name: 'District',
        data: $.map([json[0].fundlocpropdistperc, json[0].fundstateaiddistperc, json[0].fundfeddistperc, json[0].fundotherdistperc, json[0].fundotherstatedistperc], function (valuedistfund) {
        return isNaN(valuedistfund) ? { y: null } : parseFloat(valuedistfund);
            }),
        index:1,
        legendIndex:0
    }, {
        name: 'State average',
        data: $.map([json[0].fundlocpropstateperc, json[0].fundstateaidstateperc, json[0].fundfedstateperc, json[0].fundotherstateperc, json[0].fundotherstatestateperc], function (valuestatefund) {
        return isNaN(valuestatefund) ? { y: null } : parseFloat(valuestatefund);
            }),
        index:0,
        legendIndex:1
    }]
});

$('#budget').html(
  '<h4>2013-2014 district budget <small>(payable in 2014-\'15 school year)</small></h4>' +
  '<table class="table table-hover table-striped table-condensed"><tbody>' + 
  '<tr><td></td><td colspan="3" class="text-center"><strong>EXPENDITURES</strong></td></tr>' +
  '<tr><td class="text-nowrap"><strong>CATEGORY</strong></td><td class="text-right"><strong>Amount</strong></td><td class="text-right"><strong>% of total<br>district spending</strong></td><td class="text-right"><strong>Versus state<br>% average</strong></td></tr>' +
  '<tr><td class="text-nowrap">Instruction</td><td class="text-right">' + json[0].instdollars + '</td><td class="text-right">' + json[0].instdollarsdistperc + '</td><td class="text-right">' + json[0].instdollarsstateperc + '</td></tr>' + 
  '<tr><td class="text-nowrap">General administration</td><td class="text-right">' + json[0].genadmindollars + '</td><td class="text-right">' + json[0].genadmindistperc + '</td><td class="text-right">' + json[0].genadminstateperc + '</td></tr>' + 
  '<tr><td class="text-nowrap">Support services</td><td class="text-right">' + json[0].supportservdollars + '</td><td class="text-right">' + json[0].supportservdistperc + '</td><td class="text-right">' + json[0].supportservstateperc + '</td></tr>' + 
  '<tr><td class="text-nowrap">Other expenditures</td><td class="text-right">' + json[0].otherexpdollars + '</td><td class="text-right">' + json[0].otherexpdistperc + '</td><td class="text-right">' + json[0].otherexpstateperc + '</td></tr>' + 
  '<tr><td class="text-nowrap">Education fund</td><td class="text-right">' + json[0].edfunddollars + '</td><td class="text-right">' + json[0].edfunddistperc + '</td><td class="text-right">' + json[0].edfundstateperc + '</td></tr>' + 
  '<tr><td class="text-nowrap">Operations</td><td class="text-right">' + json[0].opbmdollars + '</td><td class="text-right">' + json[0].opbmdistperc + '</td><td class="text-right">' + json[0].opbmstateperc + '</td></tr>' + 
  '<tr><td class="text-nowrap">Transportation</td><td class="text-right">' + json[0].transportdollars + '</td><td class="text-right">' + json[0].transportdistperc + '</td><td class="text-right">' + json[0].transportstateperc + '</td></tr>' + 
  '<tr><td class="text-nowrap">Debt service</td><td class="text-right">' + json[0].debtservdollars + '</td><td class="text-right">' + json[0].debtservdistperc + '</td><td class="text-right">' + json[0].debtservstateperc + '</td></tr>' + 
  '<tr><td>Tort</td><td class="text-right">' + json[0].tortdollars + '</td><td class="text-right">' + json[0].tortdistperc + '</td><td class="text-right">' + json[0].tortstateperc + '</td></tr>' + 
  '<tr><td class="text-nowrap">Pension, Social security</td><td class="text-right">' + json[0].muncretsocdollars + '</td><td class="text-right">' + json[0].muncretsocdistperc + '</td><td class="text-right">' + json[0].muncretsocstateperc + '</td></tr>' + 
  '<tr><td class="text-nowrap">Fire prevention and safety</td><td class="text-right">' + json[0].fireprevdollars + '</td><td class="text-right">' + json[0].fireprevdistperc + '</td><td class="text-right">' + json[0].fireprevstateperc + '</td></tr>' + 
  '<tr><td class="text-nowrap">Capital projects</td><td class="text-right">' + json[0].capdollars + '</td><td class="text-right">' + json[0].capdistperc + '</strong></td><td class="text-right">' + json[0].capstateperc + '</td></tr>' + 
  '</table>'
);



//________________________________________
// THIS IS THE SECTION FOR DEMOGRAPHIC INFORMATION


//The students tabular info
        
$('#demographicsStu').html(
  '<table class="table table-hover table-striped table-condensed"><thead>' + 
  '<tr><th></th><th class="text-right">SCHOOL</th><th class="text-right">DISTRICT</th><th class="text-right">STATE</th></tr></thead><tbody>' +
  '<tr><td>All</td><td class="text-right">' + json[0].enroll2015 + '</td><td class="text-right">' + json[0].enrolldist2015 + '</td><td class="text-right">' + json[0].enrollstate + '</td></tr>' + 
  '<tr><td class="text-nowrap">% white</td><td class="text-right">' + json[0].demschoolwhite + '</td><td class="text-right">' + json[0].demdistwhite + '</td><td class="text-right">' + json[0].demstatewhite + '</td></tr>' + 
  '<tr><td class="text-nowrap">% black</td><td class="text-right">' + json[0].demschoolblack + '</td><td class="text-right">' + json[0].demdistblack + '</td><td class="text-right">' + json[0].demstateblack + '</td></tr>' + 
  '<tr><td class="text-nowrap">% hispanic</td><td class="text-right">' + json[0].demschoolhisp + '</td><td class="text-right">' + json[0].demdisthisp + '</td><td class="text-right">' + json[0].demstatehisp + '</td></tr>' + 
  '<tr><td class="text-nowrap">% asian</td><td class="text-right">' + json[0].demschoolasian + '</td><td class="text-right">' + json[0].demdistasian + '</td><td class="text-right">' + json[0].demstateasian + '</td></tr>' + 
  '<tr><td class="text-nowrap">% multiple races</td><td class="text-right">' + json[0].demschoolmulti + '</td><td class="text-right">' + json[0].demdistmulti + '</td><td class="text-right">' + json[0].demstatemulti + '</td></tr>' + 
  '<tr><td class="text-nowrap">% native american</td><td class="text-right">' + json[0].demschoolnatam + '</td><td class="text-right">' + json[0].demdistnatam + '</td><td class="text-right">' + json[0].demstatenatam + '</td></tr>' + 
  '<tr><td class="text-nowrap">% native Hawaiian, other</td><td class="text-right">' + json[0].demschoolnathaw + '</td><td class="text-right">' + json[0].demdistnathaw + '</td><td class="text-right">' + json[0].demstatenathaw + '</td></tr>' + 
  '<tr><td colspan="4"><strong>Additional demographics</strong></td></tr>' +
  '<tr><td class="text-nowrap">% low income</td><td class="text-right">' + json[0].lowinc2015 + '</td><td class="text-right">' + json[0].demdistlow + '</td><td class="text-right">' + json[0].demstatelow + '</td></tr>' + 
  '<tr><td class="text-nowrap">% LEP</td><td class="text-right">' + json[0].demschoollep + '</td><td class="text-right">' + json[0].demdistlep + '</td><td class="text-right">' + json[0].demstatelep + '</td></tr>' + 
  '<tr><td class="text-nowrap">% IEP</td><td class="text-right">' + json[0].demschooliep + '</td><td class="text-right">' + json[0].demdistiep + '</td><td class="text-right">' + json[0].demstateiep + '</td></tr>' + 
  '<tr><td class="text-nowrap">% homeless<sup><a href="#footnotes">3</sup></a></td><td class="text-right">' + json[0].demschoolhome + '</td><td class="text-right">' + json[0].demdisthome + '</td><td class="text-right">' + json[0].demstatehome + '</td></tr>' + 
  '<tr><td class="text-nowrap">Parental involvement (%)</td><td class="text-right">' + json[0].demschoolparent + '</td><td class="text-right">' + json[0].demdistparent + '</td><td class="text-right">' + json[0].demstateparent + '</td></tr>' + 
  '<tr><td class="text-nowrap">Attendance rate (%)<sup><a href="#footnotes">4</sup></a></td><td class="text-right">' + json[0].percattendschoolall + '</td><td class="text-right">' + json[0].percattenddistall + '</td><td class="text-right">' + json[0].percattendstateall + '</td></tr>' +       
  '<tr><td class="text-nowrap">Mobility rate (%)<sup><a href="#footnotes">5</sup></a></td><td class="text-right">' + json[0].percmobileschool + '</td><td class="text-right">' + json[0].percmobiledist + '</td><td class="text-right">' + json[0].percmobilestate + '</td></tr>' +        
  '<tr><td class="text-nowrap">Truancy rate (%)<sup><a href=#footnotes">6</sup></a></td><td class="text-right">' + json[0].perctruantschool + '</td><td class="text-right">' + json[0].perctruantdist + '</td><td class="text-right">' + json[0].perctruantstate + '</td></tr>' +        
  '</tbody></table>'
);

// The students charting info


var chartDEMsch = new Highcharts.Chart({
  chart: {
    renderTo: 'DEMchartSCH',
    reflow: true,
    spacingBottom: 15,
    spacingTop: 10,
    spacingLeft: 10,
    spacingRight: 10,
    height: 400,
        type: 'bar'
  },
    title: {
      text: null
  },
    xAxis: {
      categories: ['White', 'Black', 'Hispanic', 'Asian', 'Multiracial', 'Native American', 'Native Hawaiian, other'],
      title: {
          text: null
      }
  },
  yAxis: {
    tickInterval: 10,
    min: 0,
    max: 100,
    title: {
        text: 'Percent'
    },
    labels: {
        overflow: 'justify'
    }
  },
  tooltip: {
    crosshairs: true,
    shared: true,
    valueSuffix: ' %'
  },
  plotOptions: {
     bar: {
         dataLabels: {
              enabled: false
          }
      }
  },
  series: [{
        name: 'Students in school',
        data: $.map([json[0].demschoolwhite, json[0].demschoolblack, json[0].demschoolhisp, json[0].demschoolasian, json[0].demschoolmulti, json[0].demschoolnatam, json[0].demschoolnathaw], function (valueschdem) {
        return isNaN(valueschdem) ? { y: null } : parseFloat(valueschdem);
            }),
        index:1,
        legendIndex:0
    }, {
       name: 'Students in district',
       data: $.map([json[0].demdistwhite, json[0].demdistblack, json[0].demdisthisp, json[0].demdistasian, json[0].demdistmulti, json[0].demdistnatam, json[0].demdistnathaw], function (valuedistdem) {
        return isNaN(valuedistdem) ? { y: null } : parseFloat(valuedistdem);
            }),
        index:0,
        legendIndex:1
    }]
});


//________________________________________
//The teacher tabular info
        
$('#demographicsTeach').html(
  '<table class="table table-hover table-striped table-condensed">' + 
  '<thead><tr><th></th><th class="text-right">DISTRICT</th><th class="text-right">STATE</th></tr></thead><tbody>' +
  '<tr><td>All</td><td class="text-right">' + json[0].teacherdisttotalfte + '</td><td class="text-right">' + json[0].teacherstatetotalfte + '</td></tr>' + 
  '<tr><td class="text-nowrap">% white</td><td class="text-right">' + json[0].teacherdistpercwhite + '</td><td class="text-right">' + json[0].teacherstatepercwhite + '</td></tr>' + 
  '<tr><td class="text-nowrap">% black</td><td class="text-right">' + json[0].teacherdistpercblack + '</td><td class="text-right">' + json[0].teacherstatepercblack + '</td></tr>' + 
  '<tr><td class="text-nowrap">% hispanic</td><td class="text-right">' + json[0].teacherdistperchisp + '</td><td class="text-right">' + json[0].teacherstateperchisp + '</td></tr>' + 
  '<tr><td class="text-nowrap">% asian</td><td class="text-right">' + json[0].teacherdistpercasian + '</td><td class="text-right">' + json[0].teacherstatepercasian + '</td></tr>' + 
  '<tr><td class="text-nowrap">% multiple races</td><td class="text-right">' + json[0].teacherdistpercmulti + '</td><td class="text-right">' + json[0].teacherstatepercmulti + '</td></tr>' + 
  '<tr><td class="text-nowrap">% native american</td><td class="text-right">' + json[0].teacherdistpercnatam + '</td><td class="text-right">' + json[0].teacherstatepercnatam + '</td></tr>' + 
  '<tr><td class="text-nowrap">% native Hawaiian, other</td><td class="text-right">' + json[0].teacherdistpercnathaw + '</td><td class="text-right">' + json[0].teacherstatepercnathaw + '</td></tr>' + 
  '<tr><td bgcolor="#e1e1e1"><strong>Gender</strong></td><td bgcolor="#e1e1e1"></td><td bgcolor="#e1e1e1"></td></tr>' +
  '<tr><td>% Male</td><td class="text-right">' + json[0].teacherdistpercmale + '</td><td class="text-right">' + json[0].teacherstatepercmale + '</td></tr>' + 
  '<tr><td>% Female</td><td class="text-right">' + json[0].teacherdistpercfemale + '</td><td class="text-right">' + json[0].teacherstatepercfemale + '</td></tr>' + 
  '<tr><td bgcolor="#e1e1e1"><strong>Experience</strong></td><td bgcolor="#e1e1e1"></td><td bgcolor="#e1e1e1"></td></tr>' +
  '<tr><td class="text-nowrap">Avg. years experience</td><td class="text-right">' + json[0].teacherdistavgexp + '</td><td class="text-right">' + json[0].teacherstateavgexp + '</td></tr>' + 
  '<tr><td class="text-nowrap">% Bachelors degree</td><td class="text-right">' + json[0].teacherdistbach + '</td><td class="text-right">' + json[0].teacherstatebach + '</td></tr>' + 
  '<tr><td class="text-nowrap">% Masters +</td><td class="text-right">' + json[0].teacherdistmast + '</td><td class="text-right">' + json[0].teacherstatemast + '</td></tr>' + 
  '</tbody></table>'
);

// The teacher charting info


var chartDEMdteach = new Highcharts.Chart({
  chart: {
    renderTo: 'DEMteachDIST',
    reflow: true,
    spacingBottom: 15,
    spacingTop: 10,
    spacingLeft: 10,
    spacingRight: 10,
    height: 400,
        type: 'bar'
  },
    title: {
      text: null
  },
    xAxis: {
      categories: ['White', 'Black', 'Hispanic', 'Asian', 'Multiracial', 'Native American', 'Native Hawaiian, other'],
      title: {
          text: null
      }
  },
  yAxis: {
    tickInterval: 10,
    min: 0,
    max: 100,
    title: {
        text: 'Percent'
    },
    labels: {
        overflow: 'justify'
    }
  },
  tooltip: {
    crosshairs: true,
    shared: true,
    valueSuffix: ' %'
  },
  plotOptions: {
     bar: {
         dataLabels: {
              enabled: false
          }
      }
  },
  series: [{
        name: 'Teachers in district',
        data: $.map([json[0].teacherdistpercwhite, json[0].teacherdistpercblack, json[0].teacherdistperchisp, json[0].teacherdistpercasian, json[0].teacherdistpercmulti, json[0].teacherdistpercnatam, json[0].teacherdistpercnathaw], function (valuedistteach) {
        return isNaN(valuedistteach) ? { y: null } : parseFloat(valuedistteach);
            }),
        index:1,
        legendIndex:0
    }, {
       name: 'Teachers in state',
        data: $.map([json[0].teacherstatepercwhite, json[0].teacherstatepercblack, json[0].teacherstateperchisp, json[0].teacherstatepercasian, json[0].teacherstatepercmulti, json[0].teacherstatepercnatam, json[0].teacherstatepercnathaw], function (valuestateteach) {
        return isNaN(valuestateteach) ? { y: null } : parseFloat(valuestateteach);
            }),
        index:0,
        legendIndex:1
    }]
});

//________________________________________
// THIS IS THE SECTION FOR CLASS SIZE INFO

  
  var classSizeInfoBlock = '<br><table class="table table-hover table-striped table-condensed"><thead><tr><th>CLASS SIZE (GRADE)</th><th class="text-right">SCHOOL</th><th class="text-right">DISTRICT</th><th class="text-right">STATE</strong></th></tr></thead><tbody>';

  if(json[0].sizeschool3 != '--'){
    classSizeInfoBlock += '<tr><td>3rd</td><td class="text-right">' + json[0].sizeschool3 + '</td><td class="text-right">' + json[0].sizedist3 + '</td><td class="text-right">' + json[0].sizestate3 + '</td></tr>';
  }
  if(json[0].sizeschool4 != '--'){
    classSizeInfoBlock += '<tr><td>4th</td><td class="text-right">' + json[0].sizeschool4 + '</td><td class="text-right">' + json[0].sizedist4 + '</td><td class="text-right">' + json[0].sizestate4 + '</td></tr>';
  }
  if(json[0].sizeschool5 != '--'){
    classSizeInfoBlock += '<tr><td>5th</td><td class="text-right">' + json[0].sizeschool5 + '</td><td class="text-right">' + json[0].sizedist5 + '</td><td class="text-right">' + json[0].sizestate5 + '</td></tr>'
  }
  if(json[0].sizeschool6 != '--'){
    classSizeInfoBlock += '<tr><td>6th</td><td class="text-right">' + json[0].sizeschool6 + '</td><td class="text-right">' + json[0].sizedist6 + '</td><td class="text-right">' + json[0].sizestate6 + '</td></tr>';
  }
  if(json[0].sizeschool7 != '--'){
    classSizeInfoBlock += '<tr><td>7th</td><td class="text-right">' + json[0].sizeschool7 + '</td><td class="text-right">' + json[0].sizedist7 + '</td><td class="text-right">' + json[0].sizestate7 + '</td></tr>';
  }
  if(json[0].sizeschool8 != '--'){
    classSizeInfoBlock += '<tr><td>8th</td><td class="text-right">' + json[0].sizeschool8 + '</td><td class="text-right">' + json[0].sizedist8 + '</td><td class="text-right">' + json[0].sizestate8 + '</td></tr>';
  }
  if(json[0].sizeschoolhs != '--'){
    classSizeInfoBlock += '<tr><td>11th</td><td class="text-right">' + json[0].sizeschoolhs + '</td><td class="text-right">' + json[0].sizedisths + '</td><td class="text-right">' + json[0].sizestatehs + '</td></tr>';
  }
  classSizeInfoBlock += '<tr><td class="text-nowrap"><strong>Pupil-teacher ratio</strong></td><td></td><td></td><td></td></tr>';
  
  if(json[0].mreadschool11all == '--' && json[0].mreadschool3all != '--' || json[0].mreadschool7all != '--'){
    classSizeInfoBlock += '<tr><td>Elementary school</td><td class="text-right">N/A</td><td class="text-right">' + json[0].teacherratiodistelem + '</td><td class="text-right">' + json[0].teacherratiostateelem + '</td></tr>';
  }
  if(json[0].sizeschoolhs != '--'){
    classSizeInfoBlock += '<tr><td>High School</td><td class="text-right">N/A</td><td class="text-right">' + json[0].teacherratiodisths + '</td><td class="text-right">' + json[0].teacherratiostatehs + '</td></tr>';
  }
  classSizeInfoBlock += '<tr><td class="text-nowrap"><strong>Teacher retention rate</strong></td><td class="text-right">' + json[0].teacherschoolret + '</td><td class="text-right">' + json[0].teacherdistret + '</td><td class="text-right">' + json[0].teacherstateret + '</td></tr>';
  classSizeInfoBlock += '<tr><td class="text-nowrap"><strong>Principal turnover</strong></td><td class="text-right">' + json[0].principalschoolturn + '</td><td class="text-right">' + json[0].principaldistturn + '</td><td class="text-right">' + json[0].principalstateturn + '</td></tr>';
  classSizeInfoBlock += '</tbody></table><p><small><i>(Note: Turnover is number of principals within 6 years)</i></small></p>';
  $('p.cSize-head').html( classSizeInfoBlock );




//____________________________________________________________________________________
//____________________________________________________________________________________
// THIS IS THE SECTION FOR SCORES CHARTING - IT MUST COME AT THE END DUE TO PARSING AND NULLS

//-----------------------------------------
// here's the high school charting

if(json[0].act2015school != '--' || json[0].mreadschoolHSall != '--' || json[0].mmathschoolHSall != '--'){



if(json[0].act2015school != '--'){

  if(json[0].schooltype != "CHARTER NET" || json[0].schooltype != "CHARTER NET+" ){

  // ACT range

    var schoolNAME = json[0].facilityname;
    var scoreFLOORact = Math.floor(parseFloat(json[0].act2015school));
    var chartACTcount = new Highcharts.Chart({
          chart: {
        renderTo: 'ACTrange',
        reflow: true,
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
              data: [0,0,0,0,0,0,0,0,0,0,0,0,0,3,25,23,35,56,97,134,115,72,46,24,12,6,5,3,0,2,0,0,0,0,0,0,0]
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
        '<p class="Ppadding"><strong>Number of schools in the state with similar average ACT scores.</strong> Highlighted below, ' + selectPOINTact + ' other school(s) had a score similar to ' + json[0].facilityname + '\'s average ACT score of ' + json[0].act2015school + '.</p>'
      );
    });

} else {
  $('#ACTnoteRANGE').remove();
  $('#ACTrange').remove();
};

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
            categories: ['2006', '2007', '2008', '2009', '2010', '2011', '2012','2013', '2014', '2015'],
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
            data: $.map([json[0].act2006state, json[0].act2007state, json[0].act2008state, json[0].act2009state, json[0].act2010state, json[0].act2011state, json[0].act2012state, json[0].act2013state, json[0].actscore2014state, json[0].actscore2015state], function (valueACTsta) {
        return isNaN(valueACTsta) ? { y: null } : parseFloat(valueACTsta);
            })
          }, {  
            name: 'District',
            data: $.map([json[0].act2006district, json[0].act2007district, json[0].act2008district, json[0].act2009district, json[0].act2010district, json[0].act2011district, json[0].act2012district, json[0].act2013district, json[0].actscore2014district, json[0].actscore2015district], function (valueACTdis) {
        return isNaN(valueACTdis) ? { y: null } : parseFloat(valueACTdis);
            })
          }, {  
      name: 'School',
            data: $.map([json[0].act2006school, json[0].act2007school, json[0].act2008school, json[0].act2009school, json[0].act2010school, json[0].act2011school, json[0].act2012school, json[0].act2013school, json[0].act2014school, json[0].act2015school], function (valueACTsch) {
              return isNaN(valueACTsch) ? { y: null } : parseFloat(valueACTsch);
            })
        }],
        tooltip: {
          crosshairs: true,
          shared: true
        },
    });

// THIS IS THE SECTION FOR college readiness and graduation rates

$('#collegeReady').html(
      '<p><table class="table table-hover table-striped table-condensed"><thead><tr><th></th><th class="text-right">SCHOOL</th><th class="text-right">DISTRICT</th><th class="text-right">STATE</th></tr></thead>' + 
      '<tbody><tr><td class="text-nowrap"><strong>ACT benchmarks</strong></td><td class="text-right"></td><td class="text-right"></td><td class="text-right"></td></tr>' + 
      '<tr><td class="text-nowrap">% met english</td><td class="text-right">' + json[0].actschoolengmet + '</td><td class="text-right">' + json[0].actdistengmet + '</td><td class="text-right">' + json[0].actstateengmet + '</td></tr>' + 
      '<tr><td class="text-nowrap">% met math</td><td class="text-right">' + json[0].actschoolmathmet + '</td><td class="text-right">' + json[0].actdistmathmet + '</td><td class="text-right">' + json[0].actstatemathmet + '</td></tr>' + 
      '<tr><td class="text-nowrap">% met reading</td><td class="text-right">' + json[0].actschoolreadmet + '</td><td class="text-right">' + json[0].actdistreadmet + '</td><td class="text-right">' + json[0].actstatereadmet + '</td></tr>' + 
      '<tr><td class="text-nowrap">% met science</td><td class="text-right">' + json[0].actschoolscimet + '</td><td class="text-right">' + json[0].actdistscimet + '</td><td class="text-right">' + json[0].actstatescimet + '</td></tr>' + 
      '<tr><td class="text-nowrap">% met all</td><td class="text-right">' + json[0].actschoolallmet + '</td><td class="text-right">' + json[0].actdistallmet + '</td><td class="text-right">' + json[0].actstateallmet + '</td></tr>' + 
      '<tr><td class="text-nowrap">% college ready<sup><a href="#footnotes"> 7</sup></a></td><td class="text-right">' + json[0].percschoolcol + '</td><td class="text-right">' + json[0].percdistcol + '</td><td class="text-right">' + json[0].percstatecol + '</td></tr>' + 
      '<tr><td class="text-nowrap"><strong>Graduation</strong></td><td class="text-right"></td><td class="text-right"></td><td class="text-right"></td></tr>' +
      '<tr><td class="text-nowrap">% freshmen on track</td><td class="text-right">' + json[0].percschoolfresh + '</td><td class="text-right">' + json[0].percdistfresh + '</td><td class="text-right">' + json[0].percstatefresh + '</td></tr>' +        
      '<tr><td class="text-nowrap">% H.S. 4-year graduation</td><td class="text-right">' + json[0].perchs4gradschoolall + '</td><td class="text-right">' + json[0].perchs4graddistall + '</td><td class="text-right">' + json[0].perchs4gradstateall + '</td></tr>' +        
      '<tr><td class="text-nowrap">% H.S. 5-year graduation</td><td class="text-right">' + json[0].perchs5gradschoolall + '</td><td class="text-right">' + json[0].perchs5graddistall + '</td><td class="text-right">' + json[0].perchs5gradstateall + '</td></tr>' +               
      '<tr><td class="text-nowrap">Dropout rate (%)<sup><a href="#footnotes"> 8</sup></a></td><td class="text-right">' + json[0].percdropoutschool + '</td><td class="text-right">' + json[0].percdropoutdist + '</td><td class="text-right">' + json[0].percdropoutstate + '</td></tr>' +        
      '<tr><td class="text-nowrap"><strong>Grads enrolled in college</strong></td><td class="text-right"></td><td class="text-right"></td><td class="text-right"></td></tr>' +
      '<tr><td class="text-nowrap">% within 12 months</td><td class="text-right">' + json[0].percschoolenroll12 + '</td><td class="text-right">' + json[0].percdistenroll12 + '</td><td class="text-right">' + json[0].percstateenroll12 + '</td></tr>' +               
      '<tr><td class="text-nowrap">% within 16 months</td><td class="text-right">' + json[0].percschoolenroll16 + '</td><td class="text-right">' + json[0].percdistenroll16 + '</td><td class="text-right">' + json[0].percstateenroll16 + '</td></tr>' +               
      '</tbody></table></p>'
);


        $("ul li.hsdrop").addClass( "active" );
        $("ul li.hsdrop ul li.ACTchart").addClass( "active" );
        $("#ACTcharts").addClass( "active" );
        
  } else {
    $('#ACTchart').remove();
    $('#ACTcharts').remove();
    $("ul li.hsdrop ul li.ACTchart").remove();
    $("ul li.hsdrop ul li.cready").remove();

  };


// High school scores range chart
      
if(json[0].mreadschoolHSall != '--' || json[0].mmathschoolHSall != '--'){


//HS range

  var schoolNAME = json[0].facilityname;
  var scoreFLOORPSAE = Math.floor(parseFloat(json[0].me2015school));
  var chartPSAEcount = new Highcharts.Chart({
        chart: {
      renderTo: 'HSrange',
      height: 350,
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
                text: 'Composite meets/exceeds'
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
            data: [10,16,10,10,6,14,10,11,5,16,8,13,9,16,22,22,19,10,18,20,20,21,13,20,19,23,12,11,10,16,11,9,15,9,7,16,11,16,7,10,7,9,8,8,8,5,5,5,4,5,4,2,5,6,5,0,1,2,0,3,2,1,1,0,3,2,1,0,1,2,0,0,0,2,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0]
        }],
      tooltip: {
            shared: true,
      crosshairs: true,
            useHTML: true,
            headerFormat: '% Meets/exceeds: <b>{point.key}</b><br>',
            pointFormat: '<span style="color: {series.color}"># of schools<br>with similar %: </span><b>{point.y}</b>',
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

    $('#HSnoteRANGE').html(
        '<p class="Ppadding"><strong>Number of schools in the state with a similar percentage of students meeting or exceeding PARCC standards.</strong> Highlighted below, ' + json[0].me2015school + '% of ' + json[0].facilityname + ' students met or exceeded state PARCC standards. ' + selectPOINTPSAE + ' other school(s) had a similar percentage.</p>'
        );       
    });


// HS scores 
  if( json[0].schooltype == "HIGH SCHOOL+" || json[0].schooltype == "CHARTER HIGH SCH+" || json[0].schooltype == "CHARTER NET+" || json[0].schooltype == "CHARTER NET HIGH SCH+"){

      $('#HSnote').html(
        '<p class="Ppadding"><strong>For the school and state since the 2011-\'12 school year.</strong> Click or touch the graphic below for more.</p>'
        );
      $('#HSnote2').html(
        '<p class="Ppadding">Please note: This school includes some elementary grades. Starting with the 2015 PARCC test, results from these grades are included in the school\'s overall results and not reported seperately for elementary or high school.</p>'
        );

    } else {

      $('#HSnote').html(
        '<p class="Ppadding"><strong>For the school and state since the 2011-\'12 school year.</strong></p>'
      );
    };


// High school scores

  var chartHS = new Highcharts.Chart({
    chart: {
      renderTo: 'HSyears',
      height: 375,
      spacingBottom: 15,
      spacingTop: 10,
      spacingLeft: 10,
      spacingRight: 10,
      type: 'column'
        },
        title: {
            text: null
        },
        legend: {
            enabled: false
        },
        xAxis: {
          plotLines: [{
            color: 'red',
            value: 3.5,
            width: 2    
          }],
            categories: ['2011', '2012', '2013', '2014','<strong>2015</strong><br><strong>PARCC</strong>'],
            labels: {
              staggerLines: 2
            }
        },
        yAxis: {
            min: 0,
            max: 100,
                  title: {
                      text: 'High School % meets/exceeds'
                  }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                groupPadding: 0.125
              }
            },
        series: [
          {
            type: 'column',
            name: 'School PSAE app',
            data: $.map(['--', '--', '--', '--', '--'], function (valuePSAEsch) {
                return isNaN(valuePSAEsch) ? { y: null } : parseFloat(valuePSAEsch);
            }),
            stack: 'School',
             color: '#86B6EC'
         },{
            type: 'column',
            name: 'School PSAE M/E',
            data: $.map([json[0].me2011schoolpsae, json[0].me2012schoolpsae, json[0].me2013schoolpsae, json[0].me2014schoolpsae, '--'], function (valuePSAEsch) {
                return isNaN(valuePSAEsch) ? { y: null } : parseFloat(valuePSAEsch);
            }),
            stack: 'School',
            color: '#2f7ed8'
          },{
            type: 'column',
            name: 'State PSAE app',
            data: $.map(['--', '--', '--', '--', '--'], function (valuePSAEsch) {
                return isNaN(valuePSAEsch) ? { y: null } : parseFloat(valuePSAEsch);
            }),
            stack: 'State',
            color: '#B7D27F'
          },{
            type: 'column',
            name: 'State PSAE M/E',
            data: $.map([json[0].me2011statepsae, json[0].me2012statepsae, json[0].me2013statepsae, json[0].me2014statepsae, '--'], function (valuePSAEsch) {
                return isNaN(valuePSAEsch) ? { y: null } : parseFloat(valuePSAEsch);
            }),
            stack: 'State',
            color: '#89a54e'
          },{  
            type: 'column',
            name: 'School<br>approaching',
            data: $.map(['--', '--', '--', '--', json[0].me2015schAPP], function (valueHSsch) {
                return isNaN(valueHSsch) ? { y: null } : parseFloat(valueHSsch);
            }),
            stack: 'School',
            color: '#86B6EC'
           },{ 
            type: 'column',
            name: 'School M/E',
            data: $.map(['--', '--', '--', '--', json[0].me2015school], function (valueHSsch) {
                return isNaN(valueHSsch) ? { y: null } : parseFloat(valueHSsch);
            }),
            stack: 'School',
            color: '#2f7ed8'
        }, {  
            type: 'column',
            name: 'State<br>approaching',
            data: $.map(['--', '--', '--', '--', json[0].me2015stateAPP], function (valueHSsch) {
                return isNaN(valueHSsch) ? { y: null } : parseFloat(valueHSsch);
            }),
            stack: 'State',
            color: '#B7D27F'
           },{ 
            type: 'column',
            name: 'State M/E',
            data: $.map(['--', '--', '--', '--', json[0].me2015state], function (valueHSsch) {
                return isNaN(valueHSsch) ? { y: null } : parseFloat(valueHSsch);
            }),
            stack: 'State',
            color: '#89a54e'
        }
        ],
        tooltip: {
          crosshairs: true,
          shared: false,
          valueSuffix: '%'
        },
    });


// Here's the HS PA index

    if(json[0].schooltype != "CHARTER NET" || json[0].schooltype != "CHARTER NET+"){

      $('#hsPAInote').html(
      '<p class="Ppadding"><strong>POVERTY-ACHIEVEMENT INDEX</strong></p>'
      );
     $('#hsPAInote2').html(
      '<p class="Ppadding">The Daily Herald, in collaboration with WBEZ, examined percent meets/exceeds for public schools with similar percentages of low-income students. A school\'s index rank shows how much higher or lower their result is compared to the average for those similar schools.<br><strong>Most schools will rank between 1 and -1, with 0 (red line) being exactly average for schools in the same low-income range.</strong> For more details about our Poverty-Achievement Index, please <a href="http://reportcards.dailyherald.com/#mainpge" target="_blank">click here</a>.</p>'
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
                categories: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '<strong>2015<br>PARCC</strong>'],
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
                data: $.map([json[0].zhsscore2006, json[0].zhsscore2007, json[0].zhsscore2008, json[0].zhsscore2009, json[0].zhsscore2010, json[0].zhsscore2011, json[0].zhsscore2012, json[0].zhsscore2013, json[0].zhsscore2014, json[0].avgHSz], function (valuePAIhs) {
                    return isNaN(valuePAIhs) ? { y: null } : parseFloat(valuePAIhs);
                })

            }, {
                name: '% Low Income',
                type: 'line',
                data: $.map([json[0].lowinc2006, json[0].lowinc2007, json[0].lowinc2008, json[0].lowinc2009, json[0].lowinc2010, json[0].lowinc2011, json[0].lowinc2012, json[0].lowinc2013, json[0].lowinc2014, json[0].lowinc2015], function (valueLOWhs) {
                    return isNaN(valueLOWhs) ? { y: null } : parseFloat(valueLOWhs);
                })
            }]
        });

    } else {
      $("ul li.hsdrop ul li.hsPersp").remove();
      $('#hsPersp').remove();
    };


    $("ul li.hsdrop ul li.ACTchart").removeClass( "active" );
    $("#ACTcharts").removeClass( "active" );
    $("ul li.hsdrop").addClass( "active" );
    $("ul li.hsdrop ul li.HSchart").addClass( "active" );
    $("#HScharts").addClass( "active" );
    $("#chartTabs").tab();

  } else {
    $("ul li.hsdrop ul li.HSchart").remove();
    $("ul li.hsdrop ul li.hsPersp").remove();
    $('#HScharts').remove();
    $('#hsPersp').remove();
  };

} else {
  $('ul li.hsdrop').remove();
  $('#HScharts').remove();
  $('#hsPersp').remove();
  $('#ACTcharts').remove();
  $('#cready').remove();
};

//Because it keeps showing up for some reason

if(json[0].schooltype == "CHARTER NET" || json[0].schooltype == "CHARTER NET+"){
      $("ul li.hsdrop ul li.hsPersp").remove();
      $('#hsPersp').remove();
      $("#ACTnoteRANGE").remove();
      $("#ACTrange").remove();

};

// Here's the elementary school charting

	if( ( json[0].schooltype == "ELEMENTARY" || json[0].schooltype == "MIDDLE SCHL" || json[0].schooltype == "CHARTER SCH"  || json[0].schooltype == "CHARTER SCH+" || json[0].schooltype == "CHARTER NET" || json[0].schooltype == "CHARTER NET SCH" ) && ( json[0].mreadschool3all != '--' || json[0].mreadschool4all != '--' || json[0].mreadschool5all != '--' || json[0].mreadschool6all != '--' || json[0].mreadschool7all != '--' || json[0].mreadschool8all != '--') ) {

   $('ul li.hsdrop').remove();
    $('#HScharts').remove();
    $('#hsPersp').remove();
    $('#ACTcharts').remove();
    $('#cready').remove();


    $('#ISATnote').html(
      '<p class="Ppadding"><strong>For the school and state since the 2011-\'12 school year.</strong> Click or touch the graphic below for more.</p>'
      );
    $('#ISATnote2').html(
      '<p class="Ppadding">Note: The gray area indicates years where the state raised the minimum ISAT score students needed to achieve a rating of "meets expectations." The red line indicates the beginning of the new PARCC tests.</p>'
      );

  var chartISAT = new Highcharts.Chart({
    chart: {
      renderTo: 'ISATyears',
      height: 375,
      spacingBottom: 15,
      spacingTop: 10,
      spacingLeft: 10,
      spacingRight: 10,
      type: 'column'
        },
        title: {
            text: null
        },
        legend: {
            enabled: false
        },
        xAxis: {
          plotLines: [{
            color: 'red',
            value: 3.5,
            width: 2    
          }],
         plotBands: [{
            from: 1.5,
            to: 3.5,
            color: '#e1e1e1'
          }],
            categories: ['2011', '2012', '2013', '2014','<strong>2015</strong><br><strong>PARCC</strong>'],
            labels: {
              staggerLines: 2
            }
        },
        yAxis: {
            min: 0,
            max: 100,
                  title: {
                      text: 'Elementary % meets/exceeds'
                  }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                groupPadding: 0.125
              }
            },
        series: [
          {
            type: 'column',
            name: 'School ISAT app',
            data: $.map(['--', '--', '--', '--', '--'], function (valueISATsch) {
                return isNaN(valueISATsch) ? { y: null } : parseFloat(valueISATsch);
            }),
            stack: 'School',
             color: '#86B6EC'
         },{
            type: 'column',
            name: 'School ISAT M/E',
            data: $.map([json[0].me2011schoolisat, json[0].me2012schoolisat, json[0].me2013schoolisat, json[0].me2014schoolisat, '--'], function (valueISATsch) {
                return isNaN(valueISATsch) ? { y: null } : parseFloat(valueISATsch);
            }),
            stack: 'School',
            color: '#2f7ed8'
          },{
            type: 'column',
            name: 'State ISAT app',
            data: $.map(['--', '--', '--', '--', '--'], function (valueISATsch) {
                return isNaN(valueISATsch) ? { y: null } : parseFloat(valueISATsch);
            }),
            stack: 'State',
            color: '#B7D27F'
          },{
            type: 'column',
            name: 'State ISAT M/E',
            data: $.map([json[0].me2011stateisat, json[0].me2012stateisat, json[0].me2013stateisat, json[0].me2014stateisat, '--'], function (valueISATsch) {
                return isNaN(valueISATsch) ? { y: null } : parseFloat(valueISATsch);
            }),
            stack: 'State',
            color: '#89a54e'
          },{  
            type: 'column',
            name: 'School<br>approaching',
            data: $.map(['--', '--', '--', '--', json[0].me2015schAPP], function (valueELEMsch) {
                return isNaN(valueELEMsch) ? { y: null } : parseFloat(valueELEMsch);
            }),
            stack: 'School',
            color: '#86B6EC'
           },{ 
            type: 'column',
            name: 'School M/E',
            data: $.map(['--', '--', '--', '--', json[0].me2015school], function (valueELEMsch) {
                return isNaN(valueELEMsch) ? { y: null } : parseFloat(valueELEMsch);
            }),
            stack: 'School',
            color: '#2f7ed8'
        }, {  
            type: 'column',
            name: 'State<br>approaching',
            data: $.map(['--', '--', '--', '--', json[0].me2015stateAPP], function (valueELEMsch) {
                return isNaN(valueELEMsch) ? { y: null } : parseFloat(valueELEMsch);
            }),
            stack: 'State',
            color: '#B7D27F'
           },{ 
            type: 'column',
            name: 'State M/E',
            data: $.map(['--', '--', '--', '--', json[0].me2015state], function (valueELEMsch) {
                return isNaN(valueELEMsch) ? { y: null } : parseFloat(valueELEMsch);
            }),
            stack: 'State',
            color: '#89a54e'
        }
        ],
        tooltip: {
          crosshairs: true,
          shared: false,
          valueSuffix: '%'
        },
    });

//Here's the ISAT bell curve
  if( json[0].schooltype != "CHARTER NET" || json[0].schooltype != "CHARTER NET+" ){

  var schoolNAME = json[0].facilityname;
  var scoreFLOOR = Math.floor(parseFloat(json[0].me2015school));
  var chartISATcount = new Highcharts.Chart({
    chart: {
      renderTo: 'ISATrange',
      height: 350,
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
        text: 'Composite % meets/exceeds'
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
        data: [2,3,7,10,18,24,35,43,41,42,48,60,54,41,56,48,61,54,80,73,75,78,60,57,77,75,60,72,52,71,52,60,68,60,47,47,46,48,44,49,53,48,35,35,42,44,33,26,44,39,29,24,24,29,30,29,20,24,26,24,24,15,19,14,21,16,20,11,10,15,4,5,11,9,11,7,4,5,2,3,5,4,1,3,0,0,0,1,1,1,2,1,0,2,1,0,0,0,0,0,0]
    }],
    tooltip: {
      shared: true,
      crosshairs: true,
      useHTML: true,
      headerFormat: '% meets/exceeds: <b>{point.key}</b><br>',
      pointFormat: '<span style="color: {series.color}"># of schools<br>with similar %: </span><b>{point.y}</b>',
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
        '<p class="Ppadding"><strong>Number of schools in the state with a similar percentage of elementary school students meeting or exceeding PARCC standards.</strong> Highlighted below, ' + json[0].me2015school + '% of ' + json[0].facilityname + ' students met or exceeded state PARCC standards. ' + selectPOINT + ' other school(s) had a similar percentage.</p>'
      );
  });

//And here's the elem PA index

  $('#PAInote').html(
  '<p class="Ppadding"><strong>POVERTY-ACHIEVEMENT INDEX</p>'
  );
  $('#PAInote2').html(
  '<p class="Ppadding">The Daily Herald, in collaboration with WBEZ, examined percent meets/exceeds for public schools with similar percentages of low-income students. A school\'s index rank shows how much higher or lower their result is compared to the average for those similar schools.<br><strong>Most schools will rank between 1 and -1, with 0 (red line) being exactly average for schools in the same low-income range.</strong> For more details about our Poverty-Achievement Index, please <a href="http://reportcards.dailyherald.com/#mainpge" target="_blank">click here</a>.</p>'
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
            categories: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '<strong>2015<br>PARCC</strong>'],
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
            data: $.map([json[0].zelemscore2006, json[0].zelemscore2007, json[0].zelemscore2008, json[0].zelemscore2009, json[0].zelemscore2010, json[0].zelemscore2011, json[0].zelemscore2012, json[0].zelemscore2013, json[0].zelemscore2014, json[0].avgELEMz], function (valuePAI) {
                return isNaN(valuePAI) ? { y: null } : parseFloat(valuePAI);
            })

        }, {
            name: '% Low Income',
            type: 'line',
            data: $.map([json[0].lowinc2006, json[0].lowinc2007, json[0].lowinc2008, json[0].lowinc2009, json[0].lowinc2010, json[0].lowinc2011, json[0].lowinc2012, json[0].lowinc2013, json[0].lowinc2014, json[0].lowinc2015], function (valueLOW) {
                return isNaN(valueLOW) ? { y: null } : parseFloat(valueLOW);
            })

        }]
    });

} else {
  $('ul li.elemPersp').remove();
  $('#elemPersp').remove();
};

// finishing the three charts up

    $("ul li.hsdrop").removeClass( "active" );
    $("ul li.hsdrop ul li.HSchart").removeClass( "active" );
    $("#HScharts").removeClass( "active" );
//    $("ul li.hsdrop ul li.ACTchart").removeClass( "active" );
//    $("#ACTcharts").removeClass( "active" );

    $("ul li.elemdrop li.ISATchart").addClass( "active" );
    $("ul li.elemdrop").addClass( "active" );
		$("#ISATcharts").addClass( "active" );
		$("#chartTabs" ).tab();

	} else {
		$('ul li.elemdrop').remove();
    $('#ISATcharts').remove();
		$('#elemPersp').remove();

	};
        
//Because it keeps showing up for some reason

if(json[0].schooltype == "CHARTER NET" || json[0].schooltype == "CHARTER NET+"){
      $("ul li.elemdrop ul li.elemPersp").remove();
      $('#elemPersp').remove();
    };

//-----------------------------------------
// footnotes


var footBlock = '<hr><h4>FOOTNOTES</h4><p>Scores for individual schools within charter-school networks are included by the state in the report card release, and are not yet available. Averages are given for charter networks, but - while the averages are reported - we do not include those in the top lists or our Poverty-Achievement Index. When information for the individual schools becomes available, we will update this site.</p><p><small><ul><li><sup>1</sup><strong> LEP: </strong>Percentage of students found to be eligible for bilingual education.<a href="#scores""> BACK</a></li><li><sup>2</sup><strong> IEP: </strong>Percentage of students found to be eligible to receive special education services.<a href="#scores"> BACK</a></li><li><sup>3</sup><strong> % homeless: </strong>Percentage of students who do not have permanent and adequate homes. <a href="#attend">BACK</a></li><li><sup>4</sup><strong> Attendance rate (%): </strong>Percent of school days attended.<a href="#attend"> BACK</a></li><li><sup>5</sup><strong> Mobility rate (%): </strong>Percent of students who transfer in or out of a school. Students who transfer in and out multiple times during the year are counted each time they transfer.<a href="#attend"> BACK</a></li><li><sup>6</sup><strong> Truancy rate (%): </strong>Chronic truancy rate is the percentage of students who have been absent from school without a valid cause for five percent or more of attendance days.<a href="#attend"> BACK</a></li>';

if(json[0].mreadschool11all != '--'){
  footBlock += '<li><sup>7</sup><strong> % college ready: </strong>Percentage of students who scored at least a 21 on the ACT.<a href="#cready"> BACK</a></li><li><sup>8</sup><strong> Dropout rate (%): </strong>Percent of students removed from a school\'s attendance roster. Does not include students who have passed away or suffer an extended illness, transfered to another public/private or home school, or who have been expelled.<a href="#cready"> BACK</a></li>';
};

footBlock += '</ul></small></p>';


$('#footnotes').html( footBlock );


//________________________________________
// Enable the tabs

	$(function() {
		$( "#demgroup" ).tab();
		$( "#chartTabs" ).tab();
		$( "#topnavbar" ).tab();
		});

//________________________________________

// THIS IS THE END
  };
	});
});