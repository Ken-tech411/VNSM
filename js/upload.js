var storageRef = firebase.storage().ref();
var metadata = {
    contentType: 'image/png',
};
let uploadBtn = document.getElementById("uploadBtn");

uploadBtn.addEventListener("click", function () {
    const selectedFile = document.getElementById('upload').files[0];
    imagesRef = storageRef.child('images/' + selectedFile.name);
    imagesRef.put(selectedFile, metadata).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        imagesRef.getDownloadURL()
            .then((url) => {
                db.collection("users").doc(user.uid).get().then((doc) => {

                    let newData = { ...doc.data() };
                    newData.avatar = url;
                    db.collection("users").doc(doc.id).set(newData)
                        .then(() => {
                            console.log("Document successfully written!");
                        })
                        .catch((error) => {
                            console.error("Error writing document: ", error);
                        });

                })


            })
            .catch((error) => {
                // Handle any errors
            });

    });
})