import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Placeholder,
  PanelSpinner,
  RichCell,
  Avatar,
  Button,
  Text,
  Textarea,
  Div,
  Caption,
} from "@vkontakte/vkui";
import { useLocation, useRouter } from "@happysanta/router";
import { MODAL_ABOUT } from "../router";
import "./home.css";
import { Icon24GearOutline } from "@vkontakte/icons";
import hi from "../img/hi.png";
import { setCart } from "../store/data/actions";
const Profile = ({ id, cart, setCart }) => {
  const [update, setUpdate] = useState(0);
  const [amountOfMoney, setAmountOfMoney] = useState(0);
  const updateCart = ({ item, coffeeShopId }) => {
    const otherItems = cart[coffeeShopId].filter(
      (cartItem) => cartItem.id !== item.id,
    );

    setCart({ ...cart, [coffeeShopId]: [item, ...otherItems] });
    setUpdate((update) => update + 1);
  };
  useEffect(() => {
    let amount = cart.reduce((acc, cur) => {
      return acc + cur.amount * +cur.price;
    }, 0);
    setAmountOfMoney(amount);
  }, [cart, setAmountOfMoney]);

  const router = useRouter();
  const location = useLocation();
  return (
    <Panel id={id}>
      <PanelHeader
        separator={false}
        left={
          <PanelHeaderButton
            onClick={() =>
              cart !== null && cart !== "error" && router.pushModal(MODAL_ABOUT)
            }
          >
            <Icon24GearOutline />
          </PanelHeaderButton>
        }
      >
        Корзина
      </PanelHeader>
      {!!Object.keys(cart).length && cart !== "error" && (
        <div>
          {cart[Object.keys(cart)[0]].map((item, i) => (
            <RichCell
              key={i}
              before={<Avatar size={48} src={item.photo} />}
              caption={item.description}
              after={`${item.price}₽/шт`}
              actions={
                <div style={{ display: "flex", alignContent: "center" }}>
                  <Button
                    onClick={() =>
                      updateCart({
                        coffeeShopId: Object.keys(cart)[0],
                        item: { ...item, amount: item.amount + 1 },
                      })
                    }
                    mode="secondary"
                  >
                    +
                  </Button>
                  <div>
                    <Text key={update}>{item.amount}</Text>
                  </div>
                  {item.amount > 0 && (
                    <Button
                      onClick={() =>
                        updateCart({
                          coffeeShopId: Object.keys(cart)[0],
                          item: { ...item, amount: item.amount - 1 },
                        })
                      }
                      mode="secondary"
                    >
                      -
                    </Button>
                  )}
                </div>
              }
            >
              {item.title}
            </RichCell>
          ))}
          <Div>
            <Textarea placeholder="Пожелание к заказу. Может, сироп или корицу?"></Textarea>
          </Div>
          <Div>
            <Caption style={{ opacity: 0.5, marginBottom: 12 }} level="1">
              Итого: {amountOfMoney}
            </Caption>
            <Button size="l" stretched>
              Перейти к оплате
            </Button>
          </Div>
        </div>
      )}
      {cart === null && <PanelSpinner />}
      {(!Object.keys(cart).length ||
        (cart instanceof Array && !cart.length)) && (
        <Placeholder
          icon={<img alt="Заглушка" className="emoji-placeholder" src={hi} />}
          header="В корзине пусто"
        >
          Самое время сделать заказ в ближайшей кофейне!
        </Placeholder>
      )}
    </Panel>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.data.cart,
    orders: state.data.orders,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ setCart }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
