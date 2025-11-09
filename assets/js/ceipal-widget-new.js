// Ceipal Widget Integration - Simple fallback approach
// Waits for Ceipal widget or shows direct link

(function() {
    'use strict';
    
    let widgetCheckAttempts = 0;
    const maxAttempts = 30; // 15 seconds total
    
    function checkWidget() {
        widgetCheckAttempts++;
        
        const widgetContainer = document.getElementById('ceipal-widget-container');
        const fallbackContainer = document.getElementById('jobs-container');
        
        if (widgetContainer && widgetContainer.children.length > 0) {
            // Widget loaded successfully
            console.log('✅ Ceipal widget loaded');
            if (fallbackContainer) {
                fallbackContainer.style.display = 'none';
            }
        } else if (widgetCheckAttempts >= maxAttempts) {
            // Widget didn't load, show fallback
            console.warn('⚠️ Widget timed out, showing fallback');
            showFallback();
        } else {
            // Keep checking
            setTimeout(checkWidget, 500);
        }
    }
    
    function showFallback() {
        const fallbackContainer = document.getElementById('jobs-container');
        if (!fallbackContainer) return;
        
        fallbackContainer.style.display = 'grid';
        fallbackContainer.innerHTML = `
            <div class="col-span-2 flex flex-col items-center justify-center py-12">
                <i class="fa-solid fa-briefcase text-primary text-6xl mb-4"></i>
                <p class="text-gray-700 text-lg font-semibold mb-2">View Our Current Openings</p>
                <p class="text-gray-600 mb-6">Explore exciting IT career opportunities</p>
                <a href="https://talenthirecls2.ceipal.com/JobPosts/index" target="_blank" 
                   class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all">
                    Browse All Jobs <i class="fa-solid fa-arrow-right ml-2"></i>
                </a>
            </div>
        `;
    }
    
    // Start checking when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(checkWidget, 1000); // Give widget.js time to load
        });
    } else {
        setTimeout(checkWidget, 1000);
    }
})();
