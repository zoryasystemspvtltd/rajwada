import React, { useState, useEffect } from 'react';
import { Carousel, Modal, Button } from 'react-bootstrap';
import api from '../../../store/api-service';
import { notify } from "../../../store/notification";
import { getFormattedDate } from '../../../store/datetime-formatter';

const IUIImageGallery = (props) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch images from the API
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const newBaseFilter = {
                    name: props?.searchKey,
                    value: `${props?.searchId}`,
                }

                const pageOptions = {
                    recordPerPage: 0,
                    searchCondition: newBaseFilter
                }

                const response = await api.getData({ module: props?.module, options: pageOptions });
                setImages(response?.data?.items);
                setLoading(false);
            } catch (error) {
                notify("error", 'Failed to fetch images:');
                setLoading(false);
            }
        };

        fetchImages();
    }, [props]);

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
                <div className="container mt-2">
                    <Carousel>
                        {images?.length > 0 ? (
                            images?.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100"
                                        src={image.file}
                                        alt={`Slide ${index}`}
                                    />
                                    <Carousel.Caption>
                                        <h3>{image?.member}</h3>
                                        <p>Upload Date Time: {getFormattedDate(image?.date)}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))) :
                            (
                                <p>No images have been uploaded yet.</p>
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
