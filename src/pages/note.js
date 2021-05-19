// /note/<note_id> 로 접근할 수 있도록
import React from 'react';
import { useQuery, gql } from '@apollo/client';

import Note from '../components/Note';

//ID 변수를 받는 note 쿼리
const GET_NOTE = gql`
    query note($id: ID!) {
        note(id: $id) {
            id
            createdAt
            content
            favoriteCount
            author {
                username
                id
                avatar
            }
        }
    }

`;

const NotePage = props => {
    //URL의 ID를 변수로 저장
    const id = props.match.params.id;

    // 훅 쿼리하며 ID값을 변수로 전달
    const {loading, error, data} = useQuery(GET_NOTE, {variables: {id}});
    //데이터 로딩 중 로딩메시지 표시
    if(loading) return <p>Loading...</p>;
    //에러 발생 시 에러 표시
    if(error) return <p>Error! Note not found</p>;

    return <Note note={data.note}/>;
};

export default NotePage;