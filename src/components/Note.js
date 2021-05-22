//개별 노트에 대한 마크업 포함
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import styled from 'styled-components';

//노트 행 표시 길이를 800px 이내로 유지
const StyledNote = styled.article`
    max-width:800px;
    margin: 0 auto;
`;

//노트 메타데이터 스타일 지정
const MetaData = styled.div`
    @media (min-width: 500px) {
        display: flex;
        align-items: top;
    }
`;

//avatar 와 meta 정보 사이에 공간추가
const MetaInfo = styled.div`
    padding-right: 1em;
`;
//'UserActions'를 화면 우측 정렬
const UserActions = styled.div`
    margin-left: auto;
`;

const Note = ({ note }) => {
    return (
        <StyledNote>
            <MetaData>
                <MetaInfo>
                    <img
                        src={note.author.avatar}
                        alt={`${note.author.username} avatar`}
                        height="50px"
                    />
                </MetaInfo>
                <MetaInfo>
                    <em>by</em> {note.author.username} <br />
                    {format(note.createdAt, 'YYYY MMM Do')}
                </MetaInfo>
                <UserActions>
                    <em>Favorites:</em>{note.favoriteCount}
                </UserActions>
            </MetaData>
            <ReactMarkdown source={note.content} />
        </StyledNote>
    );
};

export default Note;