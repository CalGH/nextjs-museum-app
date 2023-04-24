import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import { searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';
import { addToHistory } from '@/lib/userData';
import { removeToken, readToken } from '@/lib/authenticate';


function MainNav() {
    const router = useRouter();
    const [search, setSearch] = useState();
    const [isExpanded, setExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    let token = readToken();

    useEffect(() => {
        setSearch(() => "");
    }, [])

    function logout() {
        setExpanded(false);
        removeToken();
        router.push('/login');
    }

    async function submitSearch(e) {
        e.preventDefault();
        setExpanded((state) => false);
        setSearchHistory(await addToHistory(`title=true&q=${search}`))
        router.push(`/artwork?title=true&q=${search}`);
    }

    return (
        <>
            <Navbar expanded={isExpanded} className='fixed-top navbar-dark bg-secondary' expand="lg">
                <Container>
                    <Navbar.Brand bg="light">Calvin Hodges</Navbar.Brand>
                    <Navbar.Toggle onClick={(e) => setExpanded((state) => !state)} aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === "/"} onClick={(e) => setExpanded((state) => false)}>Home</Nav.Link>
                            </Link>
                            {
                                token && <Link href="/search" passHref legacyBehavior>
                                    <Nav.Link active={router.pathname === "/search"} onClick={(e) => setExpanded((state) => false)} >Advanced Search</Nav.Link>
                                </Link>
                            }
                            {
                                token && <NavDropdown title={token?.userName} id="basic-nav-dropdown">
                                    <Link href="/favourites" passHref legacyBehavior>
                                        <NavDropdown.Item active={router.pathname === "/favourites"} onClick={(e) => setExpanded((state) => false)}>Favourites</NavDropdown.Item>
                                    </Link>
                                    <Link href="/history" passHref legacyBehavior>
                                        <NavDropdown.Item active={router.pathname === "/history"} onClick={(e) => setExpanded((state) => false)}>Search History</NavDropdown.Item>
                                    </Link>
                                    <NavDropdown.Item onClick={(e) => logout()}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            }
                        </Nav>
                        {
                            !token && <Nav>
                                <Link href="/register" passHref legacyBehavior>
                                    <Nav.Link active={router.pathname === "/register"} onClick={(e) => setExpanded((state) => false)} >Register</Nav.Link>
                                </Link>
                                <Link href="/login" passHref legacyBehavior>
                                    <Nav.Link active={router.pathname === "/login"} onClick={(e) => setExpanded((state) => false)} >Login</Nav.Link>
                                </Link>
                            </Nav>
                        }
                        {
                            token && <Form className="d-flex" onSubmit={submitSearch}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    value={search}
                                    onChange={(e) => { setSearch(e.target.value) }}
                                />
                                <Button variant="warning" type="submit">Search</Button>
                            </Form>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br></br>
        </>
    );
}

export default MainNav;