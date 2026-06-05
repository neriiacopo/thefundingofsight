export default function Cell({
    node,
    width,
    height,
    hovered,
    onSubEnter,
    onSubLeave,
    onSubClick,
}) {
    const x0 = node.x0 - 4;
    const y0 = node.y0 - 4;
    const bw = node.x1 - node.x0 + 4;
    const bh = node.y1 - node.y0 + 4;
    // const bw = node.x1 - node.x0 - 5;
    // const bh = node.y1 - node.y0 - 5;
    const subs = node.data.subs;
    const totalSub = subs.reduce((s, d) => s + d.value, 0);

    const safeId = String(node.data.name).replace(/[^a-zA-Z0-9_-]/g, "-");

    const isHovered = hovered != null;
    const isCellHovered = hovered?.cell === node.data.name;

    let cx = 0;

    const ht = 2;
    const ht2 = 1;

    return (
        <g transform={`translate(${x0},${y0})`}>
            <rect
                width={bw}
                height={bh}
                fill="var(--cell-base)"
            />

            {subs.map((sub, i) => {
                const sw = (sub.value / totalSub) * bw;
                const tx = cx;
                cx += sw;

                const clipId = `clip-${safeId}-${i}`;
                const filterId = `tint-${safeId}-${i}`;
                const isSubHovered = hovered?.label === sub.name;

                return (
                    <g
                        key={sub.name}
                        transform={`translate(${tx},0)`}
                    >
                        <defs>
                            <clipPath id={clipId}>
                                <rect
                                    width={sw}
                                    height={bh}
                                />
                            </clipPath>
                        </defs>

                        <g
                            clipPath={`url(#${clipId})`}
                            onClick={() => sub.article && onSubClick(node, sub)}
                            style={{ cursor: "zoom-in" }}
                        >
                            <image
                                href={sub.article?.img_url}
                                xlinkHref={sub.article?.img_url}
                                x={-(x0 + tx)}
                                y={-y0}
                                width={width}
                                height={height}
                                preserveAspectRatio="xMidYMid slice"
                                opacity={
                                    !isHovered ? 1 : isSubHovered ? 1 : 0.3
                                }
                                style={{
                                    filter: "grayscale(1)",
                                    transition: "opacity 400ms ease",
                                }}
                                onMouseMove={(e) => onSubEnter(e, node, sub)}
                                onMouseLeave={onSubLeave}
                            />

                            <rect
                                width={sw}
                                height={bh}
                                fill={sub.color}
                                opacity={1}
                                style={{
                                    pointerEvents: "none",
                                    mixBlendMode: "overlay",
                                    transition: "opacity 400ms ease ",
                                }}
                                opacity={
                                    !isHovered ? 1 : isSubHovered ? 1 : 0.1
                                }
                            />

                            <rect
                                width={sw}
                                height={bh}
                                fill={sub.color}
                                opacity={isSubHovered ? 0.7 : 0.5}
                                style={{
                                    pointerEvents: "none",
                                    mixBlendMode: "color-burn",
                                    filter: !isHovered
                                        ? "none"
                                        : isSubHovered
                                          ? "none"
                                          : "grayscale(1)",
                                    transition: "opacity 180ms ease",
                                }}
                            />
                            {/* <rect
                                x={sw - 10}
                                width={10}
                                height={10}
                                fill={sub.color}
                                opacity={isSubHovered ? 0 : 1}
                                style={{
                                    pointerEvents: "none",
                                    transition: "opacity 180ms ease",
                                }}
                            /> */}
                        </g>

                        {/* Highlight sub-sector */}
                        <g transform={`translate(${ht / 2},${ht / 2})`}>
                            <rect
                                width={sw - ht - 1}
                                height={bh - ht - 1}
                                fill="none"
                                stroke={isSubHovered ? "white" : "transparent"}
                                strokeWidth={isSubHovered ? ht : 0}
                                vectorEffect="non-scaling-stroke"
                                style={{
                                    pointerEvents: "none",
                                    transition:
                                        "stroke 180ms ease, stroke-width 180ms ease",
                                }}
                            />
                        </g>
                    </g>
                );
            })}

            {/* Highlight company */}
            <g transform={`translate(${ht2 / 2},${ht2 / 2})`}>
                <rect
                    width={bw - ht2 - 1}
                    height={bh - ht2 - 1}
                    fill="none"
                    stroke={isCellHovered ? "white" : "transparent"}
                    strokeWidth={isCellHovered ? ht2 : 0}
                    vectorEffect="non-scaling-stroke"
                    style={{
                        pointerEvents: "none",
                        transition:
                            "stroke 180ms ease, stroke-width 180ms ease",
                    }}
                />
            </g>
        </g>
    );
}
