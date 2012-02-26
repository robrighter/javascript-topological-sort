function topologicalSort(graph) {
	var numberOfNodes = graph.length;
	var processed = [];
	var unprocessed = [];
	var queue = [];
	
	function iterate(arr, callback){
		var i;
		for(i=0;i<arr.length;i++){
			callback(arr[i], i);
		}
	}
	
	function processList(){
		for(var i=0; i<unprocessed.length; i++){
			var nodeid = unprocessed[i];
			if(graph[nodeid].indegrees === 0){
				queue.push(nodeid);
				unprocessed.splice(i, 1); //Remove this node, its all done.
				i--;//decrement i since we just removed that index from the iterated list;
			}
		}
		
		processStartingPoint(queue.shift());
		if(processed.length<numberOfNodes){
			processList();
		}
	}


	function processStartingPoint(nodeId){
		if(nodeId == undefined){
			throw "You have a cycle!!";
		}
		iterate(graph[nodeId].edges, function(e){
			graph[e].indegrees--;
		});
		processed.push(nodeId);
	}


	function populateIndegreesAndUnprocessed(){
		iterate(graph, function(node, nodeId){
			unprocessed.push(nodeId);
			if(!node.hasOwnProperty('indegrees')){
				node.indegrees = 0
			}
			iterate(node.edges, function(e){
				if(!graph[e].hasOwnProperty('indegrees')){
					graph[e].indegrees = 1
				}
				else{
					graph[e].indegrees = graph[e].indegrees + 1;
				}
			});
		});
	}
	
	populateIndegreesAndUnprocessed();
	processList();
	return processed;
}

if(module){
	module.exports.topologicalSort = topologicalSort;
}
