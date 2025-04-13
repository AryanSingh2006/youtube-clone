import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import User from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import apiResponse from "../utils/apiResponse.js";

const registerUser = asyncHandler(async(req,res)=>{
  
  const {username, email, fullName, password} = req.body

  if (!fullName){
    throw new apiError(400, "FullName is required")
  }
  if (!username){
    throw new apiError(400, "Username is required")
  }
  if (!email){
    throw new apiError(400, "Email is required")
  }
  if (!password){
    throw new apiError(400, "Password is required")
  }
  
  const existedUser = User.findOne({
    $or: [{username} , {email}]
  })

  if(existedUser){
    throw new apiError(409, "Username or Email already exist")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path ;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath){
    throw new apiError(400,"Avatar is required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if (!avatar){
    throw new apiError(400,"Avatar is required")
  }

  const user = await User.create({
    fullName,
    avatar : avatar.url,
    coverImage : coverImage?.url || "",
    email,
    password,
    username : username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreashToken"
  )

  if (!createdUser){
    throw new apiError(500, "Somethigh went wrong while registering the user")
  }

  return res.status(201).json(
    new apiResponse(200, createdUser, "User registered successfully")
  )
});

export default registerUser;