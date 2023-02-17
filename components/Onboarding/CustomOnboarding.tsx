import { Button, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppContext } from "../../store/AppContext";

import Onboarding from "react-native-onboarding-swiper";

const Dots = ({ selected }: { selected: boolean }) => {
  const backgroundColor = selected ? "rgb(75,229,178)" : "rgb(239,239,244)";
  return (
    <View
      style={[
        styles.dots,
        {
          backgroundColor,
        },
      ]}
    />
  );
};

const SimpleOnboarding = () => {
  const { setOnboardingDone } = React.useContext(AppContext);
  return (
    <Onboarding
      onDone={setOnboardingDone}
      DotComponent={Dots}
      nextLabel={""}
      containerStyles={styles.container}
      skipLabel={""}
      bottomBarColor={"#fff"}
      bottomBarHeight={150}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={styles.image}
              source={require("../../assets/images/OnboardingImage1.png")}
            />
          ),
          title: (
            <Text style={styles.title}>
              Solicite uma assistência de forma simples
            </Text>
          ),
          subtitle: (
            <Text style={styles.subTitle}>
              Seu veículo deu pane ? Com alguns passos você consegue solicitar
              uma assistência e um de nossos herois vão te ajudar!
            </Text>
          ),
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={styles.image}
              source={require("../../assets/images/OnboardingImage2.png")}
            />
          ),
          title: <Text style={styles.title}>Acompanhe em tempo real</Text>,
          subtitle: (
            <Text style={styles.subTitle}>
              Saiba exatamente onde o seu carro e o heroí que irá te ajudar
              está, tudo através de um mapa.
            </Text>
          ),
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={styles.image}
              source={require("../../assets/images/OnboardingImage3.png")}
            />
          ),
          title: (
            <Text style={styles.title}>
              Pronto, agora é só avaliar o serviço
            </Text>
          ),
          subtitle: (
            <Text style={styles.subTitle}>
              Enorme rede de motoristas pronta para te ajudar a encontrar uma
              viagem confortável, segura e barata.
            </Text>
          ),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 278,
    height: 278,
    marginBottom: 10,
  },
  container: {
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  title: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 30,
    lineHeight: 36,
    textAlign: "center",
    letterSpacing: 0.282353,
    marginBottom: 35,
    paddingHorizontal: 31,
  },
  subTitle: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 17,
    lineHeight: 20,
    textAlign: "center",
    letterSpacing: 0.282353,
    marginBottom: 126,
    color: "#262628",
    paddingHorizontal: 46,
  },
  dots: {
    width: 40,
    height: 6,
  },
});

export default SimpleOnboarding;
