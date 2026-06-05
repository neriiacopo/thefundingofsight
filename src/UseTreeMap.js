import { useMemo } from "react";
import * as d3 from "d3";

/**
 * Computes D3 treemap layout nodes from DATA.
 * Returns an array of outer nodes, each with x0/y0/x1/y1 and data.subs.
 *
 * @param {Array}  data   — top-level DATA array
 * @param {number} width  — canvas width in px
 * @param {number} height — canvas height in px
 */
export function useTreemap(data, width, height) {
    return useMemo(() => {
        if (!width || !height) return [];

        const root = d3
            .hierarchy({ name: "root", children: data })
            .sum((d) => d.value)
            .sort((a, b) => b.value - a.value);

        d3
            .treemap()
            .size([width, height])
            .paddingOuter(4)
            .paddingInner(3)
            .round(true)(root);

        return root.children;
    }, [data, width, height]);
}
