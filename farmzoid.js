//====================farmzoid.js===================//

// 4 zoids per farm
// 50 moves per day
// can carry 10 barrels of fruit
// unlimited supply of barn items
// can carry 20 plots at a time (169 plots possible)
// can only carry one type of item at a time 

class farmzoid{

	static zoidNum = 0; 

	static increaseZoidNum(){
		this.zoidNum++;
	}

	static returnZoidNum(){
		return this.zoidNum;
	}


	constructor(x, y, dx, dy){

		this.xCoor = x;
		this.yCoor = y;
		this.dirX = dx;
		this.dirY = dy;
		this.moves = 0;
		this.tool = null;
		this.gettingTool = false;
		this.task = null;

		this.num = farmzoid.returnZoidNum();
		farmzoid.increaseZoidNum();

		//var dir; // n(0), e(1), s(2), w(3) 
		//var currentlyCarrying; // fert, soap, water, plot 

	}

	// n : tool name
	takeTool(){
		if(this.task != null){
			this.tool = this.task.reqTool;
			this.needTool = false;
		} else {
			console.log("Invalid tool acquisition. Bot " + this.num + " does not have a task");
		}
	}

	needsTool(){
		if(this.task !=null && this.task.reqTool != this.tool){
			return true;
		}
		return false;
	}

	hasTask(){
		if(this.task == null) return false;
		return true;
	}
	addTask(t){
		this.task = t;
		console.log("Farmzoid " + this.num + ": Adding " + this.task.name + " Task at (" + t.xCoor + "," + t.yCoor + ")" );
	}
	removeTask(){
		console.log("Farmzoid " + this.num + ": Removing Task" );
		this.task = null;
	}

}

class Task{
	// n : name
	// x : xPos
	// y : yPos
	// t : required tool
	constructor(n, x, y, t){
		this.name = n;
		this.xCoor = x;
		this.yCoor = y;
		this.reqTool = t;
	}


}

class doPlot extends Task{
	// p : plot
	// x : xPos
	// y : yPos
	constructor(p, x, y){
		super("plot", x, y, "Hoe");
		this.plot = p;
	}
}

class doSeed extends Task{
	// p : plot
	// x : xPos
	// y : yPos
	// k : kind
	constructor(p, x, y, k){
		super("seed", x, y, "Dibber");
		this.plot = p;
		this.kind = k
	}
}

class doWater extends Task{
	// p : plot
	// x : xPos
	// y : yPos
	constructor(p, x, y){
		super("water", x, y, "Can");
		this.plot = p;
	}	
}