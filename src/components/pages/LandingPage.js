import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import NavbarMath from '../navbar'


import '../../App.css'
// import BackgroundImage from '../../assets/bg.png'


function LandingPage(){
    return (
        <Container fluid>
            <Row>
                <Col className="text-center text-md-right">
                    <p style={{color:"#712c9c", paddingTop:"20px"}}>This a sample of the PDF we can create using chatGPT OpenAI API</p>
                </Col>
            </Row>
            <Row>
                <Col className="text-center text-md-right">
                    <iframe style={{width:"800px", height:"800px"}} src='assets/mathworksheet.pdf'></iframe>
                </Col>
            </Row>
        </Container>
    )
}

export default LandingPage;

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    // background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}