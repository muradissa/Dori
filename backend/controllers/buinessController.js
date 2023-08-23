const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Vacation = require('../models/VacationModel')
const BusinessAccount = require('../models/businessAccountModel')




const getBusinessInfoToUser = asyncHandler(async (req, res) => {

    try{
        const {businessCode , user} = req.body;
        const user2 = await User.findById(user.id);       
        if (!user2) {
          res.status(401)
          throw new Error('User not found')
        }
         // Specify the field(s) to include
         const projection = { 
            businessCode: 1,
            email: 0 ,
            phoneNumber1: 1 ,
            phoneNumber2: 1 ,
            country: 1 ,
            city: 1 ,
            address: 1 ,
            image: 1 ,

        };
        const business = await BusinessAccount.findOne({businessCode}).project(projection).toArray();
        if(!business){
            res.status(401)
            throw new Error('Business not found')
        }else{
            res.status(200).json(business);
        }
        


    }catch(err){

    }
})

const getBusinessInfo = asyncHandler(async (req, res) => {
  try{
    const {user} = req.body;
    const user2 = await User.findById(user.id);       
    if (!user2) {
      res.status(401)
      throw new Error('User not found')
    }
     // Specify the field(s) to include
    const businessCode = user.businessCode;

    const business = await BusinessAccount.findOne({businessCode})
    if(!business){
        res.status(401)
        throw new Error('Business not found')
    }
    if(business.owenrId === user.id){
      res.status(200).json({business});

    }else{
      res.status(401)
      throw new Error('User not does not have business account')
    }
  }catch(err){
    throw new Error('Error can not get business info')
  }
})



const createBusinessAccount = asyncHandler(async (req, res) => {

})


const updateBusinessAccountInfo = asyncHandler(async (req, res) => {})
const updateBusinessAccountType = asyncHandler(async (req, res) => {})
const getBusinessSummuryForToday = asyncHandler(async (req, res) => {})
const getBusinessMonthSummury = asyncHandler(async (req, res) => {})






const getAllVacations = asyncHandler(async (req, res) => {
    const { businessCode } = req.body
    let responeData = [] ;
    // Check for user email
    const vacations = await Vacation.find({ businessCode })

    if(vacations === null) {
        return res.status(400).json({
            result:"there is no Vacations", 
          });
    }
    vacations.array.forEach(Vacation => {
        if(Vacation.available ){
            if(!vacation.showPrice){
                vacation.price = null ;
            }
            vacation.businessId = null ;
            responeData.push(Vacation)
        }
    });
    return res.status(200).json({
        result:responeData, 
      });
})


const getAllVacationsBusiness = asyncHandler(async (req, res) => {
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

  const vacations = await Vacation.find({ businessId })
  if(vacations === null) {
      return res.status(400).json({
          result:"there is no Vacations", 
        });
  }
  return res.status(200).json({
      result:Vacations, 
    });
})


const addVacation = asyncHandler(async (req,res) =>{
  const {businessId ,businessCode, from, to , days,employees ,user} = req.body ;
//   const { businessId ,businessCode, name, time ,price ,showPrice,available ,user} = req.body ;
  if (!businessId  || !businessCode  || !from || !to || !days || !employees || !user ) {
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

  const vacation = await Vacation.create({
    businessId,
    businessCode,
    from,
    to,
    days,
    employees,
  })
  if (vacation) {
    res.status(201).json({
        businessId : vacation.businessId,
        businessCode : vacation.businessCode,
        from : vacation.from,
        to : vacation.to,
        days : vacation.days,
        employees : vacation.employees,
    })
  } else {
    res.status(400)
    throw new Error('Invalid Vacation data')
  }
})


const updateVacation = asyncHandler(async (req,res) => {
  const {id, businessId ,businessCode, from, to ,days,employees ,user} = req.body ;
  // Check for user
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  // check the parameters
  if (!id ||!businessId  || !businessCode  || !from || !to || !employees || !days || !user ) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Make sure the logged in user matches the business owner user
  const business = await BusinessAccount.findById(businessId)
  if (business.owenrId.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  // get Vacation and update the Vacation
  const vacation = await Vacation.findById(id);
  if (vacation) {
    await Vacation.findByIdAndUpdate(Vacation._id,{from, to ,employees});
  }
  else{
    res.status(400)
    throw new Error('Invalid Vacation data')
  }
})



const deleteVacation = asyncHandler(async (req, res) => {
  const vacation = await Vacation.findById(req.params.id)

  if (!vacation) {
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

  await Vacation.remove()

  res.status(200).json({ id: req.params.id })
})


module.exports = {
  getAllVacations,
  getAllVacationsBusiness,
  addVacation,
  updateVacation,
  deleteVacation,
}
