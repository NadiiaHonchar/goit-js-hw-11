import axios from "axios";
import Notiflix from 'notiflix';

const API_KEY = '24626518-665b9f7b8dc290fe9a65ef06e';
const per_page = 4;

export default class PixabayApiService
{
  constructor()
  {
    this.resp='';
    this.page=1;
  }
async  getUser() 
  {
    try 
    {
      const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${this.resp}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${per_page}`);      
      if (response.data.hits.length<1){Notiflix.Report.info('Sorry, there are no images matching your search query. Please try again.');}
      if (response.data.hits.length>1&&response.length<40){Notiflix.Report.info("We're sorry, but you've reached the end of search results.");}
      this.page +=1;     
      return response.data.hits;    
    } 
    catch (error) 
    {
      console.error(error);
    }
  }

  resetPage()
  {
    this.page = 1;
  }

  get query()
  {
    return this.resp;
  }

  set query(newResp)
  {
    this.resp = newResp;
  }
}
