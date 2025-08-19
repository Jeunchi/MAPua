// Cookie utility functions
class CookieManager {
  static setCookie(name, value, days = 30) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
  }
  
  static getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  }
  
  static deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
}

// Shared Bookmark Storage System using Cookies
class SharedBookmarkStorage {
  static getBookmarks() {
    const saved = CookieManager.getCookie('mapua_bookmarks');
    if (saved) {
      try {
        const bookmarks = JSON.parse(saved);
        console.log('Loaded bookmarks from cookie:', bookmarks);
        return bookmarks;
      } catch (e) {
        console.error('Error parsing bookmarks from cookie:', e);
        return [];
      }
    }
    return [];
  }
  
  static saveBookmarks(bookmarks) {
    console.log('Saving bookmarks to cookie:', bookmarks);
    CookieManager.setCookie('mapua_bookmarks', JSON.stringify(bookmarks), 365); // Save for 1 year
    
    // Also update in-memory storage for immediate updates
    window.sharedBookmarks = bookmarks;
    
    // Dispatch custom event to notify other pages
    window.dispatchEvent(new CustomEvent('bookmarksUpdated', { 
      detail: bookmarks 
    }));
  }
  
  static addBookmark(bookmark) {
    const bookmarks = this.getBookmarks();
    // Check for duplicates
    const exists = bookmarks.find(b => b.from === bookmark.from && b.to === bookmark.to);
    if (exists) {
      return false; // Already exists
    }
    bookmarks.push(bookmark);
    this.saveBookmarks(bookmarks);
    return true;
  }
  
  static deleteBookmark(id) {
    const bookmarks = this.getBookmarks().filter(bookmark => bookmark.id !== id);
    this.saveBookmarks(bookmarks);
  }
  
  static clearAllBookmarks() {
    this.saveBookmarks([]);
  }
}

// Global variables
let bookmarkedRoutes = [];
let currentPath = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Main page DOM loaded');
    loadBookmarks();
    initializeCanvas();
    checkForSelectedRoute();
    
    // Set up form submission
    const bookmarkForm = document.getElementById('bookmarkForm');
    if (bookmarkForm) {
        bookmarkForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveBookmark();
        });
    }
});

// Check if user navigated from bookmark page with a selected route
function checkForSelectedRoute() {
    const selectedRoute = sessionStorage.getItem('selectedRoute');
    if (selectedRoute) {
        try {
            const route = JSON.parse(selectedRoute);
            console.log('Found selected route from bookmark page:', route);
            
            const initialSelect = document.getElementById('initial');
            const finalSelect = document.getElementById('final');
            
            if (initialSelect && finalSelect) {
                initialSelect.value = route.from;
                finalSelect.value = route.to;
                
                // Clear the session storage
                sessionStorage.removeItem('selectedRoute');
                
                // Auto-calculate the route
                setTimeout(() => {
                    findShortestPath();
                    // Scroll to route section
                    const routeSection = document.getElementById('route-section');
                    if (routeSection) {
                        routeSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        } catch (e) {
            console.error('Error parsing selected route:', e);
            sessionStorage.removeItem('selectedRoute');
        }
    }
}

// Pathfinding functions
function findShortestPath() {
    const initialSelect = document.getElementById('initial');
    const finalSelect = document.getElementById('final');
    
    if (!initialSelect || !finalSelect) {
        showNotification('Route selection elements not found.', 'error');
        return;
    }
    
    const initial = initialSelect.value;
    const final = finalSelect.value;
    
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
    const canvas = document.getElementById('canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        initializeCanvas();
    }
    
    currentPath = null;
    
    // Reset form selections
    const initialSelect = document.getElementById('initial');
    const finalSelect = document.getElementById('final');
    if (initialSelect) initialSelect.value = '';
    if (finalSelect) finalSelect.value = '';
    
    showNotification('Path cleared', 'info');
}

function initializeCanvas() {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
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
    const canvas = document.getElementById('canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // This would be replaced with actual coordinates from your map data
    const locations = {
        'canteen': {x: 730, y: 250},
        'library': {x: 490, y: 210},
        'lobby area': {x: 200, y: 175},
        'elevator': {x: 150, y: 175},
        'clinic': {x: 310, y: 420}
    };
    
    const startPoint = locations[from] || {x: 100, y: 100};
    const endPoint = locations[to] || {x: 800, y: 500};
    
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
    const routeFromInput = document.getElementById('routeFrom');
    const routeToInput = document.getElementById('routeTo');
    const routeNameInput = document.getElementById('routeName');
    const modal = document.getElementById('bookmarkModal');
    
    if (routeFromInput) routeFromInput.value = currentPath.from;
    if (routeToInput) routeToInput.value = currentPath.to;
    if (routeNameInput) routeNameInput.value = currentPath.from + ' to ' + currentPath.to;
    
    // Show modal
    if (modal) {
        modal.style.display = 'block';
        if (routeNameInput) routeNameInput.focus();
    }
}

function closeBookmarkModal() {
    const modal = document.getElementById('bookmarkModal');
    const form = document.getElementById('bookmarkForm');
    
    if (modal) modal.style.display = 'none';
    if (form) form.reset();
}

function saveBookmark() {
    const routeNameInput = document.getElementById('routeName');
    if (!routeNameInput) return;
    
    const routeName = routeNameInput.value.trim();
    
    if (!routeName) {
        showNotification('Please enter a route name.', 'warning');
        return;
    }
    
    if (!currentPath) {
        showNotification('No current route to bookmark.', 'error');
        return;
    }
    
    const bookmark = {
        id: Date.now(),
        name: routeName,
        from: currentPath.from,
        to: currentPath.to,
        timestamp: new Date().toISOString(),
        createdAt: new Date().toISOString()
    };
    
    // Use shared storage system
    const success = SharedBookmarkStorage.addBookmark(bookmark);
    
    if (success) {
        bookmarkedRoutes = SharedBookmarkStorage.getBookmarks();
        displayBookmarks();
        closeBookmarkModal();
        showNotification('Route bookmarked successfully!', 'success');
    } else {
        showNotification('This route is already bookmarked!', 'warning');
    }
}

function displayBookmarks() {
    const bookmarkList = document.getElementById('bookmarkList');
    if (!bookmarkList) return;
    
    console.log('Displaying bookmarks, count:', bookmarkedRoutes.length);
    
    if (bookmarkedRoutes.length === 0) {
        bookmarkList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bookmark"></i>
                <p>No bookmarked routes yet. Plan a route and bookmark it!</p>
            </div>
        `;
        return;
    }
    
    let html = '';
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
                    <button class="btn btn-primary btn-small" onclick="loadBookmarkedRoute(${bookmark.id})">
                        <i class="fas fa-route"></i> Go
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="deleteBookmark(${bookmark.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    bookmarkList.innerHTML = html;
}

function loadBookmarkedRoute(bookmarkId) {
    const bookmark = bookmarkedRoutes.find(b => b.id === bookmarkId);
    if (!bookmark) {
        showNotification('Bookmark not found', 'error');
        return;
    }
    
    const initialSelect = document.getElementById('initial');
    const finalSelect = document.getElementById('final');
    
    if (initialSelect && finalSelect) {
        initialSelect.value = bookmark.from;
        finalSelect.value = bookmark.to;
        
        // Scroll to route section
        const routeSection = document.getElementById('route-section');
        if (routeSection) {
            routeSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        showNotification('Route loaded: ' + bookmark.name, 'info');
    }
}

function deleteBookmark(bookmarkId) {
    const bookmark = bookmarkedRoutes.find(b => b.id === bookmarkId);
    if (!bookmark) return;
    
    if (confirm('Are you sure you want to delete "' + bookmark.name + '"?')) {
        SharedBookmarkStorage.deleteBookmark(bookmarkId);
        bookmarkedRoutes = SharedBookmarkStorage.getBookmarks();
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
        SharedBookmarkStorage.clearAllBookmarks();
        bookmarkedRoutes = [];
        displayBookmarks();
        showNotification('All bookmarks cleared', 'info');
    }
}

function loadBookmarks() {
    // Load from shared storage
    bookmarkedRoutes = SharedBookmarkStorage.getBookmarks();
    console.log('Loaded bookmarks on main page:', bookmarkedRoutes);
    displayBookmarks();
    
    // Listen for bookmark updates
    window.addEventListener('bookmarksUpdated', (event) => {
        console.log('Main page received bookmark update:', event.detail);
        bookmarkedRoutes = event.detail;
        displayBookmarks();
    });
}

// Navigate to bookmark page
function openBookmarkPage() {
    window.location.href = 'bookmark-page.html';
}

// Utility functions
function showCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleString();
    showNotification('Current time: ' + timeString, 'info');
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    console.log('Showing notification:', message, type);
    
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    const colors = {
        'success': '#4CAF50',
        'warning': '#FF9800',
        'error': '#F44336',
        'info': '#2196F3'
    };
    
    const notification = document.createElement('div');
    notification.className = 'notification';
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
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

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
    if (!canvas) return;
    
    const container = canvas.parentElement;
    if (!container) return;
    
    const maxWidth = container.clientWidth - 40; // Account for padding
    
    if (canvas.width > maxWidth) {
        const scale = maxWidth / canvas.width;
        canvas.style.width = maxWidth + 'px';
        canvas.style.height = (canvas.height * scale) + 'px';
    }
}

window.addEventListener('resize', resizeCanvas);

// Add CSS for animations if not already present
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}