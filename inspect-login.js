// Browser automation test to capture login flow
// This will open a browser and let us inspect the login process

const puppeteer = require('puppeteer');

async function inspectLogin() {
    console.log('🚀 Launching browser...\n');
    
    const browser = await puppeteer.launch({
        headless: false, // Show browser
        devtools: true,  // Open DevTools
        slowMo: 50       // Slow down for observation
    });
    
    const page = await browser.newPage();
    
    // Capture network requests
    const requests = [];
    page.on('request', request => {
        requests.push({
            url: request.url(),
            method: request.method(),
            postData: request.postData(),
            headers: request.headers()
        });
    });
    
    console.log('📱 Navigating to Ceipal signin page...');
    await page.goto('https://talenthirecls2.ceipal.com/signin/', {
        waitUntil: 'networkidle2'
    });
    
    console.log('✋ Browser opened. Please:');
    console.log('   1. Manually log in with your credentials');
    console.log('   2. Wait for the page to redirect');
    console.log('   3. Check the console output below');
    console.log('   4. Press Ctrl+C here when done\n');
    
    // Wait for navigation (login redirect)
    await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});
    
    // Filter and display login-related requests
    console.log('\n🔍 Captured login requests:');
    console.log('═══════════════════════════════════════════════\n');
    
    const loginRequests = requests.filter(req => 
        req.method === 'POST' && 
        (req.url.includes('signin') || 
         req.url.includes('login') || 
         req.url.includes('auth'))
    );
    
    if (loginRequests.length === 0) {
        console.log('⚠️  No POST requests found. The form might use JavaScript.');
        console.log('\nAll POST requests:');
        requests
            .filter(r => r.method === 'POST')
            .forEach(req => {
                console.log(`\nURL: ${req.url}`);
                if (req.postData) {
                    console.log(`Data: ${req.postData}`);
                }
            });
    } else {
        loginRequests.forEach((req, index) => {
            console.log(`Request ${index + 1}:`);
            console.log(`URL: ${req.url}`);
            console.log(`Method: ${req.method}`);
            if (req.postData) {
                console.log(`Post Data: ${req.postData}`);
            }
            console.log('───────────────────────────────────────────\n');
        });
    }
    
    console.log('\n✅ Check the output above for login details');
    console.log('Press Ctrl+C to close\n');
    
    // Keep browser open
    await new Promise(() => {});
}

inspectLogin().catch(console.error);
