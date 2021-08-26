import chalk from "chalk"


export class TaskLogger {
  logStep(emoji:string, name:string, step:string, description:string): void|string {
    console.log(`[${emoji}] - ${name} ${step} ${this.select_description_color(step, description)}`)
  }

  select_description_color(step:string, description:string): string {
    if (step == "END") return chalk.green(description)
    else if (step == "ERROR") return chalk.red(description)
    else if (step == "ACTION")  return chalk.yellow(description)
    else return description
  }
}