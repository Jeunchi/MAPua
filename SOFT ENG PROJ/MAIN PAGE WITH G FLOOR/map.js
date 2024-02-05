document.addEventListener("DOMContentLoaded", function() {
  // Get the canvas element
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  // Create an image object
  var backgroundImage = new Image();

  // Set the source of the image
  backgroundImage.src = "floor1.jpg"; // Replace with the actual path to your image

  // Once the image is loaded, draw it on the canvas
    backgroundImage.onload = function () {
        // Set the canvas size to match the desired image size
        canvas.width = 1073;
        canvas.height = 596;

        // Draw the image on the canvas with the specified size
        ctx.drawImage(backgroundImage, 0, 0, 1073, 596);
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
    backgroundImage.src = "floor1.jpg"; 

    //console.log(startVertex)
    const graph = new Graph();
  graph.addVertex('elevator', 455, 365) //elevator
  graph.addVertex('fire-exit-elevator', 410, 305) //fire-exit-elevator
  graph.addVertex('canteen', 230, 290) //canteen
  graph.addVertex('Student lounge 1', 470, 195) //Student lounge 1
  graph.addVertex('hallway', 590, 275) //hallway
  graph.addVertex('clinic', 680, 245) //clinic
  graph.addVertex('orientation room', 785, 260) //orientation room
  graph.addVertex('counsellor', 920, 275) //counsellor
  graph.addVertex('multi-purpose', 945, 280) //multi-purpose
  graph.addVertex('tech serve', 990, 290) //tech serve
  graph.addVertex('student council', 770, 310) //student council
  graph.addVertex('SOCIP', 820, 310) //SOCIP
  graph.addVertex('Registrar', 790, 365) //Registrar
  graph.addVertex('admission', 840, 410) //admission
  graph.addVertex('treasury', 840, 470) //treasury
  graph.addVertex('student lounge 2', 700, 360) // student lounge 2
  graph.addVertex('waiting area', 785, 440) // waiting area
  graph.addVertex('fire exit 2', 640, 200) //fire exit 2
  graph.addVertex('lobby area', 640, 440) //lobby area
  graph.addVertex('bookstore',370 ,515 ) //bookstore
  graph.addVertex('1', 455, 435) //1
  graph.addVertex('2', 455, 305) //2
  graph.addVertex('3', 455, 275) //3
  graph.addVertex('4', 350 ,275) //4
  graph.addVertex('5', 350, 195) //5
  graph.addVertex('6',700, 275) //6
  graph.addVertex('7',785, 275) //7
  graph.addVertex('8',845 , 285) //8
  graph.addVertex('9', 920, 285) //9
  graph.addVertex('10', 945, 300) //10
  graph.addVertex('11',990, 300) //11
  graph.addVertex('12', 820, 275) //12
  graph.addVertex('13', 845, 440) //13
  graph.addVertex('14', 640, 550 ) //14
  graph.addVertex('15', 455, 550 ) //15
  graph.addVertex('16',370 , 550 )//16
  graph.addVertex('17',845 , 365 )//17
  graph.addVertex('18',700, 440)//18
  graph.addVertex('19',640, 435)//19

  

  
  graph.addEdge('elevator', '1'); //elevator to lobby
  graph.addEdge('elevator', '2'); //elevator to stairs
  graph.addEdge('elevator', '3'); //elevator to lobby
  graph.addEdge('fire-exit-elevator', '2'); //fire-exit edge
  graph.addEdge('canteen', '4'); //canteen to near canteen exit
  graph.addEdge('Student lounge 1', '5');  //student lounge to canteen entrancce
  graph.addEdge('Student lounge 1', '3'); //student lounge to elevator
  graph.addEdge('hallway', '3'); //hallway to elevator
  graph.addEdge('hallway', '6');  //hallway to clinic
  graph.addEdge('clinic', '6'); //clinic edge
  graph.addEdge('orientation room', '7'); //orientation room edge 
  graph.addEdge('counsellor', '9'); //counsellor edge
  graph.addEdge('multi-purpose', '10'); //multipurpose edge
  graph.addEdge('tech serve', '11'); //techserve edge
  graph.addEdge('student council', '7'); //council edge
  graph.addEdge('SOCIP', '13'); //SOCIP edge
  graph.addEdge('Registrar', '17'); //registrar edge
  graph.addEdge('admission', 'treasury');
  graph.addEdge('admission', '17');
  graph.addEdge('treasury', 'admission'); //treasury to admission
  graph.addEdge('student lounge 2', '6'); //lounge to hallway
  graph.addEdge('student lounge 2', '18'); //lounge to waiting
  graph.addEdge('waiting area', '18'); //waiting area edge
  graph.addEdge('fire exit 2', '19'); //fire exit edge
  graph.addEdge('lobby area', '14'); //entrance
  graph.addEdge('lobby area', '1'); //lobby to elevator
  graph.addEdge('bookstore', '16'); //bookstore edge

  graph.addEdge('15', '16');
  graph.addEdge('', '');
  graph.addEdge('', '');
  graph.addEdge('', '');
  graph.addEdge('', '');
  graph.addEdge('', '');
  graph.addEdge('', '');
  graph.addEdge('', '');
  graph.addEdge('', '');
  graph.addEdge('', '');
  graph.addEdge('', '');
  graph.addEdge('', '');
  graph.addEdge('', '');

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

  
  
  