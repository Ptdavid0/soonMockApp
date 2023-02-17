import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import ImagePicker from "../ImagePicker";
import { useNavigation } from "@react-navigation/native";

interface CardProps {
  item: {
    title: string;
    mandatory: boolean;
    description: string;
    onPress: () => void;
    icon: any;
  };
}

const ChecklistCard: React.FC<CardProps> = ({
  item: { title, mandatory, description, icon },
}) => {
  const [image, setImage] = React.useState<any>(null);
  const navigation = useNavigation();

  const isAvarias = title.includes("Avarias");

  const saveImage = (uri: string) => {
    if (isAvarias)
      setImage((prevImages: [string]) =>
        prevImages ? [...prevImages, uri] : [uri]
      );
    else setImage([uri]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.icon}>
          <Ionicons name={icon} size={32} color="black" />
        </View>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            {image ? (
              <Ionicons
                name={"checkmark-circle-outline"}
                size={32}
                color="green"
              />
            ) : (
              mandatory && <Text style={styles.mandatory}>Obrigatorio</Text>
            )}
          </View>
          <View style={styles.lowerContainer}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{description}</Text>
            </View>
            {(isAvarias || !image) && (
              <View style={styles.imagePickerContainer}>
                <ImagePicker saveImage={saveImage} />
              </View>
            )}
          </View>
        </View>
      </View>

      {
        <View style={styles.imageContainer}>
          {image &&
            image.map((uri: string) => (
              <Pressable
                key={uri}
                onPress={() =>
                  navigation.navigate("Modal", {
                    image: uri,
                  })
                }
              >
                <Image source={{ uri: uri }} style={styles.image} />
              </Pressable>
            ))}
        </View>
      }
    </View>
  );
};

export default ChecklistCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
  },
  topContainer: {
    marginBottom: 10,
    flex: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  lowerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  descriptionContainer: {
    flex: 3.1,
  },
  imagePickerContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  icon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 3,
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: "100%",
    flexDirection: "column",
    paddingTop: 5,
  },
  description: {
    flex: 2,
    fontSize: 12,
    color: "gray",
    paddingRight: 70,
  },

  title: {
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  mandatory: {
    fontSize: 8,
    color: "grey",
    fontWeight: "bold",
  },
});
