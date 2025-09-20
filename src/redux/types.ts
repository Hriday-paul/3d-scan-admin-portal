export type IUser = {
    "first_name": string,
    "last_name": string,
    "email": string,
    "role": "admin",
    "date_of_birth": string,
    "status": "Pending" | "Active" | "Suspended",
    "date_joined": Date,
    id: number,
    profile_picture: string
}

export interface IScan {
    "scan_id": string,
    "name": number,
    "email": string,
    "submission_date": Date,
    "status": "PROCESSING" | "COMPLETED" | "FAILED",
    "reconstructed_3d_head": string | null,
    head_width : string | null,
    head_length : string | null,
    ear_to_ear : string | null,
    eye_to_eye : string | null,
    image_front_url : string | null,
    image_back_url : string | null,
    image_left_url : string | null,
    image_right_url : string | null,
    notes : string,
    custom_field : string
}

export interface IContact {
    "id": number,
    "name": string,
    "email": string,
    "message": string,
    "is_replied": boolean,
    "created_at": Date,
    "user": number
}

export interface IPush_notification {
    "id": number,
    "title": string,
    "message": string,
    "sent_to": string,
    "sent_at": Date
}

export interface INotification {
    "id": number,
    "message": string,
    "is_read": boolean,
    "created_at": Date
}