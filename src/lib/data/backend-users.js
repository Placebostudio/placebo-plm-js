import { STORAGE_KEYS } from "../constants";

const BASE_URL = "https://placebo-plm-js-backend-1.onrender.com/api";

const currentUser = getItems(STORAGE_KEYS.logged_user);

const userRepository = {

    async getAll() {

        const response = await fetch(
            `${BASE_URL}/users?user_id=${encodeURIComponent(currentUser.id)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to get users");
        }

        return data;
    },

    async getById(id) {

        const response = await fetch(
            `${BASE_URL}/users/${id}?user_id=${encodeURIComponent(currentUser.id)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to get user");
        }

        return data;
    },

    async create(data) {

        const response = await fetch(
            `${BASE_URL}/users`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || "Failed to create user"
            );
        }

        return result;
    },

    async update(id, data) {

        const response = await fetch(
            `${BASE_URL}/users/${id}`,
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
                result.error || "Failed to update user"
            );
        }

        return result;
    },

    async delete(id, requesterId) {

        const response = await fetch(
            `${BASE_URL}/users/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    requester_id: requesterId,
                    user_id: currentUser.id
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || "Failed to delete user"
            );
        }

        return result;
    },

    async login(username, password) {

        const response = await fetch(
            `${BASE_URL}/users/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || "Login failed"
            );
        }

        return result;
    }
};

export default userRepository;