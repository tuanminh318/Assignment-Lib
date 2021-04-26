import React, {Component} from 'react';
import MenuTop from "./components/navbar";
import {Container} from "@material-ui/core";
import { Route } from 'react-router';
import ListBook from "./components/pages/ListBook";
import ListCategory from "./components/pages/ListCategory";
import AddProduct from "./components/pages/AddProduct";
import AddCategory from "./components/pages/AddCategory";
import EditProduct from "./components/pages/EditCategory";
import EditBook from "./components/pages/EditBook";
import Home from "./components/pages/Home"

class App extends Component {
    render() {
        return (
            <React.Fragment>
              <MenuTop/>
                <Container maxWidth="md">
                    <Route exact path='/' component={Home}/>
                    <Route path='/book' component={ListBook} />
                    <Route path='/add-books' component={AddProduct} />
                    <Route path='/add-category' component={AddCategory} />
                    <Route path='/edit/category/:id' component={EditProduct} />
                    <Route path='/edit/book/:id' component={EditBook} />
                    <Route path='/category' component={ListCategory} />
                </Container>

            </React.Fragment>
        );
    }
}

export default App;