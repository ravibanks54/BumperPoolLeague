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

	var table = document.getElementById("leaderboardTable");
	var tblBody = document.createElement("tbody");
	for (var k = 0; k < dictArray.length; k++){
		var entry = entries[k];
		var row = document.createElement("tr");
		var cell1 = document.createElement("td"); 
    	var name = document.createTextNode(dictArray[k][0]);
    	cell1.appendChild(name);
    	var cell2 = document.createElement("td"); 
    	var elo = document.createTextNode(dictArray[k][1]);
    	cell2.appendChild(elo);
    	row.appendChild(cell1);
    	row.appendChild(cell2);
    	tblBody.appendChild(row);
	}
	// append the <tbody> inside th
	table.appendChild(tblBody);

	var table = document.getElementById("recentsTable");
	var tblBody = document.createElement("tbody");
	for (var k = entries.length-1; k >= 0; k--){
		if((entries.length>5) && (entries.length - k > playerNames.length)){
			break;
		}
		var entry = entries[k];
		var row = document.createElement("tr");
		var cell1 = document.createElement("td"); 
    	var winner = document.createTextNode(entry.gsx$whowon.$t);
    	cell1.appendChild(winner);
    	var cell2 = document.createElement("td"); 
    	var vs = document.createTextNode("won against");
    	cell2.appendChild(vs);
    	var cell3 = document.createElement("td"); 
    	var loser = document.createTextNode(entry.gsx$wholost.$t);
    	cell3.appendChild(loser);
    	row.appendChild(cell1);
    	row.appendChild(cell2);
    	row.appendChild(cell3);
    	tblBody.appendChild(row);
	}
	// append the <tbody> inside the <table>
	table.appendChild(tblBody);
	// put <table> in the <body>

	console.log(dictArray);
    
});
