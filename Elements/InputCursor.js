class InputCursor {
    constructor(originalElement) {
        this.originalElement = originalElement;
        this.element = null;
        this.caretElement = null;
        this.textIndex = 0;
        this.sampleText = 'typing...';
        this.styles = this.extractStyles();
    }
    
    extractStyles() {
        const computed = window.getComputedStyle(this.originalElement);
        return {
            width: computed.width,
            height: computed.height,
            padding: computed.padding,
            border: computed.border,
            borderRadius: computed.borderRadius,
            background: computed.background,
            backgroundColor: computed.backgroundColor,
            color: computed.color,
            fontSize: computed.fontSize,
            fontFamily: computed.fontFamily
        };
    }
    
    render() {
        this.element = document.createElement('div');
        this.element.className = 'cursor-element';
        
        // Apply original input styles
        Object.assign(this.element.style, {
            width: this.styles.width,
            height: this.styles.height,
            padding: this.styles.padding,
            border: this.styles.border,
            borderRadius: this.styles.borderRadius,
            background: this.styles.background,
            backgroundColor: this.styles.backgroundColor,
            fontFamily: this.styles.fontFamily
        });
        
        // Create blinking caret
        this.caretElement = document.createElement('div');
        this.caretElement.className = 'cursor-caret';
        this.element.appendChild(this.caretElement);
        
        // Add text span
        this.textSpan = document.createElement('span');
        this.textSpan.style.fontSize = this.styles.fontSize;
        this.textSpan.style.color = this.styles.color;
        this.textSpan.style.marginLeft = '20px';
        this.element.appendChild(this.textSpan);
        
        return this.element;
    }
    
    init() {
        // Start typing animation
        this.startTypingAnimation();
    }
    
    startTypingAnimation() {
        this.typingInterval = setInterval(() => {
            this.textIndex = (this.textIndex + 1) % (this.sampleText.length + 1);
            const displayText = this.sampleText.substring(0, this.textIndex);
            if (this.textSpan) {
                this.textSpan.textContent = displayText;
            }
            
            // Move caret
            if (this.caretElement) {
                this.caretElement.style.left = `${12 + (this.textIndex * 8)}px`;
            }
        }, 200);
    }
    
    updateState(state) {
        // Update input state if needed
    }
    
    destroy() {
        if (this.typingInterval) {
            clearInterval(this.typingInterval);
        }
    }
}