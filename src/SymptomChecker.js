import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExerciseList = () => {
  const [bodyParts, setBodyParts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState('');

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    };

    const fetchBodyParts = async () => {
      try {
        const response = await axios.request(options);
        setBodyParts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBodyParts();
  }, []);

  useEffect(() => {
    if (selectedBodyPart) {
      const options = {
        method: 'GET',
        url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedBodyPart}`,
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      };

      const fetchExercises = async () => {
        try {
          const response = await axios.request(options);
          setExercises(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchExercises();
    }
  }, [selectedBodyPart]);

  return (
    <>
       <select onChange={e => setSelectedBodyPart(e.target.value)}>
        <option value="">Select a body part</option>
        {bodyParts.map(bodyPart => (
          <option key={bodyPart} value={bodyPart}>{bodyPart}</option>
        ))}
      </select>
      <ul>
        {exercises.slice(0,30).map((exercise) => (
          <li id={exercise.id}>{exercise.name}</li>
        ))}
      </ul>
    </>
  );
};

export default ExerciseList;
