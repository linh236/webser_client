import React, {useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import {URL} from './Myconnect';
import $ from 'jquery';
import moment from 'moment';
import 'moment/locale/vi';
import * as Icon from 'react-bootstrap-icons';
import Button from '@material-ui/core/Button';
import Modal from 'react-bootstrap/Modal'

const Feedback = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError]= useState(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [items, setItems] = useState([])
  const [show, setShow] = useState(false);
  const [deleteid, setDeleteId] = useState('');

  const handleClose = () => setShow(false);
  let id = localStorage.getItem('id');
  useEffect(()=> {
    getFeedback(id);
  },[])
  const getFeedback = (id) => {
    let url = URL+`/api/showpopup/${id}`;
    fetch(url)
       .then(res => res.json())
       .then(res => {
        setItems(res.data);
       })
       .catch((error) => {
         setError(error);
       })
       .finally(() => setLoading(false));
  }
  const autosize = () => {
    $(".dev_textarea").on('change keyup keydown paste cut', 'textarea', function () {
      $(this).height(35).height(this.scrollHeight);
    }).find('textarea').change();
  }
  const handleSubmit = () => {
    let url_send_data = URL+`/api/reports`;
      fetch(url_send_data, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          content: content,
          information_id: id

        })
      }).then((response) => response.json())
      .then((data) => {
        getFeedback(id);
      }).catch((err) => console.error(err))
  }
  const _delete = (id) => {
    setShow(true);
    setDeleteId(id);
  }
  const handleDeleteSubmit = () => {
    setShow(false);

    let url_send_data = URL+`/api/deleteId/${deleteid}`;
      fetch(url_send_data,  {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
        },
      }).then((response) => response.json())
      .then((data) => {
        getFeedback(id);
      }).catch((err) => console.error(err))
  }
  if (error) {
    return <div className="text-center">Error: {error.message}</div>;
  } else if (isLoading) {
    return <div className="text-center">Loading...</div>;
  } else {
  return(
      <>
      <h2 className="text-center text-uppercase">Feedback</h2>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><Icon.Trash/> Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="row">
           <div className="col-sm-12">Are u delete ?</div>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outlined" className="bg-danger text-white" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outlined" className="bg-primary white" onClick={handleDeleteSubmit}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
        <Container maxWidth="md" component="main">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Title</label>
              <input type="email" className="form-control" onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className="form-group dev_textarea">
              <label htmlFor="Content">Content</label>
              <textarea className="form-control textarea" onInput={autosize}  onChange={(e)=>setContent(e.target.value)}></textarea>
            </div>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary btn_submit button">Submit</button>
          <table className="table">
            <thead>
              <tr>
                <th colSpan="6" className="text-center border text-uppercase">The list has responded </th>
              </tr>
              <tr>
                <th className="text-center border">Order</th>
                <th className="text-center border">Title</th>
                <th className="text-center border">Content</th>
                <th className="text-center border">Status</th>
                <th colSpan="2" className="text-center border">Created at</th>
              </tr>
            </thead>
            <tbody>
              {
                items.map((key,value) => (
                    <tr key={value}>
                      <td className="text-center border">{value}</td>
                      <td className="text-center border">{key.title}</td>
                      <td className="text-center border">{key.content}</td>
                      <td className="text-center border">{key.mark === 0 ? "No" : "Yes"}</td>
                      <td className="text-center border">{moment(key.created_at).format('Y-MM-DD HH:mm')}</td>
                      <td className="text-center border">
                        <Button color="primary" onClick={(e)=>_delete(key.id)}>
                          <Icon.Trash className="text-danger"/>
                        </Button>
                      </td>
                    </tr>
                ))
              }
            </tbody>
          </table>
        </Container>
      </>
    )
  }
}
export default Feedback;