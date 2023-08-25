import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import { Context } from "..";
import { useContext, useEffect } from "react";
import { fetchAnnounce } from "../http/AnnounceApi";
import ReactMarkdown from "react-markdown";
import "react-quill/dist/quill.snow.css";
import rehypeRaw from 'rehype-raw'

const Anounce = observer(() => {
  const { announ } = useContext(Context);

  useEffect(() => {
    fetchAnnounce().then((data) => announ.setAnnounces(data));
  }, []);

  return (
    <div style={{ backgroundColor: '#cdcaca' }}>
      <Container style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        {announ.announces.map((ann) => {
          return <div className="ql-editor" style={{ backgroundColor: "white", fontSize: "20px", fontFamily: "Roboto", borderRadius: "20px", boxShadow: "0px 0px 18px #198754", padding: "20px" }}>
            <ReactMarkdown children={ann.name} rehypePlugins={[rehypeRaw]} />
          </div>
        })}
      </Container>
    </div>
  );
});

export default Anounce;
