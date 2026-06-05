import { useState, useCallback, useEffect } from "react";
import Nav from "./Nav.jsx";
import Colophon from "./Colophon.jsx";
import Article from "./Article.jsx";
import Treemap from "./Treemap.jsx";
import { ARTICLES } from "./data/articles.js";
import { COMPANIES } from "./data/companies.js";
import { SPONSORS } from "./data/sponsors.js";
import { COLORS } from "./data/colors.js";

export default function App() {
    const [selectedSub, setSelectedSub] = useState(null);
    const [year, setYear] = useState(2024);
    const [conference, setConference] = useState("CVPR");
    const [sector, setSector] = useState("");

    const [data, setData] = useState([]);

    const getLabelMeta = (label) =>
        COLORS.find((item) => item.label === label) ?? {
            label,
            color: "#999999",
            url: "",
        };

    useEffect(() => {
        const d = SPONSORS.filter((sponsor) => sponsor.Year === year).map(
            (sponsor) => {
                const company = COMPANIES.find(
                    (company) => company.company_id === sponsor.comp_id,
                );

                const macs = Object.keys(company.labels);

                const els = macs.map((label) => {
                    const meta = getLabelMeta(label);

                    return {
                        name: label,
                        value: company.labels[label],
                        color: meta.color,
                        url: meta.url,
                        article: ARTICLES.filter(
                            (article) =>
                                article.year === year &&
                                article.sector === label,
                        )[0],
                    };
                });

                return {
                    name: sponsor.Company,
                    value: sponsor.price_tag,
                    subs: els.filter((el) => el.value > 0),
                };
            },
        );

        setData(d);
    }, [year, conference]);

    return (
        <>
            <Nav
                selectedSub={selectedSub}
                year={year}
                setYear={setYear}
                conference={conference}
                setConference={setConference}
                sector={sector}
                setSector={setSector}
            />

            {ARTICLES && COMPANIES && data.length > 0 && (
                <>
                    <Treemap
                        data={data}
                        selectedSub={selectedSub}
                        setSelectedSub={setSelectedSub}
                        setSector={setSector}
                        sector={sector}
                        year={year}
                    />

                    <Article
                        year={year}
                        sector={sector}
                        articles={ARTICLES}
                        selectedSub={selectedSub}
                    />
                </>
            )}
            <Colophon />
        </>
    );
}
