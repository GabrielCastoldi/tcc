import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { styles } from "./ts/cadastro";
import { useRouter } from "expo-router";


export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };  

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <View style={styles.circuloIcone}>
          <Image source={require("./assets/images/seringa.png")} style={styles.icone} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
     
        <Text style={styles.tituloPrincipal}>CRIAR UMA CONTA</Text>

        <View style={styles.campo}>
          <TextInput
            style={styles.campoTexto}
            placeholder="Nome completo"
            value={nome}
            onChangeText={setNome}
          />
        </View>

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
            placeholder="Data de nascimento"
            value={nascimento}
            onChangeText={setNascimento}
          />
        </View>

        <View style={styles.campo}>
          <TextInput
            style={styles.campoTexto}
            placeholder="Telefone / Celular"
            value={telefone}
            onChangeText={setTelefone}
          />
        </View>

        <View style={styles.campo}>
          <TextInput
            style={styles.campoTexto}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
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

        <View style={styles.campo}>
          <TextInput
            style={styles.campoTexto}
            placeholder="Confirmar senha"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
        </View>

        <TouchableOpacity style={styles.botao} onPress={handleLogin}>
          <Text style={styles.botaoTexto}>CADASTRAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
