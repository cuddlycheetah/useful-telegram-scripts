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
	await getAnimations()
}

async function getAnimations() {
	let res = await airgram.api.getSavedAnimations()
	require('fs').writeFileSync(`animations${ new Date().valueOf() }.json`, JSON.stringify(res.response.animations, null, true))
	for (let animation of res.response.animations) {
		console.log(animation.animation.remote.id)
		let r = await airgram.api.removeSavedAnimation({ animation: { _: 'inputFileRemote', id: animation.animation.remote.id } })
		console.log(r)
	}
	if (res.response.animations.length > 0) {
		setTimeout(getAnimations, 6000)
	} else {
        console.log('entweder isser fertig, oder die telegram api spackt rum')
    }
}
main()
