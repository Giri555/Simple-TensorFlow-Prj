import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function DataForm(props) {
    const [newData, setNewData] = useState({
        sepal_length: '',
        sepal_width: '',
        petal_length: '',
        petal_width: '',
        learningRate: '',
        epochs: '',
    });
    const [showLoading, setShowLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [irisSpecies, setIrisSpecies] = useState(null);
    const apiUrl = 'http://localhost:3000/run';

    useEffect(() => {
        // here you tell useEffect what state to watch, if you want to watch the changing of a particular state
        // tell useEffect to watch the 'result' state
        // section will (re)load whenever data is updated
    }, [result]);

    const predict = (e) => {
        setResult(null);
        setShowLoading(true);
        e.preventDefault();
        const data = {
            sepal_length: newData.sepal_length,
            sepal_width: newData.sepal_width,
            petal_length: newData.petal_length,
            petal_width: newData.petal_width,
            learningRate: newData.learningRate,
            epochs: newData.epochs,
        };
        axios
            .post(apiUrl, data)
            .then((result) => {
                setResult(result.data);
                // setosa: 1, 0, 0
                // virginica: 0, 1, 0
                // versicolor: 0, 0, 1
                if (
                    Math.round(result.data[0]) === 1 &&
                    Math.round(result.data[1]) === 0 &&
                    Math.round(result.data[2]) === 0
                ) {
                    setIrisSpecies('setosa');
                } else if (
                    Math.round(result.data[0]) === 0 &&
                    Math.round(result.data[1]) === 1 &&
                    Math.round(result.data[2]) === 0
                ) {
                    setIrisSpecies('virginica');
                } else if (
                    Math.round(result.data[0]) === 0 &&
                    Math.round(result.data[1]) === 0 &&
                    Math.round(result.data[2]) === 1
                ) {
                    setIrisSpecies('versicolor');
                }
                setShowLoading(false);
            })
            .catch((error) => {
                setShowLoading(false);
            });
    };

    const onChange = (e) => {
        e.persist();
        setNewData({ ...newData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <Jumbotron>
                <h1>Predicting Iris Species</h1>
                <Form onSubmit={predict}>
                    <Form.Group>
                        <Form.Label>Sepal Length</Form.Label>
                        <Form.Control
                            type='number'
                            name='sepal_length'
                            id='sepal_length'
                            placeholder='Ex: 5.4'
                            value={newData.sepal_length}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Sepal Width</Form.Label>
                        <Form.Control
                            type='number'
                            name='sepal_width'
                            id='sepal_width'
                            placeholder='Ex: 3.9'
                            value={newData.sepal_width}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Petal Length</Form.Label>
                        <Form.Control
                            type='number'
                            name='petal_length'
                            id='petal_length'
                            placeholder='Ex: 1.7'
                            value={newData.petal_length}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Petal Width</Form.Label>
                        <Form.Control
                            type='number'
                            name='petal_width'
                            id='petal_width'
                            placeholder='Ex: 0.4'
                            value={newData.petal_width}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Learning Rate</Form.Label>
                        <Form.Control
                            type='number'
                            name='learningRate'
                            id='learningRate'
                            placeholder='Ex: 0.06'
                            value={newData.learningRate}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Epochs</Form.Label>
                        <Form.Control
                            type='number'
                            name='epochs'
                            id='epochs'
                            placeholder='Ex: 100'
                            value={newData.epochs}
                            onChange={onChange}
                        />
                    </Form.Group>

                    <Button variant='primary' type='submit'>
                        Predict Iris Species
                    </Button>
                </Form>

                {showLoading === true && (
                    <div>
                        <h1></h1>
                        <Spinner animation='border' role='status'>
                            <span className='sr-only'>Loading...</span>
                        </Spinner>
                        <h4>One moment please...</h4>
                    </div>
                )}

                {result === null ? (
                    <div></div>
                ) : (
                    <div>
                        <h1>Prediction Results</h1>
                        <h2>The Values For the Species Will Be:</h2>
                        <li>setosa: 1, 0, 0</li>
                        <li>virginica: 0, 1, 0</li>
                        <li>versicolor: 0, 0, 1 </li>
                        <h2>Your Result:</h2>
                        {result[0] === null ? (
                            <div>Please try again</div>
                        ) : (
                            <p>
                                {irisSpecies}: {result[0]}, {result[1]}, {result[2]}
                            </p>
                        )}
                    </div>
                )}
            </Jumbotron>
        </div>
    );
}

export default DataForm;
