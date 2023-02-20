(function () {
    let selectorSwitch = false;
    let formConfig = [
        {
            'name': 'vendorProductName',
            'id': 'vendorProductName',
            'placeholder': 'Vendor Product Name',
            'type': 'textarea',
            'label': 'Vendor Product Name:',
        },
        {
            'name': 'clientFacingProductName',
            'id': 'clientFacingProductName',
            'placeholder': 'Client-Facing Product Name',
            'type': 'text',
            'label': 'Client-Facing Product Name:',
        },
        {
            'name': 'name',
            'id': 'name',
            'placeholder': 'Vendor :',
            'type': 'text',
            'label': 'Vendor:',
        },
        {
            'name': 'link',
            'id': 'link',
            'placeholder': 'link',
            'type': 'text',
            'label': 'Link:',
        },
    ]
    // for (config of formConfig){
    //     console.log(config)
    // }

    // One liner function:
    const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML = css;


    function setSelectorSwitch(val) {
        if (typeof val == 'boolean') {
            if (selectorSwitch) {
                document.body
            } else {
                document.body.style.cursor = "default";
            }
            selectorSwitch = val;
            console.log(selectorSwitch)
        }
    }
    function initializeForm(formConfig) {
        var form = document.createElement("div");
        form.classList.add("clipper-form-container")
        for (let config of formConfig) {
            switch (config.type) {
                case "text":
                    form.innerHTML += `\
                                        <div class="clipper-form-${config.name}-${config.type}">\
                                        <label for="${config.name}">${config.label}\
                                        <input type="text" id="${config.id}" class="clipper-form-textfield" name="${config.name}" placeholder="${config.placeholder}">\
                                        </input>\
                                        </label>
                                        </div>
                                    `
                    break;
                case "textarea":
                    form.innerHTML += `\
                                        <div class="clipper-form-${config.name}-${config.type}">\
                                        <label for="${config.name}">${config.label}\
                                        <textarea type="text" id="${config.id}" class="clipper-form-textarea" name="${config.name}" placeholder="${config.placeholder}">\
                                        </textarea>\
                                        </label>
                                        </div>
                                    `
                    break;
            }
        }
        var wrapper = document.createElement("div");
        wrapper.innerHTML = `\
                                <div class="clipper-conatiner" id="clipper" >\
                                </div>\
                                `
        document.body.appendChild(wrapper);
        const clipperContainer = document.getElementById("clipper")
        clipperContainer.appendChild(form);
        injectCss();
    }


    function injectCss() {
        var style = document.createElement('style');
        style.innerHTML = `
        #clipper{
            position : fixed;
            top:0 ;
            right:0;
            z-index:999999;
            min-width:40vw;
            display:flex;
            margin-top: 20px;
            margin-left: 30px;
            background: #e8f4f5;
            overflow-y: auto;
            max-height: 100vh;
        }      
        .clipper-form-textfield{
            font-family: 'Roboto', sans-serif;
            font-size: 16px;
            line-height: 24px;
            padding: 16px 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: none;
            transition: border-color 0.2s ease-in-out;
            width: 100%
        }
        .clipper-form-textfield:focus{
            outline: none;
            border-color: #1976d2;
        }
        `;
        document.head.appendChild(style);
    }

    function getDomPath(el) {
        var stack = [];
        while (el.parentNode != null) {
            var sibCount = 0;
            var sibIndex = 0;
            for (var i = 0; i < el.parentNode.childNodes.length; i++) {
                var sib = el.parentNode.childNodes[i];
                if (sib.nodeName == el.nodeName) {
                    if (sib === el) {
                        sibIndex = sibCount;
                    }
                    sibCount++;
                }
            }
            if (el.hasAttribute('id') && el.id != '') {
                stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
            } else if (sibCount > 1) {
                stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
            } else {
                stack.unshift(el.nodeName.toLowerCase());
            }
            el = el.parentNode;
        }

        return stack.slice(1);
    }

    if (document.readyState === 'complete') {
        initializeForm(formConfig);
        let selector = document.getElementById('add')
        selector.addEventListener('click', (e) => {
            e.stopPropagation();
            setSelectorSwitch(true);
        });

        document.addEventListener("click", (e) => {
            const clickPath = getDomPath(e.target)
            if (clickPath.includes("div#clipper") && !selectorSwitch) {
                e.preventDefault();
                e.stopPropagation();
            } else {
                setSelectorSwitch(false);
                // e.preventDefault();
                // e.stopPropagation();
                console.log(getDomPath(e.target))
            }
        }, 'once');


        var url = {
            url: window.location.href,
            vendor: window.location.hostname.replace("www.", ""),
        };
        console.log(new URL(window.location.href).host);
        switch (new URL(window.location.href).host) {
            case "www.walmart.com":
                console.log("imageURL", document.querySelector('meta[property="og:image"]').content)
                console.log("name", document.querySelector('meta[property="og:title"]').content)
                console.log("breadcrums", document.querySelector('#maincontent > section > main > div.flex.undefined.flex-column.h-100 > div:nth-child(1) > div > div > nav > ol').textContent)
                console.log("description", document.querySelector('#maincontent > section > main > div.flex.undefined.flex-column.h-100 > div:nth-child(2) > div > div.w_aoqv.w_wRee.w_p0Zv > div > div > section:nth-child(5) > section > section > div.w_rNem.expand-collapse-content > div > div > div:nth-child(1) > span > div').textContent)
                console.log("price", document.querySelector('#maincontent > section > main > div.flex.undefined.flex-column.h-100 > div:nth-child(2) > div > div.w_aoqv.w_wRee.w_fdPt > div > div > div:nth-child(1) > div > div > div:nth-child(2) > div > div > div.f6.gray.lh-title.mb3.dn.db-m > span.b.lh-copy.dark-gray.mr2.f1 > span.inline-flex.flex-column > span').textContent)

            case "www.woodenstreet.com":
                console.log("imageUrl", document.querySelector('body > main > div.product-main > div > div.height > ul > div > div > li.slick-slide.slick-current.slick-active > a > figure > img').src)
                console.log("name", document.querySelector('body > main > div.mainDetail > h1').textContent)
                console.log("breadcrums", document.querySelector('#prodBackToTop').textContent)
                console.log("price", document.querySelector('meta[property="product:price:currency"]').content + document.querySelector('meta[property="product:price:amount"]').content)
                console.log("description", document.querySelector('body > main > div.mainDetail > div.overview > ul').textContent)

            case "www.onekingslane.com":
                console.log("imageUrl", document.querySelector('[data-test-id="Desktop_Rendered_Image"]').id)
                console.log("name", document.title)
                console.log("breadcrums", document.querySelector('[id="breadcrumbs"]').textContent)
                console.log("price", document.querySelector('[data-testid ="PDP_productSalePrice"]').textContent)
                console.log("description", document.querySelector('meta[name="description"]').content)

            case "www.arhaus.com":
                console.log("imageUrl", document.querySelector('[data-href="#galery_image0"] > picture > source').srcset)
                console.log("name", document.querySelector('meta[property="og:title"]').content)
                // console.log("breadcrums",document.querySelector('[id="breadcrumbs"]').textContent)
                console.log("price", document.querySelector('meta[property="product:price:currency"]').content + document.querySelector('meta[property="product:price:amount"]').content)
                console.log("description", document.querySelector('meta[property="og:description"]').content)

            case "www.houzz.com ":
                // console.log("imageUrl",document.querySelector('[data-href="#galery_image0"] > picture > source').srcset)
                console.log("name", document.querySelector('meta[property="og:title"]').content)
                // // console.log("breadcrums",document.querySelector('[id="breadcrumbs"]').textContent)
                console.log("price", document.querySelector('div.pricing-info__price-section > span'))
            // console.log("description", document.querySelector('meta[property="og:description"]').content)
        }
    } else {
        alert("wait for the page to load completely...")
    }
})()
// (function(){let script = document.createElement("script");script.src = "index.js";document.body.appendChild(script);})()
