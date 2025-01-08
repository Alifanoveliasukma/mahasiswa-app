//import component Bootstrap React
import { Card, Container, Row, Col} from 'react-bootstrap';

function Home() {
    return (
        <Container className="mt-3">
            <Row>
                <Col md={12}>  {/* Perbaikan di sini, hapus tanda kutip */}
                    <Card className="border-0 rounded shadow-sm">
                    <Card.Body className="p-4">
                        <h1>UJIAN PRAKTIKUM PEMROGRAMAN BERBASIS OBJEK</h1>
                        <p>Oleh: Alifa Novelia Sukma dan M Azzam Khoiri</p>
                    </Card.Body>

                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
