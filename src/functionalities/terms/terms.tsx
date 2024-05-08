import { useEffect, useState } from "react";
import { MyMarkdown } from "../../_components/reuse/my-markdown";

export const Terms = () => {
  const [terms, setTerms] = useState("");
  useEffect(() => {
    const background = fetch("/terms.txt");
    background.then((response) => {
      response.text().then((data) => {
        setTerms(data);
      });
    });
  }, []);

  return (
    <div style={{ marginLeft: "20px" }}>
      <MyMarkdown text={terms}></MyMarkdown>;
    </div>
  );
};
