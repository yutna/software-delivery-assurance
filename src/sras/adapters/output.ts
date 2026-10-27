export type Output = {
  readonly stdout: (text: string) => void;
  readonly stderr: (text: string) => void;
};

export const processOutput: Output = {
  stdout: (text) => process.stdout.write(text),
  stderr: (text) => process.stderr.write(text),
};
