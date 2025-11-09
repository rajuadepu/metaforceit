// Test script to verify Ceipal authentication works
// Run: node test-ceipal.js

const fetch = require('node-fetch');
const cheerio = require('cheerio');

const CEIPAL_BASE_URL = 'https://talenthirecls2.ceipal.com';
const username = 'ab@metaforceit.com';
const password = 'Ganesha@123';

async function testCeipalConnection() {
    console.log('🔍 Testing Ceipal connection...\n');
    
    try {
        // Step 1: Try to access the login page
        console.log('1️⃣ Accessing Ceipal login page...');
        const loginPageResponse = await fetch(`${CEIPAL_BASE_URL}/login`);
        console.log(`   Status: ${loginPageResponse.status} ${loginPageResponse.statusText}`);
        
        if (!loginPageResponse.ok) {
            console.log('   ❌ Cannot access login page');
            return;
        }
        
        const loginPageHtml = await loginPageResponse.text();
        console.log('   ✅ Login page loaded');
        
        // Step 2: Parse login form to find required fields
        console.log('\n2️⃣ Analyzing login form...');
        const $ = cheerio.load(loginPageHtml);
        
        // Find the login form
        const form = $('form[action*="login"], form[id*="login"], form').first();
        if (form.length) {
            console.log('   ✅ Found login form');
            
            // Find all input fields
            const inputs = form.find('input');
            console.log(`   Found ${inputs.length} input fields:`);
            
            inputs.each((i, input) => {
                const name = $(input).attr('name');
                const type = $(input).attr('type');
                const value = $(input).attr('value');
                console.log(`     - ${name} (type: ${type})${value ? ` [default: ${value}]` : ''}`);
            });
            
            const actionUrl = form.attr('action');
            const method = form.attr('method') || 'POST';
            console.log(`\n   Form action: ${actionUrl || 'same page'}`);
            console.log(`   Form method: ${method}`);
        } else {
            console.log('   ⚠️  No form found, might use JavaScript for login');
        }
        
        // Step 3: Try to access job postings page (might redirect if not authenticated)
        console.log('\n3️⃣ Checking job postings page...');
        const jobsResponse = await fetch(`${CEIPAL_BASE_URL}/JobPosts/index`);
        console.log(`   Status: ${jobsResponse.status} ${jobsResponse.statusText}`);
        
        if (jobsResponse.status === 200) {
            const jobsHtml = await jobsResponse.text();
            
            // Check if it's the actual jobs page or a login redirect
            if (jobsHtml.includes('login') || jobsHtml.includes('Login')) {
                console.log('   ⚠️  Redirected to login (authentication required)');
            } else if (jobsHtml.includes('job') || jobsHtml.includes('Job')) {
                console.log('   ✅ Jobs page accessible (might be public)');
                
                // Try to find job table structure
                const $jobs = cheerio.load(jobsHtml);
                const tables = $jobs('table');
                
                if (tables.length) {
                    console.log(`\n   Found ${tables.length} table(s)`);
                    
                    // Analyze first table
                    const firstTable = $jobs(tables[0]);
                    const headers = firstTable.find('th, thead td');
                    
                    if (headers.length) {
                        console.log('   Table columns:');
                        headers.each((i, th) => {
                            console.log(`     ${i + 1}. ${$jobs(th).text().trim()}`);
                        });
                    }
                    
                    // Count rows
                    const rows = firstTable.find('tbody tr');
                    console.log(`   Found ${rows.length} job rows`);
                }
            }
        } else {
            console.log('   ❌ Cannot access jobs page');
        }
        
        console.log('\n📋 Summary:');
        console.log('─────────────────────────────────────────────');
        console.log('To proceed, I need to know:');
        console.log('1. What fields does the login form require?');
        console.log('2. What is the exact login endpoint URL?');
        console.log('3. Is the job postings page public or requires auth?');
        console.log('\nNext steps:');
        console.log('1. Review the form fields above');
        console.log('2. Try logging in manually while watching Network tab');
        console.log('3. Copy the exact login request details');
        
    } catch (error) {
        console.error('\n❌ Error:', error.message);
    }
}

// Run the test
testCeipalConnection();
