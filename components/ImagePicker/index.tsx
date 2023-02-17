import React from "react";
import { Alert, StyleSheet, Pressable, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

interface ImagePickerProps {
  saveImage: (image: any) => void;
  color?: string;
  customButton?: any;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  saveImage,
  color = "black",
  customButton,
}) => {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const verifyPermission = async () => {
    if (
      cameraPermissionInformation &&
      cameraPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (
      cameraPermissionInformation &&
      cameraPermissionInformation.status === PermissionStatus.DENIED
    ) {
      Alert.alert(
        "Permissão negada",
        "Para usar a câmera, você precisa permitir acesso a ela."
      );
      return false;
    }
    return true;
  };
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    if (!image.cancelled) {
      saveImage(image.uri);
    }
  };
  return (
    <View>
      <Pressable onPress={takeImageHandler}>
        {customButton ? (
          customButton
        ) : (
          <Ionicons name="ios-camera" size={32} color={color} />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ImagePicker;
