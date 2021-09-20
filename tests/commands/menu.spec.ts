import { context } from '@temp/data/context'
import { commandController } from '@services'


describe('Menu Command', () => {

  test('Should return a "Response.Message" response.', () => {
    
    context.message.text = '!menu'
    console.log(commandController.handle(context))
    return commandController.handle(context).then(data => {
      expect(data).toEqual([{text:'🤔 Ue, esse comando não existe no meu sistema.'}])
    })
  })
})