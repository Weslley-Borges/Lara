import { chatController } from '@services'
import { context } from '@temp/data/context'


describe('Chat System', () => {
  const myContext = context

  test('[ChatRepository] - Should return a array of responses', async () => {
    myContext.message.text = 'Bom dia'
    let result = await chatController.handle(myContext)
    expect(result[0].text != '').toBeTruthy()

    myContext.message.text = 'oi'
    result = await chatController.handle(myContext)
    expect(result[0].text != '').toBeTruthy()
  })

  test('[ChatRepository] - Should return a array with a default message', async () => {
    myContext.message.text = '_____________'
    const result = await chatController.handle(myContext)
    expect(result[0].text == '').toBeTruthy()
  })
})