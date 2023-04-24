import { favouritesAtom } from '@/store';
import { useAtom } from 'jotai';
import Card from 'react-bootstrap/Card';
import ArtworkCard from '@/components/ArtworkCard'
import { Row, Col } from "react-bootstrap";
import { useEffect } from 'react';
import { useState } from 'react';

export default function Favourites() {
    const [favourites, setFavourites] = useAtom(favouritesAtom);

    if (favourites) {
        return (
            <>
                <Row className="gy-4">
                    {
                        favourites.map((currentObjectID) => (
                            <Col lg={3} key={currentObjectID}><ArtworkCard objectID={currentObjectID} /></Col>
                        ))
                    }
                </Row>
            </>
        )
    }
    else {
        return null;
    }
}