import { printPassword, printPasswordSet } from "./messages";
import { askForPasswordValue } from "./questions";

export const hasAccess = (masterPassword: string): boolean =>
  masterPassword === "abc123";

export const handleSetPassword = async (
  passwordName: string
): Promise<void> => {
  const passwordValue = await askForPasswordValue();

  printPasswordSet(passwordName);
};

export const handleGetPassword = async (
  passwordName: string
): Promise<void> => {
  printPassword(passwordName, "abc123");
};
