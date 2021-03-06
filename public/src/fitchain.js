function login() {
    console.log('makeAccount');
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    console.log('email:' + email);

    var xhr = new XMLHttpRequest();

    var uri = 'login';

    var messagearea = document.getElementById('messagearea');
    messagearea.innerHTML = '';

    xhr.open('POST', encodeURI(uri));
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function (response) {
        if (xhr.status === 200) {

            console.log('response');
            console.log(xhr.responseText);

            var reply = JSON.parse(xhr.responseText);

            console.log(reply);

            if (reply.outcome === 'success') {
                window.location = './profile'
            } else {
                messagearea.innerHTML = 'Something went wrong - try again';
            }


        } else if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send(encodeURI('email=' + email + '&password=' + password));
}

function checkStatus() {

    get('./isLoggedIn', function (reply) {

        var login = document.getElementById('login');
        var logout = document.getElementById('logout');

        if (reply.outcome === 'success') {

            if (login) {
                login.style.display = 'none';
            }
            if (login) {
                logout.style.display = 'inherit';
            }
        } else {
            if (logout) {
                logout.style.display = 'none';
            }
            if (login) {
                login.style.display = 'inherit';
            }
        }
    });
}

// Enter is pressed
function newEvent(e, target) {
    if (e.which === 13 || e.keyCode === 13) {

        if (target === "login") {
            login();
        }
    }
}

function makeAccount() {
    console.log('makeAccount');
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var messagearea = document.getElementById('messagearea');
    messagearea.innerHTML = '';

    console.log('email:' + email);

    var xhr = new XMLHttpRequest();

    var uri = 'signup';

    xhr.open('POST', encodeURI(uri));
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function (response) {

        var reply = JSON.parse(xhr.responseText);
        if (xhr.status === 200) {
            if (reply.outcome === 'success') {
                window.location = './login'
            } else {
                email = '';
                password = '';
                messagearea.innerHTML = 'Something went wrong - try again';
            }
        } else if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send(encodeURI('email=' + email + '&password=' + password));
}

function get(path, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(JSON.parse(xmlhttp.responseText));
        }
    }
    xmlhttp.open("GET", path, true);
    xmlhttp.send();
}

function challengeView(event) {
    console.log('return to challenge view');
    selectChallengesTab();
}

function loadData(target, callback) {
    var xhr = new XMLHttpRequest();

    var uri = './' + target;
    xhr.open('GET', encodeURI(uri));
    xhr.onload = function (response) {
        if (xhr.status === 200) {

            console.log('response');
            console.log(xhr.responseText);

            var reply = JSON.parse(xhr.responseText);

            if (reply.outcome === 'success') {
                callback(reply);
            } else {}


        } else if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
};

function setter(domid, value) {
    var element = document.getElementById(domid);
    element.innerHTML = value;
}

function processSummaryData(data) {
    setter('challengecount', data.challenges);
    setter('workoutcount', data.workouts);
    setter('rewardcount', data.rewards);
    setter('hourcount', data.hours);
    setter('caloriecount', data.calories);
    console.log(data);
}

function processChallengesData(data) {
    console.log(data);

    var challengelist = document.getElementById('challengelist');

    challengelist.innerHTML = '';

    data.challenges.forEach(function (challenge) {

        var start = moment(challenge.start).format('YYYY-MM-DD');
        var end = moment(challenge.end).format('YYYY-MM-DD');

        var challengeitem = document.createElement('div');
        challengeitem.className = 'challengeitem';

        challengeitem.innerHTML = '<div class="challengevisual"><img class="challengeicon" src="images/' + challenge.image + '"></div>';

        var challengeblock = document.createElement('div');
        challengeblock.className = 'challengeblock';

        challengeblock.innerHTML = '<div class="challengetitle">' + challenge.title + '</div>' +
            '<div class = "time">' +
            '<div class = "begin">' +
            '<div class = "beginlabel">STARTS</div>' +
            '<div class = "begins">' + start + '</div>' +
            '</div>' +
            '<div class = "conclude">' +
            '<div class = "endlabel">ENDS</div>' +
            '<div class = "ends">' + end + '</div>' +
            '</div>' +
            '</div>' +
            '<div class = "progress">' +
            '<div class = "begin">' +
            '<div class = "beginlabel">GOAL</div>' +
            '<div class = "begins">' + challenge.goal + '</div>' +
            '</div>' +
            '<div class = "conclude">' +
            '<div class = "endlabel">LOGGED</div>' +
            '<div class = "ends">' + challenge.logged + '</div>' +
            '</div>' +
            '</div>' +
            '<div class = "progressbar"></div>' +
            '<button class = "challengebutton"> START WORKOUT </button>';

        challengeitem.appendChild(challengeblock);

        challengelist.appendChild(challengeitem);
    })
}

function processHistoryData(data) {
    console.log(data);
    var historylist = document.getElementById('historylist');

    historylist.innerHTML = '';

    data.history.forEach(function (item) {

        var historyitem = document.createElement('div');
        historyitem.className = 'historyitem';

        historyitem.innerHTML = '<div class="historyvisual">' +
            '<img class="historyicon" src="images/' + item.image + '">' +
            '</div>' +
            '<div class="historydetails">' +
            '<div class="timestamp">' +
            '<div class="datestamp">SUNDAY MAY 28</div>' +
            '<div class="clock">' +
            '<div class="beginstamp">9:00</div>' +
            '<div class="dash">-</div>' +
            '<div class="endstamp">10:00</div>' +
            '</div>' +
            '</div>' +
            '<div class="progress">' +
            '<div class="begin">' +
            '<div class="beginlabel">CALORIES</div>' +
            '<div class="begins">' + item.calories + '</div>' +
            '</div>' +
            '<div class="conclude">' +
            '<div class="endlabel">HEART RATE</div>' +
            '<div class="ends">' + item.heart + '</div>' +
            '</div>' +
            '</div>' +
            '<div class="progress">' +
            '<div class="begin">' +
            '<div class="beginlabel">DISTANCE</div>' +
            '<div class="begins">' + item.distance + 'km</div>' +
            '</div>' +
            '<div class="conclude">' +
            '<div class="endlabel">PACE</div>' +
            '<div class="ends">' + item.pace + 'km/h</div>' +
            '</div>' +
            '</div>' +
            '</div>'

        historylist.appendChild(historyitem);
    })
}

function processMarketData(data) {
    console.log(data);

    var marketlist = document.getElementById('marketlist');

    marketlist.innerHTML = '';

    data.challenges.forEach(function (challenge) {

        var marketitem = document.createElement('div');
        marketitem.className = 'marketitem';
        marketitem.innerHTML = '<div class="challengetitle">' + challenge.title + ' </div>' +
            '<div class="marketvisual"><img class="marketicon" src="images/' + challenge.image + '"></div>' +
            '<div class="marketdescription">' + challenge.description + '</div>' +
            '<button class="marketbutton">ACCEPT CHALLENGE</button>';

        marketlist.appendChild(marketitem);
    })

}

var callbacks = [];

callbacks['summary'] = processSummaryData;
callbacks['challenges'] = processChallengesData;
callbacks['history'] = processHistoryData;

function addChallenges(e) {

    deselectTabs();

    var challenges = document.getElementById('challenges');
    challenges.style.opacity = '1.0';

    var marketstage = document.getElementById('marketstage');
    marketstage.style.display = 'flex';

    var navigation = document.getElementById('navigation');
    navigation.innerHTML = 'MARKET';

    var rightnavimg = document.getElementById('rightnavimg');
    rightnavimg.style.visibility = 'hidden';

    var leftnav = document.getElementById('leftnav');
    leftnav.innerHTML = '<';

    loadData('market', processMarketData);
}

function deselectTabs() {
    var elements = ['summary', 'challenges', 'history'];

    elements.forEach(function (element) {
        var element = document.getElementById(element + "stage");
        element.style.display = 'none';
    })

    elements.forEach(function (element) {
        var element = document.getElementById(element);
        element.style.opacity = '0.4';
    })
}

function selectTab(e) {

    /* load data */

    loadData(e.srcElement.id, callbacks[e.srcElement.id]);

    /* make sure the market view is hidden */

    var marketstage = document.getElementById('marketstage');
    marketstage.style.display = 'none';

    /* make sure all of the tab views are hidden */

    deselectTabs();

    /* light up the tab that was selected */

    e.srcElement.style.opacity = '1.0';

    /* manage the left and right navigation sides */

    var rightnavimg = document.getElementById('rightnavimg');
    var leftnav = document.getElementById('leftnav');

    if (e.srcElement.id === 'challenges') {
        rightnavimg.style.visibility = 'visible';
        leftnav.innerHTML = '';
    } else {
        rightnavimg.style.visibility = 'hidden';
        leftnav.innerHTML = '';
    }

    /* set the name of the view */

    var navigation = document.getElementById('navigation');
    navigation.innerHTML = e.srcElement.id.toUpperCase();

    /* switch from display none, to display flex for the selected tab */

    var selected = document.getElementById(e.srcElement.id + "stage");

    if (selected !== null) {
        selected.style.display = 'flex';
    }
}

function selectChallengesTab() { /* faking a selection of the Summary tab */
    var challengesButton = document.getElementById('challenges');
    challengesButton.click();
}

function selectSummaryTab() { /* faking a selection of the Summary tab */
    var summaryButton = document.getElementById('summary');
    summaryButton.click();
}

function home(event) {
    window.history.back();
}

window.addEventListener("load", function load(event) {
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    selectSummaryTab();

    checkStatus();
}, false);
