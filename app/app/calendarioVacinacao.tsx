import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { styles } from "./ts/calendarioVacinacao";
import { useRouter } from "expo-router";  


export default function CalendarioVacinacao() {
  const router = useRouter(); 

  const handleSair = () => {
    router.push("/login"); 
  }; 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HEADER */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.botaoMenu} onPress={handleSair}>
          <Text style={styles.botaoMenuTexto}>SAIR</Text>
        </TouchableOpacity>
      </View>

      {/* TÍTULO */}
      <Text style={styles.titulo}>CALENDÁRIO DE VACINAÇÃO</Text>

      {/* CALENDÁRIO */}
      <Calendar
        style={styles.calendario}
        markedDates={{
          "2025-05-04": { marked: true, dotColor: "red" },
          "2025-05-08": { marked: true, dotColor: "red" },
          "2025-05-12": { marked: true, dotColor: "skyblue" },
          "2025-05-26": { marked: true, dotColor: "skyblue" },
          "2025-05-17": { marked: true, dotColor: "green" },
        }}
      />

      {/* VACINA SELECIONADA */}
      <View style={styles.section}>
        <Text style={styles.blocoTitulo}>VACINA SELECIONADA:</Text>
        <Text style={styles.texto}>14/10 - Vacina Tríplice Viral</Text>
        <Text style={styles.texto}>Data da última vacina: 07/03/2025</Text>
      </View>

      {/* VACINAS EM ATRASO */}
      <View style={styles.section}>
        <Text style={styles.blocoTitulo}>VACINAS EM ATRASO:</Text>
        <Text style={styles.texto}>05/05/2025 - Vacina Tríplice Viral</Text>
        <Text style={styles.texto}>08/05/2025 - Vacina BCG</Text>
      </View>

      {/* AVISO */}
      <Text style={styles.frase}>Vá ao posto de saúde e imunize já!</Text>
    </ScrollView>
  );
}
