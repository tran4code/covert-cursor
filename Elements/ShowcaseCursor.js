class ShowcaseCursor extends ContainerCursor {
    constructor(originalElement) {
        super(originalElement);
        // Full size - no scaling
        this.scale = 1;
    }
    
    createMiniatureContent() {
        // Clone the original showcase content
        const clonedShowcase = this.originalElement.cloneNode(true);
        
        // Scale all elements inside
        clonedShowcase.style.transform = `scale(${this.scale})`;
        clonedShowcase.style.transformOrigin = 'top left';
        clonedShowcase.style.width = `${100 / this.scale}%`;
        clonedShowcase.style.height = `${100 / this.scale}%`;
        
        // Remove IDs to avoid conflicts
        clonedShowcase.querySelectorAll('[id]').forEach(el => {
            el.removeAttribute('id');
        });
        
        // Disable all interactive elements
        clonedShowcase.querySelectorAll('input, button, textarea, select, a').forEach(el => {
            el.disabled = true;
            el.style.pointerEvents = 'none';
            if (el.tagName === 'A') {
                el.onclick = (e) => e.preventDefault();
            }
        });
        
        // Make sure the cloned content fits
        clonedShowcase.style.position = 'absolute';
        clonedShowcase.style.top = '0';
        clonedShowcase.style.left = '0';
        
        this.element.appendChild(clonedShowcase);
    }
}