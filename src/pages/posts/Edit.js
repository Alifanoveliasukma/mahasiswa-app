// import hook useState, useEffect, useCallback from react
import { useState, useEffect, useCallback } from 'react';

// import component Bootstrap React
import { Card, Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

// import axios
import axios from 'axios';

// import hook navigate dan params dari react router dom
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
    // state
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // state validation
    const [validation, setValidation] = useState({});

    // navigate
    const navigate = useNavigate();  // Gantikan useHistory dengan useNavigate

    // get ID from parameter URL
    const { id } = useParams();

    // useCallback untuk menghindari pembuatan ulang fungsi
    const getPostById = useCallback(async () => {
        // get data from server
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        // get response data
        const data = await response.data.data;

        // assign data to state
        setTitle(data.title);
        setContent(data.content);
    }, [id]); // Memastikan bahwa useCallback memperhitungkan ID

    // useEffect untuk memanggil getPostById saat komponen pertama kali dimuat
    useEffect(() => {
        // panggil function "getPostById"
        getPostById();
    }, [getPostById]);

    // function "updatePost"
    const updatePost = async (e) => {
        e.preventDefault();

        // send data to server
        await axios.patch(`http://localhost:5000/api/posts/update/${id}`, {
            title: title,
            content: content
        })
        .then(() => {
            // redirect menggunakan navigate
            navigate('/posts');
        })
        .catch((error) => {
            // assign validation on state
            setValidation(error.response.data);
        });
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md={12}>
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            {validation.errors &&
                                <Alert variant="danger">
                                    <ul className="mt-0 mb-0">
                                        {validation.errors.map((error, index) => (
                                            <li key={index}>{`${error.param} : ${error.msg}`}</li>
                                        ))}
                                    </ul>
                                </Alert>
                            }

                            <Form onSubmit={updatePost}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>TITLE</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Masukkan Title"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>CONTENT</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Masukkan Content"
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    UPDATE
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default EditPost;
