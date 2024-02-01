document.addEventListener("DOMContentLoaded", function() {
  // Get the canvas element
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  // Create an image object
  var backgroundImage = new Image();

  // Set the source of the image
  backgroundImage.src = "Assets/map.png"; // Replace with the actual path to your image

  // Once the image is loaded, draw it on the canvas
  backgroundImage.onload = function() {
      // Set the canvas size to match the image size
      canvas.width = backgroundImage.width;
      canvas.height = backgroundImage.height;

      // Draw the image on the canvas
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  };
});

class Graph {
  constructor() {
      this.vertices = new Map();
  }

  addVertex(id, x, y) {
      if (!this.vertices.has(id)) {
          this.vertices.set(id, { id, x, y, neighbors: [] });
      }
  }

  addEdge(vertex1Id, vertex2Id) {
      const vertex1 = this.vertices.get(vertex1Id);
      const vertex2 = this.vertices.get(vertex2Id);

      if (!vertex1 || !vertex2) {
          console.error("One or more vertices not found!");
          return;
      }

      vertex1.neighbors.push(vertex2);
      vertex2.neighbors.push(vertex1); // for undirected graph
  }

  bfs(startVertexId, endVertexId) {
      const visited = new Set();
      const queue = [[this.vertices.get(startVertexId)]];

      while (queue.length > 0) {
          const path = queue.shift();
          const currentVertex = path[path.length - 1];

          if (visited.has(currentVertex.id)) {
              continue;
          }

          visited.add(currentVertex.id);

          const neighbors = currentVertex.neighbors;

          for (const neighbor of neighbors) {
              const newPath = [...path, neighbor];

              if (neighbor.id === endVertexId) {
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
    var backgroundImage = new Image();
    backgroundImage.src = "Assets/map.png"; 

    //console.log(startVertex)
    const graph = new Graph();
  graph.addVertex('0', 150, 335)
  graph.addVertex('1', 279, 43)
  graph.addVertex('2', 279, 70)
  graph.addVertex('3', 406, 43)
  graph.addVertex('4', 406, 70)
  graph.addVertex('5', 550, 43)
  graph.addVertex('6', 550, 70)
  graph.addVertex('7', 665, 43)
  graph.addVertex('8', 665, 70)
  graph.addVertex('9', 800, 43)
  graph.addVertex('10', 800, 70)
  graph.addVertex('11', 937, 43)
  graph.addVertex('12', 937, 70)
  graph.addVertex('13', 1065, 43)
  graph.addVertex('14', 1065, 70)
  graph.addVertex('15', 1200, 43)
  graph.addVertex('16', 1200, 70)
  graph.addVertex('17', 1340, 43)
  graph.addVertex('18', 1340, 70)
  graph.addVertex('19',279 ,654 )
  graph.addVertex('20', 279, 682)
  graph.addVertex('21', 406, 654)
  graph.addVertex('22',406 , 682)
  graph.addVertex('23',550 ,654 )
  graph.addVertex('24', 550, 682)
  graph.addVertex('25',665 , 654)
  graph.addVertex('26',665 , 682)
  graph.addVertex('27',800 , 654)
  graph.addVertex('28',800 , 682)
  graph.addVertex('29',937 , 654)
  graph.addVertex('30', 937, 682)
  graph.addVertex('31',1065 , 654)
  graph.addVertex('32', 1065, 682)
  graph.addVertex('33', 1200, 654)
  graph.addVertex('34',1200 ,682 )
  graph.addVertex('35',1340 , 654)
  graph.addVertex('36',1340 , 682)
  graph.addVertex('37', 150, 56)
  graph.addVertex('38', 279, 56)
  graph.addVertex('39', 406, 56)
  graph.addVertex('40', 550, 56)
  graph.addVertex('41', 665, 56)
  graph.addVertex('42', 800, 56)
  graph.addVertex('43',937 , 56)
  graph.addVertex('44', 1065, 56)
  graph.addVertex('45', 1200, 56)
  graph.addVertex('46', 1340, 56)
  graph.addVertex('47', 150,669 )
  graph.addVertex('48', 279, 669)
  graph.addVertex('49', 406, 669)
  graph.addVertex('50', 550, 669)
  graph.addVertex('51', 665, 669)
  graph.addVertex('52', 800,669 )
  graph.addVertex('53', 937,669 )
  graph.addVertex('54', 1065, 669)
  graph.addVertex('55',1200 , 669)
  graph.addVertex('56', 1340, 669)

  

  
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
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  // Clear the canvas
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  
  if (shortestPath) {
    console.log(`Shortest path from ${startVertex} to ${endVertex}: ${shortestPath.join(' -> ')}`);

    // Draw the image on the canvas
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Set the line color
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;

    // Draw lines along the shortest path
    for (let i = 0; i < shortestPath.length - 1; i++) {
        const currentVertex = shortestPath[i];
        const nextVertex = shortestPath[i + 1];

        // Draw a line between currentVertex and nextVertex
        ctx.beginPath();
        ctx.moveTo(currentVertex.x, currentVertex.y);
        ctx.lineTo(nextVertex.x, nextVertex.y);
        ctx.stroke();
    }
} else {
    console.log(`No path found from ${startVertex} to ${endVertex}`);
}

  }

  
  
  