import React from 'react'

function TextArea({name, label, ...rest}){
  return (  
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea name={name} id={name} cols="30" rows="4"
        className='form-control'
        {...rest}
      >
      </textarea>  
    </div>
  )
}
 
export default TextArea;