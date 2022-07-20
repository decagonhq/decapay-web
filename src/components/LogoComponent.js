import React from 'react'
import { imagesAndIcons } from '../globalImageImports'
import styled from 'styled-components'

function LogoComponent({
    imageStyle,

}) {
  return (
    <ImageWrapper
    >
        <Image src={imagesAndIcons.decapayIcon} alt="Logo" 
        style={imageStyle}
        
        />
        <IconHeader
        >DecaPay</IconHeader>
    </ImageWrapper>
  )
}

export default LogoComponent


const Image = styled.img`
`
const ImageWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

`
const IconHeader = styled.h2`
    margin-left: 10px;
`