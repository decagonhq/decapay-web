import React from 'react'
import styled from 'styled-components'

const InputComponent = ({
    label,
    name,
    type,
    value,
    onChange,
    placeholder,
    error,
    ...rest

}) =>{
  return (
    <Input
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={error}
        {...rest}
    >
        
    </Input>
  )
}

export default InputComponent


const Input = styled.input`
    width: 100%;
    height: 48px ;
`