import Telegraph from 'telegra.ph'
import { Context } from 'telegraf'
import { author, botName } from '../constants/constant.js'
import { SubpleaseAnimeResponse } from '../types/types.js'
import { sleep } from './helper.js'
import { recentAnimes } from './recentAnimes.js'

async function Handler(ctx: Context, editMessageId: number) {
  let telegraph_access_token: string = ''
  await fetch(
    `https://api.telegra.ph/createAccount?short_name=${botName}&author_name=${botName}}`,
  )
    .then(res => res.json())
    .then(data => (telegraph_access_token = data.result.access_token))

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
      console.log(telegraph_access_token)
      msg += `\n============ ${dataObj.time} Episode ============\n*${dataObj.show}*\nEpisode: [${dataObj.episode}]\nDownload Links: `
      for (let idx in dataObj.downloads) {
        let magnetURL: string = 'https://github.com/vsompura3/animefy-bot'
        await fetch(
          `https://api.telegra.ph/createPage?access_token=${telegraph_access_token}&title=${
            dataObj.show +
            ' ' +
            dataObj.episode +
            ' ' +
            dataObj.downloads[idx].res
          }
        }&author_name=${
          botName + ' - ' + author
        }&content=[{"tag":"a","attrs":{ "href":"https://github.com"},"children":["Nakamura"]}]&return_content=true`,
        )
          .then(res => res.json())
          .then(data => {
            console.log(data)
            magnetURL = data.result.url
            msg += `[${dataObj.downloads[idx].res}p](${magnetURL}) \t\t`
          })
        await sleep(100)
      }
      msg += `\nRelease Date: ${new Date(
        dataObj.release_date,
      ).toLocaleDateString('en-GB')}\n`
      await sleep(500)
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
