$.getJSON('https://spreadsheets.google.com/feeds/list/1ZC7Zb1yLamdp0E0Xol-gGO0YPvyJrVdK6eSikIYGRzs/1/public/full?alt=json', function(data) {
	var playerNames = ["Ravi", "Anish", "Blake", "Tyler", "Matt"];
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
    var delta = getRatingDelta(dictElo[winner], dictElo[loser], 1);
    dictElo[winner] += delta;
    dictElo[loser] -= delta;
    
    console.log(entry);
    }
    
});