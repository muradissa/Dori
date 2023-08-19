const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Service = require('../models/serviceModel')
const BusinessAccount = require('../models/businessAccountModel')


/***
 * getUserAppointments
 * getUserAppointmentsForToday
 * getUserAppointmentsForTomorrow
 * addNewAppointment
 * cancelAppointmentByUser
 * 
 * getBusinessAppointments
 * getBusinessAppointmentsForToday
 * getBusinessAppointmentsForTomorrow
 * accepetAppointmentByEmployee
 * cancelAppointmentByEmployee
 * updateAppointmentByEmployee
 */

const getUserAppointments = asyncHandler( async(req,res) => {
  const {user} = req.body
  // Check for user
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const userId = user.id;
  //

  const sort = { _id: -1 }; // Sort by _id in descending order

  const appointments = await Appointment.find({ userId }).sort(sort).limit(10) // .toArray();
  if(appointments === null) {
      return res.status(400).json({
          result:"there is no services", 
        });
  }
  return res.status(200).json({
      result:appointments, 
    });
}) 

const getUserAppointmentsForToday = asyncHandler( async(req,res) => {
  const {user} = req.body
  // Check for user
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const userId = user.id;
  //

  const sort = { _id: -1 }; // Sort by _id in descending order

  const appointments = await Appointment.find({ userId }).sort(sort).limit(10) // .toArray();
  if(appointments === null) {
      return res.status(400).json({
          result:"there is no services", 
        });
  }
  return res.status(200).json({
      result:appointments, 
    });
}) 

const getUserAppointmentsForTomorrow = asyncHandler( async(req,res) => {
  const {user} = req.body
  // Check for user
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const userId = user.id;
  //

  const sort = { _id: -1 }; // Sort by _id in descending order

  const appointments = await Appointment.find({ userId }).sort(sort).limit(10) // .toArray();
  if(appointments === null) {
      return res.status(400).json({
          result:"there is no services", 
        });
  }
  return res.status(200).json({
      result:appointments, 
    });
  
}) 

const addNewAppointment = asyncHandler( async(req,res) => {
  const { businessId ,businessCode, name, time ,price ,showPrice,available ,user} = req.body ;
  if (!businessId  || !businessCode  || !name || !time || !price || !showPrice  || !available ) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  
  // Check for user
  const user2 = await User.findById(user.id)
  if (!user2) {
    res.status(401)
    throw new Error('User not found')
  }
  // Check for business
  const business = await BusinessAccount.find({businessCode:businessCode})
  if (!business) {
    res.status(401)
    throw new Error('Business not found')
  }
  // Check for employee
  const employee = await Employee.find({employeeCode:employeeCode})
  if (!employee) {
    res.status(401)
    throw new Error('Employee not found')
  }
  // Check for service 
  const service = await Service.findById(serviceId)
  if (!service) {
    res.status(401)
    throw new Error('Service not found')
  }
  // Check if the date and time ok

  const appointment = await Appointment.create({
    userId,
    businessId,
    businessCode,
    employeeId,
    employeeCode,
    serviceId,
    date,
    time,
    status,
    requestDate,
    // responseDate,
    // responseBy,
  })
  if (appointment) {
    res.status(201).json({
      name : service.name,
      time : service.time,
      price : service.price,
    })
  } else {
    res.status(400)
    throw new Error('Invalid appointment data')
  }
}) 

const cancelAppointmentByUser = asyncHandler( async(req,res) => {
  try{
    const {user, appointmentId,responseBy} = req.body;
    const status = "Cancelled";
    const responseDate = new Date();
    const user2 = await User.findById(user.id);
    
    if (!user2) {
      res.status(401)
      throw new Error('User not found')
    }

    const appointment = await Appointment.findById(appointmentId)
    if (appointment) {
      await Appointment.findByIdAndUpdate(appointment._id,{req ,responseDate ,responseBy,status});
    }
    else{
      res.status(400)
      throw new Error('Invalid appointment data')
    }
  }catch(e){
    res.status(400)
    throw new Error('Error cancel appointment')
  }
}) 




const getBusinessAppointments = asyncHandler( async(req,res) => {
  
}) 

const getBusinessAppointmentsForToday = asyncHandler( async(req,res) => {
  
}) 

const accepetAppointmentByEmployee = asyncHandler( async(req,res) => {
  
}) 

const getBusinessAppointmentsForTomorrow = asyncHandler( async(req,res) => {
  
}) 

const cancelAppointmentByEmployee = asyncHandler(async (req, res) => {
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


const addAppointmentByUser= asyncHandler(async (req,res) =>{
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
