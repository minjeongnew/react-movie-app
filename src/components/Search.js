import React from 'react';
import Movie from './Movie';
import "./Search.scss";
import {naverMoviesApi} from '../api';
import Button from './Button'
import { MdAdd } from 'react-icons/md';

class Search extends React.Component {
  state = {
    isLoading: false,
    movies: [],
    value: "",
    name: "영화 검색",
    clicked:false,
    clickedIndex:0,
    currentMovie : {}
  };

  getSearchMovie = async () => {
    console.log('search Movie');
    const search = this.state.value;

    try {
      if (search === "") {
        this.setState({movies: [], isLoading: false})
      } else {
        this.setState({movies: [], isLoading: true})
        const {data: {
            items
          }} = await naverMoviesApi.search(search);
        //alert("(Loading 메시지 확인중...)");
        this.setState({movies: items, isLoading: false});
        console.log(items)
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getSearchMovie();
  };

  handleChange = (e : any) => {
    this.setState({value: e.target.value});
  };
  onClickHandler = (e:any) => {
    e.preventDefault();
    this.setState({clicked: true});

  }
  handleSubmit = (e : any) => {
    e.preventDefault();
    this.getSearchMovie();
  };


  buttonClick = (index) => {
    // e.preventDefault();

    console.log(this.state.movies[index], index)
    this.setState({clicked:true})
    this.setState({currentMovie:this.state.movies[index]})
  }
  render() {
    const {movies, isLoading, name, clicked, currentMovie} = this.state;

    return (<section className="container">
      {
        isLoading
          ? (<div className="loader">
            <span className="loader__text">({this.state.name}) Loading... {this.state.value}</span>
          </div>)
          : (<form className="form-search" onSubmit={this.handleSubmit}>
            <div>
              <div className="input_div">
                {/*<h1>영화 검색</h1>*/}
                <input className="input_search" type="text" value={this.state.value} onChange={this.handleChange} placeholder="영화를 검색해 보세요."/>
                <button type="submit" className="input-button">
                  <MdAdd />
                </button>
              </div>
              <div className="buttons">
                {movies.map((movie, index) =>
                        (<Button idx={index} callback={(e)=>{this.buttonClick(index); e.preventDefault()}} key={index}></Button>)
                )}

              </div>
              {clicked? <Movie key ={currentMovie.link}
                               id={currentMovie.link}
                               year={currentMovie.pubDate}
                               title={currentMovie.title}
                               poster={currentMovie.image}
                               rating={currentMovie.userRating}
                               director={currentMovie.director}
                               actor={currentMovie.actor}/>:''}
            </div>
          </form>)
      }
    </section>);
  }
}

export default Search;
