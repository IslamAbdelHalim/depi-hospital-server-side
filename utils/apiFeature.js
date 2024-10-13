export default class ApiFeature {
  constructor(query, queryKeys) {
    this.query = query;
    this.queryKeys = queryKeys;
  }

  filter() {
    let queryObjects = { ...this.queryKeys };
    const advancedQuery = ['page', 'limit', 'fields', 'sort'];
    // remove advancedQuery from queryObjects
    advancedQuery.forEach((el) => delete queryObjects[el]);

    //apply filter using gte lte and so on..
    // convert {gte: 10} => {$gte: 10}
    queryObjects = JSON.stringify(queryObjects).replace(
      /\b(gte | lte | gt | lt)\b/g,
      (match) => `$${match}`
    );

    queryObjects = JSON.parse(queryObjects);

    //apply query filter
    this.query = this.query.find(queryObjects);
    return this;
  }

  limitFields() {
    if (this.queryKeys.fields) {
      console.log(this.queryKeys.fields.split(','));
      const fields = this.queryKeys.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  sort() {
    if (this.queryKeys.sort) {
      const sortBy = this.queryKeys.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    }

    return this;
  }

  pagination() {
    const page = this.queryKeys.page * 1 || 1;
    const limit = this.queryKeys.limit * 1 || 100;

    this.query = this.query.skip((page - 1) * limit).limit(limit);
    return this;
  }
}
