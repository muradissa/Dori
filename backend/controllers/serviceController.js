const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Service = require('../models/serviceModel')
const BusinessAccount = require('../models/businessAccountModel')



/***** requests by business code ---user and employee---******/ 
// 1) Get all service --- by ( business code ) --- authorization (user,employee) ---- return [ id ,  name ,  time ,  price !!]
/***** requests by business id ---busniess Account---******/ 
// 2) Get all service --- by ( business id ) --- authorization (owner) ---- return [ id ,  name ,  time ,  price , showprice , availability]
// 3) add service --- by ( business id ,  ,userId) --- authorization (owner) 
// 4) update service --- by (  business id ,  service id ) --- authorization (owner)
// 5) delete sercice --- by (  business id ,  service id ) --- authorization (owner) 


// 1)
// @desc    Get all service  --- by (  business code ,  service id ) ---- return [ id ,  name ,  time ,  price !!]
// @route   POST /api/service/getServices
// @access  private --- authorization (user,employee) 
const getAllServices = asyncHandler(async (req, res) => {
    const { businessCode } = req.body
    let responeData = [] ;
    // Check for user email
    const services = await Service.find({ businessCode })

    if(services === null) {
        return res.status(400).json({
            result:"there is no services", 
          });
    }
    services.array.forEach(service => {
        if(service.available ){
            if(!service.showPrice){
                service.price = null ;
            }
            service.businessId = null ;
            responeData.push(service)
        }
    });
    return res.status(200).json({
        result:responeData, 
      });
})


// 2)
// @desc    Get all service  --- by (  business id ,  service id ) --- return [ id ,  name ,  time ,  price , showprice , availability]
// @route   Get /api/service/getAllServices
// @access  private --- authorization (owner) 
const getAllServicesBusiness = asyncHandler(async (req, res) => {
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

  const services = await Service.find({ businessId })
  if(services === null) {
      return res.status(400).json({
          result:"there is no services", 
        });
  }
  return res.status(200).json({
      result:services, 
    });
})


// 3)
// @desc    add service --- by (  business id ,  service id )
// @route   POST /api/service/addService
// @access  private --- authorization (owner) 
const addService = asyncHandler(async (req,res) =>{
  const { businessId ,businessCode, name, time ,price ,showPrice,available ,user} = req.body ;
  if (!businessId  || !businessCode  || !name || !time || !price || !showPrice  || !available ) {
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

  const service = await Service.create({
    businessId,
    businessCode,
    name,
    time,
    price,
    showPrice,
    available,
  })
  if (service) {
    res.status(201).json({
      name : service.name,
      time : service.time,
      price : service.price,
    })
  } else {
    res.status(400)
    throw new Error('Invalid service data')
  }
})


// 4) 
// @desc    update sercice --- by (  business id ,  service id )
// @route   POST /api/service/updateService
// @access  private --- authorization (owner) 
const updateService = asyncHandler(async (req,res) => {
  const {id, businessId ,businessCode, name, time ,price ,showPrice,available ,user} = req.body ;
  // Check for user
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  // check the parameters
  if (!id ||!businessId  || !businessCode  || !name || !time || !price || !showPrice  || !available ) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Make sure the logged in user matches the business owner user
  const business = await BusinessAccount.findById(businessId)
  if (business.owenrId.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  // get service and update the service
  const service = await Service.findById(id);
  if (service) {
    await Service.findByIdAndUpdate(service._id,{name, time ,price ,showPrice,available});
  }
  else{
    res.status(400)
    throw new Error('Invalid service data')
  }
})


// 5)
// @desc    delete service --- by (  business id ,  service id )
// @route   POST /api/service/deleteService
// @access  private --- authorization (owner) 
const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id)

  if (!service) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

   // Make sure the logged in user matches the business owner user
   const business = await BusinessAccount.findById(businessId)
   if (business.owenrId.toString() !== req.user.id) {
     res.status(401)
     throw new Error('User not authorized')
   }

  await service.remove()

  res.status(200).json({ id: req.params.id })
})


module.exports = {
  getAllServices,
  getAllServicesBusiness,
  addService,
  updateService,
  deleteService,
}
