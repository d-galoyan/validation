# v-for-validation

[![NPM version][npm-image]][npm-url]

Simple, extensible library for validation any kind of data , <br/>
built with open/closed principle in mind.

## Not only Strings 

**You can pass any kind of data, just make sure that validator you choose can parse input.**

## Installation and Usage


Install the library with `npm install v-for-validation` or `yarn add v-for-validation`

#### ES6

```javascript
    import {Validation} from 'v-for-validation';
    
    const validation = new Validation()
    
    validation.rules({
        name : 'required|string',
        age : 'int',
        salary : 'bail|int|min:50000|max:100000' 
     })
    
    validation.onResultListener((results) => {
        console.log(results)
    })
    
    validation.validate({
        name : 'David',
        age : 28,
        salary : 40000
    })
```
Results will be an object of arrays with input keys and array of errors <br/>
that will contain error message and additional data like min, max.

```typescript
    type Results = {
        [key : string] : {
            errMsg : string,
            additionalData ?: {}   
         }[]
    }
```

Additional data will vary from validator to validator , if it `min` validator ,<br/>
than additionalData will contain "min" field . Example `

```javascript
    const result = {
        min : {
            errMsg : 'input.must.be.min',
            additionalData : {
                min : 8
            }   
        }
    }
```

errMsg is returned this way to be easy for further translation.

## Overrides

 You can override translations for specific validators.
 
 ```javascript
    validation.overrides({
        min : "must.be.other.translation"
    })
```


## Default Validators

Validators are strings separated with pipes.

Here is a list of the validators currently available.

Validator                               | Description
--------------------------------------- | --------------------------------------
**_bail_**                        | bail will stop on first error if provided.
**required**                      | check if the string or number is not empty.
**email**                         | check if the string is an email (example@mail.com).
**includeCapitalLetters**         | check if the string includes capital letter (a-zA-Z).
**includeLowercaseLetters**       | check if the string includes lowercase letter (a-zA-Z).
**includeNumber**                 | check if the string includes number.
**includeSpecialChar**            | check if the string includes special char.
**length [: number-number]**      | check if the string's length is between specified range.<br/><br/> "length:12-54".
**match [: str]**                 | check if the input matches the specified field.<br/><br/> "match:repeatPassword"
**min [: number]**                | check if the string's length is minimun specified length. <br/><br/> "min:8"
**max [: number]**                | check if the string's length is maximum specified length. <br/><br/> "max:16"
**int**                           | check if the input is only number.
**string**                        | check if the input is only string.

## Adding Validators

You can also provide your own validator via method.
```javascript
    validation.addValidators(validators)
```

validators object should be TValidators type.

```typescript

    type ValidateT = {
        isValid : boolean,
        additionalData ?: {
            [key : string] : string | number
        }
    }

    interface IValidator {
    
        validate(data: any, rules: string | undefined, allData: { [key: string]: any }): ValidateT | Promise<ValidateT>;
    }

    type TValidators = {
        [key: string]: {
            validator: IValidator,
            errMsg: string
        }
    }
```

### Examples

```javascript
    import {Validation} from 'v-for-validation';

    class MyOwnValidator {
    
        validate(data) {
            if(!data) {
                return {
                    isValid : false
                }
            }
        }    
    }
        
    const validation = new Validation()

    validation.addValidators({
        "MyOwnValidator" : {
            validator : new MyOwnValidator(),
            errMsg : 'something.wrong'                
        }
    })
    
    validation.rules({
        name : 'required|string|MyOwnValidator',
        age : 'int',
        salary : 'bail|int|min:50000|max:100000' 
     })
        
    validation.validate({
        name : 'David',
        age : 28,
        salary : 40000
    })
```

It also serves as override for validator if the same key already exists.<br/>
If you wanna provide some complex validator syntax like "MyOwnValidator:returnFalse-notRealy*^",<br>
the strings after " : " will be passed to class constructor as first argument, the second argument will be <br/>
all input data.

## Contributing

In general, we follow the "fork-and-pull" Git workflow.

1. Fork the repo on GitHub
2. Clone the project to your own machine
3. Work on your fork
    1. Make your changes and additions
        - Most of your changes should be focused on `src/` and `src/rules` folders and/or `README.md`. 
    2. Change or add tests if needed
    3. Run tests and make sure they pass
    4. Add changes to README.md if needed
4. Commit changes to your own branch
5. **Make sure** you merge the latest from "master" and resolve conflicts if there is any
6. Repeat step 3(3) above
7. Push your work back up to your fork
8. Submit a Pull request so that we can review your changes

## Tests

Currently there is no test , but they will be in the future. 

## Maintainer

- [dav697](https://github.com/dav697) - **David Galoyan** (author)

## Reading

Remember, validating can be troublesome sometimes. See [A list of articles about programming assumptions commonly made that aren't true](https://github.com/jameslk/awesome-falsehoods).

## License (MIT)

```
MIT License

Copyright (c) 2020 David Galoyan <david.galoyan.work@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

[npm-url]: https://npmjs.org/package/v-for-validation
[npm-image]: http://img.shields.io/npm/v/validator.svg


