import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'; // API서버 연결 시 GQL 쿼리, mutation 애플리케이션에 통합
import GlobalStyle from './components/GlobalStyle';
import Pages from './pages'; //라우팅 임포트

// configure our API URI & cache
const uri = process.env.API_URI;
const cache = new InMemoryCache();

// configure Apollo Client
const client = new ApolloClient({
  uri:'http://localhost:4000/api', // env 참조를 못한다... 뭐지?!
  cache,
  connectToDevTools: true
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle />
            <Pages />
        </ApolloProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));