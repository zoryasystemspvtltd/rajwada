
import { Carousel } from 'react-bootstrap';
import rajwadaAerial from '../../assets/images/login-bg/1.png';
import rajwadaGrand from '../../assets/images/login-bg/2.png';
import rajwadaAltitude from '../../assets/images/login-bg/3.png';
import rajwadaGlobal from '../../assets/images/login-bg/4.png';
import rajwadaCity from '../../assets/images/login-bg/5.png';

const ICarousel = () => {
    return (
        <Carousel fade indicators={false} controls={false}>
            <Carousel.Item>
                <img
                    className="d-block w-100 carousel-image"
                    src={rajwadaAerial}
                    alt="Rajwada"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 carousel-image"
                    src={rajwadaGrand}
                    alt="Rajwada"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 carousel-image"
                    src={rajwadaAltitude}
                    alt="Rajwada"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 carousel-image"
                    src={rajwadaGlobal}
                    alt="Rajwada"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 carousel-image"
                    src={rajwadaCity}
                    alt="Rajwada"
                />
            </Carousel.Item>
        </Carousel>
    );
};

export default ICarousel;
