import { useMutation, useApolloClient, gql } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';


const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

const Wrapper = styled.div`
    border: 1px solid #f5f4f0;
    max-width: 500px;
    padding: 1em;
    margin: 0 auto;
`;

const Form = styled.form`
    label,
    input {
        display: block;
        line-height: 2em;
    }

    input {
        width: 100%;
        margin-bottom: 1em;
    }
`;


//props 포함후 컴포넌트에 전달
const SignUp = props => {
    //기본 양식
    const [values,setValues] = useState();
    
    // 사용자가 양식 채우면 업데이트
    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };
    useEffect(() => {
        //문서제목 업데이트
        document.title = 'Sign Up - Notedly';
    });

    //뮤테이션 훅 추가
    const [signUp, {loading, error}] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            //뮤테이션 완료되면 JWT 로깅
            console.log(data.signUp);
        }
    });

    //양식 렌더링

    return (
        <Wrapper>
            <h2>Sign Up</h2>
            {/*사용자가 양식 제출하면 데이터를 뮤테이션으로 전달*/}
            <Form
                onSubmit= {event => {
                    event.preventDefault();
                    console.log(values);
                    signUp({
                        variables: {
                            ...values
                        }
                    });
                }}            
            >
                <label htmlFor="username">Username:</label>
                <input required
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    onChange={onChange}
                />
                <label htmlFor="email">Email:</label>
                <input required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={onChange}
                />
                <label htmlFor="password">Password:</label>
                <input required
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={onChange}
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Wrapper>
    );
};

export default SignUp;