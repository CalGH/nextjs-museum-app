import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import useSWR from 'swr'
import { Row, Col } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import { Pagination } from "react-bootstrap";
import { Card } from "react-bootstrap";
import validObjectIDList from '@/public/data/validObjectIDList.json'
import Error from "next/error";

export default function Artwork() {
    const PER_PAGE = 12
    let results = [];

    const [artworkList, setArtworkList] = useState()
    const [page, setPage] = useState(1)

    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    const { data, error, isloading } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`)

    useEffect(() => {
        if (data) {
            let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
            console.log(filteredResults.length);
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
            }

            setArtworkList(results);
            setPage(() => 1)
        }
    }, [data])

    function previousPage() {
        if (page > 1) {
            setPage((page) => page-1)
        }
    }

    function nextPage() {
        console.log(artworkList)
        if (page < artworkList.length) {
            setPage((page) =>  page+1)
        }
    }


    if (error) { return <Error statusCode={404} /> }
    if (artworkList) {
        return (
            <>
                <Row className="gy-4">
                    {artworkList.length > 0 ?
                        artworkList[page - 1].map((currentObjectID) =>
                                <Col lg={3} key={currentObjectID}><ArtworkCard objectID={currentObjectID} /></Col>
                        ) :
                        <Col lg={3}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="/375x375.png" />
                                <Card.Body>
                                    <Card.Title>Nothing</Card.Title>
                                    <Card.Text>
                                        <h4>Nothing Here</h4>
                                    </Card.Text>
                                </Card.Body>
                            </Card></Col>}
                </Row>
                {artworkList.length > 0 && <Row><Col>
                    <Pagination>
                        <Pagination.Prev onClick={previousPage} />
                        <Pagination.Item>{page}</Pagination.Item>
                        <Pagination.Next onClick={nextPage} />
                    </Pagination>
                </Col></Row>
                }
            </>
        )
    }
    else {
        return null
    }
}