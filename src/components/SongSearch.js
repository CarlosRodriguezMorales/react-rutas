import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import { SongDetails } from './SongDetails';
import { SongForm } from './SongForm';
import { helpHttp } from '../helpers/helpHttp';
import { HashRouter, Link, Switch , Route} from 'react-router-dom';
import Error404 from '../pages/Error404';
import SongTable from './SongTable';
import SongPage from '../pages/SongPage';


let mySongsInit = JSON.parse(localStorage.getItem("mySongs")) || []

const SongSerch = () => {
    const [search, setSearch] = useState(null)
    const [lyric, setLyric] = useState(null)
    const [bio, setBio] = useState(null)
    const [loading, setLoading] = useState(false)
    const [mySongs, setMySongs] = useState(mySongsInit)
    
    const handleSaerch = (data)=>{
        //console.log(data)
        setSearch(data)
    }

    const handleSaveSong = () =>{
        alert("salvando cancion en favoritos")
        let currentSong = {
            search, lyric, bio
        }

        let songs = [...mySongs, currentSong]
        setMySongs(songs)
        setSearch(null)
        localStorage.setItem("mySongs", JSON.stringify(songs))
    }

    const handleDeleteSong = (id) =>{
        //alert(`eliminado cancion con el id: ${id}`)
        let isDelete = window.confirm(`¿Confirma que desea eliminar la cancion con el id: ${id}?`)

        if(isDelete){
            let songs = mySongs.filter((el, index)=> index!==id)
            setMySongs(songs)
            localStorage.setItem("mySongs", JSON.stringify(songs))
        }
    }

    useEffect(() => {
        if(search===null) return;

        const fetchData = async ()=>{
            const { artist, song } = search;

            let artisUrl=`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`
            let songUrl=`https://api.lyrics.ovh/v1/${artist}/${song}`

            //console.log(artisUrl, songUrl)

            setLoading(true)

            const [artistRes, songRes]= await Promise.all([
                helpHttp().get(artisUrl),
                helpHttp().get(songUrl)
            ])

            //console.log(artistRes, songRes)
            //console.log("artistRes    " + artistRes)
            //console.log(Object.values(artistRes))
            //setBio(artistRes)
            setBio(Object.values(artistRes))
            setLyric(songRes)
            setLoading(false)
        }    
        
        localStorage.setItem("mySongs",JSON.stringify(mySongs))
        fetchData()
    }, [search, mySongs])

    return (
        <div>
            <HashRouter basename="canciones">
                <header>
                    <h2>Buscador de Canciones</h2>
                    <Link to="/">Home</Link>
                </header>
                {loading && <Loader/>} 
                <article className="grid-1-2">
                    <Switch>
                        <Route exact path="/">
                            <SongForm 
                                handleSaerch={handleSaerch}
                                handleSaveSong={handleSaveSong}
                            />
                            <SongTable mySongs={mySongs} handleDeleteSong={handleDeleteSong}/>
                            {search && !loading &&
                                <SongDetails search={search} lyric={lyric} bio={bio}/>
                            }
                        </Route>
                        <Route exact path="/:id" children={<SongPage mySongs={mySongs}/>}/>
                        <Route  path="*" children={<Error404/>}/>
                    </Switch>
                </article>
            </HashRouter>
        </div>
    )
}

export default SongSerch