import { appointmentRepository } from '../model/appointment-model.js'

// Get All Appointment
export const getAllAppointment = async () => {

    return new Promise(async (resolve, reject) => {
        let appointmentData = {}
        try {
            const appointments = await appointmentRepository.find()
            appointmentData.errCode = 0;
            appointmentData.errMessage = "OK";
            appointmentData.appointments = appointments;
            resolve(appointmentData)
        } catch (e) {
            reject(e)
        }
    })
}

// Get 1 Appointment
export const getAppointment = async (id) => {

    return new Promise(async (resolve, reject) => {
        let appointmentData = {}
        try {
            const appointment = await appointmentRepository.findOne({ idApp: id })
            if (appointment) {
                appointmentData.errCode = 0;
                appointmentData.errMessage = "OK";
                appointmentData.appointment = appointment;
                resolve(appointmentData)
            } else {
                appointmentData.errCode = 1;
                appointmentData.errMessage = "Appointment's not found!";
                resolve(appointmentData)
            }
        } catch (e) {
        }
    })
}

// Create 1 Appointment
export const createNewAppointment = async (data) => {

    return new Promise(async (resolve, reject) => {
        let appointmentData = {}
        try {

            let check = await checkAppointmentID(data.idApp);

            if (check === true) {
                appointmentData.errCode = 1;
                appointmentData.errMessage = "Your Appointment exit!";
                resolve(appointmentData)
            }

            const newAppointment = new appointmentRepository(data)
            await newAppointment.save()
            appointmentData.errCode = 0;
            appointmentData.errMessage = "Gửi lịch hẹn thành công. Vui lòng chờ công ty phản hồi !";
            resolve(appointmentData)
        } catch (e) {
            reject(e)
        }

    })
}

// Update 1 Appointment
export const updateAppointment = async (data) => {

    return new Promise(async (resolve, reject) => {
        let appointmentData = {}
        try {
            const appointment = await appointmentRepository.findOne({ idApp: data.idApp })
            if (appointment) {
                appointment.name = data.name ?? appointment.name ?? null
                appointment.email = data.email ?? appointment.email ?? null
                appointment.phone = data.phone ?? appointment.phone ?? null
                appointment.note = data.note ?? appointment.note ?? null

                await appointment.save()
                appointmentData.errCode = 0;
                appointmentData.errMessage = "Update appointment success!";
                resolve(appointmentData)
            }
            else {
                appointmentData.errCode = 1;
                appointmentData.errMessage = "Appointment's not found!";
                resolve(appointmentData)
            }
        } catch (e) {
        }
    })
}

//Delete 1 Appointment
export const deleteAppointment = async (id) => {

    let appointmentData = {}
    return new Promise(async (resolve, reject) => {
        try {
            let appointment = await appointmentRepository.findOne({ idApp: id })
            if (appointment === null) {
                appointmentData.errCode = 1;
                appointmentData.errMessage = "The appointment is not exit!";
                resolve(appointmentData)
            }
            await appointmentRepository.findOneAndDelete({ idApp: id })
            appointmentData.errCode = 0;
            appointmentData.errMessage = "Appointment have id " + id + " deleted!";
            resolve(appointmentData)
        } catch (e) {
            reject(e)
        }
    })
}

export const checkAppointmentID = (idAppointment) => {

    return new Promise(async (resolve, reject) => {
        try {
            const appointment = await appointmentRepository.findOne({ idApp: idAppointment })
            if (appointment) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}