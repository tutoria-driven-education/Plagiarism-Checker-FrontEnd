import { useCallback, useContext, useState } from "react";
import { BiCodeBlock, BiGitBranch, BiGitRepoForked } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { oneToOneSchema } from "../schema/formSchema";
import { ResultContext } from "../hooks/ResultContext";
import Loading from "../components/Loading";
import { checkOneToOne } from "../services/api";
import projects from "../data/projectsData";
import useForm from "../hooks/UseForm";
import Form from "../styles/Form";
import { toast } from "react-toastify";
import { ValidationError } from "yup";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { values, handleChange } = useForm({ url1: "", url2: "", project: "" });

  const navigate = useNavigate();
  const { setResult } = useContext(ResultContext);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        setIsSubmitting(true);

        await oneToOneSchema.validate(values, { abortEarly: true });

        const response = await checkOneToOne(values);

        if (response.status === 200) {
          setResult(response.data[0]);
          localStorage.setItem("result", JSON.stringify(response.data) as string);
          navigate("/result");
        }
      } catch (error: any) {
        if (error instanceof ValidationError) {
          return toast.error(`${error.message}`);
        }

        return toast.error(error.response.data.message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, isSubmitting]
  );

  return (
    <>
      <Form.Container>
        {isSubmitting ? (
          <>
            <Loading message="Aguarde! Estamos analisando os projetos!" />
          </>
        ) : (
          <Form.Horizontal onSubmit={handleSubmit} login={false}>
            <Form.Group>
              <Form.Control
                name="url1"
                autoComplete="off"
                placeholder="Entregue"
                onChange={handleChange}
                value={values.url1}
                disabled={isSubmitting}
                active={values.url1 ? true : false}
              />
              <Form.LabelIcon>
                <BiGitBranch />
              </Form.LabelIcon>
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="url2"
                autoComplete="off"
                placeholder="Fonte"
                onChange={handleChange}
                value={values.url2}
                disabled={isSubmitting}
                active={values.url2 ? true : false}
              />
              <Form.LabelIcon>
                <BiGitRepoForked />
              </Form.LabelIcon>
            </Form.Group>
            <Form.Group>
              <Form.Select
                name="project"
                onChange={handleChange}
                active={values.project ? true : false}
              >
                <option>Selecione um projeto</option>
                {projects.map((project) => (
                  <option key={project} value={project}>
                    {project}
                  </option>
                ))}
              </Form.Select>
              <Form.LabelIcon>
                <BiCodeBlock />
              </Form.LabelIcon>
            </Form.Group>
            <Form.Group>
              <Form.Submit type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <ThreeDots
                    height="45"
                    width="65"
                    radius="9"
                    color="#fff"
                    ariaLabel="three-dots-loading"
                    visible={true}
                  />
                ) : (
                  "Enviar"
                )}
              </Form.Submit>
            </Form.Group>
            <Form.Navigate to="/history">
              Hist??rico de compara????es
            </Form.Navigate>
            <Form.Navigate to="/one-to-database">
              Comparar com base de dados
            </Form.Navigate>
          </Form.Horizontal>
        )}
      </Form.Container>
    </>
  );
}
