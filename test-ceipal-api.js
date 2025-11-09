// Test Ceipal Jobs API to see the actual response format
const fetch = require('node-fetch');

const apiKey = 'eGhuajFMMEY4TDVGTkVCQXdyOFprQT09';
const careerPortalId = 'Z3RkUkt2OXZJVld2MjFpOVRSTXoxZz09';
const apiBaseUrl = 'https://jobsapi.ceipal.com';

async function testCeipalAPI() {
    console.log('🔍 Testing Ceipal Jobs API...\n');
    
    // Try different possible endpoints
    const endpoints = [
        '/v1/jobs',
        '/api/jobs',
        '/jobs',
        '/v1/postings',
        '/api/v1/jobs'
    ];
    
    for (const endpoint of endpoints) {
        try {
            console.log(`📡 Testing: ${apiBaseUrl}${endpoint}`);
            
            const response = await fetch(`${apiBaseUrl}${endpoint}`, {
                headers: {
                    'x-api-key': apiKey,
                    'x-career-portal-id': careerPortalId,
                    'Accept': 'application/json'
                }
            });
            
            console.log(`   Status: ${response.status} ${response.statusText}`);
            
            if (response.ok) {
                const data = await response.json();
                console.log('   ✅ SUCCESS! Response structure:');
                console.log(JSON.stringify(data, null, 2).substring(0, 1000));
                console.log('\n   Found the correct endpoint!');
                return;
            } else {
                const text = await response.text();
                console.log(`   ❌ Error: ${text.substring(0, 200)}`);
            }
            
        } catch (error) {
            console.log(`   ❌ Error: ${error.message}`);
        }
        console.log('');
    }
    
    console.log('\n💡 None of the standard endpoints worked.');
    console.log('The widget might need to be loaded via the script tag.');
    console.log('\nTrying to analyze the widget script...\n');
    
    // Fetch the widget script to understand its API calls
    try {
        const widgetResponse = await fetch('https://jobsapi.ceipal.com/APISource/widget.js');
        const widgetCode = await widgetResponse.text();
        
        // Look for API endpoint patterns
        const apiMatches = widgetCode.match(/['"]\/[^'"]+['"]/g) || [];
        const uniqueEndpoints = [...new Set(apiMatches)].filter(e => e.includes('job') || e.includes('api'));
        
        console.log('🔍 Found potential endpoints in widget.js:');
        uniqueEndpoints.slice(0, 10).forEach(e => console.log(`   ${e}`));
        
    } catch (error) {
        console.log('❌ Could not fetch widget script');
    }
}

testCeipalAPI();
