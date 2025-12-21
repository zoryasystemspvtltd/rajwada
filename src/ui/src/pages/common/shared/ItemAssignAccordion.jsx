import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Form } from "react-bootstrap";
import api from '../../../store/api-service';

/**
 * Props:
 *  value?: {
 *    people: [],
 *    notifyDuration: number
 *  }
 *  onChange: (assignObj) => void
 */

const ItemAssignAccordion = ({ value, onChange }) => {
    const [departments, setDepartments] = useState([]);
    const [people, setPeople] = useState([]);

    const department = value?.department || "";
    const selectedPeople = value?.people || [];
    const notifyDuration = value?.notifyDuration || 0;

    /* Load departments once */
    useEffect(() => {
        api.getData({
            module: "department",
            options: { recordPerPage: 0 }
        }).then(res => {
            setDepartments(res?.data?.items || []);
        });
    }, []);

    /* Load people when department changes */
    useEffect(() => {
        if (!department) {
            setPeople([]);
            return;
        }

        api.getData({
            module: "user",
            options: {
                recordPerPage: 0,
                searchCondition: {
                    name: "department",
                    value: department
                }
            }
        }).then(res => {
            setPeople(res?.data?.items || []);
        });
    }, [department]);

    const togglePerson = (person) => {
        const updated = selectedPeople.some(p => p.id === person.id)
            ? selectedPeople.filter(p => p.id !== person.id)
            : [...selectedPeople, person];

        onChange({
            ...value,
            people: updated
        });
    };

    return (
        <div className="p-3 border rounded bg-light">
            <Row>
                <Col md={4}>
                    <Form.Label>Department</Form.Label>
                    <select
                        className="form-control"
                        value={department}
                        onChange={(e) =>
                            onChange({
                                ...value,
                                department: e.target.value,
                                people: []
                            })
                        }
                    >
                        <option value="">Select Department</option>
                        {departments.map(d => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </Col>

                <Col md={4}>
                    <Form.Label>Notify before (days)</Form.Label>
                    <Form.Control
                        type="number"
                        value={notifyDuration}
                        min={0}
                        onChange={(e) =>
                            onChange({
                                ...value,
                                notifyDuration: parseInt(e.target.value) || 0
                            })
                        }
                    />
                </Col>
            </Row>

            <Row className="mt-3">
                <Col>
                    {people.map(p => (
                        <Form.Check
                            key={p.id}
                            label={p.name}
                            checked={selectedPeople.some(sp => sp.id === p.id)}
                            onChange={() => togglePerson(p)}
                        />
                    ))}
                </Col>
            </Row>
        </div>
    );
};

export default ItemAssignAccordion;

