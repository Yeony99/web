import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'; //라우팅 의존성 임포트
//라우팅 임포트
import Home from './home';
import Favorites from './favorites';
import MyNotes from './mynote';
import NotePage from './note';

import Layout from '../components/Layout'; //레이아웃 컴포넌트 임포트

//라우팅 정의
const Pages = () => {
    return (
        <Router>
            <Layout>
                <Route exact path="/" component={Home} />
                <Route path="/mynotes" component={MyNotes} />
                <Route path="/favorites" component={Favorites} />
                <Route path="/note/:id" component={NotePage}/>
            </Layout>
        </Router>
    )
};

export default Pages;

