import styled from '@emotion/styled';

export default Menu = styled.nav`
    display:flex;
    justify-content:space-between;
    align-items:center;
    transition: all 0.2s;
    height: 1.50rem;
    position:fixed;
    z-index:999;
    overflow:hidden;
    top:0;
    width:100%;
    background-color: #91919148;
    backdrop-filter: blur(50px);
    border-bottom: 2px solid #3b3b3bbe;
    z-index: 100;
    -webkit-app-region: drag;
    z-index: 999;

    ul {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;