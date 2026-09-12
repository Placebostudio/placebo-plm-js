import { STORAGE_KEYS } from "../constants";
import { getItems } from "./storage";

const BASE_URL = "https://placebo-plm-js-backend.onrender.com/api";

const currentUser = getItems(STORAGE_KEYS.logged_user);

export const auditRepository = {

    async getAll(filters = {}) {

        const params = new URLSearchParams({
            ...filters,
            user_id: currentUser.id
        });

        const response = await fetch(
            `${BASE_URL}/audit_logs?${params}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Failed to get audit logs"
            );
        }

        return data;
    },

    async getById(id) {

        const response = await fetch(
            `${BASE_URL}/audit_logs/${id}?user_id=${encodeURIComponent(currentUser.id)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Failed to get audit log"
            );
        }

        return data;
    },

    async create(data) {

        const response = await fetch(
            `${BASE_URL}/audit_logs`,
            {
                method: "POST",
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
                result.error || "Failed to create audit log"
            );
        }

        return result;
    },

    async update(id, data) {

        const response = await fetch(
            `${BASE_URL}/audit_logs/${id}`,
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
                result.error || "Failed to update audit log"
            );
        }

        return result;
    },

    async delete(id) {

        const response = await fetch(
            `${BASE_URL}/audit_logs/${id}?user_id=${encodeURIComponent(currentUser.id)}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.error || "Failed to delete audit log"
            );
        }

        return result;
    }
};