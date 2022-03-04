import React,{Component} from "react";
import {getMovies} from "../services/fakeMovieService";
import Like from './common/Like'
import Pagination from "./common/Pagination";
import {paginate} from "../utilis/paginate";

class Movies extends Component{
    state={
        movies:getMovies(),
        pageSize:4,
        currentPage:1
    }
    handleDelete=(movie)=>{
        let movies = this.state.movies;
        movies = movies.filter(m=>m._id!==movie._id)
        this.setState({movies})
    }
    handleLike=(movie)=>{
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index]={...movies[index]};
        movies[index].liked=!movies[index].liked;
        this.setState({movies})
    }
    handlePageChange=(page)=>{
        this.setState({currentPage:page});
    }
    renderTableData(){
        const {pageSize,currentPage,movies:allMovies}=this.state;
        const movies = paginate(allMovies,pageSize,currentPage);
        return movies.map((movie)=>{
            const{_id,title,genre,numberInStock,dailyRentalRate}=movie;
            return(
                <React.Fragment  key={_id}>
                    <tr>
                        <td>{title}</td>
                        <td>{genre.name}</td>
                        <td>{numberInStock}</td>
                        <td>{dailyRentalRate}</td>
                        <td><Like liked={movie.liked} onClick={()=>this.handleLike(movie)}> </Like></td>
                        <td> <button className="btn btn-danger" onClick={()=>this.handleDelete(movie)}> Delete </button></td>
                    </tr>
                </React.Fragment>
            )
            }
        )
    }
    render() {
        const count = this.state.movies.length;
        const {pageSize,currentPage}=this.state
        return(
            <>
                <main className="container">
                    {count===0 && <span> There are no movies in Database</span>}
                    {count!==0 && <span> There are {count} movies in Database</span>}
                    {count!==0 &&
                        <table className="table table-striped table-dark">
                            <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Rent</th>
                                <th> </th>
                                <th> </th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderTableData()}
                            </tbody>
                        </table>
                    }
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        onPageChange={this.handlePageChange}
                        currentPage={currentPage}
                    >
                    </Pagination>
                </main>
            </>
        );
    }
}

export default Movies;