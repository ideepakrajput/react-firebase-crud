import React, { useState } from 'react';
import StartFirebase from './firebase/config';
import { set, ref, get, remove, child, update } from 'firebase/database';
import { ref as refStorage, uploadBytes, getDownloadURL } from "firebase/storage";

const Form = () => {
    const [title, setTitle] = useState('');
    const [athleteName, setAthleteName] = useState('');
    const [athleteAge, setAthleteAge] = useState('');
    const [athleteCity, setAthleteCity] = useState('');
    const [topAchievement, setTopAchievement] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [shortTermGoal, setShortTermGoal] = useState('');
    const [longTermGoal, setLongTermGoal] = useState('');
    const [highlights, setHighlights] = useState([{ title: "", content: "" }]);
    const [heading2, setHeading2] = useState([{ title: "", content: "" }]);
    const [wantToKnow, setWantToKnow] = useState([{ title: "", content: "" }]);
    const [imageVideoG, setImageVideoG] = useState([{ href: "" }]);
    const [notableAchievement, setNotableAchievement] = useState([{ content: "" }]);
    const [trainingIA, setTrainingIA] = useState([{ name: "", logo: "" }]);
    const [testimonials, setTestimonials] = useState([{ content: "", writtenBy: "" }]);
    const [imageUpload, setImageUpload] = useState();
    const [compaigns, setCompaigns] = useState([]);

    const uploadFileImageGallery = () => {
        const { storage } = StartFirebase();
        const folder = 'imagesVideos/';
        const fileName = new Date().getTime() + imageUpload.name;
        const storageRef = refStorage(storage, folder + fileName);
        uploadBytes(storageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                console.log(url);
                setImageVideoG((prevImageVideoG) => {
                    const updatedImageVideoG = [...prevImageVideoG];
                    updatedImageVideoG.push({ href: url });
                    return updatedImageVideoG;
                });
            });
        });
    };

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

    const handleAddItem = (setState) => {
        setState((prevItems) => [...prevItems, {}]);
    };

    const handleDeleteItem = (index, setState) => {
        setState((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    const handleChange = (index, key, value, setState) => {
        setState((prevItems) => {
            const newItems = [...prevItems];
            newItems[index][key] = value;
            return newItems;
        });
    };

    const { database } = StartFirebase();
    const handleSubmit = async (e) => {
        e.preventDefault();

        set(ref(database, "compaign/" + title), {
            title,
            athleteName,
            athleteAge,
            athleteCity,
            topAchievement,
            highlights,
            introduction,
            heading2,
            shortTermGoal,
            imageVideoG,
            longTermGoal,
            notableAchievement,
            trainingIA,
            testimonials,
            wantToKnow
        }).then(() => {
            alert("Added");
            setTitle('');
            setAthleteName('');
            setAthleteAge('');
            setAthleteCity('');
            setTopAchievement('');
            setIntroduction('');
            setShortTermGoal('');
            setLongTermGoal('');
            setHighlights([{ title: "", content: "" }]);
            setHeading2([{ title: "", content: "" }]);
            setWantToKnow([{ title: "", content: "" }]);
            setImageVideoG([{ href: "" }]);
            setNotableAchievement([{ content: "" }]);
            setTrainingIA([{ name: "", logo: "" }]);
            setTestimonials([{ content: "", writtenBy: "" }]);
            setImageUpload()
        })
    };
    const updateData = async (e) => {
        e.preventDefault();

        if (title) {
            update(ref(database, "compaign/" + title), {
                title,
                athleteName,
                athleteAge,
                athleteCity,
                topAchievement,
                highlights,
                introduction,
                heading2,
                shortTermGoal,
                imageVideoG,
                longTermGoal,
                notableAchievement,
                trainingIA,
                testimonials,
                wantToKnow
            }).then(() => {
                alert("Updated");
                setTitle('');
                setAthleteName('');
                setAthleteAge('');
                setAthleteCity('');
                setTopAchievement('');
                setIntroduction('');
                setShortTermGoal('');
                setLongTermGoal('');
                setHighlights([{ title: "", content: "" }]);
                setHeading2([{ title: "", content: "" }]);
                setWantToKnow([{ title: "", content: "" }]);
                setImageVideoG([{ href: "" }]);
                setNotableAchievement([{ content: "" }]);
                setTrainingIA([{ name: "", logo: "" }]);
                setTestimonials([{ content: "", writtenBy: "" }]);
                setImageUpload()
            })
        } else {
            alert("Please enter the title of compaign!");
        }
    };

    const getData = async (e) => {
        e.preventDefault();

        if (title) {
            get(child(ref(database), "compaign/" + title)).then((snapshot) => {
                if (snapshot.exists()) {
                    const snapshotVal = snapshot.val();
                    setTitle(snapshotVal.title);
                    setAthleteName(snapshotVal.athleteName);
                    setAthleteAge(snapshotVal.athleteAge);
                    setAthleteCity(snapshotVal.athleteCity);
                    setTopAchievement(snapshotVal.topAchievement);
                    setIntroduction(snapshotVal.introduction);
                    setShortTermGoal(snapshotVal.shortTermGoal);
                    setLongTermGoal(snapshotVal.longTermGoal);
                    setHighlights(snapshotVal.highlights);
                    setHeading2(snapshotVal.heading2);
                    setWantToKnow(snapshotVal.wantToKnow);
                    setImageVideoG(snapshotVal.imageVideoG);
                    setNotableAchievement(snapshotVal.notableAchievement);
                    setTrainingIA(snapshotVal.trainingIA);
                    setTestimonials(snapshotVal.testimonials);
                    setImageUpload(snapshotVal.imageUpload);
                } else {
                    alert("No Data Found !")
                }
            })
        } else {
            alert("Please enter the title of compaign!");
        }

    };
    const deleteData = async (e) => {
        e.preventDefault();

        if (title === '') {
            alert("Please enter the title of compaign!");
        } else {
            remove(ref(database, "compaign/" + title)).then(() => {
                alert("Deleted");
            })
        }
    };

    const getAllData = async () => {
        get(child(ref(database), "compaign/")).then((snapshot) => {
            if (snapshot.exists()) {
                setCompaigns(snapshot.val())
            } else {
                alert("No Compaigns !")
            }
        })
    }

    return (
        <>
            <div style={{ textAlign: "center" }}>
                <p> <strong>Uses:</strong>Fetch all compaigns title and add title in title field to get, update, delete individual compaign </p>
                <button type='button' style={{ marginTop: "30px" }} onClick={getAllData}>Get All Compaign</button>
                <div>
                    {
                        Object.keys(compaigns).map((item, index) => (
                            <div key={index}>
                                <p>{compaigns[item].title}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

            <h1 style={{ textAlign: "center" }}>Create a compaign</h1>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center", gap: 10 }}>
                <form onSubmit={handleSubmit} >
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Athlete Name:</label>
                        <input
                            type="text"
                            value={athleteName}
                            onChange={(e) => setAthleteName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Athlete Age:</label>
                        <input
                            type="number"
                            min={0}
                            max={100}
                            value={athleteAge}
                            onChange={(e) => setAthleteAge(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Athlete City:</label>
                        <input
                            type="text"
                            value={athleteCity}
                            onChange={(e) => setAthleteCity(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Top Achievement:</label>
                        <textarea
                            type="text"
                            value={topAchievement}
                            onChange={(e) => setTopAchievement(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Introduction:</label>
                        <textarea
                            type="text"
                            value={introduction}
                            onChange={(e) => setIntroduction(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Short Term Goal:</label>
                        <textarea
                            type="text"
                            value={shortTermGoal}
                            onChange={(e) => setShortTermGoal(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Long Term Goal:</label>
                        <textarea
                            type="text"
                            value={longTermGoal}
                            onChange={(e) => setLongTermGoal(e.target.value)}
                            required
                        />
                    </div>

                    {/* Highlights */}
                    <div>
                        <h3>Highlights:</h3>
                        {highlights.map((item, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    required
                                    value={item.title || ''}
                                    onChange={(e) => handleChange(index, 'title', e.target.value, setHighlights)}
                                />
                                <textarea
                                    placeholder="Content"
                                    required
                                    value={item.content || ''}
                                    onChange={(e) => handleChange(index, 'content', e.target.value, setHighlights)}
                                />
                                <button type="button" onClick={() => handleDeleteItem(index, setHighlights)}>Delete</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddItem(setHighlights)}>Add Item</button>
                    </div>

                    {/* Heading2 */}
                    <div>
                        <h3>Heading2:</h3>
                        {heading2.map((item, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    required
                                    value={item.title || ''}
                                    onChange={(e) => handleChange(index, 'title', e.target.value, setHeading2)}
                                />
                                <textarea
                                    placeholder="Content"
                                    required
                                    value={item.content || ''}
                                    onChange={(e) => handleChange(index, 'content', e.target.value, setHeading2)}
                                />
                                <button type="button" onClick={() => handleDeleteItem(index, setHeading2)}>Delete</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddItem(setHeading2)}>Add Item</button>
                    </div>

                    <div>
                        <h3>Want To Know:</h3>
                        {wantToKnow.map((item, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    required
                                    value={item.title || ''}
                                    onChange={(e) => handleChange(index, 'title', e.target.value, setWantToKnow)}
                                />
                                <textarea
                                    placeholder="Content"
                                    required
                                    value={item.content || ''}
                                    onChange={(e) => handleChange(index, 'content', e.target.value, setWantToKnow)}
                                />
                                <button type="button" onClick={() => handleDeleteItem(index, setWantToKnow)}>Delete</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddItem(setWantToKnow)}>Add Item</button>
                    </div>

                    {/* Image Video Gallery */}
                    <div>
                        <h3>Image Video Gallery:</h3>
                        {imageVideoG.map((item, index) => (
                            <div key={index}>
                                <label>File {index + 1}</label>
                                <input type='file' onChange={(e) =>
                                    setImageUpload(e.target.files[0])
                                } />
                                <img width={50} height={50} src={item.href} alt='img' />
                                <button type='button' onClick={() => uploadFileImageGallery()}>Upload</button>
                                <button type='button' onClick={() => handleDeleteInput(index)}>Delete</button>
                            </div>
                        ))}
                        <button type='button' onClick={handleAddInput}>Add Another File</button>
                    </div>

                    {/* Notable Achievement */}
                    <div>
                        <h3>Notable Achievement:</h3>
                        {notableAchievement.map((item, index) => (
                            <div key={index}>
                                <textarea
                                    placeholder="Content"
                                    required
                                    value={item.content || ''}
                                    onChange={(e) => handleChange(index, 'content', e.target.value, setNotableAchievement)}
                                />
                                <button type="button" onClick={() => handleDeleteItem(index, setNotableAchievement)}>Delete</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddItem(setNotableAchievement)}>Add Item</button>
                    </div>

                    {/* Training IA */}
                    <div>
                        <h3>Training IA:</h3>
                        {trainingIA.map((item, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    value={item.name || ''}
                                    onChange={(e) => handleChange(index, 'name', e.target.value, setTrainingIA)}
                                />
                                <input
                                    type="text"
                                    placeholder="Logo URL"
                                    required
                                    value={item.logo || ''}
                                    onChange={(e) => handleChange(index, 'logo', e.target.value, setTrainingIA)}
                                />
                                <button type="button" onClick={() => handleDeleteItem(index, setTrainingIA)}>Delete</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddItem(setTrainingIA)}>Add Item</button>
                    </div>

                    {/* Testimonials */}
                    <div>
                        <h3>Testimonials:</h3>
                        {testimonials.map((item, index) => (
                            <div key={index}>
                                <textarea
                                    placeholder="Content"
                                    value={item.content || ''}
                                    onChange={(e) => handleChange(index, 'content', e.target.value, setTestimonials)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Written By"
                                    required
                                    value={item.writtenBy || ''}
                                    onChange={(e) => handleChange(index, 'writtenBy', e.target.value, setTestimonials)}
                                />
                                <button type="button" onClick={() => handleDeleteItem(index, setTestimonials)}>Delete</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddItem(setTestimonials)}>Add Item</button>
                    </div>

                    <button type="submit">Add Data</button>
                    <button type="button" onClick={getData}>Get Data</button>
                    <button type="button" onClick={updateData}>Update Data</button>
                    <button type="button" onClick={deleteData}>Delete Data</button>
                </form>
            </div>
        </>
    );
};

export default Form;
