import React, { Component} from 'react';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { Message, Icon } from 'semantic-ui-react';
import querySearch from 'stringquery';

import { newContact, saveContact, updateContact } from '../actions/contact-actions';
import ContactForm from '../components/contact-form/contact-form';


class ContactFormPage extends Component {

  state = {
    contact: {},
    success: false,
    error: false,
  }

  componentDidMount = () => {
    const contact = this.props.contact;
    const parseParams = querySearch(this.props.location.search);
    if(parseParams && parseParams.id){
      //this.props.fetchContact(contact.id);
      this.setState({
          contact: parseParams
      });
    } else {
      this.props.newContact();
    }
  }

  submit = (contact) => {
    if(!this.state.contact.id) {
      return this.props.saveContact(contact)
        .then(response => this.setState({ success:true }))
        .catch(err => {
           this.setState({
               error: true
           });
           throw new SubmissionError(this.props.errors)
         })
    } else {
      return this.props.updateContact(contact)
        .then(response => this.setState({ success:true }))
        .catch(err => {
            this.setState({
                error: true
            });
           throw new SubmissionError(this.props.errors)
         })
    }
  }

  showSuccess() {
    const useRedirect = false;
      const successMessage = (
          <Message icon info>
            <Icon name='circle notched' />
            <Message.Content>
              <Message.Header>Success</Message.Header>
                {!this.state.contact.id ?
                    <p>You've added new task</p> : <p>You've updated the task</p>}
            </Message.Content>
          </Message>
      )
     if(useRedirect) {
         return <Redirect to="/" />
     } else {
         return successMessage;
     }
  }

  showError() {
      const errroMessage = (
          <Message icon negative>
            <Icon name='circle notched' />
            <Message.Content>
              <Message.Header>Error</Message.Header>
                <p>Something when wrong, please check console, maybe CORS problem</p>
            </Message.Content>
          </Message>
      )
      if(this.state.error === true) {
          return errroMessage;
      }
      return <div></div>
  }

  render() {
    return (
      <div>
        {
          this.state.success ?
              this.showSuccess(): this.showError() }
          <ContactForm contact={this.state.contact} success={this.state.success} loading={this.props.loading} onSubmit={this.submit} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    contact: state.contactStore.contact,
    errors: state.contactStore.errors
  }
}

export default connect(mapStateToProps, {newContact, saveContact, updateContact})(ContactFormPage);
