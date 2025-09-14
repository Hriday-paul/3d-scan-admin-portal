export type IUser = {
    "first_name": string,
    "last_name": string,
    "email": string,
    "role": "admin",
    "date_of_birth": string,
    "status": "Pending" | "Active",
    "date_joined": Date,
    id: number,
    profile_picture: string
}

export interface IScan {
    "id": string,
    "name": number,
    "email": string,
    "submission_date": Date,
    "status": "PROCESSING" | "COMPLETED" | "FAILED",
    "processed_3d_model": null
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