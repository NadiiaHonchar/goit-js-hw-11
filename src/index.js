import './css/styles.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import renderList from "./templates/renderList.hbs";
import PixabayApiService from "./pixabayApiService";

const usersGet = document.querySelector('.search-form');
const itemsContainer = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
const pixabayApiService = new PixabayApiService();

loadMore.classList.add('is-hidden');   

usersGet.addEventListener('submit', ouInputGet);
loadMore.addEventListener('click', onLoadMore);

function ouInputGet (e)
{
  e.preventDefault();       
  pixabayApiService.query = e.currentTarget.elements.searchQuery.value;
  pixabayApiService.resetPage();  
  pixabayApiService.getUser().then(response => 
  {
    resetList();
    renderListItems(response);    
    loadMore.classList.remove('is-hidden');     
  });       
}

function renderListItems(item)
{
  const markupList = renderList(item);
  itemsContainer.insertAdjacentHTML('beforeend',markupList);
}

function resetList()
{
  itemsContainer.innerHTML='';
}

function onLoadMore()
{  
  loadMore.classList.add('is-hidden'); 
  pixabayApiService.getUser().then(hits => console.log(hits));
  pixabayApiService.getUser().then(response => 
  {renderListItems(response);    
    loadMore.classList.remove('is-hidden');    
  });
}

