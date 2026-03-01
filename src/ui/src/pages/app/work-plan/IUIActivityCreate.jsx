import { useState } from "react";
import IUIInsideActivityCreate from "./IUIInsideActivityCreate";
import IUIOutsideActivityCreate from "./IUIOutsideActivityCreate";

const IUIActivityCreate = (props) => {
    const [type, setType] = useState("inside");
    const [display, setDisplay] = useState(true);

    const handleLocationChange = (selectedValue) => {
        setDisplay(selectedValue);
    };

    return (
        <>
            <div className={!display ? "d-none" : ""}>
                <div className="app-page-title">
                    <div className="page-title-heading"> {props?.setupSchema?.title}</div>
                </div>
                <div>
                    <div className="card shadow-sm p-2">
                        <div className="d-flex flex-column flex-md-row gap-3">
                            <strong className="mb-0">Select Type:</strong>
                            <div className="d-flex gap-3">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="type"
                                        id="inside"
                                        value="inside"
                                        checked={type === "inside"}
                                        onChange={(e) => setType(e.target.value)}
                                    />
                                    <label className="form-check-label" htmlFor="inside">
                                        Inside
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="type"
                                        id="outside"
                                        value="outside"
                                        checked={type === "outside"}
                                        onChange={(e) => setType(e.target.value)}
                                    />
                                    <label className="form-check-label" htmlFor="outside">
                                        Outside
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Conditional Rendering */}
            <div className="mt-2">
                {type === "inside" ?
                    <IUIInsideActivityCreate setupSchema={props?.setupSchema} creationSchema={props?.insideCreationSchema} onProceed={handleLocationChange} /> :
                    <IUIOutsideActivityCreate setupSchema={props?.setupSchema} creationSchema={props?.outsideCreationSchema} onProceed={handleLocationChange} />
                }
            </div>
        </>
    );
}

export default IUIActivityCreate;