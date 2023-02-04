import { staffRepository } from '../model/staff-model.js'



export const getHomePage = async (req, res) => {
    return res.render('homePage.ejs');
}

//Get Staff
export const getStaff = async (req, res) => {
    const staff = await staffRepository.fetch(req.params.id)
    console.log(staff)
}

// Create Staff
export const postStaff = async (req, res) => {

    const person = await staffRepository.fetch(req.params.id)

    staff.id = req.body.id ?? null
    staff.email = req.body.email ?? null
    staff.passWord = req.body.passWord ?? null
    staff.fullName = req.body.fullName ?? null
    staff.address = req.body.address ?? null
    staff.phoneNumber = req.body.phoneNumber ?? null
    staff.gender = req.body.gender ?? null
    staff.roleId = req.body.roleId ?? null

    await staffRepository.save(staff)

    res.send(staff)
}

// Update Staff
export const putStaff = async (req, res) => {
    const staff = await staffRepository.createAndSave(req.body)
    res.send(staff)
}

//Delete Staff
export const deleteStaff = async (req, res) => {
    await personRepository.remove(req.params.id)
    console.log({ entityId: req.params.id })
}


