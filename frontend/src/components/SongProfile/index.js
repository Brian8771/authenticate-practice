import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as songActions from '../../store/Songs';
import * as commentActions from '../../store/comments';
import {useHistory, useParams} from 'react-router-dom';
import EditSong from '../editForm';


function SongProfile() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState('');
    const {songId} = useParams();
    const [editSong, setEditSong] = useState(false);
    const songs = useSelector(state => state.songDetail.currentSong);
    const user = useSelector(state => state.session.user);
    let comment = Object.values(useSelector(state => state.comments));


    const deleteSong = async () => {
        await dispatch(songActions.deleteSong(songId));
        history.push('/');
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        const newComment = await dispatch(commentActions.createComments(songId, body)).catch(async (res) => {
            const data = await res.json();
            console.log(data);
            if (data.message)
            setErrors([data]);
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
            deleteButton =  <button onClick={() => deleteSong()}>Delete</button>;

            editButton = <button onClick={() => setEditSong(true)}>Edit</button>;
        }

        let content;
        if (editSong) {
            content =
                <h2><EditSong setEdit={() => setEditSong()} song={songs} songId={songId}/></h2>

        } else {
            if (isLoaded) {

                content = <div style={{display: 'flex', justifyContent: 'center', margin: 'auto', flexDirection: 'column', alignItems: 'center'}}>
            <img style={{height: '6em', width: '6em'}} src='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png' alt={songs.description} />
            <h2>{songs[songId].songs.title}</h2>
            <h3>{songs[songId].songs.description}</h3>
            <h3>{songs[songId].artist.username}</h3>
            <button onClick={() => history.push('/')}>Back</button>
            <audio controls>
            <source src='https://beardbarnmusicbucket.s3.amazonaws.com/The+Wild+Horse' type="audio/ogg" />
            </audio>
            {deleteButton}
            {editButton}
            <div>
                <h3>Comments: {comment.length ? comment.length : 0}</h3>
                <form onSubmit={handleSubmit}>
                <ul>
                {errors && errors.map(error =>
                <li key={error.id}>{error.message}</li>
                )}
                </ul>
                <label>
                    Create Comment:
                    <input
                    placeholder='comment'
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    />
                </label>
                <button type='submit'>Submit</button>
                </form>
                <ul>
                {comment && comment.map(({id, body, userId}) => (

                   <li key={id}>{body} {user && comment && userId === user.id ? <button onClick={() => dispatch(deleteCommentButton(id, songId))} >Delete</button> : ''}</li>
                ))}
                </ul>
            </div>
        </div>
            }
        }

    useEffect(() => {

        dispatch(songActions.getSongByIdNum(songId)).then(() => dispatch(commentActions.getCommentsById(songId))).then(() =>
        setIsLoaded(true))

    }, [dispatch, songId, editSong])

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
