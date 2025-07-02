document.addEventListener('DOMContentLoaded', () => {
    // ハンバーガーメニューの処理
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document = document.getElementById('nav-menu'); // ここも修正しました

    // 要素が存在するか確認してからイベントリスナーを設定
    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            navMenu.classList.toggle('open');
        });
    }

    // トップページのフェードイン処理
    const heroImage = document.querySelector('.hero-image');
    // heroImageが存在する場合のみloadイベントリスナーを設定
    if (heroImage) {
        window.addEventListener('load', () => {
            heroImage.classList.add('is-loaded');
        });
    }

    // トップに戻るボタンの処理
    const backToTopButton = document.getElementById('backToTopButton');

    // backToTopButtonが存在する場合のみ処理を実行
    if (backToTopButton) {
        // スクロールイベントを監視
        window.addEventListener('scroll', () => {
            // ページの上部から200pxスクロールしたらボタンを表示
            // window.pageYOffset または document.documentElement.scrollTop のどちらかが20pxより大きければ表示
            if (window.pageYOffset > 100 || document.documentElement.scrollTop > 100) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        // ボタンがクリックされたらページトップへスクロール
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault(); // デフォルトのリンク動作をキャンセル
            window.scrollTo({
                top: 0, // ページの最上部にスクロール
                behavior: 'smooth' // スムーズスクロール
            });
        });
    }
}); // ★ここにDOMContentLoadedの閉じ括弧が一つだけ来るようにする★