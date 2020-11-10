import React, {useState, useEffect} from 'react';
import {URL} from './Myconnect';
import * as Icon from 'react-bootstrap-icons';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import 'moment/locale/vi';
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-bootstrap/Modal'
import Container from '@material-ui/core/Container';
import $ from 'jquery';
import Clock from 'react-clock';
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
  const [date, setDate] = useState(new Date());
   const [clock, setClock] = useState(new Date());

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  let id = localStorage.getItem('id');

   useEffect(() => {
     getLed(id);
     const interval = setInterval(
      () => setClock(new Date()),
      1000
    );

    return () => {
      clearInterval(interval);
    }
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
  const Turn_led = (status, name, column, active)=>{
     if (active === 'disable') {
       alert('This led is disabled');
       return false;
    }
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
  const setTime = (status, name, column, active) => {
    if (active === 'disable') {
      alert('This led is disabled');
      return false;
    }
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

  const autorun = () => {
    // $(".led_status0").addClass('bg-info');
    let format_clock = moment(clock).format('Y-MM-DD HH:mm:ss');
    let res_item0 = item0.turnon + ':00';
    let res_item1 = item1.turnon + ':00';
    let res_item2 = item2.turnon + ':00';
    let res_item3 = item3.turnon + ':00';
    let res_item5 = item5.turnon + ':00';
    let res_item6 = item6.turnon + ':00';
    let res_item7 = item7.turnon + ':00';
    let res_item8 = item8.turnon + ':00';
    let res_off_item0 = item0.turnoff + ':00';
    let res_off_item1 = item1.turnoff + ':00';
    let res_off_item2 = item2.turnoff + ':00';
    let res_off_item3 = item3.turnoff + ':00';
    let res_off_item5 = item5.turnoff + ':00';
    let res_off_item6 = item6.turnoff + ':00';
    let res_off_item7 = item7.turnoff + ':00';
    let res_off_item8 = item8.turnoff + ':00';
    if (format_clock === res_item0) {
      $(".led_status0").text('ON');
      $(".led_status0").addClass('bg-danger text-white');
    }
    if (format_clock === res_item1) {
      $(".led_status1").text('ON');
      $(".led_status1").addClass('bg-danger text-white');
    }
    if (format_clock === res_item2) {
      $(".led_status2").text('ON');
      $(".led_status2").addClass('bg-danger text-white');
    }
    if (format_clock === res_item3) {
      $(".led_status3").text('ON');
      $(".led_status3").addClass('bg-danger text-white');
    }
    if (format_clock === res_item5) {
      $(".led_status5").text('ON');
      $(".led_status5").addClass('bg-danger text-white');
    }
    if (format_clock === res_item6) {
      $(".led_status6").text('ON');
      $(".led_status6").addClass('bg-danger text-white');
    }
    if (format_clock === res_item7) {
      $(".led_status7").text('ON');
      $(".led_status7").addClass('bg-danger text-white');
    }
    if (format_clock === res_item8) {
      $(".led_status8").text('ON');
      $(".led_status8").addClass('bg-danger text-white');
    }
    // turn off change background button stuatus
    if (format_clock === res_off_item0) {
      $(".led_status0").removeClass('bg-danger text-white');
      $(".led_status0").text('OFF');
    }
    if (format_clock === res_off_item1) {
      $(".led_status1").removeClass('bg-danger text-white');
      $(".led_status1").text('OFF');
    }
    if (format_clock === res_off_item2) {
      $(".led_status2").removeClass('bg-danger text-white');
      $(".led_status2").text('OFF');
    }
    if (format_clock === res_off_item3) {
      $(".led_status3").removeClass('bg-danger text-white');
      $(".led_status3").text('OFF');
    }
    if (format_clock === res_off_item5) {
      $(".led_status5").removeClass('bg-danger text-white');
      $(".led_status5").text('OFF');
    }
    if (format_clock === res_off_item6) {
      $(".led_status6").removeClass('bg-danger text-white');
      $(".led_status6").text('OFF');
    }
    if (format_clock === res_off_item7) {
      $(".led_status7").removeClass('bg-danger text-white');
      $(".led_status7").text('OFF');
    }
    if (format_clock === res_off_item8) {
      $(".led_status8").removeClass('bg-danger text-white');
      $(".led_status8").text('OFF');
    }
  }
  autorun();

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
        <tr className={item0.active === 'disable' ? 'bg-secondary' : ''}>
          <td className="border"><Icon.Lamp/> Light 1</td>
          <td className="text-center border"><Button color="primary" className={item0.status==='on'? 'bg-danger text-white led_status0' : 'led_status0'} variant="outlined"  onClick={(e)=>Turn_led(item0.status, 'led_status0', 'status',item0.active)}>{item0.status}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item0.status, 'led_status0', 'turnon', item0.active)}>{item0.turnon}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item0.status, 'led_status0', 'turnoff', item0.active)}>{item0.turnoff}</Button></td>
        </tr>
        <tr className={item1.active === 'disable' ? 'bg-secondary' : ''}>
          <td className="border"><Icon.Lamp/> Light 2</td>
          <td className="text-center border"><Button color="primary"  className={item1.status==='on'? 'bg-danger text-white led_status1' : 'led_status1'} variant="outlined"  onClick={(e)=>Turn_led(item1.status, 'led_status1', 'status',item1.active)}>{item1.status}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item1.status, 'led_status1', 'turnon', item1.active)}>{item1.turnon}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item1.status, 'led_status1', 'turnoff', item1.active)}>{item1.turnoff}</Button></td>
        </tr>
        <tr className={item2.active === 'disable' ? 'bg-secondary' : ''}>
          <td className="border"><Icon.Lamp/> Light 3</td>
          <td className="text-center border"><Button color="primary"  className={item2.status==='on'? 'bg-danger text-white led_status2' : 'led_status2'} variant="outlined"  onClick={(e)=>Turn_led(item2.status, 'led_status2', 'status',item2.active)}>{item2.status}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item2.status, 'led_status2', 'turnon', item2.active)}>{item2.turnon}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item2.status, 'led_status2', 'turnoff', item2.active)}>{item2.turnoff}</Button></td>
        </tr>
        <tr className={item3.active === 'disable' ? 'bg-secondary' : ''}>
          <td className="border"><Icon.Lamp/> Light 4</td>
          <td className="text-center border"><Button color="primary"  className={item3.status==='on'? 'bg-danger text-white led_status3' : 'led_status3'} variant="outlined"  onClick={(e)=>Turn_led(item3.status, 'led_status3', 'status',item3.active)}>{item3.status}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item3.status, 'led_status3', 'turnon', item3.active)}>{item3.turnon}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item3.status, 'led_status3', 'turnoff', item3.active)}>{item3.turnoff}</Button></td>
        </tr>
        <tr className={item5.active === 'disable' ? 'bg-secondary' : ''}>
          <td className="border"><Icon.Power/> Fan</td>
          <td className="text-center border"><Button color="primary"  className={item5.status==='on'? 'bg-danger text-white led_status5' : 'led_status5'} variant="outlined"  onClick={(e)=>Turn_led(item5.status, 'led_status5', 'status',item5.active)}>{item5.status}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item5.status, 'led_status5', 'turnon', item5.active)}>{item5.turnon}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item5.status, 'led_status5', 'turnoff', item5.active)}>{item5.turnoff}</Button></td>
        </tr>
        <tr className={item6.active === 'disable' ? 'bg-secondary' : ''}>
          <td className="border"><Icon.Lamp/> Power socket 1</td>
          <td className="text-center border"><Button color="primary"  className={item6.status==='on'? 'bg-danger text-white led_status6' : 'led_status6'} variant="outlined"  onClick={(e)=>Turn_led(item6.status, 'led_status6', 'status',item6.active)}>{item6.status}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item6.status, 'led_status6', 'turnon', item6.active)}>{item6.turnon}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item6.status, 'led_status6', 'turnoff', item6.active)}>{item6.turnoff}</Button></td>
        </tr>
        <tr className={item7.active === 'disable' ? 'bg-secondary' : ''}>
          <td className="border"><Icon.Lamp/> Power socket 2</td>
          <td className="text-center border"><Button color="primary"  className={item7.status==='on'? 'bg-danger text-white led_status7' : 'led_status7'} variant="outlined"  onClick={(e)=>Turn_led(item7.status, 'led_status7', 'status',item7.active)}>{item7.status}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item7.status, 'led_status7', 'turnon', item7.active)}>{item7.turnon}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item7.status, 'led_status7', 'turnoff', item7.active)}>{item7.turnoff}</Button></td>
        </tr>
        <tr className={item8.active === 'disable' ? 'bg-secondary' : ''}>
          <td className="border"><Icon.Lamp/> Power socket 3</td>
          <td className="text-center border"><Button color="primary"  className={item8.status==='on'? 'bg-danger text-white led_status8' : 'led_status8'} variant="outlined"  onClick={(e)=>Turn_led(item8.status, 'led_status8', 'status',item8.active)}>{item8.status}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item8.status, 'led_status8', 'turnon', item8.active)}>{item8.turnon}</Button></td>
          <td className="text-center border"><Button color="primary" variant="outlined"  onClick={(e)=>setTime(item8.status, 'led_status8', 'turnoff', item8.active)}>{item8.turnoff}</Button></td>
        </tr>
        </tbody>
      </table>
      </Container>
     </>
   );
 }
}

export default Led;
