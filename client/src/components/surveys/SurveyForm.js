import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return (
      <div>
        {formFields.map((item, index) => (
          <Field key={index} type="text" component={SurveyField} {...item} />
        ))}
      </div>
    );
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next <i className="material-icons right">navigate_next</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.emails = validateEmails(values.emails || '');

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = 'Please provide a value';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm' /* this is the object name in redux store to access form values */,
  destroyOnUnmount: false /* to preserve form values when returning from review page */
})(SurveyForm);
