import { isEmpty } from 'lodash';

export class ScalerFilter {
    constructor(value) {
        this.value = value;
        this.operator = 'EQ';
    }

    toString() {
        switch (this.operator) {
        case 'EQ':
            return typeof this.value === 'string' &&
                    this.value.split(' ').length > 1
                ? `"${this.value}"`
                : this.value;
        }
    }
}

class AndFilter {
    constructor(value) {
        this.value = value;
    }

    toString() {
        return ` AND ${this.value.toString()}`;
    }
}

class OrFilter {
    constructor(value) {
        this.value = value;
    }
    toString() {
        return ` OR ${this.value.toString()}`;
    }
}

export class QueryFilter {
    constructor() {
        this.filterName = undefined;
        this.filters = [];
    }

    toString() {
        if (isEmpty(this.filterName) && isEmpty(this.filters)) {
            return '';
        }
        const query = `${
            !isEmpty(this.filterName) ? this.filterName + ':' : ''
        }`;
        const filterString = this.filters.reduce(
            (p, c) => `${p}${c.toString()}`,
            ''
        );
        return `${query}${
            this.filters.length > 1 && !isEmpty(this.filterName)
                ? '(' + filterString + ')'
                : filterString
        }`;
    }

    AND(value) {
        if (!(value instanceof QueryFilter)) {
            value = new ScalerFilter(value);
        }
        if (this.filters.length === 0) {
            this.filters.push(value);
        } else {
            this.filters.push(new AndFilter(value));
        }
        return this;
    }

    OR(value) {
        if (!(value instanceof QueryFilter)) {
            value = new ScalerFilter(value);
        }
        if (this.filters.length === 0) {
            this.filters.push(value);
        } else {
            this.filters.push(new OrFilter(value));
        }
        return this;
    }

    createFilter(filterName, filter, logicalOperator = 'AND') {
        const queryFilter = new QueryFilter();
        queryFilter.filterName = filterName;
        if (!isEmpty(filter) && !(filter instanceof QueryFilter)) {
            queryFilter.filters.push(new ScalerFilter(filter));
        }
        if (this.filters.length < 1) {
            this.filters.push(queryFilter);
        } else {
            if (logicalOperator.trim().toLocaleLowerCase() === 'and') {
                this.filters.push(new AndFilter(queryFilter));
            } else if (logicalOperator.trim().toLocaleLowerCase() === 'or') {
                this.filters.push(new OrFilter(queryFilter));
            }
        }
        return queryFilter;
    }
}
