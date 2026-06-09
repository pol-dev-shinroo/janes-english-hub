export const MULTIPLE_CHOICE_QUESTIONS = [
  {
    id: 1,
    text: "What event happened a year ago that truly made Jonas feel \"frightened\"?",
    options: [
      { id: "A", text: "The community's food supply was suddenly cut off." },
      { id: "B", text: "A needle-nosed, single-pilot jet flew over the community twice." },
      { id: "C", text: "He witnessed a citizen being publicly released for the first time." },
      { id: "D", text: "He was scolded by the Speaker for riding his bicycle too fast." }
    ],
    correctAnswer: "B",
    explanation: "On the very first page of the chapter, Jonas recalls a time he was genuinely terrified. The text describes a \"needle-nosed single-pilot jet\" flying over the community, which panicked everyone because aircraft were strictly forbidden from flying over their living area."
  },
  {
    id: 2,
    text: "Why does Jonas decide that \"frightened\" is the wrong word to describe his feelings about the upcoming month of December?",
    options: [
      { id: "A", text: "Because he is actually completely terrified and \"frightened\" isn't strong enough." },
      { id: "B", text: "Because \"frightened\" implies a deep, sickening feeling of terrible danger, and he doesn't feel in danger." },
      { id: "C", text: "Because the rules state that Elevens are not allowed to use the word \"frightened.\"" },
      { id: "D", text: "Because his friend Asher told him it was a silly word to use." }
    ],
    correctAnswer: "B",
    explanation: "Jonas is very precise about language. He thinks to himself that \"frightened\" means a \"deep, sickening feeling of something terrible about to happen\" (like when the jet flew over). Since he doesn't feel like he is in physical danger regarding December, he realizes \"frightened\" is the wrong adjective."
  },
  {
    id: 3,
    text: "During his public apology for being late to class, Asher is corrected by the instructor for his word choice. What mistake did he make?",
    options: [
      { id: "A", text: "He used the word \"distraught\" instead of \"distracted.\"" },
      { id: "B", text: "He used the word \"angry\" instead of \"frustrated.\"" },
      { id: "C", text: "He used the word \"frightened\" instead of \"apprehensive.\"" },
      { id: "D", text: "He used the word \"starving\" instead of \"hungry.\"" }
    ],
    correctAnswer: "A",
    explanation: "Asher apologizes for being late by saying he was \"distraught\" watching the salmon hatchery. The instructor uses this as a teaching moment, explaining that \"distraught\" is too strong of a word for just watching fish, and writes \"distracted\" on the board instead."
  },
  {
    id: 4,
    text: "According to the text, \"release\" from the community is generally a terrible punishment and a statement of failure. However, there are two occasions where release is NOT a punishment. What are they?",
    options: [
      { id: "A", text: "Release of a teacher and release of a Pilot-in-Training." },
      { id: "B", text: "Release of a Nurturer and release of a pregnant mother." },
      { id: "C", text: "Release of the elderly and release of a newchild." },
      { id: "D", text: "Release of a sick person and release of a lawbreaker." }
    ],
    correctAnswer: "C",
    explanation: "The text explicitly states that there are only two times release is not a punishment: the release of the elderly, which is viewed as a celebration of a life well-lived, and the release of a newchild (an infant), which brings a sense of sadness or \"what-could-we-have-done.\""
  },
  {
    id: 5,
    text: "What is the strict rule regarding the size of a family unit in Jonas's community?",
    options: [
      { id: "A", text: "Families can have as many children as they want if they have a large enough dwelling." },
      { id: "B", text: "Each family unit is allowed a maximum of three children." },
      { id: "C", text: "Each family unit is allowed exactly two children: one male and one female." },
      { id: "D", text: "Families are only allowed to have one child to control the population." }
    ],
    correctAnswer: "C",
    explanation: "When Lily suggests keeping the newchild that their father brings home, her mother quickly shuts it down by reminding her of the rules. The text notes: \"Two children — one male, one female — to each family unit. It was written very clearly in the rules.\""
  },
  {
    id: 6,
    text: "Why is Jonas's father (a Nurturer) concerned about the male newchild at his work?",
    options: [
      { id: "A", text: "The newchild is growing too quickly and might hurt the other babies." },
      { id: "B", text: "The newchild cries so loudly that it disrupts the entire Childcare Center." },
      { id: "C", text: "The newchild is not growing as fast as he should and doesn't sleep soundly." },
      { id: "D", text: "The newchild has an unusual eye color that is against the rules." }
    ],
    correctAnswer: "C",
    explanation: "During the evening telling of feelings, Jonas's father shares his worry about a baby at the Nurturing Center. He explains that the baby has a sweet disposition but isn't sleeping well and isn't hitting his growth milestones, which means the committee is considering \"releasing\" him."
  },
  {
    id: 7,
    text: "How does the community's evening ritual of \"telling of feelings\" help enforce social control?",
    options: [
      { id: "A", text: "It allows parents to monitor their children's emotions and correct any thoughts that don't align with the community's rules." },
      { id: "B", text: "It gives children a chance to plan a rebellion against the community leaders." },
      { id: "C", text: "It allows families to vote on which rules they want to change the next day." },
      { id: "D", text: "It helps citizens practice their acting skills for the annual December ceremonies." }
    ],
    correctAnswer: "A",
    explanation: "By forcing everyone to share their private emotions every single night, the family (acting on behalf of the community) can immediately address them. For example, when Lily expresses anger, her parents talk her down and make her see things the community's way. It ensures no one is hiding rebellious or complicated feelings."
  },
  {
    id: 8,
    text: "Which word does Jonas finally choose as the most accurate description for how he feels about the upcoming Ceremony of Twelve?",
    options: [
      { id: "A", text: "Distraught" },
      { id: "B", text: "Excited" },
      { id: "C", text: "Eager" },
      { id: "D", text: "Apprehensive" }
    ],
    correctAnswer: "D",
    explanation: "After turning away from words like \"frightened\" and deciding he isn't quite \"eager,\" Jonas finally lands on the exact right word during his private talk with his parents. He states, \"I'm feeling apprehensive,\" and is relieved to have found the correct descriptive word."
  }
];

export const WRITING_QUESTIONS = [
  { 
    id: 1, 
    text: "What happened a year prior that caused Jonas to feel truly \"frightened,\" and how did the community's loudspeakers react to the event?", 
    modelAnswer: "A year ago, an unauthorized, needle-nosed jet flew over the community twice. This was a terrifying anomaly. In response, the community's loudspeakers immediately ordered all citizens to drop their bicycles exactly where they were and seek shelter indoors, creating an instant, eerie silence across the town." 
  },
  { 
    id: 2, 
    text: "Why was Jonas's friend, Asher, forced to make a public apology to his class, and what specific word choice did the instructor message him on?", 
    modelAnswer: "Asher was forced to make a standard public apology because he arrived late to class. During his apology, he said he was \"distraught\" from watching the salmon hatchery. The instructor corrected him, noting that \"distraught\" was far too strong an adjective for the situation, and told him the precise word was \"distracted.\"" 
  },
  { 
    id: 3, 
    text: "Based on Jonas's father's discussion about the struggling \"newchild,\" what is the strict rule regarding the number of children allowed in each family unit?", 
    modelAnswer: "The rules dictate that each family unit is strictly limited to exactly two children: one male and one female." 
  },
  { 
    id: 4, 
    text: "When the unidentified jet flies over the community, all the citizens drop their bikes and go indoors, leaving the streets completely silent. How does the author use this silent, waiting reaction to create a suspenseful mood and show the power of the community's rules?", 
    modelAnswer: "The author creates suspense by focusing on the abandoned bikes with their wheels still spinning and the sudden, unnatural emptiness of the normally busy streets. This instant, unquestioning obedience to the loudspeakers shows that the community’s rules hold absolute power over the citizens; they are conditioned to comply immediately without panicking or asking questions." 
  },
  { 
    id: 5, 
    text: "Jonas spends a lot of time at the beginning of the chapter trying to find the exact word for his feelings, eventually settling on \"apprehensive\" rather than \"frightened.\" Why is this specific word choice so important to him, and what event is he apprehensive about?", 
    modelAnswer: "Finding the exact word is important to Jonas because his society heavily enforces the \"precision of language,\" and citizens are trained from a young age to express themselves perfectly to avoid confusion or strong, unregulated emotions. He finally decides he is \"apprehensive\" (nervous but anticipating) about the upcoming December \"Ceremony of Twelve,\" a major life milestone." 
  },
  { 
    id: 6, 
    text: "The text mentions that a Pilot-in-Training is going to be \"released,\" which Jonas notes is a \"terrible punishment.\" However, the text later mentions two occasions where release is not a punishment. What are those two occasions, and what does this concept of \"release\" suggest about the society they live in?", 
    modelAnswer: "The two occasions where release is not a punishment are the release of the elderly (viewed as a celebration of a full life) and the release of a newchild (viewed as a sad failure to thrive). The concept of \"release\" suggests that this society cannot tolerate anything that doesn't fit its perfect mold. Whether someone makes a mistake, gets too old, or doesn't develop correctly as a baby, the society simply removes them to maintain order." 
  },
  { 
    id: 7, 
    text: "Every evening, Jonas's family must participate in the \"telling of feelings\" ritual where they share their emotions and have them analyzed by their parents. In your opinion, is this forced sharing a healthy way to manage emotions, or is it an unfair invasion of privacy? Explain your reasoning.", 
    modelAnswer: "While it might initially seem like a healthy way to process emotions, forcing everyone to share every single feeling is an unfair invasion of privacy. For example, when Lily expresses her anger, her parents immediately guide her to analyze it until she admits she isn't angry anymore. It feels less like emotional support and more like a tool for the community to \"correct\" messy emotions and ensure everyone continues to conform to the rules. People need the space to have private thoughts." 
  },
  { 
    id: 8, 
    text: "Lily gets very angry at a visiting child from another community because he didn't follow the play area rules. Her parents guide her to realize he simply didn't know their ways. Have you ever been in a situation where you felt out of place because you didn't know the \"rules\" of a new group or place? How does Lily's reaction highlight the community's obsession with conformity?", 
    modelAnswer: "(Student personal connection goes here.) Lily’s reaction highlights her community’s obsession with conformity because instead of showing understanding to a newcomer, she instantly got angry and compared him to an \"animal.\" In her society, everyone is trained to act exactly the same way all the time, showing that they have zero tolerance for differences or harmless mistakes." 
  }
];
