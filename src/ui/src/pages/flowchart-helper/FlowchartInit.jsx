import React, { useState, useEffect } from 'react';
import ReactFlowProviderContent from "./ReactFlowProviderContent";

const FlowchartInit = (props) => {
    const readonly = props?.readonly || false;
    const [value, setValue] = useState("");

    useEffect(() => {
        if (props?.value) {
            setValue(props?.value);
        }
    }, [props?.value]);

    return (
        <div className="tab-content">
            <div className="tabs-animation" style={{ borderRadius: "200px" }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="main-card card">
                            <div className="card-body">
                                <ReactFlowProviderContent readonly={readonly} value={value} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* NavBar */}
        </div>
    );
};

export default FlowchartInit;
