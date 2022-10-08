import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllAlbums } from '../../store/album';
import * as songActions from '../../store/Songs';
import './createSong.css';

function CreateSong() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);
    const [url, setUrl] = useState('')
    const [imageUrl, setImageUrl] = useState('');
    let [albumId, setAlbumId] = useState('');
    const user = useSelector(state => state.session.user);
    const albums = Object.values(useSelector(state => state.albums.allAlbums)).filter(x => x.userId == user.id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        albumId = Number(albumId)
        const song = {
            title,
            description,
            url,
            imageUrl,
            albumId
        }

        let createdSong = await dispatch(songActions.createSongs(song)).catch(async (res) => {
            const data = await res.json();
            if (data.message === 'Validation Error') {

                setErrors(data.errors);
            }
            else setErrors([data.message]);
        });
        await dispatch(getAllAlbums());
        if (createdSong) {
            history.push(`/songs/${createdSong.id}`);
        }
    }

    useEffect(() => {
        dispatch(getAllAlbums())
    }, [])

    useEffect(() => {
        const newErrors = []

        if (url && !url.endsWith('.wav')) newErrors.push('Song must end with .wav');
        if (imageUrl && !imageUrl.endsWith('.jpg')) newErrors.push('If adding image it must be .jpg')
        setErrors(newErrors)
    }, [url, imageUrl])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#ECECEC', height: '100vh', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'Center', height: '100vh', margin: 'auto', backgroundColor: 'white', width: '80%' }}>

                <section >
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '50em', alignItems: 'center' }}>
                        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Upload Song</h1>
                        <ul>
                            {errors && errors.map(error =>
                                <li key={error}>{error}</li>
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
                            placeholder='URL'
                            className='input inputs'
                            name='url'
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            type='text'
                            required={true}
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
                        <label style={{ width: '90%' }}>
                            Album:
                        </label>
                        <select
                            style={{ width: '90%', height: '2rem' }}
                            placeholder='Album Number'
                            className='input inputs'
                            name='album'
                            value={albumId}
                            onChange={(e) => setAlbumId(e.target.value)}
                            type='number'
                        >
                            {albums && albums.map(album => {
                                return <option value={album.id}>{album.title}</option>
                            })}
                        </select>
                        <button disabled={errors.length > 0 ? true : false} style={{ backgroundColor: '#ff5500' }} className='button' type='submit'>Upload</button>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default CreateSong
