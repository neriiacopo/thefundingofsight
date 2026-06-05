import { useEffect, useRef, useState } from "react";
import { COLORS } from "./data/colors.js";
import { SPONSORS } from "./data/sponsors.js";
import styles from "./Nav.module.css";

export default function Nav({
    selectedSub,
    year,
    setYear,
    conference,
    setConference,
    sector,
    setSector,
}) {
    const conferences = ["CVPR", "ICCV", "ECCV"];
    const years = SPONSORS.reduce((s, d) => {
        if (!s.includes(d.Year)) s.push(d.Year);
        return s;
    }, []);

    const labels = COLORS.map((item) => item.label);

    return (
        <nav className={styles.banner}>
            <Dropdown
                selectedOption={conference}
                label="Conference"
                options={conferences}
                disabled={selectedSub != null}
                setX={setConference}
            />
            <Dropdown
                selectedOption={year}
                label="Year"
                options={years}
                setX={setYear}
            />
            <Dropdown
                selectedOption={sector}
                label="Sector"
                options={labels}
                disabled={selectedSub == null}
                setX={setSector}
            />
        </nav>
    );
}

function Dropdown({
    selectedOption,
    label,
    options = [],
    disabled = false,
    setX,
}) {
    const ref = useRef(null);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(selectedOption);

    useEffect(() => {
        setSelected(selectedOption);
    }, [selectedOption]);

    useEffect(() => {
        function handleClickOutside(e) {
            if (!ref.current?.contains(e.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`${styles.dropdown} ${disabled ? styles.disabled : ""}`}
        >
            <button
                className={styles.trigger}
                onClick={() => !disabled && setOpen((v) => !v)}
                type="button"
                disabled={disabled}
            >
                <span className={styles.label}>{label}</span>
                <span className={styles.value}>
                    {!selectedOption || disabled ? "-" : selected}
                </span>
            </button>

            {!disabled && open && (
                <div className={styles.menu}>
                    {options.map((option) => (
                        <button
                            key={option}
                            className={styles.option}
                            style={{}}
                            onClick={() => {
                                setX(option);
                                setSelected(option);
                                setOpen(false);
                            }}
                            type="button"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
