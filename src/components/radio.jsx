import React from 'react'

function Radio({title, name, data=[], type='radio', ...rest}){
  return (
    <div className='radio'>
      <div className='row'>
        <legend className="col-form-label col-sm-2 pt-0">{title}</legend>
        <div className='col-sm-10'>

        {data.map(c => (
          <div className="form-check" key={c.name}>
            <input type={type} className="form-check-input" name={name} id={c.name} 
              value={type==='radio'?c.name:c.id} {...rest} />
            <label htmlFor="Islam" className="form-check-label">
              {c.name}
            </label>
          </div>
        ))}

        </div>
      </div>
    </div>
  )
}

export default Radio;