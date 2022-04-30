import React, { useState, useEffect, useCallback } from "react";
import { Input } from 'reactstrap';
import ButtonAdd from '../../assets/ic-add.png';
import ButtonDelete from '../../assets/ic-delete.png';

import './container.css';

function Home(){

    const [ tarefas, setTarefas] = useState([])
    const [input, setInput] = useState('');
    
    useEffect(() => {
        const tarefasStorage = localStorage.getItem('tarefas');
        
        if(tarefasStorage){
            setTarefas(JSON.parse(tarefasStorage));
        }
        
    }, [])
    
    useEffect(() => {
        
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        console.log(tarefas.length, 'yes')

}, [tarefas])

const handleAdd = useCallback(() => {
    setTarefas([...tarefas, input])
    setInput('');
  }, [input, tarefas]);

  const handleDelete = useCallback(() => {
      const removeArr = [...tarefas].filter(tarefas => tarefas)
        setTarefas(removeArr);    
}, [tarefas]);



return (
    <container>
        <div className="ContainerAdd">
            <Input className="InputAdd" type="text" value={input} placeholder="Digite" onChange={e => setInput(e.target.value)}/>
            <div className="ButtonAdd"  onClick={handleAdd} >
                <img src={ButtonAdd} alt="Add"/>
            </div>
        </div>
        {tarefas.length > 0 ?
            <ul >
                <div className="List">
                    {tarefas.map(tarefa => (
                        <li key={tarefa}>
                            <div className="ListItem">
                            {tarefa}                 
                            </div>
                        <div className="ButtonDelete"  onClick={() => handleDelete(tarefa)} >
                        <img src={ButtonDelete} alt="Delete"/>
                    </div></li>
                    ))}
                </div>
            </ul>
        :                
        <div className="ContainerItem">
            <h2>
                Nenhum item cadastrado
            </h2>

        </div>           
        }
        </container>
);
}

export default Home;  