import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

import { questions } from "../data/questions";

function ResultButton({ title, icon, color, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: color },
        pressed && styles.pressed,
      ]}
    >
      <Ionicons name={icon} size={18} color="#624B80" />
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

export default function ResultsScreen({ navigation, route }) {
  const { game, isCorrect } = route.params;
  const showingFeedback = typeof isCorrect === "boolean";
  const hasNextQuestion = game.round + 1 < game.order.length;
  const question = questions[game.order[game.round]];

  function nextQuestion() {
    navigation.replace("Game", {
      game: { ...game, round: game.round + 1 },
    });
  }

  function finishGame() {
    navigation.replace("Results", { game });
  }

  return (
    <SafeAreaView style={styles.screen} edges={["bottom", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.content}>
        {showingFeedback ? (
          <>
            <Text style={styles.score}>
              Score: {game.score} / {game.attempts}
            </Text>

            <Image
              source={question.image}
              style={styles.image}
              resizeMode="cover"
              accessible
              accessibilityLabel={question.correctAnswer}
            />

            <View
              style={[
                styles.feedback,
                isCorrect ? styles.correctFeedback : styles.incorrectFeedback,
              ]}
            >
              <Ionicons
                name={isCorrect ? "checkmark-circle" : "close-circle"}
                size={22}
                color={isCorrect ? "#237544" : "#A72D40"}
              />
              <View style={styles.feedbackText}>
                <Text accessibilityRole="header" style={styles.feedbackTitle}>
                  {isCorrect ? "Correct!" : "Incorrect"}
                </Text>
                <Text style={styles.description}>
                  That was {question.correctAnswer}.
                </Text>
              </View>
            </View>

            {hasNextQuestion && (
              <ResultButton
                title="Next"
                icon="arrow-forward-circle-outline"
                color="#E6EFFA"
                onPress={nextQuestion}
              />
            )}

            <ResultButton
              title="Finish Game"
              icon="flag-outline"
              color="#EFE6F8"
              onPress={finishGame}
            />
          </>
        ) : (
          <>
            <View style={styles.summary}>
              <Ionicons name="trophy-outline" size={28} color="#946A1F" />
              <Text accessibilityRole="header" style={styles.title}>
                Final Score
              </Text>
              <Text style={[styles.description, styles.centered]}>
                You answered {game.score} out of {game.attempts} correctly.
              </Text>
            </View>

            <ResultButton
              title="Close"
              icon="home-outline"
              color="#FAE8EF"
              onPress={() => navigation.popToTop()}
            />
          </>
        )}

        <ResultButton
          title="Restart Game"
          icon="refresh-outline"
          color="#E5F3ED"
          onPress={() => navigation.replace("Game")}
        />
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
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
    padding: 24,
    gap: 10,
  },
  score: {
    fontSize: 16,
    color: "#5D4C6E",
    textAlign: "right",
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    backgroundColor: "#EFE7F6",
  },
  feedback: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#DCD1E4",
    borderRadius: 8,
  },
  correctFeedback: {
    backgroundColor: "#E5F3ED",
  },
  incorrectFeedback: {
    backgroundColor: "#FAE8EF",
  },
  feedbackText: {
    flex: 1,
    gap: 4,
  },
  feedbackTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#493461",
  },
  description: {
    fontSize: 16,
    color: "#5D4C6E",
  },
  summary: {
    alignItems: "center",
    padding: 20,
    gap: 8,
    backgroundColor: "#FFF3DA",
    borderRadius: 12,
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#493461",
  },
  centered: {
    textAlign: "center",
  },
  button: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
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