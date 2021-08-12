import { verificationController } from "@systems"
import { context } from "@temp/data/context"


describe("Verification Controller", () => {
  let my_context = context

  test("Should return false for 'malicious'", async () => {
    my_context.message.text = "Eae"
    expect((await verificationController.handle(my_context)).malicious).toBe(false)
  })

  test("Should return true for 'malicious'", async () => {
    my_context.message.text = "tiktok.app"
    expect((await verificationController.handle(my_context)).malicious).toBe(true)
  })
})