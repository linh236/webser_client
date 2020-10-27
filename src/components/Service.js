import React, {useEffect, useState} from 'react';
import {URL} from './Myconnect';
import '../styles/service.css';
import CurrencyFormat from 'react-currency-format';
import Container from '@material-ui/core/Container';

const Service = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState([]);
  const [rents, setRents] = useState([]);
  let id = localStorage.getItem('id');
  useEffect(()=> {
    getService(id);
    getPaytherent(id);
  }, [])
  const getService = (id) => {
    let url = URL+`/api/getUseServices/${id}`;
    fetch(url)
       .then(res => res.json())
       .then(res => {
         setItems(res.data);
         setAmount(res.service_amount);
       })
       .catch((error) => {
         setError(error);
       })
       .finally(() => setLoading(false));
  }

  const getPaytherent = (id) => {
    let url = URL+`/api/getPaytheRent/${id}`;
    fetch(url)
       .then(res => res.json())
       .then(res => {
         setRents(res.data);
       })
       .catch((error) => {
         setError(error);
       })
       .finally(() => setLoading(false));
  }
  if (error) {
    return <div className="text-center">Error: {error.message}</div>;
  } else if (isLoading) {
    return <div className="text-center">Loading...</div>;
  } else {
  return(
      <>
      <Container maxWidth="md" component="main">
        <table className="table">
          <thead>
            <tr>
              <th colSpan="4" className="text-center border text-uppercase">My services are using</th>
            </tr>
            <tr>
              <th className="text-center border">Order</th>
              <th className="text-center border">Service</th>
              <th className="text-center border">Cost</th>
              <th className="text-center border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((key,value)=> (
              <tr key={value}>
                  <td className="border text-center">{value}</td>
                  <td className="border text-center">{key.name}</td>
                  <td className="border text-center"><CurrencyFormat value={key.cost} displayType={'text'} thousandSeparator={true} /></td>
                  <td className="border text-center">{amount[value]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="table">
          <thead>
            <tr className="text-center">
              <th  colSpan="5" className="tex-t-center border text-uppercase">Monthly rent</th>
            </tr>
            <tr>
              <th className="text-center border">Order</th>
              <th className="text-center border">Month</th>
              <th className="text-center border">Money</th>
              <th className="text-center border">Date of payment</th>
              <th className="text-center border">Status</th>
            </tr>
          </thead>
          <tbody>
            {rents.map((key,value)=> (
              <tr key={value} className={key.status ===0? "no":""}>
                  <td className="border text-center">{value}</td>
                  <td className="border text-center">{key.senddate}</td>
                  <td className="border text-center"><CurrencyFormat value={key.money} displayType={'text'} thousandSeparator={true} /></td>
                  <td className="border text-center">{key.receivedate}</td>
                  <td className="border text-center">{key.status ===0? "No":"Yes"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
      </>
    )
  }
}
export default Service;