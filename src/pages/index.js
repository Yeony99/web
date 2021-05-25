import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'; //라우팅 의존성 임포트
import Layout from '../components/Layout'; //레이아웃 컴포넌트 임포트

//라우팅 임포트
import Home from './home';
import Favorites from './favorites';
import MyNotes from './mynote';
import SignUp from './signup';
import SignIn from './signin';
import Note from './note';
import NewNote from './new';
import EditNote from './edit';

const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

//라우팅 정의
const Pages = props => {
    return (
        <Router>
            <Layout>
                <Route exact path="/" component={Home} />
                <PrivateRoute path="/mynotes" component={MyNotes} />
                <PrivateRoute path="/favorites" component={Favorites} />
                <Route path="/note/:id" component={Note} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
                <PrivateRoute path="/new" component={NewNote}/>
                <PrivateRoute path="/edit/:id" component={EditNote} />
            </Layout>
        </Router>
    )
};
// 'Pages' 컴포넌트 하에 PrivateRoute 컴포넌트 추가
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);

    //데이터 로딩 중이면 로딩 메시지 표시
    if (loading) return <p>Loading...</p>;

    //데이터 로딩 중 에러가 발생하면 에러 메시지 표시
    if (error) return <p>Error!</p>;

    //사용자가 로그인해 있으면 요청한 컴포넌트로 라우팅
    //사용자가 로그인 상태가 아니면 로그인 페이지로 리디렉션
    return (
        <Route
            {...rest}
            render={props =>
                data.isLoggedIn === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};



export default Pages;

