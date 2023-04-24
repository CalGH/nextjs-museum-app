import useSWR from 'swr'
import Error from 'next/error'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

export default function ArtworkCard({ objectID }) {
  const { data, error, isLoading } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

  if (error) { return <Error statusCode={404} /> }
  if (isLoading) { return <div>loading</div> }

  if (data) {
    return (
      <Card style={{ width: '18rem' }}>
        {data.primaryImageSmall ? <Card.Img variant="top" src={data.primaryImageSmall} /> : <Card.Img variant="top" src="/375x375.png" />}
        <Card.Body>
          <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
          <Card.Text>
            {data.objectDate ?
              <div><b>Object Date:</b> {data.objectDate}</div> : <div><b>Object Date:</b> N/A</div>}
            {data.classification ?
              <div><b>Classification:</b> {data.classification}</div> : <div><b>Classification:</b> N/A</div>}
            {data.medium ?
              <div><b>Medium:</b> {data.medium}</div> : <div><b>Medium:</b> N/A</div>}
          </Card.Text>
          <Link passHref href={`/artwork/${data.objectID}`}> <Button variant="primary">{data.objectID}</Button> </Link>
        </Card.Body>
      </Card>
    )
  }
  else {
    return null;
  }
}