import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from "react-native";
import { useState } from "react";
import { StoreType } from "../types/store";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const mockStores: StoreType[] = [
  {
    id: "1",
    name: "Barbería El Maestro",
    category: "barberia",
    description: "Cortes clásicos y modernos para caballeros.",
    address: "Calle 123 #45-67",
    phone: "3001234567",
  },
  {
    id: "2",
    name: "Uñas Perfectas",
    category: "nails",
    description: "Manicure, pedicure y diseños exclusivos.",
    address: "Carrera 10 #20-30",
    phone: "3019876543",
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "barberia" | "nails">("all");

  const filteredStores = mockStores.filter((store) => {
    const matchesSearch = store.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || store.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      
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
        <TouchableOpacity onPress={() => setFilter("barberia")} style={styles.filterButton}>
          <Text>Barbería</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFilter("nails")} style={styles.filterButton}>
          <Text>Uñas</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFilter("all")} style={styles.filterButton}>
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
            onPress={() => navigation.navigate("StoreDetail", { store: item })}
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
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
    marginBottom: 5,
  },
});