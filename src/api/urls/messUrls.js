import request from "axios/request"

const getMesses = async (data) => request(`/mess`, 'GET', data)
const getMessById = async (data) => request(`/mess/${data?.id}`, 'GET', data)
const addMesses = async (data) => request(`/mess`, 'POST', data)
const editMess = async (data) => request(`/mess`, 'PATCH', data)
const deleteMess = async (data) => request(`/mess/${data?._id}`, 'DELETE', data)

export {
    getMesses,
    getMessById,
    addMesses,
    editMess,
    deleteMess
  };
