const fs = require('fs');

function part1(){
	fs.readFile('./input.txt', (err, data) => {
		const dataString = data.toString(); // File to String
		const segments = dataString.split('\n')
				.filter(Boolean)
				.map((line) => { const [from, to] =  line.split(' -> ')
									.map((point) => {
										const [x,y] = point.split(',').map(Number);
										return {x, y};
									 }); 
						return { from, to};
				});

		const filteredSegments = segments.filter((s) => s.from.x === s.to.x || s.from.y === s.to.y);
		
		const segmentAllPoints = new Map();
		let counter = 0;

		function addPoints(key){
			let content = segmentAllPoints.get(key);
			if(!content){
				content = 0;
			}
			content++;
			if(content === 2){
				counter++;
			}
			segmentAllPoints.set(key, content)
		}

		for(const eachSegment of filteredSegments){
			let isHorizontal = eachSegment.from.y === eachSegment.to.y;
			let currentSegment = {x: eachSegment.from.x, y: eachSegment.from.y}

			while(eachSegment.to.x !== currentSegment.x || eachSegment.to.y !== currentSegment.y){
				addPoints([currentSegment.x,currentSegment.y].join());
				if(isHorizontal){
					currentSegment.x += currentSegment.x < eachSegment.to.x ? 1 : -1; 
				}else {
					currentSegment.y += currentSegment.y < eachSegment.to.y ? 1 : -1;
				}
			}
			addPoints([currentSegment.x,currentSegment.y].join());
		}
		console.log(counter);
		
		

	});
}

part1()


///////////////////////////////////////////////////////////////////////////
function part2() {
	fs.readFile('./input.txt', (err, data) => {
	const dataString = data.toString(); // File to String
	const segments = dataString.split('\n')
			.filter(Boolean)
			.map((line) => { 
				const [from, to] =  line.split(' -> ').map((point) => {
									const [x,y] = point.split(',').map(Number);
									return {x, y};
									}); 
				return { from, to};
			});

	const segmentAllPoints = new Map();
	let counter = 0;

	function addPoints(key){
		let content = segmentAllPoints.get(key);
		if(!content){
			content = 0;
		}
		content++;
		if(content === 2){
			counter++;
		}
		segmentAllPoints.set(key, content)
	}


	 for (const eachSegment of segments) {
	    const isHorizontal = eachSegment.from.y === eachSegment.to.y;
	    const isVertical = eachSegment.from.x === eachSegment.to.x;
	    let currentPoint = { x: eachSegment.from.x, y: eachSegment.from.y }; 

	    while (currentPoint.x !== eachSegment.to.x || currentPoint.y !== eachSegment.to.y) {
	      addPoints([currentPoint.x, currentPoint.y].join(`,`));

	      if (isHorizontal) {
	        currentPoint.x += currentPoint.x < eachSegment.to.x ? 1 : -1;
	      } else if (isVertical) {
	        currentPoint.y += currentPoint.y < eachSegment.to.y ? 1 : -1;
	      } else {
	        currentPoint.x += currentPoint.x < eachSegment.to.x ? 1 : -1;
	        currentPoint.y += currentPoint.y < eachSegment.to.y ? 1 : -1;
	      }
	    }
	    addPoints([currentPoint.x, currentPoint.y].join(`,`));
	 }
	  console.log(counter);
  });
}

part2();
