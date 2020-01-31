const { Airgram, Auth, prompt, toObject } = require( 'airgram' )
const airgram = new Airgram({
  apiId: 925988,
  apiHash: '8e6cde8b8bb82334fd4cdbbebc376128',
  useChatInfoDatabase: true,
  databaseDirectory: './dbCuddlycheetah/',
})

airgram.use(new Auth({
  code: () => prompt(`Please enter the secret code:\n`),
  phoneNumber: () => prompt(`Please enter your phone number:\n`),
  password: () => prompt(`Please enter your pw:\n`)
}))


async function main() {
	let chatInfos = await airgram.api.searchChatsOnServer({
		query: 'Bastelfurs',limit:100,
	})
	console.log(JSON.stringify(chatInfos.response, null, '\t'))
	targetChat = chatInfos.response.chatIds[0]
	let chatInfo = await airgram.api.getChat({ chatId: targetChat })
	console.log(chatInfo.response)
}
main()
