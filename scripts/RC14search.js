//THIS IS WHERE SOURCE CODE WILL GO, ADDING SLASH SCRIPT AFTERWARD
//<script src="scripts/RCscript.js">

				 
$( document ).ready( function() {

 	//autocomplete to find schools
	$("#school").autocomplete({
		source: "/SchoolReportCards/RC2014/searchSchool.php",
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
		source: "/SchoolReportCards/RC2014/searchDistrict.php",
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

//-------------------------
//What to do when searches hit submit

//Start with getting districts

if (getDIST != '' && getDIST != 'no'){
	$( "#mainpge" ).load( "RC2014/districts.html",function(){
		$.getScript("scripts/DISTscript.js");
	});
} else

//Then getting cities

if (getCITY != '' && getCITY != 'no'){
	$( "#mainpge" ).load( "RC2014/city.html");
} else

//Then getting counties

if (getCOUNTY != '' && getCOUNTY != 'no'){
	$( "#mainpge" ).load( "RC2014/county.html");
} else

//Then get all suburban schools

if (getAll == 'Chicago'){
	$( "#mainpge" ).load( "RC2014/suburbs.html");
} else

//Then get all suburban districts

if (getAlldist == 'Chicago'){
	$( "#mainpge" ).load( "RC2014/subdists.html");
} else

//Then get all ISATs

if (getISAT == 'yes'){
	$( "#mainpge" ).load( "RC2014/topISAT.html");
} else

//Then get all PSAE

if (getPSAE == 'yes'){
	$( "#mainpge" ).load( "RC2014/topPSAE.html");
} else

//Then get all growth

if (getGROW == 'yes'){
	$( "#mainpge" ).load( "RC2014/topGROW.html");
} else

//Then get all ACTs

if (getACT == 'yes'){
	$( "#mainpge" ).load( "RC2014/topACT.html");
} else

//Now get the growth scores

if (getGROWTH == 'yes'){
	$( "#mainpge" ).load( "RC2014/grow.html");
} else

// Here's getting schools

if (getID != '') { 
	$( "#mainpge" ).load( "RC2014/schools.html",function(){
		$.getScript("scripts/RC14script.js");
	});
} else {
	console.log("please choose a school");
	$( "#mainpge" ).load( "RC2014/default.html");
};

// end of on doc
});