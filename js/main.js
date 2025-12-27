// Language switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', function(e) {
            const selectedLang = e.target.value;
            const langMap = {
                'en': '/en/',
                'zh': '/zh/',
                'tw-zh': '/tw-zh/',
                'vi': '/vi/',
                'th': '/th/',
                'ru': '/ru/',
                'ko': '/ko/'
            };
            
            if (langMap[selectedLang]) {
                window.location.href = window.location.origin + '/btc' + langMap[selectedLang];
            }
        });
    }
});

// Set current language in selector based on URL
function setCurrentLanguage() {
    const path = window.location.pathname;
    const languageSelector = document.getElementById('language-selector');
    
    if (languageSelector) {
        if (path.includes('/zh/')) {
            languageSelector.value = 'zh';
        } else if (path.includes('/tw-zh/')) {
            languageSelector.value = 'tw-zh';
        } else if (path.includes('/vi/')) {
            languageSelector.value = 'vi';
        } else if (path.includes('/th/')) {
            languageSelector.value = 'th';
        } else if (path.includes('/ru/')) {
            languageSelector.value = 'ru';
        } else if (path.includes('/ko/')) {
            languageSelector.value = 'ko';
        } else {
            languageSelector.value = 'en';
        }
    }
}

// Track referral clicks
function trackReferral(exchange, type) {
    // You can implement analytics here
    console.log(`Referral click: ${exchange} - ${type}`);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setCurrentLanguage();
    
    // Add click tracking to all referral links
    document.querySelectorAll('.referral-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const exchange = this.getAttribute('data-exchange');
            const type = this.getAttribute('data-type');
            trackReferral(exchange, type);
        });
    });
});
// Add IP-based language redirection
document.addEventListener('DOMContentLoaded', function() {
    // Function to get user's IP and redirect
    function redirectBasedOnIP() {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const userIP = data.ip;
                fetch(`https://ipapi.co/${userIP}/json/`)
                    .then(response => response.json())
                    .then(ipData => {
                        const country = ipData.country_code;
                        let redirectPath = '/en/';

                        switch(country) {
                            case 'VN':
                                redirectPath = '/vi/';
                                break;
                            case 'CN':
                                redirectPath = '/zh/';
                                break;
                            case 'RU':
                                redirectPath = '/ru/';
                                break;
                            case 'KR':
                                redirectPath = '/ko/';
                                break;
                            case 'TW':
                                redirectPath = '/tw-zh/';
                                break;
                            case 'TH':
                                redirectPath = '/th/';
                                break;
                        }

                        if (window.location.pathname === '/') {
                            window.location.href = window.location.origin + '/btc' + redirectPath;
                        }
                    });
            });
    }

    redirectBasedOnIP();
});
