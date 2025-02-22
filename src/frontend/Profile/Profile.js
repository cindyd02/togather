import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Import the CSS file

const Profile = () => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && gender && age) {
            setSubmitted(true);
            setIsEditing(false);
        } else {
            alert("Please fill out all fields.");
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setSubmitted(false);
    };

    const handleNext = () => {
        navigate('/next');
    };

    return (
        <div className="profile-container">
            <h2>Please Enter Your Information</h2>
            {!submitted || isEditing ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>

                    <label>Gender Identity:</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="Female"
                                checked={gender === 'Female'}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            />
                            Female
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Male"
                                checked={gender === 'Male'}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Nonbinary"
                                checked={gender === 'Nonbinary'}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            />
                            Nonbinary
                        </label>
                    </div>

                    <label>
                        Age:
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            min="1"
                            required
                        />
                    </label>

                    <button type="submit">
                        {isEditing ? 'Save Changes' : 'Submit'}
                    </button>
                </form>
            ) : (
                <div className="information-display">
                    <h3>Your Information:</h3>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Gender Identity:</strong> {gender}</p>
                    <p><strong>Age:</strong> {age}</p>
                    <button onClick={handleEdit}>Edit Profile</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
