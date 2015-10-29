$( document ).ready( function() {
  window.location.hash = '#mainpge';
  console.log(getID);
  if (getID == "") { 
    console.log("please choose a school");
  } else
  console.log(getID);
  $('#loaded').hide();
  $.getJSON('/SchoolReportCards15/RC2015/getSchool.php?term=' + getID, function(json){
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

  schInfo +='<p><ul><li><strong>District: </strong><a href="index.php?district-name=' + json[0].districtname + '">' + json[0].districtname + '</a></li><li><strong>School type: </strong>' + json[0].schooltype + ' serving grades ' + json[0].gradesserved + '</li><li><strong>Administrator: </strong>' + json[0].administrator + '</li><li><strong>Address: </strong>' + json[0].address + ', ' + json[0].city + ', IL ' + json[0].zip + '</li><li><strong>Phone: </strong>' + json[0].telephone + '</li><li><strong>Enrollment: </strong>' + json[0].enroll2014 + '</li>';

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

				
if(json[0].me2014schoolisat == '--' && json[0].me2014schoolpsae == '--'  ){
  $('#message').removeClass('hidden');
  $('#chnetmessage').remove();
  $('#chnetschmessage').remove();
  $('#pageControl').remove();
	$('#chartList').remove();
  $('#demgroup').remove();
	$('#financials').remove();
	$('#footnotes').remove();

	} else {
  $('#chartList').removeClass('hidden');


//____________________________________________________________________________________
//____________________________________________________________________________________
// THIS IS THE SECTION FOR SCORES CHARTING - IT MUST COME AT THE END DUE TO PARSING AND NULLS

//-----------------------------------------
// here's the high school charting

// High school scores range chart
      
if(json[0].me2014schoolpsae != '--'){

// HS scores 

      $('#HSnote').html(
        '<p class="Ppadding"><strong>For the school, district and state since the 2006-\'07 school year.</strong></p>'
        );


// High school scores

  var chartHS = new Highcharts.Chart({
        chart: {
      renderTo: 'HSyears',
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
        legend: {
            enabled: false
        },
        xAxis: {
            categories: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'],
              labels: {
                staggerLines: 2
            }
        },
        yAxis: {
      min: 0,
      max: 100,
            title: {
                text: 'High school % meets/exceeds'
            }
        },
        series: [{
            name: 'State PSAE',
            data: $.map([json[0].me2006statepsae, json[0].me2007statepsae, json[0].me2008statepsae, json[0].me2009statepsae, json[0].me2010statepsae, json[0].me2011statepsae, json[0].me2012statepsae, json[0].me2013statepsae, json[0].me2014statepsae, '--'], function (valuePSATsta) {
                return isNaN(valuePSATsta) ? { y: null } : parseFloat(valuePSATsta);
            })
          }, {  
            name: 'District PSAE',
            data: $.map([json[0].me2006districtpsae, json[0].me2007districtpsae, json[0].me2008districtpsae, json[0].me2009districtpsae, json[0].me2010districtpsae, json[0].me2011districtpsae, json[0].me2012districtpsae, json[0].me2013districtpsae, json[0].me2014districtpsae, '--'], function (valuePSATdis) {
                return isNaN(valuePSATdis) ? { y: null } : parseFloat(valuePSATdis);
            })
          }, {  
      name: 'School PSAE',
            data: $.map([json[0].me2006schoolpsae, json[0].me2007schoolpsae, json[0].me2008schoolpsae, json[0].me2009schoolpsae, json[0].me2010schoolpsae, json[0].me2011schoolpsae, json[0].me2012schoolpsae, json[0].me2013schoolpsae, json[0].me2014schoolpsae, '--'], function (valuePSATsch) {
                return isNaN(valuePSATsch) ? { y: null } : parseFloat(valuePSATsch);
            })
        },{
            type: 'line',
            name: 'State PARCC',
            data: $.map(['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'], function (valueHSsta) {
                return isNaN(valueHSsta) ? { y: null } : parseFloat(valueHSsta);
            }),
            color: '#2f7ed8',
            marker: {
              symbol: 'circle'
            }
          }, {  
            type: 'line',
            name: 'District PARCC',
            data: $.map(['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'], function (valueHSdis) {
                return isNaN(valueHSdis) ? { y: null } : parseFloat(valueHSdis);
           }),
            color: '#89a54e',
            marker: {
              symbol: 'diamond'
            }
          }, {  
            type: 'line',
            name: 'School PARCC',
            data: $.map(['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'], function (valueHSsch) {
                return isNaN(valueHSsch) ? { y: null } : parseFloat(valueHSsch);
            }),
            color: '#C65453',
            marker: {
              symbol: 'square'
            }
        }],
        tooltip: {
          crosshairs: true,
          shared: true
        },
    });


// Here's a placeholder graphic for the HS PA index

  $('#hsPAInote').html(
  '<p class="Ppadding"><strong>POVERTY-ACHIEVEMENT INDEX:</strong> The Daily Herald, in collaboration with WBEZ, examined percent meets/exceeds for public schools with similar percentages of low-income students. A school\'s index rank shows how much higher or lower their result is compared to the average for those similar schools.<br><strong>Most schools will rank between 1 and -1, with 0 (red line) being exactly average for schools in the same low-income range.</strong> For more details about our Poverty-Achievement Index, please <a href="http://reportcards.dailyherald.com/lowincome" target="_blank">click here</a>.</p>'
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
            categories: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'],
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
            data: $.map([json[0].zhsscore2006, json[0].zhsscore2007, json[0].zhsscore2008, json[0].zhsscore2009, json[0].zhsscore2010, json[0].zhsscore2011, json[0].zhsscore2012, json[0].zhsscore2013, json[0].zhsscore2014, '--'], function (valuePAIhs) {
                return isNaN(valuePAIhs) ? { y: null } : parseFloat(valuePAIhs);
            })

        }, {
            name: '% Low Income',
            type: 'line',
            data: $.map([json[0].lowinc2006, json[0].lowinc2007, json[0].lowinc2008, json[0].lowinc2009, json[0].lowinc2010, json[0].lowinc2011, json[0].lowinc2012, json[0].lowinc2013, json[0].lowinc2014, '--'], function (valueLOWhs) {
                return isNaN(valueLOWhs) ? { y: null } : parseFloat(valueLOWhs);
            })
        }]
    });


    $("ul li.hsdrop").addClass( "active" );
    $("ul li.hsdrop ul li.HSchart").addClass( "active" );
    $("#HScharts").addClass( "active" );
    $("#chartTabs").tab();

      } else {
        $('ul li.hsdrop').remove();
        $('#HScharts').remove();
        $('#hsPersp').remove();
      };

// Here's the elementary school charting

if(json[0].me2014schoolisat != '--' || json[0].me2013schoolisat != '--' ){

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
        legend: {
            enabled: false
        },
        xAxis: {
        	plotBands: [{
        		from: 6.5,
        		to: 8.5,
        		color: '#e1e1e1'
        	}],
            categories: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014','2015'],
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
        series: [{
            type: 'line',
            name: 'State ISAT',
            data: $.map([json[0].me2006stateisat, json[0].me2007stateisat, json[0].me2008stateisat, json[0].me2009stateisat, json[0].me2010stateisat, json[0].me2011stateisat, json[0].me2012stateisat, json[0].me2013stateisat, json[0].me2014stateisat, '--'], function (valueISATsta) {
                return isNaN(valueISATsta) ? { y: null } : parseFloat(valueISATsta);
            })
          }, {  
            type: 'line',
            name: 'District ISAT',
            data: $.map([json[0].me2006districtisat, json[0].me2007districtisat, json[0].me2008districtisat, json[0].me2009districtisat, json[0].me2010districtisat, json[0].me2011districtisat, json[0].me2012districtisat, json[0].me2013districtisat, json[0].me2014districtisat, '--'], function (valueISATdis) {
                return isNaN(valueISATdis) ? { y: null } : parseFloat(valueISATdis);
           })
          }, {  
            type: 'line',
            name: 'School ISAT',
            data: $.map([json[0].me2006schoolisat, json[0].me2007schoolisat, json[0].me2008schoolisat, json[0].me2009schoolisat, json[0].me2010schoolisat, json[0].me2011schoolisat, json[0].me2012schoolisat, json[0].me2013schoolisat, json[0].me2014schoolisat, '--'], function (valueISATsch) {
                return isNaN(valueISATsch) ? { y: null } : parseFloat(valueISATsch);
            })
          },{
            type: 'line',
            name: 'State PARCC',
            data: $.map(['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'], function (valueELEMsta) {
                return isNaN(valueELEMsta) ? { y: null } : parseFloat(valueELEMsta);
            }),
            color: '#2f7ed8',
            marker: {
              symbol: 'circle'
            }
          }, {  
            type: 'line',
            name: 'District PARCC',
            data: $.map(['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'], function (valueELEMdis) {
                return isNaN(valueELEMdis) ? { y: null } : parseFloat(valueELEMdis);
           }),
            color: '#89a54e',
            marker: {
              symbol: 'diamond'
            }
          }, {  
            type: 'line',
            name: 'School PARCC',
            data: $.map(['--', '--', '--', '--', '--', '--', '--', '--', '--', '--'], function (valueELEMsch) {
                return isNaN(valueELEMsch) ? { y: null } : parseFloat(valueELEMsch);
            }),
            color: '#C65453',
            marker: {
              symbol: 'square'
            }
        }],
        tooltip: {
        	crosshairs: true,
        	shared: true,
        	valueSuffix: '%'
        },
    });

//And here's the elem PA index

	$('#PAInote').html(
  '<p class="Ppadding"><strong>POVERTY-ACHIEVEMENT INDEX:</strong> The Daily Herald, in collaboration with WBEZ, examined percent meets/exceeds for public schools with similar percentages of low-income students. A school\'s index rank shows how much higher or lower their result is compared to the average for those similar schools.<br><strong>Most schools will rank between 1 and -1, with 0 (red line) being exactly average for schools in the same low-income range.</strong> For more details about our Poverty-Achievement Index, please <a href="http://reportcards.dailyherald.com/lowincome" target="_blank">click here</a>.</p>'
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
            categories: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'],
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
            data: $.map([json[0].zelemscore2006, json[0].zelemscore2007, json[0].zelemscore2008, json[0].zelemscore2009, json[0].zelemscore2010, json[0].zelemscore2011, json[0].zelemscore2012, json[0].zelemscore2013, json[0].zelemscore2014, '--'], function (valuePAI) {
                return isNaN(valuePAI) ? { y: null } : parseFloat(valuePAI);
            })

        }, {
            name: '% Low Income',
            type: 'line',
            data: $.map([json[0].lowinc2006, json[0].lowinc2007, json[0].lowinc2008, json[0].lowinc2009, json[0].lowinc2010, json[0].lowinc2011, json[0].lowinc2012, json[0].lowinc2013, json[0].lowinc2014, '--'], function (valueLOW) {
                return isNaN(valueLOW) ? { y: null } : parseFloat(valueLOW);
            })

        }]
    });


// finishing the three charts up

    $("ul li.hsdrop").removeClass( "active" );
    $("ul li.hsdrop ul li.HSchart").removeClass( "active" );
    $("#HScharts").removeClass( "active" );
    $("ul li.elemdrop li.ISATchart").addClass( "active" );
    $("ul li.elemdrop").addClass( "active" );
		$("#ISATcharts").addClass( "active" );
		$("#chartTabs" ).tab();

	} else {
		$('ul li.elemdrop').remove();
    $('#ISATcharts').remove();
		$('#elemPersp').remove();

	};


//________________________________________
// Enable the tabs

	$(function() {
		$( "#chartTabs" ).tab();
		$( "#topnavbar" ).tab();
		});

//________________________________________

// THIS IS THE END
  };
	});
});