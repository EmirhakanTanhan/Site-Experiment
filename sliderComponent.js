document.querySelectorAll('[role="_slider"]').forEach(function (element) {
    const ID = element.getAttribute('id');
    slider = document.getElementById(ID);
    const range = slider.getAttribute('range');
    const range_start = range.split('-')[0]
    const range_end = range.split('-')[1]
    const url = slider.getAttribute('url');
    let perpage, width;

    if (window.innerWidth < 1300) {
        perpage = (window.innerWidth / 300).toFixed(0);
        width = '100%';
    } else if (window.innerWidth < 400) {
        perpage = 1;
        width = '100%';
    } else {
        perpage = 5;
        width = '1185px'
    }


    fetchItem(url)
        .then(data => {
            document.getElementById(ID).innerHTML = `   <!--  slider.innerHTML = \`  -->
            <div id="splide-${ID}" class="slider splide">
            <div class="splide__arrow"></div>
                <div class="splide__track">
                    <div class="splide__list">
                    ${data.slice(range_start, range_end).map(item => {
                let spanLandRegion = "",
                    spanRegionArt = "",
                    oldPrice = "",
                    discountPer = "",
                    likeCount = "",
                    discount = "",
                    isNew = "";
                if (item.params.land && item.params.region) spanLandRegion = " | ";
                if (item.params.region && item.params.art) spanRegionArt = " | ";
                if (item.params.likeCount) likeCount = `<span class="likes">3</span>`;
                if (item.params.isNew) isNew = `<span class="isNew">NEU</span>`;
                if (item.oldPrice) {
                    oldPrice = `<span class="old_price">${item.oldPrice.toFixed(2)}</span>`;
                    discountPer = item.oldPrice - item.price;
                    discountPer = item.oldPrice / discountPer;
                    discountPer = 100 / discountPer;
                    discount = `<span class="discount">-${discountPer.toFixed(0)}%</span>`
                }

                return `
                <div class="slider-item splide__slide">
                    <a href="${item.url}">
                        <div class="img">
                            <div class="img-info">
                                ${discount}
                                ${likeCount}
                                ${isNew}
                            </div>
                            <img src="${item.imageS}" alt="${item.name}">
                        </div>
                    </a>
                    <div class="content">
                        <a href="${item.url}">
                            <h2>${item.name}</h2>
                        </a>
                        <div class="pills">
                            <span>${item.params.land}</span>
                            ${spanLandRegion}
                            <span>${item.params.region}</span>
                            ${spanRegionArt}
                            <span>${item.params.art}</span>
                        </div>
                        <div class="prices">
                            <span class="price">${item.price.toFixed(2)}</span>
                            ${oldPrice}
                        </div>
                        <div class="info">
                            <span>${item.params.basePrice}</span>
                        </div>
                    </div>
                </div>
            `
            }).join('')}
                    </div>
                </div>
            </div>
                `;
        })
        .then(function () {
            new Splide(`#splide-${ID}`, {
                type: 'slide',
                rewind: true,
                perPage: perpage,
                perMove: 1,
                gap: '1rem',
                pagination: false,
                trimSpace: true,
                width: width,
            }).mount();
        });

});