import React, { useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import { useState } from 'react';
   
  const News = (props) =>{
     // eslint-disable-next-line
    const[articles , setArticles] = useState([]);
    const [loading , setLoading] = useState(true)
    const[page , setPage] = useState(1)
    const[totalResults , setTotalResults] = useState(0)

     const capitalizeFirstLetter = (string) =>{
        return string.charAt(0).toUpperCase()+ string.slice(1);
     }
    
        // document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsPointer`;
    const updateNews = async () =>{
       props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json() 
       props.setProgress(70);
       setArticles(parsedData.articles)
       setTotalResults(parsedData.articles)
      setLoading(false)
       
      props.setProgress(100);
    }
    useEffect(()=>{
      updateNews();
    } , [])
    
    const handleNextClick = async () => {
    
        setPage(page + 1 );
     updateNews();
    //   if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
    //   }
    //   else {
    //       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1975fbf217824b02ab7880fcd404dfe8&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //       this.setState({loading: true});
    //       let data = await fetch(url);
    //       let parsedData = await data.json() 
    //       this.setState({
    //           page: this.state.page + 1,
    //           articles: parsedData.articles,
    //           loading: false
    //       })
    //   }
  }
   const handlePrevClick = async () => {
     setPage(page -1)
     updateNews();
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1975fbf217824b02ab7880fcd404dfe8&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //   let data = await fetch(url);
    //   let parsedData = await data.json()
    //   console.log(parsedData);
    //   this.setState({
    //       page: this.state.page - 1,
    //       articles: parsedData.articles
    //   })
  }
    return (
        <div className="container my-3">
            <h1 className='text-center' style={{margin:'35px 0px' , marginTop:'90px'}}>NewsPointer - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner/>}
                <div className="row"> 
                    {articles && articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imgurl={element.urlToImage} newsurl={element.url} author={element.author} date ={element.publishedAt} source = {element.source.name}/>
                        </div> 
                    })} 
                </div>
            <div className="container d-flex justify-content-between">
            <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
            <button disabled = {page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div>
        </div>
    )
}
  News.defaultProps = {
  country: 'in',
  pageSize: 8, 
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number, 
  category: PropTypes.string,
}

export default News