import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Layout from "./Layout";
import "../css/books.css";

function Books() {
  return (
    <Layout>
      <div className="container py-4 card-flex">
        <Card style={{ width: "18rem", margin: "10px" }}>
          <Card.Img style={{ height: "390px" }} variant="top" src="https://media.springernature.com/full/springer-static/cover-hires/book/978-3-030-26253-2" />
          <Card.Body>
            <Card.Title>Principles of Distributed Database Systems</Card.Title>
            <Card.Text>Book by M. Tamer Özsu</Card.Text>
            <Button className="mr-2" variant="primary">
              Read
            </Button>{" "}
            &nbsp;
            <Button variant="success">Borrow</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem", margin: "10px" }}>
          <Card.Img style={{ height: "390px" }} variant="top" src="https://m.media-amazon.com/images/I/51Ggzu6615L._AC_UF1000,1000_QL80_.jpg" />
          <Card.Body>
            <Card.Title>Project Management: A Managerial Approach</Card.Title>
            <Card.Text>Book by Meredith, Jack R., Mantel Jr., Samuel J.</Card.Text>
            <Button className="mr-2" variant="primary">
              Read
            </Button>{" "}
            &nbsp;
            <Button variant="success">Borrow</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem", margin: "10px" }}>
          <Card.Img style={{ height: "390px" }} variant="top" src="https://m.media-amazon.com/images/I/51O0DeJOdOL._AC_UF1000,1000_QL80_.jpg" />
          <Card.Body>
            <Card.Title>Software Engineering (9th Edition)</Card.Title>
            <Card.Text>Book by Ian Sommerville (9th Edition) </Card.Text>
            <Button className="mr-2" variant="primary">
              Read
            </Button>{" "}
            &nbsp;
            <Button variant="success">Borrow</Button>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
}

export default Books;
