class SliderComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: "open"});

        this.range = this.getAttribute('range');
        this.url = this.getAttribute('url')
    }

    connectedCallback() {
        this.render();
    }

    render() {
        fetchItem(this.url)
            .then(data => {

                this.shadow.innerHTML = `
                <link rel="stylesheet" href="style.css">
                <link rel="stylesheet" href="splide.min.css">
        
                <div id="myslider" class="slider splide">
                <div class="splide__track">
                    <div class="splide__list">
                    ${data.slice(0, this.range).map(item => {
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
            });

    }
}

window.customElements.define('slider-component', SliderComponent)