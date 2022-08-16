const readLine = require('readline');
const fs = require('fs');
var file = './samples/001.in';

// initialAnnoyance, annoyanceMultiplicator, annoyanceLevel, askedStatus(Boolean), index
let coworkers = []

// First time iteration setter
let first = true;
let leastAnnoyedCoworker;
let mostAnnoyedCoworker;

var rl = readLine.createInterface({
    input : fs.createReadStream(file),
    output : process.stdout,
    terminal: false
});

function setUpCoworkersIndex() {
  for (let i = 1; i < parseInt(coworkers[0][1]) + 1; i++) { coworkers[i][4] = i; }
} 

function getMostAnnoyed() {
  for (let i = 1; i < parseInt(coworkers[0][1]) + 1; i++) {
    const coworkerTotal = parseInt(coworkers[i][2])
    const mostAnnoyedCoworkerTotal = parseInt(mostAnnoyedCoworker[2])
    // If coworker haven't been asked, total is equal to initial annoyance
    if (coworkers[i][3] === "false") {
      coworkers[i][2] = parseInt(coworkers[i][0])
    }
    // If current mostAnnoyedCoworker haven't been asked, total is equal to initial annoyance
    if (mostAnnoyedCoworker[3] === "false") {
      mostAnnoyedCoworker[2] = parseInt(mostAnnoyedCoworker[0])
    }
    if (coworkerTotal > mostAnnoyedCoworkerTotal) {
        mostAnnoyedCoworker = coworkers[i] 
    }
  }
}

function setLeastAnnoyedCoworker(coworker, isAsked) {
  const leastAnnoyedTotalPlusIncrement = parseInt(leastAnnoyedCoworker[2]) + parseInt(leastAnnoyedCoworker[1])
  const leastAnnoyedInitialPlusIncrement = parseInt(leastAnnoyedCoworker[0]) + parseInt(leastAnnoyedCoworker[1])

  // If coworker have been asked
  if (isAsked) {
    const coworkerTotalPlusIncrement = parseInt(coworker[2]) + parseInt(coworker[1])
    // If leastAnnoyedCoworker have been asked
    if (leastAnnoyedCoworker[3] === true) {
      if (coworkerTotalPlusIncrement > leastAnnoyedTotalPlusIncrement) { return; }
      else leastAnnoyedCoworker = coworker;
    }
    // If leastAnnoyedCoworker haven't been asked
    if (leastAnnoyedCoworker[3] === "false") {
      if (coworkerTotalPlusIncrement > leastAnnoyedInitialPlusIncrement) { return; }
      else leastAnnoyedCoworker = coworker;
    }
  }
  
  // If coworker haven't been asked
  else {
    const coworkerInitialPlusIncrement = parseInt(coworker[0]) + parseInt(coworker[1])
    // If leastAnnoyedCoworker have been asked
    if (leastAnnoyedCoworker[3] === true) {
      if (coworkerInitialPlusIncrement > leastAnnoyedTotalPlusIncrement) { return; }
      else leastAnnoyedCoworker = coworker;
    }
    // If leastAnnoyedCoworker haven't been asked
    if (leastAnnoyedCoworker[3] === "false") {
      if (coworkerInitialPlusIncrement > leastAnnoyedInitialPlusIncrement) { return; }
      else leastAnnoyedCoworker = coworker;
    }
  }
}

function getCoworkerAnnoyance() {
  for (let i = 1; i < parseInt(coworkers[0][1]) + 1; i++) {
    const coworkerTotalPlusIncrement = parseInt(coworkers[i][2]) + parseInt(coworkers[i][1])
    const coworkerInitialPlusIncrement = parseInt(coworkers[i][0]) + parseInt(coworkers[i][1])
    // If coworker have been asked
    if (coworkers[i][3] === true ) {
      for (let j = 1; j < (parseInt(coworkers[0][1]) + 1); j++) {
        // If leastAnnoyedCoworker have been asked
        if (coworkers[j][3] === true ) {
          const nextCoworkerTotalPlusIncrement = parseInt(coworkers[j][2]) + parseInt(coworkers[j][1])
          if (coworkerTotalPlusIncrement > nextCoworkerTotalPlusIncrement) { setLeastAnnoyedCoworker(coworkers[j], true) }
          else setLeastAnnoyedCoworker(coworkers[i], true)
        }
        // If leastAnnoyedCoworker haven't been asked
        if (coworkers[j][3] === "false" ) {
          const nextCoworkerInitialPlusIncrement = parseInt(coworkers[j][0]) + parseInt(coworkers[j][1])
          if (coworkerTotalPlusIncrement > nextCoworkerInitialPlusIncrement) { setLeastAnnoyedCoworker(coworkers[j], false) }
          else setLeastAnnoyedCoworker(coworkers[i], true)
        }
      }
    }
    // If coworker haven't been asked'
    if (coworkers[i][3] === "false" ) {
      for (let j = 1; j < (parseInt(coworkers[0][1]) + 1); j++) {
        // If leastAnnoyedCoworker have been asked
        if (coworkers[j][3] === true ) {
          const nextCoworkerTotalPlusIncrement = parseInt(coworkers[j][2]) + parseInt(coworkers[j][1])
          if (coworkerInitialPlusIncrement > nextCoworkerTotalPlusIncrement) { setLeastAnnoyedCoworker(coworkers[j], true) }
          else setLeastAnnoyedCoworker(coworkers[i], false)
        }
        // If leastAnnoyedCoworker haven't been asked
        if (coworkers[j][3] === "false" ) {
          const nextCoworkerInitialPlusIncrement = parseInt(coworkers[j][0]) + parseInt(coworkers[j][1])
          if (coworkerInitialPlusIncrement > nextCoworkerInitialPlusIncrement) { setLeastAnnoyedCoworker(coworkers[j], false) }
          else setLeastAnnoyedCoworker(coworkers[i], false)
        }
      }
    }
  }
}

function askCoworker(coworker) {
  // If asked first time
  if (coworkers[coworker[4]][3] === "false") {
    coworkers[coworker[4]][2] = (parseInt(coworker[0]) + parseInt(coworker[1]))
  }
  // If asked before
  if (coworkers[coworker[4]][3] === true) { 
    coworkers[coworker[4]][2] += parseInt(coworker[1])
  }
  coworkers[coworker[4]][3] = true;
}

rl.on('line', (line) => {
  const coworker = line.split('\n')[0] + " " + 0 + " " + "false" + " " + 0;
  coworkers.push(coworker.split(' '));
});

rl.on('close', function () {
  setUpCoworkersIndex();
  for(let i = 0; i < parseInt(coworkers[0][0]); i++) {
    if (first) {
      leastAnnoyedCoworker = coworkers[1];
      mostAnnoyedCoworker = coworkers[1];
      first = false;
    }
    getCoworkerAnnoyance();
    askCoworker(leastAnnoyedCoworker);
  }
  getMostAnnoyed();
  console.log(mostAnnoyedCoworker[2]);
});