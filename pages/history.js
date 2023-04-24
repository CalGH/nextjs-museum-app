import { searchHistoryAtom } from '@/store';
import { useRouter } from 'next/router';
import { Row, Col } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { ListGroup } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import Button from 'react-bootstrap';
import { removeFromHistory } from '@/lib/userData';


export default function History() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();
    
    if(!searchHistory) return null;

    let parsedHistory = [];

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });


    function historyClicked(e, index) {
        router.push(`/artwork?${searchHistory[index]}`);
    }

    async function removeHistoryClicked(e, index) {
        e.stopPropagation();
        setSearchHistory(await removeFromHistory(searchHistory[index]));
    }

    if (!parsedHistory.length === 0) {
        return (
            <>
                <Col lg={3}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="/375x375.png" />
                        <Card.Body>
                            <Card.Title>Nothing</Card.Title>
                            <Card.Text>
                                Nothing Here Try searching for some artwork
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </>
        );
    }

    return (
        <>
        <ListGroup as="ol" numbered>
            {parsedHistory.map((historyItem, index) => (<>
            <ListGroup.Item as="li" className={styles.historyListItem} onClick={(e) => historyClicked(e, index)}>
                {Object.keys(historyItem).map((key) => (<>
                    {key}:<strong>{historyItem[key]}</strong>&nbsp;
                </>
                ))}
            </ListGroup.Item>
            </>))}
        </ListGroup>
        </>
    )
}