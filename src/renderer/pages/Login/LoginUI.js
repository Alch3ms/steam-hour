import styled from '@emotion/styled';

export const Code = styled.section`
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
    backdrop-filter: blur(50px);
    width: 400px;
    height: 255px;
    z-index: 900;
    -webkit-box-shadow: 0px 0px 15px 5px rgba(0,0,0,0.44); 
    box-shadow: 0px 0px 15px 5px rgba(0,0,0,0.44);
    padding: .600rem;
    border-radius: .500rem;
    border: 1px solid #ffffff75;

    .contentCode {
        position: relative;
    }

    .main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 37vh;
    }

    .closeIco {
        width: 32px;
        height: 32px;
        position: absolute;
        right: 0;
        top:0;
        cursor: pointer;
        background-image: url("data:image/svg+xml,%3Csvg width='32px' height='32px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.9393 12L6.9696 15.9697L8.03026 17.0304L12 13.0607L15.9697 17.0304L17.0304 15.9697L13.0607 12L17.0303 8.03039L15.9696 6.96973L12 10.9393L8.03038 6.96973L6.96972 8.03039L10.9393 12Z' fill='%23ffffff'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
    }
    
    .titleCode {
        font-weight: 600;
        font-size: 1.150rem;
    }

    .contentCode {
        display: flex;
        justify-content: center;
        padding: .900rem;
    }

    .inputCode {
        background: #2e2e2ea2;
        width: 115px;
        height: 40px;
        outline: none;
        border: none;
        color: #ffff;
        text-align: center;
        border-radius: 5px;
        backdrop-filter: blur(20px);
        border: 1px solid #5e5e5ea8;
        font-size: 1.5rem;
    }

    .btnContentCode {
        display: flex;
        justify-content: center;
    }
    
    .btnCode {
        width: 150px;
        height: 40px;
        font-size: 1.1rem;
        font-weight: 500;
        border: 1px solid #ffffffa8;
        border-radius: 6px;
        background: rgba(122, 122, 122, 0.199); 
        backdrop-filter: blur(20px); 
        color: #241d1d;
        cursor: pointer;
        transition: background-color 0.3s ease;
        color: #fff;
    }
    
    .btnCode:hover {
        background-color: rgba(255, 255, 255, 0.37); /* Cambiamos el color de fondo al presionar el botón */
    }
    
    .titleLoad {
        font-size: 1.2rem;
        font-weight: 600;
    }
`

export const LoadContent = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: .400rem;
`

export const Loading = styled.div`
    border: 5px solid #3a3a3a;
    border-top: 5px solid #ffffff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`

export const Container = styled.main`
    padding: .400rem;
    margin-top:1.65rem;
    
    form {
        margin-top:1rem;
    }

    .form-content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 90vh;
    }

    .input-title {
        color: #dddddd;
        font-weight: 500;
        font-size: 1.0600rem;
        margin-bottom: .400rem;
        margin-top: .400rem;
        font-weight: 600;
    }

    .inputContent {
        position: relative;
    }

    .icoUser {
        width: 25px;
        height: 25px;
        position: absolute;
        left: .400rem;
        top: .400rem;
        z-index: 1;
        background-image: url("data:image/svg+xml,%3Csvg width='25px' height='25px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
    }
    
    .icoPass {
        width: 25px;
        height: 25px;
        position: absolute;
        left: .400rem;
        top: .400rem;
        z-index: 1;
        background-image: url("data:image/svg+xml,%3Csvg width='25px' height='25px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M8.1819 10.7027H6.00008C5.44781 10.7027 5.0001 11.1485 5.00009 11.7008C5.00005 13.3483 5 16.6772 5.00011 18.9189C5.00023 21.4317 8.88618 22 12 22C15.1139 22 19 21.4317 19 18.9189C19 16.6773 19 13.3483 19 11.7008C19 11.1485 18.5523 10.7027 18 10.7027H15.8182M8.1819 10.7027C8.1819 10.7027 8.18193 8.13514 8.1819 6.59459C8.18186 4.74571 9.70887 3 12 3C14.2912 3 15.8182 4.74571 15.8182 6.59459C15.8182 8.13514 15.8182 10.7027 15.8182 10.7027M8.1819 10.7027H15.8182' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M13 16.6181V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V16.6181C10.6931 16.3434 10.5 15.9442 10.5 15.5C10.5 14.6716 11.1716 14 12 14C12.8284 14 13.5 14.6716 13.5 15.5C13.5 15.9442 13.3069 16.3434 13 16.6181Z' fill='%23ffffff'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
    }
    
    .icoViewPass {
        width: 25px;
        height: 25px;
        position: absolute;
        right: .400rem;
        top: .400rem;
        cursor: pointer;
        transition: all .3s ease-out;
        background-image: url("data:image/svg+xml,%3Csvg width='25px' height='25px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
    }
    
    .icoOcultPass {
        width: 25px;
        height: 25px;
        position: absolute;
        right: .400rem;
        top: .400rem;
        cursor: pointer;
        transition: all .3s ease-out;
        background-image: url("data:image/svg+xml,%3Csvg width='25px' height='25px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
    }
    

    .form-input {
        background: none; 
        backdrop-filter: blur(100px); 
        border: 1px solid #757575;
        width: 350px;
        height: 40px;
        outline: none;
        color: #ffff;
        padding: 0 1rem;
        border-radius: 5px;
        font-weight: 500;
        font-size: 1.1rem;
        padding: 0 2rem;
    }

    .contentBox {
        display: flex;
        align-items: center;
        gap:.400rem;
    }
    
    .titleRember {
        margin-top: 1rem;
        color: #cecece;
    }

    .checkbox-container {
        display: flex;
        width: 20px;
        height: 20px;
        border: 1px solid #757575;
        cursor: pointer;
        margin-top: 1rem;
        position: relative;
        padding: .700rem;
        backdrop-filter: blur(50px);
      }

    .checkbox-mark {
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
        display: none;
    }
      
     
    .checkbox-container.checked .checkbox-mark {
        background-color: none;
        display: block;
        position: absolute;
        top:2px;
        left: 0px;
    }

    .btnLogin {
        width: 250px;
        margin-top: 1.200rem;
        height: 40px;
        font-size: 1.5rem;
        font-weight: 500;
        border: none;
        border-radius: 6px;
        background: none; 
        backdrop-filter: blur(100px); 
        color: #ffff;
        border: 1px solid #757575;
        cursor: pointer;
        transition: background-color 0.3s ease;
    
        &:hover {
            background-color: rgba(255, 255, 255, 0.37); /* Cambiamos el color de fondo al presionar el botón */
        }
    }
    
`

export const Back = styled.div`
    position: absolute;
    top: 1rem;
    left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;

    .backIco {
        height: 42px;
        width: 42px;
        background-image: url("data:image/svg+xml,%3Csvg width='42px' height='42px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M6 12H18M6 12L11 7M6 12L11 17' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
    }
`

export const ContainerSelect = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    gap:.400rem;

    .posterContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 115px;
        height: 115px;
        cursor: pointer;
        position: relative;

        &:hover > .posterSelect {
        border: 2px solid #fff;
        margin-bottom: 10px;
        }

        &:hover > .settingsContent {
        opacity: 1;
        }

        &:hover + .nameUser {
        opacity: 1;
        }
    }

    .posterSelect {
        width: 104px;
        height: 104px;
        border-radius: 10px;
        border: 2px solid transparent;
        transition: all 0.3s ease-out;
    }

    .settingsContent {
        position: absolute;
        height: 14px;
        width: 24px;
        border-radius: 5px;
        z-index: 100;
        top: 7px;
        right: 12px;
        background-color: rgb(97, 97, 97);
        opacity: 0;
        transition: .3s ease-out;

        &:hover {
            background-color: rgb(255, 255, 255)
        }

        &:hover > .settingsIco {
            background-image: url("data:image/svg+xml,%3Csvg fill='%23000000' width='24px' height='14px' viewBox='0 0 32 32' version='1.1' xmlns='http://www.w3.org/2000/svg' stroke='%23000000'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M28.106 19.944h-0.85c-0.069-0.019-0.131-0.050-0.2-0.063-1.788-0.275-3.2-1.762-3.319-3.506-0.137-1.95 0.975-3.6 2.787-4.137 0.238-0.069 0.488-0.119 0.731-0.181h0.85c0.056 0.019 0.106 0.050 0.169 0.056 1.65 0.269 2.906 1.456 3.262 3.081 0.025 0.125 0.063 0.25 0.094 0.375v0.85c-0.019 0.056-0.050 0.113-0.056 0.169-0.262 1.625-1.419 2.863-3.025 3.238-0.156 0.038-0.3 0.081-0.444 0.119zM4.081 12.056l0.85 0c0.069 0.019 0.131 0.050 0.2 0.056 1.8 0.281 3.206 1.775 3.319 3.537 0.125 1.944-1 3.588-2.819 4.119-0.231 0.069-0.469 0.119-0.7 0.175h-0.85c-0.056-0.019-0.106-0.050-0.162-0.063-1.625-0.3-2.688-1.244-3.194-2.819-0.069-0.206-0.106-0.425-0.162-0.637v-0.85c0.019-0.056 0.050-0.113 0.056-0.169 0.269-1.631 1.419-2.863 3.025-3.238 0.15-0.037 0.294-0.075 0.437-0.113zM15.669 12.056h0.85c0.069 0.019 0.131 0.050 0.2 0.063 1.794 0.281 3.238 1.831 3.313 3.581 0.087 1.969-1.1 3.637-2.931 4.106-0.194 0.050-0.387 0.094-0.581 0.137h-0.85c-0.069-0.019-0.131-0.050-0.2-0.063-1.794-0.275-3.238-1.831-3.319-3.581-0.094-1.969 1.1-3.637 2.931-4.106 0.2-0.050 0.394-0.094 0.588-0.137z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
        }
    }

    .settingsIco {
        height: 14px;
        width: 24px;
        transition: .3s ease-out;
        background-image: url("data:image/svg+xml,%3Csvg fill='%23ffffff' width='24px' height='14px' viewBox='0 0 32 32' version='1.1' xmlns='http://www.w3.org/2000/svg' stroke='%23ffffff'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M28.106 19.944h-0.85c-0.069-0.019-0.131-0.050-0.2-0.063-1.788-0.275-3.2-1.762-3.319-3.506-0.137-1.95 0.975-3.6 2.787-4.137 0.238-0.069 0.488-0.119 0.731-0.181h0.85c0.056 0.019 0.106 0.050 0.169 0.056 1.65 0.269 2.906 1.456 3.262 3.081 0.025 0.125 0.063 0.25 0.094 0.375v0.85c-0.019 0.056-0.050 0.113-0.056 0.169-0.262 1.625-1.419 2.863-3.025 3.238-0.156 0.038-0.3 0.081-0.444 0.119zM4.081 12.056l0.85 0c0.069 0.019 0.131 0.050 0.2 0.056 1.8 0.281 3.206 1.775 3.319 3.537 0.125 1.944-1 3.588-2.819 4.119-0.231 0.069-0.469 0.119-0.7 0.175h-0.85c-0.056-0.019-0.106-0.050-0.162-0.063-1.625-0.3-2.688-1.244-3.194-2.819-0.069-0.206-0.106-0.425-0.162-0.637v-0.85c0.019-0.056 0.050-0.113 0.056-0.169 0.269-1.631 1.419-2.863 3.025-3.238 0.15-0.037 0.294-0.075 0.437-0.113zM15.669 12.056h0.85c0.069 0.019 0.131 0.050 0.2 0.063 1.794 0.281 3.238 1.831 3.313 3.581 0.087 1.969-1.1 3.637-2.931 4.106-0.194 0.050-0.387 0.094-0.581 0.137h-0.85c-0.069-0.019-0.131-0.050-0.2-0.063-1.794-0.275-3.238-1.831-3.319-3.581-0.094-1.969 1.1-3.637 2.931-4.106 0.2-0.050 0.394-0.094 0.588-0.137z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
    }

    .nameUser {
        opacity: 0;
        font-weight: 550;
        transition: all 0.3s ease-out;
        width: 104px;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .addContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:hover > .addIco  {
            opacity: 1;
        }
    
        &:hover + .addUser {
            opacity: 1;
        }
    }

    .addIco {
        height: 64px;
        width: 64px;
        transition: all 0.3s ease-out;
        margin-left: 1.5rem;
        opacity: .5;
        background-image: url("data:image/svg+xml,%3Csvg width='64px' height='64px' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' fill='%23000000'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Ctitle%3E%3C/title%3E%3Cg id='Complete'%3E%3Cg data-name='add' id='add-2'%3E%3Cg%3E%3Cline fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' x1='12' x2='12' y1='19' y2='5'%3E%3C/line%3E%3Cline fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' x1='5' x2='19' y1='12' y2='12'%3E%3C/line%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }

    .addUser {
        opacity: 0;
        text-align: center;
        font-weight: 550;
        transition: all 0.3s ease-out;
        margin-left: 1.5rem;
    }
    
`

export const ContentOptions = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    backdrop-filter: blur(50px);
    width: 250px;
    height: 120px;
    border-radius: 20px;
    padding: .300rem .800rem;
    box-shadow: 0px 0px 15px 5px rgba(0,0,0,0.33);
    z-index: 600;

    .closeIcoOptions {
        height: 28px;
        width: 28px;
        position: absolute;
        top:5px;
        cursor: pointer;
        right: 10px;
        background-image: url("data:image/svg+xml,%3Csvg width='28px' height='28px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.9393 12L6.9696 15.9697L8.03026 17.0304L12 13.0607L15.9697 17.0304L17.0304 15.9697L13.0607 12L17.0303 8.03039L15.9696 6.96973L12 10.9393L8.03038 6.96973L6.96972 8.03039L10.9393 12Z' fill='%23ffffff'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
    }

    .deleteContainer {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-top: 10px;
        border-radius: 10px;
        transition: all .3s ease-out;
        padding: .400rem;
        &:hover {
            background: #cacaca2f;
    
        }
    }

    .deleteIco {
        width: 24px;
        height: 24px;
        background-image: url("data:image/svg+xml,%3Csvg width='24px' height='24px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M10 12V17' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M14 12V17' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M4 7H20' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
    }    
`

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 500;
    pointer-events: auto;
    overflow-y: hidden;
    background: #00000023;
`