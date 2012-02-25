function topologicalSort(graph){
	var numberOfNodes = graph.length;
	var processed = [];
	var unprocessed = [];
	var queue = [];
	populateIndegreesAndUnprocessed();
	processList();
	return processed;
	
	function processList(){
		var toBeRemoved = [];
		for(var i=0; i<unprocessed.length; i++){
			var nodeid = unprocessed[i];
			if(graph[nodeid].indegrees === 0){
				queue.push(nodeid);
				console.log('About to remove edge ' + i + ' from the graph.');
				unprocessed.splice(i, 1); //Remove this node, its all done.
				i--;//decrement i since we just removed that index from the iterated list;
			}
		}
		
		console.log(unprocessed);
		console.log('\n\n');
		
		processStartingPoint(queue.shift());
		if(processed.length<numberOfNodes){
			processList();
		}
	}


	function processStartingPoint(i){
		if(i == undefined){
			throw "You have a cycle!!";
		}
		for( var t=0; t<graph[i].edges.length; t++){
			var e = graph[i].edges[t];
			graph[e].indegrees--;
		};
		processed.push(i);
	}


	function populateIndegreesAndUnprocessed(){
		for(var i=0; i<graph.length; i++){
			unprocessed.push(i);
			if(!graph[i].hasOwnProperty('indegrees')){
				graph[i].indegrees = 0
			}
			for( var t=0; t<graph[i].edges.length; t++){
				var e = graph[i].edges[t];
				if(!graph[e].hasOwnProperty('indegrees')){
					graph[e].indegrees = 1
				}
				else{
					graph[e].indegrees = graph[e].indegrees + 1;
				}
			}
		}
	}
	
	
}


if(module){
	module.exports.topologicalSort = topologicalSort;
}
