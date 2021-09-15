import React from 'react'
import { useHistory } from 'react-router'

export const SongTableRow = ({id, el, handleDeleteSong}) => {
    console.log(el)
    let {search, bio} = el
    let artist=bio[0][0]
    let avatar = artist.strArtistThumb
    let avatarStyles ={
        with:"auto",
        height:"40px"        
    }

    let history = useHistory()

    return (
        <tr>
            <td><img style={avatarStyles} src={avatar} alt={search.artist}/></td>
            <td>{search.artist}</td>
            <td>{search.song}</td>
            <td>
                <button onClick={()=>history.push(`/${id}`)}>Ver</button>
                <button onClick={()=>handleDeleteSong(id)}>Eliminar</button>
            </td>
        </tr>
    )
}
