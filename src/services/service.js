import { serviceRepository } from '../model/service-model.js'

// Get All Service
export const getAllService = async () => {

    return new Promise(async (resolve, reject) => {
        let serviceData = {}
        try {
            const services = await serviceRepository.find()
            serviceData.errCode = 0;
            serviceData.errMessage = "OK";
            serviceData.services = services;
            resolve(serviceData)
        } catch (e) {
            reject(e)
        }
    })
}

// Get 1 Service
export const getService = async (id) => {

    return new Promise(async (resolve, reject) => {
        let serviceData = {}
        try {
            const service = await serviceRepository.findOne({ idSer: id })
            if (service) {
                serviceData.errCode = 0;
                serviceData.errMessage = "OK";
                serviceData.service = service;
                resolve(serviceData)
            } else {
                serviceData.errCode = 1;
                serviceData.errMessage = "Service's not found!";
                resolve(serviceData)
            }
        } catch (e) {
        }
    })
}

// Create 1 Service
export const createNewService = async (data) => {

    return new Promise(async (resolve, reject) => {
        let serviceData = {}
        try {

            let check = await checkServiceID(data.idSer);

            if (check === true) {
                serviceData.errCode = 1;
                serviceData.errMessage = "Your Service exit!";
                resolve(serviceData)
            }

            const newService = new serviceRepository(data)
            await newService.save()
            serviceData.errCode = 0;
            serviceData.errMessage = "Create service success !";
            resolve(serviceData)
        } catch (e) {
            reject(e)
        }

    })
}

// Update 1 Service
export const updateService = async (data) => {

    return new Promise(async (resolve, reject) => {
        let serviceData = {}
        try {
            const service = await serviceRepository.findOne({ idSer: data.idSer })
            if (service) {
                service.title = data.title ?? service.title ?? null
                service.image = data.image ?? service.image ?? null
                service.fee = data.fee ?? service.fee ?? null
                service.descript = data.descript ?? service.descript ?? null
                service.type = data.type ?? service.type ?? null

                await service.save()
                serviceData.errCode = 0;
                serviceData.errMessage = "Update service success!";
                resolve(serviceData)
            }
            else {
                serviceData.errCode = 1;
                serviceData.errMessage = "Service's not found!";
                resolve(serviceData)
            }
        } catch (e) {
        }
    })
}

//Delete 1 Service
export const deleteService = async (id) => {

    let serviceData = {}
    return new Promise(async (resolve, reject) => {
        try {
            let service = await serviceRepository.findOne({ idSer: id })
            if (service === null) {
                serviceData.errCode = 1;
                serviceData.errMessage = "The service is not exit!";
                resolve(serviceData)
            }
            await serviceRepository.findOneAndDelete({ idSer: id })
            serviceData.errCode = 0;
            serviceData.errMessage = "Service have id " + id + " deleted!";
            resolve(serviceData)
        } catch (e) {
            reject(e)
        }
    })
}

export const checkServiceID = (idService) => {

    return new Promise(async (resolve, reject) => {
        try {
            const service = await serviceRepository.findOne({ idSer: idService })
            if (service) {
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