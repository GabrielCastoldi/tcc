import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  menu: {
    backgroundColor: "#00c2e0",
    width: "100%",
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  circuloIcone: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 20,
  },

  icone: {
    width: 50,
    height: 50,
    tintColor: "#00c2e0",
    resizeMode: "contain",
  },

  scroll: {
    alignItems: "center",
    padding: 20,
  },

  tituloPrincipal: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00c2e0",
    marginVertical: 25,
  },

  campo: {
    width: "90%",
    backgroundColor: "#ececec",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
  },

  campoTexto: {
    fontSize: 16,
  },

  botao: {
    backgroundColor: "#00c2e0",
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
    width: "60%",
    alignItems: "center",
  },

  botaoTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
