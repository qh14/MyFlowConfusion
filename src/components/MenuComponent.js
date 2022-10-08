import React, { Component } from 'react';
// import { Media } from 'reactstrap';
// CardText, CardBody,
import {
    Card, CardImg, CardImgOverlay, CardTitle
} from 'reactstrap';
// import DishDetail from './DishdetailComponents';
class Menu extends Component {

    constructor(props) {
        console.log("Khoi tao Menu");
        super(props);

        this.state = {
            selectedDish: null
        }

    }
    onDishSelect(dish) {
        this.setState({ selectedDish: dish });
    }

    render() {
        console.log('renders menu ');
        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card key={dish.id} onClick={() => this.props.onClick(dish.id)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }
}



export default Menu;
