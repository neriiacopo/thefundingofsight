import { useEffect, useState } from "react";

export default function StaticNoiseBackground() {
    const [noiseA, setNoiseA] = useState(null);

    useEffect(() => {
        generateNoiseBase64({ baseFrequency: 0.99 }).then(setNoiseA);
    }, []);

    return (
        <>
            {/* Top Noise screen */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100dvh",
                    zIndex: 50,
                    filter: "grayscale(1)",
                    backgroundImage: `url(${noiseA})`,
                    backgroundSize: "cover",
                    mixBlendMode: "color-dodge",

                    opacity: noiseA ? 0.8 : 0,
                    transition: "opacity 0.3s ease-in-out",
                    pointerEvents: "none",
                }}
            />
        </>
    );
}

function generateNoiseBase64({
    baseFrequency = 0.05,
    width = window.innerWidth,
    height = window.innerHeight,
}) {
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <filter id="turbulence">
        <feTurbulence type="fractalNoise" baseFrequency="${baseFrequency}" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#turbulence)" />
    </svg>`;

    const svgBlob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);

    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);
            resolve(canvas.toDataURL("image/png"));
        };
        img.src = url;
    });
}
