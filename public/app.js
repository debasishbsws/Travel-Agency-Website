const auth = firebase.auth();

const db = firebase.firestore();



const signInBtn = document.getElementById('signInBtn');

const signOutBtn = document.getElementById('signOutBtn');

const signInPer = document.getElementById('signInPer');



const provider = new firebase.auth.GoogleAuthProvider();



signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
    if (user) {
        //signed in
        signInBtn.hidden = true;
        signOutBtn.hidden = false;
        signInPer.innerHTML = "Hello " + user.displayName;

    } else {
        // not signed in
        signInBtn.hidden = false;
        signOutBtn.hidden = true;
        signInPer.innerHTML = "Please Sign in";
    }
});

//add message in db

const frm = document.getElementById('meg-inp');
message_ref = db.collection('Feedback-Message')

auth.onAuthStateChanged(user => {
    if (user) {
        frm.addEventListener('submit', (e) => {
            const { serverTimestamp } = firebase.firestore.FieldValue;
            e.preventDefault();
            message_ref.add({
                uname: user.displayName,
                uphon: frm.phNo.value,
                uemail: user.email,
                umessage: frm.message.value,
                sentAt: serverTimestamp()

            });
            frm.phNo.value = "";
            frm.message.value = "";

        })
    }

})