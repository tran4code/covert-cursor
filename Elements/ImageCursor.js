class ImageCursor {
    constructor(originalElement) {
        this.originalElement = originalElement;
        this.element = null;
        this.imageSrc = originalElement.src;
    }
    
    render() {
        this.element = document.createElement('div');
        this.element.className = 'cursor-element';
        
        // Create mini image
        this.img = document.createElement('img');
        this.img.src = this.imageSrc;
        this.img.alt = 'cursor image';
        
        // Handle image load error
        this.img.onerror = () => {
            this.element.innerHTML = '📷';
            this.element.style.fontSize = '20px';
            this.element.style.textAlign = 'center';
            this.element.style.lineHeight = '30px';
        };
        
        this.element.appendChild(this.img);
        
        // Add zoom effect on mouse down
        document.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mouseup', this.handleMouseUp);
        
        return this.element;
    }
    
    handleMouseDown = () => {
        if (this.element) {
            this.element.style.transform = 'scale(1.1)';
        }
    }
    
    handleMouseUp = () => {
        if (this.element) {
            this.element.style.transform = 'scale(1)';
        }
    }
    
    init() {
        // Image cursor is ready
    }
    
    updateState(state) {
        // Update image state if needed
    }
    
    destroy() {
        document.removeEventListener('mousedown', this.handleMouseDown);
        document.removeEventListener('mouseup', this.handleMouseUp);
    }
}