import styles from "./Colophon.module.css";
import { FaGithub } from "react-icons/fa";

export default function Colophon() {
    return (
        <div className={styles.banner}>
            <span className={styles.title}>The Funding of Sight</span>
            <span className={styles.credits}>
                N. Garcia, I. Neri, L. Schaerf
                <a
                    href="https://github.com/neriiacopo/thefundingofsight"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconlink}
                    aria-label="GitHub repository"
                    // style={{ marginLeft: "12px", color: "var(--text)" }}
                >
                    <FaGithub />
                </a>
            </span>
        </div>
    );
}
