import { StyleSheet, Text, View, Image } from "react-native";

interface TabOneScreenProps {
  navigation: any;
  route: any;
}

const ModalScreen: React.FC<TabOneScreenProps> = ({ navigation, route }) => {
  const { image } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visualizacao de Foto</Text>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 400,
    height: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
