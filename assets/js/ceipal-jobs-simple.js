// Simple version - loads from static JSON file
// No backend required, works with GitHub Pages only

class SimpleJobsManager {
    constructor() {
        this.jobs = [];
        this.filteredJobs = [];
    }

    async init() {
        console.log('Loading jobs from static file...');
        await this.fetchJobs();
    }

    async fetchJobs() {
        try {
            // Load from static JSON file
            const response = await fetch('./data/jobs.json');
            const result = await response.json();
            
            this.jobs = result.jobs;
            this.filteredJobs = [...this.jobs];
            
            console.log(`Loaded ${this.jobs.length} jobs`);
            console.log('Last updated:', result.lastUpdated);
            
            this.displayJobs();
            
        } catch (error) {
            console.error('Error loading jobs:', error);
            this.showError('Unable to load jobs');
        }
    }

    displayJobs() {
        const container = document.getElementById('jobs-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (this.filteredJobs.length === 0) {
            container.innerHTML = '<div class="col-span-2 text-center py-12"><p class="text-gray-600">No jobs available</p></div>';
            return;
        }
        
        this.filteredJobs.forEach(job => {
            container.appendChild(this.createJobCard(job));
        });
        
        this.updateJobCount();
    }

    createJobCard(job) {
        const card = document.createElement('div');
        card.className = 'border-2 border-gray-100 rounded-xl p-4 md:p-6 hover:border-primary hover:shadow-lg transition-all';
        
        card.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3 md:space-x-4">
                    <div class="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${job.iconColor} rounded-xl flex items-center justify-center flex-shrink-0">
                        <i class="fa-solid ${job.icon} text-primary text-lg md:text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-lg md:text-xl font-bold text-dark">${job.title}</h3>
                        <p class="text-sm md:text-base text-gray-600">${job.company}</p>
                    </div>
                </div>
            </div>
            
            <div class="flex flex-wrap items-center gap-2 mb-4">
                <span class="bg-green-100 text-green-700 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold">
                    ${job.type}
                </span>
                <span class="bg-blue-100 text-blue-700 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold">
                    ${job.workMode}
                </span>
                <span class="text-gray-600 text-xs md:text-sm">
                    <i class="fa-solid fa-location-dot mr-1"></i>${job.location}
                </span>
            </div>
            
            <p class="text-sm md:text-base text-gray-600 mb-4">${job.description}</p>
            
            <div class="flex items-center justify-between">
                <span class="text-lg md:text-xl font-bold text-primary">${job.salary}</span>
                <a href="mailto:ab@metaforceit.com?subject=Application for ${encodeURIComponent(job.title)}" 
                   class="bg-primary text-white px-4 py-2 md:px-6 md:py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all text-sm md:text-base">
                    Apply Now
                </a>
            </div>
        `;
        
        return card;
    }

    updateJobCount() {
        const countElement = document.getElementById('jobs-count');
        if (countElement) {
            countElement.textContent = `${this.filteredJobs.length} Jobs Available`;
        }
    }

    showError(message) {
        const container = document.getElementById('jobs-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="col-span-2 text-center py-12">
                <i class="fa-solid fa-exclamation-circle text-red-500 text-4xl mb-4"></i>
                <p class="text-gray-600">${message}</p>
            </div>
        `;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('jobs')) {
        const jobsManager = new SimpleJobsManager();
        jobsManager.init();
    }
});
