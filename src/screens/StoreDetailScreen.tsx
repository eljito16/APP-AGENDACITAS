import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StoreType } from "../types/Store";

type RouteParams = {
  StoreDetail: {
    store: StoreType;
  };
};

export default function StoreDetailScreen() {
  const route = useRoute<RouteProp<RouteParams, "StoreDetail">>();
  const { store } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Imagen */}
      <Image source={{ uri: store.image }} style={styles.image} />

      {/* Información principal */}
      <Text style={styles.title}>{store.name}</Text>
      <Text style={styles.rating}>⭐ {store.rating}</Text>
      <Text style={styles.description}>{store.description}</Text>

      {/* Datos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información</Text>
        <Text>📍 {store.address}</Text>
        <Text>📞 {store.phone}</Text>
        <Text>🕒 {store.schedule}</Text>
      </View>

      {/* Servicios */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Servicios</Text>

        {store.services.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.servicePrice}>
              ${service.price.toLocaleString()}
            </Text>
          </View>
        ))}
      </View>

      {/* Botón reservar */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Reservar cita</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 220,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    margin: 15,
  },
  rating: {
    marginHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  description: {
    marginHorizontal: 15,
    marginBottom: 15,
  },
  section: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  serviceCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  serviceName: {
    fontSize: 16,
  },
  servicePrice: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "black",
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});