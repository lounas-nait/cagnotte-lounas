import '../styles/style.css';
import Card from "react-bootstrap/Card";


function MonContact() {
  return (
    <div >
      <Card style={{ width: "65rem" }}>
        
        <Card.Body>
          <Card.Title>
            <h2>Contatez nous</h2>
          </Card.Title>
          <Card.Text>
            par telephone : +32466345919
            <br />
            <br />
            Par mail : nait.cagnotte@gmail.com
            <br />
            <br />
            par courrier : bd du triomphe 151 Ixelles 1050
            <br />
            <br />
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MonContact;
