$( document ).ready( function() {
	console.log("school = " + getID);
				
//$.getJSON('/RC2013//getSchool.php?term=' + getID, function(json){

	if (getID == "") { 
		console.log("please choose a school");
	} else

	$.getJSON('/ReportCards14/RC2014/getSchool14.php?term=' + getID, function(json){

				$('#loaded').hide();
				var logID = json[0].ID;
				var logSCHOOL = json[0].facilityNAME;
	
//________________________________________
// THIS IS THE SECTION WITH THE GENERAL INFO THAT SHOWS UP NO MATTER WHAT, AND THEN FIGURES OUT WHAT ELSE WILL SHOW UP
				
if(json[0].Note != ' - -'){					
				$('#schoolinfo').html(
				'<h2>' + json[0].facilityNAME + '</h2>' + 
				'<p><ul>' + '<li><strong>' + "District: " + '</strong><a href="../schools/?COUNTYlist=no&schoolsAll=no&districtsAll=no&CITYlist=no&ISAT=no&PSAE=no&ACT=no&district-name=' + json[0].districtNAME + '">' + json[0].districtNAME + '</a></li>' + 
				'<li><strong>' + "School type: " + '</strong>' + json[0].schoolTYPE + " serving grades " + json[0].gradesSERVED + '</li>' + 
				'<li><strong>' + "Administrator: " + '</strong>' + json[0].Administrator + '</li>' + 
				'<li><strong>' + "Address: " + '</strong>' + json[0].Address + ", " + json[0].cityNAME + ", IL " + json[0].Zip + '</li>' + 
				'<li><strong>' + "Phone: " + '</strong>' + json[0].Telephone + '</li>' + 
				'<li><strong>' + "Enrollment: " + '</strong>' + json[0].demSCHOOLall + '</li>' + 
				'<li><strong>' + "Note: " + '</strong>' + json[0].Note + '</li>' + 
				'</ul></p>' +
				'<p><a href="#" onclick="window.open(' + "'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href)); " + 
    '">' + '<img src="images/fblogo.jpg" height="16" width="16">' + " Share" + '</a>' +
	" | " + 
	'<a href="https://twitter.com/share" class="twitter-share-button" data-count="none">Tweet' +
	'</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?' +
	"'http':'https'" + ';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+' + "'://platform.twitter.com/widgets.js'" +
	';fjs.parentNode.insertBefore(js,fjs);}}(document,' + " 'script', 'twitter-wjs');</script>" +
	'</p>'
				)
} else {
				$('#schoolinfo').html(
				'<h2>' + json[0].facilityNAME + '</h2>' + 
				'<p><ul>' + '<li><strong>' + "District: " + '</strong><a href="../schools/?COUNTYlist=no&schoolsAll=no&districtsAll=no&CITYlist=no&ISAT=no&PSAE=no&ACT=no&district-name=' + json[0].districtNAME + '">' + json[0].districtNAME + '</a></li>' + 
				'<li><strong>' + "School type: " + '</strong>' + json[0].schoolTYPE + " serving grades " + json[0].gradesSERVED + '</li>' + 
				'<li><strong>' + "Administrator: " + '</strong>' + json[0].Administrator + '</li>' + 
				'<li><strong>' + "Address: " + '</strong>' + json[0].Address + ", " + json[0].cityNAME + ", IL " + json[0].Zip + '</li>' + 
				'<li><strong>' + "Phone: " + '</strong>' + json[0].Telephone + '</li>' + 
				'<li><strong>' + "Enrollment: " + '</strong>' + json[0].demSCHOOLall + '</li>' + 
				'</ul></p>' +
				'<p><a href="#" onclick="window.open(' + "'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href)); " + 
    '">' + '<img src="/images/fblogo.jpg" height="16" width="16">' + " Share" + '</a>' +
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
	 
	var mapLat = json[0].LATITUDE;
	var mapLong = json[0].LONGITUDE;
	var mapTitle = json[0].facilityNAME;
	var mapText =  json[0].Address + ", " + json[0].cityNAME + ", IL " + json[0].Zip;
	
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

				
		if(json[0].SCHOOL3status == 'n' && json[0].SCHOOL4status == 'n' && json[0].SCHOOL5status == 'n' && json[0].SCHOOL6status == 'n' && json[0].SCHOOL7status == 'n' && json[0].SCHOOL8status == 'n' && json[0].SCHOOL11status == 'n' ){
			$('#scores').remove();
			$('#demgroup').remove();
			$('#classsize').remove();
			$('#growth').remove();
			$('#chartList').remove();
			$('#financials').remove();
			$('#jump').remove();			
			$('#return1').remove();
			$('#return2').remove();
			$('#return3').remove();
			$('#footnotes').remove();
					
			} else {								
			$('#message').remove();
			};

//________________________________________
// THIS IS THE SECTION FOR CHARTING



			if(json[0].SCHOOL11status != 'n' && json[0].actSCHOOLall != 0){
					$('#ACTcharts').show();
					$('ul li.ACTchart').show();
					$('#ACTcounts').show();
					$('ul li.ACTcount').show();
				
		var sch05ACT = parseFloat(json[0].act2005school);
		var sch06ACT = parseFloat(json[0].act2006school);
		var sch07ACT = parseFloat(json[0].act2007school);
		var sch08ACT = parseFloat(json[0].act2008school);
		var sch09ACT = parseFloat(json[0].act2009school);
		var sch10ACT = parseFloat(json[0].act2010school);
		var sch11ACT = parseFloat(json[0].act2011school);
		var sch12ACT = parseFloat(json[0].act2012school);
		var sch13ACT = parseFloat(json[0].act2013school);
		var sch14ACT = parseFloat(json[0].actSCHOOLall);

		var dis05ACT = parseFloat(json[0].act2005district);
		var dis06ACT = parseFloat(json[0].act2006district);
		var dis07ACT = parseFloat(json[0].act2007district);
		var dis08ACT = parseFloat(json[0].act2008district);
		var dis09ACT = parseFloat(json[0].act2009district);
		var dis10ACT = parseFloat(json[0].act2010district);
		var dis11ACT = parseFloat(json[0].act2011district);
		var dis12ACT = parseFloat(json[0].act2012district);
		var dis13ACT = parseFloat(json[0].act2013district);
		var dis14ACT = parseFloat(json[0].actDISTall);

		var stt05ACT = parseFloat(json[0].act2005state);
		var stt06ACT = parseFloat(json[0].act2006state);
		var stt07ACT = parseFloat(json[0].act2007state);
		var stt08ACT = parseFloat(json[0].act2008state);
		var stt09ACT = parseFloat(json[0].act2009state);
		var stt10ACT = parseFloat(json[0].act2010state);
		var stt11ACT = parseFloat(json[0].act2011state);
		var stt12ACT = parseFloat(json[0].act2012state);
		var stt13ACT = parseFloat(json[0].act2013state);
		var stt14ACT = parseFloat(json[0].actSTATEall);


	var schoolNAME = json[0].facilityNAME;
	var schoolSCOREact = sch14ACT;
	var scoreFLOORact = Math.floor(schoolSCOREact);
	var chartACTcount = new Highcharts.Chart({
        chart: {
			renderTo: 'ACTrange',
			height: null,
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
			name: 'avg. ACT score',
        title: {
                text: 'Average ACT score'
            },
                  categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36'],
                tickInterval: 5,
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
            headerFormat: '<table><tr><td class="tdLEFT">Average ACT score: </td>' + '<td style="text-align: right"><b>{point.key}</b></td></tr>',
            pointFormat: '<tr><td style="color: {series.color}"># of schools<br>with similar score: </td>' +
            '<td style="text-align: right"><b>{point.y}</b></td></tr>',
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
			'<p class="Ppadding"><strong>Number of schools in the state with similar average ACT scores.</strong> Highlighted below, ' + selectPOINTact + ' other school(s) had a score similar to ' + json[0].facilityNAME + '\'s average ACT score of ' + json[0].actSCHOOLall + '.</p>'
		);
});

			$('#ACTnote').html(
				'<p class="Ppadding"><strong>For the school, district and state since the 2004-\'05 school year.</strong></p>'
				);

	var chartACT = new Highcharts.Chart({
        chart: {
			renderTo: 'ACTyears',
			height: null,
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
            categories: ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012','2013', '2014']
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
            data: $.map([stt05ACT, stt06ACT, stt07ACT, stt08ACT, stt09ACT, stt10ACT, stt11ACT, stt12ACT, stt13ACT, stt14ACT], function (valueACTsta) {
				return isNaN(valueACTsta) ? { y: null } : valueACTsta;
            })
	        }, {	
            name: 'District',
            data: $.map([dis05ACT, dis06ACT, dis07ACT, dis08ACT, dis09ACT, dis10ACT, dis11ACT, dis12ACT, dis13ACT, dis14ACT], function (valueACTdis) {
				return isNaN(valueACTdis) ? { y: null } : valueACTdis;
            })
	        }, {	
 			name: 'School',
            data: $.map([sch05ACT, sch06ACT, sch07ACT, sch08ACT, sch09ACT, sch10ACT, sch11ACT, sch12ACT, sch13ACT, sch14ACT], function (valueACTsch) {
				return isNaN(valueACTsch) ? { y: null } : valueACTsch;
            })
        }],
    });
			} else {
			  $('#ACTcharts').remove();
			  $('ul li.ACTchart').remove();
			  $('#ACTcounts').remove();
			  $('ul li.ACTcount').remove();
			};
			
			if(json[0].SCHOOL11status != 'n'){
					$('#PSAEcharts').show();
					$('ul li.PSAEchart').show();
					$('#PSAEcounts').show();
					$('ul li.PSAEcount').show();

				
		var sch04PSAE = parseFloat(json[0].me2004schoolPSAE);
		var sch05PSAE = parseFloat(json[0].me2005schoolPSAE);
		var sch06PSAE = parseFloat(json[0].me2006schoolPSAE);
		var sch07PSAE = parseFloat(json[0].me2007schoolPSAE);
		var sch08PSAE = parseFloat(json[0].me2008schoolPSAE);
		var sch09PSAE = parseFloat(json[0].me2009schoolPSAE);
		var sch10PSAE = parseFloat(json[0].me2010schoolPSAE);
		var sch11PSAE = parseFloat(json[0].me2011schoolPSAE);
		var sch12PSAE = parseFloat(json[0].me2012schoolPSAE);
		var sch13PSAE = parseFloat(json[0].me2013schoolPSAE);
		var sch14PSAE = parseFloat(json[0].psae2014SCHOOLmecomp);

		var dis04PSAE = parseFloat(json[0].me2004districtPSAE);
		var dis05PSAE = parseFloat(json[0].me2005districtPSAE);
		var dis06PSAE = parseFloat(json[0].me2006districtPSAE);
		var dis07PSAE = parseFloat(json[0].me2007districtPSAE);
		var dis08PSAE = parseFloat(json[0].me2008districtPSAE);
		var dis09PSAE = parseFloat(json[0].me2009districtPSAE);
		var dis10PSAE = parseFloat(json[0].me2010districtPSAE);
		var dis11PSAE = parseFloat(json[0].me2011districtPSAE);
		var dis12PSAE = parseFloat(json[0].me2012districtPSAE);
		var dis13PSAE = parseFloat(json[0].me2013districtPSAE);
		var dis14PSAE = parseFloat(json[0].psae2014DISTmecomp);

		var stt04PSAE = parseFloat(json[0].me2004statePSAE);
		var stt05PSAE = parseFloat(json[0].me2005statePSAE);
		var stt06PSAE = parseFloat(json[0].me2006statePSAE);
		var stt07PSAE = parseFloat(json[0].me2007statePSAE);
		var stt08PSAE = parseFloat(json[0].me2008statePSAE);
		var stt09PSAE = parseFloat(json[0].me2009statePSAE);
		var stt10PSAE = parseFloat(json[0].me2010statePSAE);
		var stt11PSAE = parseFloat(json[0].me2011statePSAE);
		var stt12PSAE = parseFloat(json[0].me2012statePSAE);
		var stt13PSAE = parseFloat(json[0].me2013statePSAE);
		var stt14PSAE = parseFloat(json[0].psae2014STATEmecomp);


	var schoolNAME = json[0].facilityNAME;
	var schoolSCOREPSAE = sch14PSAE;
	var scoreFLOORPSAE = Math.floor(schoolSCOREPSAE);
	var chartPSAEcount = new Highcharts.Chart({
        chart: {
			renderTo: 'PSAErange',
			height: null,
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
			name: 'Percent meets/exceeds',
        title: {
                text: 'Composite meets/exceeds PSAE score'
            },
                  categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'],
                tickInterval: 5,
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
            headerFormat: '<table><tr><td class="tdLEFT">Meets/exceeds score: </td>' + '<td style="text-align: right"><b>{point.key}</b></td></tr>',
            pointFormat: '<tr><td style="color: {series.color}"># of schools<br>with similar score: </td>' +
            '<td style="text-align: right"><b>{point.y}</b></td></tr>',
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
				'<p class="Ppadding"><strong>Number of schools in the state with a similar percentage of students meeting or exceeding PSAE standards.</strong> Highlighted below, ' + json[0].psae2014SCHOOLmecomp + '% of ' + json[0].facilityNAME + ' students met or exceeded state PSAE standards. ' + selectPOINTPSAE + ' other school(s) had a similar percentage.</p>'
				);       
    });

			$('#PSAEnote').html(
				'<p class="Ppadding"><strong>For the school, district and state since the 2003-\'04 school year.</strong></p>'
				);

	var chartPSAE = new Highcharts.Chart({
        chart: {
			renderTo: 'PSAEyears',
			height: null,
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
            categories: ['2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014']
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
            data: $.map([stt04PSAE, stt05PSAE, stt06PSAE, stt07PSAE, stt08PSAE, stt09PSAE, stt10PSAE, stt11PSAE, stt12PSAE, stt13PSAE, stt14PSAE], function (valuePSATsta) {
                return isNaN(valuePSATsta) ? { y: null } : valuePSATsta;
            })
	        }, {	
            name: 'District',
            data: $.map([dis04PSAE, dis05PSAE, dis06PSAE, dis07PSAE, dis08PSAE, dis09PSAE, dis10PSAE, dis11PSAE, dis12PSAE, dis13PSAE, dis14PSAE], function (valuePSATdis) {
                return isNaN(valuePSATdis) ? { y: null } : valuePSATdis;
            })
	        }, {	
 			name: 'School',
            data: $.map([sch04PSAE, sch05PSAE, sch06PSAE, sch07PSAE, sch08PSAE, sch09PSAE, sch10PSAE, sch11PSAE, sch12PSAE, sch13PSAE, sch14PSAE], function (valuePSATsch) {
                return isNaN(valuePSATsch) ? { y: null } : valuePSATsch;
            })
        }],
    });
			} else {
			  $('#PSAEcharts').remove();
			  $('ul li.PSAEchart').remove();
			  $('#PSAEcounts').remove();
			  $('ul li.PSAEcount').remove();
			};
			
			
				if(json[0].SCHOOL3status != 'n' || json[0].SCHOOL4status != 'n' || json[0].SCHOOL5status != 'n' || json[0].SCHOOL6status != 'n' || json[0].SCHOOL7status != 'n' || json[0].SCHOOL8status != 'n' ){
			
					$('#ISATcounts').show();
					$('ul li.ISATcount').show();
        var sch14ISAT = parseFloat(json[0].isat2014SCHOOLmecomp);

  var schoolNAME = json[0].facilityNAME;
  var schoolSCORE = sch14ISAT;
  var scoreFLOOR = Math.floor(schoolSCORE);
  var chartISATcount = new Highcharts.Chart({
        chart: {
      renderTo: 'ISATrange',
      height: null,
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
      name: 'Percent meets/exceeds',
        title: {
                text: 'Composite meets/exceeds ISAT score'
            },
                  categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'],
                tickInterval: 5,
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
            headerFormat: '<table><tr><td class="tdLEFT">Meets/exceeds score: </td>' + '<td style="text-align: right"><b>{point.key}</b></td></tr>',
            pointFormat: '<tr><td style="color: {series.color}"># of schools<br>with similar score: </td>' +
            '<td style="text-align: right"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
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
				'<p class="Ppadding"><strong>Number of schools in the state with a similar percentage of students meeting or exceeding ISAT standards.</strong> Highlighted below, ' + json[0].isat2014SCHOOLmecomp + '% of ' + json[0].facilityNAME + ' students met or exceeded state ISAT standards. ' + selectPOINT + ' other school(s) had a similar percentage.</p>'
				);       
    });
			} else {
			$('ul li.ISATcount').remove();
			$('#ISATcounts').remove();
			};

				if(json[0].SCHOOL3status != 'n' || json[0].SCHOOL4status != 'n' || json[0].SCHOOL5status != 'n' || json[0].SCHOOL6status != 'n' || json[0].SCHOOL7status != 'n' || json[0].SCHOOL8status != 'n' ){

					$('#ISATcharts').show();
					$('ul li.ISATchart').show();
					$('#ISATnote').html(
				'<p class="Ppadding"><strong>For the school, district and state since the 2003-\'04 school year.</strong> The large drop in 2013 results were affected by the state raising the minimum ISAT score students needed to achieve a rating of "meets expectations." Actual scores did not necessarily drop, but those scores may not have met the new "cut" score.</p>'
				);
	
		var sch04ISAT = parseFloat(json[0].me2004schoolISAT);
		var sch05ISAT = parseFloat(json[0].me2005schoolISAT);
		var sch06ISAT = parseFloat(json[0].me2006schoolISAT);
		var sch07ISAT = parseFloat(json[0].me2007schoolISAT);
		var sch08ISAT = parseFloat(json[0].me2008schoolISAT);
		var sch09ISAT = parseFloat(json[0].me2009schoolISAT);
		var sch10ISAT = parseFloat(json[0].me2010schoolISAT);
		var sch11ISAT = parseFloat(json[0].me2011schoolISAT);
		var sch12ISAT = parseFloat(json[0].me2012schoolISAT);
		var sch13ISAT = parseFloat(json[0].me2013schoolISAT);
		var sch14ISAT = parseFloat(json[0].isat2014SCHOOLmecomp);

		var dis04ISAT = parseFloat(json[0].me2004districtISAT);
		var dis05ISAT = parseFloat(json[0].me2005districtISAT);
		var dis06ISAT = parseFloat(json[0].me2006districtISAT);
		var dis07ISAT = parseFloat(json[0].me2007districtISAT);
		var dis08ISAT = parseFloat(json[0].me2008districtISAT);
		var dis09ISAT = parseFloat(json[0].me2009districtISAT);
		var dis10ISAT = parseFloat(json[0].me2010districtISAT);
		var dis11ISAT = parseFloat(json[0].me2011districtISAT);
		var dis12ISAT = parseFloat(json[0].me2012districtISAT);
		var dis13ISAT = parseFloat(json[0].me2013districtISAT);
		var dis14ISAT = parseFloat(json[0].isat2014DISTmecomp);

		var stt04ISAT = parseFloat(json[0].me2004stateISAT);
		var stt05ISAT = parseFloat(json[0].me2005stateISAT);
		var stt06ISAT = parseFloat(json[0].me2006stateISAT);
		var stt07ISAT = parseFloat(json[0].me2007stateISAT);
		var stt08ISAT = parseFloat(json[0].me2008stateISAT);
		var stt09ISAT = parseFloat(json[0].me2009stateISAT);
		var stt10ISAT = parseFloat(json[0].me2010stateISAT);
		var stt11ISAT = parseFloat(json[0].me2011stateISAT);
		var stt12ISAT = parseFloat(json[0].me2012stateISAT);
		var stt13ISAT = parseFloat(json[0].me2013stateISAT);
		var stt14ISAT = parseFloat(json[0].isat2014STATEmecomp);


	var chartISAT = new Highcharts.Chart({
        chart: {
			renderTo: 'ISATyears2',
			height: null,
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
            categories: ['2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014']
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
            data: $.map([stt04ISAT, stt05ISAT, stt06ISAT, stt07ISAT, stt08ISAT, stt09ISAT, stt10ISAT, stt11ISAT, stt12ISAT, stt13ISAT, stt14ISAT], function (valueISATsta) {
                return isNaN(valueISATsta) ? { y: null } : valueISATsta;
            })
	        }, {	
            name: 'District',
            data: $.map([dis04ISAT, dis05ISAT, dis06ISAT, dis07ISAT, dis08ISAT, dis09ISAT, dis10ISAT, dis11ISAT, dis12ISAT, dis13ISAT, dis14ISAT], function (valueISATdis) {
                return isNaN(valueISATdis) ? { y: null } : valueISATdis;
            })
	        }, {	
 			name: 'School',
            data: $.map([sch04ISAT, sch05ISAT, sch06ISAT, sch07ISAT, sch08ISAT, sch09ISAT, sch10ISAT, sch11ISAT, sch12ISAT, sch13ISAT, sch14ISAT], function (valueISATsch) {
                return isNaN(valueISATsch) ? { y: null } : valueISATsch;
            })
        }],
    });
			} else {
			$('ul li.ISATchart').remove();
			$('#ISATcharts').remove();
			};

//________________________________________
// THIS IS THE SECTION FOR TABULAR CHARTS GOING INTO DETAIL ON M/E
	
		
// This is eleventh grade							
				if(json[0].SCHOOL11status != 'n'){
					$('#moreTabs-11').show();
					$('ul li.list-11').show();
				$('#moreTabs-11').html(
				'<p class="Ppadding"><strong>' + "11th grade reading, math and science results" + '</strong><br><img src="../images/read.jpg" class="imgfloatL">' + "&nbsp;&nbsp;" + '<i>' + "Tip: Click the subject name for more." + '</i></p>' +
				'<p><table width="565px"><tr>' + 
				'<td width="99px" align=left><strong>' + " "  + '</strong></td><td width="150px" align=center><strong>' + "SCHOOL" + '</strong></td><td width="140px" align=center><strong>' + "DISTRICT" + '</strong></td><td width="140px" align=center><strong>' + "STATE" + '</strong></td></tr></table>' +
				'<table width="565px"><tr>' + 
				'<td class="tdmts tdLEFT"><strong>' + "Subject" + '</strong></td><td class="tdmts" align=right><strong>' + "Mts" + '</strong></td><td class="tdmts" align=right><strong>' + "Exc" + '</strong></td><td class="tdmts" align=right><strong>' + "Mts" + '</strong></td><td class="tdmts" align=right><strong>' + "Exc" + '</strong></td><td class="tdmts" align=right><strong>' + "Mts" + '</strong></td><td class="tdmts" align=right><strong>' + "Exc" + '</strong></td></tr></table>' + 
'<table width="565px"><tr><td class="tdmts tdLEFT" bgcolor="#D4D6DF"><a id="11readSHOW" href="">' + "Reading" + '</a></td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MreadSCHOOL11all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EreadSCHOOL11all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MreadDIST11all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EreadDIST11all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MreadSTATE11all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EreadSTATE11all + '</td></tr></table>' + 
				'<table id="11readSPAN" style="display: none" width="565px"><tr><td class="tdLEFT">' + "Male" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL11male + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL11male + '</td><td class="tdmts" align="right">' + json[0].MreadDIST11male + '</td><td class="tdmts" align="right">' + json[0].EreadDIST11male + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE11male + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE11male + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Female" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL11female + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL11female + '</td><td class="tdmts" align="right">' + json[0].MreadDIST11female + '</td><td class="tdmts" align="right">' + json[0].EreadDIST11female + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE11female + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE11female + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "White" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL11white + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL11white + '</td><td class="tdmts" align="right">' + json[0].MreadDIST11white + '</td><td class="tdmts" align="right">' + json[0].EreadDIST11white + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE11white + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE11white + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Black" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL11black + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL11black + '</td><td class="tdmts" align="right">' + json[0].MreadDIST11black + '</td><td class="tdmts" align="right">' + json[0].EreadDIST11black + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE11black + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE11black + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Hispanic" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL11hisp + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL11hisp + '</td><td class="tdmts" align="right">' + json[0].MreadDIST11hisp + '</td><td class="tdmts" align="right">' + json[0].EreadDIST11hisp + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE11hisp + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE11hisp + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Asian" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL11asian + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL11asian + '</td><td class="tdmts" align="right">' + json[0].MreadDIST11asian + '</td><td class="tdmts" align="right">' + json[0].EreadDIST11asian + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE11asian + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE11asian + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Low income" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL11low + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL11low + '</td><td class="tdmts" align="right">' + json[0].MreadDIST11low + '</td><td class="tdmts" align="right">' + json[0].EreadDIST11low + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE11low + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE11low + '</td></tr>' +
					'<tr><td class="tdLEFT">' + "LEP" + '<sup><a href="' + "#footnotes" + '">' + "1" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MreadSCHOOL11lep + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL11lep + '</td><td class="tdmts" align="right">' + json[0].MreadDIST11lep + '</td><td class="tdmts" align="right">' + json[0].EreadDIST11lep + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE11lep + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE11lep + '</td></tr>' +
					'<tr><td class="tdLEFT">' + "IEP" + '<sup><a href="' + "#footnotes" + '">' + "2" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MreadSCHOOL11iep + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL11iep + '</td><td class="tdmts" align="right">' + json[0].MreadDIST11iep + '</td><td class="tdmts" align="right">' + json[0].EreadDIST11iep + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE11iep + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE11iep + '</td></tr>' +			
				'</table>' + 
				'<table width="565px"><tr><td class="tdLEFT"  bgcolor="#D4D6DF"><a id="11mathSHOW" href="">' + "Math" + '</a></td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MmathSCHOOL11all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EmathSCHOOL11all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MmathDIST11all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EmathDIST11all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MmathSTATE11all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EmathSTATE11all + '</td></tr></table>' + 
				'<table id="11mathSPAN" style="display: none" width="565px"><tr><td class="tdLEFT">' + "Male" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL11male + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL11male + '</td><td class="tdmts" align="right">' + json[0].MmathDIST11male + '</td><td class="tdmts" align="right">' + json[0].EmathDIST11male + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE11male + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE11male + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Female" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL11female + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL11female + '</td><td class="tdmts" align="right">' + json[0].MmathDIST11female + '</td><td class="tdmts" align="right">' + json[0].EmathDIST11female + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE11female + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE11female + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "White" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL11white + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL11white + '</td><td class="tdmts" align="right">' + json[0].MmathDIST11white + '</td><td class="tdmts" align="right">' + json[0].EmathDIST11white + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE11white + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE11white + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Black" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL11black + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL11black + '</td><td class="tdmts" align="right">' + json[0].MmathDIST11black + '</td><td class="tdmts" align="right">' + json[0].EmathDIST11black + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE11black + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE11black + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Hispanic" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL11hisp + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL11hisp + '</td><td class="tdmts" align="right">' + json[0].MmathDIST11hisp + '</td><td class="tdmts" align="right">' + json[0].EmathDIST11hisp + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE11hisp + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE11hisp + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Asian" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL11asian + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL11asian + '</td><td class="tdmts" align="right">' + json[0].MmathDIST11asian + '</td><td class="tdmts" align="right">' + json[0].EmathDIST11asian + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE11asian + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE11asian + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Low income" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL11low + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL11low + '</td><td class="tdmts" align="right">' + json[0].MmathDIST11low + '</td><td class="tdmts" align="right">' + json[0].EmathDIST11low + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE11low + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE11low + '</td></tr>' +
					'<tr><td class="tdLEFT">' + "LEP" + '<sup><a href="' + "#footnotes" + '">' + "1" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MmathSCHOOL11lep + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL11lep + '</td><td class="tdmts" align="right">' + json[0].MmathDIST11lep + '</td><td class="tdmts" align="right">' + json[0].EmathDIST11lep + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE11lep + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE11lep + '</td></tr>' +
					'<tr><td class="tdLEFT">' + "IEP" + '<sup><a href="' + "#footnotes" + '">' + "2" + '</sup></td><td class="tdmts" align="right">' + json[0].MmathSCHOOL11iep + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL11iep + '</td><td class="tdmts" align="right">' + json[0].MmathDIST11iep + '</td><td class="tdmts" align="right">' + json[0].EmathDIST11iep + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE11iep + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE11iep + '</td></tr>' +			
				'</table>' +
				'<table width="565px"><tr><td class="tdLEFT" bgcolor="#D4D6DF"><a id="11sciSHOW" href="">' + "Science" + '</a></td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MsciSCHOOL11all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EsciSCHOOL11all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MsciDIST11all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EsciDIST11all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MsciSTATE11all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EsciSTATE11all + '</td></tr></table>' + 
				'<table id="11sciSPAN" style="display: none" width="565px"><tr><td class="tdLEFT">' + "Male" + '</td><td class="tdmts" align="right">' + json[0].MsciSCHOOL11male + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL11male + '</td><td class="tdmts" align="right">' + json[0].MsciDIST11male + '</td><td class="tdmts" align="right">' + json[0].EsciDIST11male + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE11male + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE11male + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Female" + '</td><td class="tdmts" align="right">' + json[0].MsciSCHOOL11female + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL11female + '</td><td class="tdmts" align="right">' + json[0].MsciDIST11female + '</td><td class="tdmts" align="right">' + json[0].EsciDIST11female + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE11female + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE11female + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "White" + '</td><td class="tdmts" align="right">' + json[0].MsciSCHOOL11white + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL11white + '</td><td class="tdmts" align="right">' + json[0].MsciDIST11white + '</td><td class="tdmts" align="right">' + json[0].EsciDIST11white + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE11white + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE11white + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Black" + '</td><td class="tdmts" align="right">' + json[0].MsciSCHOOL11black + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL11black + '</td><td class="tdmts" align="right">' + json[0].MsciDIST11black + '</td><td class="tdmts" align="right">' + json[0].EsciDIST11black + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE11black + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE11black + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Hispanic" + '</td><td class="tdmts" align="right">' + json[0].MsciSCHOOL11hisp + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL11hisp + '</td><td class="tdmts" align="right">' + json[0].MsciDIST11hisp + '</td><td class="tdmts" align="right">' + json[0].EsciDIST11hisp + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE11hisp + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE11hisp + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Asian" + '</td><td class="tdmts" align="right">' + json[0].MsciSCHOOL11asian + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL11asian + '</td><td class="tdmts" align="right">' + json[0].MsciDIST11asian + '</td><td class="tdmts" align="right">' + json[0].EsciDIST11asian + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE11asian + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE11asian + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Low income" + '</td><td class="tdmts" align="right">' + json[0].MsciSCHOOL11low + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL11low + '</td><td class="tdmts" align="right">' + json[0].MsciDIST11low + '</td><td class="tdmts" align="right">' + json[0].EsciDIST11low + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE11low + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE11low + '</td></tr>' +
					'<tr><td class="tdLEFT">' + "LEP" + '<sup><a href="' + "#footnotes" + '">' + "1" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MsciSCHOOL11lep + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL11lep + '</td><td class="tdmts" align="right">' + json[0].MsciDIST11lep + '</td><td class="tdmts" align="right">' + json[0].EsciDIST11lep + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE11lep + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE11lep + '</td></tr>' +
					'<tr><td class="tdLEFT">' + "IEP" + '<sup><a href="' + "#footnotes" + '">' + "2" + '</sup></td><td class="tdmts" align="right">' + json[0].MsciSCHOOL11iep + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL11iep + '</td><td class="tdmts" align="right">' + json[0].MsciDIST11iep + '</td><td class="tdmts" align="right">' + json[0].EsciDIST11iep + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE11iep + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE11iep + '</td></tr>' +			
				'</table>' +
				'</p>'
				);
			} else if(json[0].SCHOOL11status == 'n'){
			  $('#moreTabs-11').remove();
			  $('ul li.list-11').remove();
			};



// This is eighth grade							
				if(json[0].SCHOOL8status != 'n'){
						$('#moreTabs-8').show();
					    $('ul li.list-8').show();
				$('#moreTabs-8').html(
				'<p class="Ppadding"><strong>' + "8th grade reading and math results"  + '</strong><br><img src="../images/read.jpg" class="imgfloatL">' + "&nbsp;&nbsp;" + '<i>' + "Tip: Click the subject name for more." + '</i></p>' +
				'<p><table width="565px"><tr>' + 
				'<td width="99px" align=left><strong>' + " "  + '</strong></td><td width="150px" align=center><strong>' + "SCHOOL" + '</strong></td><td width="140px" align=center><strong>' + "DISTRICT" + '</strong></td><td width="140px" align=center><strong>' + "STATE" + '</strong></td></tr></table>' +
				'<table width="565px"><tr>' + 
				'<td class="tdmts" align=left width="60px"><strong>' + "Subject" + '</strong></td><td class="tdmts" align=right><strong>' + "Mts" + '</strong></td><td class="tdmts" align=right><strong>' + "Exc" + '</strong></td><td class="tdmts" align=right><strong>' + "Mts" + '</strong></td><td class="tdmts" align=right><strong>' + "Exc" + '</strong></td><td class="tdmts" align=right><strong>' + "Mts" + '</strong></td><td class="tdmts" align=right><strong>' + "Exc" + '</strong></td></tr></table>' + 
'<table width="565px"><tr><td class="tdmts tdLEFT" bgcolor="#D4D6DF"><a id="8readSHOW" href="">' + "Reading" + '</a></td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MreadSCHOOL8all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EreadSCHOOL8all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MreadDIST8all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EreadDIST8all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MreadSTATE8all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EreadSTATE8all + '</td></tr></table>' + 
				'<table id="8readSPAN" style="display: none" width="565px"><tr><td class="tdLEFT">' + "Male" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL8male + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL8male + '</td><td class="tdmts" align="right">' + json[0].MreadDIST8male + '</td><td class="tdmts" align="right">' + json[0].EreadDIST8male + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE8male + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE8male + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Female" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL8female + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL8female + '</td><td class="tdmts" align="right">' + json[0].MreadDIST8female + '</td><td class="tdmts" align="right">' + json[0].EreadDIST8female + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE8female + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE8female + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "White" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL8white + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL8white + '</td><td class="tdmts" align="right">' + json[0].MreadDIST8white + '</td><td class="tdmts" align="right">' + json[0].EreadDIST8white + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE8white + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE8white + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Black" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL8black + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL8black + '</td><td class="tdmts" align="right">' + json[0].MreadDIST8black + '</td><td class="tdmts" align="right">' + json[0].EreadDIST8black + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE8black + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE8black + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Hispanic" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL8hisp + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL8hisp + '</td><td class="tdmts" align="right">' + json[0].MreadDIST8hisp + '</td><td class="tdmts" align="right">' + json[0].EreadDIST8hisp + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE8hisp + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE8hisp + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Asian" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL8asian + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL8asian + '</td><td class="tdmts" align="right">' + json[0].MreadDIST8asian + '</td><td class="tdmts" align="right">' + json[0].EreadDIST8asian + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE8asian + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE8asian + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Low income" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL8low + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL8low + '</td><td class="tdmts" align="right">' + json[0].MreadDIST8low + '</td><td class="tdmts" align="right">' + json[0].EreadDIST8low + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE8low + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE8low + '</td></tr>' +
				'<tr><td class="tdLEFT">' + "LEP" + '<sup><a href="' + "#footnotes" + '">' + "1" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MreadSCHOOL8lep + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL8lep + '</td><td class="tdmts" align="right">' + json[0].MreadDIST8lep + '</td><td class="tdmts" align="right">' + json[0].EreadDIST8lep + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE8lep + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE8lep + '</td></tr>' +
					'<tr><td class="tdLEFT">' + "IEP" + '<sup><a href="' + "#footnotes" + '">' + "2" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MreadSCHOOL8iep + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL8iep + '</td><td class="tdmts" align="right">' + json[0].MreadDIST8iep + '</td><td class="tdmts" align="right">' + json[0].EreadDIST8iep + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE8iep + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE8iep + '</td></tr>' +			
				'</table>' + 
				'<table width="565px"><tr><td class="tdLEFT"  bgcolor="#D4D6DF"><a id="8mathSHOW" href="">' + "Math" + '</a></td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MmathSCHOOL8all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EmathSCHOOL8all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MmathDIST8all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EmathDIST8all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MmathSTATE8all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EmathSTATE8all + '</td></tr></table>' + 
				'<table id="8mathSPAN" style="display: none" width="565px"><tr><td class="tdLEFT">' + "Male" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL8male + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL8male + '</td><td class="tdmts" align="right">' + json[0].MmathDIST8male + '</td><td class="tdmts" align="right">' + json[0].EmathDIST8male + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE8male + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE8male + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Female" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL8female + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL8female + '</td><td class="tdmts" align="right">' + json[0].MmathDIST8female + '</td><td class="tdmts" align="right">' + json[0].EmathDIST8female + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE8female + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE8female + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "White" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL8white + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL8white + '</td><td class="tdmts" align="right">' + json[0].MmathDIST8white + '</td><td class="tdmts" align="right">' + json[0].EmathDIST8white + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE8white + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE8white + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Black" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL8black + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL8black + '</td><td class="tdmts" align="right">' + json[0].MmathDIST8black + '</td><td class="tdmts" align="right">' + json[0].EmathDIST8black + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE8black + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE8black + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Hispanic" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL8hisp + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL8hisp + '</td><td class="tdmts" align="right">' + json[0].MmathDIST8hisp + '</td><td class="tdmts" align="right">' + json[0].EmathDIST8hisp + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE8hisp + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE8hisp + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Asian" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL8asian + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL8asian + '</td><td class="tdmts" align="right">' + json[0].MmathDIST8asian + '</td><td class="tdmts" align="right">' + json[0].EmathDIST8asian + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE8asian + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE8asian + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Low income" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL8low + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL8low + '</td><td class="tdmts" align="right">' + json[0].MmathDIST8low + '</td><td class="tdmts" align="right">' + json[0].EmathDIST8low + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE8low + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE8low + '</td></tr>' + 				
					'<tr><td class="tdLEFT">' + "LEP" + '<sup><a href="' + "#footnotes" + '">' + "1" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MmathSCHOOL8lep + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL8lep + '</td><td class="tdmts" align="right">' + json[0].MmathDIST8lep + '</td><td class="tdmts" align="right">' + json[0].EmathDIST8lep + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE8lep + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE8lep + '</td></tr>' +
					'<tr><td class="tdLEFT">' + "IEP" + '<sup><a href="' + "#footnotes" + '">' + "2" + '</sup></td><td class="tdmts" align="right">' + json[0].MmathSCHOOL8iep + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL8iep + '</td><td class="tdmts" align="right">' + json[0].MmathDIST8iep + '</td><td class="tdmts" align="right">' + json[0].EmathDIST8iep + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE8iep + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE8iep + '</td></tr>' +			
				'</table>' +
				'</p>'
				);
			} else if(json[0].SCHOOL8status == 'n'){
			  $('#moreTabs-8').remove();
			  $('ul li.list-8').remove();
			};


// This is seventh grade							
				if(json[0].SCHOOL7status != 'n'){
					$('#moreTabs-7').show();
					$('ul li.list-7').show();
				$('#moreTabs-7').html(
				'<p class="Ppadding"><strong>' + "7th grade reading, math and science results"  + '</strong><br><img src="../images/read.jpg" class="imgfloatL">' + "&nbsp;&nbsp;" + '<i>' + "Tip: Click the subject name for more." + '</i></p>' +
				'<p><table width="565px"><tr>' + 
				'<td width="99px" align=left><strong>' + " "  + '</strong></td><td width="150px" align=center><strong>' + "SCHOOL" + '</strong></td><td width="140px" align=center><strong>' + "DISTRICT" + '</strong></td><td width="140px" align=center><strong>' + "STATE" + '</strong></td></tr></table>' +
				'<table width="565px"><tr>' + 
				'<td class="tdmts" align=left width="60px"><strong>' + "Subject" + '</strong></td><td class="tdmts" align=right><strong>' + "Mts" + '</strong></td><td class="tdmts" align=right><strong>' + "Exc" + '</strong></td><td class="tdmts" align=right><strong>' + "Mts" + '</strong></td><td class="tdmts" align=right><strong>' + "Exc" + '</strong></td><td class="tdmts" align=right><strong>' + "Mts" + '</strong></td><td class="tdmts" align=right><strong>' + "Exc" + '</strong></td></tr></table>' + 
'<table width="565px"><tr><td class="tdmts tdLEFT" bgcolor="#D4D6DF"><a id="7readSHOW" href="">' + "Reading" + '</a></td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MreadSCHOOL7all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EreadSCHOOL7all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MreadDIST7all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EreadDIST7all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MreadSTATE7all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EreadSTATE7all + '</td></tr></table>' + 
				'<table id="7readSPAN" style="display: none" width="565px"><tr><td class="tdLEFT">' + "Male" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL7male + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL7male + '</td><td class="tdmts" align="right">' + json[0].MreadDIST7male + '</td><td class="tdmts" align="right">' + json[0].EreadDIST7male + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE7male + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE7male + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Female" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL7female + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL7female + '</td><td class="tdmts" align="right">' + json[0].MreadDIST7female + '</td><td class="tdmts" align="right">' + json[0].EreadDIST7female + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE7female + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE7female + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "White" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL7white + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL7white + '</td><td class="tdmts" align="right">' + json[0].MreadDIST7white + '</td><td class="tdmts" align="right">' + json[0].EreadDIST7white + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE7white + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE7white + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Black" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL7black + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL7black + '</td><td class="tdmts" align="right">' + json[0].MreadDIST7black + '</td><td class="tdmts" align="right">' + json[0].EreadDIST7black + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE7black + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE7black + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Hispanic" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL7hisp + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL7hisp + '</td><td class="tdmts" align="right">' + json[0].MreadDIST7hisp + '</td><td class="tdmts" align="right">' + json[0].EreadDIST7hisp + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE7hisp + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE7hisp + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Asian" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL7asian + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL7asian + '</td><td class="tdmts" align="right">' + json[0].MreadDIST7asian + '</td><td class="tdmts" align="right">' + json[0].EreadDIST7asian + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE7asian + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE7asian + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Low income" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL7low + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL7low + '</td><td class="tdmts" align="right">' + json[0].MreadDIST7low + '</td><td class="tdmts" align="right">' + json[0].EreadDIST7low + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE7low + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE7low + '</td></tr>' +
				'<tr><td class="tdLEFT">' + "LEP" + '<sup><a href="' + "#footnotes" + '">' + "1" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MreadSCHOOL7lep + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL7lep + '</td><td class="tdmts" align="right">' + json[0].MreadDIST7lep + '</td><td class="tdmts" align="right">' + json[0].EreadDIST7lep + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE7lep + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE7lep + '</td></tr>' +
					'<tr><td class="tdLEFT">' + "IEP" + '<sup><a href="' + "#footnotes" + '">' + "2" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MreadSCHOOL7iep + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL7iep + '</td><td class="tdmts" align="right">' + json[0].MreadDIST7iep + '</td><td class="tdmts" align="right">' + json[0].EreadDIST7iep + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE7iep + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE7iep + '</td></tr>' +			
				'</table>' + 
				'<table width="565px"><tr><td class="tdLEFT"  bgcolor="#D4D6DF"><a id="7mathSHOW" href="">' + "Math" + '</a></td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MmathSCHOOL7all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EmathSCHOOL7all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MmathDIST7all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EmathDIST7all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MmathSTATE7all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EmathSTATE7all + '</td></tr></table>' + 
				'<table id="7mathSPAN" style="display: none" width="565px"><tr><td class="tdLEFT">' + "Male" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL7male + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL7male + '</td><td class="tdmts" align="right">' + json[0].MmathDIST7male + '</td><td class="tdmts" align="right">' + json[0].EmathDIST7male + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE7male + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE7male + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Female" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL7female + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL7female + '</td><td class="tdmts" align="right">' + json[0].MmathDIST7female + '</td><td class="tdmts" align="right">' + json[0].EmathDIST7female + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE7female + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE7female + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "White" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL7white + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL7white + '</td><td class="tdmts" align="right">' + json[0].MmathDIST7white + '</td><td class="tdmts" align="right">' + json[0].EmathDIST7white + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE7white + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE7white + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Black" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL7black + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL7black + '</td><td class="tdmts" align="right">' + json[0].MmathDIST7black + '</td><td class="tdmts" align="right">' + json[0].EmathDIST7black + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE7black + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE7black + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Hispanic" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL7hisp + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL7hisp + '</td><td class="tdmts" align="right">' + json[0].MmathDIST7hisp + '</td><td class="tdmts" align="right">' + json[0].EmathDIST7hisp + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE7hisp + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE7hisp + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Asian" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL7asian + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL7asian + '</td><td class="tdmts" align="right">' + json[0].MmathDIST7asian + '</td><td class="tdmts" align="right">' + json[0].EmathDIST7asian + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE7asian + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE7asian + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Low income" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL7low + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL7low + '</td><td class="tdmts" align="right">' + json[0].MmathDIST7low + '</td><td class="tdmts" align="right">' + json[0].EmathDIST7low + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE7low + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE7low + '</td></tr>' +
				'<tr><td class="tdLEFT">' + "LEP" + '<sup><a href="' + "#footnotes" + '">' + "1" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MmathSCHOOL7lep + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL7lep + '</td><td class="tdmts" align="right">' + json[0].MmathDIST7lep + '</td><td class="tdmts" align="right">' + json[0].EmathDIST7lep + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE7lep + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE7lep + '</td></tr>' +
					'<tr><td class="tdLEFT">' + "IEP" + '<sup><a href="' + "#footnotes" + '">' + "2" + '</sup></td><td class="tdmts" align="right">' + json[0].MmathSCHOOL7iep + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL7iep + '</td><td class="tdmts" align="right">' + json[0].MmathDIST7iep + '</td><td class="tdmts" align="right">' + json[0].EmathDIST7iep + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE7iep + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE7iep + '</td></tr>' +			
				'</table>' +
				'<table width="565px"><tr><td class="tdLEFT" bgcolor="#D4D6DF"><a id="7sciSHOW" href="">' + "Science" + '</a></td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MsciSCHOOL7all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EsciSCHOOL7all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MsciDIST7all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EsciDIST7all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MsciSTATE7all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EsciSTATE7all + '</td></tr></table>' +
				'<table id="7sciSPAN" style="display: none" width="565px"><tr><td class="tdLEFT">' + "Male" + '</td><td class="tdmts" align="right">' + json[0].MsciSCHOOL7male + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL7male + '</td><td class="tdmts" align="right">' + json[0].MsciDIST7male + '</td><td class="tdmts" align="right">' + json[0].EsciDIST7male + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE7male + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE7male + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Female" + '</td><td class="tdmts" align="right">' + json[0].MsciSCHOOL7female + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL7female + '</td><td class="tdmts" align="right">' + json[0].MsciDIST7female + '</td><td class="tdmts" align="right">' + json[0].EsciDIST7female + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE7female + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE7female + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "White" + '</td><td class="tdmts" align="right">' + json[0].MsciSCHOOL7white + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL7white + '</td><td class="tdmts" align="right">' + json[0].MsciDIST7white + '</td><td class="tdmts" align="right">' + json[0].EsciDIST7white + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE7white + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE7white + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Black" + '</td><td class="tdmts" align="right">' + json[0].MsciSCHOOL7black + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL7black + '</td><td class="tdmts" align="right">' + json[0].MsciDIST7black + '</td><td class="tdmts" align="right">' + json[0].EsciDIST7black + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE7black + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE7black + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Hispanic" + '</td><td class="tdmts" align="right">' + json[0].MsciSCHOOL7hisp + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL7hisp + '</td><td class="tdmts" align="right">' + json[0].MsciDIST7hisp + '</td><td class="tdmts" align="right">' + json[0].EsciDIST7hisp + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE7hisp + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE7hisp + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Asian" + '</td><td class="tdmts" align="right">' + json[0].MsciSCHOOL7asian + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL7asian + '</td><td class="tdmts" align="right">' + json[0].MsciDIST7asian + '</td><td class="tdmts" align="right">' + json[0].EsciDIST7asian + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE7asian + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE7asian + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Low income" + '</td><td class="tdmts" align="right">' + json[0].MsciSCHOOL7low + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL7low + '</td><td class="tdmts" align="right">' + json[0].MsciDIST7low + '</td><td class="tdmts" align="right">' + json[0].EsciDIST7low + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE7low + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE7low + '</td></tr>' + 	 				
					'<tr><td class="tdLEFT">' + "LEP" + '<sup><a href="' + "#footnotes" + '">' + "1" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MsciSCHOOL7lep + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL7lep + '</td><td class="tdmts" align="right">' + json[0].MsciDIST7lep + '</td><td class="tdmts" align="right">' + json[0].EsciDIST7lep + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE7lep + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE7lep + '</td></tr>' +
					'<tr><td class="tdLEFT">' + "IEP" + '<sup><a href="' + "#footnotes" + '">' + "2" + '</sup></td><td class="tdmts" align="right">' + json[0].MsciSCHOOL7iep + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL7iep + '</td><td class="tdmts" align="right">' + json[0].MsciDIST7iep + '</td><td class="tdmts" align="right">' + json[0].EsciDIST7iep + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE7iep + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE7iep + '</td></tr>' +			
				'</table>' +
				'</p>'
				);
			} else if(json[0].SCHOOL7status == 'n'){
			  $('#moreTabs-7').remove();
			  $('ul li.list-7').remove();
			};

// This is sixth grade							
				if(json[0].SCHOOL6status != 'n'){
						$('#moreTabs-6').show();
					    $('ul li.list-6').show();
				$('#moreTabs-6').html(
				'<p class="Ppadding"><strong>' + "6th grade reading and math results"  + '</strong><br><img src="../images/read.jpg" class="imgfloatL">' + "&nbsp;&nbsp;" + '<i>' + "Tip: Click the subject name for more." + '</i></p>' +
				'<p><table width="565px"><tr>' + 
				'<td width="99px" align=left><strong>' + " "  + '</strong></td><td width="150px" align=center><strong>' + "SCHOOL" + '</strong></td><td width="140px" align=center><strong>' + "DISTRICT" + '</strong></td><td width="140px" align=center><strong>' + "STATE" + '</strong></td></tr></table>' +
				'<table width="565px"><tr>' + 
				'<td class="tdmts" align=left width="60px"><strong>' + "Subject" + '</strong></td><td class="tdmts" align=right><strong>' + "Mts" + '</strong></td><td class="tdmts" align=right><strong>' + "Exc" + '</strong></td><td class="tdmts" align=right><strong>' + "Mts" + '</strong></td><td class="tdmts" align=right><strong>' + "Exc" + '</strong></td><td class="tdmts" align=right><strong>' + "Mts" + '</strong></td><td class="tdmts" align=right><strong>' + "Exc" + '</strong></td></tr></table>' + 
'<table width="565px"><tr><td class="tdmts tdLEFT" bgcolor="#D4D6DF"><a id="6readSHOW" href="">' + "Reading" + '</a></td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MreadSCHOOL6all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EreadSCHOOL6all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MreadDIST6all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EreadDIST6all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MreadSTATE6all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EreadSTATE6all + '</td></tr></table>' + 
				'<table id="6readSPAN" style="display: none" width="565px"><tr><td class="tdLEFT">' + "Male" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL6male + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL6male + '</td><td class="tdmts" align="right">' + json[0].MreadDIST6male + '</td><td class="tdmts" align="right">' + json[0].EreadDIST6male + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE6male + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE6male + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Female" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL6female + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL6female + '</td><td class="tdmts" align="right">' + json[0].MreadDIST6female + '</td><td class="tdmts" align="right">' + json[0].EreadDIST6female + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE6female + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE6female + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "White" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL6white + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL6white + '</td><td class="tdmts" align="right">' + json[0].MreadDIST6white + '</td><td class="tdmts" align="right">' + json[0].EreadDIST6white + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE6white + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE6white + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Black" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL6black + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL6black + '</td><td class="tdmts" align="right">' + json[0].MreadDIST6black + '</td><td class="tdmts" align="right">' + json[0].EreadDIST6black + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE6black + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE6black + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Hispanic" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL6hisp + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL6hisp + '</td><td class="tdmts" align="right">' + json[0].MreadDIST6hisp + '</td><td class="tdmts" align="right">' + json[0].EreadDIST6hisp + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE6hisp + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE6hisp + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Asian" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL6asian + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL6asian + '</td><td class="tdmts" align="right">' + json[0].MreadDIST6asian + '</td><td class="tdmts" align="right">' + json[0].EreadDIST6asian + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE6asian + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE6asian + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Low income" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL6low + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL6low + '</td><td class="tdmts" align="right">' + json[0].MreadDIST6low + '</td><td class="tdmts" align="right">' + json[0].EreadDIST6low + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE6low + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE6low + '</td></tr>' +
				'<tr><td class="tdLEFT">' + "LEP" + '<sup><a href="' + "#footnotes" + '">' + "1" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MreadSCHOOL6lep + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL6lep + '</td><td class="tdmts" align="right">' + json[0].MreadDIST6lep + '</td><td class="tdmts" align="right">' + json[0].EreadDIST6lep + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE6lep + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE6lep + '</td></tr>' +
					'<tr><td class="tdLEFT">' + "IEP" + '<sup><a href="' + "#footnotes" + '">' + "2" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MreadSCHOOL6iep + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL6iep + '</td><td class="tdmts" align="right">' + json[0].MreadDIST6iep + '</td><td class="tdmts" align="right">' + json[0].EreadDIST6iep + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE6iep + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE6iep + '</td></tr>' +			
				'</table>' +  
				'<table width="565px"><tr><td class="tdLEFT"  bgcolor="#D4D6DF"><a id="6mathSHOW" href="">' + "Math" + '</a></td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MmathSCHOOL6all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EmathSCHOOL6all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MmathDIST6all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EmathDIST6all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MmathSTATE6all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EmathSTATE6all + '</td></tr></table>' + 
				'<table id="6mathSPAN" style="display: none" width="565px"><tr><td class="tdLEFT">' + "Male" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL6male + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL6male + '</td><td class="tdmts" align="right">' + json[0].MmathDIST6male + '</td><td class="tdmts" align="right">' + json[0].EmathDIST6male + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE6male + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE6male + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Female" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL6female + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL6female + '</td><td class="tdmts" align="right">' + json[0].MmathDIST6female + '</td><td class="tdmts" align="right">' + json[0].EmathDIST6female + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE6female + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE6female + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "White" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL6white + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL6white + '</td><td class="tdmts" align="right">' + json[0].MmathDIST6white + '</td><td class="tdmts" align="right">' + json[0].EmathDIST6white + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE6white + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE6white + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Black" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL6black + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL6black + '</td><td class="tdmts" align="right">' + json[0].MmathDIST6black + '</td><td class="tdmts" align="right">' + json[0].EmathDIST6black + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE6black + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE6black + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Hispanic" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL6hisp + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL6hisp + '</td><td class="tdmts" align="right">' + json[0].MmathDIST6hisp + '</td><td class="tdmts" align="right">' + json[0].EmathDIST6hisp + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE6hisp + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE6hisp + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Asian" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL6asian + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL6asian + '</td><td class="tdmts" align="right">' + json[0].MmathDIST6asian + '</td><td class="tdmts" align="right">' + json[0].EmathDIST6asian + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE6asian + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE6asian + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Low income" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL6low + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL6low + '</td><td class="tdmts" align="right">' + json[0].MmathDIST6low + '</td><td class="tdmts" align="right">' + json[0].EmathDIST6low + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE6low + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE6low + '</td></tr>' + 				
					'<tr><td class="tdLEFT">' + "LEP" + '<sup><a href="' + "#footnotes" + '">' + "1" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MmathSCHOOL6lep + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL6lep + '</td><td class="tdmts" align="right">' + json[0].MmathDIST6lep + '</td><td class="tdmts" align="right">' + json[0].EmathDIST6lep + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE6lep + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE6lep + '</td></tr>' +
					'<tr><td class="tdLEFT">' + "IEP" + '<sup><a href="' + "#footnotes" + '">' + "2" + '</sup></td><td class="tdmts" align="right">' + json[0].MmathSCHOOL6iep + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL6iep + '</td><td class="tdmts" align="right">' + json[0].MmathDIST6iep + '</td><td class="tdmts" align="right">' + json[0].EmathDIST6iep + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE6iep + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE6iep + '</td></tr>' +			
				'</table>' +
				'</p>'
				);
			} else if(json[0].SCHOOL6status == 'n'){
			  $('#moreTabs-6').remove();
			  $('ul li.list-6').remove();
			};


// This is fifth grade							
				if(json[0].SCHOOL5status != 'n'){
						$('#moreTabs-5').show();
					    $('ul li.list-5').show();
				$('#moreTabs-5').html(
				'<p class="Ppadding"><strong>' + "5th grade reading and math results"  + '</strong><br><img src="../images/read.jpg" class="imgfloatL">' + "&nbsp;&nbsp;" + '<i>' + "Tip: Click the subject name for more." + '</i></p>' +
				'<p><table width="565px"><tr>' + 
				'<td width="99px" align=left><strong>' + " "  + '</strong></td><td width="150px" align=center><strong>' + "SCHOOL" + '</strong></td><td width="140px" align=center><strong>' + "DISTRICT" + '</strong></td><td width="140px" align=center><strong>' + "STATE" + '</strong></td></tr></table>' +
				'<table width="565px"><tr>' + 
				'<td class="tdmts" align=left width="60px"><strong>' + "Subject" + '</strong></td><td class="tdmts" align=right><strong>' + "Mts" + '</strong></td><td class="tdmts" align=right><strong>' + "Exc" + '</strong></td><td class="tdmts" align=right><strong>' + "Mts" + '</strong></td><td class="tdmts" align=right><strong>' + "Exc" + '</strong></td><td class="tdmts" align=right><strong>' + "Mts" + '</strong></td><td class="tdmts" align=right><strong>' + "Exc" + '</strong></td></tr></table>' + 
'<table width="565px"><tr><td class="tdmts tdLEFT" bgcolor="#D4D6DF"><a id="5readSHOW" href="">' + "Reading" + '</a></td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MreadSCHOOL5all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EreadSCHOOL5all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MreadDIST5all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EreadDIST5all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MreadSTATE5all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EreadSTATE5all + '</td></tr></table>' + 
				'<table id="5readSPAN" style="display: none" width="565px"><tr><td class="tdLEFT">' + "Male" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL5male + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL5male + '</td><td class="tdmts" align="right">' + json[0].MreadDIST5male + '</td><td class="tdmts" align="right">' + json[0].EreadDIST5male + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE5male + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE5male + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Female" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL5female + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL5female + '</td><td class="tdmts" align="right">' + json[0].MreadDIST5female + '</td><td class="tdmts" align="right">' + json[0].EreadDIST5female + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE5female + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE5female + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "White" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL5white + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL5white + '</td><td class="tdmts" align="right">' + json[0].MreadDIST5white + '</td><td class="tdmts" align="right">' + json[0].EreadDIST5white + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE5white + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE5white + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Black" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL5black + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL5black + '</td><td class="tdmts" align="right">' + json[0].MreadDIST5black + '</td><td class="tdmts" align="right">' + json[0].EreadDIST5black + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE5black + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE5black + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Hispanic" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL5hisp + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL5hisp + '</td><td class="tdmts" align="right">' + json[0].MreadDIST5hisp + '</td><td class="tdmts" align="right">' + json[0].EreadDIST5hisp + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE5hisp + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE5hisp + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Asian" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL5asian + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL5asian + '</td><td class="tdmts" align="right">' + json[0].MreadDIST5asian + '</td><td class="tdmts" align="right">' + json[0].EreadDIST5asian + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE5asian + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE5asian + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Low income" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL5low + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL5low + '</td><td class="tdmts" align="right">' + json[0].MreadDIST5low + '</td><td class="tdmts" align="right">' + json[0].EreadDIST5low + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE5low + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE5low + '</td></tr>' +
				'<tr><td class="tdLEFT">' + "LEP" + '<sup><a href="' + "#footnotes" + '">' + "1" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MreadSCHOOL5lep + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL5lep + '</td><td class="tdmts" align="right">' + json[0].MreadDIST5lep + '</td><td class="tdmts" align="right">' + json[0].EreadDIST5lep + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE5lep + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE5lep + '</td></tr>' +
					'<tr><td class="tdLEFT">' + "IEP" + '<sup><a href="' + "#footnotes" + '">' + "2" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MreadSCHOOL5iep + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL5iep + '</td><td class="tdmts" align="right">' + json[0].MreadDIST5iep + '</td><td class="tdmts" align="right">' + json[0].EreadDIST5iep + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE5iep + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE5iep + '</td></tr>' +			
				'</table>' + 
				'<table width="565px"><tr><td class="tdLEFT"  bgcolor="#D4D6DF"><a id="5mathSHOW" href="">' + "Math" + '</a></td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MmathSCHOOL5all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EmathSCHOOL5all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MmathDIST5all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EmathDIST5all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MmathSTATE5all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EmathSTATE5all + '</td></tr></table>' + 
				'<table id="5mathSPAN" style="display: none" width="565px"><tr><td class="tdLEFT">' + "Male" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL5male + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL5male + '</td><td class="tdmts" align="right">' + json[0].MmathDIST5male + '</td><td class="tdmts" align="right">' + json[0].EmathDIST5male + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE5male + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE5male + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Female" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL5female + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL5female + '</td><td class="tdmts" align="right">' + json[0].MmathDIST5female + '</td><td class="tdmts" align="right">' + json[0].EmathDIST5female + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE5female + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE5female + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "White" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL5white + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL5white + '</td><td class="tdmts" align="right">' + json[0].MmathDIST5white + '</td><td class="tdmts" align="right">' + json[0].EmathDIST5white + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE5white + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE5white + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Black" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL5black + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL5black + '</td><td class="tdmts" align="right">' + json[0].MmathDIST5black + '</td><td class="tdmts" align="right">' + json[0].EmathDIST5black + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE5black + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE5black + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Hispanic" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL5hisp + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL5hisp + '</td><td class="tdmts" align="right">' + json[0].MmathDIST5hisp + '</td><td class="tdmts" align="right">' + json[0].EmathDIST5hisp + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE5hisp + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE5hisp + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Asian" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL5asian + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL5asian + '</td><td class="tdmts" align="right">' + json[0].MmathDIST5asian + '</td><td class="tdmts" align="right">' + json[0].EmathDIST5asian + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE5asian + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE5asian + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Low income" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL5low + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL5low + '</td><td class="tdmts" align="right">' + json[0].MmathDIST5low + '</td><td class="tdmts" align="right">' + json[0].EmathDIST5low + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE5low + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE5low + '</td></tr>' + 				
					'<tr><td class="tdLEFT">' + "LEP" + '<sup><a href="' + "#footnotes" + '">' + "1" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MmathSCHOOL5lep + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL5lep + '</td><td class="tdmts" align="right">' + json[0].MmathDIST5lep + '</td><td class="tdmts" align="right">' + json[0].EmathDIST5lep + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE5lep + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE5lep + '</td></tr>' +
					'<tr><td class="tdLEFT">' + "IEP" + '<sup><a href="' + "#footnotes" + '">' + "2" + '</sup></td><td class="tdmts" align="right">' + json[0].MmathSCHOOL5iep + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL5iep + '</td><td class="tdmts" align="right">' + json[0].MmathDIST5iep + '</td><td class="tdmts" align="right">' + json[0].EmathDIST5iep + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE5iep + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE5iep + '</td></tr>' +			
				'</table>' +
				'</p>'
				);
			} else if(json[0].SCHOOL5status == 'n'){
			  $('#moreTabs-5').remove();
			  $('ul li.list-5').remove();
			};


// This is fourth grade							
				if(json[0].SCHOOL4status != 'n'){
					$('#moreTabs-4').show();
					$('ul li.list-4').show();
				$('#moreTabs-4').html(
				'<p class="Ppadding"><strong>' + "4th grade reading, math and science results"  + '</strong><br><img src="../images/read.jpg" class="imgfloatL">' + "&nbsp;&nbsp;" + '<i>' + "Tip: Click the subject name for more." + '</i></p>' +
				'<p><table width="565px"><tr>' + 
				'<td width="99px" align=left><strong>' + " "  + '</strong></td><td width="150px" align=center><strong>' + "SCHOOL" + '</strong></td><td width="140px" align=center><strong>' + "DISTRICT" + '</strong></td><td width="140px" align=center><strong>' + "STATE" + '</strong></td></tr></table>' +
				'<table width="565px"><tr>' + 
				'<td class="tdmts" align=left width="60px"><strong>' + "Subject" + '</strong></td><td class="tdmts" align=right><strong>' + "Mts" + '</strong></td><td class="tdmts" align=right><strong>' + "Exc" + '</strong></td><td class="tdmts" align=right><strong>' + "Mts" + '</strong></td><td class="tdmts" align=right><strong>' + "Exc" + '</strong></td><td class="tdmts" align=right><strong>' + "Mts" + '</strong></td><td class="tdmts" align=right><strong>' + "Exc" + '</strong></td></tr></table>' + 
'<table width="565px"><tr><td class="tdmts tdLEFT" bgcolor="#D4D6DF"><a id="4readSHOW" href="">' + "Reading" + '</a></td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MreadSCHOOL4all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EreadSCHOOL4all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MreadDIST4all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EreadDIST4all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MreadSTATE4all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EreadSTATE4all + '</td></tr></table>' + 
				'<table id="4readSPAN" style="display: none" width="565px"><tr><td class="tdLEFT">' + "Male" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL4male + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL4male + '</td><td class="tdmts" align="right">' + json[0].MreadDIST4male + '</td><td class="tdmts" align="right">' + json[0].EreadDIST4male + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE4male + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE4male + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Female" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL4female + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL4female + '</td><td class="tdmts" align="right">' + json[0].MreadDIST4female + '</td><td class="tdmts" align="right">' + json[0].EreadDIST4female + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE4female + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE4female + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "White" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL4white + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL4white + '</td><td class="tdmts" align="right">' + json[0].MreadDIST4white + '</td><td class="tdmts" align="right">' + json[0].EreadDIST4white + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE4white + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE4white + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Black" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL4black + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL4black + '</td><td class="tdmts" align="right">' + json[0].MreadDIST4black + '</td><td class="tdmts" align="right">' + json[0].EreadDIST4black + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE4black + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE4black + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Hispanic" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL4hisp + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL4hisp + '</td><td class="tdmts" align="right">' + json[0].MreadDIST4hisp + '</td><td class="tdmts" align="right">' + json[0].EreadDIST4hisp + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE4hisp + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE4hisp + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Asian" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL4asian + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL4asian + '</td><td class="tdmts" align="right">' + json[0].MreadDIST4asian + '</td><td class="tdmts" align="right">' + json[0].EreadDIST4asian + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE4asian + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE4asian + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Low income" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL4low + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL4low + '</td><td class="tdmts" align="right">' + json[0].MreadDIST4low + '</td><td class="tdmts" align="right">' + json[0].EreadDIST4low + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE4low + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE4low + '</td></tr>' +
				'<tr><td class="tdLEFT">' + "LEP" + '<sup><a href="' + "#footnotes" + '">' + "1" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MreadSCHOOL4lep + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL4lep + '</td><td class="tdmts" align="right">' + json[0].MreadDIST4lep + '</td><td class="tdmts" align="right">' + json[0].EreadDIST4lep + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE4lep + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE4lep + '</td></tr>' +
					'<tr><td class="tdLEFT">' + "IEP" + '<sup><a href="' + "#footnotes" + '">' + "2" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MreadSCHOOL4iep + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL4iep + '</td><td class="tdmts" align="right">' + json[0].MreadDIST4iep + '</td><td class="tdmts" align="right">' + json[0].EreadDIST4iep + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE4iep + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE4iep + '</td></tr>' +			
				'</table>' +  
				'<table width="565px"><tr><td class="tdLEFT"  bgcolor="#D4D6DF"><a id="4mathSHOW" href="">' + "Math" + '</a></td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MmathSCHOOL4all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EmathSCHOOL4all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MmathDIST4all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EmathDIST4all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MmathSTATE4all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EmathSTATE4all + '</td></tr></table>' + 
				'<table id="4mathSPAN" style="display: none" width="565px"><tr><td class="tdLEFT">' + "Male" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL4male + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL4male + '</td><td class="tdmts" align="right">' + json[0].MmathDIST4male + '</td><td class="tdmts" align="right">' + json[0].EmathDIST4male + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE4male + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE4male + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Female" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL4female + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL4female + '</td><td class="tdmts" align="right">' + json[0].MmathDIST4female + '</td><td class="tdmts" align="right">' + json[0].EmathDIST4female + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE4female + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE4female + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "White" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL4white + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL4white + '</td><td class="tdmts" align="right">' + json[0].MmathDIST4white + '</td><td class="tdmts" align="right">' + json[0].EmathDIST4white + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE4white + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE4white + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Black" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL4black + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL4black + '</td><td class="tdmts" align="right">' + json[0].MmathDIST4black + '</td><td class="tdmts" align="right">' + json[0].EmathDIST4black + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE4black + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE4black + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Hispanic" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL4hisp + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL4hisp + '</td><td class="tdmts" align="right">' + json[0].MmathDIST4hisp + '</td><td class="tdmts" align="right">' + json[0].EmathDIST4hisp + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE4hisp + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE4hisp + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Asian" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL4asian + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL4asian + '</td><td class="tdmts" align="right">' + json[0].MmathDIST4asian + '</td><td class="tdmts" align="right">' + json[0].EmathDIST4asian + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE4asian + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE4asian + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Low income" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL4low + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL4low + '</td><td class="tdmts" align="right">' + json[0].MmathDIST4low + '</td><td class="tdmts" align="right">' + json[0].EmathDIST4low + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE4low + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE4low + '</td></tr>' +
				'<tr><td class="tdLEFT">' + "LEP" + '<sup><a href="' + "#footnotes" + '">' + "1" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MmathSCHOOL4lep + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL4lep + '</td><td class="tdmts" align="right">' + json[0].MmathDIST4lep + '</td><td class="tdmts" align="right">' + json[0].EmathDIST4lep + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE4lep + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE4lep + '</td></tr>' +
					'<tr><td class="tdLEFT">' + "IEP" + '<sup><a href="' + "#footnotes" + '">' + "2" + '</sup></td><td class="tdmts" align="right">' + json[0].MmathSCHOOL4iep + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL4iep + '</td><td class="tdmts" align="right">' + json[0].MmathDIST4iep + '</td><td class="tdmts" align="right">' + json[0].EmathDIST4iep + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE4iep + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE4iep + '</td></tr>' +			
				'</table>' +
				'<table width="565px"><tr><td class="tdLEFT" bgcolor="#D4D6DF"><a id="4sciSHOW" href="">' + "Science" + '</a></td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MsciSCHOOL4all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EsciSCHOOL4all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MsciDIST4all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EsciDIST4all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MsciSTATE4all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EsciSTATE4all + '</td></tr></table>' + 
				'<table id="4sciSPAN" style="display: none" width="565px"><tr><td class="tdLEFT">' + "Male" + '</td><td class="tdmts" align="right">' + json[0].MsciSCHOOL4male + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL4male + '</td><td class="tdmts" align="right">' + json[0].MsciDIST4male + '</td><td class="tdmts" align="right">' + json[0].EsciDIST4male + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE4male + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE4male + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Female" + '</td><td class="tdmts" align="right">' + json[0].MsciSCHOOL4female + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL4female + '</td><td class="tdmts" align="right">' + json[0].MsciDIST4female + '</td><td class="tdmts" align="right">' + json[0].EsciDIST4female + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE4female + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE4female + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "White" + '</td><td class="tdmts" align="right">' + json[0].MsciSCHOOL4white + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL4white + '</td><td class="tdmts" align="right">' + json[0].MsciDIST4white + '</td><td class="tdmts" align="right">' + json[0].EsciDIST4white + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE4white + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE4white + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Black" + '</td><td class="tdmts" align="right">' + json[0].MsciSCHOOL4black + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL4black + '</td><td class="tdmts" align="right">' + json[0].MsciDIST4black + '</td><td class="tdmts" align="right">' + json[0].EsciDIST4black + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE4black + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE4black + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Hispanic" + '</td><td class="tdmts" align="right">' + json[0].MsciSCHOOL4hisp + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL4hisp + '</td><td class="tdmts" align="right">' + json[0].MsciDIST4hisp + '</td><td class="tdmts" align="right">' + json[0].EsciDIST4hisp + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE4hisp + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE4hisp + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Asian" + '</td><td class="tdmts" align="right">' + json[0].MsciSCHOOL4asian + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL4asian + '</td><td class="tdmts" align="right">' + json[0].MsciDIST4asian + '</td><td class="tdmts" align="right">' + json[0].EsciDIST4asian + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE4asian + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE4asian + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Low income" + '</td><td class="tdmts" align="right">' + json[0].MsciSCHOOL4low + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL4low + '</td><td class="tdmts" align="right">' + json[0].MsciDIST4low + '</td><td class="tdmts" align="right">' + json[0].EsciDIST4low + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE4low + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE4low + '</td></tr>' + 	 				
					'<tr><td class="tdLEFT">' + "LEP" + '<sup><a href="' + "#footnotes" + '">' + "1" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MsciSCHOOL4lep + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL4lep + '</td><td class="tdmts" align="right">' + json[0].MsciDIST4lep + '</td><td class="tdmts" align="right">' + json[0].EsciDIST4lep + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE4lep + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE4lep + '</td></tr>' +
					'<tr><td class="tdLEFT">' + "IEP" + '<sup><a href="' + "#footnotes" + '">' + "2" + '</sup></td><td class="tdmts" align="right">' + json[0].MsciSCHOOL4iep + '</td><td class="tdmts" align="right">' + json[0].EsciSCHOOL4iep + '</td><td class="tdmts" align="right">' + json[0].MsciDIST4iep + '</td><td class="tdmts" align="right">' + json[0].EsciDIST4iep + '</td><td class="tdmts" align="right">' + json[0].MsciSTATE4iep + '</td><td class="tdmts" align="right">' + json[0].EsciSTATE4iep + '</td></tr>' +			
				'</table>' +
				'</p>'
				);
			} else if(json[0].SCHOOL4status = 'n'){
			  $('#moreTabs-4').remove();
			  $('ul li.list-4').remove();
			};


// This is third grade							
				if(json[0].SCHOOL3status != 'n'){
						$('#moreTabs-3').show();
					    $('ul li.list-3').show();
				$('#moreTabs-3').html(
				'<p class="Ppadding"><strong>' + "3rd grade reading and math results"  + '</strong><br><img src="../images/read.jpg" class="imgfloatL">' + "&nbsp;&nbsp;" + '<i>' + "Tip: Click the subject name for more." + '</i></p>' +
				'<p><table width="565px"><tr>' + 
				'<td width="99px" align=left><strong>' + " "  + '</strong></td><td width="150px" align=center><strong>' + "SCHOOL" + '</strong></td><td width="140px" align=center><strong>' + "DISTRICT" + '</strong></td><td width="140px" align=center><strong>' + "STATE" + '</strong></td></tr></table>' +
				'<table width="565px"><tr>' + 
				'<td class="tdmts" align=left width="60px"><strong>' + "Subject" + '</strong></td><td class="tdmts" align=right><strong>' + "Mts" + '</strong></td><td class="tdmts" align=right><strong>' + "Exc" + '</strong></td><td class="tdmts" align=right><strong>' + "Mts" + '</strong></td><td class="tdmts" align=right><strong>' + "Exc" + '</strong></td><td class="tdmts" align=right><strong>' + "Mts" + '</strong></td><td class="tdmts" align=right><strong>' + "Exc" + '</strong></td></tr></table>' + 
				'<table width="565px"><tr><td class="tdmts tdLEFT" bgcolor="#D4D6DF"><a id="3readSHOW" href="">' + "Reading" + '</a></td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MreadSCHOOL3all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EreadSCHOOL3all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MreadDIST3all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EreadDIST3all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MreadSTATE3all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EreadSTATE3all + '</td></tr></table>' + 
				'<table id="3readSPAN" style="display: none" width="565px"><tr><td class="tdLEFT">' + "Male" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL3male + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL3male + '</td><td class="tdmts" align="right">' + json[0].MreadDIST3male + '</td><td class="tdmts" align="right">' + json[0].EreadDIST3male + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE3male + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE3male + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Female" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL3female + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL3female + '</td><td class="tdmts" align="right">' + json[0].MreadDIST3female + '</td><td class="tdmts" align="right">' + json[0].EreadDIST3female + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE3female + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE3female + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "White" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL3white + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL3white + '</td><td class="tdmts" align="right">' + json[0].MreadDIST3white + '</td><td class="tdmts" align="right">' + json[0].EreadDIST3white + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE3white + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE3white + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Black" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL3black + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL3black + '</td><td class="tdmts" align="right">' + json[0].MreadDIST3black + '</td><td class="tdmts" align="right">' + json[0].EreadDIST3black + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE3black + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE3black + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Hispanic" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL3hisp + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL3hisp + '</td><td class="tdmts" align="right">' + json[0].MreadDIST3hisp + '</td><td class="tdmts" align="right">' + json[0].EreadDIST3hisp + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE3hisp + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE3hisp + '</td></tr>' +
				'<tr><td class="tdLEFT">' + "Asian" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL3asian + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL3asian + '</td><td class="tdmts" align="right">' + json[0].MreadDIST3asian + '</td><td class="tdmts" align="right">' + json[0].EreadDIST3asian + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE3asian + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE3asian + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Low income" + '</td><td class="tdmts" align="right">' + json[0].MreadSCHOOL3low + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL3low + '</td><td class="tdmts" align="right">' + json[0].MreadDIST3low + '</td><td class="tdmts" align="right">' + json[0].EreadDIST3low + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE3low + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE3low + '</td></tr>' +
					'<tr><td class="tdLEFT">' + "LEP" + '<sup><a href="' + "#footnotes" + '">' + "1" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MreadSCHOOL3lep + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL3lep + '</td><td class="tdmts" align="right">' + json[0].MreadDIST3lep + '</td><td class="tdmts" align="right">' + json[0].EreadDIST3lep + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE3lep + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE3lep + '</td></tr>' +
					'<tr><td class="tdLEFT">' + "IEP" + '<sup><a href="' + "#footnotes" + '">' + "2" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MreadSCHOOL3iep + '</td><td class="tdmts" align="right">' + json[0].EreadSCHOOL3iep + '</td><td class="tdmts" align="right">' + json[0].MreadDIST3iep + '</td><td class="tdmts" align="right">' + json[0].EreadDIST3iep + '</td><td class="tdmts" align="right">' + json[0].MreadSTATE3iep + '</td><td class="tdmts" align="right">' + json[0].EreadSTATE3iep + '</td></tr>' +			
				'</table>' +  
				'<table width="565px"><tr><td class="tdLEFT"  bgcolor="#D4D6DF"><a id="3mathSHOW" href="">' + "Math" + '</a></td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MmathSCHOOL3all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EmathSCHOOL3all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MmathDIST3all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EmathDIST3all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].MmathSTATE3all + '</td><td class="tdmts" align="right" bgcolor="#D4D6DF">' + json[0].EmathSTATE3all + '</td></tr></table>' + 
				'<table id="3mathSPAN" style="display: none" width="565px"><tr><td class="tdLEFT">' + "Male" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL3male + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL3male + '</td><td class="tdmts" align="right">' + json[0].MmathDIST3male + '</td><td class="tdmts" align="right">' + json[0].EmathDIST3male + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE3male + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE3male + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Female" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL3female + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL3female + '</td><td class="tdmts" align="right">' + json[0].MmathDIST3female + '</td><td class="tdmts" align="right">' + json[0].EmathDIST3female + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE3female + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE3female + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "White" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL3white + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL3white + '</td><td class="tdmts" align="right">' + json[0].MmathDIST3white + '</td><td class="tdmts" align="right">' + json[0].EmathDIST3white + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE3white + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE3white + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Black" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL3black + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL3black + '</td><td class="tdmts" align="right">' + json[0].MmathDIST3black + '</td><td class="tdmts" align="right">' + json[0].EmathDIST3black + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE3black + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE3black + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Hispanic" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL3hisp + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL3hisp + '</td><td class="tdmts" align="right">' + json[0].MmathDIST3hisp + '</td><td class="tdmts" align="right">' + json[0].EmathDIST3hisp + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE3hisp + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE3hisp + '</td></tr>' +
				'<tr><td class="tdLEFT">' + "Asian" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL3asian + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL3asian + '</td><td class="tdmts" align="right">' + json[0].MmathDIST3asian + '</td><td class="tdmts" align="right">' + json[0].EmathDIST3asian + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE3asian + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE3asian + '</td></tr>' + 
				'<tr><td class="tdLEFT">' + "Low income" + '</td><td class="tdmts" align="right">' + json[0].MmathSCHOOL3low + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL3low + '</td><td class="tdmts" align="right">' + json[0].MmathDIST3low + '</td><td class="tdmts" align="right">' + json[0].EmathDIST3low + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE3low + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE3low + '</td></tr>' +
				'<tr><td class="tdLEFT">' + "LEP" + '<sup><a href="' + "#footnotes" + '">' + "1" + '</sup></a></td><td class="tdmts" align="right">' + json[0].MmathSCHOOL3lep + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL3lep + '</td><td class="tdmts" align="right">' + json[0].MmathDIST3lep + '</td><td class="tdmts" align="right">' + json[0].EmathDIST3lep + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE3lep + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE3lep + '</td></tr>' +
					'<tr><td class="tdLEFT">' + "IEP" + '<sup><a href="' + "#footnotes" + '">' + "2" + '</sup></td><td class="tdmts" align="right">' + json[0].MmathSCHOOL3iep + '</td><td class="tdmts" align="right">' + json[0].EmathSCHOOL3iep + '</td><td class="tdmts" align="right">' + json[0].MmathDIST3iep + '</td><td class="tdmts" align="right">' + json[0].EmathDIST3iep + '</td><td class="tdmts" align="right">' + json[0].MmathSTATE3iep + '</td><td class="tdmts" align="right">' + json[0].EmathSTATE3iep + '</td></tr>' +			
				'</table>' +
				'</p>'
				);
			} else if(json[0].SCHOOL3status == 'n'){
			  $('#moreTabs-3').remove();
			  $('ul li.list-3').remove();
			};
			
$("#3readSHOW").click(function () {
	$("#3readSPAN").toggle();
	return false;
	});
$("#4readSHOW").click(function () {
	$("#4readSPAN").toggle();
	return false;
	});
$("#5readSHOW").click(function () {
	$("#5readSPAN").toggle();
	return false;
	});

$("#6readSHOW").click(function () {
	$("#6readSPAN").toggle();
	return false;
	});
$("#7readSHOW").click(function () {
	$("#7readSPAN").toggle();
	return false;
	});
$("#8readSHOW").click(function () {
	$("#8readSPAN").toggle();
	return false;
	});
$("#11readSHOW").click(function () {
	$("#11readSPAN").toggle();
	return false;
	});
	
$("#3mathSHOW").click(function () {
	$("#3mathSPAN").toggle();
	return false;
	});
$("#4mathSHOW").click(function () {
	$("#4mathSPAN").toggle();
	return false;
	});
$("#5mathSHOW").click(function () {
	$("#5mathSPAN").toggle();
	return false;
	});
$("#6mathSHOW").click(function () {
	$("#6mathSPAN").toggle();
	return false;
	});
$("#7mathSHOW").click(function () {
	$("#7mathSPAN").toggle();
	return false;
	});
$("#8mathSHOW").click(function () {
	$("#8mathSPAN").toggle();
	return false;
	});
$("#11mathSHOW").click(function () {
	$("#11mathSPAN").toggle();
	return false;
	});

$("#4sciSHOW").click(function () {
	$("#4sciSPAN").toggle();
	return false;
	});
$("#7sciSHOW").click(function () {
	$("#7sciSPAN").toggle();
	return false;
	});
$("#11sciSHOW").click(function () {
	$("#11sciSPAN").toggle();
	return false;
	});


//________________________________________
// THIS IS THE SECTION FOR college readiness and graduation rates
				
	if(json[0].SCHOOL11status != 'n'){
		$('#cready').show();
		$('#cready').html(
			'<h4>GRADUATION AND COLLEGE READINESS</h4>' +
			'<p><table width="560px"><tr>' + 
			'<td width="215px" class="tdLEFT"><strong>' + "    "  + '</strong></td><td width="120px" align=right><strong>' + "SCHOOL" + '</strong></td><td width="120px" align=right><strong>' + "DISTRICT" + '</strong></td><td width="120px" align=right><strong>' + "STATE" + '</strong></td></tr>' + 
			'<td width="215px" class="tdLEFT"><strong>' + "ACT benchmarks"  + '</strong></td><td width="120px" align=right><strong>' + " " + '</strong></td><td width="120px" align=right><strong>' + " " + '</strong></td><td width="120px" align=right><strong>' + " " + '</strong></td></tr>' + 
			'<td width="215px" class="tdLEFT">' + "% met english"  + '</td><td width="120px" align=right>' + json[0].actSCHOOLengMet + '</td><td width="120px" align=right>' + json[0].actDISTengMet + '</td><td width="120px" align=right>' + json[0].actSTATEengMet + '</td></tr>' + 
			'<td width="215px" class="tdLEFT">' + "% met math"  + '</td><td width="120px" align=right>' + json[0].actSCHOOLmathMet + '</td><td width="120px" align=right>' + json[0].actDISTmathMet + '</td><td width="120px" align=right>' + json[0].actSTATEmathMet + '</td></tr>' + 
			'<td width="215px" class="tdLEFT">' + "% met reading"  + '</td><td width="120px" align=right>' + json[0].actSCHOOLreadMet + '</td><td width="120px" align=right>' + json[0].actDISTreadMet + '</td><td width="120px" align=right>' + json[0].actSTATEreadMet + '</td></tr>' + 
			'<td width="215px" class="tdLEFT">' + "% met science"  + '</td><td width="120px" align=right>' + json[0].actSCHOOLsciMet + '</td><td width="120px" align=right>' + json[0].actDISTsciMet + '</td><td width="120px" align=right>' + json[0].actSTATEsciMet + '</td></tr>' + 
			'<td width="215px" class="tdLEFT">' + "% met all"  + '</td><td width="120px" align=right>' + json[0].actSCHOOLallMet + '</td><td width="120px" align=right>' + json[0].actDISTallmet + '</td><td width="120px" align=right>' + json[0].actSTATEallMet + '</td></tr>' + 
			'<td width="215px" class="tdLEFT">' + " % college ready "  + '<sup><a href="' + "#footnotes" + '">' + "7" + '</sup></a></td><td width="120px" align=right>' + json[0].percSCHOOLcol + '</td><td width="120px" align=right>' + json[0].percDISTcol + '</td><td width="120px" align=right>' + json[0].percSTATEcol + '</td></tr>' + 
			'<td width="215px" class="tdLEFT"><strong>' + "Graduation"  + '</strong></td><td width="120px" align=right><strong>' + " " + '</strong></td><td width="120px" align=right><strong>' + " " + '</strong></td><td width="120px" align=right><strong>' + " " + '</strong></td></tr>' +
			'<td width="215px" class="tdLEFT">' + "% freshmen on track"  + '</td><td width="120px" align=right>' + json[0].percSCHOOLfresh + '</td><td width="120px" align=right>' + json[0].percDISTfresh + '</td><td width="120px" align=right>' + json[0].percSTATEfresh + '</td></tr>' +				
			'<td width="215px" class="tdLEFT">' + "% H.S. 4-year graduation"  + '</td><td width="120px" align=right>' + json[0].percHS4gradSCHOOLall + '</td><td width="120px" align=right>' + json[0].percHS4gradDISTall + '</td><td width="120px" align=right>' + json[0].percHS4gradSTATEall + '</td></tr>' +				
			'<td width="215px" class="tdLEFT">' + "% H.S. 5-year graduation "  + '</td><td width="120px" align=right>' + json[0].percHS5gradSCHOOLall + '</td><td width="120px" align=right>' + json[0].percHS5gradDISTall + '</td><td width="120px" align=right>' + json[0].percHS5gradSTATEall + '</td></tr>' +								
			'<td width="215px" class="tdLEFT">' + " Dropout rate (%) "  + '<sup><a href="' + "#footnotes" + '">' + "8" + '</sup></a></td><td width="120px" align=right>' + json[0].percdropoutSCHOOL + '</td><td width="120px" align=right>' + json[0].percdropoutDIST + '</td><td width="120px" align=right>' + json[0].percdropoutSTATE + '</td></tr>' +				
			'<td width="215px" class="tdLEFT"><strong>' + "Grads enrolled in college"  + '</strong></td><td width="120px" align=right><strong>' + " " + '</strong></td><td width="120px" align=right><strong>' + " " + '</strong></td><td width="120px" align=right><strong>' + " " + '</strong></td></tr>' +
			'<td width="215px" class="tdLEFT">' + "% within 12 months "  + '</td><td width="120px" align=right>' + json[0].percSCHOOLenroll12 + '</td><td width="120px" align=right>' + json[0].percDISTenroll12 + '</td><td width="120px" align=right>' + json[0].percSTATEenroll12 + '</td></tr>' +								
			'<td width="215px" class="tdLEFT">' + "% within 16 months "  + '</td><td width="120px" align=right>' + json[0].percSCHOOLenroll15 + '</td><td width="120px" align=right>' + json[0].percDISTenroll16 + '</td><td width="120px" align=right>' + json[0].percSTATEenroll16 + '</td></tr>' +								
			'</table>' +
			'</p>'
		);
	};


//________________________________________
// THIS IS THE SECTION FOR DEMOGRAPHIC INFORMATION


// The students charting info

		var schDEMwhite = parseFloat(json[0].demSCHOOLwhite);
		var schDEMblack = parseFloat(json[0].demSCHOOLblack);
		var schDEMhisp = parseFloat(json[0].demSCHOOLhisp);
		var schDEMasian = parseFloat(json[0].demSCHOOLasian);
		var schDEMmulti = parseFloat(json[0].demSCHOOLmulti);
		var schDEMnatam = parseFloat(json[0].demSCHOOLnatam);
		var schDEMnathaw = parseFloat(json[0].demSCHOOLnathaw);

	var chartDEMsch = new Highcharts.Chart({
        chart: {
			renderTo: 'DEMchartSCH',
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
            text: 'School'
        },
         series: [{
            name: 'School',
            data: [
                ['White', schDEMwhite],
                ['Black', schDEMblack],
                ['Hispanic', schDEMhisp],
                ['Asian', schDEMasian],
                ['Multiracial', schDEMmulti],
                ['Native American', schDEMnatam],
                ['Native Hawaiian, other', schDEMnathaw]
            ],
           showInLegend: true
        }]
		
    });

		var distDEMwhite = parseFloat(json[0].demDISTwhite);
		var distDEMblack = parseFloat(json[0].demDISTblack);
		var distDEMhisp = parseFloat(json[0].demDISThisp);
		var distDEMasian = parseFloat(json[0].demDISTasian);
		var distDEMmulti = parseFloat(json[0].demDISTmulti);
		var distDEMnatam = parseFloat(json[0].demDISTnatam);
		var distDEMnathaw = parseFloat(json[0].demDISTnathaw);

	var chartDEMsch = new Highcharts.Chart({
        chart: {
			renderTo: 'DEMchartDIST',
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
            text: 'District'
        },
        series: [{
            name: 'District',
            data: [
                ['White', distDEMwhite],
                ['Black', distDEMblack],
                ['Hispanic', distDEMhisp],
                ['Asian', distDEMasian],
                ['Multiracial', distDEMmulti],
                ['Native American', distDEMnatam],
                ['Native Hawaiian, other', distDEMnathaw]
            ],
           showInLegend: true
        }]
		
    });

//The students tabular info
				
				$('#demographicsStu').html(
				'<p><table width="560px"><tr>' + 
				'<td width="215px" class="tdLEFT"><strong>' + "    "  + '</strong></td><td width="120px" align=right><strong>' + "SCHOOL" + '</strong></td><td width="120px" align=right><strong>' + "DISTRICT" + '</strong></td><td width="120px" align=right><strong>' + "STATE" + '</strong></td></tr>' +
				'<tr><td width="160px" class="tdLEFT" bgcolor="#D4D6DF">' + "  All " + '</td><td width="120px" align="right" bgcolor="#D4D6DF">' + json[0].demSCHOOLall + '</td><td width="120px" align="right" bgcolor="#D4D6DF">' + json[0].demDISTall + '</td><td width="120px" align="right" bgcolor="#D4D6DF">' + json[0].demSTATEall + '</td></tr>' + 
				'<tr><td width="215px" class="tdLEFT">' + "  % white " + '</td><td width="120px" align="right">' + json[0].demSCHOOLwhite + '</td><td width="120px" align="right">' + json[0].demDISTwhite + '</td><td width="120px" align="right">' + json[0].demSTATEwhite + '</td></tr>' + 
				'<tr><td width="215px" class="tdLEFT">' + "  % black " + '</td><td width="120px" align="right">' + json[0].demSCHOOLblack + '</td><td width="120px" align="right">' + json[0].demDISTblack + '</td><td width="120px" align="right">' + json[0].demSTATEblack + '</td></tr>' + 
				'<tr><td width="215px" class="tdLEFT">' + "  % hispanic " + '</td><td width="120px" align="right">' + json[0].demSCHOOLhisp + '</td><td width="120px" align="right">' + json[0].demDISThisp + '</td><td width="120px" align="right">' + json[0].demSTATEhisp + '</td></tr>' + 
				'<tr><td width="215px" class="tdLEFT">' + "  % asian " + '</td><td width="120px" align="right">' + json[0].demSCHOOLasian + '</td><td width="120px" align="right">' + json[0].demDISTasian + '</td><td width="120px" align="right">' + json[0].demSTATEasian + '</td></tr>' + 
				'<tr><td width="215px" class="tdLEFT">' + "  % multiple races " + '</td><td width="120px" align="right">' + json[0].demSCHOOLmulti + '</td><td width="120px" align="right">' + json[0].demDISTmulti + '</td><td width="120px" align="right">' + json[0].demSTATEmulti + '</td></tr>' + 
				'<tr><td width="215px" class="tdLEFT">' + "  % native american " + '</td><td width="120px" align="right">' + json[0].demSCHOOLnatam + '</td><td width="120px" align="right">' + json[0].demDISTnatam + '</td><td width="120px" align="right">' + json[0].demSTATEnatam + '</td></tr>' + 
				'<tr><td width="215px" class="tdLEFT">' + "  % native Hawaiian, other " + '</td><td width="120px" align="right">' + json[0].demSCHOOLnathaw + '</td><td width="120px" align="right">' + json[0].demDISTnathaw + '</td><td width="120px" align="right">' + json[0].demSTATEnathaw + '</td></tr>' + 
				'</table>' +
				'</p>'
				);
				
//________________________________________
// THIS IS THE SECTION FOR ATTENDANCE 
				
				$('#attend').html(
				'<p><table width="560px"><tr>' + 
				'<td width="215px" class="tdLEFT"><strong>' + "Additional demographics"  + '</strong></td><td width="120px" align=right><strong>' + " " + '</strong></td><td width="120px" align=right><strong>' + " " + '</strong></td><td width="120px" align=right><strong>' + " " + '</strong></td></tr>' +
				'<td width="215px" class="tdLEFT">' + "  % low income " + '</td><td width="120px" align="right">' + json[0].demSCHOOLlow + '</td><td width="120px" align="right">' + json[0].demDISTlow + '</td><td width="120px" align="right">' + json[0].demSTATElow + '</td></tr>' + 
				'<td width="215px" class="tdLEFT">' + "  % LEP " + '</td><td width="120px" align="right">' + json[0].demSCHOOLLlep + '</td><td width="120px" align="right">' + json[0].demDISTlep + '</td><td width="120px" align="right">' + json[0].demSTATElep + '</td></tr>' + 
				'<td width="215px" class="tdLEFT">' + "  % IEP " + '</td><td width="120px" align="right">' + json[0].demSCHOOLLiep + '</td><td width="120px" align="right">' + json[0].demDISTiep + '</td><td width="120px" align="right">' + json[0].demSTATEiep + '</td></tr>' + 
				'<td width="215px" class="tdLEFT">' + "  % homeless " + '<sup><a href="' + "#footnotes" + '">' + "3" + '</sup></a></td><td width="120px" align="right">' + json[0].demSCHOOLhome + '</td><td width="120px" align="right">' + json[0].demDISThome + '</td><td width="120px" align="right">' + json[0].demSTATEhome + '</td></tr>' + 
					'<td width="215px" class="tdLEFT">' + " Attendance rate (%) "  + '<sup><a href="' + "#footnotes" + '">' + "4" + '</sup></a></td><td width="120px" align=right>' + json[0].percattendSCHOOLall + '</td><td width="120px" align=right>' + json[0].percattendDISTall + '</td><td width="120px" align=right>' + json[0].percattendSTATEall + '</td></tr>' +				
					'<td width="215px" class="tdLEFT">' + " Mobility rate (%) "  + '<sup><a href="' + "#footnotes" + '">' + "5" + '</sup></a></td><td width="120px" align=right>' + json[0].percmobileSCHOOL + '</td><td width="120px" align=right>' + json[0].percmobileDIST + '</td><td width="120px" align=right>' + json[0].percmobileSTATE + '</td></tr>' +				
					'<td width=215px" class="tdLEFT">' + " Truancy rate (%) "  + '<sup><a href="' + "#footnotes" + '">' + "6" + '</sup></a></td><td width="120px" align=right>' + json[0].perctruantSCHOOL + '</td><td width="120px" align=right>' + json[0].perctruantDIST + '</td><td width="120px" align=right>' + json[0].perctruantSTATE + '</td></tr>' +				
				'</table>' +
				'</p>'
				);


// The teacher charting info

		var dteachDEMwhite = parseFloat(json[0].teacherDISTpercwhite);
		var dteachDEMblack = parseFloat(json[0].teacherDISTpercblack);
		var dteachDEMhisp = parseFloat(json[0].teacherDISTperchisp);
		var dteachDEMasian = parseFloat(json[0].teacherDISTpercasian);
		var dteachDEMmulti = parseFloat(json[0].teacherDISTpercmulti);
		var dteachDEMnatam = parseFloat(json[0].teacherDISTpercnatam);
		var dteachDEMnathaw = parseFloat(json[0].teacherDISTpercnathaw);

	var chartDEMdteach = new Highcharts.Chart({
        chart: {
			renderTo: 'DEMteachDIST',
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
            text: 'District'
        },
         series: [{
            name: 'School',
            data: [
                ['White', dteachDEMwhite],
                ['Black', dteachDEMblack],
                ['Hispanic', dteachDEMhisp],
                ['Asian', dteachDEMasian],
                ['Multiracial', dteachDEMmulti],
                ['Native American', dteachDEMnatam],
                ['Native Hawaiian, other', dteachDEMnathaw]
            ],
           showInLegend: true
        }]
		
    });

		var SteachDEMwhite = parseFloat(json[0].teacherSTATEpercwhite);
		var SteachDEMblack = parseFloat(json[0].teacherSTATEpercblack);
		var SteachDEMhisp = parseFloat(json[0].teacherSTATEperchisp);
		var SteachDEMasian = parseFloat(json[0].teacherSTATEpercasian);
		var SteachDEMmulti = parseFloat(json[0].teacherSTATEpercmulti);
		var SteachDEMnatam = parseFloat(json[0].teacherSTATEpercnatam);
		var SteachDEMnathaw = parseFloat(json[0].teacherSTATEpercnathaw);

	var chartDEMSteach = new Highcharts.Chart({
        chart: {
			renderTo: 'DEMteachSTATE',
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
            text: 'State'
        },
        series: [{
            name: 'State',
            data: [
                ['White', SteachDEMwhite],
                ['Black', SteachDEMblack],
                ['Hispanic', SteachDEMhisp],
                ['Asian', SteachDEMasian],
                ['Multiracial', SteachDEMmulti],
                ['Native American', SteachDEMnatam],
                ['Native Hawaiian, other', SteachDEMnathaw]
            ],
           showInLegend: true
        }]
		
    });

//The teacher tabular info
				
				$('#demographicsTeach').html(
				'<p><table width="560px"><tr>' + 
				'<td width="215px" class="tdLEFT" ><strong>' + "    "  + '</strong></td><td width="180px" align=right><strong>' + "DISTRICT" + '</strong></td><td width="180px" align=right><strong>' + "STATE" + '</strong></td></tr>' +
				'<td width="160px" class="tdLEFT"  bgcolor="#D4D6DF">' + "  All " + '</td><td width="180px" align="right" bgcolor="#D4D6DF">' + json[0].teacherDISTtotalFTE + '</td><td width="180px" align="right" bgcolor="#D4D6DF">' + json[0].teacherSTATEtotalFTE + '</td></tr>' + 
				'<td width="215px" class="tdLEFT" >' + "  % white " + '</td><td width="180px" align="right">' + json[0].teacherDISTpercwhite + '</td><td width="180px" align="right">' + json[0].teacherSTATEpercwhite + '</td></tr>' + 
				'<td width="215px" class="tdLEFT" >' + "  % black " + '</td><td width="180px" align="right">' + json[0].teacherDISTpercblack + '</td><td width="180px" align="right">' + json[0].teacherSTATEpercblack + '</td></tr>' + 
				'<td width="215px" class="tdLEFT" >' + "  % hispanic " + '</td><td width="180px" align="right">' + json[0].teacherDISTperchisp + '</td><td width="180px" align="right">' + json[0].teacherSTATEperchisp + '</td></tr>' + 
				'<td width="215px" class="tdLEFT" >' + "  % asian " + '</td><td width="180px" align="right">' + json[0].teacherDISTpercasian + '</td><td width="180px" align="right">' + json[0].teacherSTATEpercasian + '</td></tr>' + 
				'<td width="215px" class="tdLEFT" >' + "  % multiple races " + '</td><td width="180px" align="right">' + json[0].teacherDISTpercmulti + '</td><td width="180px" align="right">' + json[0].teacherSTATEpercmulti + '</td></tr>' + 
				'<td width="215px" class="tdLEFT" >' + "  % native american " + '</td><td width="180px" align="right">' + json[0].teacherDISTpercnatam + '</td><td width="180px" align="right">' + json[0].teacherSTATEpercnatam + '</td></tr>' + 
				'<td width="215px" class="tdLEFT" >' + "  % native Hawaiian, other " + '</td><td width="180px" align="right">' + json[0].teacherDISTpercnathaw + '</td><td width="180px" align="right">' + json[0].teacherSTATEpercnathaw + '</td></tr>' + 
				'<td width="215px" class="tdLEFT" ><strong>' + "Gender"  + '</strong></td><td width="180px" align=right><strong>' + " " + '</strong></td><td width="180px" align=right><strong>' + " " + '</strong></td></tr>' +
				'<td width="160px" class="tdLEFT" >' + "% Male" + '</td><td width="180px" align="right">' + json[0].teacherDISTpercmale + '</td><td width="180px" align="right">' + json[0].teacherSTATEpercmale + '</td></tr>' + 
				'<td width="215px" class="tdLEFT" >' + "% Female" + '</td><td width="180px" align="right">' + json[0].teacherDISTpercfemale + '</td><td width="180px" align="right">' + json[0].teacherSTATEpercfemale + '</td></tr>' + 
				'<td width="215px" class="tdLEFT" ><strong>' + "Experience"  + '</strong></td><td width="180px" align=right><strong>' + " " + '</strong></td><td width="180px" align=right><strong>' + " " + '</strong></td></tr>' +
				'<td width="160px" class="tdLEFT" >' + "Avg. years experience" + '</td><td width="180px" align="right">' + json[0].teacherDISTavgExp + '</td><td width="180px" align="right">' + json[0].teacherSTATEavgExp + '</td></tr>' + 
				'<td width="215px" class="tdLEFT" >' + "% Bachelors degree" + '</td><td width="180px" align="right">' + json[0].teacherDISTbach + '</td><td width="180px" align="right">' + json[0].teacherSTATEbach + '</td></tr>' + 
				'<td width="215px" class="tdLEFT" >' + "% Masters +" + '</td><td width="180px" align="right">' + json[0].teacherDISTmast + '</td><td width="180px" align="right">' + json[0].teacherSTATEmast + '</td></tr>' + 
				'</table>' +
				'</p>'
				);


//________________________________________
// THIS IS THE SECTION FOR CLASS SIZE INFO
	
	var classSizeInfoBlock = '<p><table width="100%"><tr>' + 
	'<td width="25%" class="tdLEFT"><strong>' + "CLASS SIZE (GRADE)"  + '</strong></td><td width="25%" align=right><strong>' + "SCHOOL" + '</strong></td><td width="25%" align=right><strong>' + "DISTRICT" + '</strong></td><td width="25%" align=right><strong>' + "STATE" + '</strong></td></tr>';

	if(json[0].sizeSCHOOL3 != '0.0'){
		classSizeInfoBlock += '<tr>' +
		'<td width="25%" class="tdLEFT">' + "3rd"  + '</td><td width="25%" align=right>' + json[0].sizeSCHOOL3 + '</td><td width="25%" align=right>' + json[0].sizeDIST3 + '</td><td width="25%" align=right>' + json[0].sizeSTATE3 + '</td></tr>';
	}
	if(json[0].sizeSCHOOL4 != '0.0'){
		classSizeInfoBlock += '<tr>' +
		'<td width="25%" class="tdLEFT">' + "4th"  + '</td><td width="25%" align=right>' + json[0].sizeSCHOOL4 + '</td><td width="25%" align=right>' + json[0].sizeDIST4 + '</td><td width="25%" align=right>' + json[0].sizeSTATE4 + '</td></tr>';
	}
	if(json[0].sizeSCHOOL5 != '0.0'){
		classSizeInfoBlock += '<tr>' +
		'<td width="25%" class="tdLEFT">' + "5th"  + '</td><td width="25%" align=right>' + json[0].sizeSCHOOL5 + '</td><td width="25%" align=right>' + json[0].sizeDIST5 + '</td><td width="25%" align=right>' + json[0].sizeSTATE5 + '</td></tr>'
	}
	if(json[0].sizeSCHOOL6 != '0.0'){
		classSizeInfoBlock += '<tr>' +
		'<td width="25%" class="tdLEFT">' + "6th"  + '</td><td width="25%" align=right>' + json[0].sizeSCHOOL6 + '</td><td width="25%" align=right>' + json[0].sizeDIST6 + '</td><td width="25%" align=right>' + json[0].sizeSTATE6 + '</td></tr>';
	}
	if(json[0].sizeSCHOOL7 != '0.0'){
		classSizeInfoBlock += '<tr>' +
		'<td width="25%" class="tdLEFT">' + "7th"  + '</td><td width="25%" align=right>' + json[0].sizeSCHOOL7 + '</td><td width="25%" align=right>' + json[0].sizeDIST7 + '</td><td width="25%" align=right>' + json[0].sizeSTATE7 + '</td></tr>';
	}
	if(json[0].sizeSCHOOL8 != '0.0'){
		classSizeInfoBlock += '<tr>' +
		'<td width="25%" class="tdLEFT">' + "8th"  + '</td><td width="25%" align=right>' + json[0].sizeSCHOOL8 + '</td><td width="25%" align=right>' + json[0].sizeDIST8 + '</td><td width="25%" align=right>' + json[0].sizeSTATE8 + '</td></tr>';
	}
	if(json[0].sizeSCHOOLhs != '0.0'){
		classSizeInfoBlock += '<tr>' +
		'<td width="25%" class="tdLEFT">' + "11th"  + '</td><td width="25%" align=right>' + json[0].sizeSCHOOLhs + '</td><td width="25%" align=right>' + json[0].sizeDISThs + '</td><td width="25%" align=right>' + json[0].sizeSTATEhs + '</td></tr>';
	}
	classSizeInfoBlock += '<tr>' + '<td width="31%" class="tdLEFT"><strong>Pupil-teacher ratio</strong></td><td width="23%" align=right>' + " " + '</td><td width="23%" align=right>' + " " + '</td><td width="23%" align=right>' + " " + '</td></tr>';
	
	if(json[0].SCHOOL11status == 'y' && json[0].SCHOOL7status == 'n' && json[0].SCHOOL8status == 'n'){
				var junkVAR = 0;
				} else {
		classSizeInfoBlock += '<tr>' + '<td width="25%" class="tdLEFT">' + "Elementary school"  + '</td><td width="25%" align=right>' + "N/A" + '</td><td width="25%" align=right>' + json[0].teacherratioDISTelem + '</td><td width="25%" align=right>' + json[0].teacherratioSTATEelem + '</td></tr>';
	}

	if(json[0].sizeSCHOOLhs != '0.0'){
		classSizeInfoBlock += '<tr>' + '<td width="25%" class="tdLEFT">' + "High School"  + '</td><td width="25%" align=right>' + "N/A" + '</td><td width="25%" align=right>' + json[0].teacherratioDISThs + '</td><td width="25%" align=right>' + json[0].teacherratioSTATEhs + '</td></tr>';
	}

	classSizeInfoBlock += '<tr>' + '<td width="25%" class="tdLEFT"><strong>Teacher retention rate</strong></td><td width="25%" align=right>' + json[0].teacherSCHOOLret + '</td><td width="25%" align=right>' + json[0].teacherDISTret + '</td><td width="25%" align=right>' + json[0].teacherSTATEret + '</td></tr>';
	classSizeInfoBlock += '<tr>' + '<td width="25%" class="tdLEFT"><strong>Principal turnover</strong></td><td width="25%" align=right>' + json[0].principalSCHOOLturn + '</td><td width="25%" align=right>' + json[0].principalDISTturn + '</td><td width="25%" align=right>' + json[0].principalSTATEturn + '</td></tr>';
	classSizeInfoBlock += '</table><p><i>(Number of principals within 6 years)</i></p>'
	$('p.cSize-head').html( classSizeInfoBlock );




//The code for financials section

				$('#salary').html(
				'<p><table width="585px"><tr>' + 
				'<td width="215px" class="tdLEFT"><strong>' + "SALARY"  + '</strong></td><td width="190px" align="right"><strong>' + "DISTRICT" + '</strong></td><td width="190px" align="right"><strong>' + "STATE" + '</strong></td></tr>' +
				'<td width="215px" class="tdLEFT">' + "  Avg. teacher" + '</td><td width="180px" align="right">' + json[0].teachsalDIST + '</td><td width="180px" align="right">' + json[0].teachsalSTATE + '</td></tr>' + 
				'<td width="215px" class="tdLEFT">' + "  Avg. administrator " + '</td><td width="190px" align="right">' + json[0].adminsalDIST + '</td><td width="190px" align="right">' + json[0].adminsalSTATE + '</td></tr>' + 
				'<td width="215px" class="tdLEFT"><strong>' + "PER PUPIL SPENDING"  + '</strong></td><td width="190px" align="right"><strong>' + "DISTRICT" + '</strong></td><td width="190px" align="right"><strong>' + "STATE" + '</strong></td></tr>' +
				'<td width="215px" class="tdLEFT">' + "  Instruction" + '</td><td width="190px" align="right">' + json[0].InstExpPupilDIST + '</td><td width="190px" align="right">' + json[0].InstExpPupilSTATE + '</td></tr>' + 
				'<td width="215px" class="tdLEFT">' + "  Operations" + '</td><td width="190px" align="right">' + json[0].OtherExpPupilDIST + '</td><td width="190px" align="right">' + json[0].OtherExpPupilSTATE + '</td></tr>' + 
				'</table>' +
				'</p>'
				);


// Revenue charting info

		var propDISTperc = parseFloat(json[0].fundLocPropDISTperc);
		var stateDISTperc = parseFloat(json[0].fundStateAidDISTperc);
		var fedDISTperc = parseFloat(json[0].fundFedDISTperc);
		var otherLocDISTperc = parseFloat(json[0].fundOtherDISTperc);
		var otherStateDISTperc = parseFloat(json[0].fundOtherStateDISTperc);

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

		var propSTATEperc = parseFloat(json[0].fundLocPropSTATEperc);
		var stateSTATEperc = parseFloat(json[0].fundStateAidSTATEperc);
		var fedSTATEperc = parseFloat(json[0].fundFedSTATEperc);
		var otherLocSTATEperc = parseFloat(json[0].fundOtherSTATEperc);
		var otherStateSTATEperc = parseFloat(json[0].fundOtherStateSTATEperc);

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
				'<p><table width="585px"><tr>' + 
				'<tr><td width="215px" class="tdLEFT"><strong>' + " "  + '</strong></td><td width="170px" align="center"><strong>' + " "  + '</strong></td><td width="100px" align="center"><strong>' + "EXPENDITURES" + '</strong></td><td width="100px" align="center"><strong>' +  " "  + '<strong></td></tr>' +
				'<tr><td width="215px" class="tdLEFT"><strong>' + "CATEGORY"  + '</strong></td><td width="170px" align="right"><strong>' + "Amount" + '</strong></td><td width="100px" align="right"><strong>' + "% of total<br>district<br>spending" + '</strong></td><td width="100px" align="right"><strong>' + "Versus state % average" + '</strong></td></tr>' +
				'<tr><td width="215px" class="tdLEFT">' + "  Instruction" + '</td><td width="170px" align="right">' + json[0].InstDollars + '</td><td width="100px" align="right">' + json[0].InstDollarsDISTperc + '</strong></td><td width="100px" align="right">' + json[0].InstDollarsSTATEperc + '</td></tr>' + 
				'<tr><td width="215px" class="tdLEFT">' + "  General administration" + '</td><td width="170px" align="right">' + json[0].GenAdminDollars + '</td><td width="100px" align="right">' + json[0].GenAdminDISTperc + '</strong></td><td width="100px" align="right">' + json[0].GenAdminSTATEperc + '</td></tr>' + 
				'<tr><td width="215px" class="tdLEFT">' + "  Support services" + '</td><td width="170px" align="right">' + json[0].SupportServDollars + '</td><td width="100px" align="right">' + json[0].SupportServDISTperc + '</strong></td><td width="100px" align="right">' + json[0].SupportServSTATEperc + '</td></tr>' + 
				'<tr><td width="215px" class="tdLEFT">' + "  Other expenditures" + '</td><td width="170px" align="right">' + json[0].OtherExpDollars + '</td><td width="100px" align="right">' + json[0].OtherExpDISTperc + '</strong></td><td width="100px" align="right">' + json[0].OtherExpSTATEperc + '</td></tr>' + 
				'<tr><td width="215px" class="tdLEFT">' + "  Education fund" + '</td><td width="170px" align="right">' + json[0].EdFundDollars + '</td><td width="100px" align="right">' + json[0].EdFundDISTperc + '</strong></td><td width="100px" align="right">' + json[0].EdFundSTATEperc + '</td></tr>' + 
				'<tr><td width="215px" class="tdLEFT">' + "  Operations" + '</td><td width="170px" align="right">' + json[0].OpBmDollars + '</td><td width="100px" align="right">' + json[0].OpBmDISTperc + '</strong></td><td width="100px" align="right">' + json[0].OpBmSTATEperc + '</td></tr>' + 
				'<tr><td width="215px" class="tdLEFT">' + "  Transportation" + '</td><td width="170px" align="right">' + json[0].TransportDollars + '</td><td width="100px" align="right">' + json[0].TransportDISTperc + '</strong></td><td width="100px" align="right">' + json[0].TransportSTATEperc + '</td></tr>' + 
				'<tr><td width="215px" class="tdLEFT">' + "  Debt service" + '</td><td width="170px" align="right">' + json[0].DebtServDollars + '</td><td width="100px" align="right">' + json[0].DebtServDISTperc + '</strong></td><td width="100px" align="right">' + json[0].DebtServSTATEperc + '</td></tr>' + 
				'<tr><td width="215px" class="tdLEFT">' + "  Tort" + '</td><td width="170px" align="right">' + json[0].TortDollars + '</td><td width="100px" align="right">' + json[0].TortDISTperc + '</strong></td><td width="100px" align="right">' + json[0].TortSTATEperc + '</td></tr>' + 
				'<tr><td width="215px" class="tdLEFT">' + "  Pension, Social security" + '</td><td width="170px" align="right">' + json[0].MuncRetSocDollars + '</td><td width="100px" align="right">' + json[0].MuncRetSocDISTperc + '</strong></td><td width="100px" align="right">' + json[0].MuncRetSocSTATEperc + '</td></tr>' + 
				'<tr><td width="215px" class="tdLEFT">' + "  Fire prevention and safety" + '</td><td width="170px" align="right">' + json[0].FirePrevDollars + '</td><td width="100px" align="right">' + json[0].FirePrevDISTperc + '</strong></td><td width="100px" align="right">' + json[0].FirePrevSTATEperc + '</td></tr>' + 
				'<tr><td width="215px" class="tdLEFT">' + "  Capital projects" + '</td><td width="170px" align="right">' + json[0].CapDollars + '</td><td width="100px" align="right">' + json[0].CapDISTperc + '</strong></td><td width="100px" align="right">' + json[0].CapSTATEperc + '</td></tr>' + 
				'</table>' +
				'</p>'
				);

// footnotes

			if(json[0].SCHOOL11status != 'n'){
				$('#footnotes').html(
				'<h3>' + "FOOTNOTES"  + '</h3>' + 
				'<p><ul><li class="li-position"><sup>1</sup><strong> LEP: </strong>Percentage of students found to be eligible for bilingual education.<a href="#scores""> BACK</a></li>' + 
				'<li class="li-position"><sup>2</sup><strong> IEP: </strong>Percentage of students found to be eligible to receive special education services.<a href="#scores"> BACK</a></li>' +
				'<li class="li-position"><sup>3</sup><strong> % homeless: </strong>Percentage of students who do not have permanent and adequate homes. <a href="#attend">BACK</a></li>' +
				'<li class="li-position"><sup>4</sup><strong> Attendance rate (%): </strong>Percent of school days attended.<a href="#attend"> BACK</a></li>' +
				'<li class="li-position"><sup>5</sup><strong> Mobility rate (%): </strong>Percent of students who transfer in or out of a school. Students who transfer in and out multiple times during the year are counted each time they transfer.<a href="#attend"> BACK</a></li>' +
				'<li class="li-position"><sup>6</sup><strong> Truancy rate (%): </strong>Chronic truancy rate is the percentage of students who have been absent from school without a valid cause for five percent or more of attendance days.<a href="#attend"> BACK</a></li>' +
				'<li class="li-position"><sup>7</sup><strong> % college ready: </strong>Percentage of students who scored at least a 21 on the ACT.<a href="#cready"> BACK</a></li>' +
				'<li class="li-position"><sup>8</sup><strong> Dropout rate (%): </strong>Percent of students removed from a school\'s attendance roster. Does not include students who have passed away or suffer an extended illness, transfered to another public/private or home school, or who have been expelled.<a href="#cready"> BACK</a></li>' +
				'</ul></p>'
);
			} else {
				$('#footnotes').html(
				'<h3>' + "FOOTNOTES"  + '</h3>' + 
				'<p><ul><li class="li-position"><sup>1</sup><strong> LEP: </strong>Percentage of students found to be eligible for bilingual education.<a href="#scores""> BACK</a></li>' + 
				'<li class="li-position"><sup>2</sup><strong> IEP: </strong>Percentage of students found to be eligible to receive special education services.<a href="#scores"> BACK</a></li>' +
				'<li class="li-position"><sup>3</sup><strong> % homeless: </strong>Percentage of students who do not have permanent and adequate homes. <a href="#attend">BACK</a></li>' +
				'<li class="li-position"><sup>4</sup><strong> Attendance rate (%): </strong>Percent of school days attended.<a href="#attend"> BACK</a></li>' +
				'<li class="li-position"><sup>5</sup><strong> Mobility rate (%): </strong>Percent of students who transfer in or out of a school. Students who transfer in and out multiple times during the year are counted each time they transfer.<a href="#attend"> BACK</a></li>' +
				'<li class="li-position"><sup>6</sup><strong> Truancy rate (%): </strong>Chronic truancy rate is the percentage of students who have been absent from school without a valid cause for five percent or more of attendance days.<a href="#attend"> BACK</a></li>' +
				'</ul></p>'
);
			};

	$(function() {
//		$( "#scores" ).tab();
//		$( "#demgroup" ).tab({'active': 0});
		$( "#chartTabs" ).tab();
		$( "#topnavbar" ).tab();
		});


	});
});