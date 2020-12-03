import React, {useEffect, useState} from 'react';
import {URL} from './Myconnect';
import Container from '@material-ui/core/Container';

const Setting = () => {
  const [item, setItem] = useState([]);
  const [error, setError] = useState(null);
  const [isNull, setIsNull] = useState(true);
  const [name, setName] = useState('');
  const [general, setGeneral] = useState(true);
  const [birth, setBirth] = useState(new Date());
  const [indenfify, setIndentify] = useState('');
  const [daterange, setDateRange] = useState('');
  const [placerange, setPlaceRange] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [note, setNote] = useState('');
  const [permanent, setPermanent] = useState('');
  const [notice, setNotice] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);

  let id = localStorage.getItem('id');
  useEffect(()=> {
    getInfor(id);
    getMembers(id);
  },[])

  const getInfor = (id) => {
    let url = URL+`/api/getinfo/${id}`;
    fetch(url)
       .then(res => res.json())
       .then(res => {
         setItem(res.data);
         setName(res.data.name);
         setGeneral(res.data.sex);
         setBirth(res.data.birth);
         setPhone1(res.data.phone1);
         setPhone2(res.data.phone2);
         setNote(res.data.note);
         setDateRange(res.data.daterange);
         setPlaceRange(res.data.placerange);
         setPermanent(res.data.permanent);
         setIndentify(res.data.indentifycard);
       })
       .catch((error) => {
         setError(error);
       })
       .finally(() => setLoading(false));
  }

  const handleSubmit = () => {
    let url_send_data = URL+`/api/updateInfo/${id}`;
      fetch(url_send_data, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          'name': name,
          'birth': birth,
          'indentifycard': indenfify,
          'daterange': daterange,
          'placerange': placerange,
          'phone1': phone1,
          'phone2': phone2,
          'permanent': permanent,
          'sex': general
        })
      }).then((response) => response.json())
      .then((data) => {
        getInfor(id);
        setNotice("Updated succesfully !");
      }).catch((err) => console.error(err))
  }

  const getMembers = (id) => {
    let url_send_data = URL+`/api/info_members/${id}`;
      fetch(url_send_data)
      .then((response) => response.json())
      .then((data) => {
        if (data.members === null) {
          setIsNull(true)
          return false;
        }
        setIsNull(false);
        setMembers(data.members)
      }).catch((err) => console.error(err))
  }
  if (error) {
    return <div className="text-center">Error: {error.message}</div>;
  } else if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }else{
  return(
      <>
      <Container maxWidth="md" component="main">
        <div className="text-center text-success">{notice}</div>
        <div className="card mt-4">
          <div className="row mb-2 line">
            <div className="col-sm-12 mt-2">
              <button type="submit" className="btn btn-success float-right mr-2" onClick={handleSubmit} >
                <i className="fa fa-check"></i>
                Save
              </button>
            </div>
          </div>
        <div className="card-body">
          <h4 className="card-title">Update information</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Full name</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" defaultValue={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9">
                    <input type="email" className="form-control" name="email" defaultValue={item.email} disabled/>
                  </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">General</label>
                <div className="col-sm-9">
                  <select className="form-control" defaultValue={general===true? "1": "0"} onChange={(e)=>setGeneral(e.target.value)}>
                    <option value="0">Male</option>
                    <option value="1">Female</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Birth</label>
                <div className="col-sm-9">
                  <input type="date" className="form-control"name="birth" placeholder="dd/mm/yyyy" defaultValue={birth} onChange={(e)=>setBirth(e.target.value)}/>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Indentify</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" name="indentifycard" defaultValue={indenfify} onChange={(e)=> setIndentify(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Date range</label>
                  <div className="col-sm-9">
                    <input type="date" className="form-control" name="daterange" placeholder="dd/mm/yyyy" defaultValue={daterange} onChange={(e)=>setDateRange(e.target.value)}/>
                  </div>
                </div>
              </div>
            </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Phone 1</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" name="phone1" defaultValue={phone1}  onChange={(e)=>setPhone1(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Place range</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" name="placerange" defaultValue={placerange} onChange={(e)=>setPlaceRange(e.target.value)}  />
                  </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Phone 2</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control"  name="phone2"  defaultValue={phone2} onChange={(e)=>setPhone2(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Permanent</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" name="permanent" defaultValue={permanent} onChange={(e)=>setPermanent(e.target.value)}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
    </>
    )
  }
}
export default Setting;
