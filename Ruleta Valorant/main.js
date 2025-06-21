let fieldData, queue = [];
let play = false;

const ruletaValorant = async (Channel, text, command_) => {
    const valorantCharacters = [
        ["Jett", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/d41286dc9017bf79c0b4d907b7a260c27b0adb69-616x822.png?auto=format&fit=fill&q=80&w=352", "Duelista"],
        ["Phoenix", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/47387e354c34d51b84066bc47af3c5755b92b9c5-616x822.png?auto=format&fit=fill&q=80&w=352", "Duelista"],
        ["Sage", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/58a180961a14beb631877921e647c233804853c1-616x822.png?auto=format&fit=fill&q=80&w=352", "Sentinela"],
        ["Sova", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/08b3d8822544bd327ebed0768c8b90fcec83d1a5-616x822.png?auto=format&fit=fill&q=80&w=352", "Iniciador"],
        ["Cypher", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/4a648cdbcbbeef137050deefeaf6a1369c606666-616x822.png?auto=format&fit=fill&q=80&w=352", "Sentinela"],
        ["Gekko", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/8d88f133f735f6a9077679b1ece754e5624c728e-616x822.png?auto=format&fit=fill&q=80&w=352", "Iniciador"],
        ["Omen", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/015a083717e9687de8a741cfceddb836775b5f9f-616x822.png?auto=format&fit=fill&q=80&w=352", "Controlador"],
        ["Breach", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/e435c3378b7999a3338b408dbb5da8ba63f91150-616x822.png?auto=format&fit=fill&q=80&w=352", "Iniciador"],
        ["Harbor", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/1246b5c517f6c8fa660e884a7032c1c54994003e-616x822.png?auto=format&fit=fill&q=80&w=352", "Controlador"],
        ["Iso", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/2c35cef9c38283f8478d1e808b1c129f371e50b3-616x822.png?auto=format&fit=fill&q=80&w=352", "Duelista"],
        ["KillJoy", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/820d36d431fff77b1e1ece39ad6f007746bd31f6-616x822.png?auto=format&fit=fill&q=80&w=352", "Sentinela"],
        ["Neon", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/14145d7bf9be17afa80c04ee4fbe200076cc1769-616x822.png?auto=format&fit=fill&q=80&w=352", "Duelista"],
        ["Raze", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/40b4b242b68afe30d21e7f95bdcacaebca46ea60-616x822.png?auto=format&fit=fill&q=80&w=352", "Duelista"],
        ["Reyna", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/7cb513c9b3eae3286449776e85753138436d553c-616x822.png?auto=format&fit=fill&q=80&w=352", "Duelista"],
        ["Skye", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/37ea1466beebb54aad4f16efbad184566cb80368-616x822.png?auto=format&fit=fill&q=80&w=352", "Iniciador"],
        ["Kay/o", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/fe52e0efac73ec782b19a54e98a4658b03677407-616x822.png?auto=format&fit=fill&q=80&w=352", "Iniciador"],
        ["Chamber", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/0f5b668b77499c0051201389d6ac5e7343c9727f-616x822.png?auto=format&fit=fill&q=80&w=352", "Sentinela"],
        ["Yoru", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/05e1a996814dd10d7179efee327d29a7be00e912-616x822.png?auto=format&fit=fill&q=80&w=352", "Duelista"],
        ["Vyse", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/370e4b820670ef0bac7e685f6e8c5e64d19f1890-587x900.png?auto=format&fit=fill&q=80&w=352", "Sentinela"],
        ["Viper", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/152244f121e61ca32bdd2bea9fc5370e315664fb-616x822.png?auto=format&fit=fill&q=80&w=352", "Controlador"],
        ["Astra", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/ba51d43803082941b0274b66413b0acc972546dd-616x822.png?auto=format&fit=fill&q=80&w=352", "Controlador"],
        ["Brimstone", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/51e62f3c74356a7501d06feba42ac643133257d7-616x822.png?auto=format&fit=fill&q=80&w=352", "Controlador"],
        ["Tejo", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/3413df9939de606a355c1f88fbfc35f0774c19c9-587x900.jpg?auto=format&fit=fill&q=80&w=352", "Iniciador"],
        ["Dead Lock", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/477284dfe402a85abcf6b07512bcd6f01c8fe60e-616x822.png?auto=format&fit=fill&q=80&w=352", "Sentinela"],
        ["Clove", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/9f02060077f9d61dbe89555a339e6231006d9b7b-616x822.png?auto=format&fit=fill&q=80&w=352", "Controlador"],
        ["Fade", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/e7099cc13a665ed2b556d514e50984393ed49967-616x822.png?auto=format&fit=fill&q=80&w=352", "Iniciador"],
        ["WayLay", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/11c2b158d932076d3215749a34b7b4209b48ce44-587x900.png?auto=format&fit=fill&q=80&w=352", "Duelista"]
    ];


    let randomIndex = Math.floor(Math.random() * valorantCharacters.length);
    let randomCharacter = valorantCharacters[randomIndex][0];
    let randomCharacterImage = valorantCharacters[randomIndex][1];

    if (Channel == "" || Channel == "Your-Channel") {
        return;
    }

    if (text.includes('--')) {

        let arrPj = [];


        valorantCharacters.map(pj => {
            arrPj.push({
                character: pj[0],
                image: pj[1],
                rol: pj[2].toLowerCase()
            })
        });


        const commandRol = rolManagment(text);

        if (commandRol) {
            let str = '';
            text.split(command_).map(r => {
                if (r.trim() !== '') {
                    str += r
                }
            });

            str = str.split('--')[1];
            const arrValoPj = arrPj.filter(pj => pj.rol == str.trim());

            randomIndex = Math.floor(Math.random() * arrValoPj.length);
            randomCharacter = arrValoPj[randomIndex].character;
            randomCharacterImage = arrValoPj[randomIndex].image;
        }

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

const rolManagment = (text) => {

    let str = text.split('--')[1].trim();

    switch (str) {
        case "duelista":
            return true
        case "sentinela":
            return true
        case "iniciador":
            return true
        case "controlador":
            return true
        default:
            return false;
    }
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

    if (play) {
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
        command_ = '!ruleta';
    }

    if (listener === 'message') {
        if (data.text.includes(command_)) {
            ruletaValorant(Channel, data.text.toLowerCase(), command_);
        }
    }
});


window.addEventListener('onWidgetLoad', function (obj) {
    fieldData = obj.detail.fieldData;
})