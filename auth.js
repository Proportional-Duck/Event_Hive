/**
 * Event-Hive Authentication System
 * Handles multi-role authentication: Admin, Customer, Vendor, and Guest
 */

// Authentication state management
const AUTH_CONFIG = {
    SESSION_KEY: 'eventhive_session',
    ROLES: {
        ADMIN: 'admin',
        ORGANIZER: 'organizer',
        VENDOR: 'vendor',
        STAFF: 'staff',
        SPONSOR: 'sponsor',
        ATTENDEE: 'attendee'
    }
};

/**
 * Demo Credentials - Replace with actual API authentication
 */
const DEMO_USERS = {
    admin: {
        username: 'admin',
        password: 'admin123',
        pin: '123456',
        role: 'admin',
        name: 'System Administrator'
    },
    organizers: [
        {
            email: 'user@example.com',
            password: 'user123',
            role: 'organizer',
            name: 'John Doe',
            customerId: 'CUST001',
            guestCode: '123456' // This customer's unique code for guests
        }
    ],
    vendors: [
        {
            vendorId: 'vendor123',
            password: 'vendor123',
            role: 'vendor',
            name: 'Elite Catering Services',
            businessName: 'Elite Catering',
            category: 'Catering'
        }
    ],
    staff: [
        {
            staffId: 'staff001',
            password: 'staff123',
            role: 'staff',
            name: 'Alice Waiter',
            type: 'Waitstaff',
            shift: 'Evening'
        }
    ],
    sponsors: [
        {
            sponsorId: 'sponsor001',
            password: 'sponsor123',
            role: 'sponsor',
            name: 'TechCorp Inc.',
            tier: 'Platinum'
        }
    ],
    guestCodes: {
        '123456': {
            eventId: 'wedding-001',
            eventName: "Sarah & Michael's Wedding",
            customerId: 'CUST001',
            validUntil: '2026-02-15'
        }
    }
};

/**
 * Session Management
 */
class SessionManager {
    static SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

    static createSession(userData) {
        const session = {
            ...userData,
            loginTime: new Date().toISOString(),
            lastActive: Date.now(),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        };
        
        sessionStorage.setItem(AUTH_CONFIG.SESSION_KEY, JSON.stringify(session));
        return session;
    }
    
    static getSession() {
        const sessionData = sessionStorage.getItem(AUTH_CONFIG.SESSION_KEY);
        if (!sessionData) return null;
        
        const session = JSON.parse(sessionData);
        
        // Check inactivity
        if (Date.now() - session.lastActive > this.SESSION_TIMEOUT) {
            this.clearSession();
            return null;
        }

        // Check expiration
        if (new Date(session.expiresAt) < new Date()) {
            this.clearSession();
            return null;
        }
        
        // Update activity
        session.lastActive = Date.now();
        sessionStorage.setItem(AUTH_CONFIG.SESSION_KEY, JSON.stringify(session));
        
        return session;
    }
    
    static clearSession() {
        sessionStorage.removeItem(AUTH_CONFIG.SESSION_KEY);
    }
    
    static isAuthenticated() {
        return this.getSession() !== null;
    }
}

/**
 * Authentication Functions
 */
function login(email, password) {
    const user = DataStore.getUserByEmail(email);
    
    if (user && user.password === password) {
        // Don't include password in session
        const { password: _, ...userSafe } = user;
        SessionManager.createSession(userSafe);
        return { success: true, user: userSafe };
    }
    
    return { success: false, error: 'Invalid email or password' };
}

function register(userData) {
    const existing = DataStore.getUserByEmail(userData.email);
    if (existing) {
        return { success: false, error: 'User already exists' };
    }
    
    const newUser = DataStore.saveUser(userData);
    return { success: true, user: newUser };
}

function updateProfile(updatedData) {
    const session = SessionManager.getSession();
    if (!session) return { success: false, error: 'Not authenticated' };

    const user = DataStore.getUserByEmail(session.email);
    const updatedUser = DataStore.saveUser({ ...user, ...updatedData });
    
    // Update session
    const { password: _, ...userSafe } = updatedUser;
    SessionManager.createSession(userSafe);
    
    return { success: true, user: userSafe };
}

/**
 * Page Protection
 */
function requireAuth(allowedRoles = []) {
    const session = SessionManager.getSession();
    
    if (!session) {
        window.location.href = 'login.html';
        return false;
    }
    
    if (allowedRoles.length > 0 && !allowedRoles.includes(session.role)) {
        redirectToDashboard(session.role);
        return false;
    }
    
    return true;
}

function redirectToDashboard(role) {
    const dashboards = {
        admin: 'admin.html',
        organizer: 'dashboard.html',
        vendor: 'vendor-dashboard.html',
        staff: 'staff-dashboard.html',
        sponsor: 'sponsor-dashboard.html',
        attendee: 'guest-view.html'
    };
    
    window.location.href = dashboards[role] || 'login.html';
}

/**
 * Logout Function
 */
function logout() {
    SessionManager.clearSession();
    window.location.href = 'index.html';
}

/**
 * Generate Unique Guest Code (for customers)
 */
function generateGuestCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Utility Functions
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fa-solid fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Export for use in other files
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SessionManager,
        authenticateAdmin,
        authenticateCustomer,
        authenticateVendor,
        authenticateGuest,
        requireAuth,
        logout,
        generateGuestCode,
        DEMO_USERS
    };
}
