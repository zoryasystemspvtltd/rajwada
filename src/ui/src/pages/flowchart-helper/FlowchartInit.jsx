import React from "react";
import ReactFlowProviderContent from "./ReactFlowProviderContent";

const FlowchartInit = (props) => {
    const schema = props?.schema;

    return (
        <div className="tab-content">
            <div className="tabs-animation" style={{ borderRadius: "200px" }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="main-card card">
                            <div className="card-body">
                                <ReactFlowProviderContent />
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
