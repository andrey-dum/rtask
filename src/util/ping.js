

const request_image = function(url) {
    return new Promise(function(resolve, reject) {
        var img = new Image();
        img.onload = function() { resolve(img); };
        img.onerror = function() { reject(url); };
        img.src = url + '?random-no-cache=' + Math.floor((1 + Math.random()) * 0x10000).toString(16);
        // console.log(img)
    });
};

export function ping(url, multiplier) {
    return new Promise(function(resolve, reject) {
        var start = (new Date()).getTime();
        var response = function() {
            var delta = ((new Date()).getTime() - start);
            delta *= (multiplier || 1);
            resolve(delta);
        };
        request_image(url).then(response).catch(response);

        // Set a timeout for max-pings, 5s.
        setTimeout(function() { reject(Error('Timeout')); }, 5000);
    });
};

