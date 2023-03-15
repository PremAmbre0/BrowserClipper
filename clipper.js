
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
    if (!document.getElementById('browser-clipper-os')) {
        const cssStyleSheet = `.clipper-sidebar,.clipper-toggle{position:fixed;transition:right .5s ease-in-out}.clipper-sidebar{z-index:9999999999;top:0;right:0;width:370px;height:100vh;background-color:#e8f4f5;box-shadow:0 0 15px 2px rgba(0,0,0,.5)}.clipper-sidebar.clipper-sidebar--collapsed{right:-370px;box-shadow:none;}.clipper-iframe{overflow:auto;width:100%;height:100%;border:none}.clipper-toggle{top:17px;right:370px;width:31px;height:30px;cursor:pointer;border-radius:5px 0 0 5px;background:#f8434a;box-shadow:-3px 1px 8px 0 rgb(0 0 0 / 30%)}.clipper-toggle:after,.clipper-toggle:before{position:absolute;left:10px;display:block;width:13px;height:3px;content:'';background:#fff}.clipper-toggle:before{top:10px;transform:rotate(45deg)}.clipper-toggle:after{bottom:10px;transform:rotate(-45deg)}.clipper-sidebar--collapsed.clipper-toggle{right:0}.clipper-sidebar--collapsed.clipper-toggle:before{transform:rotate(135deg)}.clipper-sidebar--collapsed.clipper-toggle:after{transform:rotate(-135deg)}`;
        var styleSheet = document.createElement('style');
        styleSheet.innerText = cssStyleSheet;
        document.head.appendChild(styleSheet);
        let sidebar = document.createElement('div');
        sidebar.setAttribute('id', 'browser-clipper-os')
        sidebar.classList.add('clipper-sidebar');
        let sidebarBtn = document.createElement('div');
        sidebarBtn.classList.add('clipper-toggle');
        let ifrm = document.createElement('iframe');
        ifrm.classList.add('clipper-iframe');
        ifrm.src = 'https://f276-36-255-248-152.in.ngrok.io/#/';
        sidebar.appendChild(ifrm);
        sidebar.appendChild(sidebarBtn);
        sidebarBtn.addEventListener('click', () => {
            sidebarBtn.classList.toggle('clipper-sidebar--collapsed');
            sidebar.classList.toggle('clipper-sidebar--collapsed');
        });
        document.body.appendChild(sidebar);
        window.addEventListener('message', (e) => {
            let data = JSON.parse(e.data);
            document.body.style.cursor = 'crosshair';
            if (data.key == 'allImages') {
                const listOFAllImagesOnPagec = document.querySelectorAll('img');
                let listOFImages = [];
                listOFAllImagesOnPagec.forEach(image => {
                    listOFImages.push(image.src);
                });
                ifrm.contentWindow.postMessage(JSON.stringify({
                    data: [...listOFImages],
                    type: 'allImagesOnPage',
                }), '*');
            }
            if (data.key) {
                if (data.type == 'text') {
                    document.addEventListener('click', (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        document.body.style.cursor = 'default';
                        ifrm.contentWindow.postMessage(
                            JSON.stringify({
                                value: e.target.innerText,
                                key: data.key,
                                path: getDomPath(e.target),
                                type: data.type,
                            }), '*');
                    }, { once: true });
                }
                else if (data.type == 'image') {
                    document.addEventListener('click', (e) => {
                        e.stopPropagation();
                        document.body.style.cursor = 'default';
                        let el = e.target;
                        console.log(el)
                        let url = '';
                        if (el.tagName == 'IMG') {
                            url = el.src;
                        }
                        else {
                            url = el.querySelector('img').src;
                        }
                        ifrm.contentWindow.postMessage(
                            JSON.stringify({
                                value: url,
                                type: data.type,
                                key: data.key,
                                path: getDomPath(e.target),
                            }), '*');
                    }, { once: true });
                }
            }
        })

    } else if (document.getElementById('browser-clipper-os')) {
        alert('clipper already running...')
    }
}
else {
    alert('wait for the page to load completely...');
}