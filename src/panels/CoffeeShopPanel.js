import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Placeholder,
  PanelSpinner,
  Gallery,
  Title,
  MiniInfoCell,
  TabsItem,
  Tabs,
  RichCell,
  Avatar,
  Button,
} from "@vkontakte/vkui";
import { useLocation, useRouter } from "@happysanta/router";
import "./home.css";
import {
  Icon20ArticlesOutline,
  Icon28ChevronLeftOutline,
} from "@vkontakte/icons";
import hi from "../img/hi.png";
import { setCart } from "./../store/data/actions";
const Home = ({ id, coffeeShop, setCart, cart }) => {
  const [activeTab, setActiveTab] = useState(
    Object.keys(coffeeShop?.menu)[0] || null,
  );
  const location = useLocation();
  const router = useRouter();
  console.log(cart[location.getParams().id]);
  const itemsInCart = cart[location.getParams().id]
    ? cart[location.getParams().id]?.map((item) => item.id)
    : [];

  const updateCart = ({ item, type }) => {
    const newCart = { ...cart };
    if (!cart[location.getParams().id]) {
      newCart[location.getParams().id] = [{ ...item, amount: 1 }];
    } else {
      if (type === "add") {
        newCart[location.getParams().id].push({
          ...item,
          amount: 1,
        });
      }
      if (type === "delete") {
        //Добавить логику удаления ID кофешопа, если удаляется единственный пункт из корзины
        newCart[location.getParams().id] = [
          ...cart[location.getParams().id].filter(
            (cartItem) => item.id !== cartItem.id,
          ),
        ];
      }
    }
    setCart(newCart);
  };

  useEffect(() => {}, [location]);
  return (
    <Panel id={id}>
      <PanelHeader
        separator={false}
        visor={false}
        transparent
        left={
          <PanelHeaderButton
            onClick={() =>
              coffeeShop !== null && coffeeShop !== "error" && router.popPage()
            }
          >
            <Icon28ChevronLeftOutline />
          </PanelHeaderButton>
        }
      ></PanelHeader>
      {coffeeShop !== null && coffeeShop !== "error" && (
        <div>
          <div style={{ position: "relative" }}>
            <Gallery
              slideWidth="100%"
              bullets="light"
              style={{ height: "20vh" }}
            >
              <div
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(114,177,250,0) 0%, rgba(54,83,118,0) 64%, rgba(0,0,0,0.8) 100%), url(${coffeeShop.photo})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                }}
              ></div>
            </Gallery>
            <div
              style={{
                position: "absolute",
                bottom: "12px",
                left: "12px",
                color: "white",
              }}
            >
              <Title level="1" weight="heavy">
                {coffeeShop.title}
              </Title>
            </div>
          </div>
          <MiniInfoCell
            before={<Icon20ArticlesOutline />}
            textWrap="full"
            style={{ marginTop: 12 }}
            textLevel="primary"
          >
            {coffeeShop.description}
          </MiniInfoCell>
          <Tabs mode="buttons">
            {Object.keys(coffeeShop.menu).map((item) => (
              <TabsItem
                key={item}
                onClick={() => setActiveTab(item)}
                selected={activeTab === item}
              >
                {item}
              </TabsItem>
            ))}
          </Tabs>
          {coffeeShop.menu[activeTab].map((item, i) => (
            <RichCell
              key={i}
              disabled={!item.available}
              multiline
              before={<Avatar size={72} src={item.photo} />}
              caption={item.description}
              after={item.price}
              actions={
                <>
                  {!itemsInCart.includes(item.id) && (
                    <Button onClick={() => updateCart({ item, type: "add" })}>
                      Добавить
                    </Button>
                  )}
                  {itemsInCart.includes(item.id) && (
                    <Button
                      mode="secondary"
                      onClick={() => updateCart({ item, type: "delete" })}
                    >
                      Убрать
                    </Button>
                  )}
                </>
              }
            >
              {item.title}
            </RichCell>
          ))}
        </div>
      )}
      {coffeeShop === null && <PanelSpinner />}
      {coffeeShop === "error" && (
        <Placeholder
          icon={<img alt="Заглушка" className="emoji-placeholder" src={hi} />}
          header="Ошибка"
        >
          Упс, попробуйте обновить
        </Placeholder>
      )}
    </Panel>
  );
};

const mapStateToProps = (state) => {
  return {
    coffeeShop: state.data.coffeeShop,
    cart: state.data.cart,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ setCart }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
