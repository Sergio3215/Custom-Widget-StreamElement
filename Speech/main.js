let fieldData, apiToken;

let isPlaying = false;
let queue = [];
let currentAudio;
document.querySelector(".iframe-svg").style.display = "none";
const endVoiceMessage = async () => {
    if (queue.length > 0) {
        const nextMessage = queue.pop();
        let checkTiktok_ = fieldData.voiceTiktokCheck;
        if (checkTiktok_) {
            await sayText(nextMessage.fullMessage);
        }
        else {
            sayMassageVoice(nextMessage.fullMessage, nextMessage.messageVoice);
        }
    } else {
        isPlaying = false;
        document.querySelector(".iframe-svg").style.display = "none";
    }
};
const sayMassageVoice = (fullMessage, messageVoice) => {
    if (!fullMessage.trim()) {
        return;
    }
    isPlaying = true;
    const volume = fieldData.volume;
    const url = `//api.streamelements.com/kappa/v2/speech?voice=${messageVoice.replace('$', '')}&text=${encodeURI(fullMessage.replace(/&/g, ' y '))}&key=${apiToken}`
    currentAudio = new Audio(url);
    currentAudio.volume = volume;

    currentAudio.addEventListener('ended', endVoiceMessage);
    try {
        const playPromise = currentAudio.play();
        if (!playPromise) {
            return;
        }
        playPromise.then(() => {
            console.log('playing message');
        }).catch(e => console.log(e));
    } catch (e) {
        console.log(e);
    }
};

const sayText = async (text) => {
    const { volume, voiceTiktok } = fieldData;
    isPlaying = true;

    // let fetchStr = await fetch('https://tiktok-tts.weilnet.workers.dev/api/generation', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         text:text,
    //         voice:voiceTiktok
    //     }),
    //     headers: {
    //         "Content-type": "application/json"
    //     }
    // });
    // let data = await fetchStr.json();
    // if (!data) {
    //     endVoiceMessage();
    //     return;
    // }
    // const myAudio = new Audio();
    // myAudio.src = `data:audio/mp3;base64,${data.data}`;
    // myAudio.volume = volume;
    // myAudio.addEventListener('ended', () => {
    //     endVoiceMessage();
    // });

    // myAudio.play();
    let voice = voiceTiktok;
    fetch('https://tiktok-tts.weilnet.workers.dev/api/generation', {
        method: 'POST',
        body: JSON.stringify({
            text,
            voice
        }),
        headers: {
            "Content-type": "application/json"
        }
    }).then(response => response.json())
        .then(({ data }) => {
            if (!data) {
                endVoiceMessage();
                return;
            }
            const myAudio = new Audio();
            myAudio.src = `data:audio/mp3;base64,${data}`;
            myAudio.volume = volume;
            myAudio.addEventListener('ended', () => {
                endVoiceMessage();
            });
            myAudio.play();
        });
};

const generateMessage = async (message, messageVoice, userDisplayName, obj) => {
    const { doUserSaid, ignoreRepeats, sayLanguage, Command, botImageShow, botImageIframe, botImageIMG, voiceTiktokCheck } = fieldData;
    if (ignoreRepeats) {
        const hasRepeats = `${message}${message}`.indexOf(message, 1) !== message.length;
        if (hasRepeats) {
            return;
        }
    }

    if (message === '') {
        return;
    }

    let fullMessage = message;
    if (doUserSaid) {
        fullMessage = `${userDisplayName} ` + sayLanguage + ` ${message}`
        //fullMessage = `${userDisplayName} say ${message}`
    }

    if (isPlaying) {
        queue.unshift({ fullMessage, messageVoice });
        return;
    }

    if (botImageIframe) {
        if (botImageIMG) {
            return
        }
        document.querySelector(".iframe-svg").innerHTML = `<iframe src="{{URLImageIMG}}" style="
        width: {{widthImage}}px;
        height: {{heightImage}}px;
        border: 0px;
    "></iframe>`
    }
    if (botImageIMG) {
        document.querySelector(".iframe-svg").innerHTML = `<img src="{{URLImageIMG}}" style="
        width: {{widthImage}}px;
        height: {{heightImage}}px;
        border: 0px;
    "></img>`
    }

    if (botImageShow) {
        document.querySelector(".iframe-svg").style.display = "block";
    }

    if (voiceTiktokCheck) {
        fullMessage = `${userDisplayName.replaceAll("_", " ").replaceAll(".", " ")} ` + sayLanguage + ` ${message}`
        await sayText(fullMessage)
    }
    else {
        sayMassageVoice(fullMessage, messageVoice);
    }
};

const checkPrivileges = (data, privileges) => {
    const { tags, userId } = data;
    const { mod, subscriber, badges } = tags;
    const required = privileges || fieldData.privileges;
    const isMod = parseInt(mod);
    const isSub = parseInt(subscriber);
    const isVip = (badges.indexOf("vip") !== -1);
    const isBroadcaster = (userId === tags['room-id']);
    if (isBroadcaster) return true;
    if (required === "justSubs" && isSub) return true;
    if (required === "mods" && isMod) return true;
    if (required === "vips" && (isMod || isVip)) return true;
    if (required === "subs" && (isMod || isVip || isSub)) return true;
    return required === "everybody";
};

const raids = [];
const defaultPerUserVoices = ['Miguel', 'Enrique'];
let isEnabledForEverybody = false;
let isEnabled = true

const createEmoteRegex = (emotes) => {
    const regexStrings = emotes.sort().reverse().map(string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = `(?<=\\s|^)(?:${regexStrings.join('|')})(?=\\s|$|[.,!])`;
    return new RegExp(regex, 'g')
}

const htmlEncode = (text) => text.replace(/[\<\>\"\'\^\=]/g, char => `&#${char.charCodeAt(0)};`);
const processText = (text, emotes) => {
    let processedText = text;
    const { ignoreEmotes, ignoreEmojis, stripResponses } = fieldData;
    if (stripResponses && processedText.startsWith('@')) {
        const textParts = processedText.split(' ');
        textParts.shift();
        processedText = textParts.join(' ');
    }
    if (ignoreEmotes) {
        const emoteRegex = createEmoteRegex(emotes.map(e => htmlEncode(e.name)))
        const textParts = processedText.split(emoteRegex);
        processedText = textParts.join('');
    }
    if (ignoreEmojis) {
        processedText = processedText.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
    }
    processedText = processedText.replace(/#/g, ' hash tag ');
    return processedText.trim();
};


const handleMessage = (obj) => {
    const { withCommand, Command, voice, everybodyBotFilters, ignoreLinks, globalTTSPrivileges, idToVoiceMap, ignoreBits } = fieldData;
    const data = obj.detail.event.data;
    const { text, userId, displayName, emotes } = data;

    if (!isEnabled) {
        return;
    }

    if (ignoreBits && emotes.some(e => e.type === 'cheer')) {
        return;
    }

    let userVoices = [voice];
    if (userVoices.length === 0) {
        userVoices = defaultPerUserVoices;
    }

    let realIdtoVoiceMap = {};
    try {
        realIdtoVoiceMap = JSON.parse(idToVoiceMap) || {};
    }
    catch (e) {
        console.log(e);
    }

    const userVoice = realIdtoVoiceMap[userId] || userVoices[Number.parseInt(userId) % userVoices.length];

    const processedText = processText(text, emotes);
    const textToSay = processedText;
    const textHasLinks = textToSay.includes('http://') || textToSay.includes('https://') || textToSay.includes('.com') || textToSay.includes('.tv') || textToSay.includes('.net') || textToSay.includes('.org');
    if ((ignoreLinks && textHasLinks) || !processedText) {
        return;
    }

    //ignore the bots messages
    let ArrBotLabel = (everybodyBotFilters != '') ? everybodyBotFilters.toLowerCase().split(',')
        :
        everybodyBotFilters.toLowerCase().split('');
    let isBot = false;

    ArrBotLabel.map(arr => {
        if (arr == displayName.toLowerCase()) {
            isBot = true;
        }
    });

    if (isBot) {
        return;
    }


    let Privileges = checkPrivileges(data, globalTTSPrivileges);
    if (!Privileges) {
        return;
    }


    let isCommanded = text.includes(Command);
    if (!withCommand) {
        if (isCommanded) {
            return;
        }
        generateMessage(textToSay.toLowerCase().trim(), userVoice, displayName, obj);
        return;
    }
    if (withCommand) {
        if (!isCommanded) {
            return;
        }
    }

    generateMessage(textToSay.toLowerCase().replace(Command.toLowerCase(), '').trim(), voice, displayName, obj);
};

window.addEventListener('onEventReceived', function (obj) {
    if (!fieldData) {
        return;
    }
    if (obj.detail.listener !== "message" && obj.detail.listener !== "raid-latest") {
        return;
    }
    // if (obj.detail.listener === "raid-latest") {
    //     
    // }
    try {
        handleMessage(obj);
    } catch (e) {
        console.log(e);
    }
});

window.addEventListener('onWidgetLoad', function (obj) {
    // apparently sometimes the widget reloads and this resets the value.
    if (!obj.detail.fieldData) {
        return;
    }
    fieldData = obj.detail.fieldData;
    apiToken = obj.detail.channel.apiToken;
});