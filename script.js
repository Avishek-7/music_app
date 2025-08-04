/**
 * Modern Music Player Application
 * Features: Audio playback, playlist management, volume control, responsive design
 * Technologies: HTML5 Audio API, CSS3, Vanilla JavaScript
 */

class MusicPlayer {
    constructor() {
        // Audio and playlist management
        this.audio = document.getElementById('audioPlayer');
        this.playlist = [];
        this.currentSongIndex = 0;
        this.isPlaying = false;
        this.isShuffled = false;
        this.isRepeating = false;
        
        // DOM elements
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.shuffleBtn = document.getElementById('shuffleBtn');
        this.repeatBtn = document.getElementById('repeatBtn');
        this.progressSlider = document.getElementById('progressSlider');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.songTitle = document.getElementById('songTitle');
        this.artistName = document.getElementById('artistName');
        this.albumName = document.getElementById('albumName');
        this.albumArt = document.getElementById('albumArt');
        this.currentTime = document.getElementById('currentTime');
        this.totalTime = document.getElementById('totalTime');
        this.progress = document.getElementById('progress');
        this.playlistElement = document.getElementById('playlist');
        this.addSongBtn = document.getElementById('addSongBtn');
        this.clearPlaylistBtn = document.getElementById('clearPlaylistBtn');
        this.uploadModal = document.getElementById('uploadModal');
        this.audioFiles = document.getElementById('audioFiles');

        // Initialize the player
        this.init();
    }

    /**
     * Initialize the music player with event listeners and default settings
     */
    init() {
        this.setupEventListeners();
        this.loadDefaultPlaylist();
        this.updatePlaylistDisplay();
        
        // Set initial volume
        this.audio.volume = 0.5;
        this.volumeSlider.value = 50;
        
        console.log('Music Player initialized successfully!');
    }

    /**
     * Set up all event listeners for player controls and interactions
     */
    setupEventListeners() {
        // Audio events
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.handleSongEnd());
        this.audio.addEventListener('error', (e) => this.handleAudioError(e));

        // Control buttons
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.prevBtn.addEventListener('click', () => this.previousSong());
        this.nextBtn.addEventListener('click', () => this.nextSong());
        this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
        this.repeatBtn.addEventListener('click', () => this.toggleRepeat());

        // Progress and volume controls
        this.progressSlider.addEventListener('input', () => this.seek());
        this.volumeSlider.addEventListener('input', () => this.adjustVolume());
        this.volumeSlider.addEventListener('change', () => this.adjustVolume());

        // Playlist management
        this.addSongBtn.addEventListener('click', () => this.openUploadModal());
        this.clearPlaylistBtn.addEventListener('click', () => this.clearPlaylist());
        this.audioFiles.addEventListener('change', (e) => this.handleFileUpload(e));

        // Modal controls
        this.setupModalControls();

        // Keyboard shortcuts
        this.setupKeyboardShortcuts();

        // Drag and drop functionality
        this.setupDragAndDrop();
    }

    /**
     * Set up modal controls for file upload
     */
    setupModalControls() {
        const closeBtn = document.querySelector('.close');
        closeBtn.addEventListener('click', () => this.closeUploadModal());
        
        window.addEventListener('click', (e) => {
            if (e.target === this.uploadModal) {
                this.closeUploadModal();
            }
        });
    }

    /**
     * Set up keyboard shortcuts for player control
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Prevent shortcuts when typing in input fields
            if (e.target.tagName === 'INPUT') return;

            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    this.togglePlayPause();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousSong();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSong();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.adjustVolumeByKey(5);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.adjustVolumeByKey(-5);
                    break;
                case 'KeyS':
                    e.preventDefault();
                    this.toggleShuffle();
                    break;
                case 'KeyR':
                    e.preventDefault();
                    this.toggleRepeat();
                    break;
            }
        });
    }

    /**
     * Set up drag and drop functionality for adding songs
     */
    setupDragAndDrop() {
        const uploadArea = document.querySelector('.upload-area');
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, this.preventDefaults, false);
            document.body.addEventListener(eventName, this.preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.add('highlight');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.remove('highlight');
            }, false);
        });

        uploadArea.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            this.handleFiles(files);
        }, false);
    }

    /**
     * Prevent default drag behaviors
     */
    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    /**
     * Load default playlist with sample songs (using placeholder audio)
     */
    loadDefaultPlaylist() {
        const defaultSongs = [
            {
                title: "Echoes of Tomorrow",
                artist: "Digital Dreams",
                album: "Future Sounds",
                duration: "3:45",
                albumArt: "default-album.svg",
                src: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBi2H0/LPeSUFJXnI8N2QQAoUXrTp66pVFApGn+DyvmwhBi2H0/LPeSUFJXnI8N2QQAoUXrTp66pVFApGn+DyvmwhBi2H0/LPeSUFJXnI8N2QQAoUXrTp66pVFApGn+DyvmwhBi2H0/LPeQ=="
            },
            {
                title: "Neon Nights",
                artist: "Synthwave Collective",
                album: "Retro Future",
                duration: "4:12",
                albumArt: "default-album.svg",
                src: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBi2H0/LPeSUFJXnI8N2QQAoUXrTp66pVFApGn+DyvmwhBi2H0/LPeSUFJXnI8N2QQAoUXrTp66pVFApGn+DyvmwhBi2H0/LPeSUFJXnI8N2QQAoUXrTp66pVFApGn+DyvmwhBi2H0/LPeQ=="
            },
            {
                title: "Ocean Waves",
                artist: "Ambient Sounds",
                album: "Nature Collection",
                duration: "5:20",
                albumArt: "default-album.svg",
                src: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBi2H0/LPeSUFJXnI8N2QQAoUXrTp66pVFApGn+DyvmwhBi2H0/LPeSUFJXnI8N2QQAoUXrTp66pVFApGn+DyvmwhBi2H0/LPeSUFJXnI8N2QQAoUXrTp66pVFApGn+DyvmwhBi2H0/LPeQ=="
            }
        ];

        this.playlist = defaultSongs;
    }

    /**
     * Toggle play/pause functionality
     */
    togglePlayPause() {
        if (this.playlist.length === 0) {
            this.showNotification('Please add songs to the playlist first!', 'warning');
            return;
        }

        if (this.isPlaying) {
            this.pauseSong();
        } else {
            this.playSong();
        }
    }

    /**
     * Play the current song
     */
    playSong() {
        if (this.playlist.length === 0) return;

        const currentSong = this.playlist[this.currentSongIndex];
        if (this.audio.src !== currentSong.src) {
            this.loadSong(currentSong);
        }

        this.audio.play().then(() => {
            this.isPlaying = true;
            this.updatePlayButton();
            this.updateSongInfo();
            this.updateActivePlaylistItem();
            this.startAlbumRotation();
            this.showNotification(`Now playing: ${currentSong.title}`, 'info');
        }).catch((error) => {
            console.error('Error playing audio:', error);
            this.showNotification('Unable to play this song', 'error');
        });
    }

    /**
     * Pause the current song
     */
    pauseSong() {
        this.audio.pause();
        this.isPlaying = false;
        this.updatePlayButton();
        this.stopAlbumRotation();
    }

    /**
     * Load a song into the audio element
     */
    loadSong(song) {
        this.audio.src = song.src;
        this.audio.load();
    }

    /**
     * Move to the previous song
     */
    previousSong() {
        if (this.playlist.length === 0) return;

        if (this.isShuffled) {
            this.currentSongIndex = Math.floor(Math.random() * this.playlist.length);
        } else {
            this.currentSongIndex = (this.currentSongIndex - 1 + this.playlist.length) % this.playlist.length;
        }

        if (this.isPlaying) {
            this.playSong();
        } else {
            this.loadSong(this.playlist[this.currentSongIndex]);
            this.updateSongInfo();
            this.updateActivePlaylistItem();
        }
    }

    /**
     * Move to the next song
     */
    nextSong() {
        if (this.playlist.length === 0) return;

        if (this.isShuffled) {
            this.currentSongIndex = Math.floor(Math.random() * this.playlist.length);
        } else {
            this.currentSongIndex = (this.currentSongIndex + 1) % this.playlist.length;
        }

        if (this.isPlaying) {
            this.playSong();
        } else {
            this.loadSong(this.playlist[this.currentSongIndex]);
            this.updateSongInfo();
            this.updateActivePlaylistItem();
        }
    }

    /**
     * Handle song end event
     */
    handleSongEnd() {
        if (this.isRepeating) {
            this.audio.currentTime = 0;
            this.playSong();
        } else {
            this.nextSong();
        }
    }

    /**
     * Toggle shuffle mode
     */
    toggleShuffle() {
        this.isShuffled = !this.isShuffled;
        this.shuffleBtn.classList.toggle('active', this.isShuffled);
        
        const message = this.isShuffled ? 'Shuffle enabled' : 'Shuffle disabled';
        this.showNotification(message, 'info');
    }

    /**
     * Toggle repeat mode
     */
    toggleRepeat() {
        this.isRepeating = !this.isRepeating;
        this.repeatBtn.classList.toggle('active', this.isRepeating);
        
        const message = this.isRepeating ? 'Repeat enabled' : 'Repeat disabled';
        this.showNotification(message, 'info');
    }

    /**
     * Seek to a specific position in the song
     */
    seek() {
        const seekTime = (this.progressSlider.value / 100) * this.audio.duration;
        this.audio.currentTime = seekTime;
    }

    /**
     * Adjust volume
     */
    adjustVolume() {
        this.audio.volume = this.volumeSlider.value / 100;
    }

    /**
     * Adjust volume using keyboard
     */
    adjustVolumeByKey(change) {
        const newVolume = Math.max(0, Math.min(100, parseInt(this.volumeSlider.value) + change));
        this.audio.volume = newVolume / 100;
        this.volumeSlider.value = newVolume;
    }

    /**
     * Sync the volume slider with the audio element
     */
    syncVolumeSlider() {
        this.volumeSlider.value = Math.round(this.audio.volume * 100);
        // Keep slider in sync if volume is changed programmatically
        this.audio.addEventListener('volumechange', () => this.syncVolumeSlider());
    }

    /**
     * Update play/pause button
     */
    updatePlayButton() {
        const icon = this.playPauseBtn.querySelector('i');
        icon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }

    /**
     * Update song information display
     */
    updateSongInfo() {
        if (this.playlist.length === 0) {
            this.songTitle.textContent = 'Select a song to play';
            this.artistName.textContent = 'Unknown Artist';
            this.albumName.textContent = 'Unknown Album';
            this.albumArt.src = 'default-album.svg';
            return;
        }

        const currentSong = this.playlist[this.currentSongIndex];
        this.songTitle.textContent = currentSong.title;
        this.artistName.textContent = currentSong.artist;
        this.albumName.textContent = currentSong.album;
        
        // Set album art (use local default if not available)
        this.albumArt.src = currentSong.albumArt || 'default-album.svg';
    }

    /**
     * Update progress bar and time display
     */
    updateProgress() {
        if (this.audio.duration) {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            this.progressSlider.value = progress;
            this.progress.style.width = progress + '%';

            this.currentTime.textContent = this.formatTime(this.audio.currentTime);
        }
    }

    /**
     * Update duration display when metadata is loaded
     */
    updateDuration() {
        this.totalTime.textContent = this.formatTime(this.audio.duration);
    }

    /**
     * Format time in MM:SS format
     */
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    /**
     * Handle file upload
     */
    handleFileUpload(event) {
        const files = event.target.files;
        this.handleFiles(files);
    }

    /**
     * Handle multiple files (from upload or drag & drop)
     */
    handleFiles(files) {
        const audioFiles = Array.from(files).filter(file => 
            file.type.startsWith('audio/')
        );

        if (audioFiles.length === 0) {
            this.showNotification('Please select valid audio files!', 'error');
            return;
        }

        audioFiles.forEach(file => {
            const song = {
                title: this.extractSongTitle(file.name),
                artist: 'Unknown Artist',
                album: 'Unknown Album',
                src: URL.createObjectURL(file),
                file: file,
                duration: '0:00'
            };

            this.playlist.push(song);
            
            // Get duration asynchronously
            this.getSongDuration(song);
        });

        this.updatePlaylistDisplay();
        this.closeUploadModal();
        
        const message = `Added ${audioFiles.length} song${audioFiles.length > 1 ? 's' : ''} to playlist`;
        this.showNotification(message, 'success');

        // Clear file input
        this.audioFiles.value = '';
    }

    /**
     * Extract song title from filename
     */
    extractSongTitle(filename) {
        return filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
    }

    /**
     * Get song duration asynchronously
     */
    getSongDuration(song) {
        const tempAudio = new Audio();
        tempAudio.src = song.src;
        
        tempAudio.addEventListener('loadedmetadata', () => {
            song.duration = this.formatTime(tempAudio.duration);
            this.updatePlaylistDisplay();
        });
    }

    /**
     * Update playlist display
     */
    updatePlaylistDisplay() {
        this.playlistElement.innerHTML = '';

        if (this.playlist.length === 0) {
            this.showEmptyPlaylist();
            return;
        }

        this.playlist.forEach((song, index) => {
            const listItem = this.createPlaylistItem(song, index);
            this.playlistElement.appendChild(listItem);
        });

        this.updateActivePlaylistItem();
    }

    /**
     * Show empty playlist message
     */
    showEmptyPlaylist() {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-playlist';
        emptyMessage.innerHTML = `
            <i class="fas fa-music"></i>
            <p>Your playlist is empty</p>
            <small>Add some songs to get started!</small>
        `;
        this.playlistElement.appendChild(emptyMessage);
    }

    /**
     * Create playlist item element
     */
    createPlaylistItem(song, index) {
        const listItem = document.createElement('li');
        listItem.className = 'playlist-item';
        listItem.innerHTML = `
            <div class="playlist-item-info">
                <div class="playlist-item-details">
                    <h4>${song.title}</h4>
                    <p>${song.artist} • ${song.album} • ${song.duration}</p>
                </div>
                <div class="playlist-item-actions">
                    <button class="remove-btn" data-index="${index}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;

        // Add click listener to play song
        listItem.addEventListener('click', (e) => {
            if (!e.target.closest('.remove-btn')) {
                this.playPlaylistItem(index);
            }
        });

        // Add remove button listener
        const removeBtn = listItem.querySelector('.remove-btn');
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeSongFromPlaylist(index);
        });

        return listItem;
    }

    /**
     * Play specific playlist item
     */
    playPlaylistItem(index) {
        this.currentSongIndex = index;
        this.playSong();
    }

    /**
     * Remove song from playlist
     */
    removeSongFromPlaylist(index) {
        // Revoke object URL to free memory
        if (this.playlist[index].src.startsWith('blob:')) {
            URL.revokeObjectURL(this.playlist[index].src);
        }

        this.playlist.splice(index, 1);

        // Adjust current song index if necessary
        if (index < this.currentSongIndex) {
            this.currentSongIndex--;
        } else if (index === this.currentSongIndex && this.currentSongIndex >= this.playlist.length) {
            this.currentSongIndex = 0;
        }

        this.updatePlaylistDisplay();
        
        if (this.playlist.length === 0) {
            this.pauseSong();
            this.updateSongInfo();
        } else if (index === this.currentSongIndex) {
            this.loadSong(this.playlist[this.currentSongIndex]);
            this.updateSongInfo();
        }

        this.showNotification('Song removed from playlist', 'info');
    }

    /**
     * Clear entire playlist
     */
    clearPlaylist() {
        if (this.playlist.length === 0) {
            this.showNotification('Playlist is already empty!', 'warning');
            return;
        }

        // Confirm before clearing
        if (confirm('Are you sure you want to clear the entire playlist?')) {
            // Revoke all object URLs
            this.playlist.forEach(song => {
                if (song.src.startsWith('blob:')) {
                    URL.revokeObjectURL(song.src);
                }
            });

            this.playlist = [];
            this.currentSongIndex = 0;
            this.pauseSong();
            this.updatePlaylistDisplay();
            this.updateSongInfo();
            
            this.showNotification('Playlist cleared', 'info');
        }
    }

    /**
     * Update active playlist item highlighting
     */
    updateActivePlaylistItem() {
        const items = document.querySelectorAll('.playlist-item');
        items.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentSongIndex);
        });
    }

    /**
     * Start album art rotation animation
     */
    startAlbumRotation() {
        this.albumArt.classList.add('playing');
    }

    /**
     * Stop album art rotation animation
     */
    stopAlbumRotation() {
        this.albumArt.classList.remove('playing');
    }

    /**
     * Open upload modal
     */
    openUploadModal() {
        this.uploadModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close upload modal
     */
    closeUploadModal() {
        this.uploadModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    /**
     * Handle audio errors
     */
    handleAudioError(event) {
        console.error('Audio error:', event);
        this.showNotification('Error playing audio file', 'error');
        this.pauseSong();
    }

    /**
     * Show notification to user
     */
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ff6b6b' : type === 'warning' ? '#ffd93d' : type === 'success' ? '#6bcf7f' : '#667eea'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 1001;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 10px;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    /**
     * Get current player state for debugging
     */
    getPlayerState() {
        return {
            isPlaying: this.isPlaying,
            currentSongIndex: this.currentSongIndex,
            playlistLength: this.playlist.length,
            isShuffled: this.isShuffled,
            isRepeating: this.isRepeating,
            volume: this.audio.volume,
            currentTime: this.audio.currentTime,
            duration: this.audio.duration
        };
    }
}

// Initialize the music player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.musicPlayer = new MusicPlayer();
    
    // Add some helpful console messages
    console.log('🎵 Modern Music Player loaded successfully!');
    console.log('🎹 Keyboard shortcuts:');
    console.log('   Space: Play/Pause');
    console.log('   ←/→: Previous/Next song');
    console.log('   ↑/↓: Volume up/down');
    console.log('   S: Toggle shuffle');
    console.log('   R: Toggle repeat');
    console.log('🎧 Use musicPlayer.getPlayerState() to check current state');
});
