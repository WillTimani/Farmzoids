// cs-sketch.js; P5 key animation fcns.  // CF p5js.org/reference

// farm is 40 x 40 grid cells (0,0 to 39,39)
// FMS (farm monitoring system)

// order: nature, FMS, then zoids 

// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas; // JS Global var, w canvas size info.
var g_frame_cnt; // Setup a P5 display-frame counter, to do anim
var g_frame_mod; // Update ever 'mod' frames.
var g_stop; // Go by default.
var g_cnv;   // To hold a P5 canvas.

var g_l4job = { id:1 }; // Put Lisp stuff for JS-to-access in ob; id to make ob.

var nature;                     // instance of nature class, handles days, weather and nature-related rules

var farmzoids = [];             // collection of farmzoids 
var currentFarmzoid = 0;        // farmzoid currently being processed, used for lisp functions

var plotLocs = [];              // collection of plots 
var harvestedPlants = 0;        // total number of harvested plants, plants are harvested automatically when growstate reachs 8

var taskList = [];              // collection of tasks, distributed among the farmzoids from the top of the stack

var g_barn = { x: 20, y:20};    // barn location

function setup() // P5 Setup Fcn
{
    console.log( "Beg P5 setup =====");
    console.log( "@: log says hello from P5 setup()." );
    g_canvas = { cell_size:20, wid:40, hgt:40 };
    g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
    g_frame_mod = 24; // Update ever 'mod' frames.
    g_stop = 0; // Go by default.

    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1.
    let height = sz * g_canvas.hgt;
    g_cnv = createCanvas( width, height );  // Make a P5 canvas.
    console.log( "@: createCanvas()." );
    background("green");
    draw_grid( 20, 100, 'black', 'black' );

    nature = new Nature();

    farmzoids.push(new farmzoid(g_barn.x, g_barn.y, 1, 0));
    farmzoids.push(new farmzoid(g_barn.x, g_barn.y, 1, 0));
    //farmzoids.push(new farmzoid(g_barn.x, g_barn.y, 1, 0));

    taskList.push(new doPlot(new Plot(23,20), 23, 20));
    taskList.push(new doPlot(new Plot(17,20), 17, 20));

    taskList.push(new doPlot(new Plot(14,20), 14, 20));
    taskList.push(new doPlot(new Plot(20,23), 20, 23));
    taskList.push(new doPlot(new Plot(20,17), 20, 17));
    taskList.push(new doPlot(new Plot(26,20), 26, 20));

    /* Extra plots
    NOTE:   plot drawing becomes glitchy as more plots/farmzoids are added 
            program will still function as normal, but may be hard to keep track of visually */

    //taskList.push(new doPlot(new Plot(29,20), 29, 20));
    //taskList.push(new doPlot(new Plot(20,29), 20, 29));
    //taskList.push(new doPlot(new Plot(26,26), 26, 26));
    //taskList.push(new doPlot(new Plot(23,23), 23, 23));
    //taskList.push(new doPlot(new Plot(29,29), 29, 29));
    //taskList.push(new doPlot(new Plot(17,17), 17, 17));
    //taskList.push(new doPlot(new Plot(14,17), 14, 17));
    //taskList.push(new doPlot(new Plot(17,14), 17, 14));
    //taskList.push(new doPlot(new Plot(14,14), 14, 14));
    //taskList.push(new doPlot(new Plot(11,14), 11, 14));

    console.log( "End P5 setup =====");
}

var g_farm = { wid: 40, hgt: 40}; // Farm size in cells 
var g_plot = { x: 0, y: 0, p: 0, cs:0, seed:0, water:0}; // Plot attributes, used for lisp drawing functions
var g_box = { t:1, hgt:47, l:1, wid:63 }; // Box in which bot can move.

function csjs_get_pixel_color_sum( rx, ry )
{
    let acolors = get( rx, ry ); // Get pixel color [RGBA] array.
    let sum = acolors[ 0 ] + acolors[ 1 ] + acolors[ 2 ]; // Sum RGB.
    //dbg console.log( "color_sum = " + sum );
    return sum;
}

function check_Tasks(){
    for(var i = 0; i < farmzoids.length; i++){
        if(farmzoids[i].hasTask()){
            return true;
        }
    }
    return false;
}

function draw_update()  // Update our display.
{

    background("green");
    draw_grid( 20, 100, 'black', 'black' );

    document.getElementById("day").innerHTML = "(Day: " + nature.currentDay + ") (Weather: " + nature.weather + ") (Harvested Plants: " + harvestedPlants + ")";
    document.getElementById("f1").innerHTML = "Farmzoid 0: (Moves: " + farmzoids[0].moves + ") (Tool: " + farmzoids[0].tool + ")";
    if(farmzoids[0].hasTask()) document.getElementById("f1Task").innerHTML = "(Task: " + farmzoids[0].task.name + ", " + farmzoids[0].task.xCoor + ", " + farmzoids[0].task.yCoor + ")";
    if(farmzoids[1] != null) document.getElementById("f2").innerHTML = "Farmzoid 1: (Moves: " + farmzoids[1].moves + ") (Tool: " + farmzoids[1].tool + ")";
    if(farmzoids[1].hasTask()) document.getElementById("f2Task").innerHTML = "(Task: " + farmzoids[1].task.name + ", " + farmzoids[1].task.xCoor + ", " + farmzoids[1].task.yCoor + ")";

    // Process nature if a new day has started 
    if(nature.newDay){
        console.log("Processing Nature");

        g_l4job.process_nature();
        nature.newDay = false;

        return;
    }

    // Draw plots
    for(var i = 0; i < plotLocs.length; i++){

        g_plot.x = plotLocs[i].xCoor;
        g_plot.y = plotLocs[i].yCoor;
        g_plot.seed = plotLocs[i].hasSeed();
        if(plotLocs[i].plant != null) {
            g_plot.water = plotLocs[i].plant.water;
            g_plot.cs = plotLocs[i].plant.colorState;
        }
        g_l4job.draw_plot();
    }

    g_l4job.draw_barn();

    // Draw and move farmzoids, assign tasks and evaluate rules
    for(var i = 0; i < farmzoids.length; i++){

        currentFarmzoid = i;

        g_l4job.draw_fn();
        g_l4job.assign_tasks();

        if(nature.newDay){
            for(var j = 0; j < farmzoids.length; j++){
                if(j != i){
                    farmzoids[j].moves = 0;
                    farmzoids[j].xCoor = g_barn.x;
                    farmzoids[j].yCoor = g_barn.y;
                }
            }

            break;
        }
    }


}

function draw()  // P5 Frame Re-draw Fcn, Called for Every Frame.
{
    ++g_frame_cnt;
    if (0 == g_frame_cnt % g_frame_mod)
    {
        console.log( "g_frame_cnt = " + g_frame_cnt );
        if (!g_stop) draw_update();
    }
}
