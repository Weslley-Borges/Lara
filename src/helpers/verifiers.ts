import { Context } from 'grammy'


export async function is_adm(ctx:Context, adm_id:number): Promise<boolean> {
  const adms = await ctx.getChatAdministrators()
  return adms.filter(adm => adm.user.id === adm_id)[0] != null 
}