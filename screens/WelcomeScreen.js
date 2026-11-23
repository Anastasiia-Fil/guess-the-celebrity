import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.iconBox}>
            <Ionicons name="film-outline" size={32} color="#624B80" />
          </View>

          <Text accessibilityRole="header" style={styles.title}>
            Guess The Celebrity
          </Text>

          <Text style={styles.description}>
            Guess the actor from Anna Karenina (2012), based on Leo Tolstoy’s novel.
          </Text>

          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate("Game")}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="play-circle-outline" size={18} color="#624B80" />
            <Text style={styles.buttonText}>Start Game</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FAF7FC",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    alignItems: "center",
    gap: 14,
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCD1E4",
    borderRadius: 16,
  },
  iconBox: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFE6F8",
    borderRadius: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#493461",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 23,
    color: "#5D4C6E",
    textAlign: "center",
  },
  button: {
    alignSelf: "stretch",
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 6,
    backgroundColor: "#E6EFFA",
    borderWidth: 1,
    borderColor: "#DCD1E4",
    borderRadius: 8,
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#493461",
  },
  pressed: {
    opacity: 0.75,
  },
});