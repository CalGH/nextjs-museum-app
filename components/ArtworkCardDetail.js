import useSWR from 'swr'
import Error from 'next/error'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { favouritesAtom } from '@/store';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';

export default function ArtworkCard({ objectID }) {

    const { data, error, isLoading } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);

    useEffect(() => {
        setShowAdded(favouritesList?.includes(objectID))
    }, [favouritesList])

    async function favouritesClicked() {
        console.log(favouritesList);
        if(showAdded){
            setFavouritesList(await removeFromFavourites(objectID));
            setShowAdded(current => false);
        }
        else {
            setFavouritesList(await addToFavourites(objectID))
            setShowAdded(current => true);
        }
    }

    if (error) { return <Error statusCode={404} /> }
    if (isLoading) { return <div>loading</div> }

    if (data) {
        return (
            <Card>
                {data.primaryImage ? <Card.Img class="card-img-top" src={data.primaryImage} /> : null }
                <Card.Body>
                    <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
                    <Card.Text>
                        {data.objectDate ?
                            <div><b>Object Date:</b> {data.objectDate}</div> : <div><b>Object Date:</b> N/A</div>}
                        {data.classification ?
                            <div><b>Classification:</b> {data.classification}</div> : <div><b>Classification:</b> N/A</div>}
                        {data.medium ?
                            <div><b>Medium:</b> {data.medium}</div> : <div><b>Medium:</b> N/A</div>}
                        <br></br>
                        <br></br>
                        {data.artistDisplayName ?
                            <div><b>Artist:</b> {data.artistDisplayName + " "}{data.artistWikidata_URL && <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >(wiki)</a>}</div> : <div><b>Artist:</b> N/A</div>}
                        {data.creditLine ?
                            <div><b>Credit Line:</b> {data.creditLine}</div> : <div><b>Credit Line:</b> N/A</div>}
                        {data.dimensions ?
                            <div><b>Dimensions:</b> {data.dimensions}</div> : <div><b>Dimensions:</b> N/A</div>}
                    </Card.Text>
                    <Button variant={showAdded ? 'primary' : 'outline-primary'} onClick={favouritesClicked}>{showAdded ? '+ Favourite (added)' : '+ Favourite'}</Button>
                </Card.Body>
            </Card>
        )
    }
    else {
        return null;
    }
}