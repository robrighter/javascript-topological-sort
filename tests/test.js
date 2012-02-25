var assert = require('assert');
var topologicalSort = require('../topological-sort').topologicalSort;

tests = [
	{
		graph:  [
			{edges:[1,2]},
			{edges:[3]},
			{edges:[5]},
			{edges:[4]},
			{edges:[5,6]},
			{edges:[6]},
			{edges:[]}
		],
		solution: [0,1,2,3,4,5,6] 
	},
	{
		graph: [
			{edges:[1,2]},
			{edges:[3]},
			{edges:[1,4]},
			{edges:[5]},
			{edges:[5,6]},{edges:[7]},
			{edges:[7]},
			{edges:[]}
		],
		solution: [ 0, 2, 1, 4, 3, 6, 5, 7 ] 
	},
	{
		graph: [
			{edges:[1,2]},
			{edges:[3]},
			{edges:[1,4]},
			{edges:[5]},
			{edges:[5,6]},
			{edges:[7]},
			{edges:[7]},
			{edges:[0]}
		],
		solution: 'cycle' 
	}
];


var counter = 0;
var red = "\033[1;31m";
var green = "\033[1;32m";
var graph_color = "\033[1;35m";
var normal_color = "\033[0m";
var failed = 0;
var passed = 0;
tests.forEach(function(graph){
	console.log('GRAPH ' + ++counter);
	console.log(graph_color);
	console.log(graph.graph);
	console.log(normal_color);
	try{
		var solution = topologicalSort(graph.graph);
		assert.deepEqual(solution, graph.solution);
		console.log(green+'Succesfully Solved With:'+normal_color);
		console.log(solution);
		passed++;
	}catch(e){
		if((e === "You have a cycle!!") && (graph.solution==='cycle')){
			console.log(green+'Succesfully Detected Cycle.'+normal_color);
			passed++;
		}
		else{
			console.log(red+'Failed Graph '+counter+' test.'+normal_color);
			failed++;
		}
	}
	console.log('-------------------------------------------');
});

if(passed>0){
	console.log(green+'Passed '+passed+' tests.');
}
if(failed>0){
	console.log(red+'Failed '+failed+' tests.');
}