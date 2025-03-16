import React, { useState, useEffect } from 'react';
import { Carousel, Modal, Button, Form, Row, Col } from 'react-bootstrap';
import api from '../../../store/api-service';
import { notify } from "../../../store/notification";
import { getFormattedDate } from '../../../store/datetime-formatter';

const IUIImageGallery = (props) => {
    const module = "attachment";
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredImages, setFilteredImages] = useState([]);

    // Fetch images from the API
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const newBaseFilter = {
                    name: props?.searchKey,
                    value: `${props?.searchId}`,
                    and: {
                        name: "module",
                        value: props?.searchModule
                    }
                }

                const pageOptions = {
                    recordPerPage: 0,
                    searchCondition: newBaseFilter
                }

                const response = await api.getData({ module: module, options: pageOptions });
                setImages(response?.data?.items);
                setFilteredImages(response?.data?.items);
                setLoading(false);
            } catch (error) {
                notify("error", 'Failed to fetch images:');
                setLoading(false);
            }
        };

        fetchImages();
    }, [props]);

    const handleSearch = () => {
        const start = new Date(startDate).setHours(0, 0, 0, 0);
        const end = new Date(endDate).setHours(23, 59, 59, 0);

        const filtered = images.filter(image => {
            const imageDate = new Date(image.date);
            return (!startDate || imageDate >= start) && (!endDate || imageDate <= end);
        });

        setFilteredImages(filtered);
    };

    const handleReset = () => {
        setFilteredImages(images);
        setStartDate('');
        setEndDate('');
    }

    // If images are still loading, show a loading message or spinner
    if (loading) {
        return <div>Loading...</div>;
    }

    const handleModalClose = () => {
        props?.handleClose();
    };

    return (
        <Modal size="lg" show={props?.show} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="mb-3">
                    <Row>
                        <Col sm={12} md={4}>
                            <Form.Group controlId="startDate">
                                <Form.Label className='fw-bold'>Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={4}>
                            <Form.Group controlId="endDate">
                                <Form.Label className='fw-bold'>End Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs="auto" className="d-flex align-items-end" sm={12} md={4}>
                            <Button
                                variant="contained"
                                className='btn-wide btn-pill btn-shadow btn-hover-shine btn-sm btn btn-primary mr-2'
                                onClick={handleSearch}
                            >
                                Search
                            </Button>
                            <Button
                                variant="conatined"
                                className='btn-wide btn-pill btn-shadow btn-hover-shine btn-sm btn btn-secondary'
                                onClick={handleReset}
                            >
                                Reset
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <div className="container mt-2">
                    <Carousel>
                        {filteredImages.length > 0 ? (
                            filteredImages.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img className="d-block w-100" src={image.file} alt={`Slide ${index}`} />
                                    <Carousel.Caption>
                                        <h3>{image.member}</h3>
                                        <p>Upload Date Time: {getFormattedDate(image.date)}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))
                        ) : (
                            <p>No images found within the selected date range.</p>
                        )}
                    </Carousel>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="contained"
                    className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary mr-2'
                    onClick={handleModalClose}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default IUIImageGallery;
