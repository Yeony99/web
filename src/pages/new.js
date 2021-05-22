import React, {useEffect} from 'react';


const NewNote = props=> {
    useEffect(()=> {
        //문서 제목 업데이트
        document.title = 'New Note - Notedly';
    });

    return <div>New Note</div>;
;}

export default NewNote;