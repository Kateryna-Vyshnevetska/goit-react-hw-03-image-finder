import React from 'react';
import {SearchBar} from './searchbar/Searchbar';
import {ImageGallery} from './imageGallery/ImageGallery'
import axios from 'axios'
import { Button } from './button/Button';
import {Spinner} from './loader/Spinner';
import {Modal} from './modal/Modal'

export class Gallery extends React.Component{
  state={
    search: '',
    images:[],
    page: 1,
    isLoading: false,
    showModal: false,
    currentImg: {}
  }

  getImages = async (search, page) => {
    const API_KEY = '18221445-47188b3908a326a287f79417d';
    try{
      const images = await axios.get(
        `https://pixabay.com/api/?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        )
      this.setState((prev) => ({...prev, images: [...prev.images, ...images.data.hits], isLoading: false}))
    }catch(error){console.log(error)}
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.search === ''){
      return;
    }else if(prevState.search !== this.state.search ||
      prevState.page !== this.state.page){
      this.getImages(this.state.search, this.state.page)
      .then(()=> this.scroll())
    }
  }
  
  scroll(){
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  getValueForSearch = (search) => {
    this.setState({
      search:search,
      images:[],
      page:1,
      isLoading:true,
    })
  }

  newPage = () => {
    this.setState((prev)=> ({page: prev.page + 1, isLoading:true,}))
  }

  openCloseModal = () => {
    this.setState((prev) => ({showModal : !prev.showModal}))
  }

  openModal = (src, alt) => {
    this.setState({currentImg:{src:src, alt:alt}})
    this.openCloseModal();
  }

  render(){

    const {isLoading, images, showModal, currentImg} = this.state;

    return(
      <>
      {showModal && <Modal onClose={this.openCloseModal}>
          <img src={currentImg.src} alt={currentImg.alt} />
        </Modal>}

      <SearchBar getValueForSearch = {this.getValueForSearch}/>
      
      <ImageGallery openModal={this.openModal} data={images}/>

      {images.length > 0 && !isLoading && <Button newPage={this.newPage}/>}
      
      {isLoading && <Spinner/>}
      </>
    )
  }
}