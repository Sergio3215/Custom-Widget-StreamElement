
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

    if(emotes.length > 0){
        emotes.forEach(emote => {
            arrText.forEach((txt, index)=>{
                if(txt == emote.name){
                    arrText[index] = `<img id="emote" src="${emote.urls[1]}"/>`;
                }
                else{
                    arrText[index] = `${txt}`;
                }
            })
        });

        myText = '';
        arrText.forEach(txt => {
            myText += txt+" ";
        })
    }

    document.querySelector(".main-container").innerHTML +=
        `
        <div class="chat-container" id="${msgId}">
            <div id="name-container">
                ${images}
                ${displayName}
            </div>
            <div id="message-container">
                ${myText}
            </div>
        </div>
    `;

    document.getElementById(msgId).style.animation = "showAndHide 1s normal";


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

});