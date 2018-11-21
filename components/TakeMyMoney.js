import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import calcTotalPrice from "../lib/calcTotalPrice";
import Error from "./ErrorMessage";
import User, { CURRENT_USER_QUERY } from "./User";

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class TakeMyMoney extends React.Component {
  onToken = res => {
    console.log("On Token Called!");
    console.log(res);
  };
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <StripeCheckout
            amount={calcTotalPrice(me.cart)}
            name="New Navy" // the pop-in header title
            description={`Order of ${totalItems(me.cart)} items!`} // the pop-in header subtitle
            image={me.cart.length && me.cart[0].item && me.cart[0].item.image} // the pop-in header image (default none)
            stripeKey="pk_test_eu9jxjHPRi448DrKOoGDpNs8"
            currency="USD"
            email={me.email}
            // Note: Enabling either address option will give the user the ability to
            // fill out both. Addresses are sent as a second parameter in the token callback.
            // shippingAddress
            // billingAddress={false}
            // Note: enabling both zipCode checks and billing or shipping address will
            // cause zipCheck to be pulled from billing address (set to shipping if none provided).
            // zipCode={false}
            token={res => this.onToken(res, createOrder)}
          >
            {this.props.children}
          </StripeCheckout>
        )}
      </User>
    );
  }
}

export default TakeMyMoney;