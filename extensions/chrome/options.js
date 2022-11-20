let storage = chrome.storage.sync || chrome.storage.local;
let server = get('server');
let key = get('key');
let autoActivate = get('auto-activate');
let iceServers = get('ice-servers');

const defaultIceServers = `[
  {
    "url": "stun:stun.turnservers.com:3478"
  },
  {
    "url": "stun:stun01.sipphone.com"
  },
  {
    "url": "stun:stun.ekiga.net"
  },
  {
    "url": "stun:stun.fwdnet.net"
  },
  {
    "url": "stun:stun.ideasip.com"
  },
  {
    "url": "stun:stun.iptel.org"
  },
  {
    "url": "stun:stun.rixtelecom.se"
  },
  {
    "url": "stun:stun.schlund.de"
  },
  {
    "url": "stun:stun.l.google.com:19302"
  },
  {
    "url": "stun:stun1.l.google.com:19302"
  },
  {
    "url": "stun:stun2.l.google.com:19302"
  },
  {
    "url": "stun:stun3.l.google.com:19302"
  },
  {
    "url": "stun:stun4.l.google.com:19302"
  },
  {
    "url": "stun:stunserver.org"
  },
  {
    "url": "stun:stun.softjoys.com"
  },
  {
    "url": "stun:stun.voiparound.com"
  },
  {
    "url": "stun:stun.voipbuster.com"
  },
  {
    "url": "stun:stun.voipstunt.com"
  },
  {
    "url": "stun:stun.voxgratia.org"
  },
  {
    "url": "stun:stun.xten.com"
  },
  {
    "url": "turn:numb.viagenie.ca",
    "credential": "muazkh",
    "username": "webrtc@live.com"
  },
  {
    "url": "turn:192.158.29.39:3478?transport=udp",
    "credential": "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
    "username": "28224511:1379330808"
  },
  {
    "url": "turn:192.158.29.39:3478?transport=tcp",
    "credential": "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
    "username": "28224511:1379330808"
  }
]`;

function get(id) {
  return document.getElementById(id) || id;
}

function on(elem, type, listener) {
  get(elem).addEventListener(type, listener, false);
}

function restore() {
  storage.get(
    {
      server: '',
      key: '',
      autoActivate: false,
      iceServers: defaultIceServers,
    },
    item => {
      server.value = item.server;
      key.value = item.key;
      autoActivate.checked = item.autoActivate;
      iceServers.value = item.iceServers;
    }
  );
}

function save() {
  storage.set(
    {
      server: server.value,
      key: key.value,
      autoActivate: autoActivate.checked,
      iceServers: iceServers.value,
    },
    () => {
      chrome.runtime.sendMessage({ event: 'optionschange' }, response => {
        if (response.success) {
          window.close();
        }
      });
    }
  );
}

function cancel() {
  window.close();
}

on('save', 'click', save);
on('cancel', 'click', cancel);
restore();