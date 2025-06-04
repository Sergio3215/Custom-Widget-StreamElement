let fieldData, queue = [];
let play = false;

const ruletaValorant = async (Channel) => {
    const valkorantCharacters = [
        ["Sunset", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/5101e4ee241fbfca261bf8150230236c46c8b991-3840x2160.png?auto=format&fit=fill&q=80&w=1504"],
        ["Lotus", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/67d199e0f7108bc60e8293d3f9a37538b0b55b11-3840x2160.png?auto=format&fit=fill&q=80&w=1504"],
        ["Pearl", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/7ba5df090f5efee7988d8d33f4b43c3441cb1aab-3840x2160.png?auto=format&fit=fill&q=80&w=1504"],
        ["Fracture", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/983a6d66978aabd3ccd4e51517298d9a0b5467d9-3840x2160.png?auto=format&fit=fill&q=80&w=1504"],
        ["Breeze", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/a4a0374222f9cc79f97e03dbb1122056e794176a-3840x2160.png?auto=format&fit=fill&q=80&w=1504"],
        ["Ice Box", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/72853f583a0f6b25aed54870531756483a7b61de-3840x2160.png?auto=format&fit=fill&q=80&w=1504"],
        ["Bind", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/7df1e6ee284810ef0cbf8db369c214a8cbf6578c-3840x2160.png?auto=format&fit=fill&q=80&w=1504"],
        ["Haven", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/bccc7b5f8647a4f654d4bb359247bce6e82c77ab-3840x2160.png?auto=format&fit=fill&q=80&w=1504"],
        ["Split", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/878d51688c0f9dd0de827162e80c40811668e0c6-3840x2160.png?auto=format&fit=fill&q=80&w=1504"],
        ["Ascent", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/5cb7e65c04a489eccd725ce693fdc11e99982e10-3840x2160.png?auto=format&fit=fill&q=80&w=1504"]
    ]

    const randomIndex = Math.floor(Math.random() * valkorantCharacters.length);
    const randomCharacter = valkorantCharacters[randomIndex][0];
    const randomCharacterImage = valkorantCharacters[randomIndex][1];

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

    setQueue(randomCharacter, randomCharacterImage);

}

const setQueue = (randomCharacter, randomCharacterImage) => {
    queue.push([randomCharacter, randomCharacterImage]);
    endQueue();
}

const endQueue = () => {
    if (queue.length > 0) {
        showImages(queue[0][0], queue[0][1]);
        play = true;
        queue.shift();
        endQueue();
    }
    else {
        play = false;
        setTimeout(() => {
            const main = document.querySelector('.main-container');
            main.innerHTML = '';
        }, 5000);
    }
}

const showImages = (randomCharacter, randomCharacterImage) => {
    // console.log(randomCharacter, randomCharacterImage);

    const main = document.querySelector('.main-container');

    let counter = 500;

    if(play){
        counter = 3500;
    }


    setTimeout(() => {
        main.innerHTML = `
        <div class="character-container">
            <img src="${randomCharacterImage}" alt="${randomCharacter}" class="character-image">
            <p class="character-name">${randomCharacter}</p>
        </div>
    `;
    }, counter);

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
        command_ = '!ruletaMP';
    }

    if (listener === 'message') {
        if (data.text.toLowerCase() == command_.toLowerCase()) {
            ruletaValorant(Channel);
        }
    }
});


window.addEventListener('onWidgetLoad', function (obj) {
    fieldData = obj.detail.fieldData;
})