class ButtonCursor {
    constructor(originalElement) {
        this.originalElement = originalElement;
        this.element = null;
        this.styles = this.extractStyles();
    }
    
    extractStyles() {
        const computed = window.getComputedStyle(this.originalElement);
        const rect = this.originalElement.getBoundingClientRect();
        return {
            width: rect.width + 'px',
            height: rect.height + 'px',
            background: computed.background,
            backgroundImage: computed.backgroundImage,
            backgroundColor: computed.backgroundColor,
            color: computed.color,
            borderRadius: computed.borderRadius,
            border: computed.border,
            padding: computed.padding,
            fontFamily: computed.fontFamily,
            fontWeight: computed.fontWeight,
            fontSize: computed.fontSize,
            boxShadow: computed.boxShadow,
            text: this.originalElement.textContent || 'Button',
            display: computed.display,
            textAlign: computed.textAlign,
            lineHeight: computed.lineHeight
        };
    }
    
    render() {
        this.element = document.createElement('div');
        this.element.className = 'cursor-element';
        
        // Apply all styles to match original button
        this.element.style.width = this.styles.width;
        this.element.style.height = this.styles.height;
        if (this.styles.backgroundImage && this.styles.backgroundImage !== 'none') {
            this.element.style.backgroundImage = this.styles.backgroundImage;
        }
        this.element.style.background = this.styles.background;
        this.element.style.backgroundColor = this.styles.backgroundColor;
        this.element.style.color = this.styles.color;
        this.element.style.borderRadius = this.styles.borderRadius;
        this.element.style.border = this.styles.border;
        this.element.style.padding = this.styles.padding;
        this.element.style.fontFamily = this.styles.fontFamily;
        this.element.style.fontWeight = this.styles.fontWeight;
        this.element.style.fontSize = this.styles.fontSize;
        this.element.style.boxShadow = this.styles.boxShadow;
        this.element.style.display = 'flex';
        this.element.style.alignItems = 'center';
        this.element.style.justifyContent = 'center';
        this.element.style.textAlign = this.styles.textAlign || 'center';
        this.element.style.lineHeight = this.styles.lineHeight;
        this.element.textContent = this.styles.text;
        
        // Add mouse down effect
        document.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mouseup', this.handleMouseUp);
        
        return this.element;
    }
    
    handleMouseDown = () => {
        if (this.element) {
            this.element.style.transform = 'scale(0.95)';
        }
    }
    
    handleMouseUp = () => {
        if (this.element) {
            this.element.style.transform = 'scale(1)';
        }
    }
    
    scaleValue(value, scale) {
        const match = value.match(/(\d+(?:\.\d+)?)(px|em|rem|%)/);
        if (match) {
            const num = parseFloat(match[1]);
            const unit = match[2];
            return `${num * scale}${unit}`;
        }
        return value;
    }
    
    init() {
        // Button is ready
    }
    
    updateState(state) {
        // Update button state if needed
    }
    
    destroy() {
        document.removeEventListener('mousedown', this.handleMouseDown);
        document.removeEventListener('mouseup', this.handleMouseUp);
    }
}