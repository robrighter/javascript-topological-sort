function topologicalSort(graph){
	var processed = [];
	var queue = [];
	populateIndegrees();
	processList();
	return processed;
	
	function processList(){
		for(var i=0; i<graph.length; i++){
			if(graph[i].indegrees === 0){
				queue.push(i);
				graph[i].indegrees = -1; //dont look at this one anymore
			}
		}
		
		processStartingPoint(queue.shift());
		if(processed.length<graph.length){
			processList();
		}
	}


	function processStartingPoint(i){
		if(i == undefined){
			throw "You have a cycle!!";
		}
		graph[i].edges.forEach(function(e){
			graph[e].indegrees--;
		});
		processed.push(i);
	}


	function populateIndegrees(){
		for(var i=0; i<graph.length; i++){
			if(!graph[i].hasOwnProperty('indegrees')){
				graph[i].indegrees = 0
			}
			graph[i].edges.forEach(function(e){
				if(!graph[e].hasOwnProperty('indegrees')){
					graph[e].indegrees = 1
				}
				else{
					graph[e].indegrees = graph[e].indegrees + 1;
				} 
			});
		}
	}
}


if(module){
	module.exports.topologicalSort = topologicalSort;
}
