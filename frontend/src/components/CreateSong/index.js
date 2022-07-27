import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as songActions from '../../store/Songs';
import './createSong.css';

function CreateSong() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('')
    const [imageUrl, setImageUrl] = useState('');
    let [albumId, setAlbumId] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        albumId = Number(albumId)
        const song = {
            title,
            description,
            url,
            imageUrl,
            albumId
        }
        let createdSong = await dispatch(songActions.createSongs(song));
        if (createdSong){
            history.push(`/songs/${createdSong.id}`);
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#ECECEC', height: '100%', width: '100%', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{display:'flex',justifyContent: 'center', alignItems: 'Center', height: '50em', margin: 'auto', backgroundColor: 'white', width: '80%'}}>

        <section >
        <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column',width: '50em', alignItems: 'center'}}>

            <h1 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Upload Song</h1>
                <input
                placeholder='Title:'
                className='input inputs'
                name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                />
                <input
                placeholder='Description:'
                className='input inputs '
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type='text'
                />
                <input
                placeholder='URL'
                className='input inputs'
                name='url'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                type='text'
                />
                <input
                placeholder='Image Url'
                className='input inputs'
                name='imageUrl'
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                type='text'
                />
                <input
                placeholder='Album Number'
                className='input inputs'
                name='album'
                value={albumId}
                onChange={(e) => setAlbumId(e.target.value)}
                type='number'
                />
            <button style={{backgroundColor:'#ff5500'}} className='button' type='submit'>Upload</button>
        </form>
        </section>
        </div>
        </div>
    )
}

export default CreateSong
