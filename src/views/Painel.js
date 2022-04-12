import React, { useState } from "react";
import '../Painel.css';
import RegisterAlert from "./components/Alert";
import LeadCol from "./components/LeadCol";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {useDrop} from 'react-dnd';
import {Link, useLocation} from 'react-router-dom';
import logo from '../public/logo.jpg';
import {updateLeads, meetingLeads, potencialLeads, dataLeads} from '../services/Painel';

function Painel() {

  //Aparecer ou não alerta 
  const { state } = useLocation();
  let registered = false;
  if (state !== null) {
    registered = true;
  }
  //Hook do alerta
  const [showAlert, setShowAlert] = useState(registered);

  //Atualizar os leads cadastrados no localStorage
  updateLeads();

  //Hooks para as colunas
  const [potencial, setPotencial] = useState(() => potencialLeads);
  const [data, setData] = useState(() => dataLeads);
  const [meeting, setMeeting] = useState(() => meetingLeads);
  const [, setOrigin] = useState([]);

  //Propriedas Drop and Drag da coluna Cliente em Potencial
  const [{ isOverPotencial }, removeToPotencialRef] = useDrop({
    accept: '',
    collect: (monitor) => ({
      isOverPotencial: !!monitor.isOver()
    })
  });

  //Propriedas Drop and Drag da coluna Dados Confirmados
  const [{ isOverData }, addToDataRef] = useDrop({
    accept: 'potencial',
    drop: (item) => setOrigin(() => {
      item.origin = 2;
    }),
    collect: (monitor) => ({
      isOverData: !!monitor.isOver(),
    })
  });

  //Propriedas Drop and Drag da coluna Reunião Agendada
  const [{ isOverMeeting }, addToMeetingRef] = useDrop({
    accept: 'data',
    drop: (item) => setOrigin(() => {
      item.origin = 3;
    }),
    collect: (monitor) => ({
      isOverMeeting: !!monitor.isOver()
    })
  });

  //Mudar o lead de coluna
  const moveLead = (item, origin) => {
    if (item && origin == 1) {
      setData((_type) => [..._type, potencial[item.index]]);
      setPotencial((_leads) => _leads.filter((_, idx) => idx !== item.index));
    }
    if (item && origin == 2) {
      setMeeting((_type) => [..._type, data[item.index]]);
      setData((_leads) => _leads.filter((_, idx) => idx !== item.index));
    }
  };

  //Quando o lead estiver por cima de uma área que pode ser arrastado, mudar a cor de fundo
  const dragHoverPotencial = isOverPotencial ? "bg-light" : "bg-light";
  const dragHoverData = isOverData ? "bg-success" : "bg-light";
  const dragHoverMeeting = isOverMeeting ? "bg-success" : "bg-light";

  return (
    <>
      {showAlert && (
        <RegisterAlert onClose={() => setShowAlert(false)} />
      )}
      <Container fluid className='py-4 text-center'>
        <Row className="justify-content-center my-3">
          <Col className="col-12 col-lg-3 col-md-3">
            <img src={logo} className="logo shadow-lg" alt="logo" />
          </Col>
          <Col className="col-12 col-lg-3  col-md-3 my-auto">
            <h2 className="text-white my-lg-0 my-5 my-md-0">Painel de Leads</h2>
          </Col>
          <Col className="col-12 col-lg-3 col-md-3 my-auto">
            <Link className="btn btn-dark px-5 py-3" to={'/register'}>Novo Lead (+)</Link>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <LeadCol
            lead={potencial}
            leadRef={removeToPotencialRef}
            dragHover={dragHoverPotencial}
            leadType={"potencial"}
            onDropLead={moveLead}
            origin={"1"}
            name={"Clientes em Potencial"}
          />
          <LeadCol
            lead={data}
            leadRef={addToDataRef}
            dragHover={dragHoverData}
            leadType={"data"}
            onDropLead={moveLead}
            origin={"2"}
            name={"Dados Confirmados"}
          />
          <LeadCol
            lead={meeting}
            leadRef={addToMeetingRef}
            dragHover={dragHoverMeeting}
            leadType={"meeting"}
            onDropLead={moveLead}
            origin={"3"}
            name={"Reunião Agendada"}
          />
        </Row>
      </Container>
    </>
  )
}

export default Painel