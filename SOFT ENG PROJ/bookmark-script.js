// Simple and reliable cookie management
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expires.toUTCString() + ";path=/";
    console.log('Cookie set:', name, '=', value);
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
            const value = decodeURIComponent(c.substring(nameEQ.length, c.length));
            console.log('Cookie retrieved:', name, '=', value);
            return value;
        }
    }
    console.log('Cookie not found:', name);
    return null;
}

function deleteCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    console.log('Cookie deleted:', name);
}

// Global bookmarks array
let bookmarks = [];

// Load bookmarks from cookie
function loadBookmarks() {
    console.log('Loading bookmarks...');
    console.log('All cookies:', document.cookie);
    
    const saved = getCookie('mapua_bookmarks');
    if (saved && saved !== 'null' && saved !== '') {
        try {
            bookmarks = JSON.parse(saved);
            console.log('Bookmarks loaded successfully:', bookmarks);
        } catch (e) {
            console.error('Error parsing bookmarks:', e);
            bookmarks = [];
        }
    } else {
        console.log('No saved bookmarks found');
        bookmarks = [];
    }
    renderBookmarks();
}

// Save bookmarks to cookie
function saveBookmarks() {
    console.log('Saving bookmarks:', bookmarks);
    const jsonString = JSON.stringify(bookmarks);
    setCookie('mapua_bookmarks', jsonString, 365);
    
    // Verify save
    const verification = getCookie('mapua_bookmarks');
    console.log('Save verification:', verification);
}

// Add a new bookmark
function addBookmark(from, to) {
    console.log('Adding bookmark:', from, 'to', to);
    
    // Check for duplicates
    const exists = bookmarks.find(b => b.from === from && b.to === to);
    if (exists) {
        showNotification('This route is already bookmarked!', 'warning');
        return false;
    }
    
    const bookmark = {
        id: Date.now(),
        from: from,
        to: to,
        name: from + ' to ' + to,
        timestamp: new Date().toISOString()
    };
    
    bookmarks.push(bookmark);
    saveBookmarks();
    renderBookmarks();
    showNotification('Bookmark added successfully!', 'success');
    return true;
}

// Delete a bookmark
function deleteBookmark(id) {
    console.log('Deleting bookmark with id:', id);
    const originalLength = bookmarks.length;
    bookmarks = bookmarks.filter(bookmark => bookmark.id !== parseInt(id));
    
    if (bookmarks.length < originalLength) {
        saveBookmarks();
        renderBookmarks();
        showNotification('Bookmark deleted!', 'info');
    } else {
        console.log('Bookmark not found with id:', id);
    }
}

// Render bookmarks in the UI
function renderBookmarks() {
    const grid = document.getElementById('bookmarksGrid');
    
    if (!grid) {
        console.error('Bookmarks grid element not found!');
        return;
    }
    
    console.log('Rendering bookmarks, count:', bookmarks.length);
    
    if (bookmarks.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bookmark"></i>
                <p>No bookmarks yet. Click the + button to add your first bookmark!</p>
            </div>
        `;
        return;
    }

    let html = '';
    bookmarks.forEach(bookmark => {
        html += `
            <div class="bookmark-item">
                <div class="location-group">
                    <div class="location-icon from-icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="location-select">
                        <span class="location-text">${bookmark.from}</span>
                        <i class="fas fa-chevron-down dropdown-icon"></i>
                    </div>
                </div>
                
                <div class="location-group">
                    <div class="location-icon to-icon">
                        <i class="fas fa-flag-checkered"></i>
                    </div>
                    <div class="location-select">
                        <span class="location-text">${bookmark.to}</span>
                        <i class="fas fa-chevron-down dropdown-icon"></i>
                    </div>
                </div>
                
                <div class="button-group">
                    <button class="btn btn-primary" onclick="navigateBookmark('${bookmark.from}', '${bookmark.to}')">
                        <i class="fas fa-route"></i>
                        <span>Go</span>
                    </button>
                    <button class="btn btn-secondary" onclick="deleteBookmark(${bookmark.id})">
                        <i class="fas fa-trash"></i>
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        `;
    });
    
    grid.innerHTML = html;
}

// Modal functions
function openAddModal() {
    const modal = document.getElementById('addBookmarkModal');
    if (modal) {
        modal.style.display = 'block';
        const fromLocation = document.getElementById('fromLocation');
        if (fromLocation) {
            fromLocation.focus();
        }
    }
}

function closeAddModal() {
    const modal = document.getElementById('addBookmarkModal');
    const form = document.getElementById('bookmarkForm');
    if (modal) {
        modal.style.display = 'none';
    }
    if (form) {
        form.reset();
    }
}

// Navigate function - redirect to main page with selected route
function navigateBookmark(from, to) {
    console.log('Navigating with bookmark:', from, 'to', to);
    // Store the selected route for the main page to pick up
    sessionStorage.setItem('selectedRoute', JSON.stringify({ from, to }));
    
    // Navigate to main page
    window.location.href = 'main-page.html';
}

// Go back function
function goBack() {
    window.location.href = 'main-page.html';
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
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        z-index: 10000;
        font-family: inherit;
        font-weight: 500;
        max-width: 300px;
        word-wrap: break-word;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Initialize when page loads
window.addEventListener('load', function() {
    console.log('Page loaded, initializing bookmarks...');
    loadBookmarks();
});

// Handle form submission
window.addEventListener('load', function() {
    const form = document.getElementById('bookmarkForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            
            const fromElement = document.getElementById('fromLocation');
            const toElement = document.getElementById('toLocation');
            
            if (!fromElement || !toElement) {
                console.error('Form elements not found');
                showNotification('Form elements not found', 'error');
                return;
            }
            
            const from = fromElement.value.trim();
            const to = toElement.value.trim();
            
            console.log('Form values - From:', from, 'To:', to);
            
            if (!from || !to) {
                showNotification('Please select both starting point and destination!', 'warning');
                return;
            }
            
            if (from === to) {
                showNotification('Starting point and destination cannot be the same!', 'warning');
                return;
            }
            
            const success = addBookmark(from, to);
            if (success) {
                closeAddModal();
            }
        });
    } else {
        console.error('Bookmark form not found!');
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('addBookmarkModal');
    if (e.target === modal) {
        closeAddModal();
    }
});

// Test functions for debugging
function testCookies() {
    console.log('Testing cookies...');
    setCookie('test_cookie', 'test_value', 1);
    const retrieved = getCookie('test_cookie');
    console.log('Cookie test result:', retrieved);
    deleteCookie('test_cookie');
}

function clearAllBookmarks() {
    if (confirm('Are you sure you want to clear all bookmarks?')) {
        bookmarks = [];
        saveBookmarks();
        renderBookmarks();
        showNotification('All bookmarks cleared!', 'info');
    }
}

// Add a test button for debugging (remove in production)
window.addEventListener('load', function() {
    // Uncomment this for debugging
    /*
    const testButton = document.createElement('button');
    testButton.textContent = 'Test Cookies';
    testButton.onclick = testCookies;
    testButton.style.cssText = 'position: fixed; top: 10px; left: 10px; z-index: 9999;';
    document.body.appendChild(testButton);
    */
});