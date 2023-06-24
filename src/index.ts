import dotenv from 'dotenv'
import Telegraph from 'telegra.ph'
import { Context, Telegraf } from 'telegraf'
import { helpCommands, welcomeMessage } from './constants/constant.js'
import { Handler } from './utils/handler.js'

dotenv.config()

const bot: Telegraf<Context> = new Telegraf(process.env.BOT_TOKEN as string)

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
  // console.log(sentMsg)
  Handler(ctx, sentMsg.message_id)
})

// bot.command('recent', async ctx => {

//   ctx.telegram.sendMessage(ctx.message.chat.id, await recentAnimes(), {
//     reply_to_message_id: ctx.message.message_id,
//     parse_mode: 'MarkdownV2',
//   })
// })

bot.launch()
