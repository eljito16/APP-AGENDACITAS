import {  View,Text,StyleSheet,TextInput, FlatList, TouchableOpacity,} from "react-native";
import { useState, useContext } from "react";
import { StoreType } from "../types/Store";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { Image } from "react-native";

const mockStores: StoreType[] = [
  {
    id: "1",
    name: "Barbería El Maestro",
    category: "barberia",
    description: "Cortes clásicos y modernos para caballeros.",
    address: "Calle 123 #45-67",
    phone: "3001234567",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033",
    schedule: "Lunes a Sábado 9:00 AM - 7:00 PM",
    services: [
      { id: "1", name: "Corte clásico", price: 25000 },
      { id: "2", name: "Corte + Barba", price: 35000 },
      { id: "3", name: "Diseño personalizado", price: 40000 },
    ],
  },
  {
    id: "2",
    name: "Studio Glam Nails",
    category: "nails",
    description: "Arte en uñas y spa relajante.",
    address: "Carrera 10 #20-30",
    phone: "3019876543",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371",
    schedule: "Lunes a Domingo 10:00 AM - 8:00 PM",
    services: [
      { id: "4", name: "Manicure", price: 20000 },
      { id: "5", name: "Pedicure", price: 22000 },
      { id: "6", name: "Uñas acrílicas", price: 60000 },
    ],
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { user } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "barberia" | "nails">("all");

  const filteredStores = mockStores.filter((store) => {
    const matchesSearch = store.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter === "all" || store.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      {user?.role === "cliente" ? (
        <>
          {/* Buscador */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} />
            <TextInput
              placeholder="Buscar tienda..."
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />
          </View>

          {/* Filtros */}
          <View style={styles.filterContainer}>
            <TouchableOpacity
              onPress={() => setFilter("barberia")}
              style={styles.filterButton}
            >
              <Text>Barbería</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFilter("nails")}
              style={styles.filterButton}
            >
              <Text>Uñas</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFilter("all")}
              style={styles.filterButton}
            >
              <Text>Todos</Text>
            </TouchableOpacity>
          </View>

          {/* Lista */}
          <FlatList
            data={filteredStores}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate("StoreDetail", { store: item })
                }
              >
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.title}>{item.name}</Text>
                <Text>⭐ {item.rating}</Text>
                <Text>{item.address}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <>
          {/* Vista Negocio */}
          <Text style={styles.sectionTitle}>Mi Negocio</Text>

          <View style={styles.card}>
            <Text style={styles.title}>
              {user?.businessName || "Nombre del negocio"}
            </Text>
            <Text>
              {user?.description || "Descripción del negocio"}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Servicios</Text>

          <View style={styles.card}>
            <Text>• Corte clásico</Text>
            <Text>• Corte moderno</Text>
            <Text>• Barba</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  filterButton: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
  },
  card: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  image: {
  width: "100%",
  height: 150,
  borderRadius: 8,
  marginBottom: 10,
},
});