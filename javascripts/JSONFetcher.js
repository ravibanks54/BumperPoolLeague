$.getJSON('https://spreadsheets.google.com/feeds/list/1ZC7Zb1yLamdp0E0Xol-gGO0YPvyJrVdK6eSikIYGRzs/1/public/full?alt=json', function(data) {
	var playerNames = ["Ravi", "Anish", "Blake", "Tyler", "Matt", "Ryan"];
	var dictElo = {};
	for(var i = 0; i < playerNames.length; i++){
		dictElo[playerNames[i]] = 1200;
	}
	var entries = data.feed.entry;
	for (var j = 0; j < entries.length; j++){
		var entry = entries[j];
		var winner = entry.gsx$whowon.$t;
		var loser = entry.gsx$wholost.$t;
		var firstBallIn =  entry.gsx$stballin.$t;
		var ballsSunkWinner = 5;
		var ballsSunkLoser = parseInt( entry.gsx$ballssunk-loser.$t);
		var delta = Elo.getRatingDelta(dictElo[winner], dictElo[loser], 1);
		dictElo[winner] += delta;
		dictElo[loser] -= delta;

	}
    var dictArray = Object.keys(dictElo).map(function(key) {
    	return [key, dictElo[key]];
	});

	dictArray.sort(function(first, second) {
  	  return second[1] - first[1];
	});

	var body = document.getElementById("recents");

	// create elements <table> and a <tbody>
	var tbl     = document.createElement("table");
	var tblBody = document.createElement("tbody");
	for (var k = entries.length-1; k >= 0; j--){
		var entry = entries[k];
		var row = document.createElement("tr");
		var cell1 = document.createElement("td"); 
    	var winner = entry.gsx$whowon.$t;
    	cell1.appendChild(winner);
    	var cell2 = document.createElement("td"); 
    	var vs = "vs.";
    	cell2.appendChild(vs);
    	var cell3 = document.createElement("td"); 
    	var loser = entry.gsx$wholost.$t;
    	cell3.appendChild(loser);
    	row.appendChild(cell1);
    	row.appendChild(cell2);
    	row.appendChild(cell3);
    	tblbody.appendChild(row);
	}
	// append the <tbody> inside the <table>
	tbl.appendChild(tblBody);
	// put <table> in the <body>
	body.appendChild(tbl);

	console.log(dictArray);
    
});