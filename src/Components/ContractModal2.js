import { useState, useEffect, useContext } from "react";
import details1 from "./../imgs/contract1_details_1.jpg";
import details2 from "./../imgs/contract1_details_2.jpg";
import { Button, Container, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchAllCourses } from "../http/courseApi";
import axios from "axios";
import { saveAs } from "file-saver";
import translate from 'translate';

const ContractModal2 = observer(({ setVisible, setLoading }) => {
  const [serNumberEmpty, setSerNumberEmpty] = useState(false);
  const [dirNumberEmpty, setDirNumberEmpty] = useState(false);
  const [fullNameEmpty, setFullNameEmpty] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [checked, setChecked] = useState(true);

  const [serNumberError, setSerNumberError] = useState("Заполните это поле!");
  const [dirNumberError, setDirNumberError] = useState("Заполните это поле!");
  const [fullNameError, setFullNameError] = useState("Заполните это поле!");

  const [server, setServer] = useState({});
  const [cour, setCour] = useState("");
  const [date, setDate] = useState("");
  const [newDate, setNewDate] = useState("___.___.2022 по ___.___.2022");
  const [price, setPrice] = useState('');

  const [img, setImg] = useState(false);
  const [img2, setImg2] = useState(false);

  const [pdf, setPdf] = useState({
    serialNamber: "",
    directionNamber: "",
    fullName: "",
    address: `__________________________________
              __________________________________
              __________________________________`,
    mobilePhone: "___________________________",
    homePhone: "___________________________",
  });

  const { course } = useContext(Context);

  translate.engine = "google"; 
  translate.key = process.env.GOOGLE_KEY;

  useEffect( () => {
    if (!checked || serNumberError || dirNumberError || fullNameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
 }, [checked, serNumberError, dirNumberError, fullNameError])

 useEffect(() => {
  fetchAllCourses().then((data) => course.setAllCourses(data));
}, []);

  useEffect(() => {
    course.allCourses.forEach((cours) => {
      if (cours.number == pdf.serialNamber) {
        setCour(cours.name);
        setDate(cours.date);
        setPrice(cours.price);
      }
    });
  }, [pdf.serialNamber]);

  useEffect(() => {
    if (date) {
      let dates = date.split("-");
      dates = dates.map(function (el) {
        return el + ".2022";
      });
      dates[0] = dates[0] + " по ";
      let res = dates.join("");
      setNewDate(res);
    }
  }, [date]);

  function clickDetails1() {
    if (img) {
      setImg(false);
    } else {
      setImg(true);
    }
  }

  function clickDetails2() {
    if (img2) {
      setImg2(false);
    } else {
      setImg2(true);
    }
  }

  function createAndDownloadPdf() {
    setLoading(true);
    axios
      .post("http://172.20.0.49:5000/create-pdf2", server)
      .then(() =>
        axios.get("http://172.20.0.49:5000/contract2", { responseType: "blob" })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        const text = translate(pdf.fullName, { from : 'ru', to : "en"  });
        text.then(data => {
          data = data.split(' ').join('_');
          saveAs(pdfBlob, `BGMU_Dogovor_${data}.pdf`);
        })
      }).finally( () => setLoading(false));
    setVisible(false);
  }

  function handleChange({ target: { value, name } }) {
    setPdf({ ...pdf, [name]: value });
    if (!pdf.serialNamber) {
      setSerNumberError("Заполните это поле!");
    } else {
      setSerNumberError("");
    }
    if (!pdf.directionNamber) {
      setDirNumberError("Заполните это поле!");
    } else {
      setDirNumberError("");
    }
    if (!pdf.fullName) {
      setFullNameError("Заполните это поле!");
    } else {
      setFullNameError("");
    }
  }

  useEffect(() => {
    const newObj = {
      ...pdf,
      cour: cour,
      date: newDate,
      price: price,
    };
    setServer(newObj);
  }, [pdf]);

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "serialNamber":
        setSerNumberEmpty(true);
        break;
      case "directionNamber":
        setDirNumberEmpty(true);
        break;
      case "fullName":
        setFullNameEmpty(true);
        break;
    }
  };

  return (
    <div>
      <h5 className="modal1_title">
        Повышение квалификации специалиста(физ.лицо) на платной основе
      </h5>
      <div className="hr"></div>
      <div>
        <p className="modal1_p">
          Порядковый номер образовательной программы в соответствии со Сводным
          планом повышения квалификации и переподготовки руководящих работников
          и специалистов здравоохранения Республики Беларусь.
        </p>
        <div
          onClick={clickDetails1}
          className={img ? "details_1_active" : "details_1"}
        >
          Детали
        </div>
        <img
          className={img ? "modal1_img_active" : "modal1_img"}
          src={details1}
          alt=""
        />

        <div>
          {serNumberEmpty && serNumberError && (
            <div style={{ color: "red" }}>{serNumberError}</div>
          )}
          <input
            onBlur={(e) => blurHandler(e)}
            name="serialNamber"
            onChange={handleChange}
            type="text"
            placeholder="Введите порядковый номер..."
            className="modal1_input"
          />
          {course.allCourses.map((cours) => {
            if (cours.number == pdf.serialNamber) {
              return <div key={cours.id}> {cours.name} </div>;
            }
          })}
        </div>
      </div>
      <div className="hr"></div>
      <div>
        <p style={{ paddingTop: "1rem" }} className="modal1_p">
          Номер направления(См.подробнее)
        </p>
        <div
          onClick={clickDetails2}
          className={img2 ? "details_2_active" : "details_2"}
        >
          Детали
        </div>

        <img
          className={img2 ? "modal1_img2_active" : "modal1_img2"}
          src={details2}
          alt=""
        />

        <div>
          {dirNumberEmpty && dirNumberError && (
            <div style={{ color: "red" }}>{dirNumberError}</div>
          )}
          <input
            onBlur={(e) => blurHandler(e)}
            name="directionNamber"
            onChange={handleChange}
            type="text"
            placeholder="Введите номер направления..."
            className="modal1_input"
          />
        </div>
      </div>
      <div className="hr"></div>
      <div>
        {fullNameEmpty && fullNameError && (
          <div style={{ color: "red" }}>{fullNameError}</div>
        )}
        <input
          onBlur={(e) => blurHandler(e)}
          name="fullName"
          onChange={handleChange}
          placeholder="Фамилия, собственное имя, отчество..."
          className="modal1_input"
          type="text"
        />
      </div>
      <div>
        <input
          name="address"
          onChange={handleChange}
          placeholder="Адрес слушателя..."
          className="modal1_input"
          type="text"
        />
      </div>
      <div className="hr"></div>
      <p className="modal1_p">Мобильный номер телефона слушателя</p>
      <div>
        <input
          name="mobilePhone"
          onChange={handleChange}
          placeholder="Формат ввода: +375 99 999-99-99"
          className="modal1_input"
          type="text"
        />
      </div>
      <p className="modal1_p">Домашний номер телефона слушателя</p>
      <div>
        <input
          name="homePhone"
          onChange={handleChange}
          placeholder="Формат ввода: 999-99-99"
          className="modal1_input"
          type="text"
        />
      </div>
      <div className="hr"></div>

      <div style={{ display: "flex" }}>
        <input id="check2" type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
        <label
          style={{
            marginLeft: "10px",
            marginTop: "-5px",
            fontFamily: "Roboto",
          }}
          htmlFor="check2"
        >
          Заполняя веб-форму и отправляя указанные в ней персональные данные, я
          выражаю свое согласие на обработку моих личных данных с целью
          обработки моего запроса и ответа на него.
        </label>
      </div>
      <div className="hr"></div>
      <Container>
        <Row>
          <Col sm={6} md={8} lg={9}></Col>
          <Col sm={6} md={4} lg={3}>
            <Button
              disabled={!formValid}
              onClick={createAndDownloadPdf}
              variant="success"
            >
              Сохранить
            </Button>
            <Button
              onClick={() => setVisible(false)}
              style={{ marginLeft: "0.5rem" }}
              variant="secondary"
            >
              Отменить
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
});

export default ContractModal2;
