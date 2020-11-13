import React, {useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import {URL} from './Myconnect';
import $ from 'jquery';
import moment from 'moment';
import * as Icon from 'react-bootstrap-icons';
import Button from '@material-ui/core/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/feedback.css';
const Feedback = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError]= useState(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [items, setItems] = useState([])
  const [show, setShow] = useState(false);
  const [showcontent, setShowContent] = useState(false);
  const [repcontent, setRepContent] = useState(null);
  const [deleteid, setDeleteId] = useState('');
  const [nulltitle, setNullTitle] = useState(null);
  const [nullcontent, setNullContent] = useState(null);
  const [showpopcontent, setShowpopUpContent] = useState(null);
  const handleClose = () => setShow(false);
  const handleCloseContent = () => setShowContent(false);
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
    if (title === ""){
      setNullTitle("Title is blank !");
      setNullContent("Content is blank")
      return false;
    }
    if (content === ""){
      nullcontent("Content is blank")
      return false;
    }
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
        setTitle('');
        setContent('');
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
  const showcontentmodal = (repcontent,content) => {
    setShowContent(true);
    setShowpopUpContent(content);
    if(repcontent === null){
      setRepContent('The manager has not responded to your message');
      return false;
    }
      setRepContent(repcontent);
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
          <Button variant="outlined" className="bg-primary text-white m-1" onClick={handleDeleteSubmit}>
            Confirm
          </Button>
          <Button variant="outlined" className="bg-danger text-white m-1" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showcontent} onHide={(handleCloseContent)}>
        <Modal.Header closeButton>
          <Modal.Title>Feedback from a manager </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="row">
           <div className="col-sm-12">Content: {showpopcontent} </div>
           <div className="col-sm-12">Replay : {repcontent}</div>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outlined" className="bg-danger text-white" onClick={handleCloseContent}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        <Container maxWidth="md" component="main">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Title</label>
              <input type="email" className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)}/>
              <small className="text-center text-danger">{nulltitle}</small>

            </div>
            <div className="form-group dev_textarea">
              <label htmlFor="Content">Content</label>
              <textarea className="form-control textarea" onInput={autosize} value={content}  onChange={(e)=>setContent(e.target.value)}></textarea>
              <small className="text-center text-danger">{nullcontent}</small>
            </div>
            <div className="col-sm-12 text-center">
              <button type="submit" onClick={handleSubmit} className=" col-sm-2 btn btn-primary btn_submit button">Submit</button>
            </div>
          <table className="table">
            <thead>
              <tr>
                <th colSpan="6" className="text-center border text-uppercase">The list has responded </th>
              </tr>
              <tr>
                <th className="text-center border">Title</th>
                <th className="text-center border">Status</th>
                <th colSpan="2" className="text-center border">Created at</th>
              </tr>
            </thead>
            <tbody>
              {
                items.map((key,value) => (
                  <tr key={value} className="repcontent">
                    <td className="text-center border">{key.title}</td>
                    <td className="text-center border">{key.mark === 0 ? "No" : "Yes"}</td>
                    <td className="text-center border">{moment(key.created_at).format('Y-MM-DD HH:mm')}</td>
                    <td className="text-center border">
                      <button className="btn btn-primary m-1"  onClick={(e)=>showcontentmodal(key.rep_content, key.content)} >
                        Detail
                      </button>
                      <button className="btn btn-danger m-1"  onClick={(e)=>_delete(key.id)}>
                        Delete
                      </button>
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
