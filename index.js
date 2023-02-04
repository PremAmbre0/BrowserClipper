(function(){
    let selectorSwitch = false;
    let formConfig = [
        { 
            'name': 'name',
            'id': 'name',
            'placeholder' : 'name',
            'type' : 'text', 
        },
        { 
            'name': 'bread crumbs',
            'id': 'bread_crumbs',
            'placeholder' : 'bread crumbs',
            'type' : 'text', 
        },
        { 
            'name': 'price',
            'id': 'price',
            'placeholder' : 'price',
            'type' : 'text', 
        },
        { 
            'name': 'description',
            'id': 'description',
            'placeholder' : 'description',
            'type' : 'textarea', 
        }
    ]
    // for (config of formConfig){
    //     console.log(config)
    // }

    // One liner function:
    const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML=css;


    function setSelectorSwitch(val){
        if (typeof val == 'boolean'){
            if(selectorSwitch){
                document.body
            }else{
                document.body.style.cursor = "default";
            }
            selectorSwitch = val;
            console.log(selectorSwitch)
        }
    }
    function initializeForm(){
            var wrapper = document.createElement("div");
            wrapper.innerHTML = '\
                                <div class="clipper-conatiner" id="clipper" style="position : fixed; top:0 ; left:0; z-index:999999 ">\
                                    <div class="clipper-content">\
                                        <div>\
                                            <button id="add">\
                                            xyz\
                                            </button>\
                                        </div>\
                                    </div>\
                                </div>\
                                '
            document.body.appendChild(wrapper);
    }

    function getDomPath(el) {
        var stack = [];
        while ( el.parentNode != null ) {
          var sibCount = 0;
          var sibIndex = 0;
          for ( var i = 0; i < el.parentNode.childNodes.length; i++ ) {
            var sib = el.parentNode.childNodes[i];
            if ( sib.nodeName == el.nodeName ) {
              if ( sib === el ) {
                sibIndex = sibCount;
              }
              sibCount++;
            }
          }
          if ( el.hasAttribute('id') && el.id != '' ) {
            stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
          } else if ( sibCount > 1 ) {
            stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
          } else {
            stack.unshift(el.nodeName.toLowerCase());
          }
          el = el.parentNode;
        }
      
        return stack.slice(1);
      }

    if (document.readyState === 'complete') {
        initializeForm();
        let selector = document.getElementById('add')
        selector.addEventListener('click',(e)=>{
            e.stopPropagation();
            setSelectorSwitch(true);
        });

        document.addEventListener("click",(e)=>{
            const clickPath = getDomPath(e.target)
            if(clickPath.includes("div#clipper") && !selectorSwitch){
                e.preventDefault();
                e.stopPropagation();
            }else{
            setSelectorSwitch(false);
                // e.preventDefault();
                // e.stopPropagation();
                console.log(getDomPath(e.target))
            }
        },'once');


        var url = {
            url: window.location.href,
            vendor: window.location.hostname.replace("www.", ""),
        };
        console.log(new URL(window.location.href).host);
		switch (new URL(window.location.href).host) {
            case "www.walmart.com":
            console.log("imageURL", document.querySelector('meta[property="og:image"]').content)
            console.log("name", document.querySelector('meta[property="og:title"]').content)
            console.log("breadcrums",document.querySelector('#maincontent > section > main > div.flex.undefined.flex-column.h-100 > div:nth-child(1) > div > div > nav > ol').textContent)
            console.log("description", document.querySelector('#maincontent > section > main > div.flex.undefined.flex-column.h-100 > div:nth-child(2) > div > div.w_aoqv.w_wRee.w_p0Zv > div > div > section:nth-child(5) > section > section > div.w_rNem.expand-collapse-content > div > div > div:nth-child(1) > span > div').textContent)
            console.log("price",document.querySelector('#maincontent > section > main > div.flex.undefined.flex-column.h-100 > div:nth-child(2) > div > div.w_aoqv.w_wRee.w_fdPt > div > div > div:nth-child(1) > div > div > div:nth-child(2) > div > div > div.f6.gray.lh-title.mb3.dn.db-m > span.b.lh-copy.dark-gray.mr2.f1 > span.inline-flex.flex-column > span').textContent)

            case "www.woodenstreet.com":
            console.log("imageUrl",document.querySelector('body > main > div.product-main > div > div.height > ul > div > div > li.slick-slide.slick-current.slick-active > a > figure > img').src)
            console.log("name",document.querySelector('body > main > div.mainDetail > h1').textContent)
            console.log("breadcrums",document.querySelector('#prodBackToTop').textContent)
            console.log("price",  document.querySelector('meta[property="product:price:currency"]').content + document.querySelector('meta[property="product:price:amount"]').content)
            console.log("description", document.querySelector('body > main > div.mainDetail > div.overview > ul').textContent)

            case "www.onekingslane.com":
            console.log("imageUrl",document.querySelector('[data-test-id="Desktop_Rendered_Image"]').id)
            console.log("name",document.title)
            console.log("breadcrums",document.querySelector('[id="breadcrumbs"]').textContent)
            console.log("price", document.querySelector('[data-testid ="PDP_productSalePrice"]').textContent)
            console.log("description", document.querySelector('meta[name="description"]').content)

            case "www.arhaus.com":
            console.log("imageUrl",document.querySelector('[data-href="#galery_image0"] > picture > source').srcset)
            console.log("name",document.querySelector('meta[property="og:title"]').content)
            // console.log("breadcrums",document.querySelector('[id="breadcrumbs"]').textContent)
            console.log("price",  document.querySelector('meta[property="product:price:currency"]').content + document.querySelector('meta[property="product:price:amount"]').content)
            console.log("description", document.querySelector('meta[property="og:description"]').content)

            case "www.houzz.com ":
            // console.log("imageUrl",document.querySelector('[data-href="#galery_image0"] > picture > source').srcset)
            console.log("name",document.querySelector('meta[property="og:title"]').content)
            // // console.log("breadcrums",document.querySelector('[id="breadcrumbs"]').textContent)
            console.log("price",  document.querySelector('div.pricing-info__price-section > span'))
            // console.log("description", document.querySelector('meta[property="og:description"]').content)
        }
    }else{
        alert("wait for the page to load completely...")
    }
})()
// (function(){let script = document.createElement("script");script.src = "index.js";document.body.appendChild(script);})()
