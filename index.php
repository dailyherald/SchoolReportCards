<html lang="en">

<head>
	<meta name="viewport" content="width=device-width" />
	<title>2014 Illinois School Report Cards</title>

	<link rel="stylesheet" href="styles/jquery-ui.min.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" href="styles/css/bootstrap.min.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="styles/css/bootstrap-theme.min.css" type="text/css" media="screen" />
<!--<link rel="stylesheet" href="styles/styleSort.css" type="text/css" media="screen" />
	<script src="scripts/jquery.table.js"></script>
	<script src="scripts/jquery-1.11.3.min.js"></script>-->
	<script src="scripts/jquery-1.9.1.min.js"></script>
	<script src="scripts/jquery-ui.min.js"></script>

	<script src="scripts/RC14search.js"></script>
	<script src="scripts/highcharts.js"></script>
	<script src="scripts/js/bootstrap.min.js"></script>
	<script src="scripts/grouped-categories.js"></script>
	<link rel="stylesheet" href="styles/RCstyles.css" type="text/css" media="screen" />

	<script src='https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&'></script>

	<script type="text/javascript">
		var getID = '<?php echo filter_var($_GET["id-name"], FILTER_SANITIZE_STRING); ?>';
	</script>

	<script src="scripts/global_v2.js?updated=20120907"></script>
	<script>var $ = jQuery;</script>

</head>

<body>

<div class="container">

<nav class="navbar navbar-default navbar-static-top">
    <div class="container-fluid">

        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand">TOP LISTS</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li><a href="schools/?COUNTYlist=no&district-name=no&CITYlist=no&ISAT=yes&GROW=no&PSAE=no&ACT=no&schoolsAll=no&districtsAll=no">TOP ISAT</a></li>
                <li><a href="schools/?COUNTYlist=no&district-name=no&CITYlist=no&ISAT=no&GROW=yes&PSAE=no&ACT=no&schoolsAll=no&districtsAll=no">TOP GROWTH</a></li>
                <li><a href="schools/?COUNTYlist=no&district-name=no&CITYlist=no&ISAT=no&GROW=no&PSAE=yes&ACT=no&schoolsAll=no&districtsAll=no">TOP PSAE</a></li>
                <li><a href="schools/?COUNTYlist=no&district-name=no&CITYlist=no&ISAT=no&GROW=no&PSAE=no&ACT=yes&schoolsAll=no&districtsAll=no">TOP ACT</a></li>
            </ul>
        </div>
    </div><!-- end container-->
</nav>

<!-- where nav would go -->

	<div class="row">
	<div class="col-md-12">

	<!--Begin hidden post formA? -->
	<div class="hidden" id="hiddenDiv">
		<form id="formA" action='' method='post'>
		<input type="text" id="schools2" name="schools2">
		</form>
	</div>
	<!--End hidden post formA? -->

	<!--Begin Header -->
	<div id="header">
		<p class="schoolYear">School report card testing</p>
		<h1>Daily Herald School Checker</h1>
	    <p class="schPUMP">The vital data, the vital stats from the Illinois School Report Cards.</p>
	</div>
	<!--End Header -->

	<div role="navigation">
		<ul id="topnavbar" class="nav nav-tabs">
			<li role="presentation" class="active"><a href="#tabSchools" aria-controls="School" role="tab" data-toggle="tab">School</a></li>
			<li role="presentation"><a href="#tabDistricts" aria-controls="District" role="tab" data-toggle="tab">District</a></li>
			<li role="presentation" class="dropdown"><a href="#" aria-controls="Other" role="dropdown" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Other <span class="caret"></span></a>
				<ul class="dropdown-menu">
					<li><a href="#tabCity" aria-controls="City" role="tab" data-toggle="tab">City/County</a></li>
					<li><a href="#tabOther" aria-controls="Suburbs" role="tab" data-toggle="tab">Suburbs</a></li>
				</ul>
			</li>
		</ul>
		<div class="tab-content" style="margin-bottom:5px;border-bottom:1px dotted #ccc; padding-bottom:5px;">
			<div role="tabpanel" class="tab-pane active" id="tabSchools">
				<!--Begin school search box -->
				<div id="schoolFIND" class="schact">              
					<h5>Find a single school</h5>
					<!--<form action='details/' method='get'>-->
					<form action='index.php' method='get'>
					<p>
			            <ul>
			            <li>Type at least three letters of the school's name.</li>
			            <li>Or type the town where the school is located.</li>
			            <li>Select the school and click the "get school" button.</li>
			            </ul>
			            <br>
						<input type="text" id="school"  name="school" >
						<input type="hidden" id="id-name" name="id-name" >
						<input type="submit" id="submit" value="Get school" style="margin-top:8px;">
					</p>
					</form>
				</div>
				<!--End -->
			</div>

			<div role="tabpanel" class="tab-pane" id="tabDistricts">
				<!--Begin District search box -->
				<div id="districtFIND" class="schact">              
					<h5>Find schools by district</h5>
					<form action='schools/' method='get'>
					<p>
						<ul>
				            <li>Type at least three of the district's four-digit state number. For District 3, you would type 003, for District 46 you would type 046 and for District 211 type 211.</li>
				            <li>Select the district and click the "get district" button.</li>
				        </ul>
						<br>
						<input type="text" id="district"  name="district" >
						<input type="hidden" id="dist-ID" name="dist-ID" >
						<input type="hidden" id="district-name" name="district-name" >
						<input type="hidden" name="CITYlist" value="no">
						<input type="hidden" name="COUNTYlist" value="no">
						<input type="hidden" name="ISAT" value="no">
						<input type="hidden" name="PSAE" value="no">
						<input type="hidden" name="ACT" value="no">
						<input type="hidden" name="schoolsAll" value="no">
						<input type="hidden" name="districtsAll" value="no">
						<input type="submit" id="submit" value="Get district" style="margin-top:8px;">
					</p>
					</form>
				</div>
				<!--End -->
			</div>

			<div role="tabpanel" class="tab-pane" id="tabCity">
				<!--Begin City and County search box -->
				<div id="cityFIND" class="schact">
					<h5>Find schools by city or county</h5>

					<!-- Begin City -->
					<div class="row">
					<div class="col-sm-6">
						<form action='schools/' method='get'>
						<p class="searchOPTIONS">Select a city, then click "Get City." Or...</p>
						<p>
							<select name="CITYlist" size="5" id="CITYlist">
							<option value="Abingdon">Abingdon</option>
							<option value="Addison">Addison</option>
							<option value="Akin">Akin</option>
							<option value="Albers">Albers</option>
							<option value="Albion">Albion</option>
							<option value="Aledo">Aledo</option>
							<option value="Alexander">Alexander</option>
							<option value="Alexis">Alexis</option>
							<option value="Algonquin">Algonquin</option>
							<option value="Alhambra">Alhambra</option>
							<option value="Allendale">Allendale</option>
							<option value="Alpha">Alpha</option>
							<option value="Alsip">Alsip</option>
							<option value="Altamont">Altamont</option>
							<option value="Alton">Alton</option>
							<option value="Altona">Altona</option>
							<option value="Amboy">Amboy</option>
							<option value="Andalusia">Andalusia</option>
							<option value="Anna">Anna</option>
							<option value="Annawan">Annawan</option>
							<option value="Antioch">Antioch</option>
							<option value="Arcola">Arcola</option>
							<option value="Argenta">Argenta</option>
							<option value="Arlington Heights">Arlington Heights</option>
							<option value="Armstrong">Armstrong</option>
							<option value="Aroma Park">Aroma Park</option>
							<option value="Arthur">Arthur</option>
							<option value="Ashkum">Ashkum</option>
							<option value="Ashland">Ashland</option>
							<option value="Ashley">Ashley</option>
							<option value="Ashmore">Ashmore</option>
							<option value="Ashton">Ashton</option>
							<option value="Assumption">Assumption</option>
							<option value="Astoria">Astoria</option>
							<option value="Athens">Athens</option>
							<option value="Atlanta">Atlanta</option>
							<option value="Atwood">Atwood</option>
							<option value="Auburn">Auburn</option>
							<option value="Augusta">Augusta</option>
							<option value="Aurora">Aurora</option>
							<option value="Aviston">Aviston</option>
							<option value="Avon">Avon</option>
							<option value="Bannockburn">Bannockburn</option>
							<option value="Barrington">Barrington</option>
							<option value="Barry">Barry</option>
							<option value="Bartelso">Bartelso</option>
							<option value="Bartlett">Bartlett</option>
							<option value="Bartonville">Bartonville</option>
							<option value="Batavia">Batavia</option>
							<option value="Beach Park">Beach Park</option>
							<option value="Beardstown">Beardstown</option>
							<option value="Beckemeyer">Beckemeyer</option>
							<option value="Bedford Park">Bedford Park</option>
							<option value="Beecher">Beecher</option>
							<option value="Beecher City">Beecher City</option>
							<option value="Belle Rive">Belle Rive</option>
							<option value="Belleville">Belleville</option>
							<option value="Bellwood">Bellwood</option>
							<option value="Belvidere">Belvidere</option>
							<option value="Bement">Bement</option>
							<option value="Bensenville">Bensenville</option>
							<option value="Benson">Benson</option>
							<option value="Benton">Benton</option>
							<option value="Berkeley">Berkeley</option>
							<option value="Berwyn">Berwyn</option>
							<option value="Bethalto">Bethalto</option>
							<option value="Bethany">Bethany</option>
							<option value="Big Rock">Big Rock</option>
							<option value="Biggsville">Biggsville</option>
							<option value="Bismarck">Bismarck</option>
							<option value="Bloomingdale">Bloomingdale</option>
							<option value="Bloomington">Bloomington</option>
							<option value="Blue Island">Blue Island</option>
							<option value="Blue Mound">Blue Mound</option>
							<option value="Bluffs">Bluffs</option>
							<option value="Bluford">Bluford</option>
							<option value="Bolingbrook">Bolingbrook</option>
							<option value="Bonfield">Bonfield</option>
							<option value="Bourbonnais">Bourbonnais</option>
							<option value="Bowen">Bowen</option>
							<option value="Braceville">Braceville</option>
							<option value="Bradford">Bradford</option>
							<option value="Bradley">Bradley</option>
							<option value="Braidwood">Braidwood</option>
							<option value="Breese">Breese</option>
							<option value="Bridgeport">Bridgeport</option>
							<option value="Bridgeview">Bridgeview</option>
							<option value="Brighton">Brighton</option>
							<option value="Brimfield">Brimfield</option>
							<option value="Bristol">Bristol</option>
							<option value="Broadlands">Broadlands</option>
							<option value="Broadview">Broadview</option>
							<option value="Brookfield">Brookfield</option>
							<option value="Brookport">Brookport</option>
							<option value="Brownstown">Brownstown</option>
							<option value="Brussels">Brussels</option>
							<option value="Buda">Buda</option>
							<option value="Buffalo">Buffalo</option>
							<option value="Buffalo Grove">Buffalo Grove</option>
							<option value="Buncombe">Buncombe</option>
							<option value="Bunker Hill">Bunker Hill</option>
							<option value="Burbank">Burbank</option>
							<option value="Burlington">Burlington</option>
							<option value="Burnham">Burnham</option>
							<option value="Burr Ridge">Burr Ridge</option>
							<option value="Bushnell">Bushnell</option>
							<option value="Byron">Byron</option>
							<option value="Cahokia">Cahokia</option>
							<option value="Cairo">Cairo</option>
							<option value="Caledonia">Caledonia</option>
							<option value="Calumet City">Calumet City</option>
							<option value="Calumet Park">Calumet Park</option>
							<option value="Cambridge">Cambridge</option>
							<option value="Camp Point">Camp Point</option>
							<option value="Campbell Hill">Campbell Hill</option>
							<option value="Canton">Canton</option>
							<option value="Cantrall">Cantrall</option>
							<option value="Capron">Capron</option>
							<option value="Carbondale">Carbondale</option>
							<option value="Carlinville">Carlinville</option>
							<option value="Carlock">Carlock</option>
							<option value="Carlyle">Carlyle</option>
							<option value="Carmi">Carmi</option>
							<option value="Carol Stream">Carol Stream</option>
							<option value="Carpentersville">Carpentersville</option>
							<option value="Carrier Mills">Carrier Mills</option>
							<option value="Carrollton">Carrollton</option>
							<option value="Carterville">Carterville</option>
							<option value="Carthage">Carthage</option>
							<option value="Cary">Cary</option>
							<option value="Casey">Casey</option>
							<option value="Caseyville">Caseyville</option>
							<option value="Catlin">Catlin</option>
							<option value="Centralia">Centralia</option>
							<option value="Centreville">Centreville</option>
							<option value="Cerro Gordo">Cerro Gordo</option>
							<option value="Chadwick">Chadwick</option>
							<option value="Champaign">Champaign</option>
							<option value="Chandlerville">Chandlerville</option>
							<option value="Channahon">Channahon</option>
							<option value="Charleston">Charleston</option>
							<option value="Chatham">Chatham</option>
							<option value="Chatsworth">Chatsworth</option>
							<option value="Chebanse">Chebanse</option>
							<option value="Chenoa">Chenoa</option>
							<option value="Cherry">Cherry</option>
							<option value="Cherry Valley">Cherry Valley</option>
							<option value="Chester">Chester</option>
							<option value="Chicago">Chicago</option>
							<option value="Chicago Heights">Chicago Heights</option>
							<option value="Chicago Ridge">Chicago Ridge</option>
							<option value="Chillicothe">Chillicothe</option>
							<option value="Chrisman">Chrisman</option>
							<option value="Christopher">Christopher</option>
							<option value="Cicero">Cicero</option>
							<option value="Cisne">Cisne</option>
							<option value="Cissna Park">Cissna Park</option>
							<option value="Clarendon Hills">Clarendon Hills</option>
							<option value="Clay City">Clay City</option>
							<option value="Clifton">Clifton</option>
							<option value="Clinton">Clinton</option>
							<option value="Coal City">Coal City</option>
							<option value="Coal Valley">Coal Valley</option>
							<option value="Cobden">Cobden</option>
							<option value="Coffeen">Coffeen</option>
							<option value="Colchester">Colchester</option>
							<option value="Colfax">Colfax</option>
							<option value="Collinsville">Collinsville</option>
							<option value="Colona">Colona</option>
							<option value="Columbia">Columbia</option>
							<option value="Concord">Concord</option>
							<option value="Congerville">Congerville</option>
							<option value="Cornell">Cornell</option>
							<option value="Cortland">Cortland</option>
							<option value="Coulterville">Coulterville</option>
							<option value="Country Club Hills">Country Club Hills</option>
							<option value="Countryside">Countryside</option>
							<option value="Cowden">Cowden</option>
							<option value="Creal Springs">Creal Springs</option>
							<option value="Crescent City">Crescent City</option>
							<option value="Crest Hill">Crest Hill</option>
							<option value="Creston">Creston</option>
							<option value="Crestwood">Crestwood</option>
							<option value="Crete">Crete</option>
							<option value="Creve Coeur">Creve Coeur</option>
							<option value="Crystal Lake">Crystal Lake</option>
							<option value="Cuba">Cuba</option>
							<option value="Cullom">Cullom</option>
							<option value="Custer Park">Custer Park</option>
							<option value="Cypress">Cypress</option>
							<option value="Dahlgren">Dahlgren</option>
							<option value="Dakota">Dakota</option>
							<option value="Dallas City">Dallas City</option>
							<option value="Dalzell">Dalzell</option>
							<option value="Damiansville">Damiansville</option>
							<option value="Danforth">Danforth</option>
							<option value="Danvers">Danvers</option>
							<option value="Danville">Danville</option>
							<option value="Darien">Darien</option>
							<option value="De Kalb">De Kalb</option>
							<option value="De Land">De Land</option>
							<option value="De Soto">De Soto</option>
							<option value="Decatur">Decatur</option>
							<option value="Deer Creek">Deer Creek</option>
							<option value="Deerfield">Deerfield</option>
							<option value="Dekalb">Dekalb</option>
							<option value="Delavan">Delavan</option>
							<option value="DePue">DePue</option>
							<option value="Des Plaines">Des Plaines</option>
							<option value="Dieterich">Dieterich</option>
							<option value="Divernon">Divernon</option>
							<option value="Dix">Dix</option>
							<option value="Dixmoor">Dixmoor</option>
							<option value="Dixon">Dixon</option>
							<option value="Dolton">Dolton</option>
							<option value="Dongola">Dongola</option>
							<option value="Donovan">Donovan</option>
							<option value="Downers Grove">Downers Grove</option>
							<option value="Downs">Downs</option>
							<option value="Du Quoin">Du Quoin</option>
							<option value="Dundee">Dundee</option>
							<option value="Dunlap">Dunlap</option>
							<option value="Dupo">Dupo</option>
							<option value="Durand">Durand</option>
							<option value="Dwight">Dwight</option>
							<option value="Earlville">Earlville</option>
							<option value="East Alton">East Alton</option>
							<option value="East Dubuque">East Dubuque</option>
							<option value="East Moline">East Moline</option>
							<option value="East Peoria">East Peoria</option>
							<option value="East Saint Louis">East Saint Louis</option>
							<option value="East St Louis">East St Louis</option>
							<option value="Edgewood">Edgewood</option>
							<option value="Edinburg">Edinburg</option>
							<option value="Edwardsville">Edwardsville</option>
							<option value="Effingham">Effingham</option>
							<option value="El Paso">El Paso</option>
							<option value="Elburn">Elburn</option>
							<option value="Eldorado">Eldorado</option>
							<option value="Elgin">Elgin</option>
							<option value="Elizabethtown">Elizabethtown</option>
							<option value="Elk Grove Village">Elk Grove Village</option>
							<option value="Elkville">Elkville</option>
							<option value="Elmhurst">Elmhurst</option>
							<option value="Elmwood">Elmwood</option>
							<option value="Elmwood Park">Elmwood Park</option>
							<option value="Elwood">Elwood</option>
							<option value="Emden">Emden</option>
							<option value="Enfield">Enfield</option>
							<option value="Erie">Erie</option>
							<option value="Eureka">Eureka</option>
							<option value="Evanston">Evanston</option>
							<option value="Evansville">Evansville</option>
							<option value="Evergreen Park">Evergreen Park</option>
							<option value="Ewing">Ewing</option>
							<option value="Fairbury">Fairbury</option>
							<option value="Fairfield">Fairfield</option>
							<option value="Fairview Heights">Fairview Heights</option>
							<option value="Farina">Farina</option>
							<option value="Farmer City">Farmer City</option>
							<option value="Farmersville">Farmersville</option>
							<option value="Farmington">Farmington</option>
							<option value="Findlay">Findlay</option>
							<option value="Fisher">Fisher</option>
							<option value="Fithian">Fithian</option>
							<option value="Flanagan">Flanagan</option>
							<option value="Flora">Flora</option>
							<option value="Flossmoor">Flossmoor</option>
							<option value="Ford Heights">Ford Heights</option>
							<option value="Forest Park">Forest Park</option>
							<option value="Forrest">Forrest</option>
							<option value="Forreston">Forreston</option>
							<option value="Forsyth">Forsyth</option>
							<option value="Fox Lake">Fox Lake</option>
							<option value="Fox River Grove">Fox River Grove</option>
							<option value="Frankfort">Frankfort</option>
							<option value="Franklin">Franklin</option>
							<option value="Franklin Grove">Franklin Grove</option>
							<option value="Franklin Park">Franklin Park</option>
							<option value="Freeburg">Freeburg</option>
							<option value="Freeport">Freeport</option>
							<option value="Fulton">Fulton</option>
							<option value="Gages Lake">Gages Lake</option>
							<option value="Galatia">Galatia</option>
							<option value="Galena">Galena</option>
							<option value="Galesburg">Galesburg</option>
							<option value="Galva">Galva</option>
							<option value="Garden Prairie">Garden Prairie</option>
							<option value="Gardner">Gardner</option>
							<option value="Geff">Geff</option>
							<option value="Geneseo">Geneseo</option>
							<option value="Geneva">Geneva</option>
							<option value="Genoa">Genoa</option>
							<option value="Georgetown">Georgetown</option>
							<option value="German Valley">German Valley</option>
							<option value="Germantown">Germantown</option>
							<option value="Germantown Hills">Germantown Hills</option>
							<option value="Gibson City">Gibson City</option>
							<option value="Gifford">Gifford</option>
							<option value="Gilberts">Gilberts</option>
							<option value="Gillespie">Gillespie</option>
							<option value="Gilman">Gilman</option>
							<option value="Girard">Girard</option>
							<option value="Glasford">Glasford</option>
							<option value="Glen Carbon">Glen Carbon</option>
							<option value="Glen Ellyn">Glen Ellyn</option>
							<option value="Glencoe">Glencoe</option>
							<option value="Glendale Heights">Glendale Heights</option>
							<option value="Glenview">Glenview</option>
							<option value="Glenwood">Glenwood</option>
							<option value="Godfrey">Godfrey</option>
							<option value="Golconda">Golconda</option>
							<option value="Golden">Golden</option>
							<option value="Good Hope">Good Hope</option>
							<option value="Goodfield">Goodfield</option>
							<option value="Goreville">Goreville</option>
							<option value="Grafton">Grafton</option>
							<option value="Grand Ridge">Grand Ridge</option>
							<option value="Grand Tower">Grand Tower</option>
							<option value="Granite City">Granite City</option>
							<option value="Grant Park">Grant Park</option>
							<option value="Granville">Granville</option>
							<option value="Graymont">Graymont</option>
							<option value="Grayslake">Grayslake</option>
							<option value="Grayville">Grayville</option>
							<option value="Great Lakes">Great Lakes</option>
							<option value="Green Valley">Green Valley</option>
							<option value="Greenfield">Greenfield</option>
							<option value="Greenview">Greenview</option>
							<option value="Greenville">Greenville</option>
							<option value="Gridley">Gridley</option>
							<option value="Griggsville">Griggsville</option>
							<option value="Gurnee">Gurnee</option>
							<option value="Hainesville">Hainesville</option>
							<option value="Hamel">Hamel</option>
							<option value="Hamilton">Hamilton</option>
							<option value="Hampshire">Hampshire</option>
							<option value="Hampton">Hampton</option>
							<option value="Hanover">Hanover</option>
							<option value="Hanover Park">Hanover Park</option>
							<option value="Hardin">Hardin</option>
							<option value="Harrisburg">Harrisburg</option>
							<option value="Harristown">Harristown</option>
							<option value="Hartford">Hartford</option>
							<option value="Hartsburg">Hartsburg</option>
							<option value="Harvard">Harvard</option>
							<option value="Harvey">Harvey</option>
							<option value="Harwood Heights">Harwood Heights</option>
							<option value="Havana">Havana</option>
							<option value="Hawthorn Woods">Hawthorn Woods</option>
							<option value="Hazel Crest">Hazel Crest</option>
							<option value="Hebron">Hebron</option>
							<option value="Hennepin">Hennepin</option>
							<option value="Henry">Henry</option>
							<option value="Herrick">Herrick</option>
							<option value="Herrin">Herrin</option>
							<option value="Herscher">Herscher</option>
							<option value="Heyworth">Heyworth</option>
							<option value="Hickory Hills">Hickory Hills</option>
							<option value="Highland">Highland</option>
							<option value="Highland Park">Highland Park</option>
							<option value="Highwood">Highwood</option>
							<option value="Hillsboro">Hillsboro</option>
							<option value="Hillside">Hillside</option>
							<option value="Hinckley">Hinckley</option>
							<option value="Hinsdale">Hinsdale</option>
							<option value="Hodgkins">Hodgkins</option>
							<option value="Hoffman Estates">Hoffman Estates</option>
							<option value="Homer">Homer</option>
							<option value="Homer Glen">Homer Glen</option>
							<option value="Hometown">Hometown</option>
							<option value="Homewood">Homewood</option>
							<option value="Hoopeston">Hoopeston</option>
							<option value="Hopkins Park">Hopkins Park</option>
							<option value="Hoyleton">Hoyleton</option>
							<option value="Hudson">Hudson</option>
							<option value="Hume">Hume</option>
							<option value="Huntley">Huntley</option>
							<option value="Hutsonville">Hutsonville</option>
							<option value="Illinois City">Illinois City</option>
							<option value="Illiopolis">Illiopolis</option>
							<option value="Ina">Ina</option>
							<option value="Ingleside">Ingleside</option>
							<option value="Irvington">Irvington</option>
							<option value="Island Lake">Island Lake</option>
							<option value="Itasca">Itasca</option>
							<option value="Iuka">Iuka</option>
							<option value="Jacksonville">Jacksonville</option>
							<option value="Jerseyville">Jerseyville</option>
							<option value="Johnsburg">Johnsburg</option>
							<option value="Johnsonville">Johnsonville</option>
							<option value="Johnston City">Johnston City</option>
							<option value="Joliet">Joliet</option>
							<option value="Jonesboro">Jonesboro</option>
							<option value="Joppa">Joppa</option>
							<option value="Joy">Joy</option>
							<option value="Junction">Junction</option>
							<option value="Justice">Justice</option>
							<option value="Kankakee">Kankakee</option>
							<option value="Kansas">Kansas</option>
							<option value="Kell">Kell</option>
							<option value="Kempton">Kempton</option>
							<option value="Kenilworth">Kenilworth</option>
							<option value="Kewanee">Kewanee</option>
							<option value="Kincaid">Kincaid</option>
							<option value="Kinderhook">Kinderhook</option>
							<option value="Kings">Kings</option>
							<option value="Kingston">Kingston</option>
							<option value="Kinmundy">Kinmundy</option>
							<option value="Kirkland">Kirkland</option>
							<option value="Knoxville">Knoxville</option>
							<option value="La Grange">La Grange</option>
							<option value="La Grange Highlands">La Grange Highlands</option>
							<option value="La Grange Park">La Grange Park</option>
							<option value="La Harpe">La Harpe</option>
							<option value="La Moille">La Moille</option>
							<option value="La Salle">La Salle</option>
							<option value="Lacon">Lacon</option>
							<option value="Ladd">Ladd</option>
							<option value="Lake Bluff">Lake Bluff</option>
							<option value="Lake Forest">Lake Forest</option>
							<option value="Lake In The Hills">Lake In The Hills</option>
							<option value="Lake Villa">Lake Villa</option>
							<option value="Lake Zurich">Lake Zurich</option>
							<option value="Lanark">Lanark</option>
							<option value="Lansing">Lansing</option>
							<option value="Lawrenceville">Lawrenceville</option>
							<option value="Le Roy">Le Roy</option>
							<option value="Lebanon">Lebanon</option>
							<option value="Leland">Leland</option>
							<option value="Lemont">Lemont</option>
							<option value="Lena">Lena</option>
							<option value="Lewistown">Lewistown</option>
							<option value="Lexington">Lexington</option>
							<option value="Liberty">Liberty</option>
							<option value="Libertyville">Libertyville</option>
							<option value="Lincoln">Lincoln</option>
							<option value="Lincolnshire">Lincolnshire</option>
							<option value="Lincolnwood">Lincolnwood</option>
							<option value="Lindenhurst">Lindenhurst</option>
							<option value="Lindenwood">Lindenwood</option>
							<option value="Lisle">Lisle</option>
							<option value="Litchfield">Litchfield</option>
							<option value="Livingston">Livingston</option>
							<option value="Lockport">Lockport</option>
							<option value="Lombard">Lombard</option>
							<option value="London Mills">London Mills</option>
							<option value="Long Grove">Long Grove</option>
							<option value="Lostant">Lostant</option>
							<option value="Louisville">Louisville</option>
							<option value="Lovejoy">Lovejoy</option>
							<option value="Loves Park">Loves Park</option>
							<option value="Lovington">Lovington</option>
							<option value="Ludlow">Ludlow</option>
							<option value="Lynwood">Lynwood</option>
							<option value="Lyons">Lyons</option>
							<option value="Machesney Park">Machesney Park</option>
							<option value="Mackinaw">Mackinaw</option>
							<option value="Macomb">Macomb</option>
							<option value="Macon">Macon</option>
							<option value="Madison">Madison</option>
							<option value="Mahomet">Mahomet</option>
							<option value="Malden">Malden</option>
							<option value="Malta">Malta</option>
							<option value="Manhattan">Manhattan</option>
							<option value="Manito">Manito</option>
							<option value="Manlius">Manlius</option>
							<option value="Mansfield">Mansfield</option>
							<option value="Manteno">Manteno</option>
							<option value="Maple Park">Maple Park</option>
							<option value="Marengo">Marengo</option>
							<option value="Marine">Marine</option>
							<option value="Marion">Marion</option>
							<option value="Marissa">Marissa</option>
							<option value="Markham">Markham</option>
							<option value="Maroa">Maroa</option>
							<option value="Marquette Heights">Marquette Heights</option>
							<option value="Marseilles">Marseilles</option>
							<option value="Marshall">Marshall</option>
							<option value="Martinsville">Martinsville</option>
							<option value="Maryville">Maryville</option>
							<option value="Mascoutah">Mascoutah</option>
							<option value="Mason City">Mason City</option>
							<option value="Matherville">Matherville</option>
							<option value="Matteson">Matteson</option>
							<option value="Mattoon">Mattoon</option>
							<option value="Maywood">Maywood</option>
							<option value="Mazon">Mazon</option>
							<option value="Mc Leansboro">Mc Leansboro</option>
							<option value="Mc Nabb">Mc Nabb</option>
							<option value="McClure">McClure</option>
							<option value="McHenry">McHenry</option>
							<option value="Medinah">Medinah</option>
							<option value="Medora">Medora</option>
							<option value="Melrose Park">Melrose Park</option>
							<option value="Mendon">Mendon</option>
							<option value="Mendota">Mendota</option>
							<option value="Meredosia">Meredosia</option>
							<option value="Merrionette Park">Merrionette Park</option>
							<option value="Metamora">Metamora</option>
							<option value="Metropolis">Metropolis</option>
							<option value="Middletown">Middletown</option>
							<option value="Midlothian">Midlothian</option>
							<option value="Milan">Milan</option>
							<option value="Milford">Milford</option>
							<option value="Millbrook">Millbrook</option>
							<option value="Milledgeville">Milledgeville</option>
							<option value="Millstadt">Millstadt</option>
							<option value="Minier">Minier</option>
							<option value="Minonk">Minonk</option>
							<option value="Minooka">Minooka</option>
							<option value="Mokena">Mokena</option>
							<option value="Moline">Moline</option>
							<option value="Momence">Momence</option>
							<option value="Monee">Monee</option>
							<option value="Monmouth">Monmouth</option>
							<option value="Monroe Center">Monroe Center</option>
							<option value="Montgomery">Montgomery</option>
							<option value="Monticello">Monticello</option>
							<option value="Moro">Moro</option>
							<option value="Morris">Morris</option>
							<option value="Morrison">Morrison</option>
							<option value="Morrisonville">Morrisonville</option>
							<option value="Morton">Morton</option>
							<option value="Morton Grove">Morton Grove</option>
							<option value="Mossville">Mossville</option>
							<option value="Mounds">Mounds</option>
							<option value="Mount Carmel">Mount Carmel</option>
							<option value="Mount Carroll">Mount Carroll</option>
							<option value="Mount Erie">Mount Erie</option>
							<option value="Mount Morris">Mount Morris</option>
							<option value="Mount Olive">Mount Olive</option>
							<option value="Mount Pulaski">Mount Pulaski</option>
							<option value="Mount Sterling">Mount Sterling</option>
							<option value="Mount Vernon">Mount Vernon</option>
							<option value="Mount Zion">Mount Zion</option>
							<option value="Moweaqua">Moweaqua</option>
							<option value="Mt Prospect">Mt Prospect</option>
							<option value="Mt Sterling">Mt Sterling</option>
							<option value="Mt Vernon">Mt Vernon</option>
							<option value="Mulberry Grove">Mulberry Grove</option>
							<option value="Mundelein">Mundelein</option>
							<option value="Murphysboro">Murphysboro</option>
							<option value="Murrayville">Murrayville</option>
							<option value="Naperville">Naperville</option>
							<option value="Nashville">Nashville</option>
							<option value="Nauvoo">Nauvoo</option>
							<option value="Nelson">Nelson</option>
							<option value="Neoga">Neoga</option>
							<option value="Neponset">Neponset</option>
							<option value="New Athens">New Athens</option>
							<option value="New Baden">New Baden</option>
							<option value="New Berlin">New Berlin</option>
							<option value="New Boston">New Boston</option>
							<option value="New Douglas">New Douglas</option>
							<option value="New Lenox">New Lenox</option>
							<option value="Newark">Newark</option>
							<option value="Newman">Newman</option>
							<option value="Newton">Newton</option>
							<option value="Niantic">Niantic</option>
							<option value="Niles">Niles</option>
							<option value="Noble">Noble</option>
							<option value="Nokomis">Nokomis</option>
							<option value="Normal">Normal</option>
							<option value="Norridge">Norridge</option>
							<option value="Norris City">Norris City</option>
							<option value="North Aurora">North Aurora</option>
							<option value="North Chicago">North Chicago</option>
							<option value="North Pekin">North Pekin</option>
							<option value="North Riverside">North Riverside</option>
							<option value="Northbrook">Northbrook</option>
							<option value="Northfield">Northfield</option>
							<option value="Northlake">Northlake</option>
							<option value="O Fallon">O Fallon</option>
							<option value="Oak Brook">Oak Brook</option>
							<option value="Oak Forest">Oak Forest</option>
							<option value="Oak Lawn">Oak Lawn</option>
							<option value="Oak Park">Oak Park</option>
							<option value="Oakbrook Terrace">Oakbrook Terrace</option>
							<option value="Oakdale">Oakdale</option>
							<option value="Oakland">Oakland</option>
							<option value="Oakwood">Oakwood</option>
							<option value="Oblong">Oblong</option>
							<option value="Odell">Odell</option>
							<option value="Odin">Odin</option>
							<option value="Ogden">Ogden</option>
							<option value="Oglesby">Oglesby</option>
							<option value="Ohio">Ohio</option>
							<option value="Okawville">Okawville</option>
							<option value="Old Mill Creek">Old Mill Creek</option>
							<option value="Olney">Olney</option>
							<option value="Olympia Fields">Olympia Fields</option>
							<option value="Onarga">Onarga</option>
							<option value="Oneida">Oneida</option>
							<option value="Opdyke">Opdyke</option>
							<option value="Orangeville">Orangeville</option>
							<option value="Oreana">Oreana</option>
							<option value="Oregon">Oregon</option>
							<option value="Orion">Orion</option>
							<option value="Orland Hills">Orland Hills</option>
							<option value="Orland Park">Orland Park</option>
							<option value="Oswego">Oswego</option>
							<option value="Ottawa">Ottawa</option>
							<option value="Palatine">Palatine</option>
							<option value="Palestine">Palestine</option>
							<option value="Palmyra">Palmyra</option>
							<option value="Palos Heights">Palos Heights</option>
							<option value="Palos Hills">Palos Hills</option>
							<option value="Palos Park">Palos Park</option>
							<option value="Pana">Pana</option>
							<option value="Paris">Paris</option>
							<option value="Park Forest">Park Forest</option>
							<option value="Park Ridge">Park Ridge</option>
							<option value="Patoka">Patoka</option>
							<option value="Paw Paw">Paw Paw</option>
							<option value="Pawnee">Pawnee</option>
							<option value="Paxton">Paxton</option>
							<option value="Payson">Payson</option>
							<option value="Pearl City">Pearl City</option>
							<option value="Pecatonica">Pecatonica</option>
							<option value="Pekin">Pekin</option>
							<option value="Peoria">Peoria</option>
							<option value="Peoria Heights">Peoria Heights</option>
							<option value="Peotone">Peotone</option>
							<option value="Perry">Perry</option>
							<option value="Peru">Peru</option>
							<option value="Petersburg">Petersburg</option>
							<option value="Philo">Philo</option>
							<option value="Phoenix">Phoenix</option>
							<option value="Piasa">Piasa</option>
							<option value="Pinckneyville">Pinckneyville</option>
							<option value="Pingree Grove">Pingree Grove</option>
							<option value="Piper City">Piper City</option>
							<option value="Pittsburg">Pittsburg</option>
							<option value="Pittsfield">Pittsfield</option>
							<option value="Plainfield">Plainfield</option>
							<option value="Plano">Plano</option>
							<option value="Pleasant Hill">Pleasant Hill</option>
							<option value="Pleasant Plains">Pleasant Plains</option>
							<option value="Pocahontas">Pocahontas</option>
							<option value="Polo">Polo</option>
							<option value="Pontiac">Pontiac</option>
							<option value="Poplar Grove">Poplar Grove</option>
							<option value="Port Byron">Port Byron</option>
							<option value="Posen">Posen</option>
							<option value="Potomac">Potomac</option>
							<option value="Prairie Du Rocher">Prairie Du Rocher</option>
							<option value="Princeton">Princeton</option>
							<option value="Princeville">Princeville</option>
							<option value="Prophetstown">Prophetstown</option>
							<option value="Prospect Heights">Prospect Heights</option>
							<option value="Quincy">Quincy</option>
							<option value="Ramsey">Ramsey</option>
							<option value="Ransom">Ransom</option>
							<option value="Rantoul">Rantoul</option>
							<option value="Raymond">Raymond</option>
							<option value="Red Bud">Red Bud</option>
							<option value="Reddick">Reddick</option>
							<option value="Reynolds">Reynolds</option>
							<option value="Richmond">Richmond</option>
							<option value="Richton Park">Richton Park</option>
							<option value="Ridge Farm">Ridge Farm</option>
							<option value="Ringwood">Ringwood</option>
							<option value="River Forest">River Forest</option>
							<option value="River Grove">River Grove</option>
							<option value="Riverdale">Riverdale</option>
							<option value="Riverside">Riverside</option>
							<option value="Riverton">Riverton</option>
							<option value="Roanoke">Roanoke</option>
							<option value="Robbins">Robbins</option>
							<option value="Robinson">Robinson</option>
							<option value="Rochelle">Rochelle</option>
							<option value="Rochester">Rochester</option>
							<option value="Rock Falls">Rock Falls</option>
							<option value="Rock Island">Rock Island</option>
							<option value="Rockdale">Rockdale</option>
							<option value="Rockford">Rockford</option>
							<option value="Rockton">Rockton</option>
							<option value="Rolling Meadows">Rolling Meadows</option>
							<option value="Romeoville">Romeoville</option>
							<option value="Roodhouse">Roodhouse</option>
							<option value="Roscoe">Roscoe</option>
							<option value="Roselle">Roselle</option>
							<option value="Rosemont">Rosemont</option>
							<option value="Roseville">Roseville</option>
							<option value="Rossville">Rossville</option>
							<option value="Round Lake">Round Lake</option>
							<option value="Round Lake Beach">Round Lake Beach</option>
							<option value="Round Lake Heights">Round Lake Heights</option>
							<option value="Round Lake Park">Round Lake Park</option>
							<option value="Roxana">Roxana</option>
							<option value="Royal">Royal</option>
							<option value="Rushville">Rushville</option>
							<option value="Saint Anne">Saint Anne</option>
							<option value="Saint Charles">Saint Charles</option>
							<option value="Saint Elmo">Saint Elmo</option>
							<option value="Saint Jacob">Saint Jacob</option>
							<option value="Saint Joseph">Saint Joseph</option>
							<option value="Saint Libory">Saint Libory</option>
							<option value="Sainte Marie">Sainte Marie</option>
							<option value="Salem">Salem</option>
							<option value="Sandoval">Sandoval</option>
							<option value="Sandwich">Sandwich</option>
							<option value="Sauk Village">Sauk Village</option>
							<option value="Saunemin">Saunemin</option>
							<option value="Savanna">Savanna</option>
							<option value="Savoy">Savoy</option>
							<option value="Scales Mound">Scales Mound</option>
							<option value="Schaumburg">Schaumburg</option>
							<option value="Schiller Park">Schiller Park</option>
							<option value="Sciota">Sciota</option>
							<option value="Scott Air Force Base">Scott Air Force Base</option>
							<option value="Seneca">Seneca</option>
							<option value="Serena">Serena</option>
							<option value="Sesser">Sesser</option>
							<option value="Shabbona">Shabbona</option>
							<option value="Shannon">Shannon</option>
							<option value="Shelbyville">Shelbyville</option>
							<option value="Sheridan">Sheridan</option>
							<option value="Sherman">Sherman</option>
							<option value="Sherrard">Sherrard</option>
							<option value="Shiloh">Shiloh</option>
							<option value="Shipman">Shipman</option>
							<option value="Shirland">Shirland</option>
							<option value="Shorewood">Shorewood</option>
							<option value="Sidell">Sidell</option>
							<option value="Silvis">Silvis</option>
							<option value="Skokie">Skokie</option>
							<option value="Sleepy Hollow">Sleepy Hollow</option>
							<option value="Smithton">Smithton</option>
							<option value="Somonauk">Somonauk</option>
							<option value="Sorento">Sorento</option>
							<option value="South Barrington">South Barrington</option>
							<option value="South Beloit">South Beloit</option>
							<option value="South Chicago Heights">South Chicago Heights</option>
							<option value="South Elgin">South Elgin</option>
							<option value="South Holland">South Holland</option>
							<option value="South Pekin">South Pekin</option>
							<option value="South Roxana">South Roxana</option>
							<option value="South Wilmington">South Wilmington</option>
							<option value="Sparland">Sparland</option>
							<option value="Sparta">Sparta</option>
							<option value="Spring Grove">Spring Grove</option>
							<option value="Spring Valley">Spring Valley</option>
							<option value="Springfield">Springfield</option>
							<option value="St Charles">St Charles</option>
							<option value="St Jacob">St Jacob</option>
							<option value="Stanford">Stanford</option>
							<option value="Staunton">Staunton</option>
							<option value="Steeleville">Steeleville</option>
							<option value="Steger">Steger</option>
							<option value="Sterling">Sterling</option>
							<option value="Steward">Steward</option>
							<option value="Stickney">Stickney</option>
							<option value="Stillman Valley">Stillman Valley</option>
							<option value="Stockton">Stockton</option>
							<option value="Stone Park">Stone Park</option>
							<option value="Stonington">Stonington</option>
							<option value="Strasburg">Strasburg</option>
							<option value="Streamwood">Streamwood</option>
							<option value="Streator">Streator</option>
							<option value="Stronghurst">Stronghurst</option>
							<option value="Sugar Grove">Sugar Grove</option>
							<option value="Sullivan">Sullivan</option>
							<option value="Summit">Summit</option>
							<option value="Sumner">Sumner</option>
							<option value="Swansea">Swansea</option>
							<option value="Sycamore">Sycamore</option>
							<option value="Table Grove">Table Grove</option>
							<option value="Tamaroa">Tamaroa</option>
							<option value="Tamms">Tamms</option>
							<option value="Tampico">Tampico</option>
							<option value="Taylor Ridge">Taylor Ridge</option>
							<option value="Taylorville">Taylorville</option>
							<option value="Teutopolis">Teutopolis</option>
							<option value="Texico">Texico</option>
							<option value="Thawville">Thawville</option>
							<option value="Thomasboro">Thomasboro</option>
							<option value="Thompsonville">Thompsonville</option>
							<option value="Thomson">Thomson</option>
							<option value="Thornton">Thornton</option>
							<option value="Tinley Park">Tinley Park</option>
							<option value="Tiskilwa">Tiskilwa</option>
							<option value="Toledo">Toledo</option>
							<option value="Tolono">Tolono</option>
							<option value="Toluca">Toluca</option>
							<option value="Tonica">Tonica</option>
							<option value="Toulon">Toulon</option>
							<option value="Towanda">Towanda</option>
							<option value="Tremont">Tremont</option>
							<option value="Trenton">Trenton</option>
							<option value="Troy">Troy</option>
							<option value="Tunnel Hill">Tunnel Hill</option>
							<option value="Tuscola">Tuscola</option>
							<option value="Ullin">Ullin</option>
							<option value="University Park">University Park</option>
							<option value="Urbana">Urbana</option>
							<option value="Ursa">Ursa</option>
							<option value="Utica">Utica</option>
							<option value="Valmeyer">Valmeyer</option>
							<option value="Van Orin">Van Orin</option>
							<option value="Vandalia">Vandalia</option>
							<option value="Varna">Varna</option>
							<option value="Venice">Venice</option>
							<option value="Vergennes">Vergennes</option>
							<option value="Vernon Hills">Vernon Hills</option>
							<option value="Vienna">Vienna</option>
							<option value="Villa Grove">Villa Grove</option>
							<option value="Villa Park">Villa Park</option>
							<option value="Viola">Viola</option>
							<option value="Virden">Virden</option>
							<option value="Virginia">Virginia</option>
							<option value="Wadsworth">Wadsworth</option>
							<option value="Walnut">Walnut</option>
							<option value="Waltonville">Waltonville</option>
							<option value="Warren">Warren</option>
							<option value="Warrensburg">Warrensburg</option>
							<option value="Warrenville">Warrenville</option>
							<option value="Warsaw">Warsaw</option>
							<option value="Wasco">Wasco</option>
							<option value="Washburn">Washburn</option>
							<option value="Washington">Washington</option>
							<option value="Washington Pk">Washington Pk</option>
							<option value="Waterloo">Waterloo</option>
							<option value="Waterman">Waterman</option>
							<option value="Watseka">Watseka</option>
							<option value="Wauconda">Wauconda</option>
							<option value="Waukegan">Waukegan</option>
							<option value="Waverly">Waverly</option>
							<option value="Wayne">Wayne</option>
							<option value="Wayne City">Wayne City</option>
							<option value="Weldon">Weldon</option>
							<option value="Wenona">Wenona</option>
							<option value="West Chicago">West Chicago</option>
							<option value="West Dundee">West Dundee</option>
							<option value="West Frankfort">West Frankfort</option>
							<option value="West Peoria">West Peoria</option>
							<option value="West Salem">West Salem</option>
							<option value="Westchester">Westchester</option>
							<option value="Western Springs">Western Springs</option>
							<option value="Westmont">Westmont</option>
							<option value="Westville">Westville</option>
							<option value="Wheaton">Wheaton</option>
							<option value="Wheeling">Wheeling</option>
							<option value="White Hall">White Hall</option>
							<option value="White Heath">White Heath</option>
							<option value="Williamsfield">Williamsfield</option>
							<option value="Williamsville">Williamsville</option>
							<option value="Willow Springs">Willow Springs</option>
							<option value="Willowbrook">Willowbrook</option>
							<option value="Wilmette">Wilmette</option>
							<option value="Wilmington">Wilmington</option>
							<option value="Winchester">Winchester</option>
							<option value="Windsor">Windsor</option>
							<option value="Winfield">Winfield</option>
							<option value="Winnebago">Winnebago</option>
							<option value="Winnetka">Winnetka</option>
							<option value="Winthrop Harbor">Winthrop Harbor</option>
							<option value="Wolf Lake">Wolf Lake</option>
							<option value="Wonder Lake">Wonder Lake</option>
							<option value="Wood Dale">Wood Dale</option>
							<option value="Wood River">Wood River</option>
							<option value="Woodhull">Woodhull</option>
							<option value="Woodland">Woodland</option>
							<option value="Woodlawn">Woodlawn</option>
							<option value="Woodridge">Woodridge</option>
							<option value="Woodstock">Woodstock</option>
							<option value="Worden">Worden</option>
							<option value="Worth">Worth</option>
							<option value="Wyanet">Wyanet</option>
							<option value="Wyoming">Wyoming</option>
							<option value="Xenia">Xenia</option>
							<option value="Yorkville">Yorkville</option>
							<option value="Zeigler">Zeigler</option>
							<option value="Zion">Zion</option>
							</select><br />
						<input type="hidden" name="COUNTYlist" value="no">
						<input type="hidden" id="district-name" name="district-name" value="no">
						<input type="hidden" name="ISAT" value="no">
						<input type="hidden" name="PSAE" value="no">
						<input type="hidden" name="ACT" value="no">
						<input type="hidden" name="schoolsAll" value="no">
						<input type="hidden" name="districtsAll" value="no">
						<input type="submit" name="citySUBMIT" id="citySUBMIT"  value="Get City" style="margin-top:8px;">
						</p>
						</form>
					</div>
					<!--End -->

					<!--Begin County search box -->
					<div class="col-sm-6">  
						<form action='schools/' method='get'>
						<p class="searchOPTIONS">...Select a county, then click "Get County."</p>
						<p>
							<select name="COUNTYlist" size="5" id="COUNTYlist">
							<option value="Adams">Adams</option>
							<option value="Alexander">Alexander</option>
							<option value="Bond">Bond</option>
							<option value="Boone">Boone</option>
							<option value="Brown">Brown</option>
							<option value="Bureau">Bureau</option>
							<option value="Calhoun">Calhoun</option>
							<option value="Carroll">Carroll</option>
							<option value="Cass">Cass</option>
							<option value="Champaign">Champaign</option>
							<option value="Christian">Christian</option>
							<option value="Clark">Clark</option>
							<option value="Clay">Clay</option>
							<option value="Clinton">Clinton</option>
							<option value="Coles">Coles</option>
							<option value="Cook">Cook</option>
							<option value="Crawford">Crawford</option>
							<option value="Cumberland">Cumberland</option>
							<option value="Dekalb">Dekalb</option>
							<option value="Dewitt">Dewitt</option>
							<option value="Douglas">Douglas</option>
							<option value="Dupage">Dupage</option>
							<option value="Edgar">Edgar</option>
							<option value="Edwards">Edwards</option>
							<option value="Effingham">Effingham</option>
							<option value="Fayette">Fayette</option>
							<option value="Ford">Ford</option>
							<option value="Franklin">Franklin</option>
							<option value="Fulton">Fulton</option>
							<option value="Gallatin">Gallatin</option>
							<option value="Greene">Greene</option>
							<option value="Grundy">Grundy</option>
							<option value="Hamilton">Hamilton</option>
							<option value="Hancock">Hancock</option>
							<option value="Hardin">Hardin</option>
							<option value="Henderson">Henderson</option>
							<option value="Henry">Henry</option>
							<option value="Iroquois">Iroquois</option>
							<option value="Jackson">Jackson</option>
							<option value="Jasper">Jasper</option>
							<option value="Jefferson">Jefferson</option>
							<option value="Jersey">Jersey</option>
							<option value="Jo Daviess">Jo Daviess</option>
							<option value="Johnson">Johnson</option>
							<option value="Kane">Kane</option>
							<option value="Kankakee">Kankakee</option>
							<option value="Kendall">Kendall</option>
							<option value="Knox">Knox</option>
							<option value="La Salle">La Salle</option>
							<option value="Lake">Lake</option>
							<option value="Lawrence">Lawrence</option>
							<option value="Lee">Lee</option>
							<option value="Livingston">Livingston</option>
							<option value="Logan">Logan</option>
							<option value="Macon">Macon</option>
							<option value="Macoupin">Macoupin</option>
							<option value="Madison">Madison</option>
							<option value="Marion">Marion</option>
							<option value="Marshall">Marshall</option>
							<option value="Mason">Mason</option>
							<option value="Massac">Massac</option>
							<option value="McDonough">McDonough</option>
							<option value="McHenry">McHenry</option>
							<option value="McLean">McLean</option>
							<option value="Menard">Menard</option>
							<option value="Mercer">Mercer</option>
							<option value="Monroe">Monroe</option>
							<option value="Montgomery">Montgomery</option>
							<option value="Morgan">Morgan</option>
							<option value="Moultrie">Moultrie</option>
							<option value="Ogle">Ogle</option>
							<option value="Peoria">Peoria</option>
							<option value="Perry">Perry</option>
							<option value="Piatt">Piatt</option>
							<option value="Pike">Pike</option>
							<option value="Pope">Pope</option>
							<option value="Pulaski">Pulaski</option>
							<option value="Putnam">Putnam</option>
							<option value="Randolph">Randolph</option>
							<option value="Richland">Richland</option>
							<option value="Rock Island">Rock Island</option>
							<option value="Saint Clair">Saint Clair</option>
							<option value="Saline">Saline</option>
							<option value="Sangamon">Sangamon</option>
							<option value="Schuyler">Schuyler</option>
							<option value="Scott">Scott</option>
							<option value="Shelby">Shelby</option>
							<option value="Stark">Stark</option>
							<option value="Stephenson">Stephenson</option>
							<option value="Tazewell">Tazewell</option>
							<option value="Union">Union</option>
							<option value="Vermilion">Vermilion</option>
							<option value="Wabash">Wabash</option>
							<option value="Warren">Warren</option>
							<option value="Washington">Washington</option>
							<option value="Wayne">Wayne</option>
							<option value="White">White</option>
							<option value="Whiteside">Whiteside</option>
							<option value="Will">Will</option>
							<option value="Williamson">Williamson</option>
							<option value="Winnebago">Winnebago</option>
							<option value="Woodford">Woodford</option>
							</select><br />
						<input type="submit" name="countySUBMIT" id="countySUBMIT"  value="Get County" style="margin-top:8px;"></p>
						<input type="hidden" id="district-name" name="district-name" value="no">
						<input type="hidden" name="ISAT" value="no">
						<input type="hidden" name="PSAE" value="no">
						<input type="hidden" name="ACT" value="no">
						<input type="hidden" name="CITYlist" value="no">
						<input type="hidden" name="schoolsAll" value="no">
						<input type="hidden" name="districtsAll" value="no">
						</form>
					</div>
					<!--End -->
				</div>
				<!--End City and County-->
				</div>
			</div>

			<div role="tabpanel" class="tab-pane" id="tabOther">
				<!--Begin find all in 6-county area -->
				<div id="findALL" class="schact">  
					<h5>Find lists of schools</h5>
					<div class="row">
						<div class="col-sm-6">
							<p>
								<form action='schools/' method='get'>
									To see a sortable list of all suburban schools in the six-county area, click below.
									<br>
										<input type="hidden" name="district-name" value="no">
										<input type="hidden" name="CITYlist" value="no">
										<input type="hidden" name="COUNTYlist" value="no">
										<input type="hidden" name="ISAT" value="no">
										<input type="hidden" name="PSAE" value="no">
										<input type="hidden" name="ACT" value="no">
										<input type="hidden" name="schoolsAll" value="Chicago">
										<input type="hidden" name="districtsAll" value="no">
										<input type="submit" id="submit" value="Get suburban schools">
								</form>
							</p>
						</div>
						<div class="col-sm-6">
							<p>
								<form action='schools/' method='get'>
									To see a sortable list of all suburban districts in the six-county area, click below.
									<br>
										<input type="hidden" name="district-name" value="no">
										<input type="hidden" name="CITYlist" value="no">
										<input type="hidden" name="COUNTYlist" value="no">
										<input type="hidden" name="ISAT" value="no">
										<input type="hidden" name="PSAE" value="no">
										<input type="hidden" name="ACT" value="no">
										<input type="hidden" name="schoolsAll" value="no">
										<input type="hidden" name="districtsAll" value="Chicago">
										<input type="submit" id="submit" value="Get suburban districts">
								</form>
							</p>
						</div>
					</div>
				</div>
				<!--End -->
			</div>
		</div>
	</div>
  
	<!-- End SearchBoxa -->
 
	<!--Begin HTML section -->
	<div id="mainpge"></div>

	<div id="creditBox">
		<p><small>Daily Herald web app by Tim Broderick <a href="mailto:tbroderick@dailyherald.com">tbroderick@dailyherald.com</a>. Source: Illinois State Board of Education school report card data. Thanks to the Texas A&M University Geography department for their geocoding services.
		</small></p>
	</div>

	<!--End HTML section-->


</div> <!-- ends col-md-12-->
</div> <!-- Ends row -->
</div> <!-- End container div -->

</body>
</html>