const fs = require('fs'); // Readfile require

function question1(){
	fs.readFile('./input.txt', (err, data) => {
		const dataString = data.toString(); // File to String
		const inputArray = dataString.split('\n');
		let forward = 0;
		let depth = 0;
		let total = 0;
		inputArray.forEach(item => {
			eachMovement = item.split(' ');
			if(eachMovement[0] === "forward"){
				forward += parseInt(eachMovement[1]);
			}else if(eachMovement[0] === "down"){
				depth += parseInt(eachMovement[1]);
				
			}else if(eachMovement[0] === "up"){
				depth -= parseInt(eachMovement[1]);	
			}
		});
		total = forward * depth;
		console.log(total);
	});
}

question1();

function question2(){
	fs.readFile('./input.txt', (err, data) => {
		const dataString = data.toString(); // File to String
		const inputArray = dataString.split('\n');
		let aim = 0;
		let depth = 0;
		let horizontal = 0;
		inputArray.forEach(item => {
			eachMovement = item.split(' ');
			if(eachMovement[0] === "forward"){
				horizontal += parseInt(eachMovement[1]);
				depth += aim * parseInt(eachMovement[1]);	
			}else if(eachMovement[0] === "down"){
				aim += parseInt(eachMovement[1]);	
			}else if(eachMovement[0] === "up"){
				aim -= parseInt(eachMovement[1]);				
			}
		});
		total = horizontal * depth;
		console.log(total);
	});
}

question2();