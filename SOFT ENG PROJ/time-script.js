let alarms = [];
let currentAlarmId = null;
let alarmSound = null;
let checkInterval;

// Initialize the app
function init() {
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);
  startAlarmCheck();
  
  // Create initial alarm for demo
  addAlarm(9, 30, 'AM');
  addAlarm(12, 45, 'PM');
}

// Update current time display
function updateCurrentTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  document.getElementById('currentTime').textContent = timeString;
}

// Add new alarm
function addAlarm(hour = 12, minute = 0, ampm = 'AM') {
  const id = Date.now();
  const alarm = {
    id: id,
    hour: hour,
    minute: minute,
    ampm: ampm,
    active: false
  };
  
  alarms.push(alarm);
  renderAlarms();
}

// Remove alarm
function removeAlarm(id) {
  alarms = alarms.filter(alarm => alarm.id !== id);
  renderAlarms();
}

// Toggle alarm active state
function toggleAlarm(id) {
  const alarm = alarms.find(a => a.id === id);
  if (alarm) {
    alarm.active = !alarm.active;
    renderAlarms();
  }
}

// Update alarm time
function updateAlarmTime(id, field, value) {
  const alarm = alarms.find(a => a.id === id);
  if (alarm) {
    alarm[field] = value;
  }
}

// Render all alarms
function renderAlarms() {
  const grid = document.getElementById('timeGrid');
  grid.innerHTML = '';

  alarms.forEach((alarm, index) => {
    const alarmElement = document.createElement('div');
    alarmElement.className = `time-item ${alarm.active ? 'active' : ''}`;
    alarmElement.style.animationDelay = `${(index + 1) * 0.1}s`;
    
    alarmElement.innerHTML = `
      <div class="time-display">
        <div class="control-icon check-icon ${alarm.active ? 'active' : ''}" 
             onclick="toggleAlarm(${alarm.id})">
          <i class="fas fa-${alarm.active ? 'bell' : 'bell-slash'}"></i>
        </div>
        
        <div class="time-control">
          <input type="text" class="time-input" value="${alarm.hour.toString().padStart(2, '0')}" 
                 maxlength="2" data-field="hour" data-id="${alarm.id}">
          <div class="time-separator">:</div>
          <input type="text" class="time-input" value="${alarm.minute.toString().padStart(2, '0')}" 
                 maxlength="2" data-field="minute" data-id="${alarm.id}">
          <button class="ampm-selector ${alarm.ampm === 'PM' ? 'active' : ''}" 
                  onclick="toggleAMPM(this, ${alarm.id})">${alarm.ampm}</button>
        </div>
        
        <div class="control-icon close-icon" onclick="removeAlarm(${alarm.id})">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <div class="alarm-label ${alarm.active ? 'active' : ''}">
        ${alarm.active ? 'Active' : 'Inactive'}
      </div>
    `;
    
    grid.appendChild(alarmElement);
  });

  // Add event listeners for time inputs
  addInputEventListeners();
}

// Add event listeners for time inputs
function addInputEventListeners() {
  document.querySelectorAll('.time-input').forEach(input => {
    input.addEventListener('input', function() {
      const id = parseInt(this.dataset.id);
      const field = this.dataset.field;
      let value = this.value.replace(/[^0-9]/g, '');
      
      if (field === 'minute') {
        if (parseInt(value) > 59) value = '59';
      } else if (field === 'hour') {
        if (parseInt(value) > 12) value = '12';
        if (parseInt(value) < 1 && value.length === 2) value = '01';
      }
      
      value = value.padStart(2, '0');
      this.value = value;
      updateAlarmTime(id, field, parseInt(value));
    });

    input.addEventListener('focus', function() {
      this.select();
    });
  });
}

// Toggle AM/PM
function toggleAMPM(button, id) {
  const currentText = button.textContent;
  const newText = currentText === 'AM' ? 'PM' : 'AM';
  button.textContent = newText;
  button.classList.toggle('active');
  updateAlarmTime(id, 'ampm', newText);
}

// Check for alarms
function startAlarmCheck() {
  checkInterval = setInterval(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();

    alarms.forEach(alarm => {
      if (alarm.active && currentSecond === 0) {
        let alarmHour = alarm.hour;
        if (alarm.ampm === 'PM' && alarmHour !== 12) {
          alarmHour += 12;
        } else if (alarm.ampm === 'AM' && alarmHour === 12) {
          alarmHour = 0;
        }

        if (currentHour === alarmHour && currentMinute === alarm.minute) {
          triggerAlarm(alarm);
        }
      }
    });
  }, 1000);
}

// Trigger alarm
function triggerAlarm(alarm) {
  currentAlarmId = alarm.id;
  const modal = document.getElementById('alarmModal');
  const timeDisplay = document.getElementById('alarmTime');
  
  timeDisplay.textContent = `${alarm.hour.toString().padStart(2, '0')}:${alarm.minute.toString().padStart(2, '0')} ${alarm.ampm}`;
  modal.classList.add('active');
  
  // Add ringing animation to the alarm item
  const alarmElement = document.querySelector(`[data-id="${alarm.id}"]`);
  if (alarmElement) {
    alarmElement.closest('.time-item').classList.add('ringing');
  }
  
  // Play alarm sound (browser notification sound)
  playAlarmSound();
}

// Play alarm sound
function playAlarmSound() {
  // Create audio context for alarm sound
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
    
    // Repeat the sound
    alarmSound = setInterval(() => {
      const newOscillator = audioContext.createOscillator();
      const newGainNode = audioContext.createGain();
      
      newOscillator.connect(newGainNode);
      newGainNode.connect(audioContext.destination);
      
      newOscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      newOscillator.type = 'sine';
      
      newGainNode.gain.setValueAtTime(0, audioContext.currentTime);
      newGainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
      newGainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
      
      newOscillator.start(audioContext.currentTime);
      newOscillator.stop(audioContext.currentTime + 0.5);
    }, 1000);
    
  } catch (e) {
    console.log('Audio not supported');
  }
}

// Stop alarm
function stopAlarm() {
  if (alarmSound) {
    clearInterval(alarmSound);
    alarmSound = null;
  }
  
  if (currentAlarmId) {
    // Deactivate the alarm
    const alarm = alarms.find(a => a.id === currentAlarmId);
    if (alarm) {
      alarm.active = false;
    }
    
    // Remove ringing animation
    document.querySelectorAll('.time-item').forEach(item => {
      item.classList.remove('ringing');
    });
    
    currentAlarmId = null;
  }
  
  document.getElementById('alarmModal').classList.remove('active');
  renderAlarms();
}

// Snooze alarm (5 minutes)
function snoozeAlarm() {
  if (currentAlarmId) {
    const alarm = alarms.find(a => a.id === currentAlarmId);
    if (alarm) {
      // Add 5 minutes to alarm time
      alarm.minute += 5;
      if (alarm.minute >= 60) {
        alarm.minute -= 60;
        alarm.hour += 1;
        if (alarm.hour > 12) {
          alarm.hour = 1;
          alarm.ampm = alarm.ampm === 'AM' ? 'PM' : 'AM';
        }
      }
    }
  }
  
  stopAlarm();
}

// Initialize the app when page loads
window.addEventListener('load', init);