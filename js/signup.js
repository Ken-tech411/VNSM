let signupbtn = document.getElementById("signupbtn")
let nameUser = document.getElementById("nametxt")
let email = document.getElementById("emailtxt")
let password = document.getElementById("passwordtxt")

signupbtn.addEventListener('click', function () {
    const selectedFile = document.getElementById('upload').files[0];
    var storageRef = firebase.storage().ref();
    imagesRef = storageRef.child('images/' + selectedFile.name);
    imagesRef.put(selectedFile).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        imagesRef.getDownloadURL()
            .then((url) => {
                auth.createUserWithEmailAndPassword(email.value, password.value)
                    .then((userCredential) => {
                        // Signed in 
                        var user = userCredential.user;
                        let uid = user.uid;
                        db.collection('users').doc(uid).set({
                            name: nameUser.value,
                            displayName: nameUser.value,
                            email: email.value,
                            avatar: url
                        }).then(function () {
                            console.log("Document successfully written!")
                            alert("Successfully sign up")
                            window.location.href = "/signin.html"
                        })

                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        alert(errorMessage)
                    });

            })


    })
        .catch((error) => {
            // Handle any errors
        });



});