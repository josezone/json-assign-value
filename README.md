json-assign-value
===

Assign values to JSON directly, supports direct assignments, callback and promises

browser directly!
## Install via npm,

```bash
$ npm install json-assign-value
```

## API

```js
var jsonAssignValue = require('json-assign-value')
```

### `jsonAssignValue(query, asigningValue ,options)`

Specify a query, what to assign and what to query. Returns a new objects with values assigned.

```js

var data = {
  people: [
    {name: 'Matt', country: 'NZ'},
    {name: 'Pete', country: 'AU'},
    {name: 'Mikey', country: 'NZ'}
  ]
}

jsonAssignValue('people[country=NZ].name', 'John',  {
  data: data
}) //=> {people[{name: 'John', country: 'NZ'} ... etc

jsonAssignValue('people[country=NZ].name', (value) => `${value} Regan`,  {
  data: data, cb: true
}) //=> {people[{name: 'Matt Regan', country: 'NZ'} ... etc

jsonAssignValue('people[country=NZ].name', new Promise(resolve) => resolve("John"),  {
  data: data, asyncify: true
}) //=> {people[{name: 'John', country: 'NZ'} ... etc

jsonAssignValue('people[country=NZ].name', (value) => new Promise(resolve) => resolve(`${value} Regan`),  {
  data: data, cb: true
}) //=> {people[{name: 'Matt Regan', country: 'NZ'} ... etc

```

#### Options:

- **`data`**  The main object to assign values.
- **`allowRegexp`** (optional): Enable the `~` operator. Before enabling regexp match to anyone, consider the [user defined regular expression security concerns](http://stackoverflow.com/questions/20928677/user-defined-regular-expression-security-concerns).
- **`cb`** Boolean, this allows users to set value as a callback function with the matched variable available in the callback.
- **`asyncify`** Boolean, this allows users to pass promises as the values to be set

## Queries

Queries are strings that describe an object or value to pluck out, or manipulate from the context object. The syntax is a little bit CSS, a little bit JS, but pretty powerful.

### Accessing properties (dot notation)

`person.name`

### Array accessors

`people[0]`

### Array pluck

`people.name` => return all the names of people


### Array filter

By default **only the first** matching item will be returned:

`people[name=Matt]`

But if you add an asterisk (`*`), **all** matching items will be returned:

`people[*country=NZ]`

You can use comparative operators:

`people[*rating>=3]`

Or use boolean logic:

`people[* rating >= 3 & starred = true]`

If `options.enableRegexp` is enabled, you can use the `~` operator to match `RegExp`:

`people[*name~/^R/i]`

You can also **negate** any of the above examples by adding a `!` before the `=` or `~`:

`people[*country!=NZ]`

## License

MIT