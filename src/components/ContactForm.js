import React from 'react'
import { useForm } from '../hooks/useForm'
import Loader from './Loader'
import Message from './Message'

const initialForm = {
    name:"",
    email:"",
    subject:"",
    coments:""
}

const ValidateForm = (form) => {
    let errors = {}
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexComments = /^.{1,255}$/;

    if(!form.name.trim()){
        errors.name="El campo 'Nombre' es requerido" 
    }else if(!regexName.test(form.name.trim())){
        errors.name="El campo 'Nombre' solo acepta letras y espacios en blanco"
    }

    if(!form.email.trim()){
        errors.email="El campo 'Email' es requerido" 
    }else if(!regexEmail.test(form.email.trim())){
        errors.email="El campo 'Email' no tiene el formato correco" 
    }

    if(!form.subject.trim()){
        errors.subject="El campo 'Asunto a tratar' es requerido" 
    }

    if(!form.coments.trim()){
        errors.coments="El campo 'Comentarios' es requerido" 
    }else if(!regexComments.test(form.coments.trim())){
        errors.coments="El campo 'Comentarios' no debe exceder los 255 carcteres" 
    }


    return errors
}

let styles ={
    fontWeight:"bold",
    color:"#dc3545"
}


const ContactForm = () => {
    const {form, errors, loading, response, handleChange, handleBlur, handleSubmit} = useForm(initialForm, ValidateForm)
    return (
        <div>
            <h2>Formulario de contacto</h2>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                name="name" 
                placeholder="Escribe tu nombre" 
                onBlur={handleBlur} 
                onChange={handleChange} 
                value={form.name} 
                required />
                {errors.name && <p style={styles}>{errors.name}</p>}
                <input 
                type="email" 
                name="email" 
                placeholder="Escribe tu Email" 
                onBlur={handleBlur} 
                onChange={handleChange} 
                value={form.email} 
                required />
                {errors.email && <p style={styles}>{errors.email}</p>}
                <input 
                type="text" 
                name="subject" 
                placeholder="Asunto a tratar" 
                onBlur={handleBlur} 
                onChange={handleChange} 
                value={form.subject} 
                required />
                {errors.subject && <p style={styles}>{errors.subject}</p>}
                <textarea 
                name="coments" 
                cols="50" rows="5" 
                placeholder="Escribe tus comentario"
                onBlur={handleBlur} 
                onChange={handleChange} 
                value={form.coments} 
                required></textarea>
                {errors.coments && <p style={styles}>{errors.coments}</p>}
                <input type="submit" value="Enviar"/>
            </form>
            {loading && <Loader/>}
            {response && <Message msg="Los datos han sido enviados" bgColor="#198754"/>}
        </div>
    )
}

export default ContactForm
