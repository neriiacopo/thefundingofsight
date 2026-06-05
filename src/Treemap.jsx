import { useState, useCallback, useEffect } from "react";
import * as d3 from "d3";
import { useSize } from "./useSize.js";
import { useTreemap } from "./useTreemap.js";
import Cell from "./Cell.jsx";
import Tooltip from "./Tooltip.jsx";
import styles from "./Treemap.module.css";
import Noise from "./Noise.jsx";

const TOOLTIP_OFFSET = { x: 16, y: -80 };
const TOOLTIP_MARGIN = { x: 200, y: 8 };

export default function Treemap({
    data,
    selectedSub,
    setSelectedSub,
    setSector,
    sector,
    year,
}) {
    const { ref, width, height } = useSize();
    const nodes = useTreemap(data, width, height);
    const totalAll = d3.sum(data, (d) => d.value);
    const [hovered, setHovered] = useState(null);

    const [tooltip, setTooltip] = useState(null);

    useEffect(() => {
        if (
            year &&
            sector &&
            selectedSub &&
            (sector !== selectedSub.sub.name ||
                year !== selectedSub.sub.article.year)
        ) {
            const firstSubMatchingSector = data
                .map((d) => d.subs.filter((el) => el.name === sector)[0])
                .filter((d) => d)[0];

            setSelectedSub({
                node: {},
                sub: firstSubMatchingSector,
            });
        }
    }, [sector, data, year]);

    const handleSubClick = useCallback((node, sub) => {
        setSelectedSub({ node, sub });
        setSector(sub.name);
    }, []);

    const handleCloseSelected = useCallback(() => {
        setSelectedSub(null);
        setSector("");
    }, []);

    const handleSubEnter = useCallback((evt, node, sub) => {
        const x = Math.min(
            evt.clientX + TOOLTIP_OFFSET.x,
            window.innerWidth - TOOLTIP_MARGIN.x,
        );
        const y = Math.max(evt.clientY + TOOLTIP_OFFSET.y, TOOLTIP_MARGIN.y);

        setTooltip({ node, sub, x, y });
        setHovered({
            label: sub.name,
            cell: node.data.name,
        });
    }, []);

    const handleSubLeave = useCallback(() => {
        setTooltip(null);
        setHovered(null);
    }, []);

    return (
        <div
            ref={ref}
            className={styles.container}
        >
            <Noise />
            {width > 0 && height > 0 && (
                <svg
                    width={width}
                    height={height}
                    className={styles.svg}
                >
                    {/* BACKGROUND IMG ON HOVERING */}
                    {/* <g
                        style={{
                            pointerEvents: "none",
                            zIndex: -1,
                        }}
                    >
                        <image
                            href={tooltip && tooltip.sub.url}
                            xlinkHref={tooltip && tooltip.sub.url}
                            x={0}
                            y={0}
                            width={width}
                            height={height}
                            preserveAspectRatio="xMidYMid slice"
                            opacity={tooltip ? 0.95 : 0}
                            style={{
                                filter: tooltip
                                    ? "grayscale(1) "
                                    : "grayscale(1) ",
                                transition: "all 400ms ease ",
                            }}
                        />

                        <rect
                            width={width}
                            height={height}
                            fill={tooltip && tooltip.sub.color}
                            opacity={tooltip ? 1 : 0}
                            style={{
                                pointerEvents: "none",
                                mixBlendMode: "overlay",
                                transition: "opacity 400ms ease ",
                            }}
                        />

                        <rect
                            width={width}
                            height={height}
                            fill={tooltip && tooltip.sub.color}
                            opacity={tooltip ? 0.5 : 0}
                            style={{
                                pointerEvents: "none",
                                mixBlendMode: "color-burn",
                                transition: "opacity 400ms ease ",
                            }}
                        />
                    </g> */}

                    {nodes.map((node) => (
                        <Cell
                            key={node.data.name}
                            node={node}
                            width={width}
                            height={height}
                            hovered={hovered}
                            onSubEnter={handleSubEnter}
                            onSubLeave={handleSubLeave}
                            onSubClick={handleSubClick}
                        />
                    ))}

                    {/* FULL SCREEN IMAGE ON SELECTION */}
                    <g
                        onClick={selectedSub && handleCloseSelected}
                        style={{
                            cursor: "zoom-out",
                            pointerEvents: selectedSub ? "all" : "none",
                        }}
                    >
                        <image
                            href={
                                selectedSub && selectedSub.sub.article.img_url
                            }
                            xlinkHref={
                                selectedSub && selectedSub.sub.article.img_url
                            }
                            x={0}
                            y={0}
                            width={width}
                            height={height}
                            preserveAspectRatio="xMidYMid slice"
                            opacity={selectedSub ? 0.95 : 0}
                            style={{
                                filter: selectedSub
                                    ? "grayscale(1) blur(0)"
                                    : "grayscale(1) blur(10px)",
                                // mixBlendMode: "screen",
                                transition: "all 400ms ease ",
                            }}
                        />

                        <rect
                            width={width}
                            height={height}
                            fill={selectedSub && selectedSub.sub.color}
                            opacity={selectedSub ? 1 : 0}
                            style={{
                                pointerEvents: "none",
                                mixBlendMode: "overlay",
                                transition: "opacity 400ms ease ",
                            }}
                        />

                        <rect
                            width={width}
                            height={height}
                            fill={selectedSub && selectedSub.sub.color}
                            opacity={selectedSub ? 0.5 : 0}
                            style={{
                                pointerEvents: "none",
                                mixBlendMode: "color-burn",
                                transition: "opacity 400ms ease ",
                            }}
                        />
                    </g>
                </svg>
            )}

            {tooltip && (
                <Tooltip
                    node={tooltip.node}
                    sub={tooltip.sub}
                    x={tooltip.x}
                    y={tooltip.y}
                    totalAll={totalAll}
                />
            )}
        </div>
    );
}
