import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Placeholder,
  PanelSpinner,
  ContentCard,
  Div,
} from "@vkontakte/vkui";
import { useRouter } from "@happysanta/router";
import { MODAL_ABOUT } from "../router";
import "./home.css";
import { Icon24GearOutline } from "@vkontakte/icons";
import hi from "../img/hi.png";
import { PAGE_COFFEESHOP } from "./../router/index";
const Home = ({ id, coffeeShops }) => {
  const router = useRouter();
  return (
    <Panel id={id}>
      <PanelHeader
        separator={false}
        left={
          <PanelHeaderButton
            onClick={() =>
              coffeeShops !== null &&
              coffeeShops !== "error" &&
              router.pushModal(MODAL_ABOUT)
            }
          >
            <Icon24GearOutline />
          </PanelHeaderButton>
        }
      >
        Espresso No Stresso
      </PanelHeader>
      {coffeeShops !== null &&
        coffeeShops !== "error" &&
        coffeeShops.map((shop, i) => (
          <Div
            onClick={() => router.pushPage(PAGE_COFFEESHOP, { id: shop.id })}
            key={i}
          >
            <ContentCard
              image={shop.photo}
              subtitle={shop.address}
              header={shop.title}
              caption={shop.description}
            ></ContentCard>
          </Div>
        ))}
      {coffeeShops === null && <PanelSpinner />}
      {coffeeShops === "error" && (
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
    coffeeShops: state.data.coffeeShops,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);