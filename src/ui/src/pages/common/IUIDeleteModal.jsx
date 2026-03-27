import React, { useEffect, useState } from "react";

export default function IUIDeleteModal({ item, dependencies, onConfirm, onCancel }) {

    const [loading, setLoading] = useState(true);
    const [dependencyData, setDependencyData] = useState([]);

    useEffect(() => {
        fetchDependencies();
    }, []);

    const fetchDependencies = async () => {

        try {

            const results = await Promise.all(
                dependencies.map(async (dep) => {

                    const response = await fetch(
                        `/api/${dep.module}?${dep.field}=${item.id}`
                    );

                    const data = await response.json();

                    return {
                        module: dep.module,
                        data: data
                    };

                })
            );

            setDependencyData(results);
            setLoading(false);

        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (

        <div className="modal fade show d-block" tabIndex="-1">

            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">

                <div className="modal-content">

                    {/* Header */}
                    <div className="modal-header">

                        <h5 className="modal-title">
                            Delete Item: {item?.name}
                        </h5>

                        <button
                            className="btn-close"
                            onClick={onCancel}
                        ></button>

                    </div>

                    {/* Body */}
                    <div className="modal-body">

                        {loading ? (
                            <div className="text-center p-4">

                                <div className="spinner-border text-primary"></div>

                                <p className="mt-2">Loading dependencies...</p>

                            </div>
                        ) : (

                            <>
                                <h6 className="mb-3">Related Records</h6>

                                <div className="row">

                                    {dependencyData.map((dep, index) => (

                                        <div className="col-12 col-md-6 mb-3" key={index}>

                                            <div className="card h-100">

                                                <div className="card-header fw-bold">
                                                    {dep.module}
                                                </div>

                                                <div className="card-body">

                                                    {dep.data.length === 0 ? (
                                                        <p className="text-muted mb-0">
                                                            No dependencies
                                                        </p>
                                                    ) : (

                                                        <ul className="list-group list-group-flush">

                                                            {dep.data.map(d => (

                                                                <li
                                                                    key={d.id}
                                                                    className="list-group-item"
                                                                >
                                                                    {d.name || d.id}
                                                                </li>

                                                            ))}

                                                        </ul>

                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                                <div className="alert alert-warning mt-3">
                                    Are you sure you want to delete this item?
                                </div>

                            </>
                        )}

                    </div>

                    {/* Footer */}
                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={() => onConfirm(item.id)}
                        >
                            Yes Delete
                        </button>

                    </div>

                </div>

            </div>

            {/* Background Overlay */}
            <div className="modal-backdrop fade show"></div>

        </div>

    );
}