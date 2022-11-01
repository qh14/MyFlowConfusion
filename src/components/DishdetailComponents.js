import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
// CardImgOverlay,

import { Link } from 'react-router-dom';
import CommentFormComponent from './CommentFormComponent'
import { Loading } from './LoadingComponent'
function RenderDish({ dish }) {
    return (
        <div className="col-12">
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({ comments, addComment, dishId }) {
    if (comments != null) {
        return (
            <div className="col-12">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {Array.isArray(comments) ? comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        );
                    }) : (<h1>{comments}</h1>)}
                </ul>
                <CommentFormComponent dishId={dishId} addComment={addComment} />
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}
function RenderDetail(props) {
    if (props.isLoading) {
        return (
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        )
    } else if (props.errMess) {
        return (
            <div className='container'>
                <div className='row'>
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    } else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5">
                        <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id} />

                    </div>
                </div>
            </div>
        );
    }
}

export default RenderDetail;

