//module for page transitions
function PageTransition($pageLinks, callback) {
    this.pageLinks = $pageLinks;
    this.init(this.pageLinks);
    //this.callback = callback || function(){};
}

PageTransition.prototype = {
    init: function() {
        if(typeof this.pageLinks == 'object') {
            this.addEvent(this.pageLinks);
        } else {
            throw new Error('The argument you have parsed needs to be of type object');
        }
    },
    addEvent: function($link) {
        var _self = this;
        for(var index = 0; index < $link.length; index++) {
            $link[index].addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                var url = event.target.getAttribute('href');
                _self.pageRequest(url);
            });
        }
    },
    pageRequest: function(url) {
        this.animatePage();
        var xhr = new XMLHttpRequest(),
            newElement,
            requestedContent,
            requestedPageTitle,
            $pageWrapper = document.getElementById('page-wrapper'),
            $pageTitle = document.querySelector('head title');
        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                newElement = document.createElement('div');
                newElement.innerHTML = this.response;
                console.log(this.response);
                /*requestedPageTitle = newElement.querySelector('head title');
                requestedContent = newElement.querySelector('#page-wrapper');
                $pageTitle = requestedPageTitle;
                $pageWrapper.innerHTML = requestedContent.innerHTML;*/
            }
        };
        xhr.open('GET', url + '#page-wrapper');
        xhr.send();

        /*
         if the current page is not the same as the requested page
         then change the url to the request page and
         add it to the window history.
         */
        if(url != window.location) {
            window.history.pushState({path: url},'',url);
            //this.callback();
        }
    },
    animatePage: function(){
        console.log('Page is animating');
        //toggleMenu();
    }
};