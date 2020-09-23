export {default as Validation, addValidators} from './Validation'
//import  {addValidators as V, default as Val} from './Validation'

/*
class Test {
    validate () {
        return {
            isValid : false
        }
    }
}

V([{
    name : "Test",
    validator : new Test(),
    errMsg : "Test error"
}])

const user = {
    name : "David",
    lastname : "",
}

class ShouldValidateC {
    shouldValidate(allData : typeof user): boolean {
        return false;
    }

}

const validation = new Val<typeof user>()

validation.setShouldValidate({
    name : new ShouldValidateC()
})

validation.rules({
    name : "Test",
    lastname: "omitEmpty|min:2"
})

validation.validate(user)
.then(() => console.log("success"))
.catch((err) => console.log(err))*/
