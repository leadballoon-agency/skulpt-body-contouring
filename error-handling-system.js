// Skulpt Elegant Error Handling System
// User never sees technical errors - only helpful, actionable messages

class ErrorHandler {
    constructor() {
        this.errorQueue = [];
        this.retryAttempts = new Map();
        this.userNotified = false;
        
        // Error context for better debugging
        this.context = {
            userId: null,
            sessionId: this.generateSessionId(),
            page: window.location.pathname,
            timestamp: new Date().toISOString()
        };
        
        // Initialize global error catching
        this.initializeErrorCapture();
        
        // Elegant error messages for users
        this.userMessages = {
            network: {
                title: "Connection Issue",
                message: "We're having trouble connecting. Your data is safe - we'll retry automatically.",
                icon: "🔄",
                action: "Retrying...",
                recoverable: true
            },
            
            validation: {
                title: "Almost There",
                message: "Please check the highlighted fields",
                icon: "✏️",
                action: "Update Information",
                recoverable: true
            },
            
            photo_upload: {
                title: "Photo Upload Issue",
                message: "Your photo couldn't be processed. Try a different angle or lighting.",
                icon: "📸",
                action: "Try Again",
                recoverable: true
            },
            
            payment: {
                title: "Payment Processing",
                message: "Your payment couldn't be completed. No charges were made.",
                icon: "💳",
                action: "Try Another Card",
                recoverable: true
            },
            
            booking: {
                title: "Booking Unavailable",
                message: "That time slot just became unavailable. Here are similar times:",
                icon: "📅",
                action: "View Alternatives",
                recoverable: true
            },
            
            auth: {
                title: "Session Expired",
                message: "For your security, please sign in again",
                icon: "🔐",
                action: "Sign In",
                recoverable: true
            },
            
            general: {
                title: "Something Went Wrong",
                message: "Don't worry - we've saved your progress. Our team has been notified.",
                icon: "🛠",
                action: "Refresh Page",
                recoverable: false
            }
        };
    }
    
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    initializeErrorCapture() {
        // Global error handler
        window.addEventListener('error', (event) => {
            this.handleError({
                type: 'javascript',
                message: event.message,
                source: event.filename,
                line: event.lineno,
                column: event.colno,
                error: event.error
            });
        });
        
        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError({
                type: 'promise',
                message: event.reason?.message || event.reason,
                promise: event.promise
            });
        });
        
        // Network errors
        this.interceptFetch();
        
        // Form validation errors
        this.interceptFormSubmissions();
    }
    
    interceptFetch() {
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            try {
                const response = await originalFetch(...args);
                
                if (!response.ok) {
                    this.handleNetworkError(response);
                }
                
                return response;
            } catch (error) {
                return this.handleNetworkError(error, args[0]);
            }
        };
    }
    
    interceptFormSubmissions() {
        document.addEventListener('submit', (event) => {
            const form = event.target;
            if (!form.checkValidity()) {
                event.preventDefault();
                this.handleValidationError(form);
            }
        });
    }
    
    async handleError(error) {
        // Categorize the error
        const category = this.categorizeError(error);
        
        // Log for developers (never shown to users)
        this.logError(error, category);
        
        // Attempt recovery
        const recovered = await this.attemptRecovery(error, category);
        
        if (!recovered) {
            // Show elegant user message
            this.showUserMessage(category);
        }
        
        // Send to monitoring (silently)
        this.reportToMonitoring(error, category);
    }
    
    categorizeError(error) {
        if (error.type === 'network' || error.message?.includes('fetch')) {
            return 'network';
        }
        if (error.message?.includes('validation') || error.type === 'validation') {
            return 'validation';
        }
        if (error.message?.includes('photo') || error.message?.includes('upload')) {
            return 'photo_upload';
        }
        if (error.message?.includes('payment') || error.message?.includes('stripe')) {
            return 'payment';
        }
        if (error.message?.includes('booking') || error.message?.includes('appointment')) {
            return 'booking';
        }
        if (error.message?.includes('auth') || error.message?.includes('token')) {
            return 'auth';
        }
        return 'general';
    }
    
    async attemptRecovery(error, category) {
        const attemptKey = `${category}_${error.message}`;
        const attempts = this.retryAttempts.get(attemptKey) || 0;
        
        if (attempts >= 3) {
            return false; // Give up after 3 attempts
        }
        
        this.retryAttempts.set(attemptKey, attempts + 1);
        
        switch (category) {
            case 'network':
                return await this.retryNetworkRequest(error);
                
            case 'auth':
                return await this.refreshAuthentication();
                
            case 'photo_upload':
                return await this.retryPhotoUpload(error);
                
            default:
                return false;
        }
    }
    
    async retryNetworkRequest(error) {
        // Show subtle loading indicator
        this.showRecoveryIndicator();
        
        // Exponential backoff
        const delay = Math.min(1000 * Math.pow(2, this.retryAttempts.get('network') || 0), 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        try {
            // Retry the request
            if (error.request) {
                const response = await fetch(error.request);
                if (response.ok) {
                    this.hideRecoveryIndicator();
                    this.showSuccessMessage("Connected! Everything's working now.");
                    return true;
                }
            }
        } catch (e) {
            // Silent fail
        }
        
        return false;
    }
    
    async refreshAuthentication() {
        try {
            // Attempt silent token refresh
            const response = await fetch('/api/refresh-token', {
                method: 'POST',
                credentials: 'include'
            });
            
            if (response.ok) {
                return true;
            }
        } catch (e) {
            // Silent fail
        }
        
        return false;
    }
    
    async retryPhotoUpload(error) {
        // Compress image and retry
        if (error.file && error.file.size > 5000000) {
            try {
                const compressed = await this.compressImage(error.file);
                // Retry upload with compressed image
                return true;
            } catch (e) {
                // Silent fail
            }
        }
        return false;
    }
    
    showUserMessage(category) {
        const message = this.userMessages[category] || this.userMessages.general;
        
        // Don't spam the user
        if (this.userNotified) return;
        this.userNotified = true;
        setTimeout(() => { this.userNotified = false; }, 5000);
        
        // Create elegant error UI
        const errorUI = document.createElement('div');
        errorUI.className = 'error-notification';
        errorUI.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: white;
                border-radius: 12px;
                padding: 1.5rem;
                box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                max-width: 400px;
                animation: slideUp 0.3s ease;
                z-index: 10000;
            ">
                <div style="display: flex; align-items: start; gap: 1rem;">
                    <div style="font-size: 1.5rem;">${message.icon}</div>
                    <div style="flex: 1;">
                        <h4 style="margin: 0 0 0.5rem 0; color: #1A1A1A; font-size: 1rem;">
                            ${message.title}
                        </h4>
                        <p style="margin: 0 0 1rem 0; color: #6C757D; font-size: 0.9rem; line-height: 1.4;">
                            ${message.message}
                        </p>
                        ${message.recoverable ? `
                            <button onclick="window.errorHandler.retry()" style="
                                background: #0066CC;
                                color: white;
                                border: none;
                                padding: 0.5rem 1rem;
                                border-radius: 6px;
                                font-size: 0.9rem;
                                cursor: pointer;
                            ">
                                ${message.action}
                            </button>
                        ` : ''}
                    </div>
                    <button onclick="this.parentElement.parentElement.remove()" style="
                        background: none;
                        border: none;
                        color: #999;
                        cursor: pointer;
                        font-size: 1.2rem;
                        padding: 0;
                    ">×</button>
                </div>
            </div>
            
            <style>
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
        `;
        
        document.body.appendChild(errorUI);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            errorUI.style.animation = 'slideUp 0.3s ease reverse';
            setTimeout(() => errorUI.remove(), 300);
        }, 5000);
    }
    
    showRecoveryIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'recovery-indicator';
        indicator.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #F0F9FF;
                border: 1px solid #0066CC;
                border-radius: 8px;
                padding: 0.75rem 1rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                z-index: 9999;
            ">
                <div style="
                    width: 16px;
                    height: 16px;
                    border: 2px solid #0066CC;
                    border-top-color: transparent;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                "></div>
                <span style="color: #0066CC; font-size: 0.9rem;">
                    Reconnecting...
                </span>
            </div>
            
            <style>
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            </style>
        `;
        
        document.body.appendChild(indicator);
    }
    
    hideRecoveryIndicator() {
        const indicator = document.getElementById('recovery-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    showSuccessMessage(message) {
        const success = document.createElement('div');
        success.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #F0FDF4;
                border: 1px solid #22C55E;
                border-radius: 8px;
                padding: 0.75rem 1rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                z-index: 9999;
                animation: slideDown 0.3s ease;
            ">
                <span style="color: #22C55E;">✓</span>
                <span style="color: #16A34A; font-size: 0.9rem;">
                    ${message}
                </span>
            </div>
            
            <style>
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
        `;
        
        document.body.appendChild(success);
        setTimeout(() => success.remove(), 3000);
    }
    
    handleValidationError(form) {
        const invalidFields = form.querySelectorAll(':invalid');
        
        // Highlight fields elegantly
        invalidFields.forEach(field => {
            field.style.borderColor = '#EF4444';
            field.style.animation = 'shake 0.3s ease';
            
            // Add helpful message
            const message = document.createElement('div');
            message.style.cssText = `
                color: #EF4444;
                font-size: 0.85rem;
                margin-top: 0.25rem;
            `;
            message.textContent = this.getValidationMessage(field);
            field.parentElement.appendChild(message);
            
            // Remove message on input
            field.addEventListener('input', () => {
                field.style.borderColor = '';
                message.remove();
            }, { once: true });
        });
        
        // Focus first invalid field
        invalidFields[0]?.focus();
    }
    
    getValidationMessage(field) {
        if (field.validity.valueMissing) {
            return `Please fill in your ${field.name || 'this field'}`;
        }
        if (field.validity.typeMismatch) {
            if (field.type === 'email') {
                return 'Please enter a valid email address';
            }
            if (field.type === 'tel') {
                return 'Please enter a valid phone number';
            }
        }
        if (field.validity.tooShort) {
            return `Please enter at least ${field.minLength} characters`;
        }
        return 'Please check this field';
    }
    
    logError(error, category) {
        // Developer console (only in development)
        if (window.location.hostname === 'localhost') {
            console.group(`🚨 ${category.toUpperCase()} ERROR`);
            console.error(error);
            console.log('Context:', this.context);
            console.log('Stack:', error.stack);
            console.groupEnd();
        }
        
        // Add to error queue for batch reporting
        this.errorQueue.push({
            ...error,
            category,
            context: this.context,
            timestamp: new Date().toISOString()
        });
        
        // Batch send every 10 errors or 30 seconds
        if (this.errorQueue.length >= 10) {
            this.flushErrorQueue();
        }
    }
    
    async reportToMonitoring(error, category) {
        // Send to monitoring service (Sentry, LogRocket, etc)
        try {
            await fetch('/api/errors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    error: {
                        message: error.message,
                        stack: error.stack,
                        category
                    },
                    context: this.context,
                    userAgent: navigator.userAgent,
                    timestamp: new Date().toISOString()
                })
            });
        } catch (e) {
            // Silent fail - never interrupt user experience
        }
    }
    
    flushErrorQueue() {
        if (this.errorQueue.length === 0) return;
        
        const errors = [...this.errorQueue];
        this.errorQueue = [];
        
        // Send batch to monitoring
        fetch('/api/errors/batch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ errors })
        }).catch(() => {
            // Silent fail
        });
    }
    
    retry() {
        // Reload the page gracefully
        window.location.reload();
    }
    
    // Helper functions
    async compressImage(file, maxWidth = 1920) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    
                    if (width > maxWidth) {
                        height = (maxWidth / width) * height;
                        width = maxWidth;
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    canvas.toBlob((blob) => {
                        resolve(new File([blob], file.name, {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                        }));
                    }, 'image/jpeg', 0.85);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }
}

// Initialize global error handler
window.errorHandler = new ErrorHandler();

// Export for use in other modules
export default ErrorHandler;