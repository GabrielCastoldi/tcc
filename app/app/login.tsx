import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { styles } from "./ts/login";
import { useRouter } from "expo-router";


export default function Login() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleCadastro = () => {
    router.push("/cadastro");
  };  

  const handleEntrar = () => {
    router.push("/calendarioVacinacao"); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <View style={styles.circuloIcone}>
          <Image
            source={require("./assets/images/seringa.png")}
            style={styles.icone}
          />
        </View>
      </View>

      <Text style={styles.titulo}>ENTRAR</Text>

      <View style={styles.campo}>
        <TextInput
          style={styles.campoTexto}
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
        />
      </View>

      <View style={styles.campo}>
        <TextInput
          style={styles.campoTexto}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      <TouchableOpacity style={styles.botao} onPress={handleEntrar}>
        <Text style={styles.botaoTexto}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao}    onPress={handleCadastro}>
        <Text style={styles.botaoTexto}>CRIAR UMA CONTA</Text>
      </TouchableOpacity>
    </View>
  );
}
