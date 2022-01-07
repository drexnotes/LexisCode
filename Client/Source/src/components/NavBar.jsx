import React from "react";
import styled from 'styled-components'

const NavContainer = styled.div`
    width: 100vw;
    height: 40px;
    background-color: #140c47;
    color: white;
`

const NavBar = () => {
    return (
        <NavContainer>
            OSD Search Utility
        </NavContainer>
    )
}

export default NavBar