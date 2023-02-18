class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr=queryStr;
    }

search(){
    const keyword = this.queryStr.keyword ? {
        name:{
            $regex:this.queryStr.keyword,
            $options: "i",
        },

    }:{};

    this.query = this.query.find({...keyword});
    return this;
}

filter(){
    const queryCopy = {...this.queryStr} //spread operator to pass by value
   
    //removing some fields for category
    const removeFields = ["keywords", "page","limit"];

    removeFields.forEach(key=>delete queryCopy[key]);
     
    //filter for price and rating
    let querystr = JSON.stringify(queryCopy);
    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=>`$${key}`);
    this.query = this.query.find(JSON.parse(querystr));
    return this;
}

pagination(resultsPerPage){
const currentPage = Number(this.queryStr.page) || 1;

const skip = resultsPerPage*(currentPage-1);

this.query = this.query.limit(resultsPerPage).skip(skip);
return this;

}

}

module.exports = ApiFeatures;
