let fieldData;

const SendMessage = async (Channel, msg) => {
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
}

const sendQueue = async (objMessage, objNick) => {

    const { text, displayName } = objMessage;

    let isBot = false;

    const { everybodyBotFilters } = fieldData;

    let ArrBotLabel = (everybodyBotFilters != '') ? everybodyBotFilters.toLowerCase().split(',')
        :
        everybodyBotFilters.toLowerCase().split('');

    ArrBotLabel.forEach(element => {
        if (element.toLowerCase() == displayName.toLowerCase()) {
            isBot = true;
        }
    });

    if (text.includes(fieldData.Command) && !isBot) {
        try {

            setTimeout(() => {

            }, 2000);


            const track = text.split(fieldData.Command)[1];

            const ftch = await fetch(`https://sound-request-spotify-production.up.railway.app/change-track?track=${track.trim()}&token=${fieldData.Token}&refreshToken=${fieldData.RefreshToken}`, {
                method: 'GET',
            });

            const messageText = await ftch.text();

            SendMessage(fieldData.Channel, messageText);

        } catch (error) {
            SendMessage(fieldData.Channel, "Token vencido o cancion invalido");
        }

        if (fieldData.Channel == "serezdev" || fieldData.Channel == "SerezDev") {
            let ftch1 = await fetch('https://dj-point-production.up.railway.app/point', {
                method: 'POST',
                body: JSON.stringify({
                    user: objNick
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // let status = await ftch1.json();

            SendMessage(fieldData.Channel, `${objNick} ha recibido 5 puntos`);
        }
    }
}

window.addEventListener('onEventReceived', async function (obj) {

    if (!obj.detail.event) {
        return;
    }

    // console.log(obj.detail);

    if (obj.detail.listener == "message") {
        sendQueue(obj.detail.event.data, obj.detail.event.data.nick);
    }
});

window.addEventListener('onWidgetLoad', function (obj) {
    if (!obj.detail.fieldData) {
        return;
    }
    fieldData = obj.detail.fieldData;
});