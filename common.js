/**
 * EventHive Shared Utilities
 * Adheres to the clean, flat design system
 */

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Style the notification following the design tokens
    Object.assign(notification.style, {
        position: 'fixed',
        top: '24px',
        right: '24px',
        padding: '12px 20px',
        borderRadius: '8px',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        border: '0.5px solid var(--border-default)',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        transform: 'translateY(-120%)',
        transition: 'transform 0.3s ease',
        fontFamily: "'Inter', sans-serif",
        fontSize: '13px',
        fontWeight: '500'
    });

    const statusColors = {
        success: { fill: '#EAF3DE', text: '#3B6D11', icon: 'fa-circle-check' },
        error: { fill: '#FCEBEB', text: '#A32D2D', icon: 'fa-circle-xmark' },
        info: { fill: '#E6F1FB', text: '#185FA5', icon: 'fa-circle-info' },
        warning: { fill: '#FAEEDA', text: '#854F0B', icon: 'fa-circle-exclamation' }
    };

    const status = statusColors[type] || statusColors.info;
    notification.style.backgroundColor = 'white'; // White surface as per prompt
    
    notification.innerHTML = `
        <div style="width: 28px; height: 28px; background: ${status.fill}; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <i class="fa-solid ${status.icon}" style="color: ${status.text}; font-size: 14px;"></i>
        </div>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.style.transform = 'translateY(0)', 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(-120%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Global error handling
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error(msg, error);
    showNotification('System error detected', 'error');
    return false;
};
