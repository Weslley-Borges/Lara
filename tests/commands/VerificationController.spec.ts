import { verificationController } from '@services'
import { context } from '@temp/data/context'
import { Context } from 'telegraf'


describe('Verification System', () => {
  const myContext = context as Context


  test('Should return false for "malicious"', async () => {
    if (myContext.message)
      if(('text' in myContext.message))
        myContext.message.text = 'Eae'

    const data = await verificationController.handle(myContext, 'text')
    expect(data.malicious).toBe(false)
  })

  test('Should return true for "malicious"', async () => {
    if (myContext.message)
      if(('text' in myContext.message))
        myContext.message.text = 'https://www.tiktok.com'

    const data = await verificationController.handle(myContext, 'text')
    expect(data.malicious).toBe(true)
  })
})