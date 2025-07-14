class CardCursor extends ContainerCursor {
    constructor(originalElement) {
        super(originalElement);
        // Full size - no scaling
        this.scale = 1;
    }
    
    createMiniatureContent() {
        // Clone the original card content
        const clonedCard = this.originalElement.cloneNode(true);
        
        // Scale all elements inside
        clonedCard.style.transform = `scale(${this.scale})`;
        clonedCard.style.transformOrigin = 'top left';
        clonedCard.style.width = `${100 / this.scale}%`;
        clonedCard.style.height = `${100 / this.scale}%`;
        
        // Remove IDs to avoid conflicts
        clonedCard.querySelectorAll('[id]').forEach(el => {
            el.removeAttribute('id');
        });
        
        // Disable all interactive elements
        clonedCard.querySelectorAll('input, button, textarea, select, a').forEach(el => {
            el.disabled = true;
            el.style.pointerEvents = 'none';
            if (el.tagName === 'A') {
                el.onclick = (e) => e.preventDefault();
            }
        });
        
        // Make sure the cloned content fits
        clonedCard.style.position = 'absolute';
        clonedCard.style.top = '0';
        clonedCard.style.left = '0';
        
        this.element.appendChild(clonedCard);
    }
}