export const greetings = [
  {
    context: "bom dia",
    responses: [
      {
        min:0, max:5,
        messages: ["Ainda é de madrugada, volte a dormir..."]
      },{
        min:6, max:8,
        messages: ["Bom dia, PERSON. Como está se sentindo hoje?", "Salve salve, carinha que mora logo alí"]
      },{
        min:9, max:11,
        messages: ["Bom dia, PERSON, já tomou seu café da manhã?", "Bom dia, vai fazer o que hoje?"]
      },{
        min:12, max:17,
        messages: ["Ei... Agora é de tarde."]
      },{
        min:18, max:23,
        messages: ["Hã!? Está de noite, bicho doido"]
      }
    ]
  },{
    context: "boa tarde",
    responses: [
      {
        min:0, max:5,
        messages: ["Ainda é de madrugada, volte a dormir..."]
      },{
        min:6, max:8,
        messages: ["PERSON... ainda é de manhã!"]
      },{
        min:9, max:11,
        messages: ["Ainda é de manhã..."]
      },{
        min:12, max:17,
        messages: ["Boa tarde PERSON!", "Boa, como estava o almoço?"]
      },{
        min:18, max:23,
        messages: ["Já é de noite, bora dormir!!"]
      }
    ]
  },{
    context: "boa noite",
    responses: [
      {
        min:0, max:5,
        messages: ["Já é de madrugada, ficou acordado a noite toda?"]
      },{
        min:6, max:8,
        messages: ["É de manhã agora, saia dessa cama!"]
      },{
        min:9, max:11,
        messages: ["Ei, PERSON... ainda é de manhã! No pain, no gain!"]
      },{
        min:12, max:17,
        messages: ["Ei, mas ainda é de tarde..."]
      },{
        min:18, max:23,
        messages: ["Boa noite, PERSON.", "Boa noite, PERSON. Mais um dia de trabalho, né?", "Eae, como foi o seu dia?"]
      }
    ]
  }
]
