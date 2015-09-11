			 
$( document ).ready( function() {
		$('#loaded').hide();
		$('#reportcardheading').hide();
				


if(getACT == 'yes' && getPSAE == 'no' && getISAT == 'no' && getGROW == 'no'){
		$('#reportcardheading').hide();
		$('#schoolsText').hide();
		$('#schoolsLIST').load('../RC2014/topACT14.html');
		$('#note').hide();
			} else 

if(getPSAE == 'yes' && getACT == 'no' && getISAT == 'no' && getGROW == 'no'){
		$('#reportcardheading').hide();
		$('#schoolsText').hide();
		$('#schoolsLIST').load('../RC2014/topPSAE14.html');
		$('#note').hide();
			} else 

if(getISAT == 'yes' && getPSAE == 'no' && getACT == 'no' && getGROW == 'no'){
		$('#reportcardheading').hide();
		$('#schoolsText').hide();
		$('#schoolsLIST').load('../RC2014/topISAT14.html');
		$('#note').hide();
			} else 

if(getGROW == 'yes' && getISAT == 'no' && getPSAE == 'no' && getACT == 'no'){
		$('#reportcardheading').hide();
		$('#schoolsText').hide();
		$('#schoolsLIST').load('../RC2014/topGROW14.html');
		$('#note').hide();
			} else 

//begin get county

if(getCOUNTY != 'no' && getDIST == 'no' && getCITY == 'no' && getAll == 'no' && getAlldist == 'no'){
		$('#reportcardheading').hide();

$.getJSON('../RC2014/getCounty14.php?term=' + getCOUNTY, function(data){
 
//Create the list of schools, with links

		var countyHTML = "";
		countyHTML += '<h3 align=left>' + "Schools in " + getCOUNTY + " County" + '</h3>';
		countyHTML += '<p class="padding10b"><a href="#" onclick="window.open(' + "'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href)); " + '">' + '<img src="../images/fblogo.jpg" height="16" width="16">' + " Share" + '</a>' + " | " + '<a href="https://twitter.com/share" class="twitter-share-button" data-count="none">Tweet' + '</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?' + "'http':'https'" + ';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+' + "'://platform.twitter.com/widgets.js'" + ';fjs.parentNode.insertBefore(js,fjs);}}(document,' + " 'script', 'twitter-wjs');</script>" + '</p>';
		countyHTML += '<p><strong>' + "TIP: " + '</strong>' + "The list below is sortable. Click on a category name once, and the list will sort by that category in ascending order. Click it again and the list will sort in descending order. So, if you click the heading School, the list will sort in alphabetical order. Click School again and the list will sort in reverse alphabetical order." + '</p>';
		$('#schoolsText').html(countyHTML);
					
		var distHTML = "";
		distHTML += '<p><table id="tableSCHOOLS" class="tablesorter" width="565px">';
						distHTML += '<thead><tr><th class="tdLEFT">' + "School, District" + '</th><th data-type="float">' + "ISAT<br>Composite" + '</th><th data-type="float">' + "PSAE<br>Composite" + '</th><th data-type="float">' + "ACT<br>Score" + '</th></tr></thead><tbody>';
					$.each(data, function(i) {
						distHTML += '<tr class="group"><td class="tdLEFT"><a href="../details/?id-name=' + data[i].ID + '">' + data[i].facilityNAME + '</a>, <br>District: <a href="../schools/?COUNTYlist=no&schoolsAll=no&districtsAll=no&CITYlist=no&ISAT=no&PSAE=no&ACT=no&district-name=' + data[i].districtNAMEdist + '">' + data[i].districtNAMEdist + '</td><td class="tdCENT">' + data[i].isat2014SCHOOLmecomp + '</td><td class="tdCENT">' + data[i].psae2014SCHOOLmecomp + '</td><td class="tdCENT">' + data[i].actSCHOOLall + '</td></tr>';
					});
				distHTML += '</tbody></table></p>';


		$('#schoolsLIST').html(distHTML);
		table_sorter( '#tableSCHOOLS', { groupClass: 'group' } ).hover();
		
		}); //end get county
		
			} else 
//begin get city
	
if(getCOUNTY == 'no' && getDIST == 'no' && getCITY != 'no' && getAll == 'no' && getAlldist == 'no'){
		$('#reportcardheading').hide();

$.getJSON('../RC2014/getCity14.php?term=' + getCITY, function(data){
 
//Create the list of schools, with links

		var countyHTML = "";
		countyHTML += '<h3 align=left>' + "Schools in " + getCITY + '</h3>';
		countyHTML += '<p class="padding10b"><a href="#" onclick="window.open(' + "'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href)); " + '">' + '<img src="../images/fblogo.jpg" height="16" width="16">' + " Share" + '</a>' + " | " + '<a href="https://twitter.com/share" class="twitter-share-button" data-count="none">Tweet' + '</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?' + "'http':'https'" + ';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+' + "'://platform.twitter.com/widgets.js'" + ';fjs.parentNode.insertBefore(js,fjs);}}(document,' + " 'script', 'twitter-wjs');</script>" + '</p>';
		countyHTML += '<p><strong>' + "TIP: " + '</strong>' + "The list below is sortable. Click on a category name once, and the list will sort by that category in ascending order. Click it again and the list will sort in descending order. So, if you click the heading School, the list will sort in alphabetical order. Click School again and the list will sort in reverse alphabetical order." + '</p>';
		$('#schoolsText').html(countyHTML);

					
		var distHTML = "";
		distHTML += '<p><table id="tableSCHOOLS" class="tablesorter" width="565px">';
						distHTML += '<thead><tr><th class="tdLEFT">' + "School, District" + '</th><th data-type="float">' + "ISAT<br>Composite" + '</th><th data-type="float">' + "PSAE<br>Composite" + '</th><th data-type="float">' + "ACT<br>Score" + '</th></tr></thead><tbody>';
					$.each(data, function(i) {
						distHTML += '<tr class="group"><td class="tdLEFT"><a href="../details/?id-name=' + data[i].ID + '">' + data[i].facilityNAME + '</a>, <br>District: <a href="../schools/?COUNTYlist=no&schoolsAll=no&districtsAll=no&CITYlist=no&ISAT=no&PSAE=no&ACT=no&district-name=' + data[i].districtNAMEdist + '">' + data[i].districtNAMEdist + '</td><td class="tdCENT">' + data[i].isat2014SCHOOLmecomp + '</td><td class="tdCENT">' + data[i].psae2014SCHOOLmecomp + '</td><td class="tdCENT">' + data[i].actSCHOOLall + '</td></tr>';
					});
				distHTML += '</tbody></table></p>';
				
		$('#schoolsLIST').html(distHTML);
		table_sorter( '#tableSCHOOLS', { groupClass: 'group' } ).hover();
		
		});  //end get city
			} else  
	
//begin get all suburban schools

if(getCOUNTY == 'no' && getDIST == 'no' && getCITY == 'no' && getAll == 'Chicago' && getAlldist == 'no'){
		$('#reportcardheading').hide();

$.getJSON('../RC2014/getAll14.php?term=' + getAll, function(data){
 
//Create the list of schools, with links

		var countyHTML = "";
		countyHTML += '<h3 align=left>' + "All suburban schools" + '</h3>';
		countyHTML += '<p class="padding10b"><a href="#" onclick="window.open(' + "'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href)); " + '">' + '<img src="../images/fblogo.jpg" height="16" width="16">' + " Share" + '</a>' + " | " + '<a href="https://twitter.com/share" class="twitter-share-button" data-count="none">Tweet' + '</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?' + "'http':'https'" + ';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+' + "'://platform.twitter.com/widgets.js'" + ';fjs.parentNode.insertBefore(js,fjs);}}(document,' + " 'script', 'twitter-wjs');</script>" + '</p>';
		countyHTML += '<p><strong>' + "TIP: " + '</strong>' + "The list below is sortable. Click on a category name once, and the list will sort by that category in ascending order. Click it again and the list will sort in descending order. So, if you click the heading School, the list will sort in alphabetical order. Click School again and the list will sort in reverse alphabetical order." + '</p>';
		$('#schoolsText').html(countyHTML);

					
		var distHTML = "";
		distHTML += '<p><table id="tableSCHOOLS" class="tablesorter" width="565px">';
						distHTML += '<thead><tr><th class="tdLEFT">' + "School, District" + '</th><th data-type="float">' + "ISAT<br>Composite" + '</th><th data-type="float">' + "PSAE<br>Composite" + '</th><th data-type="float">' + "ACT<br>Score" + '</th></tr></thead><tbody>';
					$.each(data, function(i) {
						distHTML += '<tr class="group"><td class="tdLEFT"><a href="../details/?id-name=' + data[i].ID + '">' + data[i].facilityNAME + '</a>, <br>District: <a href="../schools/?COUNTYlist=no&schoolsAll=no&districtsAll=no&CITYlist=no&ISAT=no&PSAE=no&ACT=no&district-name=' + data[i].districtNAMEdist + '">' + data[i].districtNAMEdist + '</td><td class="tdCENT">' + data[i].isat2014SCHOOLmecomp + '</td><td class="tdCENT">' + data[i].psae2014SCHOOLmecomp + '</td><td class="tdCENT">' + data[i].actSCHOOLall + '</td></tr>';
					});
				distHTML += '</tbody></table></p>';
				
		$('#schoolsLIST').html(distHTML);
		table_sorter( '#tableSCHOOLS', { groupClass: 'group' } ).hover();
		
		});
 //end get all suburban schools

			} else
			
//begin get all suburban districts

if(getCOUNTY == 'no' && getDIST == 'no' && getCITY == 'no' && getAll == 'no' && getAlldist == 'Chicago'){
		$('#reportcardheading').hide();

$.getJSON('../RC2014/getAlldist14.php?term=' + getAlldist, function(data){
 
//Create the list of districts, with links

		var countyHTML = "";
		countyHTML += '<h3 align=left>' + "All suburban school districts" + '</h3>';
		countyHTML += '<p><strong>' + "UPDATED 11/8: " + '</strong>' + "In this list only, average ACT scores for districts were incorrect due to an error in a key file provided by the Illinois State Board of Education. Correct average ACT scores are now included below." + '</p>';
		countyHTML += '<p class="padding10b"><a href="#" onclick="window.open(' + "'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href)); " + '">' + '<img src="../images/fblogo.jpg" height="16" width="16">' + " Share" + '</a>' + " | " + '<a href="https://twitter.com/share" class="twitter-share-button" data-count="none">Tweet' + '</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?' + "'http':'https'" + ';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+' + "'://platform.twitter.com/widgets.js'" + ';fjs.parentNode.insertBefore(js,fjs);}}(document,' + " 'script', 'twitter-wjs');</script>" + '</p>';
		countyHTML += '<p><strong>' + "TIP: " + '</strong>' + "The list below is sortable. Click on a category name once, and the list will sort by that category in ascending order. Click it again and the list will sort in descending order. So, if you click the heading District, the list will sort in alphabetical order. Click District again and the list will sort in reverse alphabetical order." + '</p>';
		$('#schoolsText').html(countyHTML);

					
		var distHTML = "";
		distHTML += '<p><table id="tableSCHOOLS" class="tablesorter" width="565px">';
						distHTML += '<thead><tr><th class="tdLEFT">' + "District" + '</th><th data-type="float">' + "ISAT<br>Composite" + '</th><th data-type="float">' + "PSAE<br>Composite" + '</th><th data-type="float">' + "ACT<br>Score" + '</th></tr></thead><tbody>';
					$.each(data, function(i) {
						distHTML += '<tr class="group"><td class="tdLEFT"><a href="../schools/?COUNTYlist=no&schoolsAll=no&districtsAll=no&CITYlist=no&ISAT=no&PSAE=no&ACT=no&district-name=' + data[i].districtNAMEdist + '">' + data[i].districtNAMEdist + '</td><td class="tdCENT">' + data[i].ISATdist + '</td><td class="tdCENT">' + data[i].PSAEdist + '</td><td class="tdCENT">' + data[i].ACTdist + '</td></tr>';
					});
				distHTML += '</tbody></table></p>';
				
		$('#schoolsLIST').html(distHTML);
		table_sorter( '#tableSCHOOLS', { groupClass: 'group' } ).hover();
		
		});
 //end get all suburban districts

			} else  

//begin get district

if(getCOUNTY == 'no' && getDIST != 'no' && getCITY == 'no' && getAll == 'no' && getAlldist == 'no'){
		$('#reportcardheading').show();

$.getJSON('../RC2014/getDistrict14.php?term=' + getDIST, function(data){

 
//Create the list of districts, with links
					
		var countyHTML = "";
		countyHTML += '<h3 align=left>' + "Schools in " + getDIST + '</h3>';
		countyHTML += '<p><strong>' + "TIP: " + '</strong>' + "The list below is sortable. Click on a category name once, and the list will sort by that category in ascending order. Click it again and the list will sort in descending order. So, if you click the heading School, the list will sort in alphabetical order. Click School again and the list will sort in reverse alphabetical order." + '</p>';
		$('#schoolsText').html(countyHTML);	
		var distHTML = "";
		distHTML += '<p><table id="tableSCHOOLS" class="tablesorter" width="565px">';
						distHTML += '<thead><tr><th class="tdLEFT">' + "School" + '</th><th data-type="float">' + "ISAT<br>Composite" + '</th><th data-type="float">' + "PSAE<br>Composite" + '</th><th data-type="float">' + "ACT<br>Score" + '</th></tr></thead><tbody>';
					$.each(data, function(i) {
						distHTML += '<tr class="group"><td class="tdLEFT"><a href="../details/?id-name=' + data[i].ID + '">' + data[i].facilityNAME + '</td><td class="tdCENT">' + data[i].isat2014SCHOOLmecomp + '</td><td class="tdCENT">' + data[i].psae2014SCHOOLmecomp + '</td><td class="tdCENT">' + data[i].actSCHOOLall + '</td></tr>';
					});
				distHTML += '</tbody></table></p>';
				
		$('#schoolsLIST').html(distHTML);
		table_sorter( '#tableSCHOOLS', { groupClass: 'group' } ).hover();
		
//________________________________________
// THIS IS THE SECTION WITH THE GENERAL INFO THAT SHOWS UP NO MATTER WHAT, AND THEN FIGURES OUT WHAT ELSE WILL SHOW UP

if(data[0].NoteDIST != ' - -'){	
				$('#schoolinfo').html(
				'<h2>' + getDIST + '</h2>' + 
				'<p><ul>' + '<li><strong>' + "District type: " + '</strong>' + data[0].districtTYPEdist + " serving grades " + data[0].gradesSERVEDdist + '</li>' + 
				'<li><strong>' + "Administrator: " + '</strong>' + data[0].AdministratorDIST + '</li>' + 
				'<li><strong>' + "Address: " + '</strong>' + data[0].AddressDIST + ", " + data[0].cityNAMEdist + ", IL " + data[0].ZipDIST + '</li>' + 
				'<li><strong>' + "Phone: " + '</strong>' + data[0].TelephoneDIST + '</li>' + 
				'<li><strong>' + "Note: " + '</strong>' + data[0].NoteDIST + '</li>' + 
				'</ul></p>' +
				'<p><br><a href="#" onclick="window.open(' + "'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href)); " + 
    '">' + '<img src="../images/fblogo.jpg" height="16" width="16">' + " Share" + '</a>' +
	" | " + 
	'<a href="https://twitter.com/share" class="twitter-share-button" data-count="none">Tweet' +
	'</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?' +
	"'http':'https'" + ';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+' + "'://platform.twitter.com/widgets.js'" +
	';fjs.parentNode.insertBefore(js,fjs);}}(document,' + " 'script', 'twitter-wjs');</script>" +
	'</p>'
				)
				} else {
				$('#schoolinfo').html(
				'<h2>' + getDIST + '</h2>' + 
				'<p><ul>' + '<li><strong>' + "District type: " + '</strong>' + data[0].districtTYPEdist + " serving grades " + data[0].gradesSERVEDdist + '</li>' + 
				'<li><strong>' + "Administrator: " + '</strong>' + data[0].AdministratorDIST + '</li>' + 
				'<li><strong>' + "Address: " + '</strong>' + data[0].AddressDIST + ", " + data[0].cityNAMEdist + ", IL " + data[0].ZipDIST + '</li>' + 
				'<li><strong>' + "Phone: " + '</strong>' + data[0].TelephoneDIST + '</li>' +  
				'</ul></p>' +
				'<p><br><a href="#" onclick="window.open(' + "'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href)); " + 
    '">' + '<img src="../images/fblogo.jpg" height="16" width="16">' + " Share" + '</a>' +
	" | " + 
	'<a href="https://twitter.com/share" class="twitter-share-button" data-count="none">Tweet' +
	'</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?' +
	"'http':'https'" + ';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+' + "'://platform.twitter.com/widgets.js'" +
	';fjs.parentNode.insertBefore(js,fjs);}}(document,' + " 'script', 'twitter-wjs');</script>" +
	'</p>'
				)
};
			
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
}

 initialize();
 
 google.maps.visualRefresh = true;
 
		});
 //end get district
			} else {
			$('#reportcardheading').hide();
			$('#schoolsText').hide();
			$('#schoolsLIST').hide();

				$('#listSCHOOLS').html(
				'<p><img src="../images/growthtables.jpg" width="585" height="3080"></p>'
				)

	};
});