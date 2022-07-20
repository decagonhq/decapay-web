import React, { useEffect, useRef, useCallback } from 'react'
import styled from "styled-components";

const FormModal = (props) => {
    const container = useRef();
    const { handleModal, setIsEditing } = props

  const outsideClick = useCallback((e) => {
    if (container.current?.contains(e.target)) {
      // inside click
      return;
    }

    if (!handleModal) {
        return
    }
    handleModal();
    if(setIsEditing){
      setIsEditing(false)
    }

    // eslint-disable-next-line
  }, [handleModal]);

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", outsideClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", outsideClick);
    };
  }, [outsideClick]);
    return (
        <StyledFormModal centered={props.centered}>
            <div className="form-section" ref={container}>
                {props.children}
            </div>
        </StyledFormModal>
    )
}

const StyledFormModal = styled.div`
    background: rgba(33, 51, 79, 0.44);
    width: 100vw;
    height: 100vh;
    display: flex;
    // justify-content: flex-end;
    justify-content: ${({ centered }) => (centered ? "center" : "flex-end")};
    
    .form-section{
        animation: ${({ centered }) => (centered ? "none" : "appear .5s ease")};
        @keyframes appear {
            from {
            transform: translateX(200px)
            }

            to {
                transform: translateY(0)
            }
        }
    }
    @media only screen and (max-width: 1200px) {
        background: rgba(33, 51, 79, 0.44);
        .grey-background{
            display: none;
        }
        .form-section{
            max-width: 100%;
        }
    }
    @media only screen and (max-width: 505px) {
        .form-section{
            margin: 0 auto;
            width: 100vw;
        }
    }

`;
export default FormModal
