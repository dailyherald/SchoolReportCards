//THIS IS WHERE SOURCE CODE WILL GO, ADDING SLASH SCRIPT AFTERWARD
//<script src="scripts/RCscript.js">

				 
$( document ).ready( function() {
	console.log(getTYPE);
 	//autocomplete to find schools
	$("#school").autocomplete({
		source: "/SchoolReportCards15/RC2015/searchSchool.php",
		minLength: 3,
		select: function(event, ui) {
				var idLog = ui.item.id;
				var schoolLog = ui.item.value;
				var schoolTYPE = ui.item.schtype;
			$('#id-name').val(idLog);
				console.log(idLog);
			$('#school-name').val(schoolLog);
			$('#schtype').val(schoolTYPE);
				}
	});

 	//autocomplete to find districts
	$("#district").autocomplete({
		source: "/SchoolReportCards15/RC2015/searchDistrict.php",
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
	$( "#mainpge" ).load( "RC2015/districts.html",function(){
		$.getScript("scripts/DISTscript.js");
	});
} else

//Then getting cities

if (getCITY != '' && getCITY != 'no'){
	$( "#mainpge" ).load( "RC2015/city.html");
} else

//Then getting counties

if (getCOUNTY != '' && getCOUNTY != 'no'){
	$( "#mainpge" ).load( "RC2015/county.html");
} else

//Then get all suburban schools

if (getAll == 'Chicago'){
	$( "#mainpge" ).load( "RC2015/suburbs.html");
} else

//Then get all suburban districts

if (getAlldist == 'Chicago'){
	$( "#mainpge" ).load( "RC2015/subdists.html");
} else

//Then get all ISATs

if (getISAT == 'yes'){
	$( "#mainpge" ).load( "RC2015/topISAT.html");
} else

//Then get all PSAE

if (getPSAE == 'yes'){
	$( "#mainpge" ).load( "RC2015/topPSAE.html");
} else

//Then get all growth

if (getGROW == 'yes'){
	$( "#mainpge" ).load( "RC2015/topGROW.html");
} else

//Then get all ACTs

if (getACT == 'yes'){
	$( "#mainpge" ).load( "RC2015/topACT.html");
} else

//Now get the growth scores

if (getGROWTH == 'yes'){
	$( "#mainpge" ).load( "RC2015/grow.html");
} else

// Here's handling the dam charter network schools

if (getID != '' && (getTYPE == 'CHARTER NET HIGH SCH' || getTYPE == 'CHARTER NET SCH')) { 
	$( "#mainpge" ).load( "RC2015/charternet.html",function(){
		$.getScript("scripts/RC15ch_script.js");
	});
} else 

// Here's getting schools

if (getID != '') { 
	$( "#mainpge" ).load( "RC2015/schools.html",function(){
		$.getScript("scripts/RC15script.js");
	});


} else {
	console.log("please choose a school");
	$( "#mainpge" ).load( "RC2015/default.html");
};

// end of on doc
});