document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeModalBtn = document.querySelector(".close");
    const showGalleryBtn = document.getElementById("showGalleryBtn");
    const previewGallery = document.getElementById("previewGallery");
    const gallerySection = document.getElementById("gallerySection");
    const paginationContainer = document.getElementById("pagination");

    // ✅ 웹사이트 실행 시 모달 숨김
    if (modal) {
        modal.style.display = "none";
    }

    // ✅ 1000장의 사진을 동적으로 추가 (처음에는 숨김)
    const totalImages = 1000;
    let allPhotos = [];

    function initializeGallery() {
        if (allPhotos.length === 0) { // ✅ 중복 실행 방지
            for (let i = 1; i <= totalImages; i++) {
                let img = document.createElement("img");
                img.src = `images/photo${i}.jpg`;
                img.style.display = "none"; // ✅ 처음에는 보이지 않도록 설정
                img.onclick = function () {
                    openModal(this.src);
                };
                allPhotos.push(img);
                gallerySection.appendChild(img);
            }
        }
    }

    // ✅ "MORE" 버튼 클릭 시 미리보기 숨기고 전체 갤러리 표시
    if (showGalleryBtn) {
        showGalleryBtn.addEventListener("click", function () {
            initializeGallery(); // ✅ 중복 실행 방지

            // ✅ 미리보기 사진 숨김
            if (previewGallery) {
                previewGallery.style.display = "none";
            }

            // ✅ 전체 갤러리 표시
            if (gallerySection) {
                gallerySection.style.display = "grid";
            }

            // ✅ 페이지네이션 표시
            if (paginationContainer) {
                paginationContainer.style.display = "flex";
            }

            // ✅ MORE 버튼 숨김
            this.style.display = "none";
            
            // ✅ 첫 번째 페이지 로드
            loadPage(1);
        });
    }

    // ✅ 페이지네이션 기능 유지 (14장씩 정확히 표시)
    let currentPage = 1;
    const photosPerPage = 14;
    let totalPages = Math.ceil(totalImages / photosPerPage);

    function loadPage(page) {
        currentPage = page;
        let start = (page - 1) * photosPerPage;
        let end = Math.min(start + photosPerPage, totalImages); // ✅ 정확한 범위 설정

        // ✅ 모든 기존 이미지 숨김
        allPhotos.forEach(img => img.style.display = "none");

        // ✅ 현재 페이지에 해당하는 14장만 표시
        for (let i = start; i < end; i++) {
            allPhotos[i].style.display = "block";
        }

        updatePagination();
    }

    function updatePagination() {
        paginationContainer.innerHTML = "";

        // 🔹 "◀◀" 버튼 (10페이지 뒤로 이동)
        if (currentPage > 10) {
            let prev10Btn = document.createElement("button");
            prev10Btn.textContent = "◀◀";
            prev10Btn.addEventListener("click", function () {
                loadPage(Math.max(1, currentPage - 10));
            });
            paginationContainer.appendChild(prev10Btn);
        }

        // 🔹 "◀" 버튼 (1페이지 뒤로 이동)
        if (currentPage > 1) {
            let prevBtn = document.createElement("button");
            prevBtn.textContent = "◀";
            prevBtn.addEventListener("click", function () {
                loadPage(currentPage - 1);
            });
            paginationContainer.appendChild(prevBtn);
        }

        // 페이지 번호 표시 (10개씩 묶어서 표시)
        let startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
        let endPage = Math.min(startPage + 9, totalPages);
        for (let i = startPage; i <= endPage; i++) {
            let pageBtn = document.createElement("button");
            pageBtn.textContent = i;
            if (i === currentPage) {
                pageBtn.style.fontWeight = "bold"; // 현재 페이지 강조
            }
            pageBtn.addEventListener("click", function () {
                loadPage(i);
            });
            paginationContainer.appendChild(pageBtn);
        }

        // 🔹 "▶" 버튼 (1페이지 앞으로 이동)
        if (currentPage < totalPages) {
            let nextBtn = document.createElement("button");
            nextBtn.textContent = "▶";
            nextBtn.addEventListener("click", function () {
                loadPage(currentPage + 1);
            });
            paginationContainer.appendChild(nextBtn);
        }

        // 🔹 "▶▶" 버튼 (10페이지 앞으로 이동)
        if (currentPage + 10 <= totalPages) {
            let next10Btn = document.createElement("button");
            next10Btn.textContent = "▶▶";
            next10Btn.addEventListener("click", function () {
                loadPage(Math.min(totalPages, currentPage + 10));
            });
            paginationContainer.appendChild(next10Btn);
        }
    }

    // ✅ 모든 사진 클릭 시 모달 열기 가능하도록 수정
    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("click", function () {
            openModal(this.src);
        });
    });

    // ✅ 사진 클릭 시 모달 열기 함수
    function openModal(src) {
        if (modal && modalImg) {
            modal.style.display = "flex";
            modalImg.src = src;
            modal.style.justifyContent = "center";
            modal.style.alignItems = "center";
        }
    }

    // ✅ 닫기 버튼 클릭 시 모달 닫기
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", function () {
            if (modal) {
                modal.style.display = "none";
            }
        });
    }

    // ✅ 모달 클릭 시 배경 클릭하면 닫히도록 설정
    if (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }
});