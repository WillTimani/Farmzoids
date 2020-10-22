CPSC 481-05
Project #2 Farmzoids
Team WIL
William Timani

Introduction:
This is a javascript program, with html, LISP and P5 incorporation. The purpose of this program is to demonstrate multiple AI farmzoids completeing assigned tasks in order to maintain a farm. 

The farmzoids are first assigned tasks to create plots near the farm. The farmzoids then seed and water the plants. 
The farmzoids are limited to 50 moves per day. When this limit is reached, the day ends. 
Days are kept track of with nature. When a day ends, nature will decrement the color of a plant if it does not have water or increment the growstate of plants if they do have water.
Nature also generates Sunny, Cloudy or Rainy weather. On Cloudy days, growstate is not incremented. On Rainy days, water is not decremented, growstate is also not incremented.
When a plant reaches a growstate of 8, it is automatically harvested. Once all plants are harvested, the program has completed its cycle.

Contents:  
assets  
pix  
cs-sketch.js  
farmzoid.js  
index-js-p5-jathp-5.html  
Jathp.js  
nature.js  
p5.js  
README.txt  

External Requirements:
This program was tested using Google Chrome on a Windows 10 system, however should work with any program that can run HTML files. 

Setup and Installation:
If using a web browser, simply drag index-js-p5-jathp-5.html into the browser window, or open it with the browser program. The program should then be visual and run its course.

Sample Invocation:
The program is started and the farmzoids begin to run their tasks. Nature and Farmzoid data is displayed on the top of the page. The program will continue to run until all plants have been harvested.

Features:
- 40x40 farm grid
- Barn displayed as a red square in the center of the farm grid
- Farmzoids (2 by default, but is scaleable)
	- Displayed as cyan and green circles and can move one cell at a time up, down, left or right
	- Task assignment that provides x and y location as well as needed tool
	- Tool requirement (farmzoids will move to barn to acquire the task needed tool)
	- Pathing to task location
- Tasks
	- Provides location farmzoid needs to traverse to to complete task
	- DoPlot which creates a plot at the given location
	- DoSeed which creates a plant of given seed kind at the given plot location (seed kinds not currently implemented)
	- DoWater which waters a plant at the given plot location 
- Plots (6 by default, but is scalable)
	- Keep track of location as well as any plants located on the plots
- Plants
	-  Keep track of water, colorstate and growstate
	- Colorstate is decremented if water is 0 at the end of the day
	- Growstate does not increment if color state is not 3 (green)
	- Harvested when growstate reaches 8
- Nature
	- Keeps track of days and weather
	- Generate Sunny weather (90% chance)
	- Generate Cloudy weather (10% chance)
	- Generate Rainy eather (50% when cloudy)
	- Increments/Decrements water, colorstate and growstate at the end of each day depending on rules

Bugs:
- Some plots are not visually updated immediately after farmzoid completes a task at the plots 

Third Party Material:
All files contained in this project (other than nature.js and farmzoid.js) originated from Charles Siska. index-js-p5-jathp-5.html and cs-sketch.js have been modified heavily from the originally provided files. All other files were purely provided by Charles.   

Sample screenshots of the farmzoids in action:
Plotting
![FarmzoidsPlots](https://github.com/WillTimani/Farmzoids/blob/main/Images/FarmzoidsPlots.png)

Seeding
![FarmzoidsSeeds](https://github.com/WillTimani/Farmzoids/blob/main/Images/FarmzoidsSeeds.png)

Watering
![FarmzoidsWater](https://github.com/WillTimani/Farmzoids/blob/main/Images/FarmzoidsWater.png)

Harvesting
![FarmzoidsHarvest](https://github.com/WillTimani/Farmzoids/blob/main/Images/FarmzoidsHarvest.png)

Finished Harvest
![FarmzoidsFinished](https://github.com/WillTimani/Farmzoids/blob/main/Images/FarmzoidsFinished.png)

