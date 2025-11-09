// Ceipal Jobs Integration with Custom Card Design
// Fetches jobs using Ceipal widget and displays in custom format

(function() {
    'use strict';
    
    // Sample jobs data structure for display
    const sampleJobs = [
        {
            id: '1',
            jobCode: 'MFI-001',
            title: 'Senior Full Stack Developer',
            company: 'Meta Force IT',
            location: 'San Francisco, CA',
            state: 'CA',
            type: 'Full-Time',
            workMode: 'Remote',
            description: 'Looking for an experienced full stack developer proficient in React, Node.js, and AWS to join our growing team.',
            salary: '$120K - $180K',
            icon: 'fa-code',
            iconColor: 'from-blue-100 to-blue-200'
        },
        {
            id: '2',
            jobCode: 'MFI-002',
            title: 'iOS Developer',
            company: 'Meta Force IT',
            location: 'New York, NY',
            state: 'NY',
            type: 'Full-Time',
            workMode: 'On-Site',
            description: 'Join our mobile team to build cutting-edge iOS applications using Swift and SwiftUI for Fortune 500 clients.',
            salary: '$110K - $160K',
            icon: 'fa-mobile-screen-button',
            iconColor: 'from-purple-100 to-purple-200'
        },
        {
            id: '3',
            jobCode: 'MFI-003',
            title: 'Data Engineer',
            company: 'Meta Force IT',
            location: 'Austin, TX',
            state: 'TX',
            type: 'Contract',
            workMode: 'Hybrid',
            description: 'Design and implement scalable data pipelines using Python, Spark, and cloud technologies for enterprise clients.',
            salary: '$95K - $145K',
            icon: 'fa-database',
            iconColor: 'from-green-100 to-green-200'
        },
        {
            id: '4',
            jobCode: 'MFI-004',
            title: 'Cybersecurity Analyst',
            company: 'Meta Force IT',
            location: 'Boston, MA',
            state: 'MA',
            type: 'Full-Time',
            workMode: 'Remote',
            description: 'Protect critical infrastructure by monitoring threats, conducting security assessments, and implementing solutions.',
            salary: '$105K - $155K',
            icon: 'fa-shield-halved',
            iconColor: 'from-red-100 to-red-200'
        }
    ];
    
    let allJobs = [];
    let filteredJobs = [];
    let currentPage = 1;
    const jobsPerPage = 10; // Show 10 jobs per page
    
    function init() {
        console.log('🚀 Initializing Ceipal Jobs Display...');
        
        // Fetch jobs from local API
        fetchJobsFromAPI();
        
        // Setup search and filters
        setupSearch();
        setupFilters();
    }
    
    async function fetchJobsFromAPI() {
        console.log('� Fetching jobs from API...');
        
        try {
            const response = await fetch('http://localhost:3000/api/jobs');
            const result = await response.json();
            
            console.log('API Response:', result);
            
            if (result.success && result.data) {
                allJobs = result.data;
                filteredJobs = [...allJobs];
                console.log(`✅ Loaded ${allJobs.length} jobs from API`);
                displayJobs();
                updateJobCount();
            } else {
                console.warn('⚠️ API returned no jobs, using sample data');
                loadSampleJobs();
            }
        } catch (error) {
            console.error('❌ Error fetching from API:', error);
            console.log('💡 Falling back to sample data');
            loadSampleJobs();
        }
    }
    
    function loadSampleJobs() {
        allJobs = sampleJobs;
        filteredJobs = [...allJobs];
        displayJobs();
        updateJobCount();
    }
        filteredJobs = [...allJobs];
        
        displayJobs();
        updateJobCount();
    }
    
    function displayJobs() {
        const container = document.getElementById('jobs-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (filteredJobs.length === 0) {
            showNoResults(container);
            return;
        }
        
        // Calculate pagination
        const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
        const startIndex = (currentPage - 1) * jobsPerPage;
        const endIndex = startIndex + jobsPerPage;
        const jobsToDisplay = filteredJobs.slice(startIndex, endIndex);
        
        // Display jobs for current page
        jobsToDisplay.forEach(job => {
            container.appendChild(createJobCard(job));
        });
        
        // Add pagination controls
        if (totalPages > 1) {
            container.appendChild(createPagination(totalPages));
        }
    }
    
    function createPagination(totalPages) {
        const paginationDiv = document.createElement('div');
        paginationDiv.className = 'col-span-2 flex items-center justify-center gap-2 mt-6';
        
        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = `px-4 py-2 rounded-lg font-semibold transition-all ${
            currentPage === 1 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white'
        }`;
        prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
        prevBtn.disabled = currentPage === 1;
        prevBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                displayJobs();
                scrollToJobs();
            }
        };
        paginationDiv.appendChild(prevBtn);
        
        // Page numbers
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);
        
        if (startPage > 1) {
            addPageButton(paginationDiv, 1);
            if (startPage > 2) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'px-2 text-gray-400';
                ellipsis.textContent = '...';
                paginationDiv.appendChild(ellipsis);
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            addPageButton(paginationDiv, i);
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'px-2 text-gray-400';
                ellipsis.textContent = '...';
                paginationDiv.appendChild(ellipsis);
            }
            addPageButton(paginationDiv, totalPages);
        }
        
        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = `px-4 py-2 rounded-lg font-semibold transition-all ${
            currentPage === totalPages 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white'
        }`;
        nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayJobs();
                scrollToJobs();
            }
        };
        paginationDiv.appendChild(nextBtn);
        
        return paginationDiv;
    }
    
    function addPageButton(container, pageNumber) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `px-4 py-2 rounded-lg font-semibold transition-all ${
            currentPage === pageNumber
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
        }`;
        pageBtn.textContent = pageNumber;
        pageBtn.onclick = () => {
            currentPage = pageNumber;
            displayJobs();
            scrollToJobs();
        };
        container.appendChild(pageBtn);
    }
    
    function scrollToJobs() {
        const jobsSection = document.getElementById('jobs');
        if (jobsSection) {
            jobsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    function createJobCard(job) {
        const card = document.createElement('div');
        card.className = 'border-2 border-gray-100 rounded-xl p-4 md:p-6 hover:border-primary hover:shadow-lg transition-all';
        
        const typeColor = job.type === 'Full-Time' ? 'green' : job.type === 'Contract' ? 'blue' : 'yellow';
        const workModeColor = job.workMode === 'Remote' ? 'blue' : job.workMode === 'Hybrid' ? 'purple' : 'orange';
        
        card.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3 md:space-x-4">
                    <div class="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${job.iconColor} rounded-xl flex items-center justify-center flex-shrink-0">
                        <i class="fa-solid ${job.icon} text-primary text-lg md:text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-lg md:text-xl font-bold text-dark">${escapeHtml(job.title)}</h3>
                        <p class="text-sm md:text-base text-gray-600">${escapeHtml(job.company)}</p>
                    </div>
                </div>
                <button class="text-gray-400 hover:text-accent transition-colors" onclick="toggleFavorite('${job.id}')" aria-label="Save job">
                    <i class="fa-regular fa-heart text-xl md:text-2xl"></i>
                </button>
            </div>
            
            <div class="flex flex-wrap items-center gap-2 mb-4">
                <span class="bg-${typeColor}-100 text-${typeColor}-700 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold">
                    ${job.type}
                </span>
                <span class="bg-${workModeColor}-100 text-${workModeColor}-700 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold">
                    ${job.workMode}
                </span>
                <span class="text-gray-600 text-xs md:text-sm">
                    <i class="fa-solid fa-location-dot mr-1"></i>${escapeHtml(job.location)}
                </span>
            </div>
            
            <p class="text-sm md:text-base text-gray-600 mb-4">${escapeHtml(job.description)}</p>
            
            <div class="flex items-center justify-between">
                <span class="text-lg md:text-xl font-bold text-primary">${job.salary}</span>
                <a href="https://talenthirecls2.ceipal.com/JobPosts/index" target="_blank" 
                   class="bg-primary text-white px-4 py-2 md:px-6 md:py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all text-sm md:text-base">
                    Apply Now
                </a>
            </div>
        `;
        
        return card;
    }
    
    function setupSearch() {
        const searchBtn = document.getElementById('jobs-search-btn');
        const titleInput = document.getElementById('job-title-search');
        const locationInput = document.getElementById('job-location-search');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                applyFilters();
            });
        }
        
        if (titleInput) {
            titleInput.addEventListener('input', debounce(applyFilters, 300));
        }
        
        if (locationInput) {
            locationInput.addEventListener('input', debounce(applyFilters, 300));
        }
    }
    
    function setupFilters() {
        ['remote', 'fulltime', 'contract'].forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.addEventListener('change', applyFilters);
            }
        });
    }
    
    function applyFilters() {
        const titleQuery = document.getElementById('job-title-search')?.value.toLowerCase() || '';
        const locationQuery = document.getElementById('job-location-search')?.value.toLowerCase() || '';
        const remoteOnly = document.getElementById('remote')?.checked || false;
        const fulltimeOnly = document.getElementById('fulltime')?.checked || false;
        const contractOnly = document.getElementById('contract')?.checked || false;
        
        filteredJobs = allJobs.filter(job => {
            // Title/keyword search
            if (titleQuery) {
                const matchesTitle = job.title.toLowerCase().includes(titleQuery) ||
                                   job.company.toLowerCase().includes(titleQuery) ||
                                   job.description.toLowerCase().includes(titleQuery);
                if (!matchesTitle) return false;
            }
            
            // Location search
            if (locationQuery) {
                const matchesLocation = job.location.toLowerCase().includes(locationQuery) ||
                                      job.state.toLowerCase().includes(locationQuery);
                if (!matchesLocation) return false;
            }
            
            // Checkbox filters
            if (remoteOnly && job.workMode !== 'Remote') return false;
            if (fulltimeOnly && job.type !== 'Full-Time') return false;
            if (contractOnly && job.type !== 'Contract') return false;
            
            return true;
        });
        
        // Reset to page 1 when filters change
        currentPage = 1;
        displayJobs();
        updateJobCount();
    }
    
    function updateJobCount() {
        const countElement = document.getElementById('jobs-count');
        if (countElement) {
            const start = filteredJobs.length > 0 ? (currentPage - 1) * jobsPerPage + 1 : 0;
            const end = Math.min(currentPage * jobsPerPage, filteredJobs.length);
            countElement.textContent = `Showing ${start}-${end} of ${filteredJobs.length} Job${filteredJobs.length !== 1 ? 's' : ''}`;
        }
    }
    
    function showNoResults(container) {
        container.innerHTML = `
            <div class="col-span-2 flex flex-col items-center justify-center py-12">
                <i class="fa-solid fa-search text-gray-400 text-6xl mb-4"></i>
                <p class="text-gray-700 text-lg font-semibold mb-2">No jobs found</p>
                <p class="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
                <button onclick="clearAllFilters()" class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all">
                    Clear Filters
                </button>
            </div>
        `;
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
    
    // Global functions
    window.toggleFavorite = function(jobId) {
        console.log('Toggle favorite:', jobId);
        // Add to localStorage or similar
    };
    
    window.clearAllFilters = function() {
        document.getElementById('job-title-search').value = '';
        document.getElementById('job-location-search').value = '';
        document.getElementById('remote').checked = false;
        document.getElementById('fulltime').checked = false;
        document.getElementById('contract').checked = false;
        currentPage = 1;
        applyFilters();
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
