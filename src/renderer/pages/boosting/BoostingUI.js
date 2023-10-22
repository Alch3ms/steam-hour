import styled from '@emotion/styled';

export const Container = styled.section`
    display: table;
    width: 100%;
    height: 100vh;
`

export const Center = styled.main`
    display: table-cell;
    vertical-align: middle;
    text-align: center;
`

export const CountText = styled.h1`
    font-size: 2rem;
    font-weight: 550;
`

export const Games = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap:.400rem;
    margin-top: .600rem;
`

export const GamesContent = styled.div`
    position: relative;
`

export const Poster = styled.img`
    width:28px;
    height:28px;
    border-radius:8px;
`

export const Text = styled.p`
    font-size: .800rem;
    font-weight: 400;
    color: #dddddd;
`

export const Button = styled.button`
    width: 190px;
    margin-top: 1.200rem;
    height: 40px;
    font-size: 1.1rem;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    background: none; 
    backdrop-filter: blur(100px); 
    color: #ffff;
    border: 1px solid #757575;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover  {
        background-color: rgba(255, 255, 255, 0.37);
    }
`