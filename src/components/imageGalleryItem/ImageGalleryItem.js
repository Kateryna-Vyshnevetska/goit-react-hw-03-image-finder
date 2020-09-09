import React from 'react';

export function ImageGalleryItem({img, openModal}){
  return(
    <li onClick={openModal}>
      <img src={img} alt="" className="ImageGalleryItem-image" />
    </li>
  )
}