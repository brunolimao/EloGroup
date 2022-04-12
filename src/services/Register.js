import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

//CheckBox
const Checks = [
  { "id": 1, "value": "rpa", "isChecked": false, "name": "RPA" },
  { "id": 2, "value": "produtoDigital", "isChecked": false, "name": "Produto Digital" },
  { "id": 3, "value": "analytics", "isChecked": false, "name": "Analytics" },
  { "id": 4, "value": "bpm", "isChecked": false, "name": "BPM" }
]

//Validação do form e adição do lead ao localStorage
function RegisterController() {
  let navigate = useNavigate();
  const formik = useFormik({  
    initialValues: {
      name: '',
      phoneNumber: '',
      email: '',
      oportunidades: [],
    },
    validationSchema: Yup.object({  //Validação
      name: Yup.string()
        .required('Campo obrigatório'),
      phoneNumber: Yup.string()
        .required('Campo obrigatório')
        .min(8, 'Telefone inválido'),
      email: Yup.string()
        .required('Campo obrigatório')
        .email('Email inválido'),
      oportunidades: Yup.array()
        .min(1, "Selecione pelo menos 1"),
    }),
    onSubmit: values => {
      let name = JSON.stringify(values.name)
      let i = localStorage.length  //Verifica o proximo id para adicionar
      let aux = 0
      for (var j = 0; j < i; j++) {
        let key = localStorage.key(j)
        if (!isNaN(key)) {
          if (key > aux) {
            aux = key
          }
        }
      }
      aux++
      localStorage.setItem(aux, name)
      let path = '/painel'
      navigate(path, { state: { registered: true } })
    },
  });
  return formik
}

export { RegisterController, Checks }