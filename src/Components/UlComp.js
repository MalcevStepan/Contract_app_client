import { Container, Row, Col } from 'react-bootstrap';
import LiComp from './LiComp';

function UlComp() {
    return(
        <div style={{backgroundColor: '#cdcaca', paddingTop: '5rem', paddingBottom: '5rem'}} >
            <Container>
                {/*<h4 style={{fontWeight: '400', textAlign: 'center'}} >При зачислении на программу повышения квалификации предоставить следующие документы:</h4>*/}
                <Row style={{marginTop: '1rem'}} >
                    <Col md={6} >
                        <p style={{fontSize: '20px'}}>
                            При получении <span className="span">направления на обучение за счет средств республиканского (местного) бюджета</span>
                             необходимо зарегистрироваться и распечатать <span className="span">заявление</span>. 
                        </p>
                        <p style={{fontSize: '20px'}}>
                            Для зачисления на обучение при прибытии на кафедру необходимо предоставить:
                        </p>
                        <LiComp text='Направление на обучение;' />
                        <LiComp text='Заявление на обучение, заверенное подписью;' />
                        <LiComp text='Копию документа, удостоверяющего личность (паспорта (стр. 31, 33) или вида на жительство (стр. 15, 17));' />
                        <LiComp text='Копию приказа руководителя о направлении/командировании на обучение.' />
                    </Col>
                    <Col md={6} >
                        <p style={{fontSize: '20px'}}>
                            При получении <span className="span">направления на обучение за счет средств направляющей организации или личных средств</span>
                             необходимо зарегистрироваться и распечатать <span className="span">договор</span>
                             об оказании услуг при реализации образовательной программы повышения квалификации руководящего работника (специалиста)
                             <span className="span">на платной основе и акт к нему в трех экземплярах</span>.
                        </p>
                        <p style={{fontSize: '20px'}}>
                            Для зачисления на обучение при прибытии на кафедру необходимо предоставить:
                        </p>
                        <LiComp text='Направление на обучение;' />
                        <LiComp text='Копию документа, удостоверяющего личность (паспорта (стр. 31, 33) или вида на жительство (стр. 15, 17));' />
                        <LiComp text='Договоры и акты, оформленные в установленном порядке.' />
                        <p style={{fontSize: '20px'}}>
                            Для юридических лиц, направляющих своих работников на обучение на платной основе, 
                            к договору необходимо предоставлять копию документа организации, подтверждающего основания для заключения договора (кроме Устава).
                        </p>
                        <p style={{fontSize: '20px'}}>
                            До окончания обучения необходимо оплатить его стоимость и представить копию документа об оплате.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default UlComp;