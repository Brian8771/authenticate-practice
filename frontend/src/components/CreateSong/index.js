import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as songActions from '../../store/Songs';


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
        console.log(createdSong)
        if (createdSong){
            history.push(`/songs/${createdSong.id}`);
        }
    }

    return (
        <div style={{display:'flex',justifyContent: 'center', alignItems: 'Center', height: '50em', margin: 'auto'}}>

        <section >
        <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', width: '50em'}}>
            <label style={{display: 'flex', justifyContent: 'center'}}>Title:
                <input
                name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                />
            </label>
            <label>Description:
                <input
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type='text'
                />
            </label>
            <label>Url:
                <input
                name='url'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                type='text'
                />
            </label>
            <label>ImageUrl:
                <input
                name='imageUrl'
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                type='text'
                />
            </label>
            <label>Album:
                <input
                name='album'
                value={albumId}
                onChange={(e) => setAlbumId(e.target.value)}
                type='number'
                />
            </label>
            <button type='submit'>Upload</button>
        </form>
        </section>
        </div>
    )
}

export default CreateSong
