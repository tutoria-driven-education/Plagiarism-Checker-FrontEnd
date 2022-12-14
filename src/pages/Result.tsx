import { useContext, useEffect } from "react";
import { ResultContext } from "../hooks/ResultContext";
import Results from "../styles/Results";
import Head from "../components/Head";
import Column from "../components/Column";

export default function Result() {
  const { result, setResult } = useContext(ResultContext);

  useEffect(() => {
    const storageResult = localStorage.getItem("result");

    if (storageResult) {
      setResult(JSON.parse(storageResult)[0]);
    }
  }, []);

  return (
    <>
      {result.table ? (
        <>
          <Results.Container>
            <Head innerHTML={result.table} />
            <Results.Row>
              {result.columns.map((column, index) => (
                <Column key={index} innerHTML={column} />
              ))}
            </Results.Row>
          </Results.Container>
        </>
      ) : (
        <>
          <h1>Carregando...</h1>
        </>
      )}
    </>
  );
}
