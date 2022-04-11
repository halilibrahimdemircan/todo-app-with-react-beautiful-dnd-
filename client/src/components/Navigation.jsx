import React from "react";
import {
    Navbar,
    Container,
    Row,
    Col,
    Button,
    Form,
    FormControl,
    InputGroup,
} from "react-bootstrap";

export default function Navigation() {

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
        <Navbar bg="primary" variant="light" expand="lg">
            <Container fluid>
                <Row className="w-100 mx-auto">
                    <Col md={{ span: 5, order: 1 }} xs={{ order: 2 }} className="my-md-0 my-3">
                        <Container className="p-0" fluid>
                            <Row>
                                <Col md="1" xs="1" className=" bg-primary text-wrap">

                                    <Button onClick={handleLogout}><i class="bi bi-box-arrow-left">
                                    </i></Button>

                                </Col>
                                <Col md="3" xs="4">
                                    <Button className="bg-light bg-opacity-25">
                                        <i class="bi bi-speedometer2"></i> Boards
                                    </Button>
                                </Col>
                                <Col md="8" xs="7" className="p-0">
                                    <Form className="d-flex border rounded">
                                        <InputGroup className="border-0">
                                            <FormControl
                                                type="search"
                                                placeholder="Search"
                                                className="bg-light bg-opacity-50 border-0"
                                                aria-label="Search"
                                            />
                                            <Button className="bg-light bg-opacity-50  border-0">
                                                <i className="bi bi-search text-dark"></i>
                                            </Button>
                                        </InputGroup>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col md={{ span: 5, order: 2 }} xs={{ order: 1 }} className="pt-1">
                        <h5 className="m-auto text-center text-light">Webix Boards</h5>
                    </Col>
                    <Col md={{ span: 2, order: 3 }} xs={{ order: 3 }} className="text-center text-md-end">
                        <Button className="bg-light bg-opacity-25">
                            <i class="bi bi-plus-square-fill"></i>
                        </Button>
                        <Button className="bg-light bg-opacity-25">
                            <i class="bi bi-question-circle"></i>
                        </Button>
                        <Button className="bg-light bg-opacity-25">
                            <i class="bi bi-bell"></i>
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
}