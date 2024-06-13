class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const excluded = ["limit", "sort", "page", "field", "search"];

    const queryObj = { ...this.queryString };
    console.log(queryObj);

    excluded.map((el) => delete queryObj[el]);

    console.log(queryObj);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|eq)\b/g, (match) => {
      return `$${match}`;
    });
    queryStr = queryStr.replace(/~/g, () => {
      return `.`;
    });
    console.log("queryStr", queryStr);

    console.log(JSON.parse(queryStr));
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    console.log(this.queryString);

    return this;
  }

  pagiantion() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  search(searchFields) {
    if (this.queryString.search) {
      const keyword = this.queryString.search.replace("+", " ") || "";
      const fields = [...searchFields];

      const qs = fields.map((fl) => {
        const obj = {};
        obj[fl] = { $regex: `${keyword}`, $options: "i" };
        return obj;
      });

      this.query = this.query.find({ $or: qs });
    }
    return this;
  }
}

module.exports = ApiFeatures;
