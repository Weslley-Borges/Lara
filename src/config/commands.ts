import { Command } from "@dtos";


export const commands: Command.Profile[] = [
  {
    name: "menu", 
    path: "menu", 
    status: "COMMON",
    emoji: "📊",
    description: "Mostra os comandos", 
    about: "Mostra os comandos do bot, dependendo do tipo de chat", 
    arguments: [],
  },
  {
    name: "ban", 
    path: "moderate", 
    status: "ADM",
    emoji: "❌",
    description: "Bane um membro", 
    about: 
      "Bane um membro do grupo\n"+
      "✅ Responda uma mensagem do membro que quer expulsar usando o comando.", 
    arguments: [],
  }
  // SPOILERS, hehe
  // {
  //   name: "google", 
  //   path: "search", 
  //   emoji: "🔎",
  //   status: "COMMON"
  //   description: "Pesquisa no Google", 
  //   about:
  //     "Faz uma pesquisa por conteúdos no Google\n\n"+
  //     "<b>MÉTODOS DISPONÍVEIS</b>:\n"+
  //     "✅ -all (Google e Google News)\n"+
  //     "✅ -news\n"+
  //     "✅ -pdf\n"+
  //     "<u>(Para fazer uma pesquisa comum, não precisa de um parâmetro)</u>\n\n"+
  //     "<b>Exemplo 1:</b> !google como comprar os produtor Ivone\n"+
  //     "<b>Exemplo 2:</b> !google -news vendas dos produtos Ivone\n"+
  //     "<b>Exemplo 3:</b> !google -pdf A Arte da Guerra\n\n"+
  //     "<u>|Dicas para melhorar a eficiência da pesquisa|</u>\n"+
  //     "✅ Coloque as frases entre aspas ('') para obter a correspondência exata\n"+
  //     "✅ Anexe palavras ou frases que devem aparecer com um símbolo +.\n"+
  //     "Ex: +bitcoin\n\n"+
  //     "✅ Anexe palavras que não devem aparecer com um símbolo -\n"+
  //     "Ex: -bitcoin\n\n"+
  //     "✅ Alternativamente, você pode usar as palavras-chave AND / OR / NOT e, opcionalmente, agrupá-las com parênteses.\n"+
  //     "Ex: crypto AND (ethereum OR litecoin) NOT bitcoin.", 
  //   arguments: [
  //     {index: 0, error: "Você precisa colocar o que quer pesquisar"}
  //   ]
  // }
]