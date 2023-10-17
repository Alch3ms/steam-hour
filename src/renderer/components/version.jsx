import packageJson from '../../../package.json'

function Version() {
    return(
        <p style={{position: 'absolute', bottom: '2%', right: '1%', color: '#8d8d8da6'}}>v{packageJson.version}</p>
    )
}

export default Version;