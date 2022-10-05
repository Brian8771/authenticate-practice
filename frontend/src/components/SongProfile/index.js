import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as songActions from '../../store/Songs';
import * as commentActions from '../../store/comments';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import EditSong from '../editForm';
import './Songprofile.css';


function SongProfile() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState('');
    const { songId } = useParams();
    const [editSong, setEditSong] = useState(false);
    const songs = useSelector(state => state.songDetail.currentSong);
    const user = useSelector(state => state.session.user);
    let comment = Object.values(useSelector(state => state.comments.comments));

    const deleteSong = async () => {
        await dispatch(songActions.deleteSong(songId));
        history.push('/');
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        const newComment = await dispatch(commentActions.createComments(songId, body)).catch(async (res) => {
            const data = await res.json();
            if (data.message)
                if (data.message === 'Validation Error') {

                    setErrors(data.errors);
                }
                else setErrors([data.message]);
        });
        await dispatch(commentActions.getCommentsById(songId))

        if (newComment) {
            setBody('')
            setErrors([]);
        }
    }

    const deleteCommentButton = async (id, songId) => {
        await dispatch(commentActions.deleteComments(id));
        await dispatch(commentActions.getCommentsById(songId));
    }

    let deleteButton;
    let editButton;
    if (user && isLoaded && songs[songId].artist.id === user.id) {
        deleteButton = <button className='deleteSongButton' onClick={() => deleteSong()}>Delete</button>;

        editButton = <button className='editButton' onClick={() => setEditSong(true)}>Edit</button>;
    }

    let content;
    if (editSong) {
        content =
            <h2><EditSong setEdit={() => setEditSong()} song={songs} songId={songId} /></h2>

    } else {
        if (isLoaded) {

            content =
                <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#ECECEC', height: '100vh', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ backgroundColor: 'white', width: '80%', height: '100vh' }}>
                        <div className='SongDiv'>
                            {
                                songs[songId].songs.previewImage.endsWith('.jpg') ?
                                    <img className='img' src={songs[songId].songs.previewImage} alt={songs[songId].songs.description} /> :
                                    <img className='img' src='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png' alt={songs[songId].songs.description} />
                            }
                            <h2 className='title'>{songs[songId].songs.title}</h2>
                            {/* <h3>{songs[songId].songs.description}</h3> */}
                            <NavLink to={`/artists/${songs[songId].artist.id}`}>
                                <h3 className='artist'>{songs[songId].artist.username}</h3>
                            </NavLink>
                            {/* <button onClick={() => history.push('/')}>Back</button> */}
                            <audio className='audioPlayer' controls>
                                <source src={songs[songId].songs.url} type="audio/ogg" />
                            </audio>
                            {deleteButton}
                            {editButton}
                        </div>
                        <div className='commentsDiv'>
                            <form onSubmit={handleSubmit}>
                                <ul>
                                    {errors && errors.map(error =>
                                        <li key={error}>{error}</li>
                                    )}
                                </ul>
                                <label>
                                    <input
                                        className='commentInput'
                                        placeholder='Write a comment'
                                        value={body}
                                        onChange={e => setBody(e.target.value)}
                                        required={true}

                                    />
                                </label>
                                <button disabled={errors.length ? true : false} style={{ display: 'none' }} type='submit'>Submit</button>
                            </form>
                            <h3 style={{ display: 'flex', paddingLeft: '110px' }}>{comment.length ? comment.length : 0} comments</h3>
                            <ul className='commentBorder'>
                                {comment && comment.map(({ id, body, userId }) => (
                                    <div style={{ display: 'flex', width: '87%', alignContent: 'start' }}>
                                        <li className='liEle' style={{ display: 'inline-flex' }} key={id}>{body} {user && comment && userId === user.id ? <button className='hiddenButton' onClick={() => deleteCommentButton(id, songId)} >X</button> : ''}</li>
                                    </div>
                                ))}
                            </ul>
                        </div>
                        {/* <div style={{display: 'flex', justifyContent: 'center',backgroundColor: 'white', width: '80%', position: 'relative', left: '130px'}}>
                <div  style={{textIndent: '70px',position: 'relative', bottom:'1px',display:'flex', justifyContent: 'center',backgroundColor: 'white', width: '100%', borderTop: '1px solid #f2f2f2'}}>
                    <img style={{position: 'relative', bottom: '8px'}} cl src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAOCAAAAAB4YAGaAAAAtElEQVR4AY3RT+uCMADG8d7/O3gKifLQQTpoHbp0+RlFET+LKDP6R5Ag08ogvKhrRIlbq/w+bKfPaSvRgklg4rQURV+mP6GGR3r0HZoUeMr0M0zaMSK8WkthnBj0dC2HOGSwaVrRGySdEOeqix1myKWGIlyoHmxM2QbI1xXhCFsM0WPnj4MNEU5wxD/GsNDnoCFCp0Zgs60w5+BehDfnAhceAvj1TFW0jewdfRpQwu7Cfy3vDqsH6oJzha+DAAAAAElFTkSuQmCC' alt='soundCloudLogo' />
                    </div>
            </div> */}
                    </div>
                </div>
        }
    }

    useEffect(() => {

        dispatch(songActions.getSongByIdNum(songId)).then(() => dispatch(commentActions.getCommentsById(songId))).then(() =>
            setIsLoaded(true))

    }, [dispatch, songId, editSong])

    useEffect(() => {
        const newErrors = []
        if (!user && body) {
            newErrors.push('Have to be signed in to comment');
        }
        setErrors(newErrors);
    }, [body, user])



    // useEffect(() => {
    //     const newErrors = []
    //     if (!user) newErrors.push('User must be logged in');
    //     if (!body) newErrors.push('Type comment before submitting');
    //     setErrors(newErrors)
    // }, [user, body])

    return (
        <>
            {isLoaded &&
                content
            }
        </>
    )
}

export default SongProfile;
