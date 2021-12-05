const fs = require('fs');

function findPowerConsumption(){
	fs.readFile('./input.txt', (err, data) => {
		const dataString = data.toString(); // File to String
		const inputArray = dataString.split('\n');
		const BinaryCount = inputArray[0].length;
		const arrayLength = inputArray.length;
		let tempArray = [];
		let gammaRate = [];
		let epsilonRate = [];

		let gammaDecimal = 0;
		let epsilonDecimal = 0;

		let c0=[],c1=[],c2=[],c3=[],c4=[],c5=[],c6=[],c7=[],c8=[],c9=[],c10=[],c11=[];
		for(let i = 0; i < arrayLength; i++){
			tempArray = inputArray[i].split('');
			for(let j = 0; j < BinaryCount; j++){
				eval("c"+j+".push("+tempArray[j]+")");
			}
		}

		for(let k = 0; k < BinaryCount; k++){
			let zeroCount = 0;
			let oneCount = 0;
			for(let t = 0; t < arrayLength; t++){
				if( eval("c"+k+"["+t+"]") === 0 ){
					zeroCount++;
				}else if( eval("c"+k+"["+t+"]") === 1 ){
					oneCount++;
				}
			}
			if(zeroCount > oneCount){
				gammaRate.push(0);
				epsilonRate.push(1);
			}else if(oneCount > zeroCount){
				gammaRate.push(1);
				epsilonRate.push(0);
			}	

		}

		for(let d=0, power = BinaryCount-1 ; d <= BinaryCount-1; d++){
			gammaDecimal += gammaRate[d] * Math.pow(2,power);
			epsilonDecimal += epsilonRate[d] * Math.pow(2,power);
			power--;
			
		}
		let powerConsumption = gammaDecimal * epsilonDecimal;
		console.log(powerConsumption);
	});
}

findPowerConsumption();


// Consider first bit of 12 bit numbers
// filter array - if first most common value 1 then keep only those numbers start with (0/1) in array
//                        if 0 and 1 both are common then keep only those numbers start with 1 
//                         then same with second bit, third, fourth and so stop at number 1 left
//                         with last numbers equal bit 1&0 then take the number with 1bit
//                         if one left stop and this is oxygen generator rating in decimal


// For CO2 scrubber rating opposite less common value,  same process

// End multiply oxygen generator rating *  CO2 scrubber rating  = life support rating of the submarine

//


function findLifeSupportRating(){
	fs.readFile('./input.txt', (err, data) => {
		const dataString = data.toString(); // File to String
		const inputArray = dataString.split('\n');
		let oxygenGeneratorRating = calculateRating(inputArray, 'oxygen');
		let co2ScrubberRating = calculateRating(inputArray, 'co2');
		let powerConsumption = parseInt(oxygenGeneratorRating,2) * parseInt(co2ScrubberRating,2)
		console.log(powerConsumption);
	});
}

function calculateRating(inputArray, type){
	let length = inputArray[0].length;
	
	for(let i = 0; i < length; i++){
		let count0 = 0;
		let count1 = 0;
		for(let j = 0; j < inputArray.length; j++){
			if(inputArray[j].substr(i,1) === '0'){
				count0++;
			}else{
				count1++;
			}
			if(count0 > (inputArray.length/2) || count1 > (inputArray.length/2)){
				break;
			}
		}
		if(type === 'oxygen'){
			inputArray = inputArray.filter((element) => element.substr(i,1) === (count1 >= count0 ? '1' : '0'))
		}else{
			inputArray = inputArray.filter((element) => element.substr(i,1) === (count1 >= count0 ? '0' : '1'))
		}
		if(inputArray.length === 1){
			return inputArray;
		}
	}
	return inputArray;
	
}

findLifeSupportRating();