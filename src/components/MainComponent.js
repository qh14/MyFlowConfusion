import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponents';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent'
import Contact from './ContactComponent';
import Contact1 from './CommentFormComponent';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import About from './AboutComponents.js'
import { addComment } from "../redux/ActionCreators";
import { fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form'


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders

    }
}
const mapDispatchToProps = dispatch => ({

    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => {
        dispatch(fetchDishes())
    },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) }
});


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };

    }
    componentDidMount() {
        this.props.fetchDishes();
    }
    onDishSelected(dishID) {
        this.setState({ selectedDish: dishID })
    }
    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const DishWithId = ({ match }) => {
            return (
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    addComment={this.props.addComment}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                />
            );
        };



        return (
            <div>
                <Header />

                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
                    <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />                    <Route path='/menu/:dishId' component={DishWithId} />
                    <Route exact path='/aboutus' component={() => <About leaders={this.state.leaders} />} />
                    <Route exact path='/contactus1' component={Contact1} />
                    <Redirect to="/home" />
                </Switch>

                <Footer />
            </div>

        );

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));