

const NewsItem = (props) =>{

    let {title , description , imgurl , newsurl , author , date , source} = props;
    return (
      <div className='my-3 mx-2'>
       <div className="card" style={{width : "18rem"}}>
       <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{color:'white' , zIndex:'1'}}>
        {source} <span className="visually-hidden">unread messages</span>
  </span>
  <img src={!imgurl?"https://images.news18.com/ibnlive/uploads/2023/02/mumbai-delhi-expressway-167609374316x9.jpg" : imgurl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small>By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
    <a href = {newsurl}target="_blank" className="btn btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }

export default NewsItem