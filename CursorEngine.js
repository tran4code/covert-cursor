class CursorEngine {
    constructor() {
        this.cursorElement = document.getElementById('custom-cursor');
        this.transformManager = new TransformManager(this.cursorElement);
        this.elementFactory = new ElementFactory();
        
        this.currentX = 0;
        this.currentY = 0;
        this.targetX = 0;
        this.targetY = 0;
        
        this.isActive = true;
        this.animationFrame = null;
        this.hoveredElement = null;
        this.highlightElement = null;
        
        this.init();
    }
    
    init() {
        this.hideSytem();
        this.bindEvents();
        this.startTracking();
        this.showHint();
        
        // Set element factory in transform manager
        this.transformManager.setElementFactory(this.elementFactory);
        
        // Initialize with default cursor
        this.transformManager.revertToDefault();
        
        // Create highlight element
        this.createHighlightElement();
    }
    
    hideSytem() {
        document.body.style.cursor = 'none';
    }
    
    showSystemCursor() {
        document.body.style.cursor = 'auto';
        this.cursorElement.style.display = 'none';
        this.isActive = false;
    }
    
    showCustomCursor() {
        document.body.style.cursor = 'none';
        this.cursorElement.style.display = 'block';
        this.isActive = true;
    }
    
    createHighlightElement() {
        this.highlightElement = document.createElement('div');
        this.highlightElement.className = 'element-highlight';
        document.body.appendChild(this.highlightElement);
    }
    
    bindEvents() {
        // Mouse movement
        document.addEventListener('mousemove', (e) => {
            this.targetX = e.clientX;
            this.targetY = e.clientY;
            this.updateHoveredElement(e);
        });
        
        // Click events
        document.addEventListener('click', (e) => {
            if (!this.isActive) return;
            
            // Use the hovered element which includes container detection
            const target = this.hoveredElement || e.target;
            const elementType = this.detectElementType(target);
            
            if (elementType && elementType !== 'empty') {
                this.transformManager.transformTo(elementType, target);
                // Hide highlight immediately after transformation
                this.highlightElement.style.display = 'none';
                this.hoveredElement = null;
            } else {
                this.transformManager.revertToDefault();
            }
        });
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.showSystemCursor();
                setTimeout(() => this.showCustomCursor(), 2000);
            } else if (e.key === 'a' || e.key === 'A') {
                this.transformManager.revertToDefault();
            }
        });
        
        // Mouse leave/enter viewport
        document.addEventListener('mouseleave', () => {
            this.cursorElement.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            this.cursorElement.style.opacity = '1';
        });
        
        // Context menu (right-click)
        document.addEventListener('contextmenu', (e) => {
            this.showSystemCursor();
            setTimeout(() => this.showCustomCursor(), 100);
        });
    }
    
    updateHoveredElement(e) {
        if (!this.isActive) return;
        
        // Only show highlights when we have the default cursor
        if (this.transformManager.getCurrentType() !== 'default') {
            this.highlightElement.style.display = 'none';
            this.hoveredElement = null;
            return;
        }
        
        const elementAtPoint = document.elementFromPoint(e.clientX, e.clientY);
        const targetElement = this.findTargetElement(elementAtPoint);
        
        if (targetElement !== this.hoveredElement) {
            this.hoveredElement = targetElement;
            
            if (targetElement && targetElement !== document.body && targetElement !== document.documentElement) {
                // Update highlight
                const rect = targetElement.getBoundingClientRect();
                this.highlightElement.style.display = 'block';
                this.highlightElement.style.left = rect.left + 'px';
                this.highlightElement.style.top = rect.top + 'px';
                this.highlightElement.style.width = rect.width + 'px';
                this.highlightElement.style.height = rect.height + 'px';
                
                // Add specific class based on element type
                const elementType = this.detectElementType(targetElement);
                this.highlightElement.className = 'element-highlight';
                if (elementType !== 'empty') {
                    this.highlightElement.classList.add(`highlight-${elementType}`);
                }
            } else {
                this.highlightElement.style.display = 'none';
            }
        }
    }
    
    findTargetElement(element) {
        if (!element) return null;
        
        let current = element;
        
        // First, check if the current element is an interactive element
        const elementType = this.detectElementType(current);
        if (elementType !== 'empty' && elementType !== 'form' && elementType !== 'card' && elementType !== 'showcase') {
            // It's a specific interactive element (button, input, etc.)
            return current;
        }
        
        // If we clicked directly on a container element, return the container
        if (current.classList.contains('playground-card') || 
            current.classList.contains('example-card') || 
            current.classList.contains('feature-item')) {
            return current;
        }
        
        if (current.classList.contains('element-showcase')) {
            return current;
        }
        
        if (current.tagName === 'FORM' && !current.closest('.playground-card, .example-card')) {
            return current;
        }
        
        // Check if we're clicking on non-interactive space within a container
        const card = current.closest('.playground-card, .example-card, .feature-item');
        const showcase = current.closest('.element-showcase');
        const form = current.closest('form');
        
        // If we're in a container but not on an interactive element, return the container
        if (card && this.detectElementType(current) === 'empty') {
            return card;
        }
        
        if (showcase && this.detectElementType(current) === 'empty') {
            return showcase;
        }
        
        if (form && !form.closest('.playground-card, .example-card') && this.detectElementType(current) === 'empty') {
            return form;
        }
        
        // Otherwise, try parent
        if (current.parentElement && current.parentElement !== document.body) {
            return this.findTargetElement(current.parentElement);
        }
        
        return null;
    }
    
    detectElementType(element) {
        if (!element || element === document.body || element === document.documentElement) {
            return 'empty';
        }
        
        // Check for containers first
        // Only treat as form if it's a standalone form, not inside a card
        if (element.tagName === 'FORM' && !element.closest('.playground-card, .example-card')) {
            return 'form';
        }
        
        if (element.classList.contains('playground-card') || 
            element.classList.contains('example-card') || 
            element.classList.contains('feature-item')) {
            return 'card';
        }
        
        if (element.classList.contains('element-showcase')) {
            return 'showcase';
        }
        
        // Check for specific element types
        if (element.tagName === 'BUTTON' || element.classList.contains('btn-primary') || 
            element.classList.contains('btn-secondary') || element.classList.contains('btn-danger') ||
            element.classList.contains('btn-success') || element.classList.contains('btn-outline') ||
            element.classList.contains('btn-hero') || element.classList.contains('btn-cart') ||
            element.classList.contains('btn-player') || element.classList.contains('btn-submit')) {
            return 'button';
        }
        
        if (element.tagName === 'INPUT') {
            const type = element.type;
            if (type === 'text' || type === 'email' || type === 'password') {
                return 'input';
            }
            if (type === 'checkbox' && !element.closest('.toggle-switch')) {
                return 'checkbox';
            }
            if (type === 'range') {
                return 'slider';
            }
        }
        
        if (element.tagName === 'TEXTAREA') {
            return 'input';
        }
        
        if (element.classList.contains('toggle-slider') || element.closest('.toggle-switch')) {
            return 'toggle';
        }
        
        if (element.tagName === 'SELECT' || element.classList.contains('demo-select')) {
            return 'dropdown';
        }
        
        if (element.tagName === 'A') {
            return 'link';
        }
        
        if (element.tagName === 'IMG') {
            return 'image';
        }
        
        if (element.classList.contains('progress-bar') || element.classList.contains('progress-fill')) {
            return 'progress';
        }
        
        // Check if it's a label or text element
        if (element.tagName === 'LABEL' || element.tagName === 'H3' || element.tagName === 'H4' || 
            element.tagName === 'P' || element.tagName === 'SPAN' || element.tagName === 'DIV') {
            // These are considered "empty" for selection purposes
            return 'empty';
        }
        
        // Check parent elements
        return this.detectElementType(element.parentElement);
    }
    
    startTracking() {
        const updateCursor = () => {
            if (!this.isActive) {
                this.animationFrame = requestAnimationFrame(updateCursor);
                return;
            }
            
            // Smooth cursor movement
            const ease = 0.15;
            this.currentX += (this.targetX - this.currentX) * ease;
            this.currentY += (this.targetY - this.currentY) * ease;
            
            // Get current cursor dimensions
            const rect = this.cursorElement.getBoundingClientRect();
            const offsetX = rect.width / 2;
            const offsetY = rect.height / 2;
            
            this.cursorElement.style.transform = `translate3d(${this.currentX - offsetX}px, ${this.currentY - offsetY}px, 0)`;
            
            this.animationFrame = requestAnimationFrame(updateCursor);
        };
        
        updateCursor();
    }
    
    showHint() {
        const hint = document.createElement('div');
        hint.className = 'cursor-hint';
        hint.innerHTML = 'Click any element to transform your cursor • Hover to preview • Click cards & forms to copy entire containers';
        document.body.appendChild(hint);
        
        setTimeout(() => {
            hint.style.opacity = '0';
            setTimeout(() => hint.remove(), 500);
        }, 5000);
    }
    
    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        this.showSystemCursor();
        document.body.style.cursor = 'auto';
    }
}