document.addEventListener('DOMContentLoaded', () => {
    // Tags Input Handler
    const tagsInput = document.querySelector('.tags-input input');
    const tagsContainer = document.querySelector('.tags-container');
    const tags = new Set();

    tagsInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const tag = tagsInput.value.trim();
            if (tag && !tags.has(tag)) {
                addTag(tag);
                tags.add(tag);
                tagsInput.value = '';
            }
        }
    });

    function addTag(tag) {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag-item';
        tagElement.innerHTML = `
            ${tag}
            <button type="button" aria-label="Remove tag">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add click handler for remove button
        const removeButton = tagElement.querySelector('button');
        removeButton.addEventListener('click', () => {
            tags.delete(tag);
            tagElement.style.opacity = '0';
            tagElement.style.transform = 'scale(0.8)';
            setTimeout(() => tagElement.remove(), 200);
        });

        tagsContainer.appendChild(tagElement);
    }

    // Word Count Handler
    const contentEditor = document.querySelector('.content-editor');
    const wordCount = document.querySelector('.word-count');

    contentEditor.addEventListener('input', () => {
        const words = contentEditor.value.trim().split(/\s+/).length;
        wordCount.textContent = `${words} word${words !== 1 ? 's' : ''}`;
    });

    // Cover Image Preview
    const coverInput = document.getElementById('coverImage');
    const uploadArea = document.querySelector('.upload-area');

    coverInput.addEventListener('change', handleImageUpload);

    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert('File size should not exceed 2MB');
                resetCoverImage();
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadArea.style.backgroundImage = `url(${e.target.result})`;
                uploadArea.classList.add('has-image');
                
                // Adjust text colors for better visibility
                const uploadContent = uploadArea.querySelector('.upload-content');
                const uploadIcon = uploadArea.querySelector('.upload-icon');
                const uploadText = uploadArea.querySelector('.upload-text');
                const uploadHint = uploadArea.querySelector('.upload-hint');
                
                uploadContent.style.opacity = '0';
                uploadIcon.style.color = 'white';
                uploadText.style.color = 'white';
                uploadHint.style.color = 'rgba(255, 255, 255, 0.8)';
            };
            reader.onerror = () => {
                alert('Error reading file');
                resetCoverImage();
            };
            reader.readAsDataURL(file);
        }
    }

    // Reset Cover Image
    const resetButton = document.querySelector('.reset-image');

    function resetCoverImage(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        // Clear the file input
        coverInput.value = '';
        
        // Reset the upload area
        uploadArea.style.backgroundImage = '';
        uploadArea.classList.remove('has-image');
        uploadArea.classList.remove('drag-over');
        
        // Reset the content
        const uploadContent = uploadArea.querySelector('.upload-content');
        uploadContent.style.opacity = '';
        
        // Reset icon and text color back to default
        const uploadIcon = uploadArea.querySelector('.upload-icon');
        const uploadText = uploadArea.querySelector('.upload-text');
        const uploadHint = uploadArea.querySelector('.upload-hint');
        
        uploadIcon.style.color = '';
        uploadText.style.color = '';
        uploadHint.style.color = '';
        
        // Optional: Add fade out animation
        uploadArea.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            uploadArea.style.transition = '';
        }, 300);
    }

    resetButton.addEventListener('click', resetCoverImage);

    // Drag and Drop Handler
    uploadArea.addEventListener('dragenter', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!uploadArea.classList.contains('drag-over')) {
            uploadArea.classList.add('drag-over');
        }
    });

    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            coverInput.files = e.dataTransfer.files;
            handleImageUpload({ target: { files: [file] } });
        } else {
            resetCoverImage();
            alert('Please drop an image file');
        }
    });

    // SEO Meta Fields Character Counter
    const metaTitle = document.getElementById('metaTitle');
    const metaDescription = document.getElementById('metaDescription');

    function updateCharacterCount(element, maxLength) {
        const count = element.value.length;
        const counter = element.parentElement.querySelector('.character-count');
        counter.textContent = `${count}/${maxLength}`;

        // Add warning/error classes
        counter.className = 'character-count';
        if (count > maxLength) {
            counter.classList.add('error');
        } else if (count > maxLength * 0.9) {
            counter.classList.add('warning');
        }
    }

    metaTitle?.addEventListener('input', () => updateCharacterCount(metaTitle, 60));
    metaDescription?.addEventListener('input', () => updateCharacterCount(metaDescription, 160));

    // Focus Keyword Handler
    const focusKeyword = document.getElementById('focusKeyword');
    
    focusKeyword?.addEventListener('change', () => {
        const keyword = focusKeyword.value.trim().toLowerCase();
        if (keyword) {
            // Simple SEO check for keyword in title and description
            const titleContains = metaTitle.value.toLowerCase().includes(keyword);
            const descContains = metaDescription.value.toLowerCase().includes(keyword);
            
            if (!titleContains || !descContains) {
                alert('Tip: Consider including your focus keyword in both meta title and description for better SEO.');
            }
        }
    });
});
