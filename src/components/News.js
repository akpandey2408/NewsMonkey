import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
    constructor()
    {
        super();
        this.state = {
            articles: [],
            loading: false,
            totalResults : 0
        }
    }
    async componentDidMount()
    {
       let url = `https://gnews.io/api/v4/top-headlines?lang=en&country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}`
        this.setState({loading : true})
         fetch(url).then((response) => response.json())
        .then((data) => {
            this.setState({
                articles: data.articles,
                totalResults: this.state.totalResults,
                loading : false
            });
        });
    }
    // handleNextClick = async () => {
    //     let url = `https://gnews.io/api/v4/top-headlines?lang=en&country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    //     this.setState({loading : true})
    //         fetch(url).then((response) => response.json())
    //             .then((data) => {
    //                 this.setState({
    //                     articles: data.articles,
    //                     page: this.state.page + 1,
    //                     loading : false

    //                 });
    //             });
    //         return false;
    //     }

    // handlePrevClick = async () => {
    //     let url = `https://gnews.io/api/v4/top-headlines?lang=en&country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    //     this.setState({loading : true})
    //      fetch(url).then((response) => response.json())
    //     .then((data) => {
    //         this.setState({
    //             articles: data.articles,
    //             page: this.state.page - 1,
    //             loading : false
    //         });
    //     });
    
    // }
    fetchMoreData = () => {
        this.props.setProgress(0)
         let url = `https://gnews.io/api/v4/top-headlines?lang=en&country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}`
        this.setState({loading : true})
         fetch(url).then((response) => response.json())
        .then((data) => {
            this.setState({
                articles: data.articles,
                totalResults: data.totalResults,
                loading: false,
            });
        });
        this.props.setProgress(100)
  };
  render() {
    return (
        <div>
            <div className="container my-3">
                <h2 className="text-center">NewsMonkey Breaking news</h2>
                 {this.state.loading && <Spinner />}
                 <InfiniteScroll
          dataLength={10}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!== this.state.totalResults }
           loader={this.state.loading && <Spinner />}
            endMessage={
            <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
            </p>
  }
        >
                <div className="row">
                    {this.state.articles.map((element,index) => {
                        return <div className="col-md-4" key={index}>
                            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} image={element.image?element.image:"https://images.cointelegraph.com/images/1200_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjMtMDkvMjIxOTc3MGMtMTAzOC00NTBhLTk0ZmMtYTkzNWZjMzZhZmU1LmpwZw==.jpg"} url={element.url} />
                        </div>
                     })}
                
                    </div>
                    </InfiniteScroll>
            </div>
      </div>
    )
  }
}
