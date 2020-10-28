import React, {useState, useEffect} from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import {URL} from './Myconnect';
import '../styles/Slider.css';

const Slider = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sliders, setSliders] = useState([]);
  useEffect(()=> (
    appSlider()
  ),[])
  const appSlider = () => {
    let url = URL + '/api/appSlider';
    fetch(url).then((response) => response.json())
    .then((json) => {
      setSliders(json.slides);
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
  }else{
  return(
      <div className="slide-container position-relative m-1">
        <Fade in="true">
          {
            sliders.map((key,index)=> (
              <div key={index} className="each-fade">
                <div key={index} className="image-container text-center container_img">
                  <img key={index} src={URL+key.image.url} className="mh-70 img_slider"/>
                </div>
                <div>
                  <h2 className="text-center position-absolute title_slider" style={{"color": key.textcolor}}>{key.title}</h2>
                </div>
              </div>
            ))
          }
        </Fade>
      </div>
    )
  }
}

export default Slider;
