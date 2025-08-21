// Authentication functionality

// Initialize auth page
document.addEventListener('DOMContentLoaded', function() {
    setupPasswordStrength();
    setupFormValidation();
});

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const remember = formData.get('remember');
    
    // Validate form
    if (!validateLoginForm(email, password)) {
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Signing In...';
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Simulate login process
    setTimeout(() => {
        // Check if user exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Login successful
            localStorage.setItem('currentUser', JSON.stringify(user));
            if (remember) {
                localStorage.setItem('rememberMe', 'true');
            }
            
            showNotification('Login successful! Welcome back, ' + user.firstName, 'success');
            
            // Redirect to home page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            // Login failed
            showNotification('Invalid email or password. Please try again.', 'error');
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    }, 1500);
}

// Handle register form submission
function handleRegister(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const terms = formData.get('terms');
    const newsletter = formData.get('newsletter');
    
    // Validate form
    if (!validateRegisterForm(firstName, lastName, email, phone, password, confirmPassword, terms)) {
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Creating Account...';
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Simulate registration process
    setTimeout(() => {
        // Check if email already exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(u => u.email === email);
        
        if (existingUser) {
            showNotification('Email already registered. Please use a different email or try logging in.', 'error');
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now(),
            firstName,
            lastName,
            email,
            phone,
            password,
            newsletter: newsletter === 'on',
            createdAt: new Date().toISOString()
        };
        
        // Save user
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Auto login
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        showNotification('Account created successfully! Welcome to ShopEasy, ' + firstName, 'success');
        
        // Redirect to home page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 1500);
}

// Validate login form
function validateLoginForm(email, password) {
    if (!email || !password) {
        showNotification('Please fill in all required fields.', 'error');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    return true;
}

// Validate register form
function validateRegisterForm(firstName, lastName, email, phone, password, confirmPassword, terms) {
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        showNotification('Please fill in all required fields.', 'error');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (!isValidPhone(phone)) {
        showNotification('Please enter a valid phone number.', 'error');
        return false;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters long.', 'error');
        return false;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match.', 'error');
        return false;
    }
    
    if (!terms) {
        showNotification('Please agree to the Terms of Service and Privacy Policy.', 'error');
        return false;
    }
    
    return true;
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone format
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggle = input.parentElement.querySelector('.password-toggle i');
    
    if (input.type === 'password') {
        input.type = 'text';
        toggle.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        toggle.className = 'fas fa-eye';
    }
}

// Setup password strength indicator
function setupPasswordStrength() {
    const passwordInput = document.getElementById('password');
    if (!passwordInput) return;
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        updatePasswordStrengthIndicator(strength);
    });
}

// Calculate password strength
function calculatePasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    if (score <= 1) return 'weak';
    if (score <= 2) return 'fair';
    if (score <= 3) return 'good';
    return 'strong';
}

// Update password strength indicator
function updatePasswordStrengthIndicator(strength) {
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    if (!strengthFill || !strengthText) return;
    
    // Remove all strength classes
    strengthFill.className = 'strength-fill';
    
    // Add current strength class
    strengthFill.classList.add(strength);
    
    // Update text
    const strengthMessages = {
        weak: 'Weak password',
        fair: 'Fair password',
        good: 'Good password',
        strong: 'Strong password'
    };
    
    strengthText.textContent = strengthMessages[strength];
}

// Setup form validation
function setupFormValidation() {
    const inputs = document.querySelectorAll('.auth-form input');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Remove existing error
    clearFieldError(field);
    
    // Validate based on field type
    switch (fieldName) {
        case 'email':
            if (value && !isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
            }
            break;
        case 'phone':
            if (value && !isValidPhone(value)) {
                showFieldError(field, 'Please enter a valid phone number');
            }
            break;
        case 'password':
            if (value && value.length < 6) {
                showFieldError(field, 'Password must be at least 6 characters');
            }
            break;
        case 'confirmPassword':
            const password = document.getElementById('password').value;
            if (value && value !== password) {
                showFieldError(field, 'Passwords do not match');
            }
            break;
    }
}

// Show field error
function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    formGroup.appendChild(errorMessage);
}

// Clear field error
function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Social login handlers
function socialLogin(provider) {
    showNotification(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login is not implemented in this demo.`, 'error');
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'error' ? '#e74c3c' : '#E67E22'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 4000);
}

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Logout user
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');
    window.location.href = 'index.html';
}

// Update header based on login status
function updateHeaderForAuth() {
    const userActions = document.querySelector('.user-actions');
    if (!userActions) return;
    
    if (isLoggedIn()) {
        const user = getCurrentUser();
        userActions.innerHTML = `
            <span class="user-name">Hi, ${user.firstName}</span>
            <a href="orders.html" class="btn btn-outline">Orders</a>
            <button class="btn btn-primary" onclick="logout()">Logout</button>
        `;
    } else {
        userActions.innerHTML = `
            <a href="login.html" class="btn btn-outline">Login</a>
            <a href="register.html" class="btn btn-primary">Register</a>
        `;
    }
}

// Initialize header on page load
document.addEventListener('DOMContentLoaded', function() {
    updateHeaderForAuth();
});

// Add demo user for testing
function addDemoUser() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.length === 0) {
        const demoUser = {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '+62 812-3456-7890',
            password: 'password123',
            newsletter: true,
            createdAt: new Date().toISOString()
        };
        
        users.push(demoUser);
        localStorage.setItem('users', JSON.stringify(demoUser));
    }
}

// Uncomment the line below to add demo user for testing
// addDemoUser();