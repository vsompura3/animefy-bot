import { Context } from 'telegraf'
import { SubpleaseAnimeResponse } from '../types/types.js'
import { sleep } from './helper.js'
import { recentAnimes } from './recentAnimes.js'

async function Handler(ctx: Context, editMessageId: number) {
  const res: SubpleaseAnimeResponse | null = await recentAnimes()

  if (res === null) {
    ctx.telegram.editMessageText(
      ctx!.chat?.id,
      editMessageId,
      undefined,
      'Result not found.',
    )
    return
  }
  let msg: string = ''
  for (const key in res) {
    if (res.hasOwnProperty(key)) {
      const dataObj = res[key]
      console.log(dataObj)
      msg += `\n============ ${dataObj.time} Episode ============\n*${dataObj.show}*\nEpisode: [${dataObj.episode}]\nDownload Links: `
      for (let idx in dataObj.downloads) {
        msg += `[${dataObj.downloads[idx].res}p](http://www.example.com/) \t\t`
      }
      msg += `\nRelease Date: ${new Date(
        dataObj.release_date,
      ).toLocaleDateString('en-GB')}\n`
      await sleep(200)
      ctx.telegram.editMessageText(
        ctx!.chat?.id,
        editMessageId,
        undefined,
        msg,
        {
          parse_mode: 'Markdown',
        },
      )
    }
  }
}

export { Handler }
