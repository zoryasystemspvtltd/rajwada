import React from 'react';
import paramImages from "../ParameterImages";

const IUITrackBox = (props) => {
    const schema = props?.schema;
    const text = schema?.text;
    const imageIcon = schema?.imageIcon;
    const arrowDirection = schema?.arrowDirection;
    const arrowColor = schema?.arrowColor;
    const progress = schema?.progress;
    const cardColor = schema?.cardColor;

    return (
        <div className="container mt-3">
            <div className="card" style={{ width: '15rem', backgroundColor: cardColor }}>
                <div className="card-body">
                    {/* Group for image, text, and arrow */}
                    <div className="card-image mb-3 d-flex align-items-center">
                        <img
                            src={paramImages[imageIcon]}
                            alt="placeholder"
                            className="img-fluid"
                            style={{ maxWidth: '40px' }}
                        />
                        <h5 className="d-inline-block ml-2" style={{ textTransform: "uppercase", fontWeight: "700", fontSize: ".85rem" }}>{text}</h5>
                        {
                            (arrowDirection && arrowDirection === "up") ?
                                <i className={`${text}`.length <= 13 ? "fa-solid fa-up-long ml-5" : "fa-solid fa-up-long ml-4"} style={{ fontSize: '24px', color: arrowColor }}></i> : null
                        }
                        {
                            (arrowDirection && arrowDirection === "down") ?
                                <i className={`${text}`.length <= 13 ? "fa-solid fa-down-long ml-5" : "fa-solid fa-up-long ml-4"} style={{ fontSize: '24px', color: arrowColor }}></i> : null
                        }
                    </div>

                    {/* Progress bar at the bottom */}
                    {
                        (progress !== null && progress >= 0) ? (
                            <div className="progress mt-3">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${progress}%`, backgroundColor: "#11823b" }}
                                    aria-valuenow={progress}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    {`${progress}%`}
                                </div>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
    );
};

export default IUITrackBox;
