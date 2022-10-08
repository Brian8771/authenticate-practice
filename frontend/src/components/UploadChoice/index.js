import React from 'react';
import { useHistory } from 'react-router-dom';

const UploadChoice = () => {
    const history = useHistory()
    const headToSongUpload = () => {
        history.push('/songs/create')
    }
    const headToAlbumUpload = () => {
        history.push('/albums/create')
    }

    return (
        <div className='mainDiv' >
            <div className='innerMainDiv'>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%' }}>
                    <h1>Which Type of Upload?</h1>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <button style={{ backgroundColor: '#ff5500', width: '30rem', height: '2rem', borderRadius: '5px', border: 'none', fontSize: '18px', color: 'white' }} onClick={() => headToSongUpload()}>Song</button>
                        <button style={{ backgroundColor: '#ff5500', width: '30rem', height: '2rem', borderRadius: '5px', border: 'none', fontSize: '18px', marginTop: '10px', color: 'white' }} onClick={() => headToAlbumUpload()}>Album</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadChoice;
