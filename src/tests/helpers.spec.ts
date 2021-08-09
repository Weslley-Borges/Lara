import { send_response } from "../helpers"
import { TaskLogger } from "../helpers/profiler"


describe('Sender', () => {
  test('Should return the types of response.', () => {
    let result = send_response("", ["er", "erer"], true)
    expect(result).toBe("Is a array of strings")

    result = send_response("", [{text: "Oi"}], true)
    expect(result).toBe("Is a array of messages")
  })
})

describe('TaskLogger', () => {
  test('Should return a log.', () => {
    const result = new TaskLogger().logStep('⚙️','Test', 'TEST', `Testando`, true)
    expect(result).toBe(`[⚙️] - Test TEST Testando`)
  })
})