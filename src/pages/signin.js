import React, { useEffect } from "react";
import UserForm from '../components/UserForm';
import { gql, useApolloClient, useMutation } from "@apollo/client";

const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

const SignIn = props => {
    useEffect(() => {
        //문서제목 업데이트
        document.title = 'Sign In - Notedly';
    });

    const client = useApolloClient();
    const [signIn, {loading, error}] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            //토큰 저장
            localStorage.setItem('token', data.signIn);
            //로컬 캐시 업데이트
            client.writeData({data: {isLoggedIn: true}});
            //사용자를 홈페이지로 리디렉션
            props.history.push('/');
        }
    });

    return (
        <React.Fragment>
            <UserForm action={signIn} formType="signIn"/>
            {/*데이터 로딩 중이면 로딩 메시지 표시 */}
            {loading && <p>Loading...</p> }
            {/*에러가 있으면 에러 메시지 표시 */}
            {error && <p>Error signing in!</p> && console.log(error)}
        </React.Fragment>
    )
}

export default SignIn;