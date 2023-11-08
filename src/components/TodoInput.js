import React from 'react'

function trimSpace(inputString) {
    // Remove leading and trailing spaces, and replace consecutive spaces with a single space
    return inputString.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
  }

const TodoInput = (props) => {
    


  return (
    <div>
            <input
            type="text" 
            className='input-box-todo' 
            placeholder='Enter your todo' 
            value={props.inputText}
            onChange={(event) => {
                if(event.target.value.length > 30){
                    alert("only 30 words are allowed")
                    event.target.value = event.target.value.substring(0, event.target.value.length-1)
                }
                props.setInputText(event.target.value)
            }}
            />
            
            {
                props.toggleBTN ? 
                <button className='add-btn' onClick={() => {
                    //onclick
                    if(trimSpace(props.inputText).length === 0){
                        alert("Please enter valid todo")
                        return
                    }
                    props.AddList(props.inputText)
                    props.setInputText('')
                }}>+</button> 
                :
                <button className='add-btn' onClick={() => {
                    //onclick
                    props.setToggleBTN(true)
                    if(trimSpace(props.inputText).length === 0){
                        alert("Please enter valid todo")
                        return
                    }
                    props.editHandler(props.inputText)
                    props.setInputText('')
                }}>U</button>
            }
        </div>
  )
}


export default TodoInput