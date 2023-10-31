import chalk from 'chalk';

const prefix = chalk.hex('#e85fdd').bold(`[${process.env.APP_NAME}]`);

const error = (text: string) => {
  console.log(
    chalk.italic(new Date().toISOString()),
    prefix,
    chalk.red(text),
  );
};

const info = (text: string) => {
  console.log(
    chalk.italic(new Date().toISOString()),
    prefix,
    chalk.white(text),
  );
};

const success = (text: string) => {
  console.log(
    chalk.italic(new Date().toISOString()),
    prefix,
    chalk.green(text),
  );
};

const warn = (text: string) => {
  console.log(
    chalk.italic(new Date().toISOString()),
    prefix,
    chalk.yellow(text),
  );
};

export {
  error,
  info,
  success,
  warn,
};
