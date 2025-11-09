// Ceipal Jobs Integration - Frontend JavaScript
// Fetches jobs from your backend API and displays them

class CeipalJobsManager {
    constructor() {
        this.apiUrl = this.getApiUrl();
        this.jobs = [];
        this.filteredJobs = [];
        this.loading = false;
        this.searchQuery = '';
        this.locationQuery = '';
        this.filters = {
            remote: false,
            fullTime: false,
            contract: false
        };
    }

    /**
     * Get API URL based on environment
     */
    getApiUrl() {
        // Production: your Vercel deployment
        if (window.location.hostname.includes('github.io')) {
            return 'https://your-project.vercel.app/api/jobs';
        }
        // Local development
        return 'http://localhost:3000/api/jobs';
    }

    /**
     * Initialize jobs manager
     */
    async init() {
        console.log('Initializing Ceipal Jobs Manager...');
        
        // Fetch jobs on page load
        await this.fetchJobs();
        
        // Set up search functionality
        this.setupSearch();
        
        // Set up filters
        this.setupFilters();
        
        // Refresh jobs every 15 minutes
        setInterval(() => this.fetchJobs(), 15 * 60 * 1000);
        
        console.log('Ceipal Jobs Manager initialized');
    }

    /**
     * Fetch jobs from API
     */
    async fetchJobs(showLoader = true) {
        if (this.loading) return;
        
        this.loading = true;
        
        if (showLoader) {
            this.showLoading();
        }
        
        try {
            const response = await fetch(this.apiUrl);
            const result = await response.json();
            
            if (result.success) {
                this.jobs = result.data;
                this.filteredJobs = [...this.jobs];
                
                console.log(`Loaded ${this.jobs.length} jobs from Ceipal`);
                console.log('Cache status:', result.cached ? 'Cached' : 'Fresh');
                
                if (result.cached && result.cacheAge) {
                    console.log('Cache age:', result.cacheAge);
                }
                
                this.applyFilters();
                this.displayJobs();
            } else {
                throw new Error(result.error || 'Failed to fetch jobs');
            }
            
        } catch (error) {
            console.error('Error fetching jobs:', error);
            this.showError('Unable to load jobs. Please try again later.');
            
            // Show placeholder jobs if fetch fails
            this.showPlaceholderJobs();
        } finally {
            this.loading = false;
            this.hideLoading();
        }
    }

    /**
     * Display jobs in the UI
     */
    displayJobs() {
        const container = document.getElementById('jobs-container');
        if (!container) return;
        
        // Clear existing jobs
        container.innerHTML = '';
        
        if (this.filteredJobs.length === 0) {
            this.showNoResults();
            return;
        }
        
        // Display each job
        this.filteredJobs.forEach(job => {
            const jobCard = this.createJobCard(job);
            container.appendChild(jobCard);
        });
        
        // Update count
        this.updateJobCount();
    }

    /**
     * Create job card HTML element
     */
    createJobCard(job) {
        const card = document.createElement('div');
        card.className = 'border-2 border-gray-100 rounded-xl p-4 md:p-6 hover:border-primary hover:shadow-lg transition-all';
        card.dataset.jobId = job.id;
        
        card.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3 md:space-x-4">
                    <div class="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${job.iconColor} rounded-xl flex items-center justify-center flex-shrink-0">
                        <i class="fa-solid ${job.icon} text-${this.getIconColor(job.iconColor)} text-lg md:text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-lg md:text-xl font-bold text-dark">${this.escapeHtml(job.title)}</h3>
                        <p class="text-sm md:text-base text-gray-600">${this.escapeHtml(job.company)}</p>
                    </div>
                </div>
                <button class="job-favorite-btn text-gray-400 hover:text-accent transition-colors" data-job-id="${job.id}" aria-label="Save job">
                    <i class="fa-regular fa-heart text-xl md:text-2xl"></i>
                </button>
            </div>
            
            <div class="flex flex-wrap items-center gap-2 mb-4">
                <span class="bg-${this.getTypeColor(job.type)}-100 text-${this.getTypeColor(job.type)}-700 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold">
                    ${job.type}
                </span>
                <span class="bg-${this.getWorkModeColor(job.workMode)}-100 text-${this.getWorkModeColor(job.workMode)}-700 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold">
                    ${job.workMode}
                </span>
                ${job.location ? `
                    <span class="text-gray-600 text-xs md:text-sm">
                        <i class="fa-solid fa-location-dot mr-1"></i>${this.escapeHtml(job.location)}
                    </span>
                ` : ''}
                ${job.jobCode ? `
                    <span class="text-gray-500 text-xs md:text-sm">
                        ${this.escapeHtml(job.jobCode)}
                    </span>
                ` : ''}
            </div>
            
            <p class="text-sm md:text-base text-gray-600 mb-4 line-clamp-2">
                ${this.escapeHtml(job.description)}
            </p>
            
            <div class="flex items-center justify-between">
                <span class="text-lg md:text-xl font-bold text-primary">${job.salary}</span>
                <button class="apply-btn bg-primary text-white px-4 py-2 md:px-6 md:py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all text-sm md:text-base" data-job-id="${job.id}">
                    Apply Now
                </button>
            </div>
        `;
        
        // Add event listeners
        const favoriteBtn = card.querySelector('.job-favorite-btn');
        const applyBtn = card.querySelector('.apply-btn');
        
        favoriteBtn.addEventListener('click', () => this.toggleFavorite(job.id));
        applyBtn.addEventListener('click', () => this.applyToJob(job));
        
        return card;
    }

    /**
     * Setup search functionality
     */
    setupSearch() {
        const searchBtn = document.querySelector('#jobs-search-btn');
        const jobTitleInput = document.querySelector('#job-title-search');
        const locationInput = document.querySelector('#job-location-search');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.searchQuery = jobTitleInput?.value || '';
                this.locationQuery = locationInput?.value || '';
                this.applyFilters();
            });
        }
        
        // Real-time search on input
        if (jobTitleInput) {
            jobTitleInput.addEventListener('input', this.debounce(() => {
                this.searchQuery = jobTitleInput.value;
                this.applyFilters();
            }, 300));
        }
        
        if (locationInput) {
            locationInput.addEventListener('input', this.debounce(() => {
                this.locationQuery = locationInput.value;
                this.applyFilters();
            }, 300));
        }
    }

    /**
     * Setup filter checkboxes
     */
    setupFilters() {
        const remoteCheckbox = document.getElementById('remote');
        const fulltimeCheckbox = document.getElementById('fulltime');
        const contractCheckbox = document.getElementById('contract');
        
        if (remoteCheckbox) {
            remoteCheckbox.addEventListener('change', () => {
                this.filters.remote = remoteCheckbox.checked;
                this.applyFilters();
            });
        }
        
        if (fulltimeCheckbox) {
            fulltimeCheckbox.addEventListener('change', () => {
                this.filters.fullTime = fulltimeCheckbox.checked;
                this.applyFilters();
            });
        }
        
        if (contractCheckbox) {
            contractCheckbox.addEventListener('change', () => {
                this.filters.contract = contractCheckbox.checked;
                this.applyFilters();
            });
        }
    }

    /**
     * Apply all filters
     */
    applyFilters() {
        this.filteredJobs = this.jobs.filter(job => {
            // Search filter
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                const matchesSearch = 
                    job.title.toLowerCase().includes(query) ||
                    job.company.toLowerCase().includes(query) ||
                    job.description.toLowerCase().includes(query) ||
                    (job.skills && job.skills.some(skill => skill.toLowerCase().includes(query)));
                
                if (!matchesSearch) return false;
            }
            
            // Location filter
            if (this.locationQuery) {
                const query = this.locationQuery.toLowerCase();
                const matchesLocation = 
                    job.location.toLowerCase().includes(query) ||
                    job.state.toLowerCase().includes(query) ||
                    (query.includes('remote') && job.workMode === 'Remote');
                
                if (!matchesLocation) return false;
            }
            
            // Checkbox filters
            if (this.filters.remote && job.workMode !== 'Remote') return false;
            if (this.filters.fullTime && job.type !== 'Full-Time') return false;
            if (this.filters.contract && job.type !== 'Contract') return false;
            
            return true;
        });
        
        this.displayJobs();
    }

    /**
     * Toggle favorite job
     */
    toggleFavorite(jobId) {
        const btn = document.querySelector(`[data-job-id="${jobId}"] .job-favorite-btn i`);
        if (!btn) return;
        
        if (btn.classList.contains('fa-regular')) {
            btn.classList.remove('fa-regular');
            btn.classList.add('fa-solid');
            this.saveFavorite(jobId);
            this.showNotification('Job saved to favorites!', 'success');
        } else {
            btn.classList.remove('fa-solid');
            btn.classList.add('fa-regular');
            this.removeFavorite(jobId);
            this.showNotification('Job removed from favorites', 'info');
        }
    }

    /**
     * Apply to job
     */
    applyToJob(job) {
        console.log('Applying to job:', job);
        
        // You can redirect to Ceipal's apply page or show a modal
        const applyUrl = `${this.getCeipalBaseUrl()}/apply/${job.id}`;
        
        // Option 1: Open in new tab
        window.open(applyUrl, '_blank');
        
        // Option 2: Show application modal (implement this)
        // this.showApplicationModal(job);
        
        trackEvent('Job', 'Apply', job.title);
    }

    /**
     * Helper functions
     */
    getCeipalBaseUrl() {
        return 'https://talenthirecls2.ceipal.com';
    }

    getTypeColor(type) {
        if (type === 'Full-Time') return 'green';
        if (type === 'Contract') return 'blue';
        if (type === 'Part-Time') return 'yellow';
        return 'gray';
    }

    getWorkModeColor(mode) {
        if (mode === 'Remote') return 'blue';
        if (mode === 'Hybrid') return 'purple';
        return 'orange';
    }

    getIconColor(bgColor) {
        if (bgColor.includes('blue')) return 'primary';
        if (bgColor.includes('purple')) return 'purple-600';
        if (bgColor.includes('green')) return 'green-600';
        if (bgColor.includes('red')) return 'red-600';
        return 'primary';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * UI helpers
     */
    showLoading() {
        const container = document.getElementById('jobs-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="col-span-2 flex flex-col items-center justify-center py-12">
                <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
                <p class="text-gray-600 text-lg">Loading jobs from Ceipal...</p>
            </div>
        `;
    }

    hideLoading() {
        // Loading is hidden when jobs are displayed
    }

    showError(message) {
        const container = document.getElementById('jobs-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="col-span-2 flex flex-col items-center justify-center py-12">
                <i class="fa-solid fa-exclamation-circle text-red-500 text-6xl mb-4"></i>
                <p class="text-gray-700 text-lg font-semibold mb-2">Oops! Something went wrong</p>
                <p class="text-gray-600 mb-6">${message}</p>
                <button onclick="ceipalJobsManager.fetchJobs()" class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all">
                    Try Again
                </button>
            </div>
        `;
    }

    showNoResults() {
        const container = document.getElementById('jobs-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="col-span-2 flex flex-col items-center justify-center py-12">
                <i class="fa-solid fa-search text-gray-400 text-6xl mb-4"></i>
                <p class="text-gray-700 text-lg font-semibold mb-2">No jobs found</p>
                <p class="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
                <button onclick="ceipalJobsManager.clearFilters()" class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all">
                    Clear Filters
                </button>
            </div>
        `;
    }

    showPlaceholderJobs() {
        // Show static jobs as fallback
        console.log('Showing placeholder jobs');
    }

    updateJobCount() {
        const countElement = document.getElementById('jobs-count');
        if (countElement) {
            countElement.textContent = `${this.filteredJobs.length} Jobs Found`;
        }
    }

    clearFilters() {
        this.searchQuery = '';
        this.locationQuery = '';
        this.filters = { remote: false, fullTime: false, contract: false };
        
        // Clear inputs
        const jobTitleInput = document.querySelector('#job-title-search');
        const locationInput = document.querySelector('#job-location-search');
        if (jobTitleInput) jobTitleInput.value = '';
        if (locationInput) locationInput.value = '';
        
        // Clear checkboxes
        document.querySelectorAll('#jobs input[type="checkbox"]').forEach(cb => cb.checked = false);
        
        this.applyFilters();
    }

    saveFavorite(jobId) {
        const favorites = JSON.parse(localStorage.getItem('favoriteJobs') || '[]');
        if (!favorites.includes(jobId)) {
            favorites.push(jobId);
            localStorage.setItem('favoriteJobs', JSON.stringify(favorites));
        }
    }

    removeFavorite(jobId) {
        let favorites = JSON.parse(localStorage.getItem('favoriteJobs') || '[]');
        favorites = favorites.filter(id => id !== jobId);
        localStorage.setItem('favoriteJobs', JSON.stringify(favorites));
    }

    showNotification(message, type = 'success') {
        // Use the existing notification function from main.js
        if (typeof showNotification === 'function') {
            showNotification(message, type);
        } else {
            console.log(message);
        }
    }
}

// Initialize jobs manager when DOM is ready
let ceipalJobsManager;

document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on jobs section
    if (document.getElementById('jobs')) {
        ceipalJobsManager = new CeipalJobsManager();
        ceipalJobsManager.init();
    }
});

// Track analytics
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    console.log('Event tracked:', category, action, label);
}
