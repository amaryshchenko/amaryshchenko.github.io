document.addEventListener("DOMContentLoaded", () => {
    // Current time for the dossier header
    const timeElement = document.getElementById('current-time');
    
    function updateTime() {
        const now = new Date();
        timeElement.textContent = `SYS_TIME: ${now.toISOString().replace('T', ' ').substring(0, 19)}Z`;
    }
    updateTime();
    setInterval(updateTime, 1000);

    // Decryption effect setup
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+<>?';
    
    class TextDecryptor {
        constructor(element) {
            this.element = element;
            this.originalText = element.getAttribute('data-text') || element.textContent;
            this.element.textContent = '';
            this.iterations = 0;
        }

        decrypt() {
            let interval = setInterval(() => {
                this.element.textContent = this.originalText
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' ';
                        if (index < this.iterations) {
                            return this.originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');

                if (this.iterations >= this.originalText.length) {
                    clearInterval(interval);
                    this.element.textContent = this.originalText;
                }

                this.iterations += 1/3; 
            }, 30);
        }
    }

    // Initialize decryption for overlay elements
    const overlayElements = document.querySelectorAll('#classification-overlay .decrypt');
    overlayElements.forEach(el => new TextDecryptor(el).decrypt());

    // Handle overlay removal and main dossier reveal
    setTimeout(() => {
        const overlay = document.getElementById('classification-overlay');
        overlay.style.opacity = '0';
        
        setTimeout(() => {
            overlay.style.display = 'none';
            document.querySelector('.dossier-container').style.opacity = '1';
            
            // Reveal UV scanner
            const btnUv = document.getElementById('btn-uv');
            if (btnUv) btnUv.classList.add('uv-visible');
            
            // Decrypt dossier elements
            const dossierElements = document.querySelectorAll('.dossier-container .decrypt');
            dossierElements.forEach(el => new TextDecryptor(el).decrypt());

            // Random Glitch Effect
            startRandomGlitch();
        }, 1500);
    }, 2500);

    // Redacted text hover effect
    const redactedElements = document.querySelectorAll('.redacted');
    redactedElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            const revealText = this.getAttribute('data-reveal');
            if (revealText && this.textContent !== revealText) {
                this.dataset.original = this.textContent;
                this.textContent = revealText;
            }
        });
        
        el.addEventListener('mouseleave', function() {
            if (this.dataset.original) {
                this.textContent = this.dataset.original;
            }
        });
    });

    // Biometric Scanner Logic
    const scanner = document.getElementById('biometric-scanner');
    const progressBar = document.getElementById('auth-progress');
    const authStatus = document.getElementById('auth-status');
    const securePayload = document.getElementById('secure-payload');
    let authTimer;
    let decreaseTimer;
    let progress = 0;
    let isUnlocked = false;

    if (scanner) {
        const startAuth = () => {
            if (isUnlocked) return;
            clearInterval(decreaseTimer);
            scanner.classList.add('scanning');
            authStatus.textContent = 'ANALYZING BIOMETRIC SIGNATURE...';
            
            authTimer = setInterval(() => {
                progress += 1.5; // fill speed
                if (progress > 100) progress = 100;
                progressBar.style.width = progress + '%';
                
                if (progress === 100) {
                    clearInterval(authTimer);
                    unlockPayload();
                }
            }, 30);
        };

        const stopAuth = () => {
            if (isUnlocked) return;
            clearInterval(authTimer);
            scanner.classList.remove('scanning');
            authStatus.textContent = 'AUTH ABORTED. AWAITING INPUT...';
            
            decreaseTimer = setInterval(() => {
                progress -= 3; // drain speed
                if (progress <= 0) {
                    progress = 0;
                    clearInterval(decreaseTimer);
                }
                progressBar.style.width = progress + '%';
            }, 30);
        };

        const unlockPayload = () => {
            isUnlocked = true;
            scanner.classList.remove('scanning');
            scanner.style.display = 'none';
            progressBar.parentElement.style.display = 'none';
            authStatus.style.display = 'none';
            
            securePayload.style.display = 'block';
            securePayload.querySelectorAll('.decrypt-late').forEach(el => {
                new TextDecryptor(el).decrypt();
            });
        };

        scanner.addEventListener('mousedown', startAuth);
        document.addEventListener('mouseup', stopAuth);
        
        scanner.addEventListener('touchstart', (e) => { e.preventDefault(); startAuth(); });
        document.addEventListener('touchend', stopAuth);
    }

    // Simple random glitch effect for DOC_ID
    function startRandomGlitch() {
        const glitchEl = document.querySelector('.glitch');
        if(!glitchEl) return;
        const originalText = glitchEl.getAttribute('data-text');
        
        setInterval(() => {
            if(Math.random() > 0.8) {
                glitchEl.textContent = originalText.replace(/[A-Z0-9]/, chars[Math.floor(Math.random() * chars.length)]);
                glitchEl.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
                glitchEl.style.color = Math.random() > 0.5 ? 'var(--accent-red)' : '#fff';
                
                setTimeout(() => {
                    glitchEl.textContent = originalText;
                    glitchEl.style.transform = 'none';
                    glitchEl.style.color = 'var(--text-muted)';
                }, 150);
            }
        }, 2000);
    }

    // Purge Easter Egg
    const purgeBtn = document.getElementById('btn-purge');
    if (purgeBtn) {
        purgeBtn.addEventListener('click', () => {
            if(!confirm("WARNING: AUTHORIZE SECURE PURGE PROTOCOL?")) return;

            // Redact all text slowly
            document.querySelectorAll('h1, h2, h3, p, span, td, a, .barcode, .cap-item, .log-entry').forEach(el => {
                if (!el.classList.contains('scanlines') && el.id !== 'classification-overlay' && document.body.contains(el)) {
                    setTimeout(() => {
                        el.style.backgroundColor = 'var(--text-primary)';
                        el.style.color = 'var(--text-primary)';
                        el.style.borderColor = 'var(--text-primary)';
                        el.style.transition = 'all 0.1s';
                    }, Math.random() * 800);
                }
            });

            // Wipe out page
            setTimeout(() => {
                document.body.innerHTML = '<div class="scanlines"></div><h1 class="flash-text" style="color:var(--accent-red); text-align:center; margin-top:40vh; font-family:\'IBM Plex Mono\', monospace; font-size:3rem; letter-spacing:0.2em;">DOSSIER PURGED.</h1>';
            }, 1500);
        });
    }


    /* System diagnostics removed */

    // Web Audio API for UI haptic sounds
    let audioCtx;
    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }
    document.body.addEventListener('click', initAudio, { once: true });

    function playBlip(freq, type, duration, vol) {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    }

    // Hover sounds for interactive elements
    document.querySelectorAll('.secure-link, .intel-tooltip, .redacted').forEach(el => {
        el.addEventListener('mouseenter', () => playBlip(800, 'sine', 0.05, 0.01));
    });

    // Success sound hook for scanner
    if (scanner) {
        const checkUnlock = () => {
            if (isUnlocked && audioCtx) {
                // Play success beep only once when unlocked
                if(!scanner.dataset.beeped) {
                    playBlip(1200, 'sine', 0.3, 0.03);
                    scanner.dataset.beeped = "true";
                }
            }
        };
        document.addEventListener('mouseup', checkUnlock);
    }

    // Threat Ticker Close Logic
    const tickerClose = document.getElementById('close-ticker');
    const threatTicker = document.getElementById('threat-ticker');
    if (tickerClose && threatTicker) {
        tickerClose.addEventListener('click', () => {
            threatTicker.style.display = 'none';
        });
    }

    // UV Scanner Toggle
    const btnUv = document.getElementById('btn-uv');
    if (btnUv) {
        btnUv.addEventListener('click', () => {
            document.body.classList.toggle('uv-mode');
        });
    }
});
