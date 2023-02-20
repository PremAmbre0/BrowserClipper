(function () {
    if (document.readyState === 'complete') {
            const cssStyleSheet = `/ sidebar container /\
            .clipper-sidebar {\
            position: fixed;\
            z-index: 9999999999;\
            top: 0;\
            right: 0;\
            width: 370px;\
            height: 100vh;\
            transition: right 0.3s;\
            background-color: #e8f4f5;\
            box-shadow: 0 0 15px 2px rgba(0, 0, 0, 0.5);\
            transition:right 0.5s ease-in-out;\
            }\
\   
            .clipper-sidebar.clipper-sidebar--collapsed{\
                right:-370px;\
            }\
            .clipper-iframe {\
            overflow: auto;\
            width: 100%;\
            height: 100%;\
            border: none;\
            }\
\
            .clipper-toggle {\
            position: fixed;\
            top: 17px;\
            right: 370px;\
            width: 31px;\
            height: 30px;\
            cursor: pointer;\
            transition: 0.3s;\
            border-radius: 5px 0 0 5px;\
            background: #f8434a;\
            box-shadow: -3px 1px 8px 0 rgb(0 0 0 / 30%);\
            transition:right 0.5s ease-in-out;\
            
            }\
            .clipper-toggle:before,\
            .clipper-toggle:after {\
            position: absolute;\
            left: 10px;\
            display: block;\
            width: 13px;\
            height: 3px;\
            content: '';\
            background: #fff;\
            }\
            .clipper-toggle:before {\
            top: 10px;\
            transform: rotate(45deg);\
            }\
            .clipper-toggle:after {\
            bottom: 10px;\
            transform: rotate(-45deg);\
            }\
\
            / collapsed state for toggle button /\
            .clipper-sidebar--collapsed.clipper-toggle \{
            right: 0;\
            }\
            .clipper-sidebar--collapsed.clipper-toggle:\before {
            transform: rotate(135deg);\
            }\
            .clipper-sidebar--collapsed.clipper-toggle:\after {
            transform: rotate(-135deg);\
            }\
            `;
            var styleSheet = document.createElement('style')
            styleSheet.innerText = cssStyleSheet;
            document.head.appendChild(styleSheet);
            let sidebar = document.createElement('div');
            sidebar.classList.add('clipper-sidebar');
            let sidebarBtn = document.createElement('div');
            sidebarBtn.classList.add('clipper-toggle');
            let ifrm = document.createElement('iframe');
            ifrm.classList.add('clipper-iframe');
            ifrm.src = 'http://localhost:8080/';
            sidebar.appendChild(ifrm);
            sidebar.appendChild(sidebarBtn);
            document.body.appendChild(sidebar);
            sidebarBtn.addEventListener('click', ()=>{
                sidebarBtn.classList.toggle('clipper-sidebar--collapsed');
                sidebar.classList.toggle('clipper-sidebar--collapsed');
            });
    }
    else {
        alert('wait for the page to load completely...')
    }
})



