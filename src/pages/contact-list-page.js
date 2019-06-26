import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { bake_cookie, read_cookie } from 'sfcookies';
import ContactListError from '../components/contact-list/contact-list-error';
import { fetchContacts } from '../actions/contact-actions';
import { NavLink, Route } from 'react-router-dom';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import '../components/contact-list/contact-list.scss';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import getPaginationOptions from '../components/contact-list/contact-list-pagination';

class ContactListPage extends Component {

  state = {
      redirect: false,
      selectedRow: null,
      isAuth: false
  }

  componentDidMount() {
    this.props.fetchContacts();
    const auth = read_cookie('authorized');
    if(auth === true){
        this.setState({isAuth: true});
    }
  }

  renderRedirect() {
     if (this.state.redirect) {
        return <Redirect to={"/contacts/edit?id=" + this.state.selectedRow.id
        +"&username="+this.state.selectedRow.username
        +"&email="+this.state.selectedRow.email
        +"&text="+this.state.selectedRow.text
        +'&status='+this.state.selectedRow.status
        } />
     }
   }

   showTable() {
       const contacts = this.props.contacts;
       const selectRow = {
           mode: 'checkbox',
           clickToSelect: true,
           clickToEdit: false,
           onSelect: (row, isSelect, rowIndex, e) => {
               if (this.state.isAuth) {
                   this.setState({
                       selectedRow: row,
                       redirect: true
                   })
               }
           }
       };

       const columns = [{
           dataField: 'id',
           text: 'Product ID'
       }, {
           dataField: 'username',
           text: 'Username',
           filter: textFilter(),
           sort: true,
       }, {
           dataField: 'email',
           text: 'Email',
           sort: true
       }, {
           dataField: 'text',
           text: 'Task',
       }];
       const paginationOptions = getPaginationOptions(contacts);

       return (
           <div>
               <BootstrapTable keyField='id'
                               data={ contacts }
                               columns={ columns }
                               headerClasses={'header-class'}
                               filter={ filterFactory() }
                               selectRow={ selectRow }
                               pagination={ paginationFactory(paginationOptions) }
               />
           </div>
       )
   }

   showLogin() {
      if (this.state.isAuth) {
          return (<div></div>);
      } else {
          return (
            <div className="login-link">
              <NavLink className="item" activeClassName="active" exact to="/login">Login</NavLink>
           </div>);
      }
   }

   //  <Login />
   render() {
      if (this.props.contacts.length > 0) {
          return (
              <div>
               {this.showLogin()}
               {this.renderRedirect()}
               {this.showTable()}
              </div>
         );
      }
      else {
         return(<ContactListError contacts={this.props.contacts}
                       loading={this.props.loading}
                       errors={this.props.errors}
          />);
      }
   }

}

// Make contacts  array available in  props
function mapStateToProps(state) {
  return {
      contacts : state.contactStore.contacts,
      loading: state.contactStore.loading,
      errors: state.contactStore.errors
  }
}

export default connect(mapStateToProps, {fetchContacts})(ContactListPage);
