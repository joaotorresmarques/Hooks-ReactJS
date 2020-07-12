import React, { useState, useEffect} from 'react';
import api from './services/api';
import './App.css'
import Header from './components/Header';
function App(){
   const [repository,setRepository] = useState([]);

   useEffect(()=>{
    api.get('/repositories').then(repo =>{
        setRepository(repo.data);
    })
    
   },[])

   async function handleAddProject(){
       const res = await api.post('/repositories',{
           title: `New! ${Date.now()}`,
       });
       setRepository([...repository, res.data])
   }

   async function handleDeleteProject(){
       //repos = repository.pop();
       const reposDel = repository.pop();
       const id = reposDel.id;

       await api.delete(`repositories/${id}`)
       const listagem = repository.filter(rep => rep.id !== id);
       setRepository(listagem);

      
   }
    return(
        <>
        <Header title="Titulo header"/>
           <ul>
    {repository.map(repo => <li key={repo.id}>{repo.title}</li>)}
           </ul>
           <button type="submit" onClick={handleAddProject}>ADD</button>
           <button type="submit" onClick={handleDeleteProject}>DEL</button>
        </>
    ) 
}

export default App;