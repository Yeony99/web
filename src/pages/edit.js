import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import NoteForm from "../components/NoteForm";
import { EDIT_NOTE } from "../gql/mutation";
import { GET_NOTE, GET_ME } from "../gql/query";


const EditNote = props => {
    //URL 에서 찾은 ID를 변수로 저장
    const id = props.match.params.id;
    //노트쿼리 정의
    const {loading, error, data} = useQuery(GET_NOTE, {variables: {id}});

    const { data: userdata} = useQuery(GET_ME);

    //뮤테이션 정의
    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {
            id
        },
        onCompleted: () => {
            props.history.push(`/note/${id}`);
        }
    });

    if(loading) return 'Loading...';
    if(error) return '<p>Error! Note not found</p>';

    if(userdata.me.id !== data.note.author.id) {
        return <p>You do not have access to edit this note</p>;
    }
    //전달
    return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;