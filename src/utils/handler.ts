import { Context } from 'telegraf'
import { SubpleaseAnimeResponse } from '../types/types.js'
import { recentAnimes } from './recentAnimes.js'

async function Handler(ctx: Context, editMessageId: number) {
  const res: SubpleaseAnimeResponse | null = await recentAnimes()
  console.log(res?.downloads)
  return
  if (res === null) {
    ctx.telegram.editMessageText(
      ctx.chat?.id,
      editMessageId,
      undefined,
      'Result not found.',
    )
    return
  }
  // let msg: string = ''
  // for (const key in res) {
  //   if (res.hasOwnProperty(key)) {
  //     let x = res[key as keyof SubpleaseAnimeResponse]
  //   }
  //   break
  // }
}

export { Handler }
