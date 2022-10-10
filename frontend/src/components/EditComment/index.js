import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editComments, getCommentsById } from '../../store/comments';
const EditComment = ({ body, id, setEditComment, songId, setComments }) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState(body)
    const [errors, setErrors] = useState([]);

    const submitForm = async (e) => {
        e.preventDefault()
        await dispatch(editComments(id, comment))
        await setComment(false)
        await dispatch(getCommentsById(songId))
        await setComments(true)
        await setEditComment(false);
    }

    useEffect(() => {
        const newErrors = []
        if (comment.length === 0) newErrors.push('Comment cannot be empty');
        setErrors(newErrors)
    }, [comment])

    return (
        <form onSubmit={submitForm} className='liEle' style={{ display: 'flex', flexDirection: 'column' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {errors && errors.map(error =>
                    <li style={{ color: 'red' }} key={error}>{error}</li>
                )}
            </ul>
            <input

                style={{ width: '59em', border: 'none', fontSize: '16px' }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type='text'
            />
            <button style={{ color: 'transparent', backgroundColor: 'transparent', border: 'none' }} type='submit'></button>
        </form>
    )
};

export default EditComment;
