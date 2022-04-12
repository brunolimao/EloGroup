import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
const yup = require('yup')
require('yup-password')(yup)

function LoginController() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      user: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: Yup.object({
      user: Yup.string()
        .required('Campo obrigatório'),
      password: yup.string()
        .min(8, 'Mínimo 8 caracteres')
        .minUppercase(1, 'Mínimo uma letra maiúscula')
        .minNumbers(1, 'Mínimo um número')
        .minSymbols(1, 'Mínimo um símbolo')
        .required('Campo obrigatório'),
      passwordConfirmation: Yup.string()
        .required('Campo obrigatório')
        .oneOf([Yup.ref('password')], 'Senhas não conferem'),
    }),
    onSubmit: values => {
      let user = JSON.stringify(values.user)
      let password = JSON.stringify(values.password)
      localStorage.setItem(user, password)
      let path = '/painel'
      navigate(path, { state: { registered: false } })
    },
  });
  return formik
}
export {LoginController}