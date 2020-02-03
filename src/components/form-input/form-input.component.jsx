import React from 'react'

import './form-input.styles.scss'

const FormInput = ({ onChange, label,  ...otherProps}) => (
    
    <div className='group'>
        <input 
        className='form-input' 
        onChange={onChange}
        type={otherProps.type}
        name={otherProps.name}
        />
 
        {
            label ? 
            (<label 
                className={`${otherProps.value.length ? 'shrink' : ''}
                form-input-label`}>
                    {label}
            </label>)
            : null
        }
    </div>
)

export default FormInput