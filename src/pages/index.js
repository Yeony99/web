import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'; //라우팅 의존성 임포트
//라우팅 임포트
import Home from './home';
import Favorites from './favorites';
import MyNotes from './mynote';

import Layout from '../components/Layout'; //레이아웃 컴포넌트 임포트

//라우팅 정의
const Pages = () => {
    return (
        <Router>
            <Layout>
                <Route exact path="/" component={Home} />
                <Route exact path="/mynotes" component={MyNotes} />
                <Route exact path="/favorites" component={Favorites} />
            </Layout>
        </Router>
    )
};

export default Pages;

