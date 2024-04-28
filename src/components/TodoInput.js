import React from 'react'



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
                    event.target.value = event.target.value.substring(0, 30)
                }
                var str = event.target.value
                if(str.length > 1 && str[str.length-1] === str[str.length-2] && str[str.length-1] === ' '){
                    alert("consecutive spaces not allowed....")
                    event.target.value = event.target.value.substring(0, event.target.value.length-1)
                }
                if(str.length === 1 && str[0] === ' '){
                    alert("leading space not allowed...")
                    event.target.value = ''
                }
                props.setInputText(event.target.value)
            }}
            />
            
            {
                props.toggleBTN ? 
                <button className='add-btn' onClick={() => {
                    props.AddList(props.inputText)
                    props.setInputText('')
                }}>+</button> 
                :
                <button className='add-btn' onClick={() => {
                    //onclick
                    props.setToggleBTN(true)
                    props.editHandler(props.inputText)
                    props.setInputText('')
                }}>U</button>
            }
        </div>
  )
}


export default TodoInput