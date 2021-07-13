
const auth = firebase.auth();

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const provider = new firebase.auth.GoogleAuthProvider();

signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
    if (user) {
        //signed in
        signInBtn.hidden = true;
        signOutBtn.hidden = false;

    } else {
        // not signed in
        signInBtn.hidden = false;
        signOutBtn.hidden = true;
    }
});