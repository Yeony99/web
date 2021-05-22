import { useMutation, useApolloClient, gql } from '@apollo/client';
import React, { useEffect } from 'react';
import UserForm from '../components/UserForm';


const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;


//props 포함후 컴포넌트에 전달
const SignUp = props => {
    useEffect(() => {
        //문서제목 업데이트
        document.title = 'Sign Up - Notedly';
    });

    //아폴로 클라이언트
    const client = useApolloClient();

    //뮤테이션 훅 추가
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            //뮤테이션 완료되면 JWT 로깅
            // console.log(data.signUp); //토큰 확인
            localStorage.setItem('token', data.signUp);

            //로컬 캐시 업데이트
            client.writeData({data: {isLoggedIn: true}});

            //홈페이지로 redirection
            props.history.push('/');
        }
    });

    //양식 렌더링

    return (
       <React.Fragment>
           <UserForm action={signUp} formType="signup"/>
           {/*데이터 로딩중일 때 로딩 메시지 표시 */}
           {loading && <p>Loading...</p>}
           {/*에러가 있으면 에러 메시지 표시 */}
           {error && <p>Error creating an accout!</p>}
       </React.Fragment>
    );
};

export default SignUp;