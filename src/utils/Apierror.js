class Apierror extends Error{
    constructor(
    statuscode,
    message="something went wrong",
    errors=[],
    stack=""
    )
    {
        super(message)
        this.statuscode=statuscode
        this.data=null
        this.message=message
        this.success=false;
        this.errors=errors

        if(stack)
        {
            this.stack=stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }

}

export {Apierror}


// class Apierror extends Error{
//     constructor(
//         statuscode,
//         data,message="success"
//     ){
//         super(message)
//         this.statuscode=statuscode
//         this.data=data
//         this.message=message
//         this.success=statuscode < 400
//     }
// }

// export { Apierror }