import { Apierror } from "../utils/Apierror"
import { asynchandler } from "../utils/asynchandler"
import { User } from "../models/user.model"
import { uploadOnCloudinary } from "../utils/cloudinary"

// const generateAccessndrefreshtoken=asynchandler(async(userID)=>{
//     const user=

// })

const registeruser= asynchandler(async(req,res)=>{
      // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const{username,email,fullName,password}=req.body

    if([username,email,fullName,password].some((field)=>{
        field?.trim() === ""
    }))
    {
        throw new Apierror(400,'all field are required')
    }

    const existeduser = await User.findOne({
        $or:[{username},{email}]
    })

    if(existeduser){
        throw new Apierror(409, "User with email or username already exists")

    }

    const avatarlocalpath=req.files?.avatat[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath) {
        throw new Apierror(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new Apierror(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new Apierror(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

const loginuser=asynchandler(async(req,res)=>{
    const {username,email,password}  =  req.body()

    if(!(username && email))
    {
        throw new Apierror(400,"username or email is required")
    }

    const user=User.findOne(
        {
            $or:[{username},{email}]
        }
    )

    if(!user){
        throw new Apierror(404,"user doesn't exist")
    }

    const isPasswordvalid=await User.isPasswordCorrect(password)

    if(!isPasswordvalid)
    {
        throw new Apierror(400,"Password is incorrect")
    }


})

export {registeruser}