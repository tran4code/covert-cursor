class ElementFactory {
    constructor() {
        this.cursorTypes = {
            button: ButtonCursor,
            input: InputCursor,
            checkbox: CheckboxCursor,
            toggle: ToggleCursor,
            slider: SliderCursor,
            dropdown: DropdownCursor,
            link: LinkCursor,
            image: ImageCursor,
            progress: ProgressCursor,
            form: FormCursor,
            card: CardCursor,
            showcase: ShowcaseCursor
        };
    }
    
    createElement(type, originalElement) {
        const CursorClass = this.cursorTypes[type];
        if (!CursorClass) {
            console.warn(`Unknown cursor type: ${type}`);
            return null;
        }
        
        return new CursorClass(originalElement);
    }
    
    getComputedStyles(element) {
        const styles = window.getComputedStyle(element);
        return {
            color: styles.color,
            backgroundColor: styles.backgroundColor,
            borderRadius: styles.borderRadius,
            border: styles.border,
            fontSize: styles.fontSize,
            fontFamily: styles.fontFamily,
            fontWeight: styles.fontWeight,
            padding: styles.padding,
            boxShadow: styles.boxShadow
        };
    }
    
    scaleValue(value, scale = 0.3) {
        const match = value.match(/(\d+(?:\.\d+)?)(px|em|rem|%)/);
        if (match) {
            const num = parseFloat(match[1]);
            const unit = match[2];
            return `${num * scale}${unit}`;
        }
        return value;
    }
    
    createBaseElement(className = '') {
        const element = document.createElement('div');
        element.className = `cursor-element ${className}`;
        return element;
    }
}