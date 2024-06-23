import styled from '@emotion/styled';

export const Menu = styled.nav`
  display:flex;
  justify-content:right;
  align-items:center;
  transition: all 0.2s;
  padding: 1rem;
  height: 3rem;
  position:fixed;
  overflow:hidden;
  top:0;
  width:100%;
  -webkit-app-region: drag;
  z-index: 999;

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const Minimize = styled.li`
  height: 32px;
  width: 32px;
  list-style-type: none;
  cursor:pointer;
  transition: all .3s ease-out;
  -webkit-app-region: no-drag; 
  background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16H24' stroke='%23353E4F' stroke-width='5.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");

  &:hover {
    background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16H24' stroke='%232D74FF' stroke-width='5.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
   }
`

export const CloseWindow =  styled.li`
  height: 48px;
  width: 48px;
  -webkit-app-region: no-drag; 
  list-style-type: none;
  background-image: url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M21.8786 24L13.9392 31.9394L16.0605 34.0608L24 26.1214L31.9394 34.0608L34.0608 31.9394L26.1214 24L34.0606 16.0608L31.9392 13.9395L24 21.8786L16.0608 13.9395L13.9394 16.0608L21.8786 24Z' fill='%23353E4F'/%3E%3C/svg%3E%0A");
  transition: all .3s ease-out;
  cursor:pointer;
    
  &:hover {
    background-image: url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M21.8786 24L13.9392 31.9394L16.0605 34.0608L24 26.1214L31.9394 34.0608L34.0608 31.9394L26.1214 24L34.0606 16.0608L31.9392 13.9395L24 21.8786L16.0608 13.9395L13.9394 16.0608L21.8786 24Z' fill='%232D74FF'/%3E%3C/svg%3E%0A");
  }
`
