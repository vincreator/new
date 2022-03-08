import dotenv from 'dotenv'
dotenv.config()

import connectToMongo    from './db/connect'
import { createAccount } from './lib/telegraph'
import setupBot          from './bot/index'
import startWithWebhook  from './express'
import werror            from './lib/error'

(async() => {
    if (!process.env.TELEGRAPH_TOKEN) {
        process.env.TELEGRAPH_TOKEN = await createAccount()
    }
    if (!process.env.BOT_TOKEN) {
        throw new Error('Bot token ilang')
    }
    if (!process.env.DATABASE_URL) {
        throw new Error('Database ilang')
    }

    await connectToMongo(process.env.DATABASE_URL, process.env.DATABASE_URL
        const bot = await setupBot(process.env.BOT_TOKEN)
        
        if (process.env.REPL_OWNER && process.env.REPL_SLUG //reply
            || process.env.HEROKU_APP_NAME                  //HEROKU
            || process.env.PROJECT_NAME                     //GLITCH

    ){
        let webhookurl: string | undefined
        if (process.env.HEROKU_APP_NAME) {
			webhookUrl = `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
		} else if (process.env.PROJECT_NAME) {
			webhookUrl = `https://${process.env.PROJECT_NAME}.glitch.me`
		} else {
			webhookUrl = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER?.toLowerCase()}.repl.co`
		}
		try {
			await startWithWebhook(bot, webhookUrl)
		} catch (error) {
			throw new Werror(error, 'Starting bot with webhook')
		}
		console.log('Bot is started webhook!')
	} else {
		await bot.launch({ dropPendingUpdates: true })
		console.log('Bot is started polling!')
	}
})()