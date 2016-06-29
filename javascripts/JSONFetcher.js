function getRatingDelta(myRating, opponentRating, myGameResult) {
    if ([0, 0.5, 1].indexOf(myGameResult) === -1) {
      return null;
    }
    
    var myChanceToWin = 1 / ( 1 + Math.pow(10, (opponentRating - myRating) / 400));

    return Math.round(32 * (myGameResult - myChanceToWin));
  }

  function getNewRating(myRating, opponentRating, myGameResult) {
    return myRating + getRatingDelta(myRating, opponentRating, myGameResult);
  }

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
    var delta = getRatingDelta(dictElo[winner], dictElo[loser], 1);
    dictElo[winner] += delta;
    dictElo[loser] -= delta;
    
    console.log(entry);
    }
    var dictArray = Object.keys(dictElo).map(function(key) {
    	return [key, dictElo[key]];
		});

	dictArray.sort(function(first, second) {
  	  return second[1] - first[1];
	});

	console.log(dictArray);
    
});
