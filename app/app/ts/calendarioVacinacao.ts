import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: 20,
  },

  menu: {
    backgroundColor: "#00c2e0",
    width: "100%",
    padding: 7,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  botaoMenu: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  botaoMenuTexto: {
    color: "#00c2e0",
    fontWeight: "bold",
    fontSize: 12,
  },

  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00c2e0",
    marginVertical: 20,
    textAlign: "center",
  },

  calendario: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    width: "130%",
    alignSelf: "center",
  
  },

  section: {
    width: "90%",
    marginTop: 10,
  },

  blocoTitulo: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },

  texto: {
    fontSize: 14,
    marginBottom: 5,
  },

  frase: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
});
