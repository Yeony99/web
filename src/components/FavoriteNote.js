import React, { useState } from "react";
import {useMutation} from '@apollo/client';
import ButtonAsLink from "./ButtonAsLink";
import { TOGGLE_FAVORITE } from "../gql/mutation";
import { GET_MY_FAVORITES } from "../gql/query";

const FavoriteNote = props => {
    //즐겨찾기 카운트 state로 저장
    const [count, setCount] = useState(props.favoriteCount);

    //노트 즐겨찾기 여부 상태로 저장
    const [favorited, setFavorited] = useState(
        //노트가 사용자의 목록에 있는지 확인
        props.me.favorites.filter(note => note.id === props.noteId).length > 0
    );

    //toggle 뮤테이션 훅
    const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
        variables: {
            id: props.noteId
        },
        //캐시 업데이트
        refetchQueries: [{query: GET_MY_FAVORITES}]
    });
    //이미 노트 즐겨찾기 -> 해제 옵션 표시 /// 아니라면 등록옵션 표시
    return (
        <React.Fragment>
            {favorited? (
                <ButtonAsLink
                    onClick={() => {
                        toggleFavorite();
                        setFavorited(false);
                        setCount(count -1);
                    }}
                > Remove Favorite
                </ButtonAsLink>
            ) : (
                <ButtonAsLink
                    onClick={() => {
                        toggleFavorite();
                        setFavorited(true);
                        setCount(count + 1);
                    }}
                > Add Favorite
                </ButtonAsLink>
            )}
            : {count}            
        </React.Fragment>
    )
}

export default FavoriteNote;