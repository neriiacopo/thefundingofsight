import { useState, useEffect, useRef } from "react";

/**
 * Returns { ref, width, height } where ref should be attached to the
 * container element. Updates on ResizeObserver changes.
 */
export function useSize() {
    const ref = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!ref.current) return;
        const obs = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setSize({ width: Math.floor(width), height: Math.floor(height) });
        });
        obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return { ref, ...size };
}
