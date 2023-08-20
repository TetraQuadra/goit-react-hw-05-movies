import { API_KEY } from '../config';

class DataFetcher {
  baseApi = 'https://api.themoviedb.org/3';

  fetchData = async path => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      };

      const response = await fetch(`${this.baseApi}${path}`, options);
      if (response.status === 401) {
        //this did happen several times atm, dunno how to handle this ¯\_(ツ)_/¯
        alert('token is dead, get a new one');
      }
      if (!response.ok) {
        console.error('Network response was not ok');
        throw new Error();
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  getTrending = async () => {
    try {
      const response = await this.fetchData(`/trending/all/day`);
      return response;
    } catch (error) {
      console.log('Got error while fetching trending films');
      throw error;
    }
  };

  getMovieById = async movie_id => {
    try {
      const response = await this.fetchData(`/movie/${movie_id}`);
      return response;
    } catch (error) {
      console.log('Got error while fetching film by id');
      throw error;
    }
  };

  getMovieCredits = async movie_id => {
    try {
      const response = await this.fetchData(`/movie/${movie_id}/credits`);
      return response;
    } catch (error) {
      console.log('Got error while fetching movie credits');
      throw error;
    }
  };

  getMovieReviews = async movie_id => {
    try {
      const response = await this.fetchData(`/movie/${movie_id}/reviews`);
      return response;
    } catch (error) {
      console.log('Got error while fetching movie reviews');
      throw error;
    }
  };

  searchMovie = async (query, page) => {
    try {
      const response = await this.fetchData(
        `/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`
      );
      return response;
    } catch (error) {
      console.log('Got error while searching movies');
    }
  };
}

export default DataFetcher;

//   baseImgPath = 'https://image.tmdb.org/t/p/w500';
//   defaultImg = 'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';
