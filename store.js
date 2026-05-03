/**
 * EventHive Central Data Store (Stable Demo Version)
 */

const EH_KEYS = {
    USERS: 'eh_users',
    EVENTS: 'eh_events',
    TASKS: 'eh_tasks',
    BOOKINGS: 'eh_bookings',
    OFFERS: 'eh_offers', // Added for sponsors
    SESSIONS: 'eh_sessions', // Added for organizers taking sessions
    CURRENT_USER: 'currentUser'
};

class DataStore {
    static _load(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('DataStore load error', e);
            return null;
        }
    }

    static _save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // Basic Getters
    static getUsers() { return this._load(EH_KEYS.USERS) || []; }
    static getEvents() { return this._load(EH_KEYS.EVENTS) || []; }
    static getTasks() { return this._load(EH_KEYS.TASKS) || []; }
    static getBookings() { return this._load(EH_KEYS.BOOKINGS) || []; }
    static getOffers() { return this._load(EH_KEYS.OFFERS) || []; }
    static getSessions() { return this._load(EH_KEYS.SESSIONS) || []; }

    // User Management
    static saveUser(user) {
        const users = this.getUsers();
        const idx = users.findIndex(u => u.email === user.email);
        if (idx >= 0) users[idx] = { ...users[idx], ...user };
        else { user.id = 'U' + Date.now(); users.push(user); }
        this._save(EH_KEYS.USERS, users);
        return user;
    }

    // Event Management
    static addEvent(event) {
        const events = this.getEvents();
        event.id = 'E' + Date.now() + Math.floor(Math.random() * 1000);
        event.status = event.status || 'Active';
        event.code = event.code || Math.random().toString(36).substring(2, 8).toUpperCase();
        events.push(event);
        this._save(EH_KEYS.EVENTS, events);
    }

    // Task Management
    static addTask(task) {
        const tasks = this.getTasks();
        task.id = 'T' + Date.now();
        task.status = task.status || 'todo';
        tasks.unshift(task);
        this._save(EH_KEYS.TASKS, tasks);
    }

    static updateTaskStatus(id, status) {
        const tasks = this.getTasks();
        const t = tasks.find(item => item.id === id);
        if (t) { t.status = status; this._save(EH_KEYS.TASKS, tasks); }
    }

    // Booking Management
    static addBooking(booking) {
        const b = this.getBookings();
        booking.id = 'B' + Date.now();
        b.push(booking);
        this._save(EH_KEYS.BOOKINGS, b);
    }

    // Offer Management (Sponsors)
    static addOffer(offer) {
        const o = this.getOffers();
        offer.id = 'O' + Date.now();
        o.push(offer);
        this._save(EH_KEYS.OFFERS, o);
    }

    // Session Management (Organizers)
    static addSession(session) {
        const s = this.getSessions();
        session.id = 'S' + Date.now();
        s.push(session);
        this._save(EH_KEYS.SESSIONS, s);
    }

    static updateSessionStatus(id, status) {
        const s = this.getSessions();
        const item = s.find(i => i.id === id);
        if (item) { item.status = status; this._save(EH_KEYS.SESSIONS, s); }
    }

    static init() {
        if (!localStorage.getItem(EH_KEYS.USERS)) {
            console.log('Initializing Rich Demo Environment...');
            
            // Users
            this.saveUser({ email: 'admin@eh.com', name: 'Alex Superadmin', role: 'admin' });
            this.saveUser({ email: 'org@eh.com', name: 'Sarah Planner', role: 'organizer' });
            this.saveUser({ email: 'org2@eh.com', name: 'James Orchestrator', role: 'organizer' });
            this.saveUser({ email: 'vendor@eh.com', name: 'George Gourmet', role: 'store' });
            this.saveUser({ email: 'vendor2@eh.com', name: 'PixelPerfect Photography', role: 'store' });
            this.saveUser({ email: 'staff@eh.com', name: 'Mike Shift', role: 'employee' });
            this.saveUser({ email: 'staff2@eh.com', name: 'Emma Coordination', role: 'employee' });
            this.saveUser({ email: 'sponsor@eh.com', name: 'TechCorp HQ', role: 'sponsor' });
            this.saveUser({ email: 'sponsor2@eh.com', name: 'Global Finance Inc.', role: 'sponsor' });
            this.saveUser({ email: 'attendee@eh.com', name: 'Jane Guest', role: 'attendee' });

            // Sessions (Organizer Pre-Planning)
            this.addSession({ title: 'Q3 Product Strategy Sync', client: 'Acme Corp', date: '2026-05-10', status: 'Completed' });
            this.addSession({ title: 'Gala Budget Planning', client: 'Charity Org', date: '2026-08-01', status: 'Active' });
            this.addSession({ title: 'Vendor Selection Meeting', client: 'Internal', date: '2026-05-12', status: 'Active' });

            // Events
            this.addEvent({ name: 'Web Dev Summit 2026', date: '2026-05-15', status: 'Active', code: 'DEMO26', sessionId: 'S1' });
            this.addEvent({ name: 'Corporate Gala', date: '2026-08-20', status: 'Draft', sessionId: 'S2' });
            this.addEvent({ name: 'Outdoor Music Fest', date: '2026-07-04', status: 'Active', sessionId: null });
            this.addEvent({ name: 'Annual Sales Meeting', date: '2026-06-10', status: 'Completed' });
            this.addEvent({ name: 'Winter Holiday Ball', date: '2026-12-15', status: 'Draft' });
            this.addEvent({ name: 'Startup Pitch Night', date: '2026-09-05', status: 'Active' });
            this.addEvent({ name: 'Charity Auction', date: '2026-11-20', status: 'Active' });
            this.addEvent({ name: 'Design Conference', date: '2026-10-12', status: 'Active' });

            // Tasks
            this.addTask({ text: 'Confirm Venue Security', assignee: 'Sarah P', status: 'todo' });
            this.addTask({ text: 'Setup AV Equipment', assignee: 'Mike S', status: 'done' });
            this.addTask({ text: 'Finalize Catering Menu', assignee: 'George G', status: 'todo' });
            this.addTask({ text: 'Print Guest Passes', assignee: 'Mike S', status: 'todo' });
            this.addTask({ text: 'Coordinate with Speakers', assignee: 'James O', status: 'todo' });
            this.addTask({ text: 'Draft Opening Speech', assignee: 'Sarah P', status: 'done' });
            this.addTask({ text: 'Hire Extra Waitstaff', assignee: 'George G', status: 'todo' });
            this.addTask({ text: 'Check Sound System', assignee: 'Emma C', status: 'todo' });
            this.addTask({ text: 'Set Up Registration Desk', assignee: 'Emma C', status: 'done' });
            this.addTask({ text: 'Confirm Flight Details', assignee: 'James O', status: 'todo' });
            this.addTask({ text: 'Send Sponsor Invoices', assignee: 'Sarah P', status: 'todo' });
            this.addTask({ text: 'Decorate Main Hall', assignee: 'Mike S', status: 'todo' });

            // Bookings (Vendor Earnings)
            this.addBooking({ eventName: 'Tech Summit', client: 'Sarah Planner', date: '2026-05-15', amount: 3500, status: 'Confirmed' });
            this.addBooking({ eventName: 'Winter Ball', client: 'John Doe', date: '2026-12-10', amount: 1200, status: 'Pending' });
            this.addBooking({ eventName: 'Private Party', client: 'Alice Smith', date: '2026-04-25', amount: 800, status: 'Completed' });
            this.addBooking({ eventName: 'Corporate Gala', client: 'James Orchestrator', date: '2026-08-20', amount: 5000, status: 'Confirmed' });
            this.addBooking({ eventName: 'Music Fest', client: 'Sarah Planner', date: '2026-07-04', amount: 8500, status: 'Confirmed' });
            this.addBooking({ eventName: 'Design Conference', client: 'John Doe', date: '2026-10-12', amount: 3200, status: 'Pending' });
            this.addBooking({ eventName: 'Startup Pitch Night', client: 'James Orchestrator', date: '2026-09-05', amount: 1500, status: 'Confirmed' });
            this.addBooking({ eventName: 'Wedding Reception', client: 'Emily Stone', date: '2026-06-25', amount: 4800, status: 'Completed' });

            // Offers (Sponsor Data)
            this.addOffer({ title: 'Diamond Tier Sponsoring', value: '$25,000', event: 'Web Dev Summit', status: 'Accepted' });
            this.addOffer({ title: 'Lanyard Branding', value: '$2,500', event: 'Corporate Gala', status: 'Pending' });
            this.addOffer({ title: 'Main Stage Banner', value: '$5,000', event: 'Music Fest', status: 'Active' });
            this.addOffer({ title: 'VIP Lounge Host', value: '$15,000', event: 'Design Conference', status: 'Accepted' });
            this.addOffer({ title: 'Coffee Cart Sponsor', value: '$1,500', event: 'Startup Pitch Night', status: 'Pending' });
            this.addOffer({ title: 'Gold Tier Sponsoring', value: '$10,000', event: 'Charity Auction', status: 'Active' });
            this.addOffer({ title: 'Wi-Fi Network Branding', value: '$3,000', event: 'Tech Summit', status: 'Accepted' });
        }
    }
}

DataStore.init();
