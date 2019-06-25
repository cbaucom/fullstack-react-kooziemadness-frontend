import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";
import DeleteItem from "../components/DeleteItem";
import AddToCart from "../components/AddToCart";
import User from "./User";

export default class Item extends Component {
  static propTypes = {
    // item: PropTypes.shape({
    // 	title: PropTypes.string.isRequired,
    // 	price: PropTypes.number.isRequired,
    // }),
    item: PropTypes.object.isRequired,
  };

  render() {
    // const item = this.props.item;
    const { item } = this.props;
    return (
      <User>
        {({ data: { me } }) => (
          <ItemStyles>
            {item.image && <img src={item.image} alt={item.title} />}

            <Title>
              <Link
                href={{
                  pathname: "/item",
                  query: { id: item.id },
                }}
              >
                <a>{item.title}</a>
              </Link>
            </Title>
            <PriceTag>{formatMoney(item.price)}</PriceTag>
            <p>{item.description}</p>
            {me && (
              <div className="buttonList">
                <Link
                  href={{
                    pathname: "update",
                    query: { id: item.id },
                  }}
                >
                  <a>Edit ✏️</a>
                </Link>
                <AddToCart id={item.id} />
                <DeleteItem id={item.id}>Delete Item</DeleteItem>
              </div>
            )}
            {!me && (
              <div className="buttonList">
                <Link href="/signup">
                  <a>Sign In to Add to Cart</a>
                </Link>
              </div>
            )}
          </ItemStyles>
        )}
      </User>
    );
  }
}
