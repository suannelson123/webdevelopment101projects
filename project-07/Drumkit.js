document.addEventListener('DOMContentLoaded', () => {
    function play(event) {
        const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
        const key = document.querySelector(`button[data-key="${event.keyCode}"]`);
        console.log(key);
        console.log(audio)
        if (!audio) return;
        audio.play();
        audio.currentTime = 0;
        key.classList.add('play');
    }
    
    function removeTransition(event) {
        if (event.propertyName !== "transform") return;
        this.classList.remove('play');
        console.log(this);
    }
    
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => key.addEventListener('transitionend', removeTransition));
    
    
    
    window.addEventListener('keydown', play);
});