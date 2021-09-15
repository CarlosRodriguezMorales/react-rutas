import ConceptosBasicos from "./components/ConceptosBasicos";
import CrudApi from "./components/CrudApi";
import SongSerch from "./components/SongSearch";


function App() {
  return (
    <div>
      <h3>React Router</h3>      
      <a href="https://reactrouter.com/web/guides/quick-start" 
      target="_blank" rel="noreferrer"
      >Documentacion</a>
      <hr/>
      {<CrudApi/>}
      <hr/>
      <SongSerch/>
      <hr/>
      {<ConceptosBasicos/>}
    </div>
  );
}

export default App;
