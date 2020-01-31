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

let targetChat = -10099999999
const myself = 9999999999

async function main() {
	let chatInfos = await airgram.api.searchPublicChats({
		query: 'Chatname',
	})
	console.log(JSON.stringify(chatInfos.response, null, '\t'))
	targetChat = chatInfos.response.chatIds[0]
	let chatInfo = await airgram.api.getChat({ chatId: targetChat })
	console.log(chatInfo.response)

	await importChat(-10099999999)
}
async function handleMessage(message) {
	//if (!message.isOutgoing) return
	if (message.senderUserId == myself) {
		console.log(message)
	}
}
async function importChat(chatId, offset) {
    let history = await airgram.api.searchChatMessages({
	query: '',
        chatId: chatId,
	senderUserId: myself,
        limit: !!offset ? 100 : 1,
        fromMessageId: offset || 0
    })
    let messages = history.response.messages
    let lastMessageID
    let toDelete = []
    for (let message of messages) {
        if (message.canBeDeletedForAllUsers) toDelete.push(message.id)
        console.log(message.content)
//        await handleMessage(message)
        lastMessageID = message.id
    }
    let deleteREsponse = await airgram.api.deleteMessages({
       chatId: chatId,
	messageIds: toDelete,
	revoke: true,
   })
   console.log(deleteREsponse)
    if (!!lastMessageID) {
        setTimeout(importChat, 500, chatId, lastMessageID)
    }
}
//airgram.on('updateNewMessage', async ({update}) => {
//	console.log(update)
//})

main()
