let fieldData;
// let videoUrl = "https://cdn.streamelements.com/uploads/01jwszydmk7awvrswf6pkt7n9t.mp4";

const tortugaGimiendo = () => {
    const video = document.querySelector("video");
    video.style.display = "flex";
    video.currentTime = 0;
    video.muted = false;
    video.volume = 1;
    video.play().catch(console.error);

    setTimeout(() => {
        video.volume = 0;
        video.style.display = "none";
    }, 5000);
}

window.addEventListener('onEventReceived', function (obj) {
    if (!obj.detail.event) {
        return;
    }
    const detail = obj.detail;
    const listener = detail.listener.split("-")[0];
    const event = detail.event;
    const data = event.data;

    const video = document.querySelector("video");
    video.style.display = "none";

    const { Command } = fieldData;

    let command_ = Command.toLowerCase();

    if (command_ == '') {
        command_ = '!video';
    }

    if (listener === 'message') {
        if(data.text == command_){
            tortugaGimiendo();
        }
    }
});


window.addEventListener('onWidgetLoad', function (obj) {
    fieldData = obj.detail.fieldData;
})