type KnowledgeItem = {
  topic: string;
  answer: string;
};

export function answerWithRules(question: string, knowledge: KnowledgeItem[]): string {
  const normalisedQuestion = question.trim().toLowerCase();

  if (!normalisedQuestion) {
    return "Ask a question about the stack, standards, content model, or next implementation step.";
  }

  const match = knowledge.find((item) => normalisedQuestion.includes(item.topic));

  if (match) {
    return match.answer;
  }

  return "Start with the architecture standards, make the smallest correct change, and keep the system practical.";
}
