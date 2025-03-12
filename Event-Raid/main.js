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

async function sendMessage(msg, data) {
  //This Function works, you need select the channel
  try {
    const { Channel, Message } = fieldData;
    if(Message == ""){
      Message = msg;
    }
    else{
      const {
        amount,
        name
      } = data;

      Message.replaceAll("$amount", amount).replaceAll("$name", name);
    }
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
    const msg = `¡Gracias @${name} por la raid de ${amount} Personas! Bienvenidos al canal! 🎉 Siganlo todos! https://www.twitch.tv/${name}`;

    //Here Send the message
    sendMessage(msg, data);
  }
});


window.addEventListener('onWidgetLoad', function (obj) {
  if (!obj.detail.fieldData) {
      return;
  }
  fieldData = obj.detail.fieldData;
});