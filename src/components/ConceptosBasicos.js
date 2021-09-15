import React from 'react'
import { BrowserRouter as Router, HashRouter, Link, Redirect, Route, Switch } from 'react-router-dom'
import Acerca from '../pages/Acerca'
import Contacto from '../pages/Contacto'
import { Dashboard } from '../pages/Dashboard'
import Error404 from '../pages/Error404'
import Home from '../pages/Home'
import { Login } from '../pages/Login'
import Productos from '../pages/Productos'
import Usuario from '../pages/Usuario'
import MenuConceptos from './MenuConceptos'
import { PrivateRoute } from './PrivateRoute'
import { ReactTopics } from './ReactTopics'


const ConceptosBasicos = () => {
    return (
        <div>
            <h2>Hash Router</h2>
            <HashRouter>
                <MenuConceptos/>
                <Switch>
                    <Route exact path="/" component={Home}/>                                    
                    <Route exact path="/acerca" component={Acerca}/>
                    <Route exact path="/contacto" component={Contacto}/>
                    <Route exact path="/usuario/:username" component={Usuario}/> 
                    <Route exact path="/productos" component={Productos}/>
                    <Route exact path="/about">
                        <Redirect to="/acerca"/>
                    </Route>
                    <Route exact path="/contact">
                        <Redirect to="/contacto"/>
                    </Route>
                    <Route path="/react" component={ReactTopics}/>{/*Cuando se usan sub rutas no debemos usar exact*/}
                    <Route exact path="/login" component={Login}/>
                    {/*<Route exact path="/dashboard" component={Dashboard}/>*/}
                    <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                    <Route  component={Error404}/>{/** <Route path="*" component={Error404}/> */}
                </Switch>
            </HashRouter>
            <hr/>
            <h2>Conceptos basicos</h2>
            <Router>
            <MenuConceptos/>
                <Switch>   
                    <Route exact path="/" component={Home}/>                                    
                    <Route exact path="/acerca" component={Acerca}/>
                    <Route exact path="/contacto" component={Contacto}/>
                    <Route exact path="/usuario/:username" component={Usuario}/> 
                    <Route exact path="/productos" component={Productos}/>
                    <Route exact path="/about">
                        <Redirect to="/acerca"/>
                    </Route>
                    <Route exact path="/contact">
                        <Redirect to="/contacto"/>
                    </Route>
                    <Route path="/react" component={ReactTopics}/>{/*Cuando se usan sub rutas no debemos usar exact*/}
                    <Route exact path="/login" component={Login}/>
                    {/*<Route exact path="/dashboard" component={Dashboard}/>*/}
                    <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                    <Route  component={Error404}/>{/** <Route path="*" component={Error404}/> */}
                    
                </Switch>
            </Router>
        </div>
    )
}

/*const ConceptosBasicos = () => {
    return (
        <div>
            <h2>Conceptos basicos</h2>
            <Router>
                <Switch>   
                    <Route exact path="/">
                        <h3>Home</h3>
                        <p>Bienvenidos al tema de las Rutas en React</p>
                    </Route>                 
                    <Route exact path="/acerca" component={Acerca}/>
                    <Route exact path="/contacto" component={Contacto}/>
                    <Route exact path="/contacto" children={<><Contacto/><p>cel:mi numero</p></>}/>

                </Switch>
            </Router>
        </div>
    )
}*/

export default ConceptosBasicos