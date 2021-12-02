const fs = require('fs'); // Readfile require

// Question1. How many measurements are larger than previous measurements ?
// Given Input file with values
// Convert the values in array, then to Integer
// Loop through the array
// Check if current value < next value, then increase counter
// Return Counter
// inputArray = [199,200,208,210,200,207,240,269,260,263];  //sample input 


function question1(){
	fs.readFile('./input.txt', (err, data) => {
		const dataString = data.toString(); // File to String
		const inputArray = dataString.split('\n').map(Number); // string to array, then convert to integer
		let increasedCount = 0;
		for(i = 0; i < (inputArray.length - 1); i++){
			if(inputArray[i] < inputArray[i+1]){
				increasedCount++;
			}
		}
		console.log(increasedCount);
	});
}
question1();

// Question2. Count the number of times the sum of measurements in this sliding window increases from the previous sum.
// Given Input file with values
// Convert the values in array, then to Integer
// Loop while i+2 < array length
// SumA = array[i] + array[i+1] + array[i+2]
// SumB = array[i] + array[i+1] + array[i+2]
// Check SumA < SumB , then increase counter
// return counter


function question2(){
	fs.readFile('./input.txt', (err, data) => {
		const dataString = data.toString();
		const inputArray = dataString.split('\n').map(Number);
		let i=0;
		let increasedCount = 0;
		while (i+2 < inputArray.length){
				sumA = inputArray[i] + inputArray[i+1] + inputArray[i+2];
				sumB = inputArray[i+1] + inputArray[i+2] + inputArray[i+3];
				if(sumA < sumB){
					increasedCount++;
				}
				i++;
		}
		console.log(increasedCount);
	});

}
question2();