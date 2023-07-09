import dotenv from 'dotenv'
// import Telegraph from 'telegra.ph'
import { Context, Telegraf } from 'telegraf'
import { helpCommands, welcomeMessage } from './constants/constant.js'
import { recentHandler } from './utils/recentHandler.js'
import { searchHandler } from './utils/searchHandler.js'

dotenv.config()

const bot: Telegraf<Context> = new Telegraf(process.env.BOT_TOKEN as string)

bot.use((ctx, next): Promise<void> => {
  console.log('Recieved a message', ctx?.message)
  return next()
})

bot.command('start', ctx => {
  ctx.telegram.sendMessage(ctx.message.chat.id, welcomeMessage, {
    reply_to_message_id: ctx.message.message_id,
    parse_mode: 'MarkdownV2',
  })
})

bot.command('help', ctx => {
  ctx.telegram.sendMessage(ctx.message.chat.id, helpCommands, {
    reply_to_message_id: ctx.message.message_id,
    parse_mode: 'MarkdownV2',
  })
})

bot.command('recent', async ctx => {
  let sentMsg: any = await ctx.telegram.sendMessage(
    ctx.message.chat.id,
    '*_Fetching_*',
    {
      reply_to_message_id: ctx.message.message_id,
      parse_mode: 'MarkdownV2',
    },
  )
  console.log(sentMsg) //! Remove this
  recentHandler(ctx, sentMsg.message_id)
})

// bot.command('recent', async ctx => {

//   ctx.telegram.sendMessage(ctx.message.chat.id, await recentAnimes(), {
//     reply_to_message_id: ctx.message.message_id,
//     parse_mode: 'MarkdownV2',
//   })
// })

bot.command('search', async ctx => {
  let sentMsg: any = await ctx.telegram.sendMessage(
    ctx.message.chat.id,
    '*_Searching_*',
    {
      reply_to_message_id: ctx.message.message_id,
      parse_mode: 'MarkdownV2',
    },
  )
  console.log(sentMsg) //! Remove this
  searchHandler(ctx, sentMsg.message_id)
})

bot.launch()
