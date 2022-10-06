import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editComments, getCommentsById } from '../../store/comments';
const EditComment = ({ body, id, setEditComment, songId, setComments }) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState(body)

    const submitForm = async (e) => {
        e.preventDefault()
        await dispatch(editComments(id, comment))
        await setComment(false)
        await dispatch(getCommentsById(songId))
        await setComments(true)
        await setEditComment(false);
    }

    return (
        <form onSubmit={submitForm} className='liEle' style={{ display: 'inline-flex' }}>
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
