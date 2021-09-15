import React, { useState } from 'react';

const InitialForm={
    artist:"",
    song:""
}

export const SongForm = ({handleSaerch, handleSaveSong}) => {
    const [form, setForm] = useState(InitialForm)
    const [isDisable, setIsDisable] = useState(true)

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();

        if(!form.artist || !form.song){
            alert("Datos Incompletos")
            setIsDisable(true)
            return
        }

        handleSaerch(form)
        setForm(InitialForm)
        setIsDisable(false)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="artist" placeholder="Nombre del interprete" onChange={handleChange} value={form.artist}/>
                <input type="text" name="song" placeholder="Nombre de la canción" onChange={handleChange} value={form.song}/>
                <input type="submit" value="Enviar"/>
                <input type="button" onClick={handleSaveSong} value="Agregando Cancion" disabled={isDisable && "disabled"}/>
            </form>
        </div>
    )
}
