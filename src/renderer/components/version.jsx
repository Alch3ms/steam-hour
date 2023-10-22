import packageJson from '../../../package.json'
import styled from '@emotion/styled';

const Version = styled.p`
    color: #8d8d8d;
    position: absolute;
    bottom:5px;
    right:5px;
`

function version() {
    return(
        <Version>v0.4.5</Version>
    )
}

export default version;