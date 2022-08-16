const readLine = require('readline');
const fs = require('fs');
var file = './samples/002.in';

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
  for (let i = 1; i < parseInt(coworkers[0][1]) + 1; i++) {
    coworkers[i][4] = i;
  }
}

function getMostAnnoyed() {
  for (let i = 1; i < parseInt(coworkers[0][1]) + 1; i++) {
    if (coworkers[i][0] > mostAnnoyedCoworker[2] || coworkers[i][2] > mostAnnoyedCoworker[2]) {
      mostAnnoyedCoworker = coworkers[i]
    }
  }
}

function getCoworkerAnnoyance() {
  for (let i = 1; i < parseInt(coworkers[0][1]) + 1; i++) {
    // If total is less then current leastAnnoyed and coworker has been asked before.
    if (coworkers[i][2] <= leastAnnoyedCoworker[2] && coworkers[i][3] === true ) {
      console.log("If true")
      // Check for each coworker
      for (let j = 1; j < (parseInt(coworkers[0][1]) + 1); j++) {
        console.log("Iterate through " + coworkers[j])
        // If increment is higher or equal to the next coworkers initial annoyance
        if (coworkers[i][1] >= coworkers[j][1] && coworkers[j][3] === true) {
          console.log("Is increase higher then initial and new is true")
          if (coworkers[i][2] > coworkers[j][2]) {
            leastAnnoyedCoworker = coworkers[j]
          }
        }
      }
    }
    // If first time, set leastAnnoyed to lowest initial annoyance.
    if (coworkers[i][0] <= leastAnnoyedCoworker[2] && coworkers[i][3] === "false") { leastAnnoyedCoworker = coworkers[i] }
  }
}

function askCoworker(coworker) {
  // If asked first time
  console.log("ASK COWORKER ", coworkers[coworker[4]])
  if (coworkers[coworker[4]][3] === "false") {
    coworkers[coworker[4]][2] = (parseInt(coworker[0]) + parseInt(coworker[1]))
    console.log(coworkers[coworker[4]][2] + " FIRST")
  }
  
  // If asked before
  if (coworkers[coworker[4]][3] === true) { 
    coworkers[coworker[4]][2] += parseInt(coworker[1])
    console.log(coworkers[coworker[4]][2] + " SECOND")
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
    console.log("LEAST ANNOYED", leastAnnoyedCoworker)
    askCoworker(leastAnnoyedCoworker);
    getMostAnnoyed();
  }
  console.log("Least annoyed", leastAnnoyedCoworker[2]);
  console.log("Most annoyed", mostAnnoyedCoworker[2]);
});