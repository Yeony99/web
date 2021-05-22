import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
    padding: 1em;
    background: #f5f4f0;

    @media (max-width: 700px) {
        padding-top: 64px;
    }

    @media(min-width: 700px) {
        position: fixed;
        width: 220px;
        heigth: calc(100% - 64px);
        overflow-y: scroll;
    }
`;

const NavList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    line-height: 2;

    /*스타일드 컴포넌트내에서 스타일 중첩 가능*/
    /*아래 스타일은NavList 컴포넌트 내의 Links에 적용*/

    a{
        text-decoration: none;
        font-weight: bold;
        font-size: 1.1em;
        color: #333;
    }
    a:visited {
        color:#333;
    }

    a:hover, a:focus {
        color: #0077cc;
    }
`;


const Navigation = () => {
    return (
        <Nav>
            <NavList>
                <li>
                    <Link to="/"> <span aria-hidden="true" role="img">🏠 </span>Home</Link>
                </li>
                <li>
                    <Link to="/mynotes"><span aria-hidden="true" role="img">📘</span> My Notes</Link>
                </li>
                <li>
                    <Link to="/favorites"><span aria-hidden="true" role="img">💖</span>Favorites</Link>
                </li>
            </NavList>
        </Nav>
    );
};
export default Navigation;