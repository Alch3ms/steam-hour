import styled from "@emotion/styled";

export const Container = styled.section`
    position: relative;
    height: 99.5lvh;
`

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: -1;
    background-color:  #0e131cd1;
    opacity: 0.6;
`

export const Background = styled.figure`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    filter: blur(3px);
`

export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
`

export const Content = styled.main`
    background-image: linear-gradient(to right, #0E131C, #0E131C, #0e131cd1, #0e131c90 , transparent);
    height: 100vh;
    width: 800px;
    padding-right: 17rem;
`

export const LoginContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Logo = styled.div`
    width: 100%;
    display: flex;
    justify-content: left;
    margin-bottom: 1rem;
    padding: 0 5rem;
`

export const Title = styled.h1`
    color: #fff;
    font-size: 1.550rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
`

export const Form = styled.form`
    width: 70%;
`

export const InputContent = styled.div`
    margin-bottom: 1rem;
    margin-top: 1.5rem;
    width: 100%;
    position: relative;

    .icoViewPass {
        width: 25px;
        height: 25px;
        position: absolute;
        right: .800rem;
        top: 2rem;
        cursor: pointer;
        transition: all .3s ease-out;
        background-image: url("data:image/svg+xml,%3Csvg width='25px' height='25px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
    }
    
    .icoOcultPass {
        width: 25px;
        height: 25px;
        position: absolute;
        right: .800rem;
        top: 2rem;
        cursor: pointer;
        transition: all .3s ease-out;
        background-image: url("data:image/svg+xml,%3Csvg width='25px' height='25px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
    }
    
`

export const Label = styled.p`
    color: #fff;
    font-size: .900rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
`

export const Input = styled.input`
    background-color: #1C243A;
    border-left: 2px solid #fff;
    border-top: none;
    border-right: 2px solid #fff;
    border-bottom: none;
    border-radius: 7px;
    width: 100%;
    height: 39px;
    padding: 0 1rem;
    color: #fff;
    font-size: 1rem;

    &:focus {
        outline: none;
    }
`

export const Submit = styled.button`
    width: 100%;
    margin-top: 1.4rem;
    height: 40px;
    border: none;
    border-radius: 6px;
    background: linear-gradient(to right, #06BFFF, #2D74FF);
    color: #fff;
    font-size: 1.3rem;
    font-weight: 600;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    
    &:hover {
        background: linear-gradient(to right, #6ddaff, #518bff);
    }
`

export const  SubmitDisabled = styled.button`
    width: 100%;
    margin-top: 1.4rem;
    height: 40px;
    border: none;
    border-radius: 6px;
    background: linear-gradient(to right, #06BFFF, #2D74FF);
    color: #fff;
    font-size: 1.3rem;
    font-weight: 600;
    opacity: 0.5;
    cursor: not-allowed;
`

export const LoadingContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 2.5rem;
`

export const Loading = styled.div`
    width: 32px;
    height: 32px;
    border: 4px solid rgba(6, 191, 255, 0.2); 
    border-top-color: #06BFFF;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`

export const Version = styled.p`
    position: absolute;
    bottom: 10px;
    right: 35px;
    opacity: 0.3;
`

export const SettingsBtn = styled.button`
    position: absolute;
    bottom: 40px;
    right: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #384151;
    border: none;
    padding: 0.5rem;
    border-radius: 6px;
    opacity: 0.5;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        opacity: 1;
    }
`