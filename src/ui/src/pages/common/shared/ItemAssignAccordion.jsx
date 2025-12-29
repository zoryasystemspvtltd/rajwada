import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import api from "../../../store/api-service";

/**
 * Props:
 *  value?: {
 *    department?: string | number,
 *    people?: [],
 *    notifyDuration?: number
 *  }
 *  onChange: (assignObj) => void
 */

const EMPTY_ASSIGN = {
    department: "",
    people: [],
    notifyDuration: 0
};

const ItemAssignAccordion = ({ value = EMPTY_ASSIGN, onChange }) => {
    const [departments, setDepartments] = useState([]);
    const [people, setPeople] = useState([]);

    const department = value.department ?? "";
    const selectedPeople = value.people ?? [];
    const notifyDuration = value.notifyDuration ?? 0;

    /* 🔹 Load departments once */
    useEffect(() => {
        let mounted = true;

        api.getData({
            module: "department",
            options: { recordPerPage: 0 }
        }).then(res => {
            if (mounted) {
                setDepartments(res?.data?.items || []);
            }
        });

        return () => { mounted = false; };
    }, []);

    /* 🔹 Load people when department changes */
    useEffect(() => {
        let mounted = true;

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
            if (mounted) {
                setPeople(res?.data?.items || []);
            }
        });

        return () => { mounted = false; };
    }, [department]);

    /* 🔹 Handlers */

    const handleDepartmentChange = (deptId) => {
        onChange({
            ...EMPTY_ASSIGN,
            department: deptId
        });
    };

    const handleNotifyChange = (val) => {
        onChange({
            ...value,
            notifyDuration: val
        });
    };

    const togglePerson = (person) => {
        const updatedPeople = selectedPeople.some(p => p.id === person.id)
            ? selectedPeople.filter(p => p.id !== person.id)
            : [...selectedPeople, person];

        const filteredPeople = updatedPeople?.map(p => ({member: p?.member, id: p?.id}));

        onChange({
            ...value,
            people: filteredPeople
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
                        onChange={(e) => handleDepartmentChange(e.target.value)}
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
                        min={0}
                        value={notifyDuration}
                        onChange={(e) =>
                            handleNotifyChange(parseInt(e.target.value, 10) || 0)
                        }
                    />
                </Col>
            </Row>

            {people.length > 0 && (
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
            )}
        </div>
    );
};

export default ItemAssignAccordion;
