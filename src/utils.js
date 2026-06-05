export const hexToRgb01 = (hex) => {
    const clean = hex.replace("#", "");
    const bigint = parseInt(clean, 16);

    return {
        r: ((bigint >> 16) & 255) / 255,
        g: ((bigint >> 8) & 255) / 255,
        b: (bigint & 255) / 255,
    };
};

const hexToHSL = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    ((r /= 255), (g /= 255), (b /= 255));
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h,
        s,
        l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);

    var colorInHSL = "hsl(" + h + ", " + s + "%, " + l + "%)";
    return { h, s, l, colorInHSL };
};

function clipLCrv(hex, [min, max]) {
    const { h, s, l } = hexToHSL(hex);
    const clippedL = Math.max(min, Math.min(max, l));
    return `hsl(${h}, ${s}%, ${clippedL}%)`;
}
