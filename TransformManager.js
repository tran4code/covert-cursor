class TransformManager {
    constructor(cursorElement) {
        this.cursorElement = cursorElement;
        this.currentType = 'default';
        this.currentCursor = null;
        this.elementFactory = null;
        this.isTransitioning = false;
    }
    
    setElementFactory(factory) {
        this.elementFactory = factory;
    }
    
    transformTo(type, originalElement) {
        if (this.isTransitioning || type === this.currentType) return;
        
        this.isTransitioning = true;
        
        // Create new cursor element
        const newCursor = this.elementFactory.createElement(type, originalElement);
        if (!newCursor) {
            this.isTransitioning = false;
            return;
        }
        
        // Prepare for transition
        this.cursorElement.classList.add('transitioning');
        
        // Clean up old cursor
        if (this.currentCursor) {
            this.currentCursor.destroy();
        }
        
        // Clear cursor element
        this.cursorElement.innerHTML = '';
        this.cursorElement.className = 'custom-cursor transitioning';
        
        // Apply new cursor
        const cursorContent = newCursor.render();
        this.cursorElement.appendChild(cursorContent);
        this.cursorElement.classList.add(`cursor-${type}`);
        
        // Store references
        this.currentType = type;
        this.currentCursor = newCursor;
        
        // Initialize the new cursor
        newCursor.init();
        
        // End transition
        setTimeout(() => {
            this.cursorElement.classList.remove('transitioning');
            this.isTransitioning = false;
        }, 200);
    }
    
    revertToDefault() {
        if (this.currentType === 'default' && this.cursorElement.querySelector('.default-arrow')) return;
        
        this.isTransitioning = true;
        
        // Only add transitioning class if we're not initializing
        if (this.currentType !== 'default') {
            this.cursorElement.classList.add('transitioning');
        }
        
        // Clean up current cursor
        if (this.currentCursor) {
            this.currentCursor.destroy();
            this.currentCursor = null;
        }
        
        // Reset to default
        const resetCursor = () => {
            this.cursorElement.innerHTML = '';
            this.cursorElement.className = 'custom-cursor cursor-default';
            this.currentType = 'default';
            
            // Add default arrow
            const arrow = document.createElement('div');
            arrow.className = 'default-arrow';
            this.cursorElement.appendChild(arrow);
            
            setTimeout(() => {
                this.cursorElement.classList.remove('transitioning');
                this.isTransitioning = false;
            }, 50);
        };
        
        // If initializing, set immediately
        if (this.currentType === 'default') {
            resetCursor();
        } else {
            // Otherwise animate the transition
            setTimeout(resetCursor, 150);
        }
    }
    
    getCurrentType() {
        return this.currentType;
    }
    
    updateCursorState(state) {
        if (this.currentCursor && this.currentCursor.updateState) {
            this.currentCursor.updateState(state);
        }
    }
}