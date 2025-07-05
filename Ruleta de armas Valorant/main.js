let fieldData, queue = [];
let play = false;

const ruletaValorant = async (Channel, text, command_) => {

    /**
     * Categorias de las armas:
     * sniper es francotirador
     * rifle es rifle de asalto
     * SF es sub fusile
     * HW es heavy weapon
     */

    const valorantWeapons= [
        [
            "Classic","https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/bfa273477b5ce6345c00da5a396281bd51830dc8-680x384.png?auto=format&fit=crop&q=80&h=200&w=355&crop=center","pistola"
        ],
        [
            "Shorty",
            "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/25b9844dfade4acdbd05229da3b07b0071e5059a-680x384.png?auto=format&fit=crop&q=80&h=200&w=355&crop=center",
            "pistola"
        ],
        [
            "Frenzy",
            "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/10c955e82728dbcc4f7edd687be251437b3c8acc-680x384.png?auto=format&fit=crop&q=80&h=200&w=355&crop=center",
            "pistola"
        ],
        [
            "Ghost",
            "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/575558a88acc67dfac8da6c6ab26f4b61589c96f-680x383.png?auto=format&fit=crop&q=80&h=200&w=355&crop=center"
            ,"pistola"
        ],
        [
            "Sheriff",
            "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/37efa958bf1dd8ec57a0b1585e741599c7b7bee7-680x383.png?auto=format&fit=crop&q=80&h=200&w=355&crop=center",
            "pistola"
        ],
        [
            "Stinger",
            "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/377c8a9058a364478ed179ccbe41a68dd2255234-680x383.png?auto=format&fit=crop&q=80&h=200&w=355&crop=center",
            "SF"
        ],
        [
            "Spectre",
            "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/9fad4bf3774e87edf9994a2afada0abdc72c4bed-680x383.png?auto=format&fit=crop&q=80&h=200&w=355&crop=center",
            "SF"
        ],
        [
            "Bucky",
            "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/982db8ebe5b57b989e009d13b24d9f1bc9c090b5-680x383.png?auto=format&fit=crop&q=80&h=200&w=355&crop=center",
            "escopeta"
        ],
        [
            "Judge",
            "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/7190d2e85b82bd1de81eba87a1db2b469259289d-680x383.png?auto=format&fit=crop&q=80&h=200&w=355&crop=center",
            "escopeta"
        ],
        [
            "Bulldog",
            "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/7bbdf3063c94fa06fbde33c35ce09fd5202fc153-680x383.png?auto=format&fit=crop&q=80&h=200&w=355&crop=center",
            "rifle"
        ],
        [
            "Guardian",
            "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/64917f04177ef9666f58149f0a98a41fa7bf96ba-680x383.png?auto=format&fit=crop&q=80&h=200&w=355&crop=center",
            "rifle"
        ],
        [
            "Phantom",
            "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/f0636340d8a60e1488a447e66784921d01f90d18-680x383.png?auto=format&fit=crop&q=80&h=200&w=355&crop=center",
            "rifle"
        ],
        [
            "Vandal",
            "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/fc32a60b112201776c490a5a6a7f2381cd232bd5-680x383.png?auto=format&fit=crop&q=80&h=200&w=355&crop=center",
            "rifle"
        ],
        [
            "Marshal",
            "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/248441a78c76ee615ad1ece97db1c0203cebc5b1-680x383.png?auto=format&fit=crop&q=80&h=200&w=355&crop=center",
            "sniper"
        ],
        [
            "Operator",
            "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/606f29a17f5bc6f13264f2df21a29d4e209c9dce-680x383.png?auto=format&fit=crop&q=80&h=200&w=355&crop=center",
            "sniper"
        ],
        [
            "Outlaw",
            "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/1b1e480a139ae8d1892f8d7fd163391ce123ee38-680x383.png?auto=format&fit=crop&q=80&h=200&w=355&crop=center",
            "sniper"
        ],
        [
            "Ares",
            "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/4f1969789f8f0da0863d15a6a23957b4508753f2-680x383.png?auto=format&fit=crop&q=80&h=200&w=355&crop=center",
            "HW"
        ],
        [
            "Odin",
            "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/d7e242b2e704155c71841325629ad1a4673c436f-680x383.png?auto=format&fit=crop&q=80&h=200&w=355&crop=center",
            "HW"
        ]
    ];


    let randomIndex = Math.floor(Math.random() * valorantWeapons.length);
    let randomCharacter = valorantWeapons[randomIndex][0];
    let randomCharacterImage = valorantWeapons[randomIndex][1];

    if (Channel == "" || Channel == "Your-Channel") {
        return;
    }

    if (text.includes('--')) {

        let arrWP = [];


        valorantCharacters.map(pj => {
            arrWP.push({
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
            const arrValoWP = arrWP.filter(pj => pj.rol == str.trim());

            randomIndex = Math.floor(Math.random() * arrValoWP.length);
            randomCharacter = arrValoWP[randomIndex].character;
            randomCharacterImage = arrValoWP[randomIndex].image;
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
        case "rifle":
            return true
        case "SF":
            return true
        case "escopeta":
            return true
        case "pistola":
            return true
        case "sniper":
            return true
        case "HW":
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