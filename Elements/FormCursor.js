class FormCursor extends ContainerCursor {
    constructor(originalElement) {
        super(originalElement);
        // Full size - no scaling
        this.scale = 1;
    }
    
    createMiniatureContent() {
        // Clone the original form content
        const clonedForm = this.originalElement.cloneNode(true);
        
        // Scale all elements inside
        clonedForm.style.transform = `scale(${this.scale})`;
        clonedForm.style.transformOrigin = 'top left';
        clonedForm.style.width = `${100 / this.scale}%`;
        clonedForm.style.height = `${100 / this.scale}%`;
        
        // Remove IDs to avoid conflicts
        clonedForm.querySelectorAll('[id]').forEach(el => {
            el.removeAttribute('id');
        });
        
        // Disable all interactive elements
        clonedForm.querySelectorAll('input, button, textarea, select').forEach(el => {
            el.disabled = true;
            el.style.pointerEvents = 'none';
        });
        
        // Make sure the cloned content fits
        clonedForm.style.position = 'absolute';
        clonedForm.style.top = '0';
        clonedForm.style.left = '0';
        
        this.element.appendChild(clonedForm);
    }
}