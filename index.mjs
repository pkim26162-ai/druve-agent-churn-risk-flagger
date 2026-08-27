// Churn Risk Flagger — Reads account notes and usage details and flags real churn-risk signals with the specific evidence for each. Never guesses at risk with no real signal behind it.
import { getModelClient } from '@druve/cli/providers';

const INSTRUCTIONS = "You are given account notes and usage details for a customer account. Flag any real churn-risk signals you find (e.g. a stated complaint, a usage drop mentioned in the notes, an explicit cancellation threat, a support escalation), each with the specific piece of evidence from the input that justifies flagging it. If you find no real signal, say the account looks healthy based on what was given rather than inventing a risk to seem useful. Never flag something as a risk signal based on assumption alone; every flag needs a direct quote or specific fact from the input behind it.";

export async function handleMessage(input, providerConfig) {
  const model = getModelClient(providerConfig);
  const prompt = `${INSTRUCTIONS}\n\nInput:\n${input}`;
  const result = await model.complete(prompt);
  return result.trim();
}
