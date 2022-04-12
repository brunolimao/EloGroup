import React from 'react'
import '../Login.css'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import {LoginController} from '../services/Login'
import logo1 from '../public/logo1.jpg'
const yup = require('yup')
require('yup-password')(yup)

function Login() {

  //Regras de validação do form
  let formik = LoginController();

  return (
    <Container fluid className=''>
      <Row className='text-center pt-5'>
        <Card className="shadow mx-auto my-auto card-color" style={{ width: "40rem" }}>
          <Card.Body>
            <Row className='color'>
              <Col className='my-auto mx-auto col-10 col-sm-12 col-lg-6 col-md-6'>
                <img src={logo1} className="logo1" alt="logo" />
              </Col>
              <Col className='forms-color pt-3 col-12 col-sm-12 col-lg-6 col-md-12'>
                <h3>Registro</h3>
                <Form noValidate onSubmit={formik.handleSubmit}>
                  <FloatingLabel controlId="floatingUser" label="Usuário" className="my-3">
                    <Form.Control type="text" name='user' value={formik.values.user} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Usuário" isInvalid={formik.touched.user && formik.errors.user} />
                    {formik.touched.user && formik.errors.user ? (<Form.Control.Feedback type='inavlid' className='invalid text-start'>{formik.errors.user}</Form.Control.Feedback>) : null}
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Senha" className='mb-3'>
                    <Form.Control type="password" name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} isInvalid={formik.touched.password && formik.errors.password} placeholder="Senha" />
                    {formik.touched.password && formik.errors.password ? (<Form.Control.Feedback type='inavlid' className='invalid text-start'>{formik.errors.password}</Form.Control.Feedback>) : null}
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPasswordConfirmation" label="Confirmação senha" className='mb-3'>
                    <Form.Control type="password" placeholder="Confirmação senha" name='passwordConfirmation' value={formik.values.passwordConfirmation} onBlur={formik.handleBlur} onChange={formik.handleChange} isInvalid={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation} />
                    {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (<Form.Control.Feedback type='inavlid' className='invalid text-start'>{formik.errors.passwordConfirmation}</Form.Control.Feedback>) : null}
                  </FloatingLabel>
                  <Button type='submit' variant="dark" className='my-3'>Registrar</Button>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  )
}

export default Login