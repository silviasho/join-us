import React ,{useState,useEffect}from 'react';
import Carousel from 'react-material-ui-carousel'

export default function CustomCarousel(props) {
    const { imgEvent,category } = props
    const [imgArray,setImgArray]=useState(imgEvent)
  
    useEffect(() => {
        if(imgEvent.length===0){
            setImgArray([{src:`http://localhost:2001/eventDefaultPicture/${category}`}])
        }
    },[])

    return (
        <Carousel>
            {
                imgArray.map((item, i) => <Item key={i} item={item.src} />)
            }
        </Carousel>
    )
}

function Item(props) {
    return (
        <div >
            <img src={props.item} alt="no img" className="carousel"  />
        </div>
    )
}
