import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";

const Wrapper = styled.div`
    border: 1px solid #f5f4f0;
    max-width: 500px;
    padding: 1em;
    margin: 0 auto;
`;

const Form = styled.form`
    lable,
    input {
        display: block;
        line-height: 2em;
    }
    input {
        width: 100%;
        margin-bottom: 1em;
    }
`;

const UserForm = props => {
    //기본 상태 양식 설정
    const [values, setValues] = useState();

    //사용자가 양식을 입력하면 상태 업데이트
    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };
    return (
        <Wrapper>
            {/*적절한 양식 헤더 표시 */}
            {props.formType === 'signup' ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
            {/*사용자가 양식을 제출하면 뮤테이션 수행 */}

            <Form
                onSubmit={event => {
                    event.preventDefault();
                    props.action({
                        variables: {
                            ...values
                        }
                    });
                }}
            >
                {props.formType === 'signup' && (
                    <React.Fragment>
                        <label htmlFor="username">Username:</label>
                        <input
                            required
                            type="text"
                            id="username"
                            name="username"
                            placeholder="username"
                            onChange={onChange}
                        />
                    </React.Fragment>
                )}
                <label htmlFor="email">Email:</label>
                <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={onChange}
                />

                <label htmlFor="password">Password:</label>
                <input
                    required
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={onChange}
                />
                <Button type="submit" >Submit</Button>
            </Form>
        </Wrapper>
    )
}

export default UserForm;