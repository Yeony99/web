import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import NoteForm from '../components/NoteForm';
import { GET_NOTES } from '../gql/query';

//new Note query
const NEW_NOTE = gql`
    mutation newNote($content: String!) {
        newNote(content: $content) {
            id
            content
            createdAt
            favoriteCount
            favoritedCount
            favoriteBy {
                id
                username
            }
            author {
                username
                id
            }
        }
    }
`;

const NewNote = props => {
    useEffect(() => {
        //문서 제목 업데이트
        document.title = 'New Note - Notedly';
    });

    const [data, { loading, error }] = useMutation(NEW_NOTE, {
        //GET_NOTES 쿼리를 다시 가져와 캐시 업데이트
        refetchQueries:[{query: GET_NOTES}],
        onCompleted: data => {
            //완료시 사용자를 노트 페이지로 redirection
            props.history.push('note/${data.newNote.id}');
        }
    });

    return (
        <React.Fragment>
            {loading && <p>Loading...</p>}
            {error && <p>Error saving the note!</p>}
            <NoteForm action={data}/>
        </React.Fragment>
    );
}

export default NewNote;