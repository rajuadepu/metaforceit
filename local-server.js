// Local test server for the Ceipal API
const http = require('http');
const url = require('url');

// Import the handler
const apiHandler = require('./api/jobs.js');

const PORT = 3000;

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    if (parsedUrl.pathname === '/api/jobs') {
        // Call the Vercel serverless function
        await apiHandler.default(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Local API server running at http://localhost:${PORT}`);
    console.log(`📡 Test endpoint: http://localhost:${PORT}/api/jobs`);
    console.log(`\n💡 Open http://localhost:${PORT}/api/jobs in your browser to test`);
});
