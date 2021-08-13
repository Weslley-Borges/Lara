import chalk from "chalk"


export class TaskLogger {
  logStep(emoji:string, name:string, step:string, description:string, test?:boolean): void|string {
    description = this.select_description_color(step, description)
    
    if (test) return `[${emoji}] - ${name} ${step} ${description}`
    console.log(`[${emoji}] - ${name} ${step} ${description}`)
  }

  select_description_color(step:string, description:string): string {
    if (step == "END") return chalk.green(description)
    else if (step == "ERROR") return chalk.red(description)
    else if (step == "ACTION")  return chalk.yellow(description)
    else return description
  }
}