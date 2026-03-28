import React, { useEffect, useState } from "react";
import { Button, Col, Row, Card, Modal, Spinner, ListGroup, Alert } from "react-bootstrap";
import api from '../../store/api-service';
import deleteDependency from '../../store/delete-dependencies';

export default function IUIDeleteModal({ item, onConfirm, onCancel }) {
    const [itemData, setItemData] = useState({});
    const [loading, setLoading] = useState(true);
    const [dependencyData, setDependencyData] = useState([]);

    useEffect(() => {
        fetchDependencies();
    }, []);

    const fetchDependencies = async () => {

        try {
            const parentModule = item.module;
            const id = item.id;

            const parentItem = await api.getSingleData({ module: parentModule, id: id });
            const parentData = parentItem.data;
            setItemData(parentData);

            let dependencies = [];

            if (parentModule === "plan") {
                let itemType = `${parentData?.type}`.toLowerCase();
                dependencies = deleteDependency[parentModule][itemType]?.dependent || [];
            }
            else {
                dependencies = deleteDependency[parentModule]?.dependent || [];
            }

            const results = await Promise.all(
                dependencies.map(async (dep) => {

                    const pageOptions = {
                        recordPerPage: 0,
                        searchCondition: {
                            name: dep.field,
                            value: parseInt(id)
                        }
                    }

                    const response = await api.getData({ module: dep.module, options: pageOptions });

                    return {
                        module: dep.module,
                        data: response?.data?.items || []
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
        <Modal
            show={true}
            onHide={onCancel}
            size="lg"
            centered
            scrollable
        >
            {/* Header */}
            <Modal.Header closeButton>
                <Modal.Title>
                    Delete Item: {itemData?.name}
                </Modal.Title>
            </Modal.Header>

            {/* Body */}
            <Modal.Body>
                {loading ? (

                    <div className="text-center py-4">
                        <Spinner animation="border" variant="primary" />
                        <div className="mt-2">Loading dependencies...</div>
                    </div>

                ) : (
                    <>
                        <h6 className="mb-3 fw-semibold">
                            Related Records
                        </h6>

                        <Row className="g-3">
                            {(dependencyData.length === 0) && (
                                <div className="text-muted p-3">
                                    No dependencies
                                </div>
                            )}
                            {dependencyData.map((dep, index) => (
                                <Col xs={12} md={6} key={index}>
                                    <Card className="h-100 shadow-sm">
                                        <Card.Header className="fw-bold bg-light">
                                            {dep.module}
                                        </Card.Header>

                                        <Card.Body className="p-0">

                                            {dep.data.length === 0 ? (

                                                <div className="text-muted p-3">
                                                    No dependencies
                                                </div>

                                            ) : (

                                                <ListGroup variant="flush">

                                                    {dep.data.map((d) => (

                                                        <ListGroup.Item key={d.id}>
                                                            {d.name || d.id}
                                                        </ListGroup.Item>

                                                    ))}

                                                </ListGroup>
                                            )}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        <Alert variant="warning" className="mt-4 mb-0">
                            Are you sure you want to delete this item?
                        </Alert>
                    </>
                )}
            </Modal.Body>

            {/* Footer */}
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={onCancel}
                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary btn-md"
                >
                    Cancel
                </Button>
                <Button
                    variant="danger"
                    onClick={(e) => onConfirm(e, itemData.id)}
                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-danger btn-md"
                >
                    Yes Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
