import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import api from '../../../store/api-service';
import { notify } from "../../../store/notification";
import { getFormattedDateTime } from "../../../store/datetime-formatter";

const CommentsModal = ({ show, onClose, activityId }) => {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [privileges, setPrivileges] = useState({});

    const loggedInUser = useSelector((state) => state.api.loggedInUser);

    useEffect(() => {
        const commentPrivileges = loggedInUser?.privileges
            ?.filter(p => p.module === "comment")
            ?.map(p => p.name);

        const imagePrivileges = loggedInUser?.privileges?.filter(p => p.module === "attachment")?.map(p => p.name);

        let access = {};

        commentPrivileges?.forEach(p => {
            access["comment"] = { ...access["comment"], [p]: true }
        });

        imagePrivileges.forEach(p => {
            access["image"] = { ...access["image"], ...{ [p]: true } }
        })

        setPrivileges(access);
    }, [loggedInUser]);


    useEffect(() => {
        if (show && activityId) {
            fetchComments(activityId);
        }
    }, [show, activityId]);


    const fetchComments = async (selectedId) => {
        try {

            const baseFilter = {
                name: 'activityId',
                value: parseInt(selectedId),
            };

            const pageOptions = {
                recordPerPage: 0,
                searchCondition: baseFilter
            };

            const response = await api.getData({
                module: 'comment',
                options: pageOptions
            });

            let tempComments = response?.data?.items || [];

            const sortedComments = tempComments.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );

            setComments(sortedComments);

        } catch (error) {
            notify("error", "Failed to fetch comments!");
        }
    };

    const handleCommentSubmit = async () => {

        if (!newComment.trim()) return;

        const commentData = {
            activityId: activityId,
            remarks: newComment,
            date: new Date(),
        };

        try {

            const response = await api.addData({
                module: 'comment',
                data: commentData
            });

            if (response.status === 200) {
                setNewComment('');
                fetchComments(activityId);
            }

        } catch (error) {
            console.error("Error saving comment:", error);
        }
    };

    const closeModal = () => {
        setNewComment('');
        setComments([]);
        onClose();
    };

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleImageUpload = async (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {

            // Convert image to Base64
            const base64Image = await convertImageToBase64(file);

            // Save photo
            const photoData = {
                parentId: activityId,
                module: 'activity',
                file: base64Image,
            };

            try {
                const response = await api.addData({ module: 'attachment', data: photoData });
                if (response.status === 200) {
                    notify("success", 'Photo saved successfully!');
                } else {
                    notify("error", 'Failed to save photo!');
                }
            } catch (error) {
                console.error('Error saving photo:', error);
            }

        } else {
            notify("error", 'Please upload a valid image file!');
        }
    };


    return (
        <Modal show={show} onHide={closeModal}>
            <Modal.Header>
                <Modal.Title>Task Comments</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ color: "black", maxHeight: '60vh', overflowY: 'auto' }}>

                <div className="comments-section">

                    {comments?.length > 0 ? (

                        comments.map((comment, index) => (

                            <div
                                key={index}
                                className={`d-flex ${comment.member === loggedInUser?.email
                                    ? 'justify-content-end'
                                    : 'justify-content-start'} mb-2`}>

                                <div
                                    className={`p-2 ${comment.member === loggedInUser?.email
                                        ? 'bg-light'
                                        : 'bg-secondary text-white'} rounded-4`}
                                    style={{ maxWidth: '70%' }}>

                                    <div
                                        style={{ fontWeight: 'bold', fontSize: '0.60rem' }}>
                                        {comment?.member}
                                    </div>

                                    <div className="text-break">
                                        {comment?.remarks}
                                    </div>

                                    <div style={{ fontSize: '0.60rem' }}>
                                        {getFormattedDateTime(new Date(comment?.date))}
                                    </div>

                                </div>
                            </div>

                        ))

                    ) : (
                        <p>No comments yet.</p>
                    )}

                </div>

                <div className="d-flex">
                    <Form.Group className="position-relative form-group flex-grow-1 mr-2">

                        <Form.Label>New Comment</Form.Label>

                        <Form.Control
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Type your comment here..."
                        />

                    </Form.Group>
                </div>

            </Modal.Body>

            <Modal.Footer>
                <Button
                    className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary mr-2'
                    onClick={closeModal}>
                    Close
                </Button>

                {privileges?.comment?.add && (

                    <Button
                        className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary'
                        onClick={handleCommentSubmit}>
                        Post Comment
                    </Button>

                )}

                {
                    privileges?.image?.add && (
                        <Button
                            variant="contained"
                            className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary'
                            onClick={() => document.getElementById('upload-photo-btn').click()}
                        >
                            <input id='upload-photo-btn'
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                            Upload Photo
                        </Button>
                    )
                }
            </Modal.Footer>

        </Modal>
    );
};

export default CommentsModal;