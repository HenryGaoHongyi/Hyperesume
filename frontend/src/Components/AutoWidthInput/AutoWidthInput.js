import React, { useRef, useEffect } from 'react';

const AutoWidthInput = ({ value, onChange, placeholder, ...props }) => {
    const inputRef = useRef(null);
    const spanRef = useRef(null);

    useEffect(() => {
        if (spanRef.current && inputRef.current) {
            const width = spanRef.current.offsetWidth;
            inputRef.current.style.width = `${width + 8}px`; // Add some padding
        }
    }, [value]);

    return (
        <div style={{ display: 'inline-block', position: 'relative' }}>
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{ outline: 'none', border:"none" }}
                {...props}
            />
            <span
                ref={spanRef}
                style={{
                    visibility: 'hidden',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    whiteSpace: 'pre',
                    fontSize: 'inherit',
                    fontFamily: 'inherit',
                    padding: '2px'
                }}
            >
                {value || placeholder}
            </span>
        </div>
    );
};

export default AutoWidthInput;