import ButtonAsLink from "./ButtonAsLink"
import React from "react";
import { withRouter } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { DELETE_NOTE } from "../gql/mutation";
import { GET_MY_NOTES, GET_NOTES } from "../gql/query";


const DeleteNote = props => {
    const [deleteNote] = useMutation(DELETE_NOTE, {
        variables: {
            id: props.noteId
        },
        //캐시 업데이트하게끔 노트 리스트 쿼리 다시 불러오기
        refetchQueries: [{ query: GET_MY_NOTES, GET_NOTES }],
        onCompleted: data => {
            //사용자를 my notes로 리디렉션
            props.history.push(`/mynotes`);
        }
    });
    return <ButtonAsLink onClick={deleteNote}>Delete Note</ButtonAsLink>
}

export default withRouter(DeleteNote);