import ApiError from "../../utils/ApiError.js";

import { getAllAddressesByUserId, getAddressById, createAddress, updateAddress, deleteAddress, clearDefaultAddresses } from "./address.repository.js";

export const getAllAddressesByUserIdService = async (userId) => {
    return await getAllAddressesByUserId(userId)
}


export const getAddressByIdService = async (id, userId) => {
    const address = await getAddressById(id);
    if(!address){
        throw new ApiError(404, "Address not found");
    }
    if(address.user_id !== userId){
        throw new ApiError(403, "You are not authorized to access this address");
    }
    return address;
}



export const createAddressService = async (userId, data) => {
    if (data.is_default) {
        await clearDefaultAddresses(userId);
    }
    return await createAddress({
        user_id: userId,
        ...data,
    });
}




export const updateAddressService = async (id, userId, data) => {
    const address = await getAddressById(id);
    if(!address){
        throw new ApiError(404, "Address not found");
    }
    if(address.user_id !== userId){
        throw new ApiError(403, "You are not authorized to update this address");
    }
    if(data.is_default){
        await clearDefaultAddresses(userId)
    }

    return await updateAddress({
        id,
        full_name: data.full_name ?? address.full_name,
        phone: data.phone ?? address.phone,
        address_line_1: data.address_line_1 ?? address.address_line_1,
        address_line_2: data.address_line_2 ?? address.address_line_2,
        city: data.city ?? address.city,
        state: data.state ?? address.state,
        country: data.country ?? address.country,
        postal_code: data.postal_code ?? address.postal_code,
        is_default: data.is_default ?? address.is_default,
    });
}




export const deleteAddressService = async (id, userId) => {
    const address = await getAddressById(id);
    if(!address){
        throw new ApiError(404, "Address not found.");
    }
    if(address.user_id !== userId){
        throw new ApiError(403, "You are not authorized to delete this address.");
    }
    await deleteAddress(id)
}