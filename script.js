document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

        // ★ここから追加: トップページのフェードイン処理★
    const heroImage = document.querySelector('.hero-image');
    // window.onload を使うことで、画像を含む全てのコンテンツが読み込まれてから実行
    window.addEventListener('load', () => {
        if (heroImage) {
            heroImage.classList.add('is-loaded');
        }
    });
    // ★ここまで追加★
});