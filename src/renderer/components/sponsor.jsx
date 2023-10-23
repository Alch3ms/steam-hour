import styled from "@emotion/styled";
const { shell } = window.require('electron');

const Image = styled.img`
    position:absolute;
    bottom:20px;
    left:20px;
    width:180px;
    height:30px;
    opacity:.7;
    transition: all .3s ease-out;
    cursor:pointer;

    &:hover {
        opacity:1;
    }
`

function sponsor() {

    function openSponsor() {
        const url = 'https://ko-fi.com/evairx';
        shell.openExternal(url);
    }
    
    return (
        <>
            <Image src="/kofi.webp" onClick={openSponsor}/>
        </>
    )
}

export default sponsor;