import { feedbackRepository } from '../model/feedback-model.js'

// Get All Feedback
export const getAllFeedback = async () => {

    return new Promise(async (resolve, reject) => {
        let feedbackData = {}
        try {
            const feedbacks = await feedbackRepository.find()
            feedbackData.errCode = 0;
            feedbackData.errMessage = "OK";
            feedbackData.feedbacks = feedbacks;
            resolve(feedbackData)
        } catch (e) {
            reject(e)
        }
    })
}

// Get 1 Feedback
export const getFeedback = async (id) => {

    return new Promise(async (resolve, reject) => {
        let feedbackData = {}
        try {
            const feedback = await feedbackRepository.findOne({ idFb: id })
            if (feedbackData) {
                feedbackData.errCode = 0;
                feedbackData.errMessage = "OK";
                feedbackData.feedback = feedback;
                resolve(feedbackData)
            } else {
                feedbackData.errCode = 1;
                feedbackData.errMessage = "Feedback's not found!";
                resolve(feedbackData)
            }
        } catch (e) {
        }
    })
}

// Create 1 Feedback
export const createNewFeedback = async (data) => {

    return new Promise(async (resolve, reject) => {
        let feedbackData = {}
        try {

            let check = await checkFeedbackID(data.idFb);

            if (check === true) {
                feedbackData.errCode = 1;
                feedbackData.errMessage = "Your Feedback exit!";
                resolve(feedbackData)
            }

            const newFeedback = new feedbackRepository(data)
            await newFeedback.save()
            feedbackData.errCode = 0;
            feedbackData.errMessage = "Gửi phản hồi thành công !";
            resolve(feedbackData)
        } catch (e) {
            reject(e)
        }

    })
}

// Update 1 Appointment
export const updateFeedback = async (data) => {

    return new Promise(async (resolve, reject) => {
        let feedbackData = {}
        try {
            const feedback = await feedbackRepository.findOne({ idFb: data.idFb })
            if (feedback) {
                feedback.title = data.title ?? feedback.title ?? null
                feedback.image = data.image ?? feedback.image ?? null


                await feedback.save()
                feedbackData.errCode = 0;
                feedbackData.errMessage = "Update feedback success!";
                resolve(feedbackData)
            }
            else {
                feedbackData.errCode = 1;
                feedbackData.errMessage = "Feedback's not found!";
                resolve(feedbackData)
            }
        } catch (e) {
        }
    })
}

//Delete 1 Appointment
export const deleteFeedback = async (id) => {

    let feedbackData = {}
    return new Promise(async (resolve, reject) => {
        try {
            let feedback = await feedbackRepository.findOne({ idFb: id })
            if (feedback === null) {
                feedbackData.errCode = 1;
                feedbackData.errMessage = "The feedback is not exit!";
                resolve(feedbackData)
            }
            await feedbackRepository.findOneAndDelete({ idFb: id })
            feedbackData.errCode = 0;
            feedbackData.errMessage = "Feedback have id " + id + " deleted!";
            resolve(feedbackData)
        } catch (e) {
            reject(e)
        }
    })
}

export const checkFeedbackID = (idFeedback) => {

    return new Promise(async (resolve, reject) => {
        try {
            const feedback = await feedbackRepository.findOne({ idFb: idFeedback })
            if (feedback) {
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