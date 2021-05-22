import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'; // API서버 연결 시 GQL 쿼리, mutation 애플리케이션에 통합
import GlobalStyle from '/components/GlobalStyle';
import Pages from '/pages'; //라우팅 임포트
import { setContext } from 'apollo-link-context';

// configure our API URI & cache
const uri = process.env.API_URI; //참조 못함
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

// 토큰 확인 context에 대한 header 반환 // 사용자 정보 API로 전달하도록 종속성 설정
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || ''
        }
    };
});

// 아폴로 클라이언트 생성
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    //    uri:'http://localhost:4000/api', // process.env.API_URI 참조..
    cache,
    resolvers: {},
    connectToDevTools: true
});

//local token 확인
const data = {
    isLoggedIn: !!localStorage.getItem('token')
};

//초기 로드에 캐시 데이터 쓰기
cache.writeData({ data });
//캐시 초기화 후 캐시 데이터 쓰기
client.onResetStore(() => cache.writeData({ data }));

const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle />
            <Pages />
        </ApolloProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));