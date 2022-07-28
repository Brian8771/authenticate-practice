import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as songActions from '../../store/Songs';
import './edit.css'


function EditSong({song, songId, setEdit}) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(song[songId].songs.title);
    const [description, setDescription] = useState(song[songId].songs.description);
    const [url, setUrl] = useState(song[songId].songs.url)
    const [previewImage, setPreviewImage] = useState(song[songId].songs.previewImage);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const song = {

            title,
            description,
            url,
            previewImage,
        }
        await dispatch(songActions.editSong(songId, song));
        await setEdit(false);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#ECECEC', height: '35em', width: '100%', flexDirection: 'column', alignItems: 'center', position: 'relative', bottom: '20px'}}>
        <div style={{backgroundColor: 'white', width: '80%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', width: '100%', height: '100%', justifyContent: 'start', alignItems: 'center'}}>
            <h2 style={{display: 'flex', justifyContent: 'center', alignItems: 'start'}}>Edit Song</h2>

            <label className='labelEdit'>Title:
            </label>
                <input
                className='inputEdit'
                name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                />
            <label className='labelEdit'>Description:
            </label>
                <input
                className='inputEdit'
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type='text'
                />
            <label className='labelEdit'>Url:
            </label>
                <input
                className='inputEdit'
                name='url'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                type='text'
                />
            <label className='labelEdit'>ImageUrl:
            </label>
                <input
                className='inputEdit'
                name='imageUrl'
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}
                type='text'
                />
            <button className='editSongButton' type='submit'>Upload</button>

        </form>
        </div>
        </div>
    )
}

export default EditSong;
