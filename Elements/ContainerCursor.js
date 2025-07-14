class ContainerCursor {
    constructor(originalElement) {
        this.originalElement = originalElement;
        this.element = null;
        this.scale = 1; // Full size - exact copy
        this.styles = this.extractStyles();
    }
    
    extractStyles() {
        const computed = window.getComputedStyle(this.originalElement);
        const rect = this.originalElement.getBoundingClientRect();
        
        return {
            width: rect.width,
            height: rect.height,
            background: computed.background,
            backgroundColor: computed.backgroundColor,
            border: computed.border,
            borderRadius: computed.borderRadius,
            boxShadow: computed.boxShadow,
            padding: computed.padding
        };
    }
    
    render() {
        this.element = document.createElement('div');
        this.element.className = 'cursor-element cursor-container';
        
        // Get actual dimensions
        const rect = this.originalElement.getBoundingClientRect();
        const scaledWidth = rect.width * this.scale;
        const scaledHeight = rect.height * this.scale;
        
        // Apply styles with computed values
        const computed = window.getComputedStyle(this.originalElement);
        Object.assign(this.element.style, {
            width: scaledWidth + 'px',
            height: scaledHeight + 'px',
            background: computed.background,
            backgroundColor: computed.backgroundColor,
            backgroundImage: computed.backgroundImage,
            border: computed.border,
            borderRadius: this.scaleValue(computed.borderRadius, this.scale),
            boxShadow: computed.boxShadow,
            overflow: 'hidden',
            position: 'relative'
        });
        
        // Create miniature content
        this.createMiniatureContent();
        
        return this.element;
    }
    
    scaleValue(value, scale) {
        const match = value.match(/(\d+(?:\.\d+)?)(px|em|rem|%)/);
        if (match) {
            const num = parseFloat(match[1]);
            const unit = match[2];
            if (unit === 'px') {
                return `${num * scale}${unit}`;
            }
        }
        return value;
    }
    
    createMiniatureContent() {
        // To be overridden by subclasses
    }
    
    init() {
        // Container is ready
    }
    
    updateState(state) {
        // Update container state if needed
    }
    
    destroy() {
        // Cleanup
    }
}