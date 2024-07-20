//array to store player names
var playerNames = [];
//index to sort player names into array
var index = 1;
//variable to show player 1 when index is 0, etc.
var nameNum = 1;
//all players start at E
var scores = [];
//array for par on each hole
var holePar = [4, 5, 4, 4, 3, 5, 4, 3, 4];
//holePar.length = 18;
//array for hole handicap
var holeHCP = [];
holeHCP.length = 18;
var playerIDs = [];
//keep track of which hole we just played
var whichHole = 0;
//set var to calculate par
currentPar = 0;
//for (i = 0; i < 18; i++){
//	holePar[i] = 4;
//}
function getPlayers() {
	//Get number of players in the round
	let getPlayers = document.getElementById("getPlayers");
	let numPlayers = getPlayers.value;
	//clear input field
	getPlayers.value = "";
	//change input text for first player
	var inputText = document.getElementById("inputText");
	inputText.innerHTML = "Player " + index + " Name: ";
	//set array length to number of players, score array also
	playerNames.length = numPlayers;
	scores.length = numPlayers;
	playerIDs.length = numPlayers;
	//change submit button function
	var button = document.getElementById("totalPlayers");
	button.setAttribute("onclick", "getNames()");	
}

function getNames() {
	let getPlayers = document.getElementById("getPlayers");
	//capture input and store to numPlayers
	let numPlayers = getPlayers.value;
	//make sure field isn't blank
	if (numPlayers == "") {
		alert("Please enter name");
		return false;
	}
	//change name to upper case
	numPlayers = numPlayers.toUpperCase();
	if (index < playerNames.length && numPlayers != "") {
		nameNum++;
		//change input text
		document.getElementById("inputText").innerHTML = "Player " + nameNum +  " Name:";
		//store input into array
		playerNames[index - 1] = numPlayers;
		//erase input field text
		getPlayers.value = "";
		index++;
	} else {
		playerNames[index - 1] = numPlayers;
		getPlayers.value = "";
		document.getElementById("getPlayers").remove();
		document.getElementById("inputText").remove();
		document.getElementById("totalPlayers").innerHTML = "Start Round!";
		document.getElementById("totalPlayers").setAttribute("onclick", "startRound()");
	}	
}

function startRound() {
	//remove input and insert title
	document.getElementById("input").remove();
	document.getElementById("header").innerHTML = "LEADERS";
	document.getElementById("header").style.fontFamily = 'din-2014, sans-serif';
	document.getElementById("header").style.margin = '0';
	//set up html element creation for text, input field, and submit buttons
 	let playerDiv = document.getElementById('players');
 	let scoreInput = document.createElement('input');
 	let scoreUpdate = document.createElement('button');
	createPlayers();
	//create inputs for score entry
	label = document.createElement("label");
	for (i = 0; i < playerNames.length; i++) {
		labelText = playerNames[i] + " Score:";
		label.innerHTML=labelText;
		label.id = 'enterscore';
		scoreInput.id = 'player' + i + 'score';
		scoreInput.setAttribute('class', 'scoreData');
		//add input field IDs to array
		playerIDs[i] = scoreInput.id;	
		scoreInput.innerHTML = scoreInput.id;
		scoreUpdate.id = 'postScore';
		scoreUpdate.setAttribute('onclick', 'checkEmpty()');
		scoreUpdate.innerHTML = "Post";
		playerDiv.appendChild(label.cloneNode(true));
		playerDiv.appendChild(document.createElement("br").cloneNode(true));
		playerDiv.appendChild(scoreInput.cloneNode(true));
		playerDiv.appendChild(document.createElement("br").cloneNode(true));	
	}
	//create space underneath leaderboard for input fields
	document.getElementById('playerTable').style.marginBottom = '80px';
	//create post button after score entry fields
	playerDiv.appendChild(scoreUpdate);
	playerDiv.appendChild(document.createElement("br").cloneNode(true));
}

function createPlayers() {
	//create player rows and columns
	playerDiv = document.getElementById("players");
	//create table
	var table = document.createElement("table");
	//table.border = '1';
	table.id = 'playerTable';
	playerDiv.appendChild(table);
	playerTable = document.getElementById("playerTable");
	playerTable.style.width = '100%';
	tr = document.createElement("tr");
	td = document.createElement("td");
	//create row for each player
	for (let i = 0; i < playerNames.length; i++){
		//set id for each row, number only to find total score easier at the end
		tr.id = 'player' + i;
		//tr.className = "playerRow";
		//apply css to each player row
		tr.style.fontFamily = 'din-2014, sans-serif';
		tr.style.fontSize = '24px';
		tr.style.borderStyle = 'solid';
		//cloneNode(true) required for repeatedly creating the same element
		playerTable.appendChild(tr.cloneNode(true));		
		rowID = document.getElementById(tr.id);
		//set initial score for each player to E
		scores[i] = 0;
		//create columns within each row
		for (j = 0; j < 4; j++){
			//set id for each column based on i (player number)
			if (j == 0) {
				td.id = "player" + i + "pos";
				td.style.width = '5%';
				td.style.textAlign = "left";
			} else if (j == 1) {
				td.id = "player" + i + "name";
				playerName = td.id;
				td.style.width = '40%';
				td.style.textAlign = 'left';
			} else if (j == 2) {
				td.id = "player" + i + "score";
				td.style.textAlign = 'center';
				playerScore = td.id;
				td.style.width = '5%';
			} else {
				td.id = "lastHole" + i;
			}
			rowID.appendChild(td.cloneNode(true));
		}
		//pass player names from array into column for each player
		document.getElementById(playerName).innerHTML=playerNames[i];
		//insert score into third column
		document.getElementById(playerScore).innerHTML = 'E';
		document.getElementsByClassName('');
	}
	//start with player 1 with position 1, rest blank
	document.getElementById('player0pos').innerHTML='1';

}

function checkEmpty() {
	//see if there are any blank scores
	let isBlank = false;
	scoreData = document.getElementsByClassName('scoreData');
	for (i = 0; i < scores.length; i++) {
		if (scoreData[i].value == "") {
			alert("Please enter a score:");
			isBlank = true;
			return;
		}
	}
	if (isBlank === false) {
		postScore();
	}
}

function postScore() {
	whichHole++;
	currentPar = currentPar + holePar[whichHole - 1];
	//get values from input fields and add to scores array
	scoreData = document.getElementsByClassName('scoreData');
	scoreToPar = 0;
	//update scores
	for (i = 0; i < scores.length; i++) {
		//convert data to integer and add to scores array
		changeScore = parseInt(scoreData[i].value);
		scores[i] = scores[i] + changeScore;
		//clear input fields
		scoreData[i].value = '';		
		document.getElementById(playerIDs[i]).innerHTML = scores[i];
		document.getElementById('lastHole' + i).innerHTML = whichHole;
	}
	//compare each score to others and sort rows accordingly
	switchContinue = true;
	let table = document.getElementById('playerTable');
	while (switchContinue) {
		switchContinue = false;
		var allRows = table.rows;
		let i;
		//iterate through each row and check if switch is required
		for (i = 1; i < allRows.length; i++) {
			var switchRow = false;
			//get two rows from table
			let first = allRows[i - 1].getElementsByTagName("TD")[2];
			let second = allRows[i].getElementsByTagName("TD")[2];
			//if score is lower, need to switch
			if(parseInt(first.innerHTML) > parseInt(second.innerHTML)) {
				switchRow = true;
				break;
			}
		}
		if (switchRow) {
			allRows[i - 1].parentNode.insertBefore(allRows[i], allRows[i - 1]);
			//check if more switching is needed
			switchContinue = true;
		}
	}

	//change player position
	for (k = 0; k < scores.length; k++){
		//put numerical score in html to use to determine position on leaderboard
		document.getElementById(playerIDs[k]).innerHTML = scores[k];
		//update each player's position on the leaderboard
		posID = allRows[k].id + "pos";
		if (k == 0) {
			document.getElementById(posID).innerHTML = "1";
		} else {
			let first = allRows[k - 1].getElementsByTagName("TD")[2];
			let second = allRows[k].getElementsByTagName("TD")[2];
			if (parseInt(second.innerHTML) == parseInt(first.innerHTML)) {
				document.getElementById(posID).innerHTML = " ";
			} else {
				document.getElementById(posID).innerHTML = k + 1;
			}
		}
	}
	//change html to reflect score in relation to par
	for (l = 0; l < scores.length; l++){
		scoreToPar = scores[l] - currentPar;
		//convert numerical score to relation to par
		if (scoreToPar == 0) {
			scoreToPar = "E";
		} else if (scoreToPar > 0) {
			scoreToPar = "+" + scoreToPar;
		}
		document.getElementById(playerIDs[l]).innerHTML = scores[l];
		document.getElementById(playerIDs[l]).innerHTML = scoreToPar;
		//reset scoreToPar for next iteration
		scoreToPar = 0;
	}
	//show total score after last hole
	if (whichHole == holePar.length) {
		//remove post score button
		document.getElementById('postScore').remove();
		let table = document.getElementById('playerTable');
		//store order of players in array
		let playerOrder = table.rows;
		for (let i = 0; i < scores.length; i++) {
			scoreIndex = playerOrder[i].id;
			scoreIndex.toString();
			//get rid of 'player' in id so it's just a number
			scoreIndex = scoreIndex.slice(6);
			console.log(scoreIndex);
			//replace last hole completed with total score
			document.getElementById('lastHole' + scoreIndex).innerHTML = scores[scoreIndex];
		}
	}
}