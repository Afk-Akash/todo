import React from 'react'

function TodoList(props) {
    
  return (
    <div>
        <li className='list-item'>
            {props.item.name}
                <span className='icons' onClick={() => {
                    // console.log(props.item.id)
                    props.deleteHandler(props.keyy, props.item.id)
                }}>
                    <i className="fa-solid fa-trash-can"></i>
                </span>

                <span className='icon' onClick={() => {
                    props.setInputText(props.item.name)
                    props.setUpdateKey(props.keyy)
                    props.setUpdateIdDB(props.item.id)
                    props.setToggleBTN(false)
                }}>
                    <i className="fa-regular fa-pen-to-square"></i>
                </span>
        </li>
        
    </div>
  )
}

export default TodoList