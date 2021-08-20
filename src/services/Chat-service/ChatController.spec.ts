import { chatController } from "@services"
import { context } from "@temp/data/context"


describe("Chat System", () => {
  let my_context = context

  test("[ChatRepository] - Should return a array of responses", async () => {
    my_context.message.text = "Bom dia"
    let result = await chatController.handle(my_context)
    expect(result[0].text != "").toBeTruthy()

    my_context.message.text = "oi"
    result = await chatController.handle(my_context)
    expect(result[0].text != "").toBeTruthy()
  })

  test("[ChatRepository] - Should return a array with a default message", async () => {
    my_context.message.text = "_____________"
    let result = await chatController.handle(my_context)
    expect(result[0].text == "").toBeTruthy()
  })
})