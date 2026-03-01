import { useState } from "react";
import IUIInsideActivityCreate from "./IUIInsideActivityCreate";
import IUIOutsideActivityCreate from "./IUIOutsideActivityCreate";

const IUIActivityCreate = (props) => {
    const [type, setType] = useState("inside");

    return (
        <div className="container mt-4">
            <div className="card shadow-sm p-3">
                <h4 className="mb-3 text-center">Select Work Type</h4>

                {/* Radio Buttons */}
                <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mb-4">
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

                {/* Conditional Rendering */}
                <div>
                    {type === "inside" ?
                        <IUIInsideActivityCreate setupSchema={props?.setupSchema} creationSchema={props?.creationSchema} /> :
                        <IUIOutsideActivityCreate setupSchema={props?.setupSchema} creationSchema={props?.creationSchema} />
                    }
                </div>
            </div>
        </div>
    );
}

export default IUIActivityCreate;