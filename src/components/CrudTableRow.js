import React from 'react'
import { useHistory } from 'react-router';

const CrudTableRow = ({el, deleteData, setDataToEdit}) => {
    let {name, constellation, id}=el; 
    let history=useHistory()

    const handleClick = () =>{
        setDataToEdit(el)
        history.push(`/editar/${id}`)
    }
    return (
        <tr>
            <td>{name}</td>
            <td>{constellation}</td>
            <td>
                <button onClick={handleClick}>Editar</button>
                {/*<button onClick={()=>setDataToEdit(el)}>Editar</button>*/}
                <button onClick={()=>deleteData(id)}>Eliminar</button>
            </td>
        </tr>
    )
}

export default CrudTableRow
