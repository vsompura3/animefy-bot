import { Context } from 'telegraf'
import { author, botName } from '../constants/constant.js'
import { SubpleaseAnimeResponse } from '../types/types.js'
import { sleep } from './helper.js'
import { searchAnimes } from './searchAnimes.js'

async function searchHandler(
  ctx: Context,
  editMessageId: number,
): Promise<void> {
  let telegraph_access_token: string = ''
  await fetch(
    `https://api.telegra.ph/createAccount?short_name=${botName}&author_name=${botName}}`,
  )
    .then(res => res.json())
    .then(data => (telegraph_access_token = data.result.access_token))

  const res: SubpleaseAnimeResponse | null = await searchAnimes(
    // ctx.message?.text?.split(' ').slice(1).join(' '),
    'One Piece',
  )

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
      console.log(dataObj) //! Remove this
    }
  }
}

export { searchHandler }
