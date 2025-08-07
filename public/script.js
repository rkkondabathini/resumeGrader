// Global variables
let currentStudentCode = '';

// DOM elements
const checkForm = document.getElementById('checkForm');
const studentCodeInput = document.getElementById('studentCode');
const authCodeInput = document.getElementById('authCode');
const loading = document.getElementById('loading');
const alert = document.getElementById('alert');
const resultSection = document.getElementById('resultSection');
const updateSection = document.getElementById('updateSection');
const emptyState = document.getElementById('emptyState');

// Resume elements
const resumeLink = document.getElementById('resumeLink');
const statusBadge = document.getElementById('statusBadge');
const feedback = document.getElementById('feedback');

// Update elements
const newResumeLinkInput = document.getElementById('newResumeLink');
const submitNewResumeBtn = document.getElementById('submitNewResume');

// Show alert message
function showAlert(message, type = 'error') {
    alert.textContent = message;
    alert.className = `alert alert-${type}`;
    alert.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        alert.style.display = 'none';
    }, 5000);
}

function hideAlert() {
    alert.style.display = 'none';
}

// Show/hide loading spinner
function toggleLoading(show) {
    loading.style.display = show ? 'block' : 'none';
}

// Get status badge class based on status
function getStatusIcon(status) {
    switch (status.toLowerCase()) {
        case 'cleared':
            return 'fas fa-check';
        case 'not cleared':
            return 'fas fa-times';
        case 'grading pending':
            return 'fas fa-clock';
        default:
            return 'fas fa-question';
    }
}

// Display resume information
function displayResumeInfo(data) {
    // Set resume link
    resumeLink.href = data.resumeLink;
    
    // Set status badge
    const statusIcon = getStatusIcon(data.status);
    statusBadge.innerHTML = `<i class="${statusIcon}"></i> ${data.status}`;
    statusBadge.className = `status-badge status-${data.status.toLowerCase().replace(' ', '-')}`;
    
    // Set feedback
    feedback.textContent = data.feedback;
    
    // Show sections
    resultSection.style.display = 'block';
    emptyState.style.display = 'none';
    
    // Show update section if status is "Not Cleared"
    if (data.status.toLowerCase() === 'not cleared') {
        updateSection.style.display = 'block';
    } else {
        updateSection.style.display = 'none';
    }
    
    // Smooth scroll on mobile
    if (window.innerWidth <= 768) {
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Show empty state
function showEmptyState() {
    resultSection.style.display = 'none';
    updateSection.style.display = 'none';
    emptyState.style.display = 'block';
}

// Check resume status
async function checkResumeStatus(studentCode, authCode) {
    try {
        const response = await fetch('/api/check-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ studentCode, authCode }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to check resume status');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Network error occurred');
    }
}

// Update resume link
async function updateResumeLink(studentCode, newResumeLink) {
    try {
        const response = await fetch('/api/update-resume', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ studentCode, newResumeLink }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update resume');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Network error occurred');
    }
}

// Form submission
checkForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const studentCode = studentCodeInput.value.trim();
    const authCode = authCodeInput.value.trim();
    
    if (!studentCode || !authCode) {
        showAlert('Please enter both Student Code and Authentication Code');
        return;
    }
    
    // Store current student code for later use
    currentStudentCode = studentCode;
    
    // Show loading
    toggleLoading(true);
    resultSection.style.display = 'none';
    emptyState.style.display = 'none';
    alert.style.display = 'none';
    
    try {
        const data = await checkResumeStatus(studentCode, authCode);
        displayResumeInfo(data);
        showAlert('Resume status retrieved successfully!', 'success');
    } catch (error) {
        showAlert(error.message);
        showEmptyState();
    } finally {
        toggleLoading(false);
    }
});

// Handle new resume submission
submitNewResumeBtn.addEventListener('click', async () => {
    const newResumeLink = newResumeLinkInput.value.trim();
    
    if (!newResumeLink) {
        showAlert('Please enter a new resume link');
        return;
    }
    
    if (!newResumeLink.startsWith('https://drive.google.com/')) {
        showAlert('Please provide a valid Google Drive link');
        return;
    }
    
    if (!currentStudentCode) {
        showAlert('Please check your resume status first');
        return;
    }
    
    // Show loading
    toggleLoading(true);
    alert.style.display = 'none';
    
    try {
        const data = await updateResumeLink(currentStudentCode, newResumeLink);
        showAlert(data.message, 'success');
        
        // Clear the new resume link input
        newResumeLinkInput.value = '';
        
        // Hide the update section
        updateSection.style.display = 'none';
        
        // Update the status badge to show "Grading Pending"
        statusBadge.innerHTML = '<i class="fas fa-clock"></i> Grading Pending';
        statusBadge.className = 'status-badge status-pending';
        
    } catch (error) {
        showAlert(error.message);
    } finally {
        toggleLoading(false);
    }
});

// Add smooth interactions
document.addEventListener('DOMContentLoaded', () => {
    // Show empty state initially
    showEmptyState();
    
    // Add focus effects to inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.01)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add enter key support for form submission
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const activeElement = document.activeElement;
            if (activeElement && activeElement.tagName === 'INPUT') {
                const form = activeElement.closest('form');
                if (form) {
                    e.preventDefault();
                    form.dispatchEvent(new Event('submit'));
                }
            }
        }
    });
    
    // Add smooth hover effects to result items
    const resultItems = document.querySelectorAll('.result-item');
    resultItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-4px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
}); 