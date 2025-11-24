export type IUser = {
    "first_name": string,
    "last_name": string,
    "email": string,
    "role": "admin",
    "date_of_birth": string,
    "status": "PENDING" | "ACTIVE" | "SUSPENDED",
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

    image_front_url: string | null,
    image_back_url: string | null,
    image_left_url: string | null,
    image_right_url: string | null,
    notes: string,
    custom_field: string,

    "head_width": string | null,
    "head_height": string | null,
    "head_length": string | null,
    "ear_to_ear": string | null,
    "eye_to_eye": string | null,
    "head_circumference_A": string | null,
    "forehead_to_back_B": string | null,
    "cross_measurement_C": string | null,
    "under_chin_D": string | null,
    "eyebrow_to_earlobe_E": string | null,
    "eye_corner_to_ear_F": string | null,
    "ear_height_G": string | null,
    "ear_width_H": string | null,
    "cheek_guard_clearance_L": string | null,
    "cheek_guard_height_M": string | null,
    "cheek_guard_width_N": string | null
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