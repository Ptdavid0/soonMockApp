import React from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import ChecklistCard from "../../components/ChecklistCard";

const ChecklistScreen: React.FC = () => {
  const cards = [
    {
      title: "Frente Veiculo",
      mandatory: true,
      icon: "car",
      description: "Faça uma foto da frente mostrando a placa do Veículo",
      onPress: () => {
        console.log("Checklist 1");
      },
    },
    {
      title: "Lateral Esquerda",
      mandatory: true,
      icon: "car",
      description: "Faça uma foto pegando toda a lateral esquerda do Veículo",
      onPress: () => {
        console.log("Checklist 1");
      },
    },
    {
      title: "Traseira",
      mandatory: true,
      icon: "car",
      description: "Faça uma foto pegando toda a traseira do Veículo",
      onPress: () => {
        console.log("Checklist 1");
      },
    },
    {
      title: "Lateral Direita",
      mandatory: true,
      icon: "car",
      description: "Faça um foto da lateral direita do Veículo",
      onPress: () => {
        console.log("Checklist 1");
      },
    },
    {
      title: "Assinatura",
      mandatory: true,
      icon: "pencil",
      description: "Colete a assinatura da pessoa que entregou o Veículo",
      onPress: () => {
        console.log("Checklist 1");
      },
    },

    {
      title: "Estepe/Macaco",
      mandatory: true,
      icon: "car",
      description: "Faça um foto do bagageiro mostrando o Estepe",
      onPress: () => {
        console.log("Checklist 1");
      },
    },
    {
      title: "Avarias",
      mandatory: false,
      icon: "alert",
      description: "Envie 1 foto de CADA AVARIA que encontrar",
      onPress: () => {
        console.log("Checklist 1");
      },
    },
    {
      title: "Bateria",
      mandatory: true,
      icon: "battery-charging-outline",
      description: "Faça uma foto da Bateria do Veículo no local",
      onPress: () => {
        console.log("Checklist 1");
      },
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        style={{ flex: 1 }}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => <ChecklistCard item={item} />}
        keyExtractor={(item) => item.title}
      />
      <View style={styles.buttonContainer}>
        <Button title="Finalizar" onPress={() => {}} />
      </View>
    </View>
  );
};

export default ChecklistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5c40ff",
  },
  flatListContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 15,
    paddingBottom: "10%",
  },
  buttonContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 15,
  },
});
