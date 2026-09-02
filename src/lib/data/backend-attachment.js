import { STORAGE_KEYS } from "../constants";

const BASE_URL = "https://placebo-plm-js-backend-1.onrender.com/api";

const currentUser = getItems(STORAGE_KEYS.logged_user);

const attachmentRepository = {

    async getAll() {

        const response = await fetch(
            `${BASE_URL}/attachments?user_id=${encodeURIComponent(currentUser.id)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Failed to get attachments"
            );
        }

        return data;
    },

    async getById(id) {

        const response = await fetch(
            `${BASE_URL}/attachments/${id}?user_id=${encodeURIComponent(currentUser.id)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Failed to get attachment"
            );
        }

        return data;
    },

    async create(data) {

        data.append(
            "user_id",
            currentUser.id
        );

        const response = await fetch(
            `${BASE_URL}/attachments`,
            {
                method: "POST",
                body: data
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || "Failed to create attachment"
            );
        }

        return result;
    },

    async update(id, data) {

        const response = await fetch(
            `${BASE_URL}/attachments/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...data,
                    user_id: currentUser.id
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || "Failed to update attachment"
            );
        }

        return result;
    },

    async delete(id) {

        const response = await fetch(
            `${BASE_URL}/attachments/${id}?user_id=${encodeURIComponent(currentUser.id)}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || "Failed to delete attachment"
            );
        }

        return result;
    }
};

export default attachmentRepository;