let fieldData;
const showMessage = async (objMessage) => {
    // console.log(objMessage);

    if (document.querySelector(".main-container .chat-container") !== null) {
        let containersMain = document.querySelectorAll(".main-container .chat-container");
        containersMain.forEach((container) => {
            container.style.animation = "";
        });
    }

    const { displayName, badges, text, msgId, emotes } = objMessage;

    let images = ``;

    badges.forEach(bad => {
        images +=
            `
            <img src="${bad.url}"/>
        `
    });

    let myText = text;
    let arrText = text.split(" ");
    // console.log(arrText);

    if (emotes.length > 0) {
        emotes.forEach(emote => {
            arrText.forEach((txt, index) => {
                if (txt == emote.name) {
                    arrText[index] = `<img id="emote" src="${emote.urls[1]}"/>`;
                }
                else {
                    arrText[index] = `${txt}`;
                }
            })
        });

        myText = '';
        arrText.forEach(txt => {
            myText += txt + " ";
        })
    }

    let model1 = `
        <div class="chat-container" id="${msgId}">
            <div id="name-container">
                ${images}
                ${displayName}
            </div>
            <div id="message-container">
                ${myText}
            </div>
        </div>
    `, model2 = `
        <div class="chat-container-2" id="${msgId}">
            <div id="name-container-2">
                ${displayName}
                <span>X</span>
            </div>
            <div id="message-container-2">
                ${myText}
            </div>
        </div>
    `,
        model3 = `
    <div class="chat-container-3" id="${msgId}">
        <img src="https://raw.githubusercontent.com/Sergio3215/Custom-Widget-StreamElement/refs/heads/main/Custom%20Chat/static/corazon%20con%20alas.png"
            id="heart" />
        <div id="name-container-3">
            ${displayName}
        </div>
        <div id="message-container-3">
            <div class="line-container-3">
                ${myText}
                <img src="https://raw.githubusercontent.com/Sergio3215/Custom-Widget-StreamElement/refs/heads/main/Custom%20Chat/static/corazones%20dual.png" alt="">
            </div>
        </div>
    </div>
    `;

    const { Models } = fieldData;



    document.querySelector(".main-container").innerHTML += Models == "MessageBox" ?
        model1
        :
        Models == "WindowClassic" ?
            model2
            :
            model3;

    document.getElementById(msgId).style.animation = "showAndHide 1s normal";


    if (document.querySelector(".main-container .chat-container-2") !== null) {
        let Main = document.querySelectorAll(".main-container .chat-container-2");
        Main.forEach(async (container) => {
            setTimeout(() => {
                container.style.opacity = 0;
            }, 10000);
        });
    }
    
    if (document.querySelector(".main-container .chat-container-3") !== null) {
        let Main = document.querySelectorAll(".main-container .chat-container-3");
        Main.forEach(async (container) => {
            setTimeout(() => {
                container.style.opacity = 0;
            }, 10000);
        });
    }

    if (document.querySelector(".main-container .chat-container") !== null) {
        let Main = document.querySelectorAll(".main-container .chat-container");
        Main.forEach(async (container) => {
            setTimeout(() => {
                container.style.opacity = 0;
            }, 10000);
        });
    }

}

window.addEventListener('onEventReceived', async function (obj) {

    if (!obj.detail.event) {
        return;
    }

    // console.log(obj.detail);

    if (obj.detail.listener == "message") {
        showMessage(obj.detail.event.data);
    }
});

window.addEventListener('onWidgetLoad', function (obj) {
    if (!obj.detail.fieldData) {
        return;
    }
    fieldData = obj.detail.fieldData;
});