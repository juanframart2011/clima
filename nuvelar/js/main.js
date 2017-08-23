LanguageManager = (function() {

    var language = "";
    var langObj = {};

    function langSet(lang){
        //return (userLang.indexOf(languagePrefix) === 0);
        return (lang===language);
    }

    function init(lang, callback){
        if(typeof lang !== "undefined"){
            language = lang;
        }else{

            //Cambiar! deberia tomar el idioma del navegador
            language = "es";
            //var browserLang = navigator.language || navigator.userLanguage;
            //language = browserLang .substring(0, 2);

        }

        var langFile = "js/lang/" + language+ ".json";
        $.getJSON(langFile , function(json) {
            langObj = json;

            callback(langObj);

        });

    }

    function getLangPrefix(){
        return language;
    }

    function getLangObj(){
        return language;
    }


    return{
        init : init,
        langSet : langSet,
        getLangObj: getLangObj,
        getLangPrefix: getLangPrefix
    }
})();

Weather = (function(){
    var time,
        ciudad,
        settings,
        description = {},
        month = [],
        day = [],
        html_strings = {},
        wind_strings = {};

    //var userLang = navigator.language || navigator.userLanguage;
    /*var userLang = "es";

    var langPrefix = lang("es")?"es":"en";*/

    function clock(){
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        m = (m < 10) ? '0' + m : m;
        $('.time').html(h+":"+m);
    }

    function loadData(key, callBack) {
        if (typeof chrome == "undefined"){
            var result = JSON.parse(localStorage.getItem(key));
            callBack(result);
        }else {
            window.parent.parent.getStorageData(key, function(result) {
                result = (result === undefined ? null : result);
                callBack(result);
            });
        }
    }

    function saveData(key, data, callBack) {
        if (typeof chrome == "undefined"){
            localStorage.setItem(key, JSON.stringify(data));
            callBack();
        }
        else{
            window.parent.parent.setStorageData(key,data,function(){
                callBack();
            });
        }
    }

    var getJSON = function(url, successHandler, errorHandler){
        $.ajax({
            url: 'https://www.nuvelar.com/remote/index.php/getWeatherData',
            type: 'POST',
            dataType: 'json',
            cache: false,
            data: {
                'data' : btoa(url)
            },
            success: function(data, textStatus, xhr) {
                data = JSON.parse(data);
                successHandler(data);
            },
            error: function(e){
                errorHandler(status);
            }
        });
    }

    var Latinise={};Latinise.latin_map={"Ã":"A","Ä‚":"A","áº®":"A","áº¶":"A","áº°":"A","áº²":"A","áº´":"A","Ç":"A","Ã‚":"A","áº¤":"A","áº¬":"A","áº¦":"A","áº¨":"A","áºª":"A","Ã„":"A","Çž":"A","È¦":"A","Ç ":"A","áº ":"A","È€":"A","Ã€":"A","áº¢":"A","È‚":"A","Ä€":"A","Ä„":"A","Ã…":"A","Çº":"A","á¸€":"A","Èº":"A","Ãƒ":"A","êœ²":"AA","Ã†":"AE","Ç¼":"AE","Ç¢":"AE","êœ´":"AO","êœ¶":"AU","êœ¸":"AV","êœº":"AV","êœ¼":"AY","á¸‚":"B","á¸„":"B","Æ":"B","á¸†":"B","Éƒ":"B","Æ‚":"B","Ä†":"C","ÄŒ":"C","Ã‡":"C","á¸ˆ":"C","Äˆ":"C","ÄŠ":"C","Æ‡":"C","È»":"C","ÄŽ":"D","á¸":"D","á¸’":"D","á¸Š":"D","á¸Œ":"D","ÆŠ":"D","á¸Ž":"D","Ç²":"D","Ç…":"D","Ä":"D","Æ‹":"D","Ç±":"DZ","Ç„":"DZ","Ã‰":"E","Ä”":"E","Äš":"E","È¨":"E","á¸œ":"E","ÃŠ":"E","áº¾":"E","á»†":"E","á»€":"E","á»‚":"E","á»„":"E","á¸˜":"E","Ã‹":"E","Ä–":"E","áº¸":"E","È„":"E","Ãˆ":"E","áºº":"E","È†":"E","Ä’":"E","á¸–":"E","á¸”":"E","Ä˜":"E","É†":"E","áº¼":"E","á¸š":"E","êª":"ET","á¸ž":"F","Æ‘":"F","Ç´":"G","Äž":"G","Ç¦":"G","Ä¢":"G","Äœ":"G","Ä ":"G","Æ“":"G","á¸ ":"G","Ç¤":"G","á¸ª":"H","Èž":"H","á¸¨":"H","Ä¤":"H","â±§":"H","á¸¦":"H","á¸¢":"H","á¸¤":"H","Ä¦":"H","Ã":"I","Ä¬":"I","Ç":"I","ÃŽ":"I","Ã":"I","á¸®":"I","Ä°":"I","á»Š":"I","Èˆ":"I","ÃŒ":"I","á»ˆ":"I","ÈŠ":"I","Äª":"I","Ä®":"I","Æ—":"I","Ä¨":"I","á¸¬":"I","ê¹":"D","ê»":"F","ê½":"G","êž‚":"R","êž„":"S","êž†":"T","ê¬":"IS","Ä´":"J","Éˆ":"J","á¸°":"K","Ç¨":"K","Ä¶":"K","â±©":"K","ê‚":"K","á¸²":"K","Æ˜":"K","á¸´":"K","ê€":"K","ê„":"K","Ä¹":"L","È½":"L","Ä½":"L","Ä»":"L","á¸¼":"L","á¸¶":"L","á¸¸":"L","â± ":"L","êˆ":"L","á¸º":"L","Ä¿":"L","â±¢":"L","Çˆ":"L","Å":"L","Ç‡":"LJ","á¸¾":"M","á¹€":"M","á¹‚":"M","â±®":"M","Åƒ":"N","Å‡":"N","Å…":"N","á¹Š":"N","á¹„":"N","á¹†":"N","Ç¸":"N","Æ":"N","á¹ˆ":"N","È ":"N","Ç‹":"N","Ã‘":"N","ÇŠ":"NJ","Ã“":"O","ÅŽ":"O","Ç‘":"O","Ã”":"O","á»":"O","á»˜":"O","á»’":"O","á»”":"O","á»–":"O","Ã–":"O","Èª":"O","È®":"O","È°":"O","á»Œ":"O","Å":"O","ÈŒ":"O","Ã’":"O","á»Ž":"O","Æ ":"O","á»š":"O","á»¢":"O","á»œ":"O","á»ž":"O","á» ":"O","ÈŽ":"O","êŠ":"O","êŒ":"O","ÅŒ":"O","á¹’":"O","á¹":"O","ÆŸ":"O","Çª":"O","Ç¬":"O","Ã˜":"O","Ç¾":"O","Ã•":"O","á¹Œ":"O","á¹Ž":"O","È¬":"O","Æ¢":"OI","êŽ":"OO","Æ":"E","Æ†":"O","È¢":"OU","á¹”":"P","á¹–":"P","ê’":"P","Æ¤":"P","ê”":"P","â±£":"P","ê":"P","ê˜":"Q","ê–":"Q","Å”":"R","Å˜":"R","Å–":"R","á¹˜":"R","á¹š":"R","á¹œ":"R","È":"R","È’":"R","á¹ž":"R","ÉŒ":"R","â±¤":"R","êœ¾":"C","ÆŽ":"E","Åš":"S","á¹¤":"S","Å ":"S","á¹¦":"S","Åž":"S","Åœ":"S","È˜":"S","á¹ ":"S","á¹¢":"S","á¹¨":"S","Å¤":"T","Å¢":"T","á¹°":"T","Èš":"T","È¾":"T","á¹ª":"T","á¹¬":"T","Æ¬":"T","á¹®":"T","Æ®":"T","Å¦":"T","â±¯":"A","êž€":"L","Æœ":"M","É…":"V","êœ¨":"TZ","Ãš":"U","Å¬":"U","Ç“":"U","Ã›":"U","á¹¶":"U","Ãœ":"U","Ç—":"U","Ç™":"U","Ç›":"U","Ç•":"U","á¹²":"U","á»¤":"U","Å°":"U","È”":"U","Ã™":"U","á»¦":"U","Æ¯":"U","á»¨":"U","á»°":"U","á»ª":"U","á»¬":"U","á»®":"U","È–":"U","Åª":"U","á¹º":"U","Å²":"U","Å®":"U","Å¨":"U","á¹¸":"U","á¹´":"U","êž":"V","á¹¾":"V","Æ²":"V","á¹¼":"V","ê ":"VY","áº‚":"W","Å´":"W","áº„":"W","áº†":"W","áºˆ":"W","áº€":"W","â±²":"W","áºŒ":"X","áºŠ":"X","Ã":"Y","Å¶":"Y","Å¸":"Y","áºŽ":"Y","á»´":"Y","á»²":"Y","Æ³":"Y","á»¶":"Y","á»¾":"Y","È²":"Y","ÉŽ":"Y","á»¸":"Y","Å¹":"Z","Å½":"Z","áº":"Z","â±«":"Z","Å»":"Z","áº’":"Z","È¤":"Z","áº”":"Z","Æµ":"Z","Ä²":"IJ","Å’":"OE","á´€":"A","á´":"AE","Ê™":"B","á´ƒ":"B","á´„":"C","á´…":"D","á´‡":"E","êœ°":"F","É¢":"G","Ê›":"G","Êœ":"H","Éª":"I","Ê":"R","á´Š":"J","á´‹":"K","ÊŸ":"L","á´Œ":"L","á´":"M","É´":"N","á´":"O","É¶":"OE","á´":"O","á´•":"OU","á´˜":"P","Ê€":"R","á´Ž":"N","á´™":"R","êœ±":"S","á´›":"T","â±»":"E","á´š":"R","á´œ":"U","á´ ":"V","á´¡":"W","Ê":"Y","á´¢":"Z","Ã¡":"a","Äƒ":"a","áº¯":"a","áº·":"a","áº±":"a","áº³":"a","áºµ":"a","ÇŽ":"a","Ã¢":"a","áº¥":"a","áº­":"a","áº§":"a","áº©":"a","áº«":"a","Ã¤":"a","ÇŸ":"a","È§":"a","Ç¡":"a","áº¡":"a","È":"a","Ã ":"a","áº£":"a","Èƒ":"a","Ä":"a","Ä…":"a","á¶":"a","áºš":"a","Ã¥":"a","Ç»":"a","á¸":"a","â±¥":"a","Ã£":"a","êœ³":"aa","Ã¦":"ae","Ç½":"ae","Ç£":"ae","êœµ":"ao","êœ·":"au","êœ¹":"av","êœ»":"av","êœ½":"ay","á¸ƒ":"b","á¸…":"b","É“":"b","á¸‡":"b","áµ¬":"b","á¶€":"b","Æ€":"b","Æƒ":"b","Éµ":"o","Ä‡":"c","Ä":"c","Ã§":"c","á¸‰":"c","Ä‰":"c","É•":"c","Ä‹":"c","Æˆ":"c","È¼":"c","Ä":"d","á¸‘":"d","á¸“":"d","È¡":"d","á¸‹":"d","á¸":"d","É—":"d","á¶‘":"d","á¸":"d","áµ­":"d","á¶":"d","Ä‘":"d","É–":"d","ÆŒ":"d","Ä±":"i","È·":"j","ÉŸ":"j","Ê„":"j","Ç³":"dz","Ç†":"dz","Ã©":"e","Ä•":"e","Ä›":"e","È©":"e","á¸":"e","Ãª":"e","áº¿":"e","á»‡":"e","á»":"e","á»ƒ":"e","á»…":"e","á¸™":"e","Ã«":"e","Ä—":"e","áº¹":"e","È…":"e","Ã¨":"e","áº»":"e","È‡":"e","Ä“":"e","á¸—":"e","á¸•":"e","â±¸":"e","Ä™":"e","á¶’":"e","É‡":"e","áº½":"e","á¸›":"e","ê«":"et","á¸Ÿ":"f","Æ’":"f","áµ®":"f","á¶‚":"f","Çµ":"g","ÄŸ":"g","Ç§":"g","Ä£":"g","Ä":"g","Ä¡":"g","É ":"g","á¸¡":"g","á¶ƒ":"g","Ç¥":"g","á¸«":"h","ÈŸ":"h","á¸©":"h","Ä¥":"h","â±¨":"h","á¸§":"h","á¸£":"h","á¸¥":"h","É¦":"h","áº–":"h","Ä§":"h","Æ•":"hv","Ã­":"i","Ä­":"i","Ç":"i","Ã®":"i","Ã¯":"i","á¸¯":"i","á»‹":"i","È‰":"i","Ã¬":"i","á»‰":"i","È‹":"i","Ä«":"i","Ä¯":"i","á¶–":"i","É¨":"i","Ä©":"i","á¸­":"i","êº":"d","ê¼":"f","áµ¹":"g","êžƒ":"r","êž…":"s","êž‡":"t","ê­":"is","Ç°":"j","Äµ":"j","Ê":"j","É‰":"j","á¸±":"k","Ç©":"k","Ä·":"k","â±ª":"k","êƒ":"k","á¸³":"k","Æ™":"k","á¸µ":"k","á¶„":"k","ê":"k","ê…":"k","Äº":"l","Æš":"l","É¬":"l","Ä¾":"l","Ä¼":"l","á¸½":"l","È´":"l","á¸·":"l","á¸¹":"l","â±¡":"l","ê‰":"l","á¸»":"l","Å€":"l","É«":"l","á¶…":"l","É­":"l","Å‚":"l","Ç‰":"lj","Å¿":"s","áºœ":"s","áº›":"s","áº":"s","á¸¿":"m","á¹":"m","á¹ƒ":"m","É±":"m","áµ¯":"m","á¶†":"m","Å„":"n","Åˆ":"n","Å†":"n","á¹‹":"n","Èµ":"n","á¹…":"n","á¹‡":"n","Ç¹":"n","É²":"n","á¹‰":"n","Æž":"n","áµ°":"n","á¶‡":"n","É³":"n","Ã±":"n","ÇŒ":"nj","Ã³":"o","Å":"o","Ç’":"o","Ã´":"o","á»‘":"o","á»™":"o","á»“":"o","á»•":"o","á»—":"o","Ã¶":"o","È«":"o","È¯":"o","È±":"o","á»":"o","Å‘":"o","È":"o","Ã²":"o","á»":"o","Æ¡":"o","á»›":"o","á»£":"o","á»":"o","á»Ÿ":"o","á»¡":"o","È":"o","ê‹":"o","ê":"o","â±º":"o","Å":"o","á¹“":"o","á¹‘":"o","Ç«":"o","Ç­":"o","Ã¸":"o","Ç¿":"o","Ãµ":"o","á¹":"o","á¹":"o","È­":"o","Æ£":"oi","ê":"oo","É›":"e","á¶“":"e","É”":"o","á¶—":"o","È£":"ou","á¹•":"p","á¹—":"p","ê“":"p","Æ¥":"p","áµ±":"p","á¶ˆ":"p","ê•":"p","áµ½":"p","ê‘":"p","ê™":"q","Ê ":"q","É‹":"q","ê—":"q","Å•":"r","Å™":"r","Å—":"r","á¹™":"r","á¹›":"r","á¹":"r","È‘":"r","É¾":"r","áµ³":"r","È“":"r","á¹Ÿ":"r","É¼":"r","áµ²":"r","á¶‰":"r","É":"r","É½":"r","â†„":"c","êœ¿":"c","É˜":"e","É¿":"r","Å›":"s","á¹¥":"s","Å¡":"s","á¹§":"s","ÅŸ":"s","Å":"s","È™":"s","á¹¡":"s","á¹£":"s","á¹©":"s","Ê‚":"s","áµ´":"s","á¶Š":"s","È¿":"s","É¡":"g","á´‘":"o","á´“":"o","á´":"u","Å¥":"t","Å£":"t","á¹±":"t","È›":"t","È¶":"t","áº—":"t","â±¦":"t","á¹«":"t","á¹­":"t","Æ­":"t","á¹¯":"t","áµµ":"t","Æ«":"t","Êˆ":"t","Å§":"t","áµº":"th","É":"a","á´‚":"ae","Ç":"e","áµ·":"g","É¥":"h","Ê®":"h","Ê¯":"h","á´‰":"i","Êž":"k","êž":"l","É¯":"m","É°":"m","á´”":"oe","É¹":"r","É»":"r","Éº":"r","â±¹":"r","Ê‡":"t","ÊŒ":"v","Ê":"w","ÊŽ":"y","êœ©":"tz","Ãº":"u","Å­":"u","Ç”":"u","Ã»":"u","á¹·":"u","Ã¼":"u","Ç˜":"u","Çš":"u","Çœ":"u","Ç–":"u","á¹³":"u","á»¥":"u","Å±":"u","È•":"u","Ã¹":"u","á»§":"u","Æ°":"u","á»©":"u","á»±":"u","á»«":"u","á»­":"u","á»¯":"u","È—":"u","Å«":"u","á¹»":"u","Å³":"u","á¶™":"u","Å¯":"u","Å©":"u","á¹¹":"u","á¹µ":"u","áµ«":"ue","ê¸":"um","â±´":"v","êŸ":"v","á¹¿":"v","Ê‹":"v","á¶Œ":"v","â±±":"v","á¹½":"v","ê¡":"vy","áºƒ":"w","Åµ":"w","áº…":"w","áº‡":"w","áº‰":"w","áº":"w","â±³":"w","áº˜":"w","áº":"x","áº‹":"x","á¶":"x","Ã½":"y","Å·":"y","Ã¿":"y","áº":"y","á»µ":"y","á»³":"y","Æ´":"y","á»·":"y","á»¿":"y","È³":"y","áº™":"y","É":"y","á»¹":"y","Åº":"z","Å¾":"z","áº‘":"z","Ê‘":"z","â±¬":"z","Å¼":"z","áº“":"z","È¥":"z","áº•":"z","áµ¶":"z","á¶Ž":"z","Ê":"z","Æ¶":"z","É€":"z","ï¬€":"ff","ï¬ƒ":"ffi","ï¬„":"ffl","ï¬":"fi","ï¬‚":"fl","Ä³":"ij","Å“":"oe","ï¬†":"st","â‚":"a","â‚‘":"e","áµ¢":"i","â±¼":"j","â‚’":"o","áµ£":"r","áµ¤":"u","áµ¥":"v","â‚“":"x"};
    String.prototype.latinise=function(){return this.replace(/[^A-Za-z0-9\[\] ]/g,function(a){return Latinise.latin_map[a]||a})};

    function replaceAll(find, replace, str) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    function pInit(city, autoCity, isPreview){

        var cityAux = replaceAll('Partido', '', decodeURIComponent(city.replace(/\+/g,  " ")));
        cityAux = replaceAll('Province', '', cityAux);
        var c = cityAux.split(',');
        if (c.length < 3) {
            cityAux = replaceAll('%20', '+', c[0]).latinise() + ',' + c[1].latinise();
        }
        else cityAux = replaceAll('%20', '+', c[0]).latinise() + ',' + c[2].latinise();

        cityAux = encodeURI(cityAux);

        settings = {
            urlWeather : "http://api.openweathermap.org/data/2.5/weather?q=" + cityAux + "&lang="+ LanguageManager.getLangPrefix() +"&units=metric",
            urlForecast : "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + cityAux + "&lang="+LanguageManager.getLangPrefix()+"&units=metric&cnt=4",
            isPreview: isPreview
        };

        ciudad = city;

        consultWeatherData();
        consultForecastData();
    //Inicia el reloj
        time = setInterval(clock, 1000);
    }

    function getDirection(angle){
        angle = parseFloat(angle);

        cardinalDirections = {
            'norte' : [0, 22.5],
            'noreste' : [22.5, 67.5],
            'este' : [67.5, 112.5],
            'sudeste' : [112.5, 157.5],
            'sur' : [157.5, 202.5],
            'sudoeste' : [202.5, 247.5],
            'oeste' : [247.5, 292.5],
            'noroeste' : [292.5, 337.5]
        };

        for (var key in cardinalDirections){
            if (angle >= cardinalDirections[key][0] && angle < cardinalDirections[key][1]) return key;
        };

        return 'norte';
    }

    function roundTemperature(value){
        return (Math.round(value * 10) / 10).toFixed(1);
    }

    function getIconWeatherPath(code){
        var icon;
        var aniIcon;
        switch (code){
            case '01d': icon = 'despejado_dia'; aniIcon = "sun"; break;
            case '01n': icon = 'despejado_noche'; aniIcon = "moon"; break;

            case '02d': icon = 'parcial_nublado_dia'; aniIcon = "cloudSun"; break;
            case '02n': icon = 'parcial_nublado_noche'; aniIcon = "cloudMoon"; break;

            case '03d':
            case '03n':
            case '04d':
            case '04n': icon = 'nublado'; aniIcon = "cloud"; break;

            case '09d': icon = 'llovizna'; aniIcon = "cloudDrizzleSun"; break;
            case '09n': icon = 'llovizna'; aniIcon = "cloudDrizzleMoon"; break;

            case '10d': icon = 'lluvia'; aniIcon = "cloudRainSun"; break;
            case '10n': icon = 'lluvia'; aniIcon = "cloudRainMoon"; break;

            case '11d':
            case '11n': icon = 'tormenta'; aniIcon = "cloudLightning"; break;

            case '13d':
            case '13n': icon = 'nieve'; aniIcon = "cloudSnow"; break;

            case '50d': icon = 'niebla'; aniIcon = "cloudFogSun"; break;
            case '50n': icon = 'niebla'; aniIcon = "cloudFogMoon"; break;
        }

        //return ("svg/svgs/" + aniIcon);
        return (aniIcon);
    }

    //Trae la informaciÃ³n correspondiente al dÃ­a actual
    function consultWeatherData(){
       if (settings.isPreview) {
            getJSON(settings.urlWeather, function(data){
                parseWeatherInfo(data);
            }, function(status){});
        }
        else{
            var key = 'weatherData-'+ciudad;

            loadData(key, function(result){

                if (!result){
                    //console.log('vacio');
                    getJSON(settings.urlWeather, function(data){
                            data.dt = new Date().getTime();
                            //console.log('aca guardo: '+data.dt);
                            saveData(key, { 'city' : ciudad, 'data' : data },function(){
                                parseWeatherInfo(data);
                            });

                        }, function(status){}
                    );
                }
                else{
                    var currentDate = new Date(); 
                    //console.log('hay datos');
                    var seconds = (currentDate.getTime() - result.data.dt) / 1000;
                    if (result.city != ciudad || seconds >= 300){
                        getJSON(settings.urlWeather, function(data){
                                data.dt = new Date().getTime();
                                //console.log('pasÃ³ mas de un minuto: '+seconds);
                                saveData(key, { 'city' : ciudad, 'data' : data },function(){
                                    parseWeatherInfo(data);
                                });

                            }, function(status){
                                parseWeatherInfo(result.data);
                            }
                        );
                    }
                    else {
                        try {
                            //console.log('no pasÃ³ un minuto, try');
                            parseWeatherInfo(result.data);
                        } catch (error) {
                            //console.log('no pasÃ³ un minuto, catch');
                            //console.log(error);
                            getJSON(settings.urlWeather,
                                function(data){
                                    saveData(key, { 'city' : ciudad, 'data' : data },function() {
                                    parseWeatherInfo(data);
                                });
                            }, function(status){
                                    //console.log(status);
                                }
                            );
                        }
                    }
                }
            });
        }
    }

    //Trae la informaciÃ³n correspondiente a los proximos dÃ­as
    function consultForecastData(){
        if (settings.isPreview) {
            getJSON(settings.urlForecast, function(data){
                parseForecastInfo(data);
            }, function(status){});
        }else{
            var key = 'forecastData-'+ciudad;
            loadData(key, function(result){

                if (!result){
                    getJSON(settings.urlForecast, function(data){
                            saveData(key, { 'city' : ciudad, 'data' : data },function(){
                                parseForecastInfo(data);
                            });

                        }, function(status){}
                    );
                }
                else{
                    lastUpdate = new Date(result.data.list[0].dt * 1000);
                    if (result.city != ciudad || ((new Date() - lastUpdate) / 3600000) >= 1.0){
                        getJSON(settings.urlForecast, function(data){
                                saveData(key, { 'city' : ciudad, 'data' : data },function(){
                                    parseForecastInfo(data);
                                });

                            }, function(status){
                                parseForecastInfo(result.data);
                            }
                        );
                    }
                    else {
                        try {
                            parseForecastInfo(result.data);
                        } catch (error) {
                            //console.log(error);
                            getJSON(settings.urlWeather,
                                function(data){
                                    saveData(key, { 'city' : ciudad, 'data' : data },function() {
                                    parseForecastInfo(data);
                                });
                            }, function(status){
                                    //console.log(status);
                                }
                            );
                        }
                    }
                }
            });
        }
    }

    function getBodyClass(code){
        var className;
        //console.log(code);
        switch (code){
            case '01d': className = 'despejado_dia'; break;
            case '01n': className = 'despejado_noche'; break;

            case '02d': className = 'parcial_nublado_dia'; break;
            case '02n': className = 'parcial_nublado_noche'; break;

            case '03d':
            case '03n':
            case '04d':
            case '04n': className = 'nublado'; break;

            case '09d': className = 'llovizna_dia'; break;
            case '09n': className = 'llovizna_noche'; break;

            case '10d': className = 'lluvia_dia'; break;
            case '10n': className = 'lluvia_noche'; break;

            case '11d':
            case '11n': className = 'tormenta'; break;

            case '13d':
            case '13n': className = 'nieve'; break;

            case '50d': className = 'niebla_dia'; break;
            case '50n': className = 'niebla_noche'; break;
        }

        //console.log(className);
        return className;
    }

    function parseWeatherInfo(data){
        $('.city').html(data.name);

        var dateTime = new Date();
        $('.date').html(formatDate(dateTime));
        $('.description').html(description[data.weather[0].id]);
        $(".content-degrees p").html(roundTemperature(data.main.temp));

        bodyClassToday = getBodyClass(data.weather[0].icon);
        $('body').addClass(bodyClassToday+' animated fadeIn');

        showToday();
        $('.logo').addClass('animated flipInX delay10');
        $('.footer .open-landscape').addClass('animated flipInX delay10');
        $('.footer .city').addClass('animated flipInX delay10');
        $('.footer .time').addClass('animated flipInX delay10');
    }

    function showToday(){
        $('body').removeClass(bodyClassExtended).addClass(bodyClassToday);
        
        $('.day-1 .svg').removeClass('fadeInUpShort delay3').addClass('fadeOutUpShort');
        $('.day-1 .extended-name').removeClass('fadeInUpShort').addClass('fadeOutUpShort');
        $('.day-1 .extended-status').removeClass('fadeInUpShort').addClass('fadeOutUpShort');
        $('.day-1 .extended-data').removeClass('fadeInUpShort').addClass('fadeOutUpShort');

        $('.day').removeClass('day-bars');
        $('.day-2 .svg').removeClass('fadeInUpShort delay12').addClass('fadeOutUpShort');
        $('.day-2 .extended-name').removeClass('fadeInUpShort delay15').addClass('fadeOutUpShort');
        $('.day-2 .extended-status').removeClass('fadeInUpShort delay15').addClass('fadeOutUpShort');
        $('.day-2 .extended-data').removeClass('fadeInUpShort delay15').addClass('fadeOutUpShort');

        $('.day-3 .svg').removeClass('fadeInUpShort delay18').addClass('fadeOutUpShort');
        $('.day-3 .extended-name').removeClass('fadeInUpShort delay21').addClass('fadeOutUpShort');
        $('.day-3 .extended-status').removeClass('fadeInUpShort delay21').addClass('fadeOutUpShort');
        $('.day-3 .extended-data').removeClass('fadeInUpShort delay21').addClass('fadeOutUpShort');

        $('.date').addClass('animated fadeInUpShort').removeClass('fadeOutUpShort');
        $('.now').addClass('animated fadeInUpShort').removeClass('fadeOutUpShort');
        $('.description').addClass('animated fadeInUpShort').removeClass('fadeOutUpShort');
        $('.content-degrees').addClass('animated fadeInUpShorter delay3').removeClass('fadeOutUpShort');        
        $('.open-portrait').addClass('animated fadeInUpShort delay3').removeClass('fadeOutUpShort');
        
        setTimeout(function(){
            $('.svg').removeClass('animated');
            $('.extended-name').removeClass('animated');
            $('.extended-status').removeClass('animated');
            $('.extended-data').removeClass('animated');
            showExtended();
        }, 20000);
    }

    function showExtended(container){
        $('body').removeClass(bodyClassToday).addClass(bodyClassExtended);

        $('.date').removeClass('fadeInUpShort').addClass('fadeOutUpShort');
        $('.now').removeClass('fadeInUpShort').addClass('fadeOutUpShort');
        $('.description').removeClass('fadeInUpShort').addClass('fadeOutUpShort');
        $('.content-degrees').removeClass('fadeInUpShorter delay3').addClass('fadeOutUpShort');    
        $('.open-portrait').removeClass('fadeInUpShort delay5').addClass('fadeOutUpShort');    

        $('.day-1 .svg').addClass('animated fadeInUpShort delay3').removeClass('fadeOutUpShort');
        $('.day-1 .extended-name').addClass('animated fadeInUpShort ').removeClass('fadeOutUpShort');
        $('.day-1 .extended-status').addClass('animated fadeInUpShort').removeClass('fadeOutUpShort');
        $('.day-1 .extended-data').addClass('animated fadeInUpShort').removeClass('fadeOutUpShort');

        $('.day-2 .svg').addClass('animated fadeInUpShort delay12').removeClass('fadeOutUpShort');
        $('.day-2 .extended-name').addClass('animated fadeInUpShort delay15').removeClass('fadeOutUpShort');
        $('.day-2 .extended-status').addClass('animated fadeInUpShort delay15').removeClass('fadeOutUpShort');
        $('.day-2 .extended-data').addClass('animated fadeInUpShort delay15').removeClass('fadeOutUpShort');

        $('.day-3 .svg').addClass('animated fadeInUpShort delay18').removeClass('fadeOutUpShort');
        $('.day-3 .extended-name').addClass('animated fadeInUpShort delay21').removeClass('fadeOutUpShort');
        $('.day-3 .extended-status').addClass('animated fadeInUpShort delay21').removeClass('fadeOutUpShort');
        $('.day-3 .extended-data').addClass('animated fadeInUpShort delay21').removeClass('fadeOutUpShort');

        $('.day').addClass('day-bars');
        
        setTimeout(function(){
            $('.date').removeClass('animated');
            $('.now').removeClass('animated');
            $('.description').removeClass('animated');
            $('.content-degrees').removeClass('animated');
            showToday();
        }, 20000);
    }

    function parseForecastInfo(data){
        var day;
        for (day in data.list){
            if (day > 0){
                var date = new Date(data.list[day].dt * 1000);

                if (day == 1){
                    bodyClassExtended = getBodyClass(data.list[day].weather[0].icon);
                }
                $('#forecast-image-' + day).find('object').remove();
                $('#bigIcon').find('.svg-'+getIconWeatherPath(data.list[day].weather[0].icon)).clone().appendTo($('#forecast-image-' + day)).addClass('climacon-visible').attr('id','svg-forecast-' + day);
                $('#forecast-day-' + day).html(getDayName(date));
                $('#forecast-description-' + day).html(description[data.list[day].weather[0].id]);
                $('#forecast-temperature-min-' + day).html(roundTemperature(data.list[day].temp.min));
                $('#forecast-temperature-max-' + day).html(roundTemperature(data.list[day].temp.max));

            }
        }

        /*PONER EN EL FOR EN FORMA DINAMICA!!!*/
        var a = document.getElementById("svg-forecast-1");
        a.addEventListener("load",function() {
            var svgDoc = a.contentDocument;
            var svgItem = svgDoc.getElementById("svgItem");
            if (bodyClassExtended == 'nieve'){
                svgItem.setAttribute("fill", '#006987');
            }else if(bodyClassExtended == 'niebla_dia'){
                svgItem.setAttribute("fill", '#006987');
            }else{
                svgItem.setAttribute("fill", svgFill);
            }
        },false);

        var a2 = document.getElementById("svg-forecast-2");
        a2.addEventListener("load",function() {
            var svgDoc = a2.contentDocument;
            var svgItem = svgDoc.getElementById("svgItem");
            if (bodyClassExtended == 'nieve'){
                svgItem.setAttribute("fill", '#006987');
            }else if(bodyClassExtended == 'niebla_dia'){
                svgItem.setAttribute("fill", '#006987');
            }else{
                svgItem.setAttribute("fill", svgFill);
            }
        },false);

        var a3 = document.getElementById("svg-forecast-3");
        a3.addEventListener("load",function() {
            var svgDoc = a3.contentDocument;
            var svgItem = svgDoc.getElementById("svgItem");
            if (bodyClassExtended == 'nieve'){
                svgItem.setAttribute("fill", '#006987');
            }else if(bodyClassExtended == 'niebla_dia'){
                svgItem.setAttribute("fill", '#006987');
            }else{
                svgItem.setAttribute("fill", svgFill);
            }
        },false);
        /*PONER EN EL FOR EN FORMA DINAMICA!!!*/

    }

    function formatDate(entryDate){
        if (entryDate){
            var date = new Date(entryDate);
        }else{
            var date = new Date();
        }
        return day[date.getDay()] + ' ' + date.getDate() + ', ' + month[date.getMonth()] + ' ' + date.getFullYear();
    }

    function getDayName(entryDate){

        var date = new Date(entryDate);

        return day[date.getDay()];
    }

    function getLocation(callBack) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(callBack);
        } else {
            //console.log("Geolocation is not supported by this browser.");
        }
    }
    function showPosition(position) {
        latLong = "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
    }

    function init(city, autoCity,isPreview,language){

        LanguageManager.init(language,function(langObj){

            description = langObj["description"];
            month = langObj["month"];
            wind_strings = langObj["wind_strings"];
            day = langObj["day"];
            html_strings = langObj["html_strings"];

            for (var key in html_strings) {
                if (html_strings.hasOwnProperty(key)) {
                $('#'+key).html(html_strings[key]);
                }
            }

            pInit(city, autoCity,isPreview);
        });

    }

    return{
        init : init
    }
})();

function show(){
    $('.header-central-header').addClass('animated fadeInDown');
    $('.header-feed').addClass('animated fadeInLeft');
    $('.header-url').addClass('animated fadeInRight');

    var $delay = 0.5;
    $(".bottom-item").each(function(index) {
        $(this).css({'animation-delay':$delay+'s','-webkit-animation-delay':$delay+'s'}).addClass('animated fadeInUp');
        $delay+=0.3;
    });

    $delay = 0.5;
    $(".extend-item").each(function(index) {
        $(this).css({'animation-delay':$delay+'s','-webkit-animation-delay':$delay+'s'}).addClass('animated fadeInRight');
        $delay+=0.3;
    });

    $delay = 0.5;
    $(".site-data-left").each(function(index) {
        $(this).css({'animation-delay':$delay+'s','-webkit-animation-delay':$delay+'s'}).addClass('animated fadeInLeft');
        $delay+=0.3;
    });

}

/******************************************************/
var svgFill = "#fff";
var bodyClassToday; 
var bodyClassExtended; 
var contentToday = $('.content-today');
var contentExtended = $('.content-extended');

$(document).ready(function(){

    console.info( "acdA" );
    var $pantalla = $(window),
        $ancho_pantalla = $pantalla.width(),
        $alto_pantalla = $pantalla.height(),
        $main_color = $('body').attr('data-main-color');

    console.log( location.search );

    if ($pantalla.width() > $pantalla.height()) { $('body').css('zoom',parseFloat($alto_pantalla*100/1080)+'%');}
    else { $('body').css('zoom',parseFloat($ancho_pantalla*100/1080)+'%'); }
   
    var d = decodeURIComponent(location.search);
    console.log( d );
    console.log( location.search );
    d = d.replace('?data=', '');
    d = JSON.parse(d);

    Weather.init(d.city || '', d.autoCity || false, d.isPreview, d.language || "es");
    setTimeout(function(){
        show();
    }, 700);

    setTimeout(function(){
        location = ''
    },300000)
});

$(window).resize(function(){location.reload();});
/******************************************************/