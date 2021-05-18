import React, {useEffect} from 'react';

const MyNotes = () => {
    useEffect(() => {
        //문서 제목 업데이트
        document.title = 'My Notes - Notedly';
    });

    return (
        <div>
            <h1>Notedly</h1>
            <p>These are my notes</p>
        </div>

    )
};

export default MyNotes;