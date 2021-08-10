import { verificationController } from "./"
import { context } from "@temp/data/context"


describe('ChatController', () => {
  test('The "malicious" should be false', async () => {
    const response = await verificationController.handle(context)
    console.log(response)
    expect(response).toBe(1)
  })
})