export const READING_ARTICLE = {
  title: "Beyond the Robots: Understanding Artificial Intelligence",
  content: [
    "When you hear the term \"Artificial Intelligence\" (AI), your mind might immediately jump to science fiction movies featuring glowing red eyes, humanoid robots, or computers taking over the world. However, the reality of AI is much less cinematic and much more common. You probably interact with AI several times a day without even realizing it.",
    "At its core, Artificial Intelligence is a branch of computer science dedicated to creating systems capable of performing tasks that typically require human intelligence. These tasks include recognizing speech, making decisions, translating languages, and identifying patterns. Unlike a traditional computer program, which only does exactly what a human programmer tells it to do step-by-step, an AI system uses algorithms—sets of rules and calculations—to process information and figure things out on its own.",
    "The most powerful type of AI today is called \"machine learning.\" Instead of being programmed with strict rules, a machine learning system is fed enormous amounts of data. For example, if you want an AI to recognize cats, you don't write a code describing a cat’s pointy ears and whiskers. Instead, you show the AI millions of photos of cats and millions of photos of things that are not cats. Over time, the system recognizes the visual patterns that make a cat a cat. It learns from experience, much like a human brain does.",
    "Because of this learning process, AI is incredibly useful for everyday tasks. When a streaming service recommends a movie you might like, that is an AI analyzing your past viewing habits and comparing them to millions of other users. When you use a smartphone map to find the fastest route home, an AI is analyzing real-time traffic data, road closures, and speed limits to predict your arrival time.",
    "Experts often describe modern AI not as a replacement for humans, but as a \"co-pilot.\" Just as a co-pilot helps a pilot fly an airplane safely, AI tools help humans work faster and smarter. Doctors use AI to help scan medical X-rays and spot early signs of disease that a human eye might miss. Programmers use AI to help them write computer code more efficiently. In these scenarios, the AI does the heavy lifting of sorting through data, but the human makes the final decision.",
    "However, this rapidly advancing technology comes with significant challenges. One major issue is the \"black box\" problem. As machine learning systems become more complex, they essentially build their own pathways to solve problems. Sometimes, even the engineers who created the AI cannot fully explain how the computer arrived at a specific answer. It is like a black box where data goes in and answers come out, but the process inside is a mystery.",
    "Another serious concern is bias. Because AI learns from data created by humans, it can inherit human flaws. If the data used to train an AI is unfair or leaves out certain groups of people, the AI's decisions will also be unfair. For example, if an AI is used to sort through job applications, but it was trained mostly on resumes from men, it might unfairly reject applications from women.",
    "Artificial Intelligence is no longer just a futuristic concept; it is the reality of the modern world. As AI continues to evolve, society must figure out how to use this powerful \"co-pilot\" responsibly, ensuring that the technology is safe, fair, and beneficial for everyone."
  ]
};

export const READING_QUESTIONS = [
  {
    id: 1,
    text: "What is the main idea of the passage?",
    options: [
      { id: "A", text: "AI is dangerous and will eventually replace human workers in the medical and programming fields." },
      { id: "B", text: "AI is a common technology that learns from data to help humans, though it comes with challenges like bias and the \"black box\" problem." },
      { id: "C", text: "AI is exactly like the robots seen in science fiction movies, but it is currently too expensive for everyday use." },
      { id: "D", text: "Machine learning is a type of AI that only focuses on analyzing photographs of animals." }
    ],
    correctAnswer: "B",
    explanation: "The passage explains what AI is, how it is used as a tool, and outlines its main challenges."
  },
  {
    id: 2,
    text: "Based on how it is used in the second paragraph, what is the best definition for the word \"algorithms\"?",
    options: [
      { id: "A", text: "Traditional computer hardware" },
      { id: "B", text: "Human intelligence" },
      { id: "C", text: "Sets of rules and calculations used to process information" },
      { id: "D", text: "Errors in computer programming" }
    ],
    correctAnswer: "C",
    explanation: "The text defines algorithms directly as \"sets of rules and calculations.\""
  },
  {
    id: 3,
    text: "According to the text, how does \"machine learning\" differ from traditional computer programming?",
    options: [
      { id: "A", text: "Machine learning requires a human to write step-by-step instructions for every single action." },
      { id: "B", text: "Machine learning systems cannot process visual data like photos." },
      { id: "C", text: "Machine learning systems are fed large amounts of data to recognize patterns on their own." },
      { id: "D", text: "Machine learning is only used by streaming services to recommend movies." }
    ],
    correctAnswer: "C",
    explanation: "Paragraph 3 explains that it is fed data to learn patterns, rather than relying on strict rules."
  },
  {
    id: 4,
    text: "Why does the author use the metaphor of a \"co-pilot\" to describe AI?",
    options: [
      { id: "A", text: "To show that AI is mostly used in the aviation industry to fly airplanes." },
      { id: "B", text: "To explain that AI is meant to assist and work alongside humans, rather than completely replace them." },
      { id: "C", text: "To argue that humans should let AI make all the final decisions in the workplace." },
      { id: "D", text: "To demonstrate that AI is still too weak to do any heavy lifting." }
    ],
    correctAnswer: "B",
    explanation: "Paragraph 5 notes that just like a co-pilot helps a pilot, AI helps humans work smarter while the human makes the final decision."
  },
  {
    id: 5,
    text: "What is the \"black box\" problem mentioned in the text?",
    options: [
      { id: "A", text: "The fact that AI computers are often built inside dark, square cases." },
      { id: "B", text: "The issue where AI completely shuts down and deletes its own data." },
      { id: "C", text: "The problem where AI refuses to answer questions from engineers." },
      { id: "D", text: "The situation where even the creators of the AI cannot fully explain how the system arrived at its answer." }
    ],
    correctAnswer: "D",
    explanation: "Paragraph 6 explains that the inner decision-making process of complex AI is a mystery, even to its creators."
  },
  {
    id: 6,
    text: "According to the passage, what causes an AI system to become biased?",
    options: [
      { id: "A", text: "The AI decides on its own to be unfair to certain groups." },
      { id: "B", text: "The system learns from data created by humans, which may already contain flaws or exclusions." },
      { id: "C", text: "The AI becomes infected with a computer virus." },
      { id: "D", text: "The engineers intentionally program the AI to give incorrect answers." }
    ],
    correctAnswer: "B",
    explanation: "Paragraph 7 states that AI inherits human flaws if the data used to train it is unfair."
  },
  {
    id: 7,
    text: "Which of the following is an example of an AI acting as a \"co-pilot,\" as described in the passage?",
    options: [
      { id: "A", text: "An AI that automatically hires job applicants without any human review." },
      { id: "B", text: "A doctor using an AI program to help identify tiny abnormalities on a patient's X-ray before making a diagnosis." },
      { id: "C", text: "An AI robot from a movie that tries to take over a city." },
      { id: "D", text: "A traditional calculator solving a math equation based on buttons pushed by a student." }
    ],
    correctAnswer: "B",
    explanation: "This perfectly matches the text's example of AI doing heavy data lifting while the human makes the final choice."
  },
  {
    id: 8,
    text: "Based on the conclusion of the passage, what is the author's tone regarding the future of Artificial Intelligence?",
    options: [
      { id: "A", text: "Panicked and fearful about the end of humanity." },
      { id: "B", text: "Completely dismissive, believing AI is just a temporary fad." },
      { id: "C", text: "Cautious but practical, emphasizing the need to use the technology responsibly and fairly." },
      { id: "D", text: "Overly excited, believing AI will instantly solve all of the world's problems." }
    ],
    correctAnswer: "C",
    explanation: "The author views AI as a powerful reality but stresses that \"society must figure out how to use this powerful 'co-pilot' responsibly.\""
  }
];
