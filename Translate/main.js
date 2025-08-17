/**
 * @author SerezDev
 * @link https://www.serez.dev/
 * @linkcode https://github.com/Sergio3215/Custom-Widget-StreamElement/tree/main/Event-Raid
 * @description An development for event hen stream has a raid, you need add to SerezDevBot as moderator
 */


let fieldData;

const ignoredBot = (ArrBot, displayName) => {

    //ignore the bots messages
    let ArrBotLabel = (ArrBot != '') ? ArrBot.toLowerCase().split(',')
        :
        ArrBot.toLowerCase().split('');

    let isBot = false;

    ArrBotLabel.map(arr => {
        if (arr.toLowerCase().trim() == displayName.toLowerCase().trim()) {
            isBot = true;
        }
    });

    return isBot
}

const filterEmote = (text, emotes = []) => {
    if (!emotes?.length) return text;

    // 1) Escapar nombres para que se interpreten literalmente en regex
    const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // 2) Armar el patrón alternado con nombres únicos y válidos
    const pattern = [...new Set(emotes.map(e => e?.name).filter(Boolean))]
        .map(esc)
        .join("|");
    if (!pattern) return text;

    // 3) Borrar los emotes como “tokens” y no dentro de otras palabras
    return text
        .replace(new RegExp(`(^|\\s)(?:${pattern})(?=\\s|$|[.,!?;:])`, "gu"), "$1")
        .replace(/\s{2,}/g, " ")          // 4) Colapsar espacios repetidos
        .replace(/\s+([.,!?;:])/g, "$1")  // 5) Quitar espacio antes de puntuación
        .trim();                          // 6) Limpiar extremos
};


/**
 * 
 * @param {string} msg Message to show in the chat of stream
 */

async function sendMessage(obj) {
    const { Channel, ArrayBots, FilterEmote } = fieldData;
    const data = obj.detail.event.data;
    const { text, displayName, emotes } = data;

    // if(displayName.toLowerCase() == "serezdevbot" || displayName.toLowerCase() == "nightbot" || displayName.toLowerCase() == "streamelements"){
    //     return
    // }

    let isBot = ignoredBot(ArrayBots, displayName);

    //This Function works, you need select the channel
    try {
        // console.log(isBot)
        if (isBot) {
            throw new Error('Es bot')
        }

        // console.log(isBot)

        let txt = text;

        if (FilterEmote) {
            txt = filterEmote(text, emotes);

            if (txt == "") {
                return;
            }
        }


        const ftch = await fetch('https://tts-api-prod.up.railway.app/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: txt
            })
        });
        const data = await ftch.json();


        if (data.skip) {
            throw new Error('skip')
        }

        console.log(data.message)

        const ftch1 = await fetch('https://service-events-twitch-production.up.railway.app/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                channel: Channel,
                message: data.message
            })
        });

        // console.log(await ftch);
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('onEventReceived', async function (obj) {
    const data = obj.detail.event;
    if (obj.detail.listener == "message") {

        //Here Send the message
        sendMessage(obj);
    }
});


window.addEventListener('onWidgetLoad', function (obj) {
    if (!obj.detail.fieldData) {
        return;
    }
    fieldData = obj.detail.fieldData;
});