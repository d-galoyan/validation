import Validation from "./Validation";

export {default as Validation}     from './Validation'

const validation = new Validation()

validation.rules({
    name : 'required|string|min:6',
    age : 'int|length:12-24',
    salary : 'bail|int|min:50000|max:100000'
})

validation.addOnResultListener((results) => {
    console.log(results)
})

validation.validate({
    name : "David",
    age : 28,
    salary : 40000
})
