import { verificationController } from '@services'
import { context } from '@temp/data/context'
import { Context } from 'telegraf'


describe('Verification System', () => {
  const myContext = context

  test('Should return false for \'malicious\'', async () => {
    myContext.message.text = 'Eae'
    const data = await verificationController.handle(myContext as Context)
    expect(data.malicious).toBe(false)
  })

  test('Should return true for \'malicious\'', async () => {
    myContext.message.text = 'tiktok.app'
    const data = await verificationController.handle(myContext as Context)
    expect(data.malicious).toBe(true)
  })
})