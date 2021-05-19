import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './components/GlobalStyle';
import Pages from './pages'; //라우팅 임포트

const App = () => {
    return (
        <div>
            <GlobalStyle />
            <Pages />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));