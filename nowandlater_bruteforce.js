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
function pad(n, width, z) {
	z = z || '0'
	n = n + ''
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}  

async function main() {
	console.time('100Sets')
	await bruteForceSticker('Teerath', false)
}
let stickerId = 0 // change this to the last stickerId, when resuming a bf
async function bruteForceSticker(name, expansion, id) {
	id = id || '00000'
	const identifier = `${name}${ pad(stickerId + 10000, 5, '0') }N${expansion ? ' ' : 'a'}L`
	let res = await airgram.api.searchStickerSet({ name: identifier })
	if (res.response._ == 'stickerSet'){
		console.log(res.response)
		process.exit(1)
	}
	stickerId++
	if (stickerId % 100 === 0) {
		console.timeEnd('100Sets')
		console.log(identifier, stickerId)
		console.time('100Sets')
	}
	if (res.response._ == 'error') {
		if (res.response.message === 'STICKERSET_INVALID')
			return setTimeout(bruteForceSticker, 10, name, expansion)
		console.log(res.response)
	}
}
main()
