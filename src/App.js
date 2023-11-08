import { useEffect, useState } from 'react';
import './App.css';
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList';
import Authentication from './components/Authentication.js';
import { toast } from 'react-toastify';

function App() {
  const [listTodo, setListTodo] = useState([]);
  const [toggleBTN, setToggleBTN] = useState(true)
  const [inputText, setInputText] = useState('')
  const [updateKey, setUpdateKey] = useState(null)
  const [isLogged, setIsLogged] = useState(0)
  const [updateIdDB, setUpdateIdDB] = useState(0)



  
  let AddList = (input) => {
    fetch("http://127.0.0.1:8080/api/addTodo", {
      method: 'POST',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({name:input, priority:'high'}),
    }).then(response => {
      return response.json();
    }).then(data => {
      let responseStatus = data.status;
      let responseMessage = data.message;
      if(responseStatus === 400){
        toast.error(responseMessage, {
            position: 'bottom-right', 
            autoClose: 3000, 
        })
      }else{
        toast.success(responseMessage, {
          position: 'bottom-right', 
            autoClose: 3000, 
        })
        setListTodo([...listTodo, {name: input, id:data.id}]);
      }
    })
    
  }

  function deleteHandler(key, id) {

    fetch("http://127.0.0.1:8080/api/delete", {
      method: 'DELETE',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({id:id}),
    }).then(response => {
      return response.json();
    }).then(data => {
      let responseStatus = data.status;
      let responseMessage = data.message;
      if(responseStatus === 400){
        toast.error(responseMessage, {
            position: 'bottom-right', 
            autoClose: 3000,  
        })
      }else{
        toast.success(responseMessage, {
          position: 'bottom-right', 
            autoClose: 3000, 
        })
      }
    })
    let newarray = listTodo
    newarray.splice(key, 1)
    setListTodo([...newarray])
  }
 

   function  editHandler (inputText) {
      let newarray = listTodo
      console.log(newarray)
      newarray[updateKey] = {name:inputText,id:newarray[updateKey].id};
      console.log(newarray)
      setListTodo([...newarray])
      console.log(listTodo)
    
     fetch("http://127.0.0.1:8080/api/update", {
        method: 'PUT',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({id:updateIdDB,name:inputText}),
      }).then(response => {
        return response.json();
      }).then(data => {
        let responseStatus = data.status;
        let responseMessage = data.message;
        if(responseStatus === 400){
          toast.error(responseMessage, {
              position: 'bottom-right', 
              autoClose: 3000, 
          })
        }else{
          toast.success(responseMessage, {
            position: 'bottom-right', 
              autoClose: 3000, 
          })
        }
      })

      
  }
  console.log("test")

  useEffect(() =>{
    if(isLogged){
      fetch("http://127.0.0.1:8080/api/getTodo", {
          method: 'GET',
          credentials: 'include', 
        }).then(Response => {return Response.json()}).then(data => {
            let dummy = []
            for ( let i = 0; i < data.length; i++){
              dummy.push({ name: data[i].name, id: data[i].id });
            }
            setListTodo([...dummy])
        })
    }
  }, [isLogged])


  return (
    <div className="main-container">
      {
        isLogged ? 
        
        <div className='center-container'>

        <TodoInput AddList = {AddList} 
        editHandler={editHandler}
        toggleBTN={toggleBTN}
        setToggleBTN={setToggleBTN}
        inputText={inputText}
        setInputText={setInputText}/>

        <div style={{display:'flex',alignItems:'center', justifyContent:'space-between'}}>
          <h1 className='app-heading'>TODO</h1>
          <button style={{maxWidth:60,marginRight:25}}
          onClick={() => {setIsLogged(false)
            toast.success("logged out successfully", {
              position: 'bottom-right', 
              autoClose: 3000, 
          });
        }}
          >LogOut </button>
        </div>
        <hr style={{padding: 0.1, margin:0,}}/>

        {
          listTodo.map((listItem, i) => {
            return (
              <TodoList key={i} keyy={i} item = {listItem} todoId = {listItem.id}
               deleteHandler ={deleteHandler} 
               toggleBTN={toggleBTN}
               setToggleBTN={setToggleBTN}
               inputText={inputText}
               setInputText={setInputText}
               setUpdateKey= {setUpdateKey}
               setUpdateIdDB={setUpdateIdDB}
               />
            );
          })
        }
        
      </div>
      :
      <Authentication setIsLogged={setIsLogged} />
      }
    </div>
  );
}

export default App;
