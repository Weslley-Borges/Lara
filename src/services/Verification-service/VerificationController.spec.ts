import { verificationController } from "@services"
import { context } from "@temp/data/context"


describe("Verification System", () => {
  let my_context = context

  test("Should return false for 'malicious'", () => {
    my_context.message.text = "Eae"
    return verificationController.handle(my_context).then(data => {
      expect(data.malicious).toBe(false)
    })
  })

  test("Should return true for 'malicious'", () => {
    my_context.message.text = "tiktok.app"
    return verificationController.handle(my_context).then(data => {
      expect(data.malicious).toBe(true)
    })
  })
})