import { send_response } from "../helpers"


describe('Sender', () => {
  test('Should return the types of response', () => {
    let result = send_response("", ["er", "erer"], true)
    expect(result).toBe("Is a array of strings")
    result = send_response("", [{text: "Oi"}], true)
    expect(result).toBe("Is a array of messages")
  })
})