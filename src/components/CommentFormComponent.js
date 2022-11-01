import React, { Component } from 'react';
import { useState } from 'react';
import {
    Button, Modal, ModalBody, ModalHeader, Label, Row, Col
} from "reactstrap";

import { Control, LocalForm, Errors } from 'react-redux-form';


//// validators
const required = (val) => val && val.length; //value > 0
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

function FormComment(props) {
    const [isModalCommentOpen, toggleModalForm] = useState(false)

    const handleFormSubmit = comment => {
        console.log("Current State : " + JSON.stringify(comment));
        // alert("Current State : " + JSON.stringify(comment))
        props.addComment(props.dishId, comment.rating, comment.author, comment.comment);
    };

    return (
        <React.Fragment>
            <Button outline onClick={() => toggleModalForm(!isModalCommentOpen)}>
                <span className='fa fa-comments fa-lg'></span>Submit Comment
            </Button>
            <Modal isOpen={isModalCommentOpen} toggle={() => toggleModalForm(!isModalCommentOpen)}>
                <ModalHeader toggle={() => toggleModalForm(!isModalCommentOpen)}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={comment => handleFormSubmit(comment)}>
                        <Row>
                            <Label htmlFor="rating" md={12}>Rating</Label>
                            <Col md={12}>
                                <Control.select model=".rating"
                                    name='rating'
                                    className='form-control'
                                    validators={{ required }} >
                                    <option>Please Select</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>

                                </Control.select>
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Label htmlFor="author" md={12}> Your Name </Label>
                            <Col md={12}>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="First Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                        </Row>





                        <Row className="form-group">
                            <Label htmlFor="comment" md={12}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Col>

                        </Row>


                        <Row className="form-group">
                            <Col>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}

export default FormComment;