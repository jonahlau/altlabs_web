var initialize = function() {

  var leaderboardEl = document.getElementById('leaderboard'),
      bandList;

  var poll = new window.massrel.Poller({frequency:15, limit:5}, function(returnedBands) {
    bandList = returnedBands;
    if (leaderboardEl.innerHTML) {
      clearLeaderboard();
    }
    updateLeaderboard();
  });

  poll.start();

  function clearLeaderboard() {
    leaderboardEl.innerHTML = "";
  }

  function updateLeaderboard() {
    if (!leaderboard) return;
    for (var i=0; i<bandList.length; i++) {
      var currBandName = bandList[i].name,
          currBandScore = formatScore(bandList[i].count);

      createElementsAndAppend(currBandName, currBandScore);
    }
    leaderboardEl.lastChild.className = 'last-band';
  }

  function createElementsAndAppend (bandName, bandScore) {
    var bandWrapper = document.createElement('div'),
        bandNameDiv = document.createElement('div'),
        bandScoreDiv = document.createElement('div');


      bandWrapper.className = 'band-wrapper';
      bandNameDiv.innerHTML = bandName;
      bandNameDiv.className = 'band-name';
      bandScoreDiv.innerHTML = bandScore + " " + "<span class='mentions'>mentions</span>";
      bandScoreDiv.className = 'band-score';

      bandWrapper.appendChild(bandNameDiv);
      bandWrapper.appendChild(bandScoreDiv);
      leaderboardEl.appendChild(bandWrapper);
  }

  function formatScore(score) {
    score = score.toString();
    var regExp = new RegExp(/\d{4}/g);

    if (score.match(regExp)) {
      return score.substring(0,1)+","+score.substring(1);
    } else {
      return score;
    }

  }

}

window.onload = initialize;