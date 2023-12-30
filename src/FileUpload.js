// src/components/FileUpload.js
import React, { useEffect, useState } from 'react';
import StartFirebase from './firebase/config';
import { set, ref as databaseREf } from 'firebase/database';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const FileUpload = ({ title }) => {
    const [image, setImage] = useState(null);
    const [imageVideoG, setImageVideoG] = useState([{ href: "" }]);

    useEffect(() => {
        image && uploadFile(image, "imageURL");
    }, [image]);

    const uploadFile = (file, fileType) => {
        const { storage } = StartFirebase();
        const folder = fileType === 'imageURL' ? 'images/' : "videos/";
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, folder + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;

                    default:
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setImageVideoG((prevImageVideoG) => {
                        const updatedImageVideoG = [...prevImageVideoG];
                        updatedImageVideoG.push({ href: downloadURL });
                        return updatedImageVideoG;
                    });
                });
            }
        )
    }
    const handleAddInput = () => {
        setImageVideoG((prevImageVideoG) => {
            const newArray = prevImageVideoG || [];
            return [...newArray, { href: '' }];
        });
    };

    const handleDeleteInput = (index) => {
        const newImageVideoG = [...imageVideoG];
        newImageVideoG.splice(index, 1);
        setImageVideoG(newImageVideoG);
    };

    const { database } = StartFirebase();
    const handleSubmit = async (e) => {
        e.preventDefault();

        set(databaseREf(database, "compaign/"), {
            image,
            imageVideoG,
        }).then(() => {
            alert("Added");
        })
    };
    return (
        <div>
            <div>
                <h3>Image Video Gallery:</h3>
                <form onSubmit={handleSubmit}>
                    {imageVideoG.map((item, index) => (
                        <div key={index}>
                            <label>File {index + 1}</label>
                            <input type='file' onChange={(e) => setImage(e.target.files[0])} />
                            <button type='button' onClick={() => handleDeleteInput(index)}>Delete</button>
                        </div>
                    ))}
                    <button type='button' onClick={handleAddInput}>Add Another File</button>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default FileUpload;
