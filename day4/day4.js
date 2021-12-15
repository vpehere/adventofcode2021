const fs = require('fs');



//////////////////
/// Score Calculator Function
//////////////////

function calculateScore(winnerboard, bingoNumber){
	let sumOfUnmarkedNumbers = 0;
		for(let i = 0; i < 5; i++){
			for(let j = 0; j < 5; j++){
				if(winnerboard[i][j] !== '*'){
					sumOfUnmarkedNumbers += parseInt(winnerboard[i][j]);
				}
			}
		}

		let finalScoreValue = sumOfUnmarkedNumbers * bingoNumber;
		console.log(finalScoreValue);	
}



/////////////////////////
//////. PART ONE
/////////////////////////
function finalScore(){
	fs.readFile('./input.txt', (err, data) => {
		const dataString = data.toString(); // File to String
		const inputArray = dataString.split(/\n\s*\n/);
		let bingoNumbers = inputArray[0].split(',');

		inputArray.shift();
		let [...boardsNumbers] = inputArray;
		let boards = [];

		for(let i = 0; i < boardsNumbers.length; i++){
			let boardTemp = boardsNumbers[i].split('\n');
			boards.push(boardTemp);
		}

		for(let i =0; i < boards.length; i++){
			for(let j=0; j< boards[i].length; j++){
				let tempArray = boards[i][j].trim().split(/\s+/).join(' ').split(' ');
				boards[i][j] = tempArray;
			}
		}
		
		let bingoNumbersArray = [];
		let bingoBoardIndex = 0;
		
		for(let bingoNumber = 0; bingoNumber < bingoNumbers.length; bingoNumber++){
			for(let board = 0; board < boards.length; board++){
				for(let line = 0; line < boards[board].length; line++){
					for(let number = 0; number < 5 ; number++){
						if(boards[board][line][number] === bingoNumbers[bingoNumber]){
							boards[board][line][number] = '*';
						}

						let numberColumn = [];
						for( let k = 0; k < 5; k ++){
							numberColumn.push(boards[board][k][number])
						}

						if( (boards[board][line].every((val) => val === '*')) ||
							(numberColumn.every((val) => val === '*' )) ){
								bingoNumbersArray.push(bingoNumbers[bingoNumber]);
								bingoBoardIndex = board;
								bingoNumber = bingoNumbers.length;
								break;
							}
					}
				}
			}
		}
		calculateScore(boards[bingoBoardIndex], bingoNumbersArray[0]);
	});
}
finalScore();



/////////////////////////
//////. PART TWO
/////////////////////////
function finalScoreLast(){
	fs.readFile('./input.txt', (err, data) => {
		const dataString = data.toString(); // File to String
		const inputArray = dataString.split(/\n\s*\n/);
		let bingoNumbers = inputArray[0].split(',');

		inputArray.shift();
		let [...boardsNumbers] = inputArray;
		let boards = [];

		for(let i = 0; i < boardsNumbers.length; i++){
			let boardTemp = boardsNumbers[i].split('\n');
			boards.push(boardTemp);
		}

		for(let i =0; i < boards.length; i++){
			for(let j=0; j< boards[i].length; j++){
				let tempArray = boards[i][j].trim().split(/\s+/).join(' ').split(' ');
				boards[i][j] = tempArray;
			}
			if (boards[5]) {
        		boards.pop()
      		}
		}
		
		let bingoNumbersArray = [];
		let bingoBoardIndex = [];
		let winningBoards = [];
		
		for(let bingoNumber = 0; bingoNumber < bingoNumbers.length; bingoNumber++){
			for(let board = boards.length -1; board >= 0; board--){
				for(let line = 0; line < boards[board].length; line++){
					for(let number = 0; number < 5 ; number++){
						
						if(boards[board][line][number] === bingoNumbers[bingoNumber]){
							boards[board][line][number] = '*';

							let numberColumn = [];
							for( let k = 0; k < 5; k ++){
								numberColumn.push(boards[board][k][number])
							}
							
							if( (boards[board][line].every((val) => val === '*')) ||
								(numberColumn.every((val) => val === '*' )) ){								
									 bingoNumbersArray.push(bingoNumbers[bingoNumber])
						             winningBoards.push(boards[board])
						             bingoBoardIndex.push(board)
							}
						}
					}
				}
			}
			bingoBoardIndex.forEach((index) => {
				boards.splice(index, 1)
			})
			bingoBoardIndex = []
		}
			
		let lastWinningNumber = bingoNumbersArray[bingoNumbersArray.length - 1]
  		let lastWinningboard = winningBoards[winningBoards.length - 1]

  		calculateScore(lastWinningboard, lastWinningNumber);
	
	});
}
finalScoreLast();

