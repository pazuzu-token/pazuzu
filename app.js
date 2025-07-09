// Pazuzu Meme Coin Website JavaScript - Updated for Solana

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initWalletModal();
    initRealtimeFollowerCounts();
    initButtonEffects();
    initScrollEffects();
    initParticleEffects();
    initImageErrorHandling();
    initCoinAnimation();
});

// Handle image loading errors
function initImageErrorHandling() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace with placeholder if image fails to load
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMWEwYTFhIiBzdHJva2U9IiNmZmQ3MDAiIHN0cm9rZS13aWR0aD0iMiIvPgo8dGV4dCB4PSIxMDAiIHk9IjEwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZDcwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2Ij5QQVpVWlU8L3RleHQ+Cjwvc3ZnPgo=';
        });
    });
}

// Smooth scrolling navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Solana wallet connection modal
function initWalletModal() {
    const walletButton = document.querySelector('.wallet-connect');
    const modal = document.getElementById('wallet-modal');
    const closeButton = document.querySelector('.modal__close');
    const walletOptions = document.querySelectorAll('.wallet-option');
    
    // Open modal
    if (walletButton) {
        walletButton.addEventListener('click', function() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close modal
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Handle wallet selection
    walletOptions.forEach(option => {
        option.addEventListener('click', function() {
            const walletName = this.textContent;
            showSolanaWalletConnection(walletName);
        });
    });
}

// Simulate Solana wallet connection
function showSolanaWalletConnection(walletName) {
    const modal = document.getElementById('wallet-modal');
    const modalBody = document.querySelector('.modal__body');
    
    modalBody.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="font-size: 3rem; margin-bottom: 16px;">⚡</div>
            <h3 style="color: #ffd700; margin-bottom: 16px;">Connecting to ${walletName}...</h3>
            <div class="loading-spinner"></div>
        </div>
    `;
    
    setTimeout(() => {
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <div style="font-size: 3rem; margin-bottom: 16px;">✅</div>
                <h3 style="color: #00ff00; margin-bottom: 16px;">Connected to Solana!</h3>
                <p style="color: #f5f5f5; margin-bottom: 16px;">Wallet Address:</p>
                <code style="color: #ffd700; font-size: 12px; word-break: break-all;">4M1hXdVdVKnqxAqVuVjuTUK6XjWzGpRjN2kFP8vJ9F2w</code>
                <div style="margin-top: 20px;">
                    <button class="btn btn--primary" onclick="closeModal()">Start Trading on Solana</button>
                </div>
            </div>
        `;
    }, 2000);
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('wallet-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Real-time follower count animation
function initRealtimeFollowerCounts() {
    const twitterCount = document.getElementById('twitter-count');
    const telegramCount = document.getElementById('telegram-count');
    
    // Starting values
    let twitterFollowers = 15632;
    let telegramMembers = 8247;
    
    // Animate counts incrementally
    function updateCounts() {
        // Twitter - increment by 1-3 every 5-10 seconds
        if (Math.random() < 0.7) {
            twitterFollowers += Math.floor(Math.random() * 3) + 1;
            if (twitterCount) {
                twitterCount.textContent = twitterFollowers.toLocaleString();
            }
        }
        
        // Telegram - increment by 1-2 every 8-15 seconds
        if (Math.random() < 0.5) {
            telegramMembers += Math.floor(Math.random() * 2) + 1;
            if (telegramCount) {
                telegramCount.textContent = telegramMembers.toLocaleString();
            }
        }
    }
    
    // Update counts every 6 seconds
    setInterval(updateCounts, 6000);
    
    // Initial count animation
    const animateCounter = (element, target, duration = 2000) => {
        const start = Math.floor(target * 0.8);
        const increment = (target - start) / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const formattedNumber = Math.floor(current).toLocaleString();
            element.textContent = formattedNumber;
        }, 16);
    };
    
    // Animate initial counts when visible
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'twitter-count') {
                    animateCounter(entry.target, twitterFollowers);
                } else if (entry.target.id === 'telegram-count') {
                    animateCounter(entry.target, telegramMembers);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (twitterCount) observer.observe(twitterCount);
    if (telegramCount) observer.observe(telegramCount);
}

// Coin animation effects
function initCoinAnimation() {
    const coinImage = document.querySelector('.hero__coin-image');
    
    if (coinImage) {
        // Add hover effect
        coinImage.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.1) rotateY(180deg)';
        });
        
        coinImage.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = 'scale(1)';
        });
    }
}

// Button effects
function initButtonEffects() {
    const buyButton = document.querySelector('.buy-button');
    const joinButton = document.querySelector('.join-button');
    
    if (buyButton) {
        buyButton.addEventListener('click', function(e) {
            e.preventDefault();
            showSolanaBuyModal();
        });
    }
    
    if (joinButton) {
        joinButton.addEventListener('click', function(e) {
            e.preventDefault();
            showJoinModal();
        });
    }
    
    // Add click effects to all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
}

// Show Solana buy modal
function showSolanaBuyModal() {
    const modal = document.getElementById('wallet-modal');
    const modalContent = document.querySelector('.modal__content');
    
    modalContent.innerHTML = `
        <div class="modal__header">
            <h3>Buy $PAZUZU on Solana</h3>
            <button class="modal__close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal__body">
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 3rem; margin-bottom: 16px;">👹</div>
                <h3 style="color: #ffd700; margin-bottom: 16px;">Summon Your Pazuzu Tokens!</h3>
                <p style="color: #f5f5f5; margin-bottom: 20px;">Available on Solana DEXs</p>
            </div>
            <div style="margin-bottom: 20px;">
                <p style="color: #ffd700; font-size: 14px; margin-bottom: 12px;">Program ID:</p>
                <div style="background: rgba(0,0,0,0.8); padding: 12px; border-radius: 8px; border: 1px solid #ffd700;">
                    <code style="color: #ffd700; font-size: 12px; word-break: break-all;">4M1hXdVdVKnqxAqVuVjuTUK6XjWzGpRjN2kFP8vJ9F2w</code>
                </div>
            </div>
            <div style="margin-bottom: 20px;">
                <p style="color: #ccc; font-size: 14px;">✅ Lightning-fast Solana transactions</p>
                <p style="color: #ccc; font-size: 14px;">✅ Low fees compared to Ethereum</p>
                <p style="color: #ccc; font-size: 14px;">✅ Ancient demon protection</p>
            </div>
            <button class="btn btn--primary" style="width: 100%; margin-bottom: 12px;" onclick="processSolanaBuy()">Buy on Raydium</button>
            <button class="btn btn--secondary" style="width: 100%;" onclick="closeModal()">Cancel</button>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Show join modal (updated for Twitter and Telegram only)
function showJoinModal() {
    const modal = document.getElementById('wallet-modal');
    const modalContent = document.querySelector('.modal__content');
    
    modalContent.innerHTML = `
        <div class="modal__header">
            <h3>Join the Demon Army</h3>
            <button class="modal__close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal__body">
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 3rem; margin-bottom: 16px;">⚔️</div>
                <h3 style="color: #ffd700; margin-bottom: 16px;">Choose Your Platform</h3>
                <p style="color: #f5f5f5; margin-bottom: 20px;">Join thousands of demon warriors in the battle against Labubu!</p>
            </div>
            <div class="social-links-grid">
                <a href="https://x.com/PazuzuToken?t=rGSm6xRAzDGcvIagPXybLQ&s=08" class="social-link" style="display: flex; align-items: center; justify-content: center; padding: 16px; margin-bottom: 12px; text-decoration: none;" target="_blank">
                    <span style="margin-right: 8px;">🐦</span>
                    Follow on Twitter
                </a>
                <a href="https://t.me/PazuzuCoin" class="social-link" style="display: flex; align-items: center; justify-content: center; padding: 16px; margin-bottom: 12px; text-decoration: none;" target="_blank">
                    <span style="margin-right: 8px;">📱</span>
                    Join Telegram
                </a>
            </div>
            <div style="margin-top: 20px; text-align: center;">
                <p style="color: #ccc; font-size: 14px;">Contact us: <a href="mailto:pazuzu.token@gmail.com" style="color: #ffd700;">pazuzu.token@gmail.com</a></p>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Process Solana buy transaction
function processSolanaBuy() {
    const modal = document.getElementById('wallet-modal');
    const modalBody = document.querySelector('.modal__body');
    
    modalBody.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="font-size: 3rem; margin-bottom: 16px;">⚡</div>
            <h3 style="color: #ffd700; margin-bottom: 16px;">Summoning Pazuzu Tokens...</h3>
            <div class="loading-spinner"></div>
            <p style="color: #ccc; margin-top: 16px;">Processing on Solana blockchain...</p>
        </div>
    `;
    
    setTimeout(() => {
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <div style="font-size: 3rem; margin-bottom: 16px;">🎉</div>
                <h3 style="color: #00ff00; margin-bottom: 16px;">Demons Summoned!</h3>
                <p style="color: #f5f5f5; margin-bottom: 16px;">Transaction successful on Solana!</p>
                <div style="background: rgba(0,0,0,0.8); padding: 16px; border-radius: 8px; margin-bottom: 20px;">
                    <p style="color: #ffd700; margin-bottom: 8px;">You received: <strong>1,000,000 $PAZUZU</strong></p>
                    <p style="color: #ccc; font-size: 12px;">TX Hash: 5j7K8L9M0N1O2P3Q4R5S6T7U8V9W0X1Y2Z3A4B5C6D7E8F9G0H...</p>
                </div>
                <button class="btn btn--primary" onclick="closeModal()">Continue Trading</button>
            </div>
        `;
    }, 3000);
}

// Scroll effects
function initScrollEffects() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Animate roadmap phases
                if (entry.target.id === 'roadmap') {
                    animateRoadmapPhases();
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Animate roadmap phases
function animateRoadmapPhases() {
    const phases = document.querySelectorAll('.roadmap__phase');
    
    phases.forEach((phase, index) => {
        phase.style.transform = 'translateY(20px)';
        phase.style.opacity = '0.8';
        
        setTimeout(() => {
            phase.style.transform = 'translateY(0)';
            phase.style.opacity = '1';
        }, index * 300);
    });
}

// Particle effects
function initParticleEffects() {
    createFloatingParticles();
    createLightningEffects();
}

// Create floating particles
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #ffd700;
            border-radius: 50%;
            animation: float ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${0.3 + Math.random() * 0.7};
        `;
        
        particleContainer.appendChild(particle);
    }
    
    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        
        .loading-spinner {
            border: 3px solid rgba(255, 215, 0, 0.3);
            border-top: 3px solid #ffd700;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(style);
}

// Lightning effects for battle section
function createLightningEffects() {
    const battleSection = document.querySelector('.battle');
    
    if (battleSection) {
        setInterval(() => {
            const lightning = document.createElement('div');
            lightning.style.cssText = `
                position: absolute;
                width: 2px;
                height: 100px;
                background: linear-gradient(to bottom, #fff, #ffd700, transparent);
                left: ${Math.random() * 100}%;
                top: 0;
                animation: lightning-flash 0.5s ease-out;
                pointer-events: none;
            `;
            
            battleSection.appendChild(lightning);
            
            setTimeout(() => {
                lightning.remove();
            }, 500);
        }, 3000 + Math.random() * 5000);
    }
    
    // Add lightning animation CSS
    const lightningStyle = document.createElement('style');
    lightningStyle.textContent = `
        @keyframes lightning-flash {
            0% { opacity: 0; transform: scaleY(0); }
            50% { opacity: 1; transform: scaleY(1); }
            100% { opacity: 0; transform: scaleY(0); }
        }
    `;
    
    document.head.appendChild(lightningStyle);
}

// Dynamic typing effect for hero title
function initTypingEffect() {
    const title = document.querySelector('.hero__title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        typeWriter();
    }
}

// Battle animation
function initBattleAnimation() {
    const pazuzuSide = document.querySelector('.battle__side--pazuzu');
    const labubuSide = document.querySelector('.battle__side--labubu');
    
    if (pazuzuSide && labubuSide) {
        setInterval(() => {
            // Pazuzu power pulse
            pazuzuSide.style.boxShadow = '0 0 50px rgba(255, 215, 0, 0.8)';
            setTimeout(() => {
                pazuzuSide.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.3)';
            }, 500);
            
            // Labubu weakening effect
            setTimeout(() => {
                labubuSide.style.opacity = '0.7';
                setTimeout(() => {
                    labubuSide.style.opacity = '1';
                }, 300);
            }, 1000);
        }, 4000);
    }
}

// Initialize battle animation
setTimeout(initBattleAnimation, 1000);

// Solana network status simulation
function initSolanaNetworkStatus() {
    const networkStatus = document.createElement('div');
    networkStatus.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        color: #00ff00;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        z-index: 999;
        border: 1px solid #00ff00;
    `;
    networkStatus.innerHTML = '🟢 Solana Network: Active';
    document.body.appendChild(networkStatus);
    
    // Simulate network activity
    setInterval(() => {
        const tps = Math.floor(Math.random() * 1000) + 2000;
        networkStatus.innerHTML = `🟢 Solana Network: ${tps} TPS`;
    }, 5000);
}

// Initialize Solana network status
initSolanaNetworkStatus();

// Smooth scroll behavior for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation when page loads
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Initialize typing effect after page loads
    setTimeout(initTypingEffect, 500);
});

// Responsive navigation toggle (for mobile)
function initMobileNav() {
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    
    if (header && nav) {
        // Create mobile menu toggle button
        const toggleButton = document.createElement('button');
        toggleButton.innerHTML = '☰';
        toggleButton.className = 'mobile-nav-toggle';
        toggleButton.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: #ffd700;
            font-size: 24px;
            cursor: pointer;
            padding: 8px;
        `;
        
        header.querySelector('.container').appendChild(toggleButton);
        
        // Toggle mobile menu
        toggleButton.addEventListener('click', function() {
            nav.classList.toggle('nav-open');
        });
    }
    
    // Add mobile styles
    const mobileStyle = document.createElement('style');
    mobileStyle.textContent = `
        @media (max-width: 768px) {
            .mobile-nav-toggle {
                display: block !important;
            }
            
            .nav {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(10, 10, 10, 0.98);
                transform: translateY(-100%);
                opacity: 0;
                transition: all 0.3s ease;
                pointer-events: none;
            }
            
            .nav.nav-open {
                transform: translateY(0);
                opacity: 1;
                pointer-events: auto;
            }
            
            .nav__list {
                flex-direction: column;
                padding: 20px;
                gap: 16px;
            }
        }
    `;
    
    document.head.appendChild(mobileStyle);
}

// Initialize mobile navigation
initMobileNav();

// Add email link functionality
function initEmailLink() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Analytics or tracking can be added here
            console.log('Email link clicked:', this.href);
        });
    });
}

// Initialize email links
initEmailLink();

// Solana price ticker simulation (optional)
function initSolanaTokenTicker() {
    const ticker = document.createElement('div');
    ticker.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(0, 0, 0, 0.9);
        color: #ffd700;
        padding: 10px 15px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 999;
        border: 1px solid #ffd700;
        font-family: monospace;
    `;
    
    let price = 0.00073;
    
    function updateTicker() {
        const change = (Math.random() - 0.5) * 0.00001;
        price = Math.max(0.00001, price + change);
        const changePercent = (Math.random() * 20 - 10).toFixed(2);
        const color = changePercent > 0 ? '#00ff00' : '#ff0000';
        
        ticker.innerHTML = `
            $PAZUZU: $${price.toFixed(5)} 
            <span style="color: ${color};">${changePercent > 0 ? '+' : ''}${changePercent}%</span>
        `;
    }
    
    updateTicker();
    document.body.appendChild(ticker);
    
    // Update every 3 seconds
    setInterval(updateTicker, 3000);
}

// Initialize Solana token ticker
initSolanaTokenTicker();