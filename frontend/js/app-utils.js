let Utils = {

    fetchApi: function(param, done, error) {
        const url = 'http://localhost:3000/' + param.resource;

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', sessionStorage.token);

        fetch(url, {
            method: param.method || "get",
            headers: headers,
            body: param.body
        })
        .then(res => res.json())
        .then(res => {
            if(res.hasOwnProperty('auth')) {
                if(!res.auth) {
                    // this.logoff();
                    // return;
                }
            }
            done(res)
        })
        .catch(err => error(err));
    },

    defineUrl: function(resource, sort, page, pageSize) {
        if(sort || page || pageSize) {
            resource = resource +`?page=${page}&limit=${pageSize}&sort=${sort.property}&order=${sort.direction}`;
        }
        return resource;
    },

    loading: function(action) {
        let screen = document.getElementById("screen");
        let loader = document.getElementById("loader");
        
        if(action) {
            if(screen)
               screen.classList.add("blur");
            this.fadeIn(loader);
        }
        else {
            if(screen)
                screen.classList.remove("blur");
            this.fadeOut(loader);
        }
    },

    fadeOut: function(el) {
        el.style.opacity = 1;

        (function fade() {
            if ((el.style.opacity -= .1) < 0) {
                el.style.display = "none";
            } else {
                requestAnimationFrame(fade);
            }
        })();
    },

    fadeIn: function(el, display) {
        if(el.style.opacity == 1 && el.style.display == "block") return;

        el.style.opacity = 0;
        el.style.display = display || "block";

        (function fade() {
            var val = parseFloat(el.style.opacity);
            if (!((val += .1) > 1)) {
                el.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();  
    },

    toast: function(msg, success) {
        let toast = Polymer.toastElement;
        if(toast == null) {
            alert(msg);
            return;
        }
        toast.text = msg;

        if(!success && success != undefined) {
            toast.style.background = "#e91e63";
        }
        else {
            toast.style.background = "#323232";
        }

        toast.open();
    },

    prettyJson: function(json) {       
        return JSON.stringify(JSON.parse(json),null,2);  
    },

    fireEvent: function(name, data) {
        var event = new CustomEvent(name, {
            "detail": {
                "message": data,
                "time": new Date()
            },
            "bubbles": true,
            "cancelable": true
        });
        document.dispatchEvent(event);
    },

    clone: function(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    logoff: function() {
        sessionStorage.clear();
        document.location.reload();
    }

};