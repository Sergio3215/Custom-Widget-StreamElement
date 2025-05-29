let fieldData;

const ruletaValorant = async (Channel) => {
    const valkorantCharacters = [
        "Jett",
        "Phoenix",
        "Sage",
        "Sova",
        "Cypher",
        "Gekko",
        "Omen",
        "Breach",
        "Harbor",
        "Iso",
        "KillJoy",
        "Neon",
        "Raze",
        "Reyna",
        "Skye",
        "Kay/o",
        "Chamber",
        "Yoru",
        "Vyse",
        "Viper",
        "Astra",
        "Brimstone",
        "Tejo",
        "Dead Lock",
        "Clove",
        "Fade",
        "WayLay"
    ]

    const randomIndex = Math.floor(Math.random() * valkorantCharacters.length);
    const randomCharacter = valkorantCharacters[randomIndex];

    if (Channel == "" || Channel == "Your-Channel") {
        return;
    }

    const ftch = await fetch('https://service-events-twitch-production.up.railway.app/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            channel: Channel,
            message: randomCharacter
        })
    });
}

window.addEventListener('onEventReceived', function (obj) {
    if (!obj.detail.event) {
        return;
    }
    const detail = obj.detail;
    const listener = detail.listener.split("-")[0];
    const event = detail.event;
    const data = event.data;

    const { Channel, Command } = fieldData;

    let command_ = Command.toLowerCase();

    if (command_ == '') {
        command_ = '!ruleta';
    }

    if (listener === 'message') {
        if (data.text == command_) {
            ruletaValorant(Channel);
        }
    }
});


window.addEventListener('onWidgetLoad', function (obj) {
    fieldData = obj.detail.fieldData;
})