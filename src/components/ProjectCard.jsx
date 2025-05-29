import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { baseUrl } from '../services/baseUrl'

const ProjectCard = ({ item }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Card style={{ width: '100%' }} className='shadow rounded-2' onClick={handleShow}>
                <Card.Img variant="top" src={`${baseUrl}/uploads/${item?.projectImage}`}  />
                <Card.Body>
                    <Card.Title className='text-white'>{item?.title}</Card.Title>
                    <Card.Text>
                        {/* Some quick example text to build on the card title and make up the
                        bulk of the card's content. */}
                    </Card.Text>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose} className='bg-transparent' size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{item?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className='col' md={6} lg={6}>
                            <img src={`${baseUrl}/uploads/${item?.projectImage}`} alt="" width='100%' />
                        </div>
                        <div className='col' md={6} lg={6}>
                            <h5>Description:</h5>
                            <p>{item?.overview}</p>
                            <h5>Technologies:</h5>
                            <p>{item?.language}</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='bg-black gap-3'>
                    <Link to='https://github.com/sebin-johnson/mediaPlayerFE' target='_blank'>
                        <i className="fa-brands fa-github"></i>
                    </Link>
                    <Link>
                        <i className="fa-solid fa-link"></i>
                    </Link>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProjectCard
