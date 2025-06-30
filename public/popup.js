document.addEventListener('DOMContentLoaded', function() {
    const copyButton = document.getElementById('copyExtensionsUrl');
    const successMessage = document.getElementById('successMessage');
    
    // Handle copy button click
    copyButton.addEventListener('click', function() {
        // Copy chrome://extensions/ to clipboard
        navigator.clipboard.writeText('chrome://extensions/').then(function() {
            // Show success message
            successMessage.classList.add('show');
            
            // Change button text temporarily
            const originalText = copyButton.textContent;
            copyButton.textContent = 'Copied!';
            copyButton.style.backgroundColor = '#4CAF50';
            
            // Reset after 2 seconds
            setTimeout(function() {
                successMessage.classList.remove('show');
                copyButton.textContent = originalText;
                copyButton.style.backgroundColor = '#FF0000';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy text: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = 'chrome://extensions/';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            // Show success message
            successMessage.classList.add('show');
            copyButton.textContent = 'Copied!';
            copyButton.style.backgroundColor = '#4CAF50';
            
            setTimeout(function() {
                successMessage.classList.remove('show');
                copyButton.textContent = 'Copy Extensions URL';
                copyButton.style.backgroundColor = '#FF0000';
            }, 2000);
        });
    });
});