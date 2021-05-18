import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages'; //라우팅 임포트

const App = () => {
    return (
        <div>
            <Pages />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));