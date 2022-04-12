import React, { useState, useEffect } from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import logo from '../public/logo.jpg'
import {RegisterController, Checks} from "../services/Register"
import '../Register.css'

function Register() {

  //Regras de validação do form
  let formik = RegisterController();

  //Hook para os CheckBox
  const [checks, setCheck] = useState([]);
  useEffect(() => {
    setCheck(Checks);
  }, [])

  //Define o que acontece quando os CheckBox são clicados
  const handleCheck = (e) => {
    const { id, checked } = e.target;
    if (id === "todos") {   //Caso for o CheckBox do topo, alterar todos os CheckBox para sua marcação
      let tempCheck = checks.map((check) => {
        return { ...check, isChecked: checked };
      });
      setCheck(tempCheck);
      //Verificar se todos os ChackBox estão desmarcados, se sim marca erro de validação
      let i = 0 ;
      tempCheck.map((check) => {
        if (check.isChecked == false) {
          i++;
        }
      });
      if (i == 4) {
        formik.values.oportunidades = "";
      }
    } else {  //Alterar somente a marcação de um CheckBox
      let tempCheck = checks.map((check) =>
        check.id == id ? { ...check, isChecked: checked } : check
      );
      setCheck(tempCheck);
      //Verificar se todos os ChackBox estão desmarcados, se sim marca erro de validação
      let i = 0;
      tempCheck.map((check) => {
        if (check.isChecked == false) {
          i++;
        }
      });
      if (i == 4) {
        formik.values.oportunidades = "";
      }
    }
  }

  return (
    <>
      <Container fluid className="pt-5">
        <Row className='text-center pt-3'>
          <Card className="shadow mx-auto card-grey py-3" style={{ width: "40rem" }}>
            <Row>
              <Col className="col-12 col-md-4 col-lg-4 py-2">
                <img src={logo} className="logo shadow-lg" alt="logo" />
              </Col>
              <Col className="col-12 col-md-8 col-lg-8 my-auto py-2">
                <h3 className='text-white'>Novo Lead</h3>
              </Col>
            </Row>
            <Card.Body>
              <Form noValidate onSubmit={formik.handleSubmit}>
                <Row className='card-white rounded'>
                  <Col className='col-12 col-sm-12 col-lg-6 col-md-6'>
                    <FloatingLabel controlId="floatingName" label="Nome" className="my-3">
                      <Form.Control type="text" name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Nome" isInvalid={formik.touched.name && formik.errors.name} />
                      {formik.touched.name && formik.errors.name ? (<Form.Control.Feedback type='inavlid' className='invalid text-start'>{formik.errors.name}</Form.Control.Feedback>) : null}
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPhoneNumber" label="Telefone" className='mb-3'>
                      <Form.Control type="text" name='phoneNumber' value={formik.values.phoneNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber} placeholder="Telefone" />
                      {formik.touched.phoneNumber && formik.errors.phoneNumber ? (<Form.Control.Feedback type='inavlid' className='invalid text-start'>{formik.errors.phoneNumber}</Form.Control.Feedback>) : null}
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingEmail" label="Email" className='mb-3'>
                      <Form.Control type="email" placeholder="Email" name='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} isInvalid={formik.touched.email && formik.errors.email} />
                      {formik.touched.email && formik.errors.email ? (<Form.Control.Feedback type='inavlid' className='invalid text-start'>{formik.errors.email}</Form.Control.Feedback>) : null}
                    </FloatingLabel>
                  </Col>
                  <Col className='py-3 col-12 col-sm-12 col-lg-6 col-md-6 my-auto mx-auto'>
                    <h5>Oportunidades</h5>
                    {formik.touched.oportunidades && formik.errors.oportunidades ? (<p type='inavlid' className='invalid text-start mb-1'>{formik.errors.oportunidades}</p>) : null}
                    <div className="form-check bg-dark m-0 py-1">
                      <div className='mx-3'>
                        <input className="form-check-input" type="checkbox" checked={!checks.some((check) => check?.isChecked !== true)} onClick={handleCheck} value="todos" name="oportunidades" onChange={formik.handleChange} id="todos" />
                        <label className="form-check-label text-white">
                          Todos
                        </label>
                      </div>
                    </div>
                    {checks.map((check, idx) => (
                      <div className="form-check bg-secondary m-0 py-1" key={idx}>
                        <div className='mx-3'>
                          <input className="form-check-input" type="checkbox" checked={check?.isChecked || false} onClick={handleCheck} value={check.value} name="oportunidades" onChange={formik.handleChange} id={check.id} />{" "}
                          <label className="form-check-label text-white">
                            {check.name}
                          </label>
                        </div>
                      </div>
                    ))}
                  </Col>
                </Row>
                <Button type="submit" variant="outline-light" className='my-3'>Registrar</Button>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  )
}

export default Register 