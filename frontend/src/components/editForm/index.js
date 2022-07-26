import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as songActions from '../../store/Songs';


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
        let editedSong = await dispatch(songActions.editSong(songId, song));
        await setEdit(false);
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
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}
                type='text'
                />
            </label>
            <button type='submit'>Upload</button>
        </form>
        </section>
        </div>
    )
}

export default EditSong;
