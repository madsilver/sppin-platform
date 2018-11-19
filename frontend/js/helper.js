const Helper = {

    fetchApi: (param, done, error) => {
        const url = 'http://api-gateway:3000/' + param.resource;

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
            Helper.isLogged(res);
            done(res)
        })
        .catch(err => error(err));
    },

    defineUrl: (resource, sort, page, pageSize) => {
        if(sort || page || pageSize) {
            resource = resource +`?page=${page}&limit=${pageSize}&sort=${sort.property}&order=${sort.direction}`;
        }
        return resource;
    },

    loading: (action) => {
        let screen = document.getElementById("screen");
        let loader = document.getElementById("loader");
        
        if(action) {
            if(screen)
               screen.classList.add("blur");
            Helper.fadeIn(loader);
        }
        else {
            if(screen)
                screen.classList.remove("blur");
            Helper.fadeOut(loader);
        }
    },

    fadeOut: (el) => {
        el.style.opacity = 1;

        (fade = () => {
            if ((el.style.opacity -= .1) < 0) {
                el.style.display = "none";
            } else {
                requestAnimationFrame(fade);
            }
        })();
    },

    fadeIn: (el, display) => {
        if(el.style.opacity == 1 && el.style.display == "block") return;

        el.style.opacity = 0;
        el.style.display = display || "block";

        (fade = () => {
            var val = parseFloat(el.style.opacity);
            if (!((val += .1) > 1)) {
                el.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();  
    },

    toast: (msg, success) => {
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

    prettyJson: (json) => {       
        return JSON.stringify(JSON.parse(json),null,2);  
    },

    fireEvent: (name, data) => {
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

    clone: (obj) => {
        return JSON.parse(JSON.stringify(obj));
    },

    logoff: () => {
        sessionStorage.clear();
        document.location.reload();
    },

    isLogged: (res) => {
        if(res.hasOwnProperty('auth')) {
            if(!res.auth) {
                Helper.toast('Sua sessão expirou, redirecionando para o login...', false);
                setTimeout(() => {
                    Helper.logoff();
                }, 3000);
                
            }
        }
    }

};