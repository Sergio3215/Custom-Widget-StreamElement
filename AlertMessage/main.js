let fieldData;

const showNotification = async (displayName) => {
    try {

        const { sounds, volume, bots } = fieldData;

        let isBot = false;
        bots.split(',').forEach(bot => {
            if (displayName.toLowerCase() === bot.trim().toLowerCase()) {
                isBot = true;
            }
        })

        if (!isBot) {
            const ftch = await fetch("https://api-notification-tw-production.up.railway.app/api/notification?id=" + sounds);

            const res = await ftch.json();

            console.log(res)

            if (res) {
                let myAudio = new Audio();
                myAudio.src = `data:audio/mp3;base64,${res.audio}`;
                myAudio.volume = volume;
                myAudio.play();
            }

        }
    } catch (error) {
        console.error("Error fetching notification sound:", error);
    }

}

window.addEventListener('onEventReceived', async function (obj) {

    if (!obj.detail.event) {
        return;
    }

    const { displayName } = obj.detail.event.data

    if (obj.detail.listener == "message") {
        showNotification(displayName);
    }
});

window.addEventListener('onWidgetLoad', function (obj) {

    if (!obj.detail.fieldData) {
        return;
    }

    fieldData = obj.detail.fieldData;
});