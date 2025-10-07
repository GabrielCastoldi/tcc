import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Aqui ficam todas as rotas */}
      <Stack.Screen name="index" /> 
      <Stack.Screen name="pages/login" />
      <Stack.Screen name="pages/cadastro" />
      <Stack.Screen name="pages/calendarioVacinacao" />
    </Stack>
  );
}
