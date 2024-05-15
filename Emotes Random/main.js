let fieldData,
    apiToken,
    queue = [],
    play = false;

function endEmote() {
    queue.shift();
    if (queue.length > 0) {
        showEmotes(queue[0])
    }
    else {
        play = false;
    }
}

async function showEmotes(emote) {
    play = true;
    let emoteContainer = document.querySelector(".emoteContainer");
    emoteContainer.innerHTML = ``;
    emote.map((emo, index) => {
        emoteContainer.innerHTML += `<img src="${emo.urls[4]}"/>`;
    });

    let emoteIMG = document.querySelectorAll(`${emoteContainer.id} img`);
    // console.log(emoteIMG);
    let animation = ["efecto1", "efecto2", "efecto3", "efecto4"];
    let counter = 0;
    for (let ii = 0; ii < emoteIMG.length; ii++) {
        emoteIMG[ii].addEventListener("load", (e) => {
            e.target.className = animation[counter];
            console.log(e);
            //limite 950 x 720
            counter++;
            if (counter == 4) {
                counter = 0;
    
            }
        })

        //coldDown
        await ColdDown();
    }
}

async function ColdDown() {
    await setTimeout(() => {
        document.querySelector(".emoteContainer").innerHTML = "";
        endEmote();
    }, 4000);
 // }, 1000);
}


window.addEventListener('onEventReceived', function (obj) {
    if (!obj.detail.event) {
        return;
    }
    const detail = obj.detail;
    const listener = detail.listener.split("-")[0];
    const event = detail.event;
    const data = event.data;

    // console.log(data.emotes);

    if (data.emotes.length > 0) {

        if (play) {
            queue.push(data.emotes);
        }
        else {
            queue.push(data.emotes);
            showEmotes(data.emotes);
        }

    }

    if (listener === 'message') {

    }
});

window.addEventListener('onWidgetLoad', function (obj) {
    fieldData = obj.detail.fieldData;
    apiToken = obj.detail.channel.apiToken;
})