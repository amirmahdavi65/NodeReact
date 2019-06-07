import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';

const SurveyFormReview = ({ onCancel, formValues }) => {
  const reviewFields = formFields.map(({ label, name }) => (
    <div key={name}>
      <label>{label}</label>
      <div>{formValues[name]}</div>
    </div>
  ));
  return (
    <div>
      <h5>Please confirm these entries</h5>
      {reviewFields}
      <button className="amber btn-flat" onClick={onCancel}>
        Back
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return { formValues: state.form.surveyForm.values };
};

export default connect(mapStateToProps)(SurveyFormReview);
