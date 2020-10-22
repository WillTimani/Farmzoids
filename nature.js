//===================== nature.js=======================//

// days 
	// growing season 40 days long, 2-3 growing seasons 

// clouds
	// 10% chance each day
// rain 
	// 50% chance on a cloudy day
	// adds 1 unit of water to each plant's reserve
// wind
	// 30% chance each day, each dir equally likely

	// cold snap occurs 50% of the time when cloudy/rainy and wind if cloudy/rainy the day before
	// lasts two days, if plants aren't protected on second day plant has cold issues
	// farmzoids protect plants with smudge pots (protect within a 90 degree "cone", two diagonals is a 90 deg cone)

// blight
	// 2% chance each day, plant growth stalled until plant is washed by farmzoid

class Nature {

	constructor(){
		this.currentDay = 0;
		this.weather = "Sunny"
		this.newDay = false;
	}

	generateWeather(){
		var determinate = Math.random();

		if(determinate < .1){
			if(Math.random() > .5){
				this.weather = "Rainy";
			} else {
				this.weather = "Cloudy";
			}
		} else {
			this.weather = "Sunny";
		}

	}

	isWeather(w){
		if(w == this.weather) return true;
		return false;
	}

	endDay(){
		console.log("========= Day " + this.currentDay + " ended");
		this.currentDay++;
		this.newDay = true;
		console.log("========= Starting Day " + this.currentDay);

		this.generateWeather();
		console.log("========= Weather is " + this.weather);

	}

}


class Plant {

	constructor(k){
		this.kind = k; // apple, berry, corn
		this.look = "seed"; // seed, stalk, bush, flowering, green, red, none/dropped
		this.colorState = 3; // green = 3, yellow = 2, brown = 1, black/dead = 0
			// 2 units of water to get back to yellow
			// 2 units of water to get back to green
		this.water = 0; // 0, 1, 2, 3
			// 1 unit water used each day (unless rain)
			// > 3 is overwatered, fruiting is stalled until <= 3
			// if plant has no water at the end of the day, decrement the color 
		this.age = 0;
		this.growState = 0; // 0-2 = seed, 3-5 = flowering, 6-7 = green, 8 = none/dropped 
		this.fertilized = false;
	}

	needsWater(){
		if(this.water <= 0) return true;
		return false;
	}

	waterPlant(){
		this.water++;
		console.log("WATERING: " + this.water);
	}

	needsFertilizer(){
		if(!this.fertilized) return true;
		return false;
	}

}


class Plot{

	static plotNum = 0; 

	static increasePlotNum(){
		this.plotNum++;
	}
	static returnPlotNum(){
		return this.plotNum;
	}

	constructor(x, y){

		this.xCoor = x;
		this.yCoor = y; 

		this.plant = null;

		this.pNum = Plot.returnPlotNum();
		Plot.increasePlotNum();

	}

	plantSeed(k){
		this.plant = new Plant(k);
	}

	hasSeed(){
		if(this.plant != null){
			return 1;
		}
		return 0;
	}

	harvestPlant(){
		this.plant = null;
	}

}