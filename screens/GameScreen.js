import { useState } from "react";
import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

import { questions, shuffle } from "../data/questions";

const answerColors = ["#EFE6F8", "#FAE8EF", "#E6EFFA", "#E5F3ED"];

export default function GameScreen({ navigation, route }) {
  const [game] = useState(() => {
    return (
      route.params?.game ?? {
        order: shuffle(questions.map((_, index) => index)),
        round: 0,
        score: 0,
        attempts: 0,
      }
    );
  });

  const [options] = useState(() =>
    shuffle(questions.map((question) => question.correctAnswer))
  );

  const question = questions[game.order[game.round]];

  function handleAnswer(option) {
    const isCorrect = option === question.correctAnswer;

    navigation.replace("Results", {
      game: {
        ...game,
        score: game.score + (isCorrect ? 1 : 0),
        attempts: game.attempts + 1,
      },
      isCorrect,
    });
  }

  function finishGame() {
    navigation.replace("Results", { game });
  }

  function restartGame() {
    navigation.replace("Game");
  }

  return (
    <SafeAreaView style={styles.screen} edges={["bottom", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.score}>
          Score: {game.score} / {game.attempts}
        </Text>

        <Image
          source={question.image}
          style={styles.image}
          resizeMode="cover"
          accessible
          accessibilityLabel="Celebrity in a scene from Anna Karenina"
        />

        <Text accessibilityRole="header" style={styles.title}>
          Who is this celebrity?
        </Text>

        {options.map((option, index) => (
          <Pressable
            key={option}
            accessibilityRole="button"
            accessibilityLabel={option}
            onPress={() => handleAnswer(option)}
            style={({ pressed }) => [
              styles.answer,
              { backgroundColor: answerColors[index] },
              pressed && styles.answerPressed,
            ]}
          >
            <Ionicons name="person-circle-outline" size={18} color="#624B80" />
            <Text style={styles.answerText}>{option}</Text>
          </Pressable>
        ))}

        <Button title="Finish Game" color="#624B80" onPress={finishGame} />
        <Button title="Restart Game" color="#624B80" onPress={restartGame} />
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#493461",
    textAlign: "center",
    marginVertical: 4,
  },
  answer: {
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
  answerPressed: {
    opacity: 0.75,
  },
  answerText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#493461",
  },
});