import React from 'react';
import {ImageGalleryItem} from '../imageGalleryItem/ImageGalleryItem';


export function ImageGallery({data ,openModal}) {

  return(
    <>
    <ul className="ImageGallery">
      {
        data.map((el) =>   
         <ImageGalleryItem openModal={()=>openModal(el.largeImageURL, el.tags)} key={el.id} img={el.webformatURL} />)
      } 
    </ul>
    </>
  )
}
