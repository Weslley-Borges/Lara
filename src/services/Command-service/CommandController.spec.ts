import { commandController } from "@services"
import { context } from "@temp/data/context"


describe("Command System", () => {
  let my_context = context

  test("Should return the inexistence of the command", () => {
    my_context.message.text = "!command"
    return commandController.handle(my_context).then(data => {
      expect(data).toEqual([{text:"🤔 Ue, esse comando não existe no meu sistema."}])
    })
  })

  test("Should return the result of command", () => {
    my_context.message.text = "!menu"
    return commandController.handle(my_context).then(data => {
      expect(data).not.toEqual([{text:"🤔 Ue, esse comando não existe no meu sistema."}])
    })
  })
})