// script-katalog.js

document.addEventListener('DOMContentLoaded', () => {
    const bookContainer = document.querySelector('.book-container');
    const bookElement = document.querySelector('.book-turnjs');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const body = document.body;

    // Inicializace Turn.js
    // Turn.js vyžaduje jQuery, proto se kód spouští až po DOMContentLoaded
    $(bookElement).turn({
        width: 800,
        height: 500,
        autoCenter: true,
        gradients: true,
        elevation: 50,
        display: 'double',
        page: 1,
    });

    // Event listener pro tlačítko "Předchozí stránka"
    prevPageBtn.addEventListener('click', () => {
        $(bookElement).turn('previous');
    });

    // Event listener pro tlačítko "Další stránka"
    nextPageBtn.addEventListener('click', () => {
        $(bookElement).turn('next');
    });

    // Změna velikosti knihy ve fullscreenu
    const resizeBook = () => {
        if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
             $(bookElement).turn("size", window.innerWidth, window.innerHeight);
        } else {
             $(bookElement).turn("size", 800, 500);
        }
    };
    $(document).bind('fullscreenchange', resizeBook);

    // --- Logika pro fullscreen ---
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (bookContainer.requestFullscreen) bookContainer.requestFullscreen();
            else if (bookContainer.mozRequestFullScreen) bookContainer.mozRequestFullScreen();
            else if (bookContainer.webkitRequestFullscreen) bookContainer.webkitRequestFullscreen();
            else if (bookContainer.msRequestFullscreen) bookContainer.msRequestFullscreen();
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();
        }
    });
    
    // Změna fullscreen stavu
    document.addEventListener('fullscreenchange', () => { body.classList.toggle('fullscreen-active', !!document.fullscreenElement); });
    document.addEventListener('mozfullscreenchange', () => { body.classList.toggle('fullscreen-active', !!document.mozFullScreenElement); });
    document.addEventListener('webkitfullscreenchange', () => { body.classList.toggle('fullscreen-active', !!document.webkitFullscreenElement); });
    document.addEventListener('msfullscreenchange', () => { body.classList.toggle('fullscreen-active', !!document.msFullscreenElement); });
});