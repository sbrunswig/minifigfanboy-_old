import firebase from 'firebase'

// initialize Firebase
firebase.initializeApp(Env.firebase)
var auth = firebase.auth()
var database = firebase.database()

// variable
var _userInfo = {}
var _minifigs = {}
var _userRef = null

export default {
    initFirebase () {
        // Initiates Firebase auth and listen to auth state changes.
        auth.onAuthStateChanged(this.onAuthStateChanged.bind(this))
    },
    
    signIn () {
        // Sign in Firebase using popup auth and Google as the identity provider.
        var provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    },

    signOut () {
        auth.signOut()
    },

    // triggers when the auth state change for example when the user signs-in or signs-out.
    onAuthStateChanged (user) {
        if (user) { // User is signed in
            this.fetchUserInfo(user.uid) // check if user in db
            .then(val => {
                _userInfo = {
                    loggedIn: true,
                    uid: user.uid,
                    name: val.name || user.displayName,
                    profilePicUrl: user.photoURL
                }
                _App.$store.dispatch('onAuthStateChanged', Object.assign({}, _userInfo))
            }).catch(() => { // if fetchuser is reject then just set user state
                _userInfo = {
                    loggedIn: true,
                    uid: user.uid,
                    name: user.displayName,
                    profilePicUrl: user.photoURL
                }
                _App.$store.dispatch('onAuthStateChanged', Object.assign({}, _userInfo))
            })
        } else { // no user logged in
            _userInfo = {
                loggedIn: false,
                uid: '',
                name: 'guest',
                profilePicUrl: ''
            }
            _App.$store.dispatch('onAuthStateChanged', Object.assign({}, _userInfo))
        }
    },

    // check if user in db
    fetchUserInfo (uid) {
        return new Promise((resolve, reject) => {
            _userRef = database.ref('users')
            _userRef.child(uid).once('value')
            .then(snapshot => {
                const user = snapshot.val()
                resolve(user)
            }).catch(reject)
        })
    },
  
    // retreive data from database
    fetchMinifigs (count) {
        _minifigs = {};
        return new Promise((resolve, reject) => {
            database.ref('minifig').limitToLast(count).once('value')
            .then(snapshot => {
                const minifig = snapshot.val() || {}
                Object.keys(minifig).forEach(key => {
                    _minifigs[key] = minifig[key]
                })
                resolve(Object.assign({}, _minifigs))
            }).catch(reject)
        })
    },

    fetchBATMinifigs () {
        _minifigs = {};
        return new Promise((resolve, reject) => {
            database.ref('minifig').equalTo(570).orderByChild('category_id').once('value')
            .then(snapshot => {
                const minifig = snapshot.val() || {}
                Object.keys(minifig).forEach(key => {
                    _minifigs[key] = minifig[key]
                })
                resolve(Object.assign({}, _minifigs))
            }).catch(reject)
        })
    },

    fetchCOLTLBMMinifigs () {
        _minifigs = {};
        return new Promise((resolve, reject) => {
            database.ref('minifig').equalTo(746).orderByChild('category_id').once('value')
            .then(snapshot => {
                const minifig = snapshot.val() || {}
                Object.keys(minifig).forEach(key => {
                    _minifigs[key] = minifig[key]
                })
                resolve(Object.assign({}, _minifigs))
            }).catch(reject)
        })
    },

    fetchDIMMinifigs () {
        _minifigs = {};
        return new Promise((resolve, reject) => {
            database.ref('minifig').equalTo(860).orderByChild('category_id').once('value')
            .then(snapshot => {
                const minifig = snapshot.val() || {}
                Object.keys(minifig).forEach(key => {
                    _minifigs[key] = minifig[key]
                })
                resolve(Object.assign({}, _minifigs))
            }).catch(reject)
        })
    },

    fetchJUNIORMinifigs () {
        _minifigs = {};
        return new Promise((resolve, reject) => {
            database.ref('minifig').equalTo(809).orderByChild('category_id').once('value')
            .then(snapshot => {
                const minifig = snapshot.val() || {}
                Object.keys(minifig).forEach(key => {
                    _minifigs[key] = minifig[key]
                })
                resolve(Object.assign({}, _minifigs))
            }).catch(reject)
        })
    },

    fetchSHMinifigs () {
        _minifigs = {};
        return new Promise((resolve, reject) => {
            database.ref('minifig').equalTo(768).orderByChild('category_id').once('value')
            .then(snapshot => {
                const minifig = snapshot.val() || {}
                Object.keys(minifig).forEach(key => {
                    _minifigs[key] = minifig[key]
                })
                resolve(Object.assign({}, _minifigs))
            }).catch(reject)
        })
    },

    fetchSPDMinifigs () {
        _minifigs = {};
        return new Promise((resolve, reject) => {
            database.ref('minifig').equalTo(469).orderByChild('category_id').once('value')
            .then(snapshot => {
                const minifig = snapshot.val() || {}
                Object.keys(minifig).forEach(key => {
                    _minifigs[key] = minifig[key]
                })
                resolve(Object.assign({}, _minifigs))
            }).catch(reject)
        })
    },

    fetchTLMMinifigs () {
        _minifigs = {};
        return new Promise((resolve, reject) => {
            database.ref('minifig').equalTo(804).orderByChild('category_id').once('value')
            .then(snapshot => {
                const minifig = snapshot.val() || {}
                Object.keys(minifig).forEach(key => {
                    _minifigs[key] = minifig[key]
                })
                resolve(Object.assign({}, _minifigs))
            }).catch(reject)
        })
    }      
}
