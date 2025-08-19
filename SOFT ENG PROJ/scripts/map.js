// Enhanced Map Integration with SVG Background
document.addEventListener("DOMContentLoaded", function() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  // Animation and path variables
  let animationId = null;
  let pathProgress = 0;
  let currentPath = null;
  let isAnimating = false;
  let routePoints = [];

  // Create the enhanced SVG background
  const svgBackground = `
    <svg viewBox="0 0 1445 719" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="campusBackground" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f8f9fa;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e9ecef;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#f1f3f4;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#dee2e6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ced4da;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="redAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#B30000;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8B0000;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feMorphology operator="dilate" radius="2"/>
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e9ecef" stroke-width="0.5" opacity="0.3"/>
        </pattern>
      </defs>
      
      <!-- Background -->
      <rect width="1445" height="719" fill="url(#campusBackground)"/>
      <rect width="1445" height="719" fill="url(#grid)"/>
      
      <!-- Main walkways -->
      <path d="M 150 56 L 1340 56" stroke="url(#pathGradient)" stroke-width="30" fill="none" opacity="0.8"/>
      <path d="M 150 669 L 1340 669" stroke="url(#pathGradient)" stroke-width="30" fill="none" opacity="0.8"/>
      <path d="M 150 56 L 150 669" stroke="url(#pathGradient)" stroke-width="25" fill="none" opacity="0.8"/>
      
      <!-- Buildings -->
      ${generateBuildingsSVG()}
      
      <!-- Special locations -->
      ${generateSpecialLocationsSVG()}
      
      <!-- Navigation points -->
      ${generateNavigationPointsSVG()}
      
      <!-- Campus branding -->
      <text x="722" y="30" text-anchor="middle" font-family="Inter, sans-serif" font-size="24" font-weight="800" fill="url(#redAccent)">MAPúa UNIVERSITY</text>
      <text x="722" y="700" text-anchor="middle" font-family="Inter, sans-serif" font-size="16" font-weight="600" fill="#6c757d">Navigation System</text>
    </svg>
  `;

  function generateBuildingsSVG() {
    let buildings = '';
    const topRooms = [
      {x: 254, y: 18, labels: ['R1', 'R2']},
      {x: 381, y: 18, labels: ['R3', 'R4']},
      {x: 525, y: 18, labels: ['R5', 'R6']},
      {x: 640, y: 18, labels: ['R7', 'R8']},
      {x: 775, y: 18, labels: ['R9', 'R10']},
      {x: 912, y: 18, labels: ['R11', 'R12']},
      {x: 1040, y: 18, labels: ['R13', 'R14']},
      {x: 1175, y: 18, labels: ['R15', 'R16']},
      {x: 1315, y: 18, labels: ['R17', 'R18']}
    ];
    
    topRooms.forEach(room => {
      buildings += `<rect x="${room.x}" y="${room.y}" width="50" height="77" fill="url(#buildingGradient)" stroke="#B30000" stroke-width="2" rx="8" filter="url(#shadow)"/>`;
      buildings += `<text x="${room.x + 25}" y="${room.y + 17}" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="#B30000">${room.labels[0]}</text>`;
      buildings += `<text x="${room.x + 25}" y="${room.y + 62}" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="#B30000">${room.labels[1]}</text>`;
    });
    
    // Bottom buildings
    const bottomBuildings = [254, 381, 525, 640, 775, 912, 1040, 1175, 1315];
    bottomBuildings.forEach((x, index) => {
      buildings += `<rect x="${x}" y="629" width="50" height="77" fill="url(#buildingGradient)" stroke="#B30000" stroke-width="2" rx="8" filter="url(#shadow)"/>`;
      if (index === 0) {
        buildings += `<text x="${x + 25}" y="680" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="#B30000">R19</text>`;
      }
    });
    
    return buildings;
  }

  function generateSpecialLocationsSVG() {
    return `
      <!-- Elevator -->
      <rect x="125" y="31" width="50" height="50" fill="url(#redAccent)" stroke="#8B0000" stroke-width="2" rx="12" filter="url(#glow)"/>
      <text x="150" y="48" text-anchor="middle" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="white">ELEV</text>
      <text x="150" y="58" text-anchor="middle" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="white">ATOR</text>
      
      <!-- Fire Exit Elevator -->
      <rect x="125" y="310" width="50" height="50" fill="#FF6B35" stroke="#E55039" stroke-width="2" rx="12" filter="url(#glow)"/>
      <text x="150" y="327" text-anchor="middle" font-family="Inter, sans-serif" font-size="7" font-weight="700" fill="white">FIRE</text>
      <text x="150" y="337" text-anchor="middle" font-family="Inter, sans-serif" font-size="7" font-weight="700" fill="white">EXIT</text>
      <text x="150" y="347" text-anchor="middle" font-family="Inter, sans-serif" font-size="7" font-weight="700" fill="white">ELEV</text>
      
      <!-- Canteen -->
      <rect x="125" y="644" width="50" height="50" fill="#4ECDC4" stroke="#26D0CE" stroke-width="2" rx="12" filter="url(#glow)"/>
      <text x="150" y="662" text-anchor="middle" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="white">CANT</text>
      <text x="150" y="672" text-anchor="middle" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="white">EEN</text>
      
      <!-- Clinic -->
      <rect x="254" y="644" width="50" height="50" fill="#FF6B6B" stroke="#EE5A52" stroke-width="2" rx="12" filter="url(#glow)"/>
      <text x="279" y="662" text-anchor="middle" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="white">CLIN</text>
      <text x="279" y="672" text-anchor="middle" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="white">IC</text>
      
      <!-- Central Plaza -->
      <ellipse cx="722" cy="362" rx="200" ry="120" fill="#e8f5e8" stroke="#4CAF50" stroke-width="3" opacity="0.7"/>
      <text x="722" y="370" text-anchor="middle" font-family="Inter, sans-serif" font-size="16" font-weight="600" fill="#2E7D32">CENTRAL PLAZA</text>
    `;
  }

  function generateNavigationPointsSVG() {
    let points = '';
    const navPoints = [
      [150, 56], [279, 56], [406, 56], [550, 56], [665, 56], [800, 56], [937, 56], [1065, 56], [1200, 56], [1340, 56],
      [150, 669], [279, 669], [406, 669], [550, 669], [665, 669], [800, 669], [937, 669], [1065, 669], [1200, 669], [1340, 669]
    ];
    
    navPoints.forEach(([x, y]) => {
      points += `<circle cx="${x}" cy="${y}" r="3" fill="#B30000" opacity="0.6"/>`;
    });
    
    return points;
  }

  // Convert SVG to image for canvas background
  function loadSVGBackground() {
    const blob = new Blob([svgBackground], {type: 'image/svg+xml'});
    const url = URL.createObjectURL(blob);
    const img = new Image();
    
    img.onload = function() {
      canvas.width = 1445;
      canvas.height = 719;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
    };
    
    img.src = url;
  }

  // Enhanced drawing functions for route visualization
  function drawGradientPath(path, progress, animated = true) {
    if (!path || path.length < 2) return;

    ctx.save();
    
    // Path styling
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    // Draw shadow path first
    ctx.globalAlpha = 0.2;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 12;
    ctx.setLineDash([]);
    drawPathSegments(path, 1);
    
    // Draw base path
    ctx.globalAlpha = 0.4;
    ctx.strokeStyle = "#B30000";
    ctx.lineWidth = 10;
    drawPathSegments(path, 1);
    
    // Draw animated path
    if (animated && progress > 0) {
      ctx.globalAlpha = 1;
      
      // Create gradient along the path
      const start = path[0];
      const end = path[path.length - 1];
      const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
      gradient.addColorStop(0, "#FF4444");
      gradient.addColorStop(0.5, "#B30000");
      gradient.addColorStop(1, "#8B0000");
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 8;
      drawPathSegments(path, progress);
      
      // Add flowing particles
      if (progress < 1) {
        drawFlowingParticles(path, progress);
      }
    }
    
    ctx.restore();
  }

  function drawPathSegments(path, progress) {
    const totalDistance = calculateTotalDistance(path);
    const currentDistance = totalDistance * progress;
    
    let accumulatedDistance = 0;
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    
    for (let i = 1; i < path.length; i++) {
      const segmentDistance = getDistance(path[i-1], path[i]);
      
      if (accumulatedDistance + segmentDistance <= currentDistance) {
        ctx.lineTo(path[i].x, path[i].y);
        accumulatedDistance += segmentDistance;
      } else if (accumulatedDistance < currentDistance) {
        const ratio = (currentDistance - accumulatedDistance) / segmentDistance;
        const partialX = path[i-1].x + (path[i].x - path[i-1].x) * ratio;
        const partialY = path[i-1].y + (path[i].y - path[i-1].y) * ratio;
        ctx.lineTo(partialX, partialY);
        break;
      } else {
        break;
      }
    }
    
    ctx.stroke();
  }

  function drawPulsatingMarker(x, y, color, label, time) {
    ctx.save();
    
    const pulseRadius = 15 + Math.sin(time * 0.003) * 3;
    const alpha = 0.8 + Math.sin(time * 0.005) * 0.2;
    
    // Outer glow
    ctx.globalAlpha = alpha * 0.3;
    const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, pulseRadius + 10);
    glowGradient.addColorStop(0, color + "80");
    glowGradient.addColorStop(1, "transparent");
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(x, y, pulseRadius + 10, 0, 2 * Math.PI);
    ctx.fill();
    
    // Main marker
    ctx.globalAlpha = alpha;
    const markerGradient = ctx.createRadialGradient(x, y, 0, x, y, pulseRadius);
    markerGradient.addColorStop(0, color);
    markerGradient.addColorStop(1, color + "CC");
    ctx.fillStyle = markerGradient;
    ctx.beginPath();
    ctx.arc(x, y, pulseRadius, 0, 2 * Math.PI);
    ctx.fill();
    
    // Inner highlight
    ctx.globalAlpha = 1;
    const highlightGradient = ctx.createRadialGradient(x, y, 0, x, y, pulseRadius * 0.4);
    highlightGradient.addColorStop(0, "#ffffff80");
    highlightGradient.addColorStop(1, "transparent");
    ctx.fillStyle = highlightGradient;
    ctx.beginPath();
    ctx.arc(x, y, pulseRadius * 0.4, 0, 2 * Math.PI);
    ctx.fill();
    
    // Label
    if (label) {
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 3;
      ctx.strokeText(label, x, y + pulseRadius + 15);
      ctx.fillText(label, x, y + pulseRadius + 15);
    }
    
    ctx.restore();
  }

  function drawFlowingParticles(path, progress) {
    const particleCount = 12;
    const time = Date.now();
    
    ctx.save();
    
    for (let i = 0; i < particleCount; i++) {
      const particleProgress = ((progress * 1.5 + i * 0.08) % 1);
      const position = getPositionOnPath(path, particleProgress);
      
      if (position && particleProgress < progress) {
        const size = 4 + Math.sin(time * 0.01 + i) * 1.5;
        const alpha = 0.9 - (i / particleCount) * 0.4;
        
        ctx.globalAlpha = alpha;
        
        const particleGradient = ctx.createRadialGradient(position.x, position.y, 0, position.x, position.y, size);
        particleGradient.addColorStop(0, "#FFFFFF");
        particleGradient.addColorStop(0.7, "#FFD700");
        particleGradient.addColorStop(1, "transparent");
        
        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(position.x, position.y, size, 0, 2 * Math.PI);
        ctx.fill();
        
        // Add sparkle effect
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(position.x - 0.5, position.y - 0.5, 1, 1);
      }
    }
    
    ctx.restore();
  }

  function getPositionOnPath(path, progress) {
    if (!path || path.length < 2) return null;
    
    const totalDistance = calculateTotalDistance(path);
    const targetDistance = totalDistance * progress;
    
    let accumulatedDistance = 0;
    
    for (let i = 0; i < path.length - 1; i++) {
      const segmentDistance = getDistance(path[i], path[i + 1]);
      
      if (accumulatedDistance + segmentDistance >= targetDistance) {
        const ratio = (targetDistance - accumulatedDistance) / segmentDistance;
        return {
          x: path[i].x + (path[i + 1].x - path[i].x) * ratio,
          y: path[i].y + (path[i + 1].y - path[i].y) * ratio
        };
      }
      
      accumulatedDistance += segmentDistance;
    }
    
    return path[path.length - 1];
  }

  function calculateTotalDistance(path) {
    let total = 0;
    for (let i = 0; i < path.length - 1; i++) {
      total += getDistance(path[i], path[i + 1]);
    }
    return total;
  }

  function getDistance(point1, point2) {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function smoothPath(path, tension = 0.4) {
    if (path.length < 3) return path;
    
    const smoothedPath = [];
    
    for (let i = 0; i < path.length; i++) {
      if (i === 0 || i === path.length - 1) {
        smoothedPath.push(path[i]);
      } else {
        const prev = path[i - 1];
        const current = path[i];
        const next = path[i + 1];
        
        // Add intermediate points for smoother curves
        const cp1x = current.x + tension * (prev.x - next.x) * 0.1;
        const cp1y = current.y + tension * (prev.y - next.y) * 0.1;
        
        smoothedPath.push({
          x: cp1x,
          y: cp1y,
          id: current.id,
          name: current.name
        });
      }
    }
    
    return smoothedPath;
  }

  // Animation loop
  function animateRoute() {
    if (!isAnimating || !currentPath) return;
    
    // Clear and redraw background
    loadSVGBackground();
    
    setTimeout(() => {
      // Draw the enhanced path
      drawGradientPath(currentPath, pathProgress, true);
      
      // Draw markers with pulsating effect
      const time = Date.now();
      const startPoint = currentPath[0];
      const endPoint = currentPath[currentPath.length - 1];
      
      // Start marker (green with "START" label)
      drawPulsatingMarker(startPoint.x, startPoint.y, "#4CAF50", "START", time);
      
      // End marker (blue with "END" label)
      drawPulsatingMarker(endPoint.x, endPoint.y, "#2196F3", "END", time + 1000);
      
      // Show progress indicator
      if (pathProgress < 1) {
        const currentPos = getPositionOnPath(currentPath, pathProgress);
        if (currentPos) {
          drawPulsatingMarker(currentPos.x, currentPos.y, "#FFD700", "", time + 500);
        }
      }
      
      // Update progress
      pathProgress += 0.006; // Slower animation for better effect
      
      if (pathProgress >= 1) {
        pathProgress = 1;
        // Continue animation for 3 seconds to show pulsating markers
        setTimeout(() => {
          isAnimating = false;
        }, 3000);
      }
      
      if (isAnimating) {
        animationId = requestAnimationFrame(animateRoute);
      }
    }, 50); // Small delay to ensure background is drawn
  }

  function startRouteAnimation(path) {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    
    currentPath = smoothPath(path);
    pathProgress = 0;
    isAnimating = true;
    animateRoute();
  }

  // Enhanced Graph class with Dijkstra's algorithm
  class EnhancedGraph {
    constructor() {
      this.vertices = new Map();
    }

    addVertex(id, x, y, name = null) {
      if (!this.vertices.has(id)) {
        this.vertices.set(id, { id, x, y, name, neighbors: [] });
      }
    }

    addEdge(vertex1Id, vertex2Id) {
      const vertex1 = this.vertices.get(vertex1Id);
      const vertex2 = this.vertices.get(vertex2Id);

      if (!vertex1 || !vertex2) {
        console.error("One or more vertices not found!");
        return;
      }

      const weight = getDistance(vertex1, vertex2);
      vertex1.neighbors.push({ vertex: vertex2, weight });
      vertex2.neighbors.push({ vertex: vertex1, weight });
    }

    dijkstra(startVertexId, endVertexId) {
      const distances = new Map();
      const previous = new Map();
      const unvisited = new Set();

      // Initialize distances
      for (const [id] of this.vertices) {
        distances.set(id, id === startVertexId ? 0 : Infinity);
        unvisited.add(id);
      }

      while (unvisited.size > 0) {
        // Find unvisited vertex with minimum distance
        let currentId = null;
        let minDistance = Infinity;

        for (const id of unvisited) {
          if (distances.get(id) < minDistance) {
            minDistance = distances.get(id);
            currentId = id;
          }
        }

        if (currentId === null || minDistance === Infinity) break;
        unvisited.delete(currentId);
        if (currentId === endVertexId) break;

        const currentVertex = this.vertices.get(currentId);
        for (const neighbor of currentVertex.neighbors) {
          const neighborId = neighbor.vertex.id;
          if (unvisited.has(neighborId)) {
            const altDistance = distances.get(currentId) + neighbor.weight;
            if (altDistance < distances.get(neighborId)) {
              distances.set(neighborId, altDistance);
              previous.set(neighborId, currentId);
            }
          }
        }
      }

      // Reconstruct path
      const path = [];
      let currentId = endVertexId;

      while (currentId !== undefined) {
        const vertex = this.vertices.get(currentId);
        path.unshift(vertex);
        currentId = previous.get(currentId);
      }

      return path.length > 1 && path[0].id === startVertexId ? path : null;
    }
  }

  // Location mapping
  const locationMapping = {
    'elevator': '37',
    'fire-exit-elevator': '0',
    'canteen': '47',
    'Student lounge 1': '1',
    'hallway': '38',
    'clinic': '48',
    'orientation room': '2',
    'counsellor': '3',
    'multi-purpose': '4',
    'tech serve': '5',
    'student council': '6',
    'SOCIP': '7',
    'Registrar': '8',
    'admission': '9',
    'treasury': '10',
    'student lounge 2': '49',
    'fire exit 2': '56',
    'lobby area': '11',
    'bookstore': '50',
    '1': '1', '2': '2', '3': '3', '4': '4', '5': '5',
    '6': '6', '7': '7', '8': '8', '9': '9', '10': '10',
    '11': '11', '12': '12', '13': '13', '14': '14', '15': '15',
    '16': '16', '17': '17', '18': '18', '19': '19'
  };

  const locationNames = {
    'elevator': 'Elevator',
    'fire-exit-elevator': 'Fire Exit Elevator',
    'canteen': 'Canteen',
    'Student lounge 1': 'Student Lounge 1',
    'hallway': 'Hallway',
    'clinic': 'Clinic',
    'orientation room': 'Orientation Room',
    'counsellor': 'Counsellor',
    'multi-purpose': 'Multi-purpose',
    'tech serve': 'Tech Serve',
    'student council': 'Student Council',
    'SOCIP': 'SOCIP',
    'Registrar': 'Registrar',
    'admission': 'Admission',
    'treasury': 'Treasury',
    'student lounge 2': 'Student Lounge 2',
    'fire exit 2': 'Fire Exit 2',
    'lobby area': 'Lobby Area',
    'bookstore': 'Bookstore'
  };

  // Override global functions
  window.findShortestPath = function() {
    const startLocation = document.getElementById('initial')?.value;
    const endLocation = document.getElementById('final')?.value;

    if (!startLocation || !endLocation) {
      if (window.showNotification) {
        window.showNotification('Please select both starting point and destination.', 'warning');
      }
      return;
    }

    if (startLocation === endLocation) {
      if (window.showNotification) {
        window.showNotification('Starting point and destination cannot be the same.', 'warning');
      }
      return;
    }

    const startVertex = locationMapping[startLocation];
    const endVertex = locationMapping[endLocation];

    if (!startVertex || !endVertex) {
      if (window.showNotification) {
        window.showNotification('Invalid location selection.', 'error');
      }
      return;
    }

    // Create the graph
    const graph = new EnhancedGraph();
    
    // Add all vertices
    const vertices = [
      ['0', 150, 335, 'Fire Exit Elevator'], ['1', 279, 43, 'Room 1'], ['2', 279, 70, 'Room 2'],
      ['3', 406, 43, 'Room 3'], ['4', 406, 70, 'Room 4'], ['5', 550, 43, 'Room 5'],
      ['6', 550, 70, 'Room 6'], ['7', 665, 43, 'Room 7'], ['8', 665, 70, 'Room 8'],
      ['9', 800, 43, 'Room 9'], ['10', 800, 70, 'Room 10'], ['11', 937, 43, 'Room 11'],
      ['12', 937, 70, 'Room 12'], ['13', 1065, 43, 'Room 13'], ['14', 1065, 70, 'Room 14'],
      ['15', 1200, 43, 'Room 15'], ['16', 1200, 70, 'Room 16'], ['17', 1340, 43, 'Room 17'],
      ['18', 1340, 70, 'Room 18'], ['19', 279, 654, 'Room 19'], ['20', 279, 682, 'Junction 20'],
      ['21', 406, 654, 'Junction 21'], ['22', 406, 682, 'Junction 22'], ['23', 550, 654, 'Junction 23'],
      ['24', 550, 682, 'Junction 24'], ['25', 665, 654, 'Junction 25'], ['26', 665, 682, 'Junction 26'],
      ['27', 800, 654, 'Junction 27'], ['28', 800, 682, 'Junction 28'], ['29', 937, 654, 'Junction 29'],
      ['30', 937, 682, 'Junction 30'], ['31', 1065, 654, 'Junction 31'], ['32', 1065, 682, 'Junction 32'],
      ['33', 1200, 654, 'Junction 33'], ['34', 1200, 682, 'Junction 34'], ['35', 1340, 654, 'Junction 35'],
      ['36', 1340, 682, 'Junction 36'], ['37', 150, 56, 'Elevator'], ['38', 279, 56, 'Hallway'],
      ['39', 406, 56, 'Junction 39'], ['40', 550, 56, 'Junction 40'], ['41', 665, 56, 'Junction 41'],
      ['42', 800, 56, 'Junction 42'], ['43', 937, 56, 'Junction 43'], ['44', 1065, 56, 'Junction 44'],
      ['45', 1200, 56, 'Junction 45'], ['46', 1340, 56, 'Junction 46'], ['47', 150, 669, 'Canteen'],
      ['48', 279, 669, 'Clinic'], ['49', 406, 669, 'Student Lounge 2'], ['50', 550, 669, 'Bookstore'],
      ['51', 665, 669, 'Junction 51'], ['52', 800, 669, 'Junction 52'], ['53', 937, 669, 'Junction 53'],
      ['54', 1065, 669, 'Junction 54'], ['55', 1200, 669, 'Junction 55'], ['56', 1340, 669, 'Fire Exit 2']
    ];

    vertices.forEach(([id, x, y, name]) => graph.addVertex(id, x, y, name));

    // Add all edges
    const edges = [
      ['1', '38'], ['2', '38'], ['3', '39'], ['4', '39'], ['5', '40'], ['6', '40'],
      ['7', '41'], ['8', '41'], ['9', '42'], ['10', '42'], ['11', '43'], ['12', '43'],
      ['13', '44'], ['14', '44'], ['15', '45'], ['16', '45'], ['17', '46'], ['18', '46'],
      ['19', '48'], ['20', '48'], ['21', '49'], ['22', '49'], ['23', '50'], ['24', '50'],
      ['25', '51'], ['26', '51'], ['27', '52'], ['28', '52'], ['29', '53'], ['30', '53'],
      ['31', '54'], ['32', '54'], ['33', '55'], ['34', '55'], ['35', '56'], ['36', '56'],
      ['37', '38'], ['39', '38'], ['40', '39'], ['41', '40'], ['42', '41'], ['43', '42'],
      ['44', '43'], ['45', '44'], ['46', '45'], ['37', '0'], ['47', '48'], ['49', '48'],
      ['50', '49'], ['51', '50'], ['52', '51'], ['53', '52'], ['54', '53'], ['55', '54'],
      ['56', '55'], ['47', '0']
    ];

    edges.forEach(([v1, v2]) => graph.addEdge(v1, v2));

    // Find optimal path
    const shortestPath = graph.dijkstra(startVertex, endVertex);

    if (shortestPath) {
      const startName = locationNames[startLocation] || startLocation;
      const endName = locationNames[endLocation] || endLocation;
      
      console.log(`Optimal route from ${startName} to ${endName}:`, 
                  shortestPath.map(v => v.name || v.id).join(' → '));

      // Store current path for bookmarking
      if (window.currentPath !== undefined) {
        window.currentPath = { from: startLocation, to: endLocation };
      }

      // Start enhanced animation
      startRouteAnimation(shortestPath);

      if (window.showNotification) {
        window.showNotification(`Enhanced route calculated from ${startName} to ${endName}!`, 'success');
      }
    } else {
      console.log(`No path found from ${startLocation} to ${endLocation}`);
      if (window.showNotification) {
        window.showNotification('No route available between selected locations.', 'error');
      }
    }
  };

  window.clearPath = function() {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    
    isAnimating = false;
    currentPath = null;
    pathProgress = 0;
    routePoints = [];

    // Clear canvas and redraw background
    loadSVGBackground();

    // Reset form selections
    const initialSelect = document.getElementById('initial');
    const finalSelect = document.getElementById('final');
    if (initialSelect) initialSelect.value = '';
    if (finalSelect) finalSelect.value = '';

    // Clear current path for bookmarking
    if (window.currentPath !== undefined) {
      window.currentPath = null;
    }

    if (window.showNotification) {
      window.showNotification('Path cleared', 'info');
    }
  };

  // Initialize
  loadSVGBackground();
});