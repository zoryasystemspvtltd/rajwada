import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import api from '../../store/api-service';

const WorkTransfer = () => {
    const [departmentsData, setDepartmentsData] = useState([]);
    const [departmentId, setDepartmentId] = useState("");
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(false);

    const [person1Id, setPerson1Id] = useState("");
    const [person2Id, setPerson2Id] = useState("");

    const [leftItems, setLeftItems] = useState([]);
    const [rightItems, setRightItems] = useState([]);

    const [selectedLeft, setSelectedLeft] = useState([]);
    const [selectedRight, setSelectedRight] = useState([]);

    // prevents re-initialization loops
    const initializedPairRef = useRef("");

    /* ---------------- Department change ---------------- */
    useEffect(() => {
        api.getData({
            module: "department",
            options: { recordPerPage: 0 }
        }).then(res => {
            setDepartmentsData(res?.data?.items || []);
        });
    }, []);

    useEffect(() => {
        if (!departmentId) {
            setPeople([]);
            return;
        }

        api.getData({
            module: "user",
            options: {
                recordPerPage: 0,
                searchCondition: {
                    name: "department",
                    value: departmentId
                }
            }
        }).then(res => {
            setPeople(res?.data?.items || []);
        });

        // reset everything
        setPerson1Id("");
        setPerson2Id("");
        setLeftItems([]);
        setRightItems([]);
        setSelectedLeft([]);
        setSelectedRight([]);
        initializedPairRef.current = "";
    }, [departmentId]);


    /* ---------------- Person selection (SAFE) ---------------- */
    // useEffect(() => {
    //     if (!person1Id || !person2Id) return;


    //     const pairKey = `${person1Id}-${person2Id}`;
    //     if (initializedPairRef.current === pairKey) return;


    //     initializedPairRef.current = pairKey;


    //     const p1 = people.find(p => p.id === person1Id);
    //     const p2 = people.find(p => p.id === person2Id);


    //     setLeftItems(p1?.items ? [...p1.items] : []);
    //     setRightItems(p2?.items ? [...p2.items] : []);
    //     setSelectedLeft([]);
    //     setSelectedRight([]);
    // }, [person1Id, person2Id]); // ❗ NO `people` dependency

    const getSingleActivity = async (id) => {
        const item = await api.getSingleData({ module: 'activity', id: id });
        const activityData = {
            id: item.data.id,
            name: item.data.name,
            type: item.data.type
        };
        return activityData;
    }

    const prepareActivities = async (entityIds) => {
        let output = [];
        try {
            if (entityIds?.length > 0) {
                const updatePromises = entityIds.map(item => getSingleActivity(item?.entityId));
                output = await Promise.all(updatePromises);
            }
            return output;
        }
        catch (e) {
            console.log(e)
            return output;
        }
    };

    useEffect(() => {
        if (!person1Id) {
            setLeftItems([]);
            return;
        }

        const loadPerson1Items = async () => {
            try {
                const res = await api.getAssignedItemsByUserAndModule({ module: 'activity', member: people?.find(p => p?.id === parseInt(person1Id))?.email });
                const items = res?.data;
                const finalActivities = await prepareActivities(items);
                setLeftItems(finalActivities.filter(a => a.id !== undefined && a.type === 'Main Task') || []);
                setSelectedLeft([]);
            } catch (err) {
                console.error("Person1 load error:", err);
                setLeftItems([]);
            }
        };

        loadPerson1Items();

    }, [person1Id]);

    useEffect(() => {
        if (!person2Id) {
            setRightItems([]);
            return;
        }

        const loadPerson2Items = async () => {
            try {
                const res = await api.getAssignedItemsByUserAndModule({ module: 'activity', member: people?.find(p => p?.id === parseInt(person2Id))?.email });
                const items = res?.data;
                const finalActivities = await prepareActivities(items);
                setRightItems(finalActivities.filter(a => a.id !== undefined && a.type === 'Main Task') || []);
                setSelectedRight([]);
            } catch (err) {
                console.error("Person2 load error:", err);
                setRightItems([]);
            }
        };

        loadPerson2Items();

    }, [person2Id]);

    /* ---------------- Transfer logic ---------------- */
    const moveToRight = () => {
        setRightItems(prev => [...prev, ...selectedLeft]);
        setLeftItems(prev => prev.filter(i => !selectedLeft.includes(i)));
        setSelectedLeft([]);
    };

    const moveToLeft = () => {
        setLeftItems(prev => [...prev, ...selectedRight]);
        setRightItems(prev => prev.filter(i => !selectedRight.includes(i)));
        setSelectedRight([]);
    };

    /* ---------------- Final Assign ---------------- */
    const handleAssign = () => {
        const updatedPeople = people.map(p => {
            if (`${p.id}` === person1Id) return { ...p, items: leftItems };
            if (`${p.id}` === person2Id) return { ...p, items: rightItems };
            return p;
        });

        console.log("Final Assignment:", updatedPeople);
        alert("Items reassigned successfully");
    };

    const fetchPeopleData = () => {

    }

    return (
        <>
            <div className="app-page-title">
                <div className="page-title-heading text-uppercase">Work Transfer</div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="main-card">
                        {/* <h5 className="card-title">Data Explorer - {siteName}</h5> */}
                        <div className="card-body">
                            <div className="card no-shadow bg-transparent no-border rm-borders mb-2">
                                <div className="card">
                                    {/* Department */}
                                    <div className="row">
                                        <div className="col-md-12 col-lg-4 m-2">
                                            <Form.Group className="position-relative form-group">
                                                <Form.Label htmlFor="department">Department</Form.Label>
                                                <select
                                                    name="department"
                                                    className="form-control"
                                                    value={departmentId}
                                                    onChange={e => setDepartmentId(e.target.value)}
                                                >
                                                    <option value="">Select Department</option>
                                                    {departmentsData.map(d => (
                                                        <option key={d.id} value={d.id}>{d.name}</option>
                                                    ))}
                                                </select>
                                            </Form.Group>
                                        </div>
                                    </div>

                                    {/* People */}
                                    {
                                        (people.length > 0) &&
                                        <div className="row">
                                            <div className="col-md-12 col-lg-4 m-2">
                                                <Form.Group className="position-relative form-group">
                                                    <Form.Label htmlFor="person1">Person 1</Form.Label>
                                                    <select
                                                        name="person1"
                                                        className="form-control"
                                                        value={person1Id}
                                                        onChange={e => {
                                                            setPerson1Id(e.target.value);
                                                            initializedPairRef.current = "";
                                                        }}
                                                    >
                                                        <option value="">Select Person</option>
                                                        {people.map(p => (
                                                            <option key={p.id} value={p.id} disabled={`${p.id}` === person2Id}>
                                                                {p.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </Form.Group>
                                            </div>

                                            <div className="col-md-12 col-lg-4 m-2">
                                                <Form.Group className="position-relative form-group">
                                                    <Form.Label htmlFor="person2">Person 2</Form.Label>
                                                    <select
                                                        name="person2"
                                                        className="form-control"
                                                        value={person2Id}
                                                        onChange={e => {
                                                            setPerson2Id(e.target.value);
                                                            initializedPairRef.current = "";
                                                        }}
                                                    >
                                                        <option value="">Select Person</option>
                                                        {people.map(p => (
                                                            <option key={p.id} value={p.id} disabled={`${p.id}` === person1Id}>
                                                                {p.name}
                                                            </option>
                                                        ))}
                                                    </select>


                                                </Form.Group>
                                            </div>
                                        </div>
                                    }

                                    {/* Transfer */}
                                    {person1Id && person2Id && (
                                        <div className="container">
                                            <div className="row align-items-center mt-3">
                                                {/* LEFT CARD */}
                                                <div className="col">
                                                    <div className="card">
                                                        <div className="card-header d-flex justify-content-between align-items-center">
                                                            <strong>
                                                                {people.find(p => `${p.id}` === person1Id)?.name}
                                                            </strong>
                                                            <span className="badge bg-primary">{leftItems?.length}</span>
                                                        </div>

                                                        <div className="card-body p-0" style={{ maxHeight: 300, overflowY: "auto" }}>
                                                            <ul className="list-group list-group-flush">
                                                                {leftItems?.map(item => (
                                                                    <li
                                                                        key={item.id}
                                                                        className={`list-group-item ${selectedLeft.includes(item) ? "active" : ""
                                                                            }`}
                                                                        style={{ cursor: "pointer" }}
                                                                        onClick={() =>
                                                                            setSelectedLeft(prev =>
                                                                                prev.includes(item)
                                                                                    ? prev.filter(i => i !== item)
                                                                                    : [...prev, item]
                                                                            )
                                                                        }
                                                                    >
                                                                        {item.name}
                                                                    </li>
                                                                ))}

                                                                {!leftItems.length && (
                                                                    <li className="list-group-item text-muted text-center">
                                                                        No items
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* BUTTONS */}
                                                <div className="col-2 d-flex flex-column align-items-center gap-2">
                                                    <button
                                                        className="btn btn-outline-primary"
                                                        onClick={moveToRight}
                                                        disabled={!selectedLeft.length}
                                                    >
                                                        <i className="fa-solid fa-arrow-right"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-primary"
                                                        onClick={moveToLeft}
                                                        disabled={!selectedRight.length}
                                                    >
                                                        <i className="fa-solid fa-arrow-left"></i>
                                                    </button>
                                                </div>

                                                {/* RIGHT CARD */}
                                                <div className="col">
                                                    <div className="card">
                                                        <div className="card-header d-flex justify-content-between align-items-center">
                                                            <strong>
                                                                {people.find(p => `${p.id}` === person2Id)?.name}
                                                            </strong>
                                                            <span className="badge bg-success">{rightItems?.length}</span>
                                                        </div>


                                                        <div className="card-body p-0" style={{ maxHeight: 300, overflowY: "auto" }}>
                                                            <ul className="list-group list-group-flush">
                                                                {rightItems?.map(item => (
                                                                    <li
                                                                        key={item.id}
                                                                        className={`list-group-item ${selectedRight.includes(item) ? "active" : ""
                                                                            }`}
                                                                        style={{ cursor: "pointer" }}
                                                                        onClick={() =>
                                                                            setSelectedRight(prev =>
                                                                                prev.includes(item)
                                                                                    ? prev.filter(i => i !== item)
                                                                                    : [...prev, item]
                                                                            )
                                                                        }
                                                                    >
                                                                        {item.name}
                                                                    </li>
                                                                ))}


                                                                {!rightItems.length && (
                                                                    <li className="list-group-item text-muted text-center">
                                                                        No items
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Assign */}
                                    {person1Id && person2Id && (
                                        <div className="row justify-content-center my-2">
                                            <div className="col-auto">
                                                <Button
                                                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md"
                                                    onClick={handleAssign}
                                                >
                                                    Transfer
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default WorkTransfer;
