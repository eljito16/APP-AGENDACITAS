import { View, Text, StyleSheet, FlatList } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

type AppointmentType = {
  id: string;
  clientName: string;
  service: string;
  date: string;
};

const mockAppointments: AppointmentType[] = [
  {
    id: "1",
    clientName: "Juan Pérez",
    service: "Corte clásico",
    date: "20 Feb - 3:00 PM",
  },
  {
    id: "2",
    clientName: "Carlos López",
    service: "Barba",
    date: "21 Feb - 5:00 PM",
  },
];

export default function AgendaScreen() {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {user?.role === "cliente" ? (
        <>
          <Text style={styles.title}>Mis Citas</Text>

          <FlatList
            data={mockAppointments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.bold}>Servicio: {item.service}</Text>
                <Text>Fecha: {item.date}</Text>
              </View>
            )}
          />
        </>
      ) : (
        <>
          <Text style={styles.title}>Citas del Negocio</Text>

          <FlatList
            data={mockAppointments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.bold}>
                  Cliente: {item.clientName}
                </Text>
                <Text>Servicio: {item.service}</Text>
                <Text>Fecha: {item.date}</Text>
              </View>
            )}
          />
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  card: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
});