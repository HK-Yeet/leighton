module.exports = (client, hkandler) => {
    client.on("event", () => {
        try {

        const YouTubeNotifier = require('youtube-notification');
 
const notifier = new YouTubeNotifier({
  hubCallback: 'https://www.youtube.com/channel/UCZlXePc6EdWaXqXKpVh5zpg',
  port: 8080,
  secret: 'Something',
  path: '/youtube'
});
notifier.setup();
 
notifier.on('notified', data => {
  console.log('New Video');
  console.log(
    `${data.channel.name} just uploaded a new video titled: ${data.video.title}`
  );
});
 

        } catch (error) {
            console.log(error)
        }

})
}
