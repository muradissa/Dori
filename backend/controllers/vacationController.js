const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Vacation = require('../models/VacationModel')
const BusinessAccount = require('../models/businessAccountModel')



/***** requests by business code ---user and employee---******/ 
// 1) Get all Vacation --- by ( business code ) --- authorization (user,employee) ---- return [ id ,  name ,  time ,  price !!]
/***** requests by business id ---busniess Account---******/ 
// 2) Get all Vacation --- by ( business id ) --- authorization (owner) ---- return [ id ,  name ,  time ,  price , showprice , availability]
// 3) add Vacation --- by ( business id ,  ,userId) --- authorization (owner) 
// 4) update Vacation --- by (  business id ,  Vacation id ) --- authorization (owner)
// 5) delete sercice --- by (  business id ,  Vacation id ) --- authorization (owner) 


// 1)
// @desc    Get all Vacation  --- by (  business code ,  Vacation id ) ---- return [ id ,  name ,  time ,  price !!]
// @route   POST /api/Vacation/getVacations
// @access  private --- authorization (employee) 
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


// 2)
// @desc    Get all Vacation  --- by (  business id ,  Vacation id ) --- return [ id ,  name ,  time ,  price , showprice , availability]
// @route   Get /api/Vacation/getAllVacations
// @access  private --- authorization (owner) 
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


// 3)
// @desc    add Vacation --- by (  business id ,  Vacation id )
// @route   POST /api/Vacation/addVacation
// @access  private --- authorization (owner) 
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


// 4) 
// @desc    update sercice --- by (  business id ,  Vacation id )
// @route   POST /api/Vacation/updateVacation
// @access  private --- authorization (owner) 
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


// 5)
// @desc    delete Vacation --- by (  business id ,  Vacation id )
// @route   POST /api/Vacation/deleteVacation
// @access  private --- authorization (owner) 
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
