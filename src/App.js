import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ContactListPage from './pages/contact-list-page';
import ContactFormPage from './pages/contact-form-page';
import Login from './components/login/login';

class App extends Component {
    render() {
      return (
          <Container>
            <div className="ui two item menu">
              <NavLink className="item" activeClassName="active" exact to="/">Tasks list</NavLink>
              <NavLink className="item" activeClassName="active" exact to="/contacts/new">Add Task</NavLink>
            </div>
            <Route exact path="/" component={ContactListPage}/>
            <Route path="/contacts/new" component={ContactFormPage}/>
            <Route path="/contacts/edit/" component={ContactFormPage}/>
            <Route path="/login" component={Login}/>
          </Container>
      );
   }
}

export default App;
