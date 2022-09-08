import React from 'react';
import styled from "styled-components";


const StyledBurger = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 3rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }

  div {
    width: 3rem;
    height: 0.3rem;
    background: green;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
  @media only screen and (max-width: 1170px){

  }
`

export const Burger = ({ open, setOpen, offset }) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)} offset={offset} className={'hamburger'}>
      <div />
      <div />
      <div />
    </StyledBurger>
  )
}
