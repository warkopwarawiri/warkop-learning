const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

const modal = document.getElementById('task-modal');
const taskTitle = document.getElementById('task-title');
const taskDetails = document.getElementById('task-details');
const taskDate = document.getElementById('task-date');
let currentTaskIndex = null;

let autoScrollInterval = null;
const SCROLL_SPEED = 25; // Increased from 15
const SCROLL_ZONE = 200; // Increased from 150
const SCROLL_INTERVAL = 8; // Decreased from 16 for smoother scrolling
const MAX_SCROLL_SPEED = 40; // Add maximum speed limit

// Add data migration for existing todos
let todos = JSON.parse(localStorage.getItem('todos')) || [];
// Migrate old data format to new format with status
todos = todos.map(todo => ({
    ...todo,
    status: todo.status || (todo.completed ? 'completed' : 'todo')
}));
saveTodos(); // Save migrated data

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateTaskCounts() {
    const todoTasks = todos.filter(todo => todo.status === 'todo').length;
    const startedTasks = todos.filter(todo => todo.status === 'started').length;
    const completedTasks = todos.filter(todo => todo.status === 'completed').length;
    
    document.getElementById('todo-count').textContent = `${todoTasks} tasks`;
    document.getElementById('started-count').textContent = `${startedTasks} tasks`;
    document.getElementById('completed-count').textContent = `${completedTasks} tasks`;
}

function generateTicketId() {
    return `TASK-${Math.floor(Math.random() * 10000)}`;
}

const PRIORITY_LABELS = {
    low: 'Low Priority',
    medium: 'Medium Priority',
    high: 'High Priority'
};

function getAvailableStatuses(currentStatus) {
    const transitions = {
        'todo': ['started'],
        'started': ['todo', 'completed'],
        'completed': ['started']
    };
    return transitions[currentStatus] || [];
}

function renderStatusMenu(statusTag, todo, index) {
    const currentStatus = todo.status;
    const availableStatuses = getAvailableStatuses(currentStatus);
    const allStatuses = ['todo', 'started', 'completed'];
    
    const menu = document.createElement('div');
    menu.className = 'status-menu';
    
    const items = allStatuses.map(status => {
        const isAvailable = availableStatuses.includes(status);
        const isCurrent = status === currentStatus;
        return `
            <div class="status-item ${isCurrent ? 'active' : ''} ${!isAvailable && !isCurrent ? 'disabled' : ''}"
                 data-status="${status}">
                ${status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
        `;
    }).join('');
    
    menu.innerHTML = items;
    statusTag.appendChild(menu);
    
    // Add click handlers for status items
    menu.querySelectorAll('.status-item:not(.disabled)').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const newStatus = item.dataset.status;
            if (newStatus !== currentStatus) {
                // Move todo to new status and to top of list
                const updatedTodo = { ...todos[index], status: newStatus, updatedAt: new Date().toISOString() };
                todos.splice(index, 1);
                todos.unshift(updatedTodo);
                
                saveTodos();
                renderTodos();
            }
            menu.classList.remove('active');
        });
    });
}

function formatDate(dateString, forDisplay = true) {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    if (forDisplay) {
        // Format for display: DD/MM/YYYY
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } else {
        // Format for input: YYYY-MM-DD
        return date.toISOString().split('T')[0];
    }
}

// Add new helper function for due date status
function getDueDateStatus(dateString) {
    if (!dateString) return '';
    
    const dueDate = new Date(dateString);
    dueDate.setHours(23, 59, 59, 999); // Set to end of day
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (dueDate < today) {
        return 'overdue';
    } else if (dueDate.toDateString() === today.toDateString()) {
        return 'today';
    } else {
        return 'upcoming';
    }
}

function renderTodos() {
    const lists = {
        todo: document.getElementById('todo-list'),
        started: document.getElementById('started-list'),
        completed: document.getElementById('completed-list')
    };
    
    Object.values(lists).forEach(list => list.innerHTML = '');
    
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.status === 'completed' ? 'completed' : ''}`;
        li.draggable = true;
        
        const ticketId = todo.ticketId || generateTicketId();
        if (!todo.ticketId) {
            todo.ticketId = ticketId;
            saveTodos();
        }

        const priority = todo.priority || 'low';
        const dueDate = todo.dueDate ? formatDate(todo.dueDate) : '';
        const dueDateStatus = getDueDateStatus(todo.dueDate);
        const dueDateHtml = dueDate ? 
            `<span class="due-date ${dueDateStatus}">📅 ${dueDate}</span>` : '';
        const hasDetails = todo.details ? '📝' : '';
        
        li.innerHTML = `
            <div class="ticket-header">
                <span class="ticket-id">${ticketId}</span>
                <span class="ticket-type">
                    <svg viewBox="0 0 16 16">
                        <path fill="currentColor" d="M14,2H2C1.4,2,1,2.4,1,3v10c0,0.6,0.4,1,1,1h12c0.6,0,1-0.4,1-1V3C15,2.4,14.6,2,14,2z M14,13H2V3h12V13z"/>
                        <rect x="3" y="7" fill="currentColor" width="10" height="2"/>
                    </svg>
                    Task
                </span>
                <button class="delete-btn" title="More actions">
                    <svg viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
                    </svg>
                    <div class="delete-menu">
                        <div class="delete-menu-item">
                            <svg viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                            </svg>
                            Delete task
                        </div>
                    </div>
                </button>
            </div>
            <div class="ticket-title">${todo.text} ${hasDetails}</div>
            <div class="ticket-metadata">
                <div class="priority-indicator priority-${priority}" title="Priority: ${priority}"></div>
                ${dueDateHtml}
                <span class="ticket-tag" title="Click to change status">${todo.status}</span>
            </div>
        `;

        // Add status menu functionality
        const statusTag = li.querySelector('.ticket-tag');
        renderStatusMenu(statusTag, todo, index);
        
        statusTag.addEventListener('click', (e) => {
            e.stopPropagation();
            const menu = statusTag.querySelector('.status-menu');
            // Close other menus first
            document.querySelectorAll('.status-menu.active, .delete-menu.active').forEach(m => {
                if (m !== menu) m.classList.remove('active');
            });
            menu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', () => {
            statusTag.querySelector('.status-menu').classList.remove('active');
        });

        // Make entire ticket clickable for details
        li.addEventListener('click', (e) => {
            // Don't open details if clicking delete button
            if (!e.target.closest('.delete-btn')) {
                openTaskDetails(index);
            }
        });

        // Update delete button handler
        const deleteButton = li.querySelector('.delete-btn');
        const deleteMenu = deleteButton.querySelector('.delete-menu');
        
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close any other open menus
            document.querySelectorAll('.delete-menu.active').forEach(menu => {
                if (menu !== deleteMenu) menu.classList.remove('active'); // Fixed missing quote here
            });
            deleteMenu.classList.toggle('active');
        });

        // Add click handler for delete menu item
        const deleteMenuItem = deleteMenu.querySelector('.delete-menu-item');
        deleteMenuItem.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTodo(index);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!deleteButton.contains(e.target)) {
                deleteMenu.classList.remove('active');
            }
        });

        // Add drag event listeners
        li.addEventListener('dragstart', handleDragStart);
        li.addEventListener('dragend', handleDragEnd);
        li.dataset.index = index;

        // Ensure todo has a valid status
        const status = ['todo', 'started', 'completed'].includes(todo.status) ? todo.status : 'todo';
        lists[status].appendChild(li);
    });
    
    updateTaskCounts();
}

function addTodo(text) {
    const now = new Date().toISOString();
    const newTodo = {
        text,
        status: 'todo',
        details: '',
        dueDate: '',
        priority: 'low',
        createdAt: now,
        ticketId: generateTicketId(),
        timeline: [{
            type: 'created',
            timestamp: now,
            content: 'Task created'
        }]
    };
    
    todos.unshift(newTodo);
    saveTodos();
    renderTodos();
    todoInput.value = '';
    todoInput.focus();
}

function addTimelineEntry(todo, type, content) {
    if (!todo.timeline) todo.timeline = [];
    todo.timeline.unshift({
        type,
        timestamp: new Date().toISOString(),
        content
    });
}

function formatTimelineDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
        return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
        return `Yesterday at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
        return date.toLocaleDateString('en-US', { 
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

function renderTimeline(timeline) {
    const timelineList = document.getElementById('task-timeline');
    timelineList.innerHTML = timeline.map(entry => `
        <div class="timeline-item ${entry.type}">
            <div class="timeline-date">${formatTimelineDate(entry.timestamp)}</div>
            <div class="timeline-content">${entry.content}</div>
        </div>
    `).join('');
}

function updateTodoStatus(index, newStatus) {
    const todo = todos[index];
    const oldStatus = todo.status;
    
    if (newStatus !== oldStatus) {
        todo.status = newStatus;
        addTimelineEntry(todo, 'status-change', 
            `Status changed from "${oldStatus}" to "${newStatus}"`);
        saveTodos();
        renderTodos();
    }
}

// Update form submit handler to prevent default properly
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        addTodo(text);
    }
});

// Update toggleTodoStatus to handle the 'started' state
function toggleTodoStatus(index) {
    const todo = todos[index];
    const currentStatus = todo.status;
    
    switch (currentStatus) {
        case 'todo':
            todo.status = 'started';
            break;
        case 'started':
            todo.status = 'completed';
            break;
        case 'completed':
            todo.status = 'started'; // Can only go back to "started"
            break;
        default:
            todo.status = 'todo';
    }
    
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

// Modify setupInlineEdit function
function setupInlineEdit(fieldId, viewId) {
    const field = document.getElementById(fieldId);
    const view = document.getElementById(viewId);
    const formGroup = field.closest('.form-group');
    const applyBtn = formGroup.querySelector('.apply-btn');
    const cancelBtn = formGroup.querySelector('.cancel-btn');
    const editControls = formGroup.querySelector('.edit-controls');
    const markdownEditor = field.closest('.markdown-editor');
    let originalValue = '';

    // Handler untuk click pada view
    const handleViewClick = () => {
        if (todos[currentTaskIndex].status === 'completed') return;
        
        // Ambil nilai original dari todo object, bukan dari view element
        if (fieldId === 'task-details') {
            originalValue = todos[currentTaskIndex].details || '';
            field.value = originalValue;
            view.style.display = 'none';
            field.closest('.markdown-editor').style.display = 'block';
        } else if (fieldId === 'task-date') {
            originalValue = todos[currentTaskIndex].dueDate || '';
        } else if (fieldId === 'task-priority') {
            originalValue = todos[currentTaskIndex].priority || 'low';
        } else if (fieldId === 'task-title') {
            originalValue = todos[currentTaskIndex].text || '';
        }

        field.value = originalValue;
        view.style.display = 'none';
        field.style.display = 'block';
        editControls.style.display = 'flex';
        field.focus();
    };

    // Apply changes
    applyBtn.addEventListener('click', () => {
        const value = field.value;
        saveFieldChange(fieldId, value, view);
        field.style.display = 'none';
        view.style.display = 'block';
        editControls.style.display = 'none';
        if (markdownEditor) {
            markdownEditor.style.display = 'none';
        }
    });

    // Cancel changes
    cancelBtn.addEventListener('click', () => {
        field.value = originalValue;
        field.style.display = 'none';
        view.style.display = 'block';
        editControls.style.display = 'none';
        if (markdownEditor) {
            markdownEditor.style.display = 'none';
        }
    });

    view.addEventListener('click', handleViewClick);

    // Handle Enter key
    field.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            if (field.tagName !== 'TEXTAREA') {
                e.preventDefault();
                applyBtn.click();
            }
        }
        // Handle Escape key
        if (e.key === 'Escape') {
            cancelBtn.click();
        }
    });
}

// Sederhanakan konfigurasi marked
marked.setOptions({
    headerIds: false,
    mangle: false,
    gfm: true
});

// Sederhanakan konfigurasi DOMPurify
const purifyConfig = {
    ALLOWED_TAGS: [
        'p', 'ul', 'ol', 'li', 
        'strong', 'em', 'code', 'pre', 'blockquote',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6'  // Tambahkan tag heading
    ],
    ALLOWED_ATTR: [],
    ALLOW_DATA_ATTR: false
};

// Fungsi helper untuk render markdown dengan aman
function renderMarkdown(text) {
    if (!text) return '';
    try {
        const rawHtml = marked.parse(text);
        return DOMPurify.sanitize(rawHtml, purifyConfig);
    } catch (e) {
        console.error('Markdown rendering error:', e);
        return text;
    }
}

function saveFieldChange(fieldId, value, view) {
    if (currentTaskIndex !== null) {
        const todo = todos[currentTaskIndex];
        const oldValue = todo[fieldId === 'task-title' ? 'text' : fieldId.replace('task-', '')];
        
        if (value !== oldValue) {
            if (fieldId === 'task-details') {
                // Simpan nilai markdown mentah
                todo.details = value;
                
                // Render markdown ke view
                view.classList.add('markdown-content');
                view.innerHTML = renderMarkdown(value) || '<em>No content</em>';
                
                addTimelineEntry(todo, 'update', 'Details updated');
            } else {
                if (fieldId === 'task-date') {
                    view.textContent = value ? formatDate(value, true) : 'Not set';
                    todo.dueDate = value;
                    addTimelineEntry(todo, 'update', 
                        `Due date ${value ? 'set to ' + formatDate(value, true) : 'removed'}`);
                } else {
                    view.textContent = fieldId === 'task-priority' ? 
                        PRIORITY_LABELS[value] : (value || 'Not set');

                    switch (fieldId) {
                        case 'task-title':
                            todo.text = value;
                            addTimelineEntry(todo, 'update', 'Title updated');
                            break;
                        case 'task-details':
                            todo.details = value;
                            addTimelineEntry(todo, 'update', 'Details updated');
                            break;
                        case 'task-priority':
                            todo.priority = value;
                            addTimelineEntry(todo, 'update', 
                                `Priority changed to "${PRIORITY_LABELS[value]}"`);
                            break;
                    }
                }
            }
            
            saveTodos();
            renderTodos();
            renderTimeline(todo.timeline || []);
        }
    }
}

function openTaskDetails(index) {
    currentTaskIndex = index;
    const todo = todos[index];
    const isCompleted = todo.status === 'completed';
    
    // Update fields
    const fields = [
        { view: 'title-view', field: 'task-title', value: todo.text },
        { view: 'details-view', field: 'task-details', value: todo.details },
        { view: 'date-view', field: 'task-date', value: todo.dueDate },
        { view: 'priority-view', field: 'task-priority', value: PRIORITY_LABELS[todo.priority] || 'Low Priority' }
    ];

    fields.forEach(({ view, field, value }) => {
        const viewEl = document.getElementById(view);
        const fieldEl = document.getElementById(field);
        const formGroup = fieldEl.closest('.form-group');
        const editControls = formGroup.querySelector('.edit-controls');
        const markdownEditor = fieldEl.closest('.markdown-editor');
        
        // Reset tampilan
        viewEl.style.display = 'block';
        fieldEl.style.display = 'none';
        if (markdownEditor) markdownEditor.style.display = 'none';
        editControls.style.display = 'none';
        
        // Set nilai field
        if (field === 'task-details') {
            viewEl.classList.add('markdown-content');
            viewEl.innerHTML = renderMarkdown(value) || '<em>No content</em>';
            fieldEl.value = value || '';
        } else if (field === 'task-date') {
            viewEl.textContent = value ? formatDate(value, true) : 'Not set';
            fieldEl.value = value || '';
        } else {
            viewEl.textContent = value || 'Not set';
            fieldEl.value = value || '';
        }
        
        // Set cursor dan read-only state
        viewEl.classList.toggle('read-only', isCompleted);
        viewEl.style.cursor = isCompleted ? 'default' : 'pointer';

        // Bersihkan event listener lama
        if (viewEl.clickHandler) {
            viewEl.removeEventListener('click', viewEl.clickHandler);
        }

        // Setup event listener baru jika tidak completed
        if (!isCompleted) {
            viewEl.clickHandler = () => {
                viewEl.style.display = 'none';
                fieldEl.style.display = 'block';
                editControls.style.display = 'flex';
                fieldEl.focus();
            };
            viewEl.addEventListener('click', viewEl.clickHandler);
        }
    });

    // Render timeline
    renderTimeline(todo.timeline || []);
    
    modal.classList.add('active');
}

// Modal event listeners
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Drag and Drop handlers
function handleDragStart(e) {
    e.target.classList.add('dragging');
    // Add data transfer for better drag compatibility
    e.dataTransfer.setData('text/plain', e.target.dataset.index);
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    // Clean up any remaining dragging classes
    document.querySelectorAll('.todo-item').forEach(item => {
        item.classList.remove('dragging');
    });
    
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
}

function handleDragOver(e) {
    e.preventDefault();
    // Add styling to show valid drop zone
    const column = e.target.closest('.kanban-column');
    if (column) {
        column.classList.add('drag-over');
    }
    
    // Auto-scroll logic
    const kanbanBoard = document.querySelector('.kanban-board');
    const boardRect = kanbanBoard.getBoundingClientRect();
    const mouseX = e.clientX - boardRect.left;
    
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
    }
    
    // Enhanced speed calculation
    const calculateSpeed = (distance) => {
        const baseSpeed = SCROLL_SPEED;
        // Exponential acceleration based on distance
        const acceleration = Math.pow(1 - (distance / SCROLL_ZONE), 2);
        const speed = Math.min(Math.ceil(baseSpeed + (baseSpeed * acceleration)), MAX_SCROLL_SPEED);
        return speed;
    };
    
    // Expanded scroll zones and enhanced speed calculation
    if (mouseX > boardRect.width - SCROLL_ZONE) {
        const distanceFromEdge = boardRect.width - mouseX;
        const speed = calculateSpeed(distanceFromEdge);
        
        autoScrollInterval = setInterval(() => {
            const scrollLeft = kanbanBoard.scrollLeft;
            const maxScroll = kanbanBoard.scrollWidth - kanbanBoard.clientWidth;
            
            if (scrollLeft < maxScroll) {
                kanbanBoard.scrollLeft += speed;
            }
        }, SCROLL_INTERVAL);
    } else if (mouseX < SCROLL_ZONE) {
        const speed = calculateSpeed(mouseX);
        
        autoScrollInterval = setInterval(() => {
            if (kanbanBoard.scrollLeft > 0) {
                kanbanBoard.scrollLeft -= speed;
            }
        }, SCROLL_INTERVAL);
    }
}

function handleDragLeave(e) {
    // Remove styling when leaving drop zone
    const column = e.target.closest('.kanban-column');
    if (column) {
        column.classList.remove('drag-over');
    }

    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
}

function isValidStatusTransition(fromStatus, toStatus) {
    const validTransitions = {
        'todo': ['started'],
        'started': ['todo', 'completed'],
        'completed': ['started']  // Completed can only go back to "started"
    };
    
    return validTransitions[fromStatus]?.includes(toStatus) || false;
}

// Update the handleDrop function to safely handle the dragged item
function handleDrop(e, newStatus) {
    e.preventDefault();
    const draggedItem = document.querySelector('.dragging');
    document.querySelectorAll('.kanban-column').forEach(col => {
        col.classList.remove('drag-over');
    });
    
    if (!draggedItem) return;
    
    const draggedItemIndex = parseInt(draggedItem.dataset.index);
    if (isNaN(draggedItemIndex) || !todos[draggedItemIndex]) return;
    
    const currentStatus = todos[draggedItemIndex].status;
    
    if (!isValidStatusTransition(currentStatus, newStatus)) {
        draggedItem.classList.add('invalid-drop');
        setTimeout(() => draggedItem.classList.remove('invalid-drop'), 1000);
        return;
    }
    
    const todo = todos[draggedItemIndex];
    todos.splice(draggedItemIndex, 1);
    
    // Add timeline entry for status change
    addTimelineEntry(todo, 'status-change', 
        `Status changed from "${todo.status}" to "${newStatus}"`);
    
    todos.unshift({
        ...todo,
        status: newStatus,
        updatedAt: new Date().toISOString()
    });
    
    saveTodos();
    renderTodos();
}

// Initialize drag and drop
document.querySelectorAll('.task-list').forEach(list => {
    list.addEventListener('dragover', handleDragOver);
    list.addEventListener('dragleave', handleDragLeave);
    list.addEventListener('drop', (e) => {
        // Clear scroll interval on drop
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
        
        const column = e.target.closest('.kanban-column');
        if (column) {
            handleDrop(e, column.dataset.status);
        }
    });
});

// Update initialization
document.addEventListener('DOMContentLoaded', () => {
    setupInlineEdit('task-title', 'title-view');
    setupInlineEdit('task-details', 'details-view');
    setupInlineEdit('task-date', 'date-view');
    setupInlineEdit('task-priority', 'priority-view');
    
    // Initialize modal event listeners
    document.querySelectorAll('.close-modal, .close-modal-btn').forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Initialize drag and drop with improved handling
    document.querySelectorAll('.task-list').forEach(list => {
        list.addEventListener('dragover', (e) => {
            e.preventDefault();
            handleDragOver(e);
        });

        list.addEventListener('dragleave', handleDragLeave);

        list.addEventListener('drop', (e) => {
            e.preventDefault();
            // Clear scroll interval
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
            
            const column = e.target.closest('.kanban-column');
            if (column && column.dataset.status) {
                handleDrop(e, column.dataset.status);
            }
        });
    });

    // Initial render
    renderTodos();
});
