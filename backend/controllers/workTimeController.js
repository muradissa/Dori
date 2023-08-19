const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const WorkTime = require('../models/WorkTimeModel')
const BusinessAccount = require('../models/businessAccountModel')


// 1)
// @desc    Get all WorkTime  --- by (  business code ,  WorkTime id ) ---- return [ id ,  name ,  time ,  price !!]
// @route   POST /api/WorkTime/getWorkTimes
// @access  private --- authorization (user,employee) 
const getAllWorkTimes = asyncHandler(async (req, res) => {
    const { businessCode } = req.body
    let responeData = [] ;
    // Check for user email
    const workTimes = await WorkTime.find({ businessCode })

    if(workTimes === null) {
        return res.status(400).json({
            result:"there is no WorkTimes", 
          });
    }
    // WorkTimes.array.forEach(WorkTime => {
    //     if(WorkTime.available ){
    //         if(!WorkTime.showPrice){
    //             WorkTime.price = null ;
    //         }
    //         WorkTime.businessId = null ;
    //         responeData.push(WorkTime)
    //     }
    // });
    return res.status(200).json({
        result:workTimes, 
      });
})


// 2)
// @desc    Get all WorkTime  --- by (  business id ,  WorkTime id ) --- return [ id ,  name ,  time ,  price , showprice , availability]
// @route   Get /api/WorkTime/getAllWorkTimes
// @access  private --- authorization (owner) 
const getAllWorkTimesBusiness = asyncHandler(async (req, res) => {
  const { businessId ,user} = req.body
  // Check for user
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  // Make sure the logged in user matches the business owner user
  const business = await BusinessAccount.findById(businessId)
  if (business.owenrId.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const workTimes = await WorkTime.find({ businessId })
  if(workTimes === null) {
      return res.status(400).json({
          result:"there is no WorkTimes", 
        });
  }
  return res.status(200).json({
      result:workTimes, 
    });
})


// 3)
// @desc    add WorkTime --- by (  business id ,  WorkTime id )
// @route   POST /api/WorkTime/addWorkTime
// @access  private --- authorization (owner) 
const addWorkTime = asyncHandler(async (req,res) =>{
  const { businessId ,businessCode ,user} = req.body ;
  if (!businessId  || !businessCode  || !user ) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check for user
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  // Make sure the logged in user matches the business owner user
  const business = await BusinessAccount.findById(businessId)
  if (business.owenrId.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  // sunday ,monday ,tuesday ,wednesday ,thursday ,friday,saturday
  //  {id, businessId ,businessCode, day, openTime ,closeTime ,breakFrom,breakTo ,isClosed , noBreak}
  const workTimes = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(async (day) =>{
    const workTime = await WorkTime.create({
        businessId:businessId,
        businessCode:businessCode,
        day:day,
        openTime : "09:00",
        closeTime : "19:00",
        breakFrom : "12:00",
        breakTo: "13:00",
        isClosed:false,
        noBreak :true,
      })
      return workTime
  })
 
  if (workTimes) {
    res.status(201).json({
        workTimes
    })
  } else {
    res.status(400)
    throw new Error('Invalid WorkTime data')
  }
})


// 4) 
// @desc    update sercice --- by (  business id ,  WorkTime id )
// @route   POST /api/WorkTime/updateWorkTime
// @access  private --- authorization (owner) 
const updateWorkTime = asyncHandler(async (req,res) => {
  const {id, businessId ,businessCode, day, openTime ,closeTime ,breakFrom,breakTo ,isClosed , noBreak,user} = req.body ;
  // Check for user
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  // check the parameters
  if (!id ||!businessId  || !businessCode  || !day || !openTime || !closeTime || !breakFrom  || !breakTo || !isClosed || !noBreak) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Make sure the logged in user matches the business owner user
  const business = await BusinessAccount.findById(businessId)
  if (business.owenrId.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  // get WorkTime and update the WorkTime
  const workTimes = await WorkTime.findById(id);
  if (workTimes) {
    await WorkTime.findByIdAndUpdate(workTimes._id,{openTime , closeTime , breakFrom , breakTo , isClosed , noBreak});
  }
  else{
    res.status(400)
    throw new Error('Invalid WorkTime data')
  }
})

module.exports = {
  getAllWorkTimes,
  getAllWorkTimesBusiness,
  addWorkTime,
  updateWorkTime,
}
