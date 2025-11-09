// Ceipal Job Integration - API Handler
// This runs on Vercel/Netlify serverless function

const CEIPAL_BASE_URL = 'https://talenthirecls2.ceipal.com';
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

// In-memory cache (for serverless, consider using Redis/Vercel KV for production)
let cachedJobs = null;
let cacheTimestamp = null;

/**
 * Main API handler
 */
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    try {
        // Check cache first
        const now = Date.now();
        if (cachedJobs && cacheTimestamp && (now - cacheTimestamp < CACHE_DURATION)) {
            console.log('Returning cached jobs');
            return res.status(200).json({
                success: true,
                data: cachedJobs,
                cached: true,
                cacheAge: Math.floor((now - cacheTimestamp) / 1000) + ' seconds'
            });
        }
        
        // Fetch fresh data from Ceipal
        console.log('Fetching fresh data from Ceipal');
        const jobs = await fetchJobsFromCeipal();
        
        // Update cache
        cachedJobs = jobs;
        cacheTimestamp = now;
        
        return res.status(200).json({
            success: true,
            data: jobs,
            cached: false,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Error fetching jobs:', error);
        
        // If error but have cached data, return stale cache
        if (cachedJobs) {
            return res.status(200).json({
                success: true,
                data: cachedJobs,
                cached: true,
                stale: true,
                error: 'Using stale cache due to fetch error'
            });
        }
        
        return res.status(500).json({
            success: false,
            error: 'Failed to fetch jobs',
            message: error.message
        });
    }
}

/**
 * Fetch jobs from Ceipal
 */
async function fetchJobsFromCeipal() {
    const fetch = (await import('node-fetch')).default;
    
    // Step 1: Login to Ceipal
    const session = await loginToCeipal(fetch);
    
    // Step 2: Fetch job postings
    const jobsData = await fetchJobPostings(fetch, session);
    
    return jobsData;
}

/**
 * Login to Ceipal and get session
 */
async function loginToCeipal(fetch) {
    const username = process.env.CEIPAL_USERNAME || 'ab@metaforceit.com';
    const password = process.env.CEIPAL_PASSWORD || 'Ganesha@123';
    
    if (!username || !password) {
        throw new Error('Ceipal credentials not configured');
    }
    
    console.log('🔐 Attempting to login to Ceipal...');
    
    // Try to login to Ceipal signin page
    const loginResponse = await fetch(`${CEIPAL_BASE_URL}/signin/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        body: new URLSearchParams({
            'username': username,
            'password': password,
            'rememberMe': 'false'
        }),
        redirect: 'manual'
    });
    
    console.log('Login response status:', loginResponse.status);
    
    // Extract session cookies
    const setCookieHeader = loginResponse.headers.raw()['set-cookie'];
    const cookies = setCookieHeader ? setCookieHeader.join('; ') : '';
    
    console.log('Cookies received:', cookies ? 'Yes' : 'No');
    
    if (!cookies) {
        throw new Error('Failed to obtain session cookies from Ceipal');
    }
    
    return cookies;
}

/**
 * Fetch job postings from Ceipal
 */
async function fetchJobPostings(fetch, session) {
    console.log('📥 Fetching job postings from Ceipal...');
    
    const response = await fetch(`${CEIPAL_BASE_URL}/JobPosts/index`, {
        headers: {
            'Cookie': session,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    });
    
    console.log('Jobs page response status:', response.status);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch job postings: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    console.log('Content type:', contentType);
    
    // If JSON response
    if (contentType && contentType.includes('application/json')) {
        const jsonData = await response.json();
        console.log('Received JSON data');
        return parseJsonJobs(jsonData);
    }
    
    // If HTML response, parse it
    const html = await response.text();
    console.log('Received HTML, length:', html.length);
    
    // Check if we got redirected to login
    if (html.includes('Sign In') || html.includes('signin') || html.includes('login')) {
        throw new Error('Authentication failed - redirected to login page');
    }
    
    return parseHtmlJobs(html);
}

/**
 * Parse JSON jobs response
 */
function parseJsonJobs(jsonData) {
    // This depends on Ceipal's JSON structure
    // Example structure:
    if (Array.isArray(jsonData)) {
        return jsonData.map(job => formatJob(job));
    }
    
    if (jsonData.data && Array.isArray(jsonData.data)) {
        return jsonData.data.map(job => formatJob(job));
    }
    
    return [];
}

/**
 * Parse HTML jobs response (fallback)
 */
function parseHtmlJobs(html) {
    const cheerio = require('cheerio');
    const $ = cheerio.load(html);
    
    const jobs = [];
    
    // Based on your screenshot, parse the table rows
    // This selector needs to be adjusted based on actual HTML structure
    $('table tbody tr').each((index, element) => {
        const $row = $(element);
        
        const job = {
            jobCode: $row.find('td:nth-child(2)').text().trim(),
            title: $row.find('td:nth-child(3)').text().trim(),
            businessUnit: $row.find('td:nth-child(4)').text().trim(),
            client: $row.find('td:nth-child(5)').text().trim(),
            clientJobId: $row.find('td:nth-child(6)').text().trim(),
            location: $row.find('td:nth-child(7)').text().trim(),
            state: $row.find('td:nth-child(8)').text().trim(),
            status: $row.find('td:nth-child(9)').text().trim(),
            // Extract additional fields
            applicants: extractApplicantCount($row),
            id: extractJobId($row),
        };
        
        // Only add if has valid data
        if (job.jobCode && job.title) {
            jobs.push(formatJob(job));
        }
    });
    
    return jobs;
}

/**
 * Format job data to standardized structure
 */
function formatJob(rawJob) {
    return {
        id: rawJob.id || rawJob.jobCode || generateId(),
        jobCode: rawJob.jobCode || rawJob.code || '',
        title: rawJob.title || rawJob.jobTitle || '',
        company: rawJob.client || rawJob.businessUnit || 'Meta Force IT',
        location: rawJob.location || '',
        state: rawJob.state || '',
        type: determineJobType(rawJob),
        workMode: determineWorkMode(rawJob),
        description: rawJob.description || `Opportunity for ${rawJob.title}`,
        salary: rawJob.salary || determineSalaryRange(rawJob.title),
        status: rawJob.status || 'Active',
        postedDate: rawJob.postedDate || new Date().toISOString(),
        applicantCount: rawJob.applicants || 0,
        skills: extractSkills(rawJob.title),
        icon: determineIcon(rawJob.title),
        iconColor: determineIconColor(rawJob.title),
    };
}

/**
 * Helper functions
 */
function determineJobType(job) {
    const title = (job.title || '').toLowerCase();
    if (title.includes('contract') || title.includes('temporary')) return 'Contract';
    if (title.includes('part-time')) return 'Part-Time';
    return 'Full-Time';
}

function determineWorkMode(job) {
    const location = (job.location || '').toLowerCase();
    const title = (job.title || '').toLowerCase();
    
    if (location.includes('remote') || title.includes('remote')) return 'Remote';
    if (location.includes('hybrid') || title.includes('hybrid')) return 'Hybrid';
    return 'On-Site';
}

function determineSalaryRange(title) {
    const titleLower = (title || '').toLowerCase();
    
    // Senior/Lead roles
    if (titleLower.includes('senior') || titleLower.includes('lead') || titleLower.includes('principal')) {
        return '$120K - $180K';
    }
    
    // Mid-level roles
    if (titleLower.includes('engineer') || titleLower.includes('developer') || titleLower.includes('architect')) {
        return '$90K - $140K';
    }
    
    // Junior roles
    if (titleLower.includes('junior') || titleLower.includes('associate')) {
        return '$60K - $90K';
    }
    
    return '$80K - $130K';
}

function extractSkills(title) {
    const skills = [];
    const titleLower = (title || '').toLowerCase();
    
    const skillMap = {
        'angular': 'Angular',
        'react': 'React',
        'node': 'Node.js',
        'python': 'Python',
        'java': 'Java',
        'aws': 'AWS',
        'azure': 'Azure',
        'devops': 'DevOps',
        'kubernetes': 'Kubernetes',
        'docker': 'Docker',
        'sql': 'SQL',
        'nosql': 'NoSQL',
        'security': 'Security',
        'cloud': 'Cloud',
        'frontend': 'Frontend',
        'backend': 'Backend',
        'fullstack': 'Full Stack',
        'mobile': 'Mobile',
        'ios': 'iOS',
        'android': 'Android',
        'data': 'Data Engineering',
        'ml': 'Machine Learning',
        'ai': 'AI',
    };
    
    Object.entries(skillMap).forEach(([key, value]) => {
        if (titleLower.includes(key)) {
            skills.push(value);
        }
    });
    
    return skills;
}

function determineIcon(title) {
    const titleLower = (title || '').toLowerCase();
    
    if (titleLower.includes('frontend') || titleLower.includes('angular') || titleLower.includes('react')) {
        return 'fa-code';
    }
    if (titleLower.includes('mobile') || titleLower.includes('ios') || titleLower.includes('android')) {
        return 'fa-mobile-screen-button';
    }
    if (titleLower.includes('data') || titleLower.includes('database')) {
        return 'fa-database';
    }
    if (titleLower.includes('security') || titleLower.includes('cybersecurity')) {
        return 'fa-shield-halved';
    }
    if (titleLower.includes('cloud') || titleLower.includes('devops')) {
        return 'fa-cloud';
    }
    if (titleLower.includes('architect')) {
        return 'fa-sitemap';
    }
    
    return 'fa-code';
}

function determineIconColor(title) {
    const titleLower = (title || '').toLowerCase();
    
    if (titleLower.includes('frontend') || titleLower.includes('angular') || titleLower.includes('react')) {
        return 'from-blue-100 to-blue-200';
    }
    if (titleLower.includes('mobile')) {
        return 'from-purple-100 to-purple-200';
    }
    if (titleLower.includes('data')) {
        return 'from-green-100 to-green-200';
    }
    if (titleLower.includes('security')) {
        return 'from-red-100 to-red-200';
    }
    
    return 'from-blue-100 to-blue-200';
}

function extractApplicantCount(rowElement) {
    // Extract from the number badges in your screenshot
    const badges = rowElement.find('.badge, .count');
    let total = 0;
    badges.each((i, badge) => {
        const num = parseInt(badge.text()) || 0;
        total += num;
    });
    return total;
}

function extractJobId(rowElement) {
    const link = rowElement.find('a[href*="job"]').attr('href');
    if (link) {
        const match = link.match(/\/(\d+)/);
        return match ? match[1] : null;
    }
    return null;
}

function generateId() {
    return 'job-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}
