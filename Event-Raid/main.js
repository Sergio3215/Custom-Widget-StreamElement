/**
 * @author SerezDev
 * @link https://www.serez.dev/
 * @linkcode https://github.com/Sergio3215/Custom-Widget-StreamElement/tree/main/Event-Raid
 * @description An development for event hen stream has a raid
*/


/**
 * 
 * @param {string} msg Message to show in the chat of stream
 */
async function sendMessage(msg) {
  try {
    const ftch = await fetch('https://service-events-twitch-production.up.railway.app/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identity: {
          username: "Your-Channel",
          password: "Your-Oauth-Token"
        },
        channel: "Your-Channel",
        message: msg
      })
    });

    // console.log(await ftch);
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('onEventReceived', async function (obj) {
  const data = obj.detail.event;
  if (obj.detail.listener == "raid-latest") {
    const {
      amount,
      name
    } = data;

    const msg = `¡Gracias @${name} por la raid de ${amount == 1? ` 1 persona`: `${amount} Personas`}! ${amount == 1? `Bienvenido`: `Bienvenidos`} al canal! 🎉 Siganlo todos! https://www.twitch.tv/${name}`;
    sendMessage(msg);
    // console.log(msg);
    // console.log("es una raid")
  }
});