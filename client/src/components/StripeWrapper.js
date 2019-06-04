import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class StripeWrapper extends Component {
  render() {
    return (
      <StripeCheckout
        name="ServX"
        description="Buy credits for surveys"
        amount={500}
        token={token => this.props.handleToken(token)}
        /* using public key for test to avoid tax issues */
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions
)(StripeWrapper);
