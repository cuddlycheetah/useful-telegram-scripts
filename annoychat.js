const { Airgram, Auth, prompt, toObject } = require( 'airgram' )
const airgram = new Airgram({
  apiId: 925988,
  apiHash: '8e6cde8b8bb82334fd4cdbbebc376128',
  useChatInfoDatabase: true,
  databaseDirectory: './db/',
})

airgram.use(new Auth({
  code: () => prompt(`Please enter the secret code:\n`),
  phoneNumber: () => prompt(`Please enter your phone number:\n`),
  password: () => prompt(`Please enter your pw:\n`)
}))

const myself = 99999999

async function main() {
	let chatInfos = await airgram.api.searchChatsOnServer({
		query: 'Chat Name',limit:100,
	})
	console.log(JSON.stringify(chatInfos.response, null, '\t'))

	let targetChat = chatInfos.response.chatIds[0] //.substring(4)
//	targetChat = targetChat.toString().substring(4)
//	targetChat = parseInt(targetChat)

	let chatInfo = await airgram.api.getChat({ chatId: targetChat }) //await airgram.api.getSupergroup({ supergroupId: targetChat })
	console.log(chatInfo.response)

	setInterval(async () => {
		let res = await airgram.api.sendChatAction({
			chatId: targetChat, //-1001494805324, //targetChat,
			//action: { _: 'chatActionTyping' } //
			action: { _ : 'chatActionStartPlayingGame' }
		})
        console.log(res.response)
	}, 1500)
}

main()
