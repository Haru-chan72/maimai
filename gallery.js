// gallery.js

document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('galleryGrid');
    // 全てのギャラリーアイテム（表示/非表示にかかわらず）を取得
    const allGalleryItems = document.querySelectorAll('.gallery-item');
    const tagButtons = document.querySelectorAll('.tag-button');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeButton = document.querySelector('.close-button');

    // ★追加: ナビゲーションボタンと現在の画像インデックス★
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    let currentImageIndex = 0; // 現在表示中の画像のインデックス

    // フィルター適用後の表示されている画像アイテムのリストを保持するための変数
    let currentlyVisibleItems = [];

    // --- 画像を表示する関数 ---
    function showImage(index) {
        if (currentlyVisibleItems.length === 0) return; // 表示可能な画像がない場合は何もしない

        // インデックスが範囲外にならないように調整
        if (index < 0) {
            index = currentlyVisibleItems.length - 1; // 最初の画像から前に移動すると最後の画像へ
        } else if (index >= currentlyVisibleItems.length) {
            index = 0; // 最後の画像から次に移動すると最初の画像へ
        }

        currentImageIndex = index; // 現在のインデックスを更新
        const fullSrc = currentlyVisibleItems[currentImageIndex].querySelector('img').dataset.fullSrc;
        modalImage.src = fullSrc;
        imageModal.style.display = 'flex';
    }

    // --- サムネイルクリックでモーダル表示 ---
    // galleryItemsではなくallGalleryItemsに対してイベントリスナーを設定
    allGalleryItems.forEach((item, index) => { // indexも取得
        item.addEventListener('click', () => {
            // 現在表示されているアイテムリストを更新
            // (フィルタリングされた状態でクリックされることを想定)
            currentlyVisibleItems = Array.from(galleryGrid.children).filter(el => !el.classList.contains('hidden'));
            
            // クリックされたアイテムのインデックスを、現在表示されているリストの中で見つける
            const clickedItemIndex = currentlyVisibleItems.indexOf(item);
            if (clickedItemIndex !== -1) {
                showImage(clickedItemIndex);
            } else {
                // クリックされたアイテムがフィルターで非表示になっている場合（通常は発生しないはずだが念のため）
                // allGalleryItemsのインデックスを使ってから、visibleItemsの中から探す
                const fullSrc = item.querySelector('img').dataset.fullSrc;
                modalImage.src = fullSrc;
                imageModal.style.display = 'flex';
                // この場合はナビゲーションが正しく機能しない可能性があるので注意
            }
        });
    });

    // --- モーダルを閉じる ---
    closeButton.addEventListener('click', () => {
        imageModal.style.display = 'none';
    });
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageModal.style.display === 'flex') {
            imageModal.style.display = 'none';
        }
        // ★追加: 左右矢印キーでの移動★
        if (imageModal.style.display === 'flex') { // モーダルが開いている場合のみ
            if (e.key === 'ArrowLeft') {
                showImage(currentImageIndex - 1);
            } else if (e.key === 'ArrowRight') {
                showImage(currentImageIndex + 1);
            }
        }
    });

    // --- ★追加: ナビゲーションボタンのクリックイベント★ ---
    prevButton.addEventListener('click', () => {
        showImage(currentImageIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        showImage(currentImageIndex + 1);
    });

    // --- タグフィルター機能 (少し修正) ---
    tagButtons.forEach(button => {
        button.addEventListener('click', () => {
            tagButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedTag = button.dataset.tag;
            
            // フィルターを適用する前に、表示されているアイテムリストをリセット
            currentlyVisibleItems = [];

            allGalleryItems.forEach(item => { // allGalleryItemsに対してフィルターを適用
                const itemTags = item.dataset.tags ? item.dataset.tags.split(' ') : [];
                
                if (selectedTag === 'all') {
                    item.classList.remove('hidden');
                    currentlyVisibleItems.push(item); // 表示されるアイテムに追加
                } else {
                    if (itemTags.includes(selectedTag)) {
                        item.classList.remove('hidden');
                        currentlyVisibleItems.push(item); // 表示されるアイテムに追加
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });
            // フィルター適用後、currentlyVisibleItemsが更新されたことを確認
            // (この時点では、どの画像も開いていないのでcurrentImageIndexは更新不要)
        });
    });

    // 初期表示時（DOMContentLoaded時）にすべての画像を対象として可視アイテムリストを生成
    currentlyVisibleItems = Array.from(galleryGrid.children); // 初期状態では全て表示されているため
});