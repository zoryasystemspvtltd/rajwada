// components/MyModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import IUILookUp from "../common/shared/IUILookUp";

const ModalComponent = ({ title, show, handleClose, formFields, value, handleSubmit }) => {
    const [formData, setFormData] = useState({ color: '#000000' });
    const [errors, setErrors] = useState({});
    const [dirty, setDirty] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    useEffect(() => {
        if (value) {
            setFormData(value);
            setIsFormSubmitted(true);
        }
    }, [value]);

    useEffect(() => {
        if (dirty) {
            const error = validate(formData, formFields)
            setErrors(error);
        }
        else {
            setIsFormSubmitted(false);
        }
    }, [formData, dirty, formFields]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setDirty(true);
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const validate = (values, fields) => {
        let errors = {};

        for (let i = 0; i < fields?.length; i++) {
            let item = fields[i];

            if (item.required && !values) {
                errors[item.field] = `Required field.`;
            }
            if (item.required && values && !values[item?.field]) {
                errors[item.field] = `Required field.`;
            }
        }
        return errors;
    };

    const onSave = () => {
        const error = validate(formData, formFields)
        setErrors(error);
        if (Object.keys(error).length === 0) {
            handleSubmit(formData);
            setIsFormSubmitted(true);
            setFormData({ color: '#000000' });
            setErrors({});
            setDirty(false);
            handleClose();
        }
    };

    const handleModalClose = () => {
        if (!isFormSubmitted && !value) {
            return;
        }
        handleClose();
    };

    return (
        <Modal size="md" show={show} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {formFields.map((field) => {
                        if (field.type === 'text') {
                            return (
                                <div key={field.field}>
                                    <Form.Group className="position-relative form-group">
                                        <Form.Label>{field.text}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            field={field.field}
                                            id={field.field}
                                            className={dirty[field.field] ? (errors[field.field] ? "is-invalid" : "is-valid") : ""}
                                            value={formData[field.field] || ''}
                                            onChange={handleInputChange}
                                            placeholder={field.placeholder}
                                        />
                                    </Form.Group>
                                    <p className="text-danger">{errors[field.field]}</p>
                                </div>
                            );
                        }
                        if (field.type === 'lookup') {
                            return (
                                <div key={field.field}>
                                    <Form.Group className="position-relative form-group">
                                        <Form.Label htmlFor={field.field} >{field.text}
                                            {field.required &&
                                                <span className="text-danger">*</span>
                                            }
                                        </Form.Label>
                                        <IUILookUp
                                            value={formData[field.field]}
                                            id={field.field}
                                            nameField={field?.nameField}
                                            className={dirty[field.field] ? (errors[field.field] ? "is-invalid" : "is-valid") : ""}
                                            schema={field.schema}
                                            onChange={handleInputChange}
                                            readonly={field.readonly || false}
                                        />

                                    </Form.Group>
                                    <p className="text-danger">{errors[field.field]}</p>
                                </div>
                            );
                        }
                        if (field.type === 'color') {
                            return (
                                <div key={field.field}>
                                    <Form.Group className="position-relative form-group">
                                        <Form.Label>{field.text}</Form.Label>
                                        <Form.Control
                                            type="color"
                                            field={field.field}
                                            id={field.field}
                                            className={dirty[field.field] ? (errors[field.field] ? "is-invalid" : "is-valid") : ""}
                                            value={formData[field.field] || '#000000'}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <p className="text-danger">{errors[field.field]}</p>
                                </div>
                            );
                        }
                        return null;
                    })}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="contained"
                    className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary'
                    onClick={() => { setErrors({}); setFormData({ color: '#000000' }); setDirty(false); handleModalClose(); }}
                    disabled={!isFormSubmitted && value === null}
                >
                    Close
                </Button>
                <Button
                    variant="contained"
                    className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary'
                    onClick={onSave}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalComponent;