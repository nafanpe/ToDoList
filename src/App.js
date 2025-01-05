import React, { useState } from 'react';
import './App.css';

function App() {
  const [toDos, setToDos] = useState([]);  
  const [toDo, setToDo] = useState('');    
  const [deletedItems, setDeletedItems] = useState([]);  
  const [completedItems, setComlpletedItems] = useState([])

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input 
          value={toDo} 
          onChange={(e) => setToDo(e.target.value)} 
          type="text" 
          placeholder="🖊️ Add item..." 
        />
        <i 
          onClick={() => setToDos([...toDos, {id: Date.now(), text: toDo, status: false}])} 
          className="fas fa-plus">
        </i>
      </div>

      <div className='big-box'>
        {/* Deleted Section */}
        <div className='section-left'>
          <h3>DELETED</h3>
          <div className="todos">
            {deletedItems.map((obj) => (
              <div key={obj.id} className="todo">
                <p>{obj.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* In-Progress Section */}
        <div className='section-center'>
          <h3>IN-PROGRESS</h3>
          <div className="todos">
            {toDos.map((obj) => {
              return (
                <div className="todo" key={obj.id}>
                  <div className="left">
                    <input 
                      onChange={(e) => {
                        const isChecked = e.target.checked

                        setToDos(toDos.map(obj2 => {
                          if(obj2.id === obj.id){
                            return {...obj2, status: e.target.checked}
                          }
                          return obj2;
                        }));

                        if(isChecked) {
                          setComlpletedItems([...completedItems, obj])
                          
                        } else {
                          setComlpletedItems(completedItems.filter(obj2 => obj2.id !== obj.id))
                        }
                      }} 
                      checked={obj.status}
                      type="checkbox" 
                    />
                    <p>{obj.text}</p>
                  </div>
                  <div className="right">
                    <i 
                      onClick={() => {
                        setDeletedItems([...deletedItems, obj]);  
                        setToDos(toDos.filter(obj2 => obj2.id !== obj.id));  
                      }} 
                      className="fas fa-times">
                    </i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className='section-right'>
          <h3>COMPLETED</h3>
            <div className='todos'>
                {completedItems.map(obj => (
                    <div key={obj.id} className='todo'>
                      <div className='left'>
                        <p>{obj.text}</p>
                      </div>
                    </div>
                ))}
            </div>
        </div>
      </div>   
    </div>
  );
}

export default App;
