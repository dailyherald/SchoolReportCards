//THIS IS WHERE SOURCE CODE WILL GO, ADDING SLASH SCRIPT AFTERWARD
//<script src="scripts/RCscript.js">

				 
$( document ).ready( function() {

 	//autocomplete to find schools
	$("#school").autocomplete({
		source: "/SchoolReportCards/RC2014/searchSchool14.php",
		minLength: 3,
		select: function(event, ui) {
				var idLog = ui.item.id;
				var schoolLog = ui.item.value;
			$('#id-name').val(idLog);
				console.log(idLog);
			$('#school-name').val(schoolLog);
				}
	});

 	//autocomplete to find districts
	$("#district").autocomplete({
		source: "/ReportCards14/RC2014/searchDistrict14.php",
		minLength: 3,
		select: function(event, ui) {
				var distID = ui.item.iddist;
				var valueLog = ui.item.value;
				var districtLog = ui.item.district;
			$('#dist-ID').val(distID);
			$('#district-county').val(valueLog);
			$('#district-name').val(districtLog);
				}
	});
	
	$("#schoolSHOW, #distSHOW, #citySHOW, #suburbs").hover(
	function() {
	$( this ).addClass( "hover" );
	}, function() {
	$( this ).removeClass( "hover" );
	}
	);
		
	$("#distSHOW").click(function () {
		$( '.searchBUTTON' ).removeClass( 'active' );
		$( this ).addClass( 'active' );
		$("#schoolFIND").hide();
		$("#districtFIND").show();
		$("#cityFIND").hide();
		$("#findALL").hide();
		return false;
		});
		
	$("#schoolSHOW").click(function () {
		$( '.searchBUTTON' ).removeClass( 'active' );
		$( this ).addClass( 'active' );
		$("#schoolFIND").show();
		$("#districtFIND").hide();
		$("#cityFIND").hide();
		$("#findALL").hide();
		return false;
		});
		
	$("#citySHOW").click(function () {
		$( '.searchBUTTON' ).removeClass( 'active' );
		$( this ).addClass( 'active' );
		$("#schoolFIND").hide();
		$("#districtFIND").hide();
		$("#cityFIND").show();
		$("#findALL").hide();
		return false;
		});

	$("#suburbs").click(function () {
		$( '.searchBUTTON' ).removeClass( 'active' );
		$( this ).addClass( 'active' );
		$("#schoolFIND").hide();
		$("#districtFIND").hide();
		$("#cityFIND").hide();
		$("#findALL").show();
		return false;
		});

	if (getID == "") { 
		console.log("please choose a school");
		$( "#mainpge" ).load( "RC2014/default.html");
	} else {
		console.log("Am I seeing this? " + getID);
		$( "#mainpge" ).load( "RC2014/schools.html",function(){
			console.log("Getting the script");
			$.getScript("scripts/RC14script.js");
			console.log("Get this " + getID);
		});
	};


// end of on doc
});