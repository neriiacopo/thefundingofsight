import styles from "./Tooltip.module.css";

export default function Tooltip({ node, sub, x, y, totalAll }) {
    if (!node || !sub) return null;

    const totalSub = node.data.subs.reduce((s, d) => s + d.value, 0);
    const pctGroup = Math.round((sub.value / totalSub) * 100);
    const pctTotal = Math.round((sub.value / totalAll) * 100);

    return (
        // NO COLOR
        <div
            className={styles.tooltip}
            style={{ left: x, top: y }}
        >
            {/* <p className={styles.parent}>{node.data.name}</p>
            <p className={styles.name}>{sub.name}</p> */}
            <p className={styles.name}>{node.data.name}</p>
            <div
                className={styles.row}
                // style={{ color: sub.color }}
            >
                <span>{sub.name}</span>
            </div>
        </div>

        // BORDER COLOR
        // <div
        //     className={styles.tooltip}
        //     style={{ left: x, top: y, borderColor: sub.color, borderWidth: 2 }}
        // >
        //     {/* <p className={styles.parent}>{node.data.name}</p>
        //     <p className={styles.name}>{sub.name}</p> */}
        //     <p className={styles.name}>{node.data.name}</p>
        //     <div
        //         className={styles.row}
        //         style={{ color: sub.color }}
        //     >
        //         <span>{sub.name}</span>
        //     </div>
        // </div>

        // BACKGROUND COLOR
        // <div
        //     className={styles.tooltip}
        //     style={{ left: x, top: y, backgroundColor: sub.color }}
        // >
        //     {/* <p className={styles.parent}>{node.data.name}</p>
        //     <p className={styles.name}>{sub.name}</p> */}
        //     <p className={styles.name}>{node.data.name}</p>
        //     <div className={styles.row}>
        //         <span>{sub.name}</span>
        //     </div>
        // </div>
    );
}
