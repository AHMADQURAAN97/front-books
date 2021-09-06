import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import {withAuth0} from '@auth0/auth0-react';
import axios from 'axios';
import {Card,Form,Button,Modal} from 'react-bootstrap';


class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      book: [],
      showUpdateForm:false,
      selectedBook:{},

    }
  }

  componentDidMount = async ()=> {

    const {user} = this.props.auth0;
    let emailaddress = user.email; 

    let bookData = await axios.get(`${process.env.REACT_APP_DATABASE}/books?email=${emailaddress}`);

    this.setState({
      book:bookData.data,
    });
  }


//==========================Add Book ===========================

addbook = async (e)=> { 
e.preventDefault();
const {user} = this.props.auth0;

let bookInfo = {

  email:user.email, 
  title:e.target.title.value,
  description:e.target.description.value
}

let bookInfoData =await axios.post(`${process.env.REACT_APP_DATABASE}/addbook`,bookInfo);
console.log("boooookInfo", bookInfoData);

this.setState({
  book:bookInfoData.data
})
}

//==========================Delete Book ===========================

deleteBook = async (bookID)=>{

  const {user} = this.props.auth0;
let resData = await axios.delete(`${process.env.REACT_APP_DATABASE}/deletebook/${bookID}?email=${user.email}`)

this.setState({

  book:resData.data
})
};
//==========================Update Book ===========================

updateBook = async (bookID) => {

await this.setState({
  showUpdateForm:false,
});

let choosenBook = this.state.book.find(item => {

return item._id === bookID;
});

this.setState({
  selectedBook:choosenBook,
  showUpdateForm:true,
})
}

updateBookInfo = async (e)=> { 

const {user} = this.props.auth0;
e.preventDefault();

let bookData = {

  title : e.target.title.value,
  description : e.target.description.value, 
  email:user.email
}

let bookID = this.state.selectedBook._id
let booksDataa = await axios.put (`${process.env.REACT_APP_DATABASE}/updatebook/${bookID}`,bookData)

this.setState({
  book:booksDataa.data
})


}
handleClose = () => {
  this.setState({
    showUpdateForm: false,
  });

}

  render() {
    return(
      <>  
        <div>
          <Form onSubmit={this.addbook}>
            <Form.Group>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Book name"
                name="title"
              />

              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Book description"
                name="description"
              />
              <input type="submit" value="Add Book" />
            </Form.Group>
          </Form>
        </div>


      <div>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
      </div>

      <>
      <Modal show={this.state.showUpdateForm} onHide={this.handleClose}>
              <Modal.Title>Update Book Info</Modal.Title>
              <div>
        <Form onSubmit={this.updateBookInfo}>
          <Form.Control
            className="mb-2"
            type="text"
            defaultValue={this.state.selectedBook.title}
            name="title"
          />

          <Form.Control
            className="mb-2"
            type="text"
            defaultValue={this.state.selectedBook.description}
            name="description"
          />

        <input type="submit" value="Update" />

        </Form>
      </div>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal>
      
      </>

      <div>
       {this.state.book.length !== 0 ? (this.state.book.map((item,i)=> {
       
      return (
        
        
        <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title> {item.title} </Card.Title>
    <Card.Text > {item.description} </Card.Text>
    <Card.Text > {item.email} </Card.Text>
    <Button onClick={()=>this.deleteBook(item._id)}>Delete</Button>
    <Button onClick={()=>this.updateBook(item._id)}>Update</Button>
  </Card.Body>
</Card>
)
}) 
    ):( <p>not exist any book</p>) 
} 

       

        </div>
      </>
  )}}



  
export default withAuth0(MyFavoriteBooks);

{/* {this.state.showUpdateForm &&
      <Form onSubmit={this.updateBookInfo}>
            <Form.Group>
              <Form.Control
                className="mb-2"
                type="text"
                defaultValue={this.state.selectedBook.title}
                name="title"
              />

              <Form.Control
                className="mb-2"
                type="text"
                defaultValue={this.state.selectedBook.description}
                name="description"
              />
              <input type="submit" value="Update" />
            </Form.Group>
          </Form>
          } */}