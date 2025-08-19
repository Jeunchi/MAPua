// Global variables
let bookmarkedRoutes = [];
let currentPath = null;

// Initialize on page load
window.addEventListener('load', function() {
    loadBookmarks();
    initializeCanvas();
});

// Pathfinding functions
function findShortestPath() {
    var initial = document.getElementById('initial').value;
    var final = document.getElementById('final').value;
    
    if (!initial || !final) {
        showNotification('Please select both starting point and destination.', 'warning');
        return;
    }
    
    if (initial === final) {
        showNotification('Starting point and destination cannot be the same.', 'warning');
        return;
    }
    
    // Store current path for bookmarking
    currentPath = { from: initial, to: final };
    
    // This would call your actual pathfinding algorithm
    console.log('Finding path from', initial, 'to', final);
    
    // Placeholder for actual pathfinding implementation
    showNotification('Route calculated from ' + initial + ' to ' + final, 'success');
    
    // You would replace this section with your actual map.js functionality
    drawPath(initial, final);
}

function clearPath() {
    // Clear the canvas and reset selections
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initializeCanvas();
    
    currentPath = null;
    
    // Reset form selections
    document.getElementById('initial').value = '';
    document.getElementById('final').value = '';
    
    showNotification('Path cleared', 'info');
}

function initializeCanvas() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    
    // Placeholder for map initialization
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw a simple campus layout placeholder
    ctx.strokeStyle = '#B30000';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    
    // Draw building outlines
    ctx.strokeRect(100, 100, 200, 150);
    ctx.strokeRect(400, 150, 180, 120);
    ctx.strokeRect(650, 200, 160, 100);
    ctx.strokeRect(200, 350, 220, 140);
    ctx.strokeRect(500, 400, 200, 130);
    
    // Labels
    ctx.fillStyle = '#495057';
    ctx.font = '16px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Main Building', 200, 180);
    ctx.fillText('Library', 490, 215);
    ctx.fillText('Canteen', 730, 255);
    ctx.fillText('Labs', 310, 425);
    ctx.fillText('Admin', 600, 470);
    
    // Draw paths
    ctx.strokeStyle = '#6c757d';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    
    ctx.beginPath();
    ctx.moveTo(300, 175);
    ctx.lineTo(400, 210);
    ctx.moveTo(580, 210);
    ctx.lineTo(650, 250);
    ctx.moveTo(200, 250);
    ctx.lineTo(200, 350);
    ctx.moveTo(420, 350);
    ctx.lineTo(500, 465);
    ctx.stroke();
}

function drawPath(from, to) {
    // Placeholder function to draw path between locations
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    
    // This would be replaced with actual coordinates from your map data
    var locations = {
        'canteen': {x: 730, y: 250},
        'library': {x: 490, y: 210},
        'lobby area': {x: 200, y: 175},
        'elevator': {x: 150, y: 175},
        'clinic': {x: 310, y: 420}
    };
    
    var startPoint = locations[from] || {x: 100, y: 100};
    var endPoint = locations[to] || {x: 800, y: 500};
    
    // Draw path
    ctx.strokeStyle = '#B30000';
    ctx.lineWidth = 4;
    ctx.setLineDash([]);
    
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.stroke();
    
    // Draw markers
    ctx.fillStyle = '#4CAF50';
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 8, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillStyle = '#2196F3';
    ctx.beginPath();
    ctx.arc(endPoint.x, endPoint.y, 8, 0, 2 * Math.PI);
    ctx.fill();
}

// Bookmark functions
function bookmarkCurrentRoute() {
    if (!currentPath) {
        showNotification('Please calculate a route first before bookmarking.', 'warning');
        return;
    }
    
    // Pre-fill the modal form
    document.getElementById('routeFrom').value = currentPath.from;
    document.getElementById('routeTo').value = currentPath.to;
    document.getElementById('routeName').value = currentPath.from + ' to ' + currentPath.to;
    
    // Show modal
    document.getElementById('bookmarkModal').style.display = 'block';
    document.getElementById('routeName').focus();
}

function closeBookmarkModal() {
    document.getElementById('bookmarkModal').style.display = 'none';
    document.getElementById('bookmarkForm').reset();
}

function saveBookmark() {
    var routeName = document.getElementById('routeName').value.trim();
    
    if (!routeName) {
        showNotification('Please enter a route name.', 'warning');
        return;
    }
    
    var bookmark = {
        id: Date.now(),
        name: routeName,
        from: currentPath.from,
        to: currentPath.to,
        timestamp: new Date().toISOString()
    };
    
    bookmarkedRoutes.push(bookmark);
    saveBookmarksToStorage();
    displayBookmarks();
    closeBookmarkModal();
    showNotification('Route bookmarked successfully!', 'success');
}

function displayBookmarks() {
    var bookmarkList = document.getElementById('bookmarkList');
    
    if (bookmarkedRoutes.length === 0) {
        bookmarkList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bookmark"></i>
                <p>No bookmarked routes yet. Plan a route and bookmark it!</p>
            </div>
        `;
        return;
    }
    
    var html = '';
    bookmarkedRoutes.forEach(function(bookmark, index) {
        html += `
            <div class="bookmark-item">
                <div class="bookmark-info">
                    <div class="bookmark-name">${bookmark.name}</div>
                    <div class="bookmark-route">
                        <i class="fas fa-map-marker-alt" style="color: #4CAF50;"></i> 
                        ${bookmark.from} 
                        <i class="fas fa-arrow-right" style="margin: 0 0.5rem;"></i> 
                        <i class="fas fa-flag-checkered" style="color: #2196F3;"></i> 
                        ${bookmark.to}
                    </div>
                </div>
                <div class="bookmark-actions">
                    <button class="btn btn-primary btn-small" onclick="loadBookmarkedRoute(${index})">
                        <i class="fas fa-route"></i> Go
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="deleteBookmark(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    bookmarkList.innerHTML = html;
}

function loadBookmarkedRoute(index) {
    var bookmark = bookmarkedRoutes[index];
    document.getElementById('initial').value = bookmark.from;
    document.getElementById('final').value = bookmark.to;
    
    // Scroll to route section
    document.getElementById('route-section').scrollIntoView({ behavior: 'smooth' });
    
    showNotification('Route loaded: ' + bookmark.name, 'info');
}

function deleteBookmark(index) {
    var bookmark = bookmarkedRoutes[index];
    if (confirm('Are you sure you want to delete "' + bookmark.name + '"?')) {
        bookmarkedRoutes.splice(index, 1);
        saveBookmarksToStorage();
        displayBookmarks();
        showNotification('Bookmark deleted', 'info');
    }
}

function clearAllBookmarks() {
    if (bookmarkedRoutes.length === 0) {
        showNotification('No bookmarks to clear', 'info');
        return;
    }
    
    if (confirm('Are you sure you want to delete all bookmarks? This action cannot be undone.')) {
        bookmarkedRoutes = [];
        saveBookmarksToStorage();
        displayBookmarks();
        showNotification('All bookmarks cleared', 'info');
    }
}

function saveBookmarksToStorage() {
    // Since localStorage isn't available, we'll keep them in memory for the session
    console.log('Bookmarks saved:', bookmarkedRoutes);
}

function loadBookmarks() {
    // Placeholder for loading bookmarks from storage
    console.log('Loading bookmarks...');
    displayBookmarks();
}

// Utility functions
function showCurrentTime() {
    var now = new Date();
    var timeString = now.toLocaleString();
    showNotification('Current time: ' + timeString, 'info');
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Notification system
function showNotification(message, type = 'info') {
    const colors = {
        'success': '#4CAF50',
        'warning': '#FF9800',
        'error': '#F44336',
        'info': '#2196F3'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        backdrop-filter: blur(10px);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Form submission
document.getElementById('bookmarkForm').addEventListener('submit', function(e) {
    e.preventDefault();
    saveBookmark();
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('bookmarkModal');
    if (e.target === modal) {
        closeBookmarkModal();
    }
});

// Handle canvas responsiveness
function resizeCanvas() {
    const canvas = document.getElementById('canvas');
    const container = canvas.parentElement;
    const maxWidth = container.clientWidth - 40; // Account for padding
    
    if (canvas.width > maxWidth) {
        const scale = maxWidth / canvas.width;
        canvas.style.width = maxWidth + 'px';
        canvas.style.height = (canvas.height * scale) + 'px';
    }
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', resizeCanvas);