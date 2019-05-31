(function () {

    var localTimeBox, newZoneTimeBox, citiesList, buttonsLang;
    var title, localTimeLabel, localTimeSelectLabel, localTimeSelect;
    var twelveHourClock, twentyFourHourClock, twelveHourLabel, twentyFourHourLabel;
    var date, hours, minutes, seconds;

    var languages = {};

    languages.en = {};
    languages.en.title = 'Time Zone Converter';
    languages.en.formatTwelve = '12 Hour Clock';
    languages.en.formatTwentyFour = '24 Hour Clock';
    languages.en.localTimeLabel = 'Local time in Berlin';
    languages.en.localTimeSelectLabel = 'Local time in';
    languages.en.localTimeSelect = 'select city';

    languages.de = {};
    languages.de.title = 'Zeitzonen Konverter';
    languages.de.formatTwelve = '12-Stunden-Format';
    languages.de.formatTwentyFour = '24-Stunden-Format';
    languages.de.localTimeLabel = 'Aktuelle Uhrzeit in Berlin';
    languages.de.localTimeSelectLabel = 'Aktuelle Uhrzeit in';
    languages.de.localTimeSelect = 'Stadt auswählen';

    languages.it = {};
    languages.it.title = 'Convertitore di fuso orario';
    languages.it.formatTwelve = 'Formato 12 ore';
    languages.it.formatTwentyFour = 'Formato 24 ore';
    languages.it.localTimeLabel = 'Ora corrente a Berlino';
    languages.it.localTimeSelectLabel = 'Ora corrente a';
    languages.it.localTimeSelect = 'Selezionare città';

    languages.es = {};
    languages.es.title = 'Conversor horario';
    languages.es.formatTwelve = 'Reloj de 12-Horas';
    languages.es.formatTwentyFour = 'Reloj de 24-Horas';
    languages.es.localTimeLabel = 'Hora actual en Berlin';
    languages.es.localTimeSelectLabel = 'Hora actual en';
    languages.es.localTimeSelect = 'seleccione la ciudad';


    function init() {
        date = new Date();
        hours = addZero(date.getHours());
        minutes = addZero(date.getMinutes());
        seconds = addZero(date.getSeconds());
        
        buttonsLang = document.querySelectorAll('button.btn');
        
        title = document.querySelector('#title');
        
        // Radio Buttons Labels
        twelveHourLabel = document.querySelector('#twelve-label');
        twentyFourHourLabel = document.querySelector('#twenty-four-label');

        // Radio Buttons
        twelveHourClock = document.querySelector('#twelve');
        twentyFourHourClock = document.querySelector('#twenty-four');
        
        localTimeLabel = document.querySelector('#localTimeLabel');
        localTimeBox = document.querySelector('[name="local-time"]');
        
        localTimeSelectLabel = document.querySelector('#localTimeSelectLabel');
        localTimeSelect = document.querySelector('#localTimeSelect');
        newZoneTimeBox = document.querySelector('[name="new-zone-time"]');
        
        // select city - options
        citiesList = document.querySelector('#cities');

        // showing local time when the page is loaded     
        showLocalTime();

        citiesList.addEventListener('change', showNewTime);
        
        twelveHourClock.addEventListener('change', showTime);
        twentyFourHourClock.addEventListener('change', showTime);
        
        for (var i = 0; i < buttonsLang.length; i++) {
            buttonsLang[i].addEventListener('click', selectLanguage);
        }

    }

    /**
     * Selecting the language of the UI from the object @var languages
     * 
     * @param {event} e
     * @returns {undefined}
     */

    function selectLanguage(e) {
        e.preventDefault();
        var lang = this.dataset.lang;
        title.innerText = languages[lang]['title'];
        twelveHourLabel.innerText = languages[lang]['formatTwelve'];
        twentyFourHourLabel.innerText = languages[lang]['formatTwentyFour'];
        localTimeLabel.innerText = languages[lang]['localTimeLabel'];
        localTimeSelectLabel.innerText = languages[lang]['localTimeSelectLabel'];
        localTimeSelect.innerText = languages[lang]['localTimeSelect'];
    }
    
    /**
     * Showing the time for both local time zone (Berlin) 
     * and, if selected, for the selected city
     * @returns {undefined}
     */
    
    function showTime() {
        showLocalTime();
        if (citiesList.value !== '') {
            showNewTime();
        }
    }

    /**
     * Setting hours for the new time zone of the selected city
     * 
     * @returns {Number|String}
     */

    function setNewTimeHours() {
        var newTimehours;
        switch (citiesList.value) {
            case 'SanFrancisco':
                newTimehours = hours - 9;
                break;
            case 'Pyongyang':
                newTimehours = hours + 7;
                break;
            case 'Sidney':
                newTimehours = hours + 8;
                break;
            case 'MexicoCity':
                newTimehours = hours - 7;
                break;
            case 'Marrakesh':
                newTimehours = hours - 2;
                break;
            default:
                newTimehours = date.getHours();
                break;
        }

        if (newTimehours > 24) {
            newTimehours -= 24;
        } else if (newTimehours < 0) {
            newTimehours = 24 + newTimehours;
        }

        newTimehours = addZero(newTimehours);

        return newTimehours;
    }
    
    /**
     * Showing the time of the selected city / new time zone
     * 
     * @returns {undefined}
     */

    function showNewTime() {
        var selectedCityHours = setNewTimeHours();
        newZoneTimeBox.value = setClock(selectedCityHours);
    }

    /**
     * Showing the local time
     * 
     * @returns {undefined}
     */

    function showLocalTime() {
        localTimeBox.value = setClock(hours);
    }
    
     /**
     * Creating the time-String for both 12 Hour and 24 Hour Clock
     * 
     * @param {number} currentHours
     * @returns {String}
     */
    
    function setClock(currentHours) {
        var time = '';
        if (twelveHourClock.checked) {
            switch (true) {
                case currentHours > 12:
                    currentHours -= 12;
                    currentHours = addZero(currentHours);
                    time = currentHours + ':' + minutes + ':' + seconds + ' PM';
                    break;
                case currentHours === 12:
                    time = currentHours + ':' + minutes + ':' + seconds + ' PM';
                    break;
                case currentHours < 12:
                    time = currentHours + ':' + minutes + ':' + seconds + ' AM';
                    break;
            }
        } else {
            time = currentHours + ':' + minutes + ':' + seconds;
        }
        return time;
    }
    
    /**
     * Adding a zero if the passed value (hours, minutes or seconds) 
     * is only a one-digit number
     * 
     * @param {number} value
     * @returns {String}
     */
       
    function addZero(value) {
        if (value < 10) {
            value = '0' + value;
        }

        return value;
    }

    window.addEventListener('load', init);
})();
