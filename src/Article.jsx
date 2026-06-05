import { useEffect, useState, useRef } from "react";
import styles from "./Article.module.css";

export default function Article({ year, sector, articles, selectedSub }) {
    if (!selectedSub) return null;
    if (!sector) return null;
    if (!year) return null;
    if (!articles) return null;

    const [article, setArticle] = useState(null);

    useEffect(() => {
        const article = articles.filter(
            (article) => article.year === year && article.sector === sector,
        )[0];
        setArticle(article);
    }, [year, sector, articles]);

    if (!article) return null;

    return (
        <>
            <div
                className={styles.article}
                style={{ left: "15vw", top: "20vh" }}
                onClick={() => {
                    window.open(article.article_url, "_blank");
                }}
            >
                <div className={styles.row}>
                    <span>{article.published}</span>
                </div>
                {/* <p className={styles.parent}>{node.data.name}</p>
            <p className={styles.name}>{sub.name}</p> */}
                <p className={styles.title}>{article.title}</p>
                <div className={styles.row}>
                    <span>{article.summary}</span>
                </div>
                <br />
                <div className={styles.more}>Read more</div>
            </div>

            {/* <div
                className={styles.article}
                style={{ right: "15vw", bottom: "20vh" }}
            >
                <div className={styles.row}>
                    <span>Sector</span>
                </div>
                <p className={styles.title}>{sector}</p>
            </div> */}
        </>
    );
}
