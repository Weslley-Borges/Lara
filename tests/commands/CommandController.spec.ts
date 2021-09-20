import { commandController } from '@services'
import { context } from '@temp/data/context'


describe('Command System', () => {
  const myContext = context

  test('Should return the inexistence of the command', () => {
    myContext.message.text = '!command'
    return commandController.handle(myContext).then(data => {
      expect(data).toEqual([{text:'🤔 Ue, esse comando não existe no meu sistema.'}])
    })
  })

  test('Should return the result of command', () => {
    myContext.message.text = '!menu'
    return commandController.handle(myContext).then(data => {
      expect(data).not.toEqual([{text:'🤔 Ue, esse comando não existe no meu sistema.'}])
    })
  })
})