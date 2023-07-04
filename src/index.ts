import dotenv from 'dotenv'
// import Telegraph from 'telegra.ph'
import { Context, Telegraf } from 'telegraf'
import { helpCommands, welcomeMessage } from './constants/constant.js'
import { Handler } from './utils/handler.js'

dotenv.config()

const bot: Telegraf<Context> = new Telegraf(process.env.BOT_TOKEN as string)
// client
//   .createAccount()
//   .then((account: any) => {
//     client.token = account.access_token
//     return client.getPageList()
//   })
//   .then((pages: any) => console.log(pages))

// fetch(
//   `https://api.telegra.ph/createPage?access_token=d3b25feccb89e508a9114afb82aa421fe2a9712b963b387cc5ad71e58722&title=Sample+Page&author_name=Anonymous&content=[{"tag":"p","children":["Hello,+world!"]}]&return_content=true`,
// )

// client.createAccount().then((account: any) => {
//   client.token = process.env.BOT_TOKEN
//   return client.getPageList()
// })
// bot.use((ctx, next): Promise<void> => {
//   console.log('Recieved a message', ctx?.message)
//   return next()
// })
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
  Handler(ctx, sentMsg.message_id)
})

// bot.command('recent', async ctx => {

//   ctx.telegram.sendMessage(ctx.message.chat.id, await recentAnimes(), {
//     reply_to_message_id: ctx.message.message_id,
//     parse_mode: 'MarkdownV2',
//   })
// })

bot.launch()
