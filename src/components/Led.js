import React, {useState, useEffect} from 'react';
import {URL} from './Myconnect';
import * as Icon from 'react-bootstrap-icons';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import 'moment/locale/vi';
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-bootstrap/Modal'
import Container from '@material-ui/core/Container';

function Led (){
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [item0, setItem0] = useState([]);
  const [item1, setItem1] = useState([]);
  const [item2, setItem2] = useState([]);
  const [item3, setItem3] = useState([]);
  const [item5, setItem5] = useState([]);
  const [item6, setItem6] = useState([]);
  const [item7, setItem7] = useState([]);
  const [item8, setItem8] = useState([]);
  const [value, setValue] = useState(new Date());
  const [notice, setNotice] = useState(null);
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [column, setColumn] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  let id = localStorage.getItem('id');

   useEffect(() => {
     getLed(id)
   },[])

  const getLed = (id) =>{
    let url = URL+`/api/led_status/${id}`;
    fetch(url)
       .then(res => res.json())
       .then(res => {
         setItem0(res.leds.led_status0);
         setItem1(res.leds.led_status1);
         setItem2(res.leds.led_status2);
         setItem3(res.leds.led_status3);
         setItem5(res.leds.led_status5);
         setItem6(res.leds.led_status6);
         setItem7(res.leds.led_status7);
         setItem8(res.leds.led_status8);
       })
       .catch((error) => {
         setError(error);
       })
       .finally(() => setLoading(false));
  }
  let Setstatus = '';
  const Turn_led = (status, name, column)=>{
   if (status === "off") {
     Setstatus = "on";
   } else {
     Setstatus = "off";
   }
    let url_send_data = URL+`/api/app_send/${id}`;
    fetch(url_send_data, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        column: column,
        status: Setstatus

      })
    }).then((response) => response.json())
      .then((data) => {
        getLed(id);
        setNotice(`You turn ${Setstatus} successfully !`)
      }).catch((err) => console.error(err))
  }

  // set time
  const setTime = (status, name, column) => {
    setShow(true);
    setStatus(status);
    setName(name);
    setColumn(column);

  }

  const handleSubmit = () => {
    setShow(false)
    const timer = moment(value).format('Y-MM-DD HH:mm');
    let url_send_data = URL+`/api/app_send/${id}`;
      fetch(url_send_data, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          column: column,
          status: timer

        })
      }).then((response) => response.json())
      .then((data) => {
        getLed(id);
        setNotice(`set ${column} successfully`)
      }).catch((err) => console.error(err))
  }

  if (error) {
    return <div className="text-center">Error: {error.message}</div>;
  } else if (isLoading) {
    return <div className="text-center" >Loading...</div>;
  } else {
   return (
     <>
     <Container maxWidth="md" component="main">
     <div className="text-center text-success">{notice}</div>
     <Modal show={show} onHide={handleClose}>
       <Modal.Header closeButton>
         <Modal.Title>Set Timer</Modal.Title>
       </Modal.Header>
       <Modal.Body>
        <div className="row text-center">
          <div className="col-sm-12 text-center">
            <DateTimePicker
              name="datetime"
              format="y-MM-dd H:mm"
              onChange={setValue}
              value={value}
            />
          </div>
        </div>
       </Modal.Body>
       <Modal.Footer>
         <Button variant="outlined" className="bg-primary text-white m-1" onClick={handleSubmit}>
           Save
         </Button>
         <Button variant="outlined" className="bg-danger text-white m-1" onClick={handleClose}>
         Close
         </Button>
       </Modal.Footer>
     </Modal>
      <table className="table">
        <thead>
          <tr>
            <th colSpan="4" className="text-center text-uppercase border">Devices in my room</th>
          </tr>
          <tr>
            <th className="border">Name</th>
            <th className="text-center border">Status</th>
            <th className="text-center border">Turn on</th>
            <th className="text-center border">Turn off</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td className="border"><Icon.Lamp/> Light 1</td>
          <td className="text-center border"><Button color="primary" className={item0.status==='on'? 'bg-danger text-white' : ''} variant="outlined"  onClick={(e)=>Turn_led(item0.status, 'led_status0', 'status')}>{item0.status}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item0.status, 'led_status0', 'turnon')}>{item0.turnon}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item0.status, 'led_status0', 'turnoff')}>{item0.turnoff}</Button></td>
        </tr>
        <tr>
          <td className="border"><Icon.Lamp/> Light 2</td>
          <td className="text-center border"><Button color="primary"  className={item1.status==='on'? 'bg-danger text-white' : ''} variant="outlined"  onClick={(e)=>Turn_led(item1.status, 'led_status1', 'status')}>{item1.status}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item1.status, 'led_status1', 'turnon')}>{item1.turnon}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item1.status, 'led_status1', 'turnoff')}>{item1.turnoff}</Button></td>
        </tr>
        <tr>
          <td className="border"><Icon.Lamp/> Light 3</td>
          <td className="text-center border"><Button color="primary"  className={item2.status==='on'? 'bg-danger text-white' : ''} variant="outlined"  onClick={(e)=>Turn_led(item2.status, 'led_status2', 'status')}>{item2.status}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item2.status, 'led_status2', 'turnon')}>{item2.turnon}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item2.status, 'led_status2', 'turnoff')}>{item2.turnoff}</Button></td>
        </tr>
        <tr>
          <td className="border"><Icon.Lamp/> Light 4</td>
          <td className="text-center border"><Button color="primary"  className={item3.status==='on'? 'bg-danger text-white' : ''} variant="outlined"  onClick={(e)=>Turn_led(item3.status, 'led_status3', 'status')}>{item3.status}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item3.status, 'led_status3', 'turnon')}>{item3.turnon}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item3.status, 'led_status3', 'turnoff')}>{item3.turnoff}</Button></td>
        </tr>
        <tr>
          <td className="border"><Icon.Power/> Fan</td>
          <td className="text-center border"><Button color="primary"  className={item5.status==='on'? 'bg-danger text-white' : ''} variant="outlined"  onClick={(e)=>Turn_led(item5.status, 'led_status5', 'status')}>{item5.status}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item5.status, 'led_status5', 'turnon')}>{item5.turnon}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item5.status, 'led_status5', 'turnoff')}>{item5.turnoff}</Button></td>
        </tr>
        <tr>
          <td className="border"><Icon.Lamp/> Power socket 1</td>
          <td className="text-center border"><Button color="primary"  className={item6.status==='on'? 'bg-danger text-white' : ''} variant="outlined"  onClick={(e)=>Turn_led(item6.status, 'led_status6', 'status')}>{item6.status}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item6.status, 'led_status6', 'turnon')}>{item6.turnon}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item6.status, 'led_status6', 'turnoff')}>{item6.turnoff}</Button></td>
        </tr>
        <tr>
          <td className="border"><Icon.Lamp/> Power socket 2</td>
          <td className="text-center border"><Button color="primary"  className={item7.status==='on'? 'bg-danger text-white' : ''} variant="outlined"  onClick={(e)=>Turn_led(item7.status, 'led_status7', 'status')}>{item7.status}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item7.status, 'led_status7', 'turnon')}>{item7.turnon}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item7.status, 'led_status7', 'turnoff')}>{item7.turnoff}</Button></td>
        </tr>
        <tr>
          <td className="border"><Icon.Lamp/> Power socket 3</td>
          <td className="text-center border"><Button color="primary"  className={item8.status==='on'? 'bg-danger text-white' : ''} variant="outlined"  onClick={(e)=>Turn_led(item8.status, 'led_status8', 'status')}>{item8.status}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item8.status, 'led_status7', 'turnon')}>{item8.turnon}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item8.status, 'led_status8', 'turnoff')}>{item8.turnoff}</Button></td>
        </tr>
        </tbody>
      </table>
      </Container>
     </>
   );
 }
}
export default Led;
