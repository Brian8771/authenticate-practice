import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createAlbum, getAllAlbums } from '../../store/album';
import * as songActions from '../../store/Songs';
// import './createSong.css';

function CreateAlbum() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            title,
            description,
            imageUrl
        }

        await dispatch(createAlbum(body)).catch(async (res) => {
            const data = await res.json();
            if (data.message === 'Validation Error') {

                setErrors(data.errors);
            }
            else setErrors([data.message]);
        });
        await dispatch(getAllAlbums());
        await history.push(`/`);
    }

    useEffect(() => {
        const newErrors = []
        if (title.length === 0) newErrors.push('Must add title');
        if (imageUrl && !imageUrl.endsWith('.jpg')) newErrors.push('If adding image it must be .jpg')
        setErrors(newErrors)
    }, [imageUrl, title])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#ECECEC', height: '100vh', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'Center', height: '100vh', margin: 'auto', backgroundColor: 'white', width: '80%' }}>

                <section >
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '50em', alignItems: 'center' }}>
                        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Upload Album</h1>
                        <ul style={{ listStyleType: 'none' }}>
                            {errors && errors.map(error =>
                                <li style={{ color: 'red' }} key={error}>{error}</li>
                            )}
                        </ul>
                        <input
                            placeholder='Title:'
                            className='input inputs'
                            name='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type='text'
                            required={true}
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
                            placeholder='Image Url'
                            className='input inputs'
                            name='imageUrl'
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            type='text'
                        // required={true}
                        />
                        <button disabled={errors.length > 0 ? true : false} style={{ backgroundColor: '#ff5500' }} className='button' type='submit'>Upload Album</button>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default CreateAlbum
