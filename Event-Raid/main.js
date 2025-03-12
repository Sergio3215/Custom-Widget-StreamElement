/**
 * @author SerezDev
 * @link https://www.serez.dev/
 * @linkcode https://github.com/Sergio3215/Custom-Widget-StreamElement/tree/main/Event-Raid
 * @description An development for event hen stream has a raid, you need add to SerezDevBot as moderator
 */


let fieldData;

/**
 * 
 * @param {string} msg Message to show in the chat of stream
 */

async function sendMessage(msg) {
  //This Function works, you need select the channel
  try {
    const { Channel } = fieldData;
    const ftch = await fetch('https://service-events-twitch-production.up.railway.app/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channel: Channel,
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

    //Here Edit the message!
    const msg = `¡Gracias @${name} por la raid de ${amount == 1? ` 1 persona`: `${amount} Personas`}! ${amount == 1? `Bienvenido`: `Bienvenidos`} al canal! 🎉 Siganlo todos! https://www.twitch.tv/${name}`;

    //Here Send the message
    sendMessage(msg);
  }
});


window.addEventListener('onWidgetLoad', function (obj) {
  if (!obj.detail.fieldData) {
      return;
  }
  fieldData = obj.detail.fieldData;
});