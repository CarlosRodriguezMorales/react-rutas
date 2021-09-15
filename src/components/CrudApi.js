import React, { useState, useEffect } from 'react';
import { HashRouter, NavLink, Switch, Route } from 'react-router-dom';
import { helpHttp } from '../helpers/helpHttp';
import Error404 from '../pages/Error404';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';
import Loader from './Loader';
import Message from './Message';

//const initialDb = [];

const CrudApi = () => {
    const [db, setDb] = useState(null)
    const [dataToEdit, setDataToEdit] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    let api = helpHttp()
    let url = "http://localhost:5000/santos"

    useEffect(() => {
        setLoading(true)
        helpHttp().get(url).then((res)=>{
            //console.log(res)
            if(!res.err){
                setDb(res)
                setError(null)
            }else{
                setDb(null)
                setError(res)
            }

            setLoading(false)
        })
    }, [url])

    const createData = (data) => {
        data.id = Date.now();

        let options ={
            body:data,
            headers:{"content-type":"application/json"}
        }

        api.post(url,options).then((res)=>{
           // console.log(res)
            if(!res.err){
                setDb([...db, res])
            }else{
                setError(res)
            }
        })
        //console.log(data);
        //setDb([...db, data]);
    };

    const updateData = (data) => {
        let endpint=`${url}/${data.id}`

        let options ={
            body:data,
            headers:{"content-type":"application/json"}
        }

        api.put(endpint,options).then((res)=>{
           // console.log(res)
            if(!res.err){
                let newData = db.map(el=>el.id===data.id?data:el)
                setDb(newData)
            }else{
                setError(res)
            }
        })
    }

    const deleteData = (id) => {
        let isDelete = window.confirm(
            `¿Estás seguro de eliminar el registro con el id '${id}'?`
        );

        if(isDelete){
            let endpint=`${url}/${id}`

            let options ={
                headers:{"content-type":"application/json"}
            }
    
            api.del(endpint,options).then((res)=>{
               // console.log(res)
                if(!res.err){
                    let newData = db.filter((el)=>el.id!==id)
                    setDb(newData)
                }else{
                    setError(res)
                }
            })
        }else{
            return
        }
    }

    return (
        <div>
            <HashRouter basename="santos">
                    <h2>CRUD API CON RUTAS</h2>                
                <Switch>
                    <Route exact path="/" >
                    {/*<article className="grid-1-2"> */ }  
                        <header>
                            <nav>
                                <NavLink to="/" activeClassName="active">Santos</NavLink>
                                <NavLink to="/agregar" activeClassName="active">Agregar</NavLink>
                            </nav>
                        </header>            
                        {loading && <Loader/>}
                        {error && <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545"/>}
                        {db && <CrudTable 
                            data={db}
                            deleteData={deleteData}                
                            setDataToEdit={setDataToEdit}
                        />}
                    {/*</article>*/}
                    </Route>
                    <Route exact path="/agregar" >
                        <CrudForm
                            createData={createData}
                            updateData={updateData}
                            dataToEdit={dataToEdit}
                            setDataToEdit={setDataToEdit}
                        />
                    </Route>
                    <Route exact path="/editar/:id" >
                        <CrudForm
                            createData={createData}
                            updateData={updateData}
                            dataToEdit={dataToEdit}
                            setDataToEdit={setDataToEdit}
                        />                       
                    </Route>
                    <Route  path="*" children={<Error404/>}/>
                </Switch>
            </HashRouter>
        </div>
    )
}

export default CrudApi
