import React, { Component } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';

const validate = (values) => {
  const errors = {};
  if(!values.username) {
    errors.username = {
      message: 'You need to provide First Name'
    }
  }
  if(!values.email) {
    errors.email = {
      message: 'You need to provide an Email address'
    }
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = {
      message: 'Invalid email address'
    }
  }
  if(!values.text || values.text.length <= 0) {
    errors.text = {
      message: 'You need to provide a Text'
    }
  }
  return errors;
}

class ContactForm extends Component {

  componentWillReceiveProps = (nextProps) => { // Load Contact Asynchronously
    const { contact } = nextProps;
    if(contact.id !== this.props.contact.id) { // Initialize form only once
      this.props.initialize(contact);
    }
  }

  resetFields() {
      const reset = {
          username: '',
          email: '',
          text: ''
      }
      this.props.initialize(reset);
  }

  renderField = ({ input, label, type, isReadOnly, meta: { touched, error } }) => (
      <Form.Field className={classnames({error:touched && error})}>
        <label>{label}</label>
        <input {...input} placeholder={label} type={type} readOnly={isReadOnly} />
          {touched && error && <span className="error">{error.message}</span>}
      </Form.Field>
  )

  render() {
    const { handleSubmit, pristine, success, submitting, loading, contact } = this.props;
    if (success) {
        this.resetFields();
    }
    const isEdit = !!contact.id;
      return (
      <Grid centered columns={2}>
        <Grid.Column>
          <h1 style={{marginTop:"1em"}}>{isEdit ? 'Edit Task' : 'Add New Task'}</h1>
          <Form onSubmit={handleSubmit} loading={loading}>
             <Field name="username" type="text" component={this.renderField} isReadOnly={isEdit} label="Username"/>
             <Field name="email" type="text" component={this.renderField} isReadOnly={isEdit} label="Email"/>
			 <Field name="text" type="text" component={this.renderField} label="Text"/>
             { isEdit ? <Field name="status" type="text" component={this.renderField} label="Status"/> : <div></div> }
            <Button primary type='submit' disabled={pristine || submitting}>{isEdit ? 'Update' : 'Save' }</Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default reduxForm({form: 'contact', validate})(ContactForm);
