// Bookmark management functions
class BookmarkManager {
  constructor() {
    this.bookmarks = this.loadBookmarks();
    this.renderBookmarks();
  }

  loadBookmarks() {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  }

  saveBookmarks() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  addBookmark(from, to) {
    const bookmark = {
      id: Date.now(),
      from: from,
      to: to,
      createdAt: new Date().toISOString()
    };
    this.bookmarks.push(bookmark);
    this.saveBookmarks();
    this.renderBookmarks();
  }

  deleteBookmark(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
    this.saveBookmarks();
    this.renderBookmarks();
  }

  renderBookmarks() {
    const grid = document.getElementById('bookmarksGrid');
    
    if (this.bookmarks.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-bookmark"></i>
          <p>No bookmarks yet. Click the + button to add your first bookmark!</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = this.bookmarks.map(bookmark => `
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
          <button class="btn btn-secondary" onclick="bookmarkManager.deleteBookmark(${bookmark.id})">
            <i class="fas fa-trash"></i>
            <span>Delete</span>
          </button>
        </div>
      </div>
    `).join('');
  }
}

// Initialize bookmark manager
const bookmarkManager = new BookmarkManager();

// Modal functions
function openAddModal() {
  document.getElementById('addBookmarkModal').style.display = 'block';
  document.getElementById('fromLocation').focus();
}

function closeAddModal() {
  document.getElementById('addBookmarkModal').style.display = 'none';
  document.getElementById('bookmarkForm').reset();
}

// Form submission
document.getElementById('bookmarkForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const from = document.getElementById('fromLocation').value.trim();
  const to = document.getElementById('toLocation').value.trim();
  
  if (from && to) {
    bookmarkManager.addBookmark(from, to);
    closeAddModal();
    
    // Show success message
    showNotification('Bookmark added successfully!', 'success');
  }
});

// Navigate function (placeholder for actual navigation)
function navigateBookmark(from, to) {
  // This would integrate with your actual navigation system
  alert(`Navigating from "${from}" to "${to}"`);
  // Example: window.open(`https://maps.google.com/maps?saddr=${encodeURIComponent(from)}&daddr=${encodeURIComponent(to)}`);
}

// Go back function
function goBack() {
  // This would navigate to your main menu or previous page
  if (window.history.length > 1) {
    window.history.back();
  } else {
    alert('No previous page to go back to');
  }
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
  const modal = document.getElementById('addBookmarkModal');
  if (e.target === modal) {
    closeAddModal();
  }
});