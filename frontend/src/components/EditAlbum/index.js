import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editAlbum, getAllAlbums } from '../../store/album';
import * as songActions from '../../store/Songs';



function EditAlbum({ album, albumId, setEdit }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(album.title);
    const [description, setDescription] = useState(album.description);
    const [imageUrl, setImageUrl] = useState(album.previewImage);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const album = {

            title,
            description,
            imageUrl,
        }
        await dispatch(editAlbum(albumId, album));
        await dispatch(getAllAlbums());
        await setEdit(false);
    }

    useEffect(() => {
        const newErrors = []
        if (title.length === 0) newErrors.push('Must add title');
        if (imageUrl && !imageUrl.endsWith('.jpg')) newErrors.push('If adding image it must be .jpg')
        setErrors(newErrors)
    }, [imageUrl, title])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#ECECEC', height: '100vh', width: '100%', flexDirection: 'column', alignItems: 'center', position: 'relative', bottom: '20px' }}>
            <div style={{ backgroundColor: 'white', width: '80%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', justifyContent: 'start', alignItems: 'center' }}>
                    <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'start' }}>Edit Album</h2>
                    <ul style={{ listStyleType: 'none' }}>
                        {errors && errors.map(error =>
                            <li style={{ color: 'red' }} key={error}>{error}</li>
                        )}
                    </ul>
                    <label className='labelEdit'>Title:
                    </label>
                    <input
                        className='inputEdit'
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type='text'
                        required={true}
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
                    <label className='labelEdit'>ImageUrl:
                    </label>
                    <input
                        className='inputEdit'
                        name='imageUrl'
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value === '' ? '' : e.target.value)}
                        type='text'
                    />
                    <button disabled={errors.length > 0 ? true : false} className='editSongButton' type='submit'>Upload</button>

                </form>
            </div>
        </div>
    )
}

export default EditAlbum;
