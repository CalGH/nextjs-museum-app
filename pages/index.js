/*********************************************************************************

* A met musuem api frontend app, created to learn NextJS and various libraries

********************************************************************************/ 

import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import MainNav from '@/components/MainNav'
import ArtworkCard from '@/components/ArtworkCard'
import { Row, Col } from "react-bootstrap";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <MainNav></MainNav>
      <div class="col">
      <Row><Col md={12} align="center">
          <img class="img-fluid rounded" src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"></img>
        </Col></Row>
        <Row><Col md={6}>
          The Metropolitan Museum of Art in New York City, colloquially &quot;the Met&quot;,[a] is the largest art museum in the Americas and the most-visited museum in the Western Hemisphere. Its permanent collection contains over two million works,[1] divided among 17 curatorial departments. The main building at 1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park on Manhattan&apos;s Upper East Side, is by area one of the world&apos;s largest art museums. The first portion of the approximately 2-million-square-foot (190,000 m2) building was built in 1880. A much smaller second location, The Cloisters at Fort Tryon Park in Upper Manhattan, contains an extensive collection of art, architecture, and artifacts from medieval Europe.
          <br></br>
          <br></br>
          The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American people. The museum&apos;s permanent collection consists of works of art from classical antiquity and ancient Egypt, paintings, and sculptures from nearly all the European Old Masters, and an extensive collection of American and modern art. The Met maintains extensive holdings of African, Asian, Oceanian, Byzantine, and Islamic art. The museum is home to encyclopedic collections of musical instruments, costumes, and accessories, as well as antique weapons and armor from around the world. Several notable interiors, ranging from 1st-century Rome through modern American design, are installed in its galleries.
        </Col>
          <Col md={6}>
          The Fifth Avenue building opened on March 30, 1880. In 2021, despite the COVID-19 pandemic in New York City, the museum attracted 1,958,000 visitors, ranking fourth on the list of most-visited art museums in the world.
          <br></br>
          <br></br>
          <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Museum Wikipedia</a>
          </Col></Row>

      </div>
    </>
  )
}
