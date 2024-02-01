class Graph {
    constructor() {
      this.vertices = new Map();
    }
  
    addVertex(vertex) {
      if (!this.vertices.has(vertex)) {
        this.vertices.set(vertex, []);
      }
    }
  
    addEdge(vertex1, vertex2) {
      this.addVertex(vertex1);
      this.addVertex(vertex2);
  
      this.vertices.get(vertex1).push(vertex2);
      this.vertices.get(vertex2).push(vertex1); // for undirected graph
    }
  
    bfs(startVertex, endVertex) {
      const visited = new Set();
      const queue = [[startVertex]];
  
      while (queue.length > 0) {
        const path = queue.shift();
        const currentVertex = path[path.length - 1];
  
        if (visited.has(currentVertex)) {
          continue;
        }
  
        visited.add(currentVertex);
  
        const neighbors = this.vertices.get(currentVertex);
  
        for (const neighbor of neighbors) {
          const newPath = [...path, neighbor];
  
          if (neighbor === endVertex) {
            return newPath;
          } else {
            queue.push(newPath);
          }
        }
      }
  
      return null; // If no path is found
    }
  }
  

  
  function findShortestPath() {

    startVertex = document.getElementById('initial').value;
    endVertex = document.getElementById('final').value;

    console.log(startVertex)

  const graph = new Graph();
  graph.addEdge('1', '38');
  graph.addEdge('2', '38');
  graph.addEdge('3', '39');
  graph.addEdge('4', '39');
  graph.addEdge('5', '40');
  graph.addEdge('6', '40');
  graph.addEdge('7', '41');
  graph.addEdge('8', '41');
  graph.addEdge('9', '42');
  graph.addEdge('10', '42');
  graph.addEdge('11', '43');
  graph.addEdge('12', '43');
  graph.addEdge('13', '44');
  graph.addEdge('14', '44');
  graph.addEdge('15', '45');
  graph.addEdge('16', '45');
  graph.addEdge('17', '46');
  graph.addEdge('18', '46');

  graph.addEdge('19', '48');
  graph.addEdge('20', '48');
  graph.addEdge('21', '49');
  graph.addEdge('22', '49');
  graph.addEdge('23', '50');
  graph.addEdge('24', '50');
  graph.addEdge('25', '51');
  graph.addEdge('26', '51');
  graph.addEdge('27', '52');
  graph.addEdge('28', '52');
  graph.addEdge('29', '53');
  graph.addEdge('30', '53');
  graph.addEdge('31', '54');
  graph.addEdge('32', '54');
  graph.addEdge('33', '55');
  graph.addEdge('34', '55');
  graph.addEdge('35', '56');
  graph.addEdge('36', '56');

  graph.addEdge('37', '38');
  graph.addEdge('39', '38');
  graph.addEdge('40', '39');
  graph.addEdge('41', '40');
  graph.addEdge('42', '41');
  graph.addEdge('43', '42');
  graph.addEdge('44', '43');
  graph.addEdge('45', '44');
  graph.addEdge('46', '45');
  graph.addEdge('37', '0');

  graph.addEdge('47', '48');
  graph.addEdge('49', '48');
  graph.addEdge('50', '49');
  graph.addEdge('51', '50');
  graph.addEdge('52', '51');
  graph.addEdge('53', '52');
  graph.addEdge('54', '53');
  graph.addEdge('55', '54');
  graph.addEdge('56', '55');
  graph.addEdge('47', '0');

  const shortestPath = graph.bfs(startVertex, endVertex);


 
  
  if (shortestPath) {
    console.log(`Shortest path from ${startVertex} to ${endVertex}: ${shortestPath.join(' -> ')}`);
  } else {
    console.log(`No path found from ${startVertex} to ${endVertex}`);
  }

  }

  
  
  