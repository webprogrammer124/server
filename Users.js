import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Row, Col, Button } from "react-bootstrap";
import axios from 'axios';
import React from 'react';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function Users() {
  const [state, setstate] = useState([]);
  const [dummy, setdd] = useState([
    {name:'Faiza',email:'faz@gmail.com',id:1},
    {name:'Shehla',email:'shehla@gmail.com',id:2},
  ]);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
      axios.get('http://localhost:4000/api/users/')
      .then((res) => {
        console.log(res);
        setstate(res.data.data);
      })
      .catch((e) => console.log(e));
  }, []);


  const [msg, setmsg] = useState('')
  const handleDelete = (id)=>{
    console.log(id)
    axios.delete('http://localhost:4000/api/users/'+id)
    .then((res) => {
      console.log(res.data);
      setmsg(`${id} is deleted successfully`);
    })
    .catch((e) => console.log(e));


  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Row className="mt-5">
      <Col lg={3} md={2} sm={1} xs={1}></Col>
      <Col lg={6} md={8} sm={10} xs={10}>
        <ListGroup>
          <ListGroup.Item variant="primary">
            <Row className="col-headers">
              <Col>Name</Col>
              <Col>Email</Col>
              <Col>Actions</Col>
            </Row>
          </ListGroup.Item>

          {state.map((item, ind) => (
            <ListGroup.Item key={ind} variant="light">
              <Row>
                <Col>{item.name}</Col>
                <Col>{item.email}</Col>
                <Col>
                  <Button 
                    variant="info"
                    size="sm"
                    as={Link}
                    to={"/single-user/" + item._id}
                  >
                    View
                  </Button>
                  <Button 
                    variant="info"
                    size="sm" 
                    onClick={()=>handleClickOpen(item._id)}
                  >
                           Delete
                  </Button>
  
      {/* <Button variant="outlined" color="primary" >
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure
          you want to delete it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={()=>handleDelete(item._id)} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
   

          
               

                </Col>
              </Row>
            </ListGroup.Item>
          ))} 
        </ListGroup>
      </Col>
      <Col lg={3} md={2} sm={1} xs={1}></Col>
    </Row>
  );
}

export default Users;
