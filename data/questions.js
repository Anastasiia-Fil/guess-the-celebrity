export const questions = [
  {
    image: require("../assets/keira.jpg"),
    correctAnswer: "Keira Knightley",
  },
  {
    image: require("../assets/aaron.jpg"),
    correctAnswer: "Aaron Taylor-Johnson",
  },
  {
    image: require("../assets/jude.jpg"),
    correctAnswer: "Jude Law",
  },
  {
    image: require("../assets/alicia.jpg"),
    correctAnswer: "Alicia Vikander",
  },
];

export function shuffle(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}